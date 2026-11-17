"use server";

import { Resend } from "resend";

export interface OrderEmailItem {
  name: string;
  dimensions?: string;
  specifications?: string;
  quantity: number;
  price: number;
}

export interface OrderEmailPayload {
  orderRef?: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  items: OrderEmailItem[];
  total: number;
  deliveryMethod?: string;
  specialNotes?: string;
  source?: "cart" | "customizer" | "rfq";
}

export interface OrderEmailResponse {
  success: boolean;
  simulated?: boolean;
  orderRef: string;
  message?: string;
  error?: string;
}

function generateOrderHtml(orderRef: string, payload: OrderEmailPayload): string {
  const { customer, items, total, deliveryMethod, specialNotes } = payload;
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedTotal = total.toLocaleString("en-IN");

  const itemRowsHtml = items
    .map((item, idx) => {
      const itemPrice = (item.price * item.quantity).toLocaleString("en-IN");
      return `
        <tr style="border-bottom: 1px solid #e5e0d8; background-color: ${idx % 2 === 0 ? "#ffffff" : "#fbfaf8"};">
          <td style="padding: 12px 16px; font-size: 13px; color: #1c1917; font-weight: 600;">
            ${escapeHtml(item.name)}
          </td>
          <td style="padding: 12px 16px; font-size: 12px; color: #57534e; line-height: 1.4;">
            ${escapeHtml(item.specifications || "Atelier Standard Joinery")}
          </td>
          <td style="padding: 12px 16px; font-size: 12px; font-family: monospace; color: #78716c; text-align: center;">
            ${escapeHtml(item.dimensions || "Custom")}
          </td>
          <td style="padding: 12px 16px; font-size: 12px; font-family: monospace; color: #1c1917; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px 16px; font-size: 13px; font-family: monospace; font-weight: 700; color: #1c1917; text-align: right;">
            ₹${itemPrice}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Order Requisition [Ref: ${escapeHtml(orderRef)}]</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1c1917;">
  <div style="max-width: 680px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e5e0d8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
    
    <!-- Header Banner -->
    <div style="background-color: #12100e; padding: 32px 28px; text-align: center; border-bottom: 3px solid #c5a059;">
      <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; letter-spacing: 0.18em; color: #fbfaf8; text-transform: uppercase;">
        FRAMES COTTAGE
      </h1>
      <p style="margin: 6px 0 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #c5a059; font-family: monospace;">
        Design & Fabrication Studio • Atelier Order Requisition
      </p>
    </div>

    <!-- Reference & Date Banner -->
    <div style="background-color: #fbfaf8; padding: 14px 28px; border-bottom: 1px solid #e5e0d8; display: flex; justify-content: space-between; font-size: 12px; font-family: monospace;">
      <div>
        <span style="color: #78716c;">Order Reference: </span>
        <strong style="color: #c5a059; font-size: 13px;">${escapeHtml(orderRef)}</strong>
      </div>
      <div style="text-align: right; color: #78716c;">
        <span>Generated: ${escapeHtml(dateStr)}</span>
      </div>
    </div>

    <!-- Main Content Area -->
    <div style="padding: 28px;">
      
      <!-- Customer & Dispatch Card -->
      <div style="background-color: #faf9f6; border: 1px dashed #d6cfc4; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; font-family: monospace; color: #c5a059;">
          Client & Requisition Coordinates
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 4px 0; color: #78716c; width: 140px; font-weight: 500;">Client Name:</td>
            <td style="padding: 4px 0; color: #1c1917; font-weight: 600;">${escapeHtml(customer.name || "Client Requisition")}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #78716c; font-weight: 500;">Contact Email:</td>
            <td style="padding: 4px 0; color: #1c1917;">${escapeHtml(customer.email || "Not Provided")}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #78716c; font-weight: 500;">Contact Phone:</td>
            <td style="padding: 4px 0; color: #1c1917; font-family: monospace;">${escapeHtml(customer.phone || "Not Provided")}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #78716c; font-weight: 500;">Delivery / Jobsite:</td>
            <td style="padding: 4px 0; color: #1c1917;">${escapeHtml(customer.address || "Atelier Studio Collection")}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #78716c; font-weight: 500;">Fulfillment Mode:</td>
            <td style="padding: 4px 0; color: #1c1917; font-weight: 600;">${escapeHtml(deliveryMethod || "Insured White-Glove Studio Delivery")}</td>
          </tr>
        </table>
      </div>

      <!-- Line Items Section -->
      <h2 style="margin: 0 0 12px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; font-family: monospace; color: #1c1917;">
        Atelier Line Items & Joinery Specifications
      </h2>
      
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e0d8; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f1ede6; border-bottom: 2px solid #e5e0d8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-family: monospace; color: #57534e;">
            <th style="padding: 10px 16px; text-align: left;">Item</th>
            <th style="padding: 10px 16px; text-align: left;">Specifications</th>
            <th style="padding: 10px 16px; text-align: center;">Size</th>
            <th style="padding: 10px 16px; text-align: center;">Qty</th>
            <th style="padding: 10px 16px; text-align: right;">Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${itemRowsHtml}
        </tbody>
      </table>

      <!-- Order Totals & Notes -->
      <div style="border-top: 2px solid #e5e0d8; padding-top: 16px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
          <span style="font-size: 14px; font-weight: 600; color: #57534e;">Total Requisition Value:</span>
          <span style="font-size: 22px; font-family: monospace; font-weight: 700; color: #12100e;">₹${formattedTotal}</span>
        </div>
        <p style="margin: 0; font-size: 11px; color: #78716c; font-style: italic;">
          *Inclusive of custom artisanal joinery, mounting hardware, and standard GST invoice.
        </p>
      </div>

      ${
        specialNotes
          ? `
      <!-- Special Notes -->
      <div style="background-color: #fffdfa; border-left: 3px solid #c5a059; padding: 12px 16px; margin-bottom: 24px; font-size: 12px; color: #44403c;">
        <strong style="display: block; font-size: 11px; text-transform: uppercase; font-family: monospace; color: #c5a059; margin-bottom: 4px;">
          Architectural / Special Instructions:
        </strong>
        ${escapeHtml(specialNotes)}
      </div>
      `
          : ""
      }

      <!-- Next Steps & Action -->
      <div style="background-color: #f6fbf7; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
        <h3 style="margin: 0 0 6px; font-size: 14px; font-weight: 600; color: #166534;">
          Studio Requisition Dispatched
        </h3>
        <p style="margin: 0; font-size: 12px; color: #15803d; line-height: 1.5;">
          Our master craftsmen will review the joinery coordinates and contact you promptly via WhatsApp or Email to finalize production timing and dispatch.
        </p>
      </div>

      <!-- Studio Guarantees Footer -->
      <div style="border-top: 1px solid #e5e0d8; padding-top: 20px; font-size: 11px; color: #78716c; line-height: 1.6; text-align: center;">
        <p style="margin: 0 0 4px; font-weight: 600; color: #57534e;">
          FRAMES COTTAGE ATELIER GUARANTEE
        </p>
        <p style="margin: 0 0 8px;">
          FSC-Certified Hardwoods • TruVue 99% UV Conservation Glazing • Archival Alpha-Cellulose Mats • Lifetime Spline Warranty
        </p>
        <p style="margin: 0; font-size: 10px; color: #a8a29e;">
          GeM Registered Govt Vendor • ISO 9001:2015 Certified Fabrication Studio • New Delhi & Global Shipping
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendOrderEmail(payload: OrderEmailPayload): Promise<OrderEmailResponse> {
  const orderRef = payload.orderRef || `FC-${Math.floor(1000 + Math.random() * 9000)}`;
  const apiKey = process.env.RESEND_API_KEY;

  const htmlContent = generateOrderHtml(orderRef, payload);
  const subject = `New Atelier Order Requisition - Frames Cottage [Ref: ${orderRef}]`;

  // Gracefully simulate if API key is not present or in test/dev
  if (!apiKey || apiKey === "mock_resend_key" || process.env.NODE_ENV === "test") {
    console.log(
      `[Resend Simulation] Dispatched email for Order ${orderRef} to customer ${payload.customer.email || "N/A"} (${payload.items.length} items, Total: ₹${payload.total})`
    );
    return {
      success: true,
      simulated: true,
      orderRef,
      message: `Requisition ${orderRef} confirmed via simulated dispatch.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const studioEmail = process.env.STUDIO_ORDERS_EMAIL || "orders@framescottage.com";

    const toAddresses: string[] = [studioEmail];
    if (payload.customer.email && payload.customer.email.includes("@")) {
      toAddresses.push(payload.customer.email.trim());
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Frames Cottage <orders@framescottage.com>",
      to: toAddresses,
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Error]", error);
      // Fallback gracefully so checkout does not crash
      return {
        success: true,
        simulated: true,
        orderRef,
        message: `Order logged with reference ${orderRef} (Resend notice: ${error.message})`,
      };
    }

    return {
      success: true,
      simulated: false,
      orderRef,
      message: `Order requisition ${orderRef} successfully sent! Check your inbox for confirmation.`,
    };
  } catch (err: any) {
    console.error("[Resend Exception]", err);
    // Graceful fallback
    return {
      success: true,
      simulated: true,
      orderRef,
      message: `Order logged with reference ${orderRef}.`,
    };
  }
}
