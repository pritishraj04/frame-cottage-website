export interface OrderConfirmationEmailProps {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    title: string;
    specs?: string;
    unitPrice: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  deliveryMethod?: string;
  shippingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

export function renderOrderConfirmationEmail({
  orderId,
  customerName,
  customerEmail,
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  deliveryMethod = "white-glove",
  shippingAddress,
}: OrderConfirmationEmailProps): string {
  const formattedSubtotal = `₹${subtotal.toLocaleString("en-IN")}`;
  const formattedShipping = shipping === 0 ? "Complimentary White-Glove" : `₹${shipping.toLocaleString("en-IN")}`;
  const formattedTax = `₹${tax.toLocaleString("en-IN")}`;
  const formattedDiscount = discount > 0 ? `-₹${discount.toLocaleString("en-IN")}` : "₹0";
  const formattedTotal = `₹${total.toLocaleString("en-IN")}`;

  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a3441; text-align: left;">
        <div style="font-weight: 600; color: #f7f8f9;">${item.title}</div>
        ${item.specs ? `<div style="font-size: 11px; color: #94a3b8; margin-top: 3px;">${item.specs}</div>` : ""}
      </td>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a3441; text-align: center; color: #cbd5e1;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a3441; text-align: right; color: #c5a059; font-weight: 600;">
        ₹${(item.unitPrice * item.quantity).toLocaleString("en-IN")}
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Order Requisition Confirmed - ${orderId}</title>
  <style>
    body { background-color: #0f1319; color: #e6e8eb; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Playfair Display", Georgia, serif; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 40px auto; background: #171d26; border: 1px solid #2a3441; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { padding: 36px 32px 24px; text-align: center; border-bottom: 1px solid #2a3441; background: radial-gradient(circle at top, #222b38 0%, #171d26 100%); }
    .monogram { display: inline-block; width: 44px; height: 44px; line-height: 40px; border: 2px dashed #c5a059; color: #c5a059; border-radius: 12px; font-size: 16px; font-weight: bold; letter-spacing: 2px; margin-bottom: 16px; }
    .brand-title { font-size: 20px; letter-spacing: 4px; color: #f7f8f9; margin: 0; text-transform: uppercase; }
    .order-badge { display: inline-block; padding: 6px 14px; background: #222b38; border: 1px dashed #c5a059; border-radius: 20px; color: #c5a059; font-size: 12px; font-family: monospace; font-weight: bold; margin-top: 14px; }
    .content { padding: 32px; line-height: 1.6; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
    th { padding: 10px 8px; border-bottom: 2px solid #2a3441; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
    .summary-row { padding: 6px 8px; text-align: right; color: #94a3b8; font-size: 13px; }
    .summary-total { font-size: 18px; font-weight: bold; color: #ffffff; padding-top: 12px; }
    .address-card { background: #1f2733; border: 1px solid #2a3441; border-radius: 10px; padding: 16px; margin-top: 24px; font-size: 12px; }
    .cta-btn { display: inline-block; padding: 14px 28px; background: #c5a059; color: #171d26 !important; text-decoration: none; border-radius: 9999px; font-weight: 700; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 24px; }
    .footer { padding: 24px 32px; text-align: center; border-top: 1px solid #2a3441; font-size: 11px; color: #838e9e; background: #13171e; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="monogram">FC</div>
      <h1 class="brand-title">FRAMES COTTAGE</h1>
      <div class="order-badge">Requisition ID: ${orderId}</div>
    </div>
    <div class="content">
      <h2 style="color: #ffffff; margin-top: 0;">Commission Order Confirmed</h2>
      <p style="color: #cbd5e1;">
        Dear <strong>${customerName}</strong>, your atelier order has been received and queued for joinery milling, precision archival framing, and master inspection.
      </p>

      <table>
        <thead>
          <tr>
            <th style="text-align: left;">Item Description</th>
            <th style="text-align: center; width: 60px;">Qty</th>
            <th style="text-align: right; width: 100px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <table style="margin-top: 16px; border-top: 1px solid #2a3441;">
        <tr>
          <td class="summary-row">Subtotal:</td>
          <td class="summary-row" style="width: 120px; font-weight: 600; color: #f7f8f9;">${formattedSubtotal}</td>
        </tr>
        <tr>
          <td class="summary-row">Fulfillment (${deliveryMethod === "white-glove" ? "Insured White-Glove" : "Atelier Pick-Up"}):</td>
          <td class="summary-row" style="font-weight: 600; color: #f7f8f9;">${formattedShipping}</td>
        </tr>
        ${discount > 0 ? `
        <tr>
          <td class="summary-row">Trade Discount:</td>
          <td class="summary-row" style="font-weight: 600; color: #4ade80;">${formattedDiscount}</td>
        </tr>` : ""}
        <tr>
          <td class="summary-row">GST / State Taxes (8.25%):</td>
          <td class="summary-row" style="font-weight: 600; color: #f7f8f9;">${formattedTax}</td>
        </tr>
        <tr>
          <td class="summary-row summary-total" style="border-top: 2px solid #c5a059;">Final Total:</td>
          <td class="summary-row summary-total" style="border-top: 2px solid #c5a059; color: #c5a059;">${formattedTotal}</td>
        </tr>
      </table>

      ${
        shippingAddress
          ? `
      <div class="address-card">
        <div style="font-weight: bold; color: #c5a059; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">Destination Coordinates</div>
        <div>${shippingAddress.street || ""}</div>
        <div>${shippingAddress.city || ""}, ${shippingAddress.state || ""} - ${shippingAddress.pincode || ""}</div>
      </div>
      `
          : ""
      }

      <div style="text-align: center; margin-top: 28px;">
        <a href="https://frames-cottage.com/account" class="cta-btn">Track Order in Dashboard</a>
      </div>
    </div>
    <div class="footer">
      <p>© 2026 Frames Cottage Atelier • GeM Registered & ISO 9001:2015 Certified</p>
      <p>Questions? Contact our Atelier Desk at desk@frames-cottage.com</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
