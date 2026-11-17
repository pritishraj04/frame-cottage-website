"use client";

import React from "react";
import { Show, UserButton, useUser, useAuth, SignIn, SignUp } from "@clerk/nextjs";

export function SignedIn({ children }: { children: React.ReactNode }) {
  return <Show when="signed-in">{children}</Show>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  return <Show when="signed-out">{children}</Show>;
}

export { Show, UserButton, useUser, useAuth, SignIn, SignUp };
