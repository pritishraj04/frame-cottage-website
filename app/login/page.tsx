"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  Building2,
  Mail,
  Key,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useStorefront } from "@/lib/store/storefront-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsCollector, loginAsEnterprise, loginCustom } = useStorefront();

  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");
  const [portalType, setPortalType] = useState<"collector" | "enterprise">("collector");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = email || (portalType === "enterprise" ? "procurement@som-architects.com" : "collector@vanceart.com");
    loginCustom(
      finalEmail,
      portalType,
      fullName || (portalType === "enterprise" ? "Marcus Sterling" : "Camilla Vance"),
      organization || (portalType === "enterprise" ? "SOM Architects & Partners" : undefined)
    );
    router.push("/account");
  };

  const handleDemoCollector = () => {
    loginAsCollector();
    router.push("/account");
  };

  const handleDemoEnterprise = () => {
    loginAsEnterprise();
    router.push("/account");
  };

  const handleSocialGoogle = () => {
    loginCustom("collector.google@atelier.com", "collector", "Camilla Vance");
    router.push("/account");
  };

  const handleSSOEnterprise = () => {
    loginCustom("procurement.sso@som-architects.com", "enterprise", "Marcus Sterling", "SOM Architects");
    router.push("/account");
  };

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-10 sm:py-16 transition-colors duration-250 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 max-w-xl mx-auto flex items-center gap-2 text-xs font-mono text-[var(--color-ink-muted)]">
            <Link href="/" className="hover:text-[var(--color-accent-gold)] transition-colors">
              Studio Home
            </Link>
            <span>/</span>
            <span className="text-[var(--color-accent-gold)]">Client Portal & Authentication</span>
          </nav>

          {/* Centered Luxury Atelier Card */}
          <div className="max-w-xl mx-auto rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/80 bg-[var(--color-canvas-card)] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Gold Header Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent-gold)] to-transparent" />

            {/* Studio Monogram Emblem */}
            <div className="text-center space-y-2 mb-8">
              <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] mx-auto font-serif font-bold text-lg shadow-xs">
                FC
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)]">
                Frames Cottage Atelier Portal
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-ink-muted)]">
                Access client commissions, active joinery tracking, and verified RFQ proposals.
              </p>
            </div>

            {/* One-Click Quick Demo Credentials Buttons */}
            <div className="mb-6 p-4 rounded-2xl border border-dashed border-[var(--color-accent-gold)]/60 bg-[var(--color-canvas-subtle)]/60 space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent-gold)] font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Instant Demo Access (One-Click)
                </span>
                <span>Pre-Configured</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  data-testid="demo-collector-btn"
                  onClick={handleDemoCollector}
                  className="py-2.5 px-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)]/10 text-left transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)]">
                      Demo Collector Login
                    </span>
                    <User className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-ink-muted)] mt-1">
                    Camilla Vance • Tier II
                  </span>
                </button>

                <button
                  type="button"
                  data-testid="demo-enterprise-btn"
                  onClick={handleDemoEnterprise}
                  className="py-2.5 px-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)]/10 text-left transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)]">
                      Demo Enterprise / B2B Login
                    </span>
                    <Building2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-ink-muted)] mt-1">
                    Marcus Sterling • GeM L1
                  </span>
                </button>
              </div>
            </div>

            {/* Dual-Tab Navigation: Client Sign In vs Register */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] mb-6 text-xs font-mono font-medium">
              <button
                type="button"
                data-testid="auth-tab-signin"
                onClick={() => setAuthMode("signin")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === "signin"
                    ? "bg-[var(--color-canvas-surface)] text-[var(--color-accent-gold)] shadow-xs font-bold"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
                }`}
              >
                Client Sign In
              </button>
              <button
                type="button"
                data-testid="auth-tab-register"
                onClick={() => setAuthMode("register")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === "register"
                    ? "bg-[var(--color-canvas-surface)] text-[var(--color-accent-gold)] shadow-xs font-bold"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
                }`}
              >
                Create Studio Account / Register Organization
              </button>
            </div>

            {/* Client Portal Switcher: Private Collector vs Corporate B2B */}
            <div className="mb-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-muted)] block">
                Account Classification
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  data-testid="portal-collector"
                  onClick={() => setPortalType("collector")}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    portalType === "collector"
                      ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)] font-bold"
                      : "border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)]"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Private Collector</span>
                </button>

                <button
                  type="button"
                  data-testid="portal-enterprise"
                  onClick={() => setPortalType("enterprise")}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    portalType === "enterprise"
                      ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)] font-bold"
                      : "border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)]"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate B2B / GeM</span>
                </button>
              </div>
            </div>

            {/* Interactive Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "register" && (
                <div className="space-y-1">
                  <label
                    htmlFor="input-name"
                    className="text-xs font-mono text-[var(--color-ink-secondary)] block"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="input-name"
                      type="text"
                      data-testid="input-name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={portalType === "enterprise" ? "e.g. Marcus Sterling" : "e.g. Camilla Vance"}
                      className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                    />
                    <User className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              {authMode === "register" && portalType === "enterprise" && (
                <div className="space-y-1">
                  <label
                    htmlFor="input-organization"
                    className="text-xs font-mono text-[var(--color-ink-secondary)] block"
                  >
                    Organization / Architectural Firm / GeM Agency
                  </label>
                  <div className="relative">
                    <input
                      id="input-organization"
                      type="text"
                      data-testid="input-organization"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. SOM Architects & Partners"
                      className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                    />
                    <Building2 className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label
                  htmlFor="input-email"
                  className="text-xs font-mono text-[var(--color-ink-secondary)] block"
                >
                  {portalType === "enterprise" ? "Work / Corporate Official Email" : "Email Address"}
                </label>
                <div className="relative">
                  <input
                    id="input-email"
                    type="email"
                    data-testid="input-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      portalType === "enterprise"
                        ? "procurement@som-architects.com"
                        : "collector@vanceart.com"
                    }
                    className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                  />
                  <Mail className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="input-password"
                    className="text-xs font-mono text-[var(--color-ink-secondary)] block"
                  >
                    Password
                  </label>
                  {authMode === "signin" && (
                    <button
                      type="button"
                      data-testid="forgot-password-link"
                      onClick={() => setForgotSent(true)}
                      className="text-[10px] font-mono text-[var(--color-accent-gold)] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="input-password"
                    type={showPassword ? "text" : "password"}
                    data-testid="input-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl py-2.5 pl-9 pr-10 text-xs text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)] font-mono"
                  />
                  <Key className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {forgotSent && (
                <div className="p-3 rounded-xl border border-dashed border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] text-[11px] font-mono text-[var(--color-accent-gold)] flex items-center justify-between">
                  <span>Reset instructions simulated for {email || "account"}.</span>
                  <button
                    type="button"
                    onClick={() => setForgotSent(false)}
                    className="text-[var(--color-ink-muted)] hover:text-white underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Remember this device checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  id="checkbox-remember"
                  type="checkbox"
                  data-testid="checkbox-remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-accent focus:ring-accent cursor-pointer"
                />
                <label
                  htmlFor="checkbox-remember"
                  className="text-xs font-mono text-[var(--color-ink-muted)] cursor-pointer select-none"
                >
                  Remember this device for 30 days
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                data-testid="submit-auth-btn"
                className="w-full py-3.5 px-4 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {authMode === "signin"
                    ? portalType === "enterprise"
                      ? "Sign In to Corporate Portal"
                      : "Sign In to Collector Portal"
                    : "Create Atelier Account"}
                </span>
              </button>
            </form>

            {/* Social & Enterprise SSO Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dashed border-[var(--color-border-subtle)]" />
              </div>
              <span className="relative px-3 bg-[var(--color-canvas-card)] text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-muted)]">
                Or Continue With
              </span>
            </div>

            {/* Social / SSO Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                data-testid="sso-google-btn"
                onClick={handleSocialGoogle}
                className="py-2.5 px-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-[var(--color-accent-gold)] text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <button
                type="button"
                data-testid="sso-enterprise-btn"
                onClick={handleSSOEnterprise}
                className="py-2.5 px-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-[var(--color-accent-gold)] text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[var(--color-accent-gold)]" />
                <span>Enterprise SSO (SAML / Okta)</span>
              </button>
            </div>

            {/* Atelier Security Assurance */}
            <div className="mt-8 pt-4 border-t border-dashed border-[var(--color-border-subtle)] text-center text-[10px] font-mono text-[var(--color-ink-muted)] flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              <span>TLS 1.3 End-to-End Encryption • ISO 27001 & GeM Compliant</span>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
