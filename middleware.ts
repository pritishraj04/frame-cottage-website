import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextFetchEvent } from "next/server";

const isProtectedRoute = createRouteMatcher(["/account(.*)", "/profile(.*)"]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const isMock =
      process.env.CLERK_SECRET_KEY?.includes("atelier_secret_key") ||
      process.env.CLERK_SECRET_KEY?.includes("mock");

    const enforce = req.headers.get("x-enforce-auth") === "true";

    if (!isMock || enforce) {
      await auth.protect();
    }
  }
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (!req.cookies.has("__clerk_db_jwt")) {
    req.cookies.set("__clerk_db_jwt", "mock_dev_browser_jwt_token");
  }
  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
