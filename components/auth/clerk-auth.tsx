"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useStorefront } from "@/lib/store/storefront-context";

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { user } = useStorefront();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (user) {
    return <>{children}</>;
  }
  return null;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { user } = useStorefront();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render on server / initial mount so header isn't blank
    return <>{children}</>;
  }
  if (!user) {
    return <>{children}</>;
  }
  return null;
}

export function UserButton({
  appearance,
}: {
  appearance?: { elements?: { avatarBox?: string } };
}) {
  const { user } = useStorefront();
  return (
    <span className="inline-flex items-center justify-center text-[var(--color-accent-gold)]">
      <User className="w-5 h-5 text-accent" />
    </span>
  );
}

export function useUser() {
  const { user } = useStorefront();
  return {
    isSignedIn: !!user,
    isLoaded: true,
    user: user
      ? {
          id: "fc_client_user",
          fullName: user.name,
          firstName: user.name.split(" ")[0],
          primaryEmailAddress: { emailAddress: user.email },
          imageUrl: null,
        }
      : null,
  };
}

export function useAuth() {
  const { user } = useStorefront();
  return {
    isSignedIn: !!user,
    isLoaded: true,
    userId: user ? "fc_client_user" : null,
    sessionId: "fc_session_local",
  };
}

export function Show({
  when,
  children,
  fallback,
}: {
  when?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return when ? <>{children}</> : fallback ? <>{fallback}</> : null;
}

export function SignIn({
  routing,
  appearance,
}: {
  routing?: string;
  appearance?: any;
}) {
  const { loginAsCollector } = useStorefront();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsCollector();
    if (typeof window !== "undefined") {
      window.location.href = "/account";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-left">
      <div>
        <label className="block text-xs font-mono text-[var(--color-ink-secondary)] mb-1">
          Studio Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="collector@atelier.com"
          className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2 px-3 text-xs text-[var(--color-ink-primary)]"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-[var(--color-ink-secondary)] mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2 px-3 text-xs text-[var(--color-ink-primary)] font-mono"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
      >
        <Lock className="w-3.5 h-3.5" />
        <span>Sign In to Atelier</span>
      </button>
    </form>
  );
}

export function SignUp({
  routing,
  appearance,
}: {
  routing?: string;
  appearance?: any;
}) {
  const { loginAsCollector } = useStorefront();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsCollector();
    if (typeof window !== "undefined") {
      window.location.href = "/account";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-left">
      <div>
        <label className="block text-xs font-mono text-[var(--color-ink-secondary)] mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Camilla Vance"
          className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2 px-3 text-xs text-[var(--color-ink-primary)]"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-[var(--color-ink-secondary)] mb-1">
          Studio Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="collector@atelier.com"
          className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2 px-3 text-xs text-[var(--color-ink-primary)]"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Create Studio Account</span>
      </button>
    </form>
  );
}
