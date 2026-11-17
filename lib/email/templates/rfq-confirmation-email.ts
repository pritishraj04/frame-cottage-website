export interface RfqConfirmationEmailProps {
  referenceNo: string;
  contactName: string;
  email: string;
  organization?: string;
  vertical: string;
  projectTitle?: string;
  scopeDescription?: string;
  timeline?: string;
  budgetRange?: string;
  assignedLead?: string;
}

export function renderRfqConfirmationEmail({
  referenceNo,
  contactName,
  email,
  organization,
  vertical,
  projectTitle,
  scopeDescription,
  timeline,
  budgetRange,
  assignedLead = "Vikram Singhania, Principal Studio Director",
}: RfqConfirmationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>RFQ Dossier Received - ${referenceNo}</title>
  <style>
    body { background-color: #0f1319; color: #e6e8eb; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Playfair Display", Georgia, serif; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 40px auto; background: #171d26; border: 1px solid #2a3441; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { padding: 36px 32px 24px; text-align: center; border-bottom: 1px solid #2a3441; background: radial-gradient(circle at top, #222b38 0%, #171d26 100%); }
    .monogram { display: inline-block; width: 44px; height: 44px; line-height: 40px; border: 2px dashed #c5a059; color: #c5a059; border-radius: 12px; font-size: 16px; font-weight: bold; letter-spacing: 2px; margin-bottom: 16px; }
    .brand-title { font-size: 20px; letter-spacing: 4px; color: #f7f8f9; margin: 0; text-transform: uppercase; }
    .rfq-badge { display: inline-block; padding: 6px 14px; background: #222b38; border: 1px dashed #c5a059; border-radius: 20px; color: #c5a059; font-size: 12px; font-family: monospace; font-weight: bold; margin-top: 14px; }
    .content { padding: 32px; line-height: 1.6; }
    .lead-box { background: #1f2733; border: 1px solid #c5a059; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .lead-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c5a059; font-weight: bold; margin-bottom: 4px; }
    .lead-name { font-size: 16px; color: #ffffff; font-weight: 600; }
    .spec-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    .spec-table td { padding: 8px; border-bottom: 1px solid #2a3441; }
    .spec-label { width: 35%; color: #94a3b8; font-weight: 500; }
    .spec-value { color: #f7f8f9; }
    .cta-btn { display: inline-block; padding: 14px 28px; background: #c5a059; color: #171d26 !important; text-decoration: none; border-radius: 9999px; font-weight: 700; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 24px; }
    .footer { padding: 24px 32px; text-align: center; border-top: 1px solid #2a3441; font-size: 11px; color: #838e9e; background: #13171e; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="monogram">FC</div>
      <h1 class="brand-title">FRAMES COTTAGE</h1>
      <div class="rfq-badge">RFQ Reference: ${referenceNo}</div>
    </div>
    <div class="content">
      <h2 style="color: #ffffff; margin-top: 0;">Project RFQ Dossier Registered</h2>
      <p style="color: #cbd5e1;">
        Dear <strong>${contactName}</strong>, thank you for submitting your architectural framing and engineering project requisition to Frames Cottage Atelier.
      </p>

      <div class="lead-box">
        <div class="lead-title">Assigned Studio Director & Technical Lead</div>
        <div class="lead-name">${assignedLead}</div>
        <p style="margin: 6px 0 0; font-size: 12px; color: #cbd5e1;">
          Vikram Singhania and our senior engineering fabrication cell have taken charge of your project dossier. You will receive an initial technical feasibility evaluation and formal estimate within 24 business hours.
        </p>
      </div>

      <table class="spec-table">
        <tr>
          <td class="spec-label">Project Title:</td>
          <td class="spec-value">${projectTitle || "Bespoke Architectural Project"}</td>
        </tr>
        <tr>
          <td class="spec-label">Service Vertical:</td>
          <td class="spec-value" style="color: #c5a059; font-weight: 600;">${vertical}</td>
        </tr>
        ${organization ? `
        <tr>
          <td class="spec-label">Organization:</td>
          <td class="spec-value">${organization}</td>
        </tr>` : ""}
        ${timeline ? `
        <tr>
          <td class="spec-label">Target Timeline:</td>
          <td class="spec-value">${timeline}</td>
        </tr>` : ""}
        ${budgetRange ? `
        <tr>
          <td class="spec-label">Budget Allocation:</td>
          <td class="spec-value">${budgetRange}</td>
        </tr>` : ""}
        ${scopeDescription ? `
        <tr>
          <td class="spec-label">Scope Abstract:</td>
          <td class="spec-value" style="font-size: 12px; color: #94a3b8;">${scopeDescription}</td>
        </tr>` : ""}
      </table>

      <div style="text-align: center; margin-top: 28px;">
        <a href="https://frames-cottage.com/account" class="cta-btn">View RFQ in Atelier Portal</a>
      </div>
    </div>
    <div class="footer">
      <p>© 2026 Frames Cottage Atelier • GeM Registered & ISO 9001:2015 Certified</p>
      <p>Direct Inquiries: procurement@frames-cottage.com | +91 11 4982 7200</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
