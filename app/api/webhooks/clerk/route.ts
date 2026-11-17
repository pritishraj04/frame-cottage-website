import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import { renderWelcomeEmail } from "@/lib/email/templates/welcome-email";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let event: any;

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { type, data } = event;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Missing event type or data in webhook payload" },
        { status: 400 }
      );
    }

    const userId = data.id;
    const email =
      data.email_addresses?.find((e: any) => e.id === data.primary_email_address_id)?.email_address ||
      data.email_addresses?.[0]?.email_address ||
      data.email ||
      "";

    const fullName =
      data.full_name ||
      [data.first_name, data.last_name].filter(Boolean).join(" ") ||
      null;

    const avatarUrl = data.image_url || data.profile_image_url || null;
    const role = data.public_metadata?.role || "collector";
    const tier = data.public_metadata?.tier || "Atelier Collector • Tier I";
    const company = data.public_metadata?.company || null;

    switch (type) {
      case "user.created": {
        await supabaseServer.from("profiles").upsert({
          id: userId,
          email,
          full_name: fullName,
          avatar_url: avatarUrl,
          role,
          tier,
          company,
          metadata: data.public_metadata || {},
        });

        if (email) {
          await sendEmail({
            to: email,
            subject: "Welcome to Frames Cottage Atelier",
            html: renderWelcomeEmail({
              name: fullName || "Valued Collector",
              email,
              tier,
            }),
          });
        }
        break;
      }

      case "user.updated": {
        await supabaseServer.from("profiles").upsert({
          id: userId,
          email,
          full_name: fullName,
          avatar_url: avatarUrl,
          role,
          tier,
          company,
          metadata: data.public_metadata || {},
        });
        break;
      }

      case "user.deleted": {
        await supabaseServer.from("profiles").delete().eq("id", userId);
        break;
      }

      default:
        console.log(`[Clerk Webhook] Ignored unhandled event: ${type}`);
    }

    return NextResponse.json({ success: true, received: type, userId });
  } catch (error: any) {
    console.error("[Clerk Webhook Error]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Webhook handling error" },
      { status: 500 }
    );
  }
}
