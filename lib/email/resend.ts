import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || "re_frames_cottage_dev_mock_key";
const isMockKey = !apiKey || apiKey.includes("mock") || apiKey === "re_frames_cottage_dev_mock_key";

export const resend = new Resend(isMockKey ? "re_123456789" : apiKey);

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.RESEND_FROM_EMAIL || "Frames Cottage Atelier <orders@frames-cottage.com>",
  replyTo,
}: SendEmailOptions) {
  if (isMockKey) {
    console.log("------------------------------------------------------------------");
    console.log("[Atelier Resend Mock] Email Dispatch Logged:");
    console.log(`From:    ${from}`);
    console.log(`To:      ${Array.isArray(to) ? to.join(", ") : to}`);
    console.log(`Subject: ${subject}`);
    console.log("------------------------------------------------------------------");
    return {
      success: true,
      data: { id: `mock_email_${Date.now()}_${Math.random().toString(36).substring(2, 7)}` },
      error: null,
    };
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo,
    });
    return { success: true, data: result.data, error: result.error };
  } catch (error: any) {
    console.error("[Atelier Resend Error]:", error);
    return { success: false, data: null, error: error?.message || error };
  }
}
