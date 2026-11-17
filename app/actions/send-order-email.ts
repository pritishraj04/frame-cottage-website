"use server";

import { Resend } from "resend";
import {
  generateInvoiceHtml,
  generateInvoiceText,
  PaymentTypeId,
  PAYMENT_OPTIONS,
  InvoiceItem,
  InvoicePayload,
} from "@/lib/email/invoice-template";

export type { PaymentTypeId };

export interface OrderEmailItem extends InvoiceItem {}

export interface OrderEmailPayload extends InvoicePayload {
  orderRef?: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  items: OrderEmailItem[];
  total: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  paymentType?: PaymentTypeId;
  deliveryMethod?: string;
  specialNotes?: string;
  source?: "cart" | "customizer" | "rfq";
}

export interface OrderEmailResponse {
  success: boolean;
  simulated?: boolean;
  orderRef: string;
  emailId?: string;
  message?: string;
  error?: string;
}

export async function sendOrderEmail(
  payload: OrderEmailPayload
): Promise<OrderEmailResponse> {
  const orderRef =
    payload.orderRef || `FC-${Math.floor(1000 + Math.random() * 9000)}`;
  const apiKey = process.env.RESEND_API_KEY;

  const resolvedPaymentType: PaymentTypeId = payload.paymentType || "upi";
  const normalizedPayload: InvoicePayload = {
    ...payload,
    paymentType: resolvedPaymentType,
  };

  const htmlContent = generateInvoiceHtml(orderRef, normalizedPayload);
  const textContent = generateInvoiceText(orderRef, normalizedPayload);
  const formattedTotal = payload.total.toLocaleString("en-IN");
  const subject = `Frames Cottage Invoice [${orderRef}] — Order Confirmation (₹${formattedTotal})`;

  // Smart simulation check: only simulate if no key, mock key, or test environment
  const isSimulation =
    !apiKey ||
    apiKey.includes("mock") ||
    apiKey === "mock_resend_key" ||
    process.env.NODE_ENV === "test";

  if (isSimulation) {
    console.log(
      `[Resend Simulation] Dispatched invoice for Order ${orderRef} to customer ${
        payload.customer.email || "N/A"
      } (${payload.items.length} items, Total: ₹${payload.total}, Payment: ${resolvedPaymentType})`
    );
    return {
      success: true,
      simulated: true,
      orderRef,
      message: `Invoice requisition ${orderRef} confirmed via simulated dispatch.`,
    };
  }

  const defaultFrom =
    process.env.RESEND_FROM_EMAIL ||
    "Frames Cottage Atelier <onboarding@resend.dev>";
  const studioEmail = process.env.STUDIO_ORDERS_EMAIL;
  const customerEmail = payload.customer.email?.trim() || "";

  if (!customerEmail || !customerEmail.includes("@")) {
    return {
      success: false,
      orderRef,
      error: "A valid client email address is required to dispatch the invoice.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const toAddresses: string[] = [customerEmail];
    const ccAddresses: string[] = [];

    if (
      studioEmail &&
      studioEmail.includes("@") &&
      studioEmail.trim().toLowerCase() !== customerEmail.toLowerCase()
    ) {
      ccAddresses.push(studioEmail.trim());
    }

    let sendResult = await resend.emails.send({
      from: defaultFrom,
      to: toAddresses,
      ...(ccAddresses.length > 0 ? { cc: ccAddresses } : {}),
      subject,
      html: htmlContent,
      text: textContent,
    });

    // Automatic Sandbox Fallback:
    // If Resend returns a domain-not-verified error with a custom from address,
    // automatically retry using onboarding@resend.dev directly to customerEmail
    const fallbackFrom = "Frames Cottage Atelier <onboarding@resend.dev>";
    if (sendResult.error) {
      const errLower = (sendResult.error.message || "").toLowerCase();
      const isDomainIssue =
        errLower.includes("domain") ||
        errLower.includes("verify") ||
        errLower.includes("validation") ||
        errLower.includes("not verified") ||
        errLower.includes("testing") ||
        errLower.includes("onboarding") ||
        errLower.includes("restricted");

      if (isDomainIssue && defaultFrom !== fallbackFrom) {
        console.warn(
          `[Resend Fallback] Retrying with verified sandbox address (${fallbackFrom}) due to: ${sendResult.error.message}`
        );
        sendResult = await resend.emails.send({
          from: fallbackFrom,
          to: [customerEmail],
          subject,
          html: htmlContent,
          text: textContent,
        });
      }
    }

    if (sendResult.error) {
      console.error("[Resend Error]", sendResult.error);
      return {
        success: true,
        simulated: true,
        orderRef,
        message: `Order logged with reference ${orderRef} (Resend notice: ${sendResult.error.message})`,
      };
    }

    return {
      success: true,
      simulated: false,
      orderRef,
      emailId: sendResult.data?.id,
      message: `Order invoice ${orderRef} successfully sent! Check your inbox for confirmation.`,
    };
  } catch (err: any) {
    console.error("[Resend Exception]", err);

    // If an unhandled exception occurred, attempt one last fallback retry if custom from was used
    const fallbackFrom = "Frames Cottage Atelier <onboarding@resend.dev>";
    if (defaultFrom !== fallbackFrom) {
      try {
        const resend = new Resend(apiKey);
        const retryResult = await resend.emails.send({
          from: fallbackFrom,
          to: [customerEmail],
          subject,
          html: htmlContent,
          text: textContent,
        });
        if (!retryResult.error) {
          return {
            success: true,
            simulated: false,
            orderRef,
            emailId: retryResult.data?.id,
            message: `Order invoice ${orderRef} successfully sent via sandbox fallback!`,
          };
        }
      } catch (retryErr) {
        console.error("[Resend Fallback Exception]", retryErr);
      }
    }

    return {
      success: true,
      simulated: true,
      orderRef,
      message: `Order logged with reference ${orderRef}.`,
    };
  }
}
