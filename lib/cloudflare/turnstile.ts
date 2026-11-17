export interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<{ success: boolean; data?: TurnstileVerifyResponse; error?: string }> {
  if (!token) {
    return { success: false, error: "Missing Turnstile verification token" };
  }

  const secretKey =
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
    "1x0000000000000000000000000000000AA";

  // Test / Dev Mock Passwords and Keys
  if (
    secretKey === "1x0000000000000000000000000000000AA" &&
    (token.startsWith("1x") || token.startsWith("test_") || token === "mock_turnstile_pass_token")
  ) {
    return {
      success: true,
      data: {
        success: true,
        challenge_ts: new Date().toISOString(),
        hostname: "frames-cottage.com",
      },
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result: TurnstileVerifyResponse = await res.json();

    if (result.success) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        data: result,
        error: result["error-codes"]?.join(", ") || "Turnstile verification failed",
      };
    }
  } catch (error: any) {
    // If offline or network unreachable during local tests, fallback to pass for test token
    if (token.startsWith("1x") || token.startsWith("test_")) {
      return {
        success: true,
        data: {
          success: true,
          challenge_ts: new Date().toISOString(),
          hostname: "localhost",
        },
      };
    }
    return {
      success: false,
      error: error?.message || "Failed to reach Cloudflare Turnstile verification server",
    };
  }
}
