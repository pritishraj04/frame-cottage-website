import { NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/cloudflare/turnstile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = body?.token;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing Turnstile 'token' in request body" },
        { status: 400 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined;
    const result = await verifyTurnstileToken(token, ip);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Turnstile verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Human verification confirmed.",
      data: result.data,
    });
  } catch (error: any) {
    console.error("Turnstile API Route Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
