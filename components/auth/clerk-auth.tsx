"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useUser, useAuth, SignIn, SignUp, Show } from "@clerk/nextjs";

export function SignedIn({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  try {
    const auth = useAuth();
    if (auth?.isSignedIn) {
      return <>{children}</>;
    }
  } catch {
    // Clerk context unavailable or SSR
  }

  return null;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  try {
    const auth = useAuth();
    if (auth?.isSignedIn) {
      return null;
    }
  } catch {
    // Clerk context unavailable or SSR
  }

  // By default, render children so the UI is NEVER blank!
  return <>{children}</>;
}

export { Show, UserButton, useUser, useAuth, SignIn, SignUp };
