"use client";

import React from "react";

// Minimal stubs preserved for backwards compatibility without Clerk or authentication
export function SignedIn({ children }: { children: React.ReactNode }) {
  return null;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function UserButton() {
  return null;
}

export function useUser() {
  return {
    isSignedIn: false,
    isLoaded: true,
    user: null,
  };
}

export function useAuth() {
  return {
    isSignedIn: false,
    isLoaded: true,
    userId: null,
    sessionId: null,
  };
}
