import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/resend";
import { renderWelcomeEmail } from "@/lib/email/templates/welcome-email";
import { renderOrderConfirmationEmail } from "@/lib/email/templates/order-confirmation-email";
import { renderRfqConfirmationEmail } from "@/lib/email/templates/rfq-confirmation-email";
import { renderWishlistShareEmail } from "@/lib/email/templates/wishlist-share-email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, recipientEmail, payload } = body;

    if (!type || !recipientEmail) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters: type, recipientEmail" },
        { status: 400 }
      );
    }

    let subject = "";
    let html = "";

    switch (type) {
      case "welcome": {
        subject = "Welcome to Frames Cottage Atelier";
        html = renderWelcomeEmail({
          name: payload?.name || "Collector",
          email: recipientEmail,
          tier: payload?.tier,
        });
        break;
      }
      case "order_confirmation": {
        const orderId = payload?.orderId || `FC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        subject = `Commission Requisition Confirmed - ${orderId}`;
        html = renderOrderConfirmationEmail({
          orderId,
          customerName: payload?.customerName || "Valued Client",
          customerEmail: recipientEmail,
          items: payload?.items || [],
          subtotal: payload?.subtotal || 0,
          shipping: payload?.shipping || 0,
          tax: payload?.tax || 0,
          discount: payload?.discount || 0,
          total: payload?.total || 0,
          deliveryMethod: payload?.deliveryMethod,
          shippingAddress: payload?.shippingAddress,
        });
        break;
      }
      case "rfq_confirmation": {
        const refNo = payload?.referenceNo || `RFQ-2026-${Math.floor(100 + Math.random() * 900)}`;
        subject = `RFQ Dossier Received - ${refNo} [Frames Cottage Atelier]`;
        html = renderRfqConfirmationEmail({
          referenceNo: refNo,
          contactName: payload?.contactName || "Project Lead",
          email: recipientEmail,
          organization: payload?.organization,
          vertical: payload?.vertical || "Bespoke Art & Custom Framing",
          projectTitle: payload?.projectTitle,
          scopeDescription: payload?.scopeDescription,
          timeline: payload?.timeline,
          budgetRange: payload?.budgetRange,
          assignedLead: payload?.assignedLead,
        });
        break;
      }
      case "wishlist_share": {
        const sender = payload?.senderName || "An Atelier Collector";
        subject = `${sender} shared a spatial framing collection with you`;
        html = renderWishlistShareEmail({
          senderName: sender,
          recipientEmail,
          message: payload?.message,
          items: payload?.items || [],
        });
        break;
      }
      default:
        return NextResponse.json(
          { success: false, error: `Unsupported email type: ${type}` },
          { status: 400 }
        );
    }

    const result = await sendEmail({
      to: recipientEmail,
      subject,
      html,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: result.data?.id,
      message: `Email '${type}' dispatched successfully.`,
    });
  } catch (error: any) {
    console.error("Email API Route Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
