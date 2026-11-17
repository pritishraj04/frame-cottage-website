export type PaymentTypeId =
  | "upi"
  | "bank-transfer"
  | "pay-on-delivery"
  | "card-link";

export interface PaymentOption {
  id: PaymentTypeId;
  label: string;
  shortLabel: string;
  description: string;
  settlementNote: string;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "upi",
    label: "UPI / Instant QR",
    shortLabel: "Instant UPI",
    description: "Zero-fee instant UPI transfer upon studio proof approval.",
    settlementNote:
      "A master artisan will share the studio QR code alongside your high-resolution fabrication proof via WhatsApp / Email.",
  },
  {
    id: "bank-transfer",
    label: "NEFT / IMPS / RTGS",
    shortLabel: "Bank Transfer",
    description:
      "Direct bank transfer for residential & corporate invoices.",
    settlementNote:
      "Atelier bank coordinates (HDFC / ICICI Current Account) and GST tax invoice will be dispatched upon proof confirmation.",
  },
  {
    id: "card-link",
    label: "Card / Secure Payment Link",
    shortLabel: "Card Link",
    description: "Encrypted payment link dispatched via email & WhatsApp.",
    settlementNote:
      "A 256-bit encrypted card/netbanking link (Razorpay/Stripe) will be generated once dimensions are validated.",
  },
  {
    id: "pay-on-delivery",
    label: "Pay on Delivery / Studio Pick-Up",
    shortLabel: "Pay on Delivery",
    description: "Cash, Card, or UPI upon white-glove inspection.",
    settlementNote:
      "Inspect frame corners, joinery splines, and glazing clarity in person before completing settlement.",
  },
];

export interface InvoiceItem {
  name: string;
  dimensions?: string;
  specifications?: string;
  quantity: number;
  price: number;
}

export interface InvoiceCustomer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface InvoicePayload {
  orderRef?: string;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
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

export function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getPaymentOption(id?: PaymentTypeId): PaymentOption {
  const match = PAYMENT_OPTIONS.find((opt) => opt.id === id);
  return match || PAYMENT_OPTIONS[0]; // defaults to "upi"
}

export function generateInvoiceHtml(
  orderRef: string,
  payload: InvoicePayload
): string {
  const {
    customer,
    items,
    total,
    subtotal,
    shipping,
    tax,
    discount,
    deliveryMethod,
    specialNotes,
    paymentType,
  } = payload;

  const paymentOption = getPaymentOption(paymentType);

  const calculatedSubtotal = subtotal ?? total;
  const shippingCost = shipping ?? 0;
  const taxCost = tax ?? 0;
  const discountCost = discount ?? 0;

  const formattedTotal = total.toLocaleString("en-IN");
  const formattedSubtotal = calculatedSubtotal.toLocaleString("en-IN");
  const formattedShipping =
    shippingCost > 0 ? `₹${shippingCost.toLocaleString("en-IN")}` : "Complimentary (White-Glove)";
  const formattedTax =
    taxCost > 0 ? `₹${taxCost.toLocaleString("en-IN")}` : "Included in Price";
  const formattedDiscount =
    discountCost > 0 ? `-₹${discountCost.toLocaleString("en-IN")}` : null;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, "") ||
    "919876543210";
  const whatsappCtaUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    `Hello Frames Cottage Atelier, confirming Requisition & Invoice [Ref: ${orderRef}]. Please provide fabrication schedule and proof review.`
  )}`;

  const itemRowsHtml = items
    .map((item, idx) => {
      const lineTotal = (item.price * item.quantity).toLocaleString("en-IN");
      const bgColor = idx % 2 === 0 ? "#17191E" : "#131418";
      return `
        <tr style="background-color: ${bgColor}; border-bottom: 1px solid #2A2824;">
          <td style="padding: 14px 16px; font-size: 13px; color: #F7F5F0; font-weight: 600; vertical-align: top;">
            ${escapeHtml(item.name)}
            <div style="font-size: 11px; color: #A8A29E; font-weight: 400; margin-top: 4px; line-height: 1.4;">
              ${escapeHtml(item.specifications || "Hand-milled solid moulding • pH-neutral conservation matting")}
            </div>
          </td>
          <td style="padding: 14px 12px; font-size: 12px; font-family: 'Courier New', Courier, monospace; color: #C5A059; text-align: center; vertical-align: top; white-space: nowrap;">
            ${escapeHtml(item.dimensions || "Standard")}
          </td>
          <td style="padding: 14px 12px; font-size: 12px; font-family: 'Courier New', Courier, monospace; color: #F7F5F0; text-align: center; vertical-align: top;">
            ${item.quantity}
          </td>
          <td style="padding: 14px 16px; font-size: 13px; font-family: 'Courier New', Courier, monospace; font-weight: 700; color: #F7F5F0; text-align: right; vertical-align: top; white-space: nowrap;">
            ₹${lineTotal}
          </td>
        </tr>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Frames Cottage Invoice [${escapeHtml(orderRef)}]</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0E0E10; }
  </style>
