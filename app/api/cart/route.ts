import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getOptionalAuthUser } from "@/lib/auth/clerk";

function getSessionIdentity(req: NextRequest) {
  const cookieSession = req.cookies.get("fc_session_id")?.value;
  const headerSession = req.headers.get("x-session-id");
  const sessionId = cookieSession || headerSession || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const needsCookie = !cookieSession;
  return { sessionId, needsCookie };
}

export async function GET(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser();
    const { sessionId, needsCookie } = getSessionIdentity(req);

    let query = supabaseServer.from("cart_items").select("*");

    if (authUser?.userId) {
      query = query.eq("user_id", authUser.userId);
    } else {
      query = query.eq("session_id", sessionId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const response = NextResponse.json({
      success: true,
      items: data || [],
      sessionId,
      userId: authUser?.userId || null,
    });

    if (needsCookie && !authUser?.userId) {
      response.cookies.set("fc_session_id", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
      });
    }

    return response;
  } catch (err: any) {
    console.error("Cart GET Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser();
    const { sessionId, needsCookie } = getSessionIdentity(req);
    const body = await req.json();

    const {
      id: rawId,
      title,
      category = "Standard Frame",
      dimensions = "24x36 in",
      specs = "Natural Oak • Museum Glass",
      unitPrice,
      quantity = 1,
      vertical = "Retail & Standard Framing",
      metadata = {},
    } = body;

    if (!title || unitPrice === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required cart item fields: title, unitPrice" },
        { status: 400 }
      );
    }

    const itemId = rawId || `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const userId = authUser?.userId || null;

    // Check if an item with matching title already exists for this user/session
    let existingQuery = supabaseServer.from("cart_items").select("*").eq("title", title);
    if (userId) {
      existingQuery = existingQuery.eq("user_id", userId);
    } else {
      existingQuery = existingQuery.eq("session_id", sessionId);
    }

    const { data: existingRows } = await existingQuery;
    const existing = existingRows && existingRows.length > 0 ? existingRows[0] : null;

    if (existing) {
      const updatedQty = existing.quantity + Number(quantity);
      await supabaseServer
        .from("cart_items")
        .update({ quantity: updatedQty })
        .eq("id", existing.id);

      const response = NextResponse.json({
        success: true,
        action: "updated",
        item: { ...existing, quantity: updatedQty },
        sessionId,
      });

      if (needsCookie && !userId) {
        response.cookies.set("fc_session_id", sessionId, { path: "/", maxAge: 60 * 60 * 24 * 30 });
      }
      return response;
    }

    // Insert new item
    const newItem = {
      id: itemId,
      user_id: userId,
      session_id: userId ? null : sessionId,
      title,
      category,
      dimensions,
      specs,
      unit_price: Number(unitPrice),
      quantity: Number(quantity),
      vertical,
      metadata,
    };

    const { data: inserted, error: insertErr } = await supabaseServer
      .from("cart_items")
      .insert(newItem);

    if (insertErr) {
      return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 });
    }

    const response = NextResponse.json({
      success: true,
      action: "created",
      item: inserted || newItem,
      sessionId,
    });

    if (needsCookie && !userId) {
      response.cookies.set("fc_session_id", sessionId, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    }

    return response;
  } catch (err: any) {
    console.error("Cart POST Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser();
    const { sessionId } = getSessionIdentity(req);
    const body = await req.json();

    const { id, quantity, delta } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing item id" }, { status: 400 });
    }

    let itemQuery = supabaseServer.from("cart_items").select("*").eq("id", id);
    if (authUser?.userId) {
      itemQuery = itemQuery.eq("user_id", authUser.userId);
    } else {
      itemQuery = itemQuery.eq("session_id", sessionId);
    }

    const { data: items } = await itemQuery;
    const target = items && items.length > 0 ? items[0] : null;

    if (!target) {
      return NextResponse.json({ success: false, error: "Cart item not found" }, { status: 404 });
    }

    let finalQuantity = target.quantity;
    if (typeof quantity === "number") {
      finalQuantity = quantity;
    } else if (typeof delta === "number") {
      finalQuantity += delta;
    }

    if (finalQuantity <= 0) {
      await supabaseServer.from("cart_items").delete().eq("id", id);
      return NextResponse.json({ success: true, action: "deleted", id });
    }

    await supabaseServer.from("cart_items").update({ quantity: finalQuantity }).eq("id", id);

    return NextResponse.json({
      success: true,
      action: "updated",
      item: { ...target, quantity: finalQuantity },
    });
  } catch (err: any) {
    console.error("Cart PUT Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser();
    const { sessionId } = getSessionIdentity(req);

    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");
    const clear = searchParams.get("clear") === "true";

    if (!id && !clear) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {}
    }

    if (clear || !id) {
      let deleteQuery = supabaseServer.from("cart_items").delete();
      if (authUser?.userId) {
        deleteQuery = deleteQuery.eq("user_id", authUser.userId);
      } else {
        deleteQuery = deleteQuery.eq("session_id", sessionId);
      }
      await deleteQuery;
      return NextResponse.json({ success: true, cleared: true });
    }

    let deleteQuery = supabaseServer.from("cart_items").delete().eq("id", id);
    if (authUser?.userId) {
      deleteQuery = deleteQuery.eq("user_id", authUser.userId);
    } else {
      deleteQuery = deleteQuery.eq("session_id", sessionId);
    }
    await deleteQuery;

    return NextResponse.json({ success: true, removedId: id });
  } catch (err: any) {
    console.error("Cart DELETE Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
