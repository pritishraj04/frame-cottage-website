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

    let query = supabaseServer.from("wishlist_items").select("*");
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
      response.cookies.set("fc_session_id", sessionId, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    }

    return response;
  } catch (err: any) {
    console.error("Wishlist GET Error:", err);
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
      category = "Atelier Collection",
      dimensions = "24x36 in",
      material = "Natural Teakwood",
      glazing = "Museum Optium Acrylic",
      price,
      vertical = "Retail & Standard Framing",
      imageUrl,
      metadata = {},
    } = body;

    if (!title || price === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required wishlist item fields: title, price" },
        { status: 400 }
      );
    }

    const id = rawId || `wish_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const userId = authUser?.userId || null;

    const newItem = {
      id,
      user_id: userId,
      session_id: userId ? null : sessionId,
      title,
      category,
      dimensions,
      material,
      glazing,
      price: Number(price),
      vertical,
      image_url: imageUrl || null,
      metadata,
    };

    const { data, error } = await supabaseServer.from("wishlist_items").insert(newItem);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const response = NextResponse.json({
      success: true,
      item: data || newItem,
      sessionId,
    });

    if (needsCookie && !userId) {
      response.cookies.set("fc_session_id", sessionId, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    }

    return response;
  } catch (err: any) {
    console.error("Wishlist POST Error:", err);
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
      let deleteQuery = supabaseServer.from("wishlist_items").delete();
      if (authUser?.userId) {
        deleteQuery = deleteQuery.eq("user_id", authUser.userId);
      } else {
        deleteQuery = deleteQuery.eq("session_id", sessionId);
      }
      await deleteQuery;
      return NextResponse.json({ success: true, cleared: true });
    }

    let deleteQuery = supabaseServer.from("wishlist_items").delete().eq("id", id);
    if (authUser?.userId) {
      deleteQuery = deleteQuery.eq("user_id", authUser.userId);
    } else {
      deleteQuery = deleteQuery.eq("session_id", sessionId);
    }
    await deleteQuery;

    return NextResponse.json({ success: true, removedId: id });
  } catch (err: any) {
    console.error("Wishlist DELETE Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