</head>
<body style="margin: 0; padding: 24px 8px; background-color: #0E0E10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #F7F5F0;">

  <!-- Outer Container Table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 0;">

        <!-- Main Card Wrapper (max 640px) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; background-color: #17191E; border: 1px dashed #3A352C; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.65);">

          <!-- Top Architectural Gold Accent Line -->
          <tr>
            <td style="height: 3px; background-color: #C5A059; line-height: 3px; font-size: 3px;">&nbsp;</td>
          </tr>

          <!-- Studio Header & Monogram Frame -->
          <tr>
            <td align="center" style="padding: 36px 28px 24px 28px; background-color: #121317; border-bottom: 1px solid #262420;">
              
              <!-- Monogram Frame -->
              <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 14px;">
                <tr>
                  <td align="center" style="width: 44px; height: 44px; border: 1.5px solid #C5A059; background-color: #17191E; border-radius: 6px;">
                    <span style="font-family: Georgia, 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #C5A059; letter-spacing: 0.1em;">FC</span>
                  </td>
                </tr>
              </table>

              <h1 style="margin: 0; font-family: Georgia, 'Playfair Display', serif; font-size: 26px; font-weight: 700; letter-spacing: 0.22em; color: #F7F5F0; text-transform: uppercase;">
                FRAMES COTTAGE
              </h1>
              
              <div style="margin-top: 6px; font-size: 10px; font-family: 'Courier New', Courier, monospace; letter-spacing: 0.28em; text-transform: uppercase; color: #C5A059;">
                BESPOKE FRAMING ATELIER &amp; CONSERVATION FABRICATION
              </div>

              <div style="display: inline-block; margin-top: 16px; padding: 5px 14px; background-color: #211E18; border: 1px dashed #C5A059; border-radius: 20px;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #C5A059;">
                  OFFICIAL ATELIER INVOICE &amp; ORDER CONFIRMATION
                </span>
              </div>

            </td>
          </tr>

          <!-- Invoice Metadata Bar -->
          <tr>
            <td style="padding: 16px 24px; background-color: #131418; border-bottom: 1px dashed #3A352C;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" align="left" style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #A8A29E; line-height: 1.6;">
                    INVOICE REF: <strong style="color: #C5A059; font-size: 13px;">${escapeHtml(orderRef)}</strong><br>
                    DATE (IST): <span style="color: #F7F5F0;">${escapeHtml(dateStr)}</span>
                  </td>
                  <td width="50%" align="right" style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #A8A29E; line-height: 1.6;">
                    STATUS: <strong style="color: #10B981; letter-spacing: 0.08em;">CONFIRMED</strong><br>
                    FULFILLMENT: <span style="color: #F7F5F0;">${escapeHtml(deliveryMethod || "Insured White-Glove Transit")}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Padding -->
          <tr>
            <td style="padding: 28px 24px;">

              <!-- Client Billing & Delivery Coordinates Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121317; border: 1px dashed #3A352C; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #C5A059; margin-bottom: 12px; font-weight: 700;">
                      CLIENT BILLING &amp; DISPATCH COORDINATES
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px; line-height: 1.6;">
                      <tr>
                        <td width="130" style="color: #A8A29E; padding-bottom: 4px; vertical-align: top;">Client Name:</td>
                        <td style="color: #F7F5F0; font-weight: 600; padding-bottom: 4px; vertical-align: top;">${escapeHtml(customer.name || "Client Requisition")}</td>
                      </tr>
                      <tr>
                        <td style="color: #A8A29E; padding-bottom: 4px; vertical-align: top;">Contact Email:</td>
                        <td style="color: #F7F5F0; padding-bottom: 4px; vertical-align: top;">${escapeHtml(customer.email || "Not Provided")}</td>
                      </tr>
                      <tr>
                        <td style="color: #A8A29E; padding-bottom: 4px; vertical-align: top;">Phone:</td>
                        <td style="color: #F7F5F0; font-family: 'Courier New', Courier, monospace; padding-bottom: 4px; vertical-align: top;">${escapeHtml(customer.phone || "Not Provided")}</td>
                      </tr>
                      <tr>
                        <td style="color: #A8A29E; vertical-align: top;">Delivery Address:</td>
                        <td style="color: #F7F5F0; vertical-align: top;">${escapeHtml(customer.address || "Atelier Studio Collection (New Delhi)")}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Itemized Joinery & Artwork Header -->
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #C5A059; margin-bottom: 10px; font-weight: 700;">
                ITEMIZED FABRICATION &amp; JOINERY SPECIFICATIONS
              </div>

              <!-- Itemized Joinery Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #2A2824; border-radius: 8px; overflow: hidden; margin-bottom: 22px;">
                <thead>
                  <tr style="background-color: #211E18; border-bottom: 1px solid #3A352C;">
                    <th align="left" style="padding: 12px 16px; font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #C5A059;">Artwork / Frame Spec</th>
                    <th align="center" style="padding: 12px 10px; font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #C5A059; width: 80px;">Dimensions</th>
                    <th align="center" style="padding: 12px 10px; font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #C5A059; width: 44px;">Qty</th>
                    <th align="right" style="padding: 12px 16px; font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #C5A059; width: 90px;">Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRowsHtml}
                </tbody>
              </table>

              <!-- Financial Summary Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; background-color: #121317; border: 1px dashed #3A352C; border-radius: 8px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 12px; line-height: 1.8;">
                      <tr>
                        <td align="left" style="color: #A8A29E;">Subtotal Requisition:</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; color: #F7F5F0;">₹${formattedSubtotal}</td>
                      </tr>
                      <tr>
                        <td align="left" style="color: #A8A29E;">Insured White-Glove Handling &amp; Transit:</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; color: #F7F5F0;">${formattedShipping}</td>
                      </tr>
                      ${
                        formattedDiscount
                          ? `
                      <tr>
                        <td align="left" style="color: #C5A059;">Architectural Trade Discount:</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; color: #C5A059; font-weight: 600;">${formattedDiscount}</td>
                      </tr>
                      `
                          : ""
                      }
                      <tr>
                        <td align="left" style="color: #A8A29E;">Tax Assessment (18% GST):</td>
                        <td align="right" style="font-family: 'Courier New', Courier, monospace; color: #A8A29E;">${formattedTax}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 8px; border-top: 1px solid #262420;"></td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size: 14px; font-weight: 700; color: #F7F5F0; text-transform: uppercase; letter-spacing: 0.08em;">
                          Grand Total (INR):
                        </td>
                        <td align="right" style="font-size: 22px; font-family: 'Courier New', Courier, monospace; font-weight: 700; color: #C5A059;">
                          ₹${formattedTotal}
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top: 10px; font-size: 10px; color: #78716C; font-style: italic; line-height: 1.4;">
                      *Inclusive of custom conservation framing, archival joinery, hanging hardware, and GST tax invoice.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Selected Payment Type & Settlement Details Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #191B21; border-left: 3px solid #C5A059; border-top: 1px dashed #3A352C; border-right: 1px dashed #3A352C; border-bottom: 1px dashed #3A352C; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #C5A059; font-weight: 700;">
                        SELECTED PAYMENT METHOD
                      </span>
                    </div>
                    <div style="font-size: 14px; font-weight: 700; color: #F7F5F0; margin-bottom: 4px;">
                      ${escapeHtml(paymentOption.label)}
                    </div>
                    <div style="font-size: 12px; color: #A8A29E; line-height: 1.5; margin-bottom: 10px;">
                      ${escapeHtml(paymentOption.description)}
                    </div>
                    <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #C5A059; background-color: #121317; border: 1px dashed #3A352C; padding: 10px 12px; border-radius: 6px; line-height: 1.5;">
                      <strong>Settlement Protocol:</strong> ${escapeHtml(paymentOption.settlementNote)}
                    </div>
                    <div style="font-size: 11px; color: #78716C; margin-top: 8px; font-style: italic;">
                      🛡️ Assurance: No online charge is deducted before our master framers confirm your specifications and timber selection.
                    </div>
                  </td>
                </tr>
              </table>

              ${
                specialNotes
                  ? `
              <!-- Special Architectural Instructions -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121317; border-left: 3px solid #A8A29E; border-top: 1px dashed #262420; border-right: 1px dashed #262420; border-bottom: 1px dashed #262420; border-radius: 0 6px 6px 0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #A8A29E; font-weight: 700; margin-bottom: 4px;">
                      ARCHITECTURAL / CLIENT INSTRUCTIONS
                    </div>
                    <div style="font-size: 12px; color: #F7F5F0; line-height: 1.5;">
                      ${escapeHtml(specialNotes)}
                    </div>
                  </td>
                </tr>
              </table>
              `
                  : ""
              }

              <!-- Atelier Craftsmanship & Archival Assurance (2x2 Grid) -->
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #C5A059; margin-bottom: 12px; font-weight: 700; text-align: center;">
                ATELIER CRAFTSMANSHIP &amp; ARCHIVAL ASSURANCE
              </div>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 26px;">
                <tr>
                  <!-- Card 1 -->
                  <td width="50%" align="left" style="padding: 0 6px 12px 0; vertical-align: top;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121317; border: 1px dashed #3A352C; border-radius: 8px; height: 100%;">
                      <tr>
                        <td style="padding: 14px 14px;">
                          <div style="font-size: 12px; font-weight: 700; color: #F7F5F0; margin-bottom: 4px;">
                            99% UV Conservation Glazing
                          </div>
                          <div style="font-size: 11px; color: #A8A29E; line-height: 1.4;">
                            TruVue® museum-grade anti-fade protection prevents irreversible artwork degradation.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Card 2 -->
                  <td width="50%" align="left" style="padding: 0 0 12px 6px; vertical-align: top;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121317; border: 1px dashed #3A352C; border-radius: 8px; height: 100%;">
                      <tr>
                        <td style="padding: 14px 14px;">
                          <div style="font-size: 12px; font-weight: 700; color: #F7F5F0; margin-bottom: 4px;">
                            FSC-Certified Solid Hardwoods
                          </div>
                          <div style="font-size: 11px; color: #A8A29E; line-height: 1.4;">
                            Sustainably harvested walnut, white oak, brass &amp; gilded profiles crafted for generations.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <!-- Card 3 -->
                  <td width="50%" align="left" style="padding: 0 6px 0 0; vertical-align: top;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121317; border: 1px dashed #3A352C; border-radius: 8px; height: 100%;">
                      <tr>
                        <td style="padding: 14px 14px;">
                          <div style="font-size: 12px; font-weight: 700; color: #F7F5F0; margin-bottom: 4px;">
                            100% Insured Transit Assurance
                          </div>
                          <div style="font-size: 11px; color: #A8A29E; line-height: 1.4;">
                            Complete damage replacement guarantee door-to-door with bespoke wooden crating.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Card 4 -->
                  <td width="50%" align="left" style="padding: 0 0 0 6px; vertical-align: top;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121317; border: 1px dashed #3A352C; border-radius: 8px; height: 100%;">
                      <tr>
                        <td style="padding: 14px 14px;">
                          <div style="font-size: 12px; font-weight: 700; color: #F7F5F0; margin-bottom: 4px;">
                            Lifetime Structural Warranty
                          </div>
                          <div style="font-size: 11px; color: #A8A29E; line-height: 1.4;">
                            Hand-milled spline joinery &amp; pH-neutral 4-ply cotton rag mats that never yellow.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Direct WhatsApp CTA Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${whatsappCtaUrl}" target="_blank" style="display: inline-block; background-color: #C5A059; color: #0E0E10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; text-decoration: none; padding: 14px 28px; border-radius: 30px; box-shadow: 0 4px 14px rgba(197, 160, 89, 0.35);">
                      Confirm or Track on WhatsApp &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Refined Atelier Footer -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px dashed #3A352C; padding-top: 20px;">
                <tr>
                  <td align="center" style="font-size: 11px; color: #A8A29E; line-height: 1.6; text-align: center;">
                    <div style="font-weight: 700; color: #F7F5F0; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px;">
                      Frames Cottage &bull; New Delhi &bull; ISO 9001:2015 Certified Fabrication Studio
                    </div>
                    <div>
                      Bespoke Framing &bull; Conservation Glazing &bull; Architectural Fabrication &bull; White-Glove Logistics
                    </div>
                    <div style="margin-top: 8px; font-size: 10px; color: #57534E;">
                      GeM Registered Government Vendor &bull; Studio: Okhla Industrial Area, Phase III, New Delhi 110020
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>
        <!-- End Main Card Wrapper -->

      </td>
    </tr>
  </table>
  <!-- End Outer Container Table -->

