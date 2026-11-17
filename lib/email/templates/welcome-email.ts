export interface WelcomeEmailProps {
  name: string;
  email: string;
  tier?: string;
}

export function renderWelcomeEmail({
  name,
  email,
  tier = "Atelier Collector • Tier I",
}: WelcomeEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Welcome to Frames Cottage Atelier</title>
  <style>
    body {
      background-color: #0f1319;
      color: #e6e8eb;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Playfair Display", Georgia, serif;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #171d26;
      border: 1px solid #2a3441;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .header {
      padding: 36px 32px 24px;
      text-align: center;
      border-bottom: 1px solid #2a3441;
      background: radial-gradient(circle at top, #222b38 0%, #171d26 100%);
    }
    .monogram {
      display: inline-block;
      width: 44px;
      height: 44px;
      line-height: 40px;
      border: 2px dashed #c5a059;
      color: #c5a059;
      border-radius: 12px;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 20px;
      letter-spacing: 4px;
      color: #f7f8f9;
      margin: 0;
      text-transform: uppercase;
    }
    .sub-brand {
      font-size: 10px;
      letter-spacing: 2px;
      color: #c5a059;
      text-transform: uppercase;
      margin-top: 6px;
    }
    .content {
      padding: 32px;
      line-height: 1.6;
      color: #d1d5db;
    }
    .greeting {
      font-size: 18px;
      color: #ffffff;
      margin-bottom: 16px;
    }
    .badge {
      display: inline-block;
      padding: 6px 12px;
      background: #222b38;
      border: 1px solid #c5a059;
      border-radius: 20px;
      color: #c5a059;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .cta-btn {
      display: inline-block;
      padding: 14px 28px;
      background: #c5a059;
      color: #171d26 !important;
      text-decoration: none;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-top: 24px;
    }
    .footer {
      padding: 24px 32px;
      text-align: center;
      border-top: 1px solid #2a3441;
      font-size: 11px;
      color: #838e9e;
      background: #13171e;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="monogram">FC</div>
      <h1 class="brand-title">FRAMES COTTAGE</h1>
      <div class="sub-brand">Design, Fabrication & Framing Studio</div>
    </div>
    <div class="content">
      <div class="badge">${tier}</div>
      <h2 class="greeting">Welcome to the Atelier, ${name}</h2>
      <p>
        Your client atelier account (<strong>${email}</strong>) has been officially registered with Frames Cottage.
      </p>
      <p>
        From museum-grade conservation archival framing to large-scale spatial signages and industrial CNC metalworks, our master artisans and engineering team are at your service.
      </p>
      <p>
        You now have full access to your personalized client dashboard, architectural spec sheet generators, project dossiers, and saved spatial collections.
      </p>
      <div style="text-align: center;">
        <a href="https://frames-cottage.com/account" class="cta-btn">Access Client Dashboard</a>
      </div>
    </div>
    <div class="footer">
      <p>© 2026 Frames Cottage Atelier • GeM Registered & ISO 9001:2015 Certified</p>
      <p>Studio Headquarters: Industrial Arts Corridor, New Delhi, India</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
