import type { CartItem } from "@/lib/store/storefront-context";

export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

/**
 * Returns clean digits for wa.me URL
 */
export function getWhatsAppNumber(): string {
  return WHATSAPP_PHONE.replace(/[^0-9]/g, "");
}

/**
 * Creates a direct WhatsApp chat link with an optional prefilled message
 */
export function createWhatsAppChatUrl(customMessage?: string): string {
  const phone = getWhatsAppNumber();
  const text =
    customMessage ||
    "Hello Frames Cottage Studio, I would like to consult on a bespoke framing or spatial fabrication project.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Formats full Cart Requisition into WhatsApp order URL
 */
export function createWhatsAppCartOrderUrl(
  cart: CartItem[],
  total: number,
  deliveryMethod: string,
  notes?: string,
  customer?: { name?: string; phone?: string; address?: string },
  paymentMethod?: string
): string {
  const phone = getWhatsAppNumber();

  const formattedItems = cart
    .map((item, index) => {
      const parts = [
        `${index + 1}. *${item.title}*`,
        `   • Dimensions: ${item.dimensions || "Custom standard"}`,
        `   • Specs: ${item.specs || item.category || "Atelier Handcrafted"}`,
        `   • Quantity: ${item.quantity} × ₹${item.unitPrice.toLocaleString("en-IN")}`,
      ];
      return parts.join("\n");
    })
    .join("\n\n");

  const fulfillmentLabel =
    deliveryMethod === "white-glove"
      ? "Insured White-Glove Courier"
      : deliveryMethod === "atelier"
      ? "Atelier Pick-Up / Direct Studio Delivery"
      : deliveryMethod;

  const customerLines: string[] = [];
  if (customer?.name) customerLines.push(`Name: ${customer.name}`);
  if (customer?.phone) customerLines.push(`Phone: ${customer.phone}`);
  if (customer?.address) customerLines.push(`Delivery Address: ${customer.address}`);

  const lines = [
    "✨ *Order Requisition - Frames Cottage* ✨",
    "",
    "Hello Frames Cottage Studio, I would like to place an order:",
    "",
    "📋 *Items:*",
    formattedItems || "No items listed",
    "",
    `💰 *Total Amount:* ₹${total.toLocaleString("en-IN")}`,
    `🚚 *Fulfillment:* ${fulfillmentLabel}`,
  ];

  if (paymentMethod) {
    lines.push(`💳 *Payment Method:* ${paymentMethod}`);
  }

  if (customerLines.length > 0) {
    lines.push(`👤 *Customer Details:*\n   • ${customerLines.join("\n   • ")}`);
  }

  if (notes && notes.trim()) {
    lines.push(`📝 *Notes:* ${notes.trim()}`);
  }

  lines.push(
    "",
    "Please confirm availability, payment instructions, and dispatch timeline. Thank you!"
  );

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats Studio Customizer specifications into WhatsApp order URL
 */
export function createWhatsAppCustomizerUrl(spec: {
  mouldingName: string;
  matName: string;
  matColor: string;
  glazingName: string;
  size: string;
  artworkName: string;
  price: number;
  paymentMethod?: string;
}): string {
  const phone = getWhatsAppNumber();

  const lines = [
    "✨ *Custom Framing Requisition - Frames Cottage* ✨",
    "",
    "Hello Frames Cottage Studio, I would like to order a bespoke custom frame:",
    "",
    "🖼️ *Frame Configuration:*",
    `   • Moulding: ${spec.mouldingName}`,
    `   • Matting: ${spec.matName} (${spec.matColor})`,
    `   • Glazing: ${spec.glazingName}`,
    `   • Dimensions: ${spec.size}`,
    `   • Artwork: ${spec.artworkName}`,
    "",
    `💰 *Total Amount:* ₹${spec.price.toLocaleString("en-IN")}`,
  ];

  if (spec.paymentMethod) {
    lines.push(`💳 *Payment Method:* ${spec.paymentMethod}`);
  }

  lines.push(
    "",
    "Please confirm framing feasibility, fabrication schedule, and payment details. Thank you!"
  );

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a single product card / curated frame into WhatsApp order URL
 */
export function createWhatsAppProductUrl(
  productTitle: string,
  price: number,
  size?: string
): string {
  const phone = getWhatsAppNumber();

  const lines = [
    "✨ *Product Order Requisition - Frames Cottage* ✨",
    "",
    "Hello Frames Cottage Studio, I would like to order:",
    "",
    `🖼️ *Product:* ${productTitle}`,
    size ? `📏 *Size:* ${size}` : "",
    `💰 *Price:* ₹${price.toLocaleString("en-IN")}`,
    "",
    "Please confirm availability and dispatch timeline. Thank you!",
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats an RFQ proposal / tender inquiry into WhatsApp URL
 */
export function createWhatsAppRfqUrl(rfq: {
  referenceId?: string;
  clientName: string;
  organization?: string;
  verticals?: string[];
  scope?: string;
  location?: string;
  tenderId?: string;
}): string {
  const phone = getWhatsAppNumber();

  const lines = [
    "✨ *Project RFQ Specification - Frames Cottage* ✨",
    "",
    "Hello Frames Cottage Studio, I would like to submit an architectural specification & RFQ:",
    "",
    rfq.referenceId ? `🔖 *Reference ID:* ${rfq.referenceId}` : "",
    rfq.tenderId ? `🏛️ *Tender / Project Ref:* ${rfq.tenderId}` : "",
    `👤 *Client Lead:* ${rfq.clientName}${rfq.organization ? ` (${rfq.organization})` : ""}`,
    rfq.verticals && rfq.verticals.length > 0 ? `📐 *Verticals:* ${rfq.verticals.join(", ")}` : "",
    rfq.location ? `📍 *Project Site:* ${rfq.location}` : "",
    rfq.scope ? `📝 *Scope Summary:* ${rfq.scope}` : "",
    "",
    "Please review the specifications and provide engineering feasibility analysis and BOQ estimate. Thank you!",
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