</body>
</html>`;
}

export function generateInvoiceText(
  orderRef: string,
  payload: InvoicePayload
): string {
  const {
    customer,
    items,
    total,
    subtotal,
    shipping,
    discount,
    deliveryMethod,
    specialNotes,
    paymentType,
  } = payload;

  const paymentOption = getPaymentOption(paymentType);
  const calculatedSubtotal = subtotal ?? total;
  const shippingCost = shipping ?? 0;
  const discountCost = discount ?? 0;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, "") ||
    "919876543210";

  const lines: string[] = [
    "============================================================",
    "FRAMES COTTAGE — BESPOKE FRAMING ATELIER",
    "OFFICIAL ATELIER INVOICE & ORDER CONFIRMATION",
    "============================================================",
    "",
    `Invoice Reference : ${orderRef}`,
    `Date & Time (IST) : ${dateStr}`,
    `Fulfillment Mode  : ${deliveryMethod || "Insured White-Glove Transit"}`,
    `Invoice Status    : CONFIRMED`,
    "",
    "------------------------------------------------------------",
    "CLIENT BILLING & DISPATCH COORDINATES",
    "------------------------------------------------------------",
    `Client Name      : ${customer.name || "Client Requisition"}`,
    `Email            : ${customer.email || "Not Provided"}`,
    `Phone            : ${customer.phone || "Not Provided"}`,
    `Delivery Address : ${customer.address || "Atelier Studio Collection (New Delhi)"}`,
    "",
    "------------------------------------------------------------",
    "SELECTED PAYMENT TYPE",
    "------------------------------------------------------------",
    `Payment Method   : ${paymentOption.label}`,
    `Description      : ${paymentOption.description}`,
    `Settlement Note  : ${paymentOption.settlementNote}`,
    "Assurance        : No charge deducted prior to master framer verification.",
    "",
    "------------------------------------------------------------",
    "ITEMIZED FABRICATION & JOINERY SPECIFICATIONS",
    "------------------------------------------------------------",
  ];

  items.forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toLocaleString("en-IN");
    lines.push(
      `${index + 1}. ${item.name}`,
      `   • Dimensions: ${item.dimensions || "Standard"}`,
      `   • Specifications: ${item.specifications || "Hand-milled solid moulding"}`,
      `   • Quantity: ${item.quantity} × ₹${item.price.toLocaleString("en-IN")} = ₹${itemTotal}`,
      ""
    );
  });

  lines.push(
    "------------------------------------------------------------",
    "FINANCIAL REQUISITION SUMMARY",
    "------------------------------------------------------------",
    `Subtotal         : ₹${calculatedSubtotal.toLocaleString("en-IN")}`,
    `Transit / Crating: ${shippingCost > 0 ? `₹${shippingCost.toLocaleString("en-IN")}` : "Complimentary White-Glove"}`
  );

  if (discountCost > 0) {
    lines.push(`Trade Discount   : -₹${discountCost.toLocaleString("en-IN")}`);
  }

  lines.push(
    `Taxes (18% GST)  : Included in Atelier Value`,
    `GRAND TOTAL      : ₹${total.toLocaleString("en-IN")}`,
    "",
    "------------------------------------------------------------",
    "ATELIER CRAFTSMANSHIP & ARCHIVAL ASSURANCE",
    "------------------------------------------------------------",
    "1. 99% UV Conservation Glazing — TruVue® museum-grade anti-fade protection.",
    "2. FSC-Certified Solid Hardwoods — Sustainably harvested walnut, white oak, brass.",
    "3. 100% Insured Transit Assurance — Complete damage replacement guarantee door-to-door.",
    "4. Lifetime Structural Warranty — Hand-milled spline joinery & pH-neutral 4-ply cotton rag mats.",
    ""
  );

  if (specialNotes) {
    lines.push(
      "------------------------------------------------------------",
      "SPECIAL ARCHITECTURAL INSTRUCTIONS",
      "------------------------------------------------------------",
      specialNotes,
      ""
    );
  }

  lines.push(
    "------------------------------------------------------------",
    "DIRECT ATELIER SUPPORT & WHATSAPP TRACKING",
    "------------------------------------------------------------",
    `Chat / Track: https://wa.me/${whatsappPhone}?text=Hello%20Frames%20Cottage%2C%20tracking%20Invoice%20${orderRef}`,
    "",
    "Frames Cottage • New Delhi • ISO 9001:2015 Certified Fabrication Studio",
    "============================================================"
  );

  return lines.join("\n");
}
