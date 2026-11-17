import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getOptionalAuthUser } from "@/lib/auth/clerk";

export async function GET(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser();
    const { searchParams } = new URL(req.url);
    const requestedId = searchParams.get("userId") || authUser?.userId;

    if (!requestedId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No active session or userId specified" },
        { status: 401 }
      );
    }

    const { data: profile, error } = await supabaseServer
      .from("profiles")
      .select("*")
      .eq("id", requestedId)
      .single();

    if (error || !profile) {
      // If not yet in database, construct from authUser
      const fallbackProfile = {
        id: requestedId,
        email: authUser?.email || "collector@frames-cottage.com",
        full_name: authUser?.fullName || "Atelier Collector",
        avatar_url: authUser?.imageUrl || null,
        role: "collector",
        tier: "Atelier Collector • Tier I",
        company: null,
        phone: null,
        metadata: {},
      };
      return NextResponse.json({ success: true, profile: fallbackProfile, isFallback: true });
    }

    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    console.error("Profile GET Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser();
    const body = await req.json();

    const targetId = body?.id || authUser?.userId;

    if (!targetId) {
      return NextResponse.json(
        { success: false, error: "Missing userId or active session" },
        { status: 400 }
      );
    }

    const updateFields: Record<string, any> = {};
    if (body.full_name !== undefined) updateFields.full_name = body.full_name;
    if (body.email !== undefined) updateFields.email = body.email;
    if (body.company !== undefined) updateFields.company = body.company;
    if (body.phone !== undefined) updateFields.phone = body.phone;
    if (body.tier !== undefined) updateFields.tier = body.tier;
    if (body.role !== undefined) updateFields.role = body.role;
    if (body.metadata !== undefined) updateFields.metadata = body.metadata;

    updateFields.updated_at = new Date().toISOString();

    const { data, error } = await supabaseServer
      .from("profiles")
      .upsert({ id: targetId, ...updateFields });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      profile: data || { id: targetId, ...updateFields },
    });
  } catch (err: any) {
    console.error("Profile PUT Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
