export interface WishlistShareEmailProps {
  senderName: string;
  recipientEmail: string;
  message?: string;
  items: Array<{
    title: string;
    category?: string;
    dimensions?: string;
    price: number;
    material?: string;
  }>;
}

export function renderWishlistShareEmail({
  senderName,
  recipientEmail,
  message,
  items,
}: WishlistShareEmailProps): string {
  const itemsHtml = items
    .map(
      (item) => `
    <div style="background: #1f2733; border: 1px solid #2a3441; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
      <div style="font-weight: 600; font-size: 14px; color: #f7f8f9;">${item.title}</div>
      <div style="font-size: 11px; color: #c5a059; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">
        ${item.category || "Atelier Frame"} • ₹${item.price.toLocaleString("en-IN")}
      </div>
      ${item.dimensions ? `<div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Dimensions: ${item.dimensions}</div>` : ""}
      ${item.material ? `<div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Material: ${item.material}</div>` : ""}
    </div>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Curated Spatial Wishlist from ${senderName}</title>
  <style>
    body { background-color: #0f1319; color: #e6e8eb; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Playfair Display", Georgia, serif; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #171d26; border: 1px solid #2a3441; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { padding: 36px 32px 24px; text-align: center; border-bottom: 1px solid #2a3441; background: radial-gradient(circle at top, #222b38 0%, #171d26 100%); }
    .monogram { display: inline-block; width: 44px; height: 44px; line-height: 40px; border: 2px dashed #c5a059; color: #c5a059; border-radius: 12px; font-size: 16px; font-weight: bold; letter-spacing: 2px; margin-bottom: 16px; }
    .brand-title { font-size: 20px; letter-spacing: 4px; color: #f7f8f9; margin: 0; text-transform: uppercase; }
    .content { padding: 32px; line-height: 1.6; }
    .cta-btn { display: inline-block; padding: 14px 28px; background: #c5a059; color: #171d26 !important; text-decoration: none; border-radius: 9999px; font-weight: 700; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 24px; }
    .footer { padding: 24px 32px; text-align: center; border-top: 1px solid #2a3441; font-size: 11px; color: #838e9e; background: #13171e; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="monogram">FC</div>
      <h1 class="brand-title">FRAMES COTTAGE</h1>
      <div style="font-size: 10px; letter-spacing: 2px; color: #c5a059; text-transform: uppercase; margin-top: 6px;">Curated Gallery Wall Collection</div>
    </div>
    <div class="content">
      <h2 style="color: #ffffff; margin-top: 0;">${senderName} has shared a spatial collection with you</h2>
      ${
        message
          ? `<p style="background: #141a22; border-left: 3px solid #c5a059; padding: 12px 16px; font-style: italic; color: #cbd5e1; font-size: 13px;">"${message}"</p>`
          : ""
      }
      <p style="color: #94a3b8; font-size: 13px;">
        Explore these hand-selected conservation framing designs and architectural profiles from the Frames Cottage atelier catalog:
      </p>

      <div style="margin-top: 20px;">
        ${itemsHtml}
      </div>

      <div style="text-align: center; margin-top: 28px;">
        <a href="https://frames-cottage.com/wishlist" class="cta-btn">View Full Collection in Atelier</a>
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
