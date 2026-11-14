"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TreePine,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  CreditCard,
} from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("success");
    setErrorMessage("");
    setEmail("");
  };

  return (
    <footer
      id="site-footer"
      data-testid="site-footer"
      aria-label="Site Footer"
      className="w-full dark:bg-[#141414] bg-[#F0ECE1] text-[var(--color-ink-primary)] border-t border-[var(--color-border-subtle)] relative z-10 transition-colors duration-250"
    >
      {/* =====================================================================
          TOP NEWSLETTER & ATELIER PROMISE BANNER
         ===================================================================== */}
      <div className="border-b border-[var(--color-border-subtle)] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Newsletter Hook */}
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] text-[11px] font-semibold uppercase tracking-widest shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>The Atelier Circle</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
                Receive 10% Off Your Inaugural Bespoke Frame
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-lg leading-relaxed">
                Join our private collector society for archival framing advice, seasonal hardwood profile drops, and curated gallery wall editorial stories.
              </p>
            </div>

            {/* Newsletter Subscription Form */}
            <div className="lg:col-span-6">
              <form
                data-testid="footer-newsletter-form"
                onSubmit={handleNewsletterSubmit}
                className="w-full max-w-md ml-auto space-y-2"
                noValidate
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Enter your email address..."
                      data-testid="footer-newsletter-input"
                      aria-label="Email address for newsletter"
                      className="w-full pl-10 pr-4 py-3 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-accent-gold)] focus:ring-1 focus:ring-[var(--color-accent-gold)] transition-colors shadow-2xs"
                    />
                  </div>

                  <button
                    type="submit"
                    data-testid="footer-newsletter-submit"
                    className="px-6 py-3 rounded-full bg-[var(--color-accent-gold)] hover:bg-[#B38F48] text-[var(--background)] text-xs uppercase tracking-wider font-semibold shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Validation Feedback Messages */}
                {status === "error" && (
                  <div
                    data-testid="footer-newsletter-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-[#EF4444] pt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div
                    data-testid="footer-newsletter-success"
                    role="status"
                    className="flex items-center gap-1.5 text-xs text-[#10B981] pt-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Welcome! Your 10% discount code ATELIER10 is active.</span>
                  </div>
                )}

                <p className="text-[11px] text-[var(--color-ink-muted)]">
                  By subscribing, you agree to our Privacy Policy. Zero spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN FOOTER NAVIGATION COLUMNS + BRAND STORY
         ===================================================================== */}
      <div className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Story & Atelier Commitment */}
          <div data-testid="footer-brand-story" className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="font-serif tracking-[0.2em] text-xl font-semibold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors inline-block"
            >
              FRAME COTTAGE
            </Link>

            <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed max-w-sm">
              Handcrafting museum-grade bespoke frames, multi-aperture gallery walls, and archival art preservation. Every profile is shaped from sustainably harvested Appalachian solid hardwoods, joined with hardwood splines, and glazed with 99% UV-protective TruVue® conservation acrylic.
            </p>

            {/* Guild Accreditations */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[var(--color-ink-secondary)]">
                <TreePine className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>100% Solid Appalachian Hardwoods • No MDF or Faux Veneers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-ink-secondary)]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>100-Year Lifetime Archival Craftsmanship Guarantee</span>
              </div>
            </div>
          </div>

          {/* Navigation Column 1: Custom Framing */}
          <div className="lg:col-span-2 space-y-3">
            <h4
              data-testid="footer-nav-custom-framing"
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-ink-primary)]"
            >
              Custom Framing
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-ink-muted)]">
              <li>
                <Link href="/custom-framing" className="hover:text-[#C5A059] transition-colors">
                  Digital Upload & Giclée
                </Link>
              </li>
              <li>
                <Link href="/mail-in" className="hover:text-[#C5A059] transition-colors">
                  Mail-In Original Art
                </Link>
              </li>
              <li>
                <Link href="/shadowbox" className="hover:text-[#C5A059] transition-colors">
                  Memorabilia Shadowbox
                </Link>
              </li>
              <li>
                <Link href="/canvas-floater" className="hover:text-[#C5A059] transition-colors">
                  Canvas Floater Frames
                </Link>
              </li>
              <li>
                <Link href="/gallery-walls" className="hover:text-[#C5A059] transition-colors">
                  Gallery Wall Layouts
                </Link>
              </li>
              <li>
                <Link href="/truvue" className="hover:text-[#C5A059] transition-colors">
                  TruVue® Conservation Acrylic
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Curated Styles */}
          <div className="lg:col-span-2 space-y-3">
            <h4
              data-testid="footer-nav-curated-styles"
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-ink-primary)]"
            >
              Curated Styles
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-ink-muted)]">
              <li>
                <Link href="/styles/walnut" className="hover:text-[#C5A059] transition-colors">
                  American Black Walnut
                </Link>
              </li>
              <li>
                <Link href="/styles/white-oak" className="hover:text-[#C5A059] transition-colors">
                  Natural White Oak
                </Link>
              </li>
              <li>
                <Link href="/styles/brass" className="hover:text-[#C5A059] transition-colors">
                  Antiqued Gilded Brass
                </Link>
              </li>
              <li>
                <Link href="/styles/bleached-maple" className="hover:text-[#C5A059] transition-colors">
                  Bleached Hard Maple
                </Link>
              </li>
              <li>
                <Link href="/styles/matte-black" className="hover:text-[#C5A059] transition-colors">
                  Studio Deep Matte Black
                </Link>
              </li>
              <li>
                <Link href="/styles/gallery-sets" className="hover:text-[#C5A059] transition-colors">
                  Curated Salon Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: The Atelier */}
          <div className="lg:col-span-2 space-y-3">
            <h4
              data-testid="footer-nav-the-atelier"
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-ink-primary)]"
            >
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-ink-muted)]">
              <li>
                <Link href="/atelier/timber" className="hover:text-[#C5A059] transition-colors">
                  FSC® Timber Stewardship
                </Link>
              </li>
              <li>
                <Link href="/atelier/splines" className="hover:text-[#C5A059] transition-colors">
                  Corner Spline Joinery
                </Link>
              </li>
              <li>
                <Link href="/atelier/cotton-mats" className="hover:text-[#C5A059] transition-colors">
                  4-Ply Archival Cotton Mats
                </Link>
              </li>
              <li>
                <Link href="/atelier/carbon-neutral" className="hover:text-[#C5A059] transition-colors">
                  Zero Waste Workshop
                </Link>
              </li>
              <li>
                <Link href="/atelier/story" className="hover:text-[#C5A059] transition-colors">
                  Our Guild Heritage
                </Link>
              </li>
              <li>
                <Link href="/atelier/guarantee" className="hover:text-[#C5A059] transition-colors">
                  100-Year Life Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 4: Client Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4
              data-testid="footer-nav-client-services"
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-ink-primary)]"
            >
              Client Services
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-ink-muted)]">
              <li>
                <Link href="/trade" className="hover:text-[#C5A059] transition-colors">
                  Interior Trade Program
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-[#C5A059] transition-colors">
                  Framing Consultation
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#C5A059] transition-colors">
                  White-Glove Shipping
                </Link>
              </li>
              <li>
                <Link href="/damage-claim" className="hover:text-[#C5A059] transition-colors">
                  Damage Guarantee Claim
                </Link>
              </li>
              <li>
                <Link href="/installation" className="hover:text-[#C5A059] transition-colors">
                  Hanging & Wire Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A059] transition-colors">
                  Contact Atelier Concierge
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM TRUST BAR, FSC CERTIFICATION & LEGAL
         ===================================================================== */}
      <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            {/* FSC Certification Badge */}
            <div
              data-testid="footer-fsc-badge"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-muted)] shadow-2xs"
            >
              <TreePine className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>
                <strong className="text-[var(--color-ink-primary)]">FSC® C104829 Certified:</strong> Responsibly Managed Appalachian Forests
              </span>
            </div>

            {/* Payment Trust Badges */}
            <div
              data-testid="footer-payment-badges"
              className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-ink-muted)]"
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)]">
                <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-medium text-[var(--color-ink-primary)]">Visa • Mastercard • Amex</span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] font-medium text-[var(--color-ink-primary)]">
                Apple Pay
              </div>
              <div className="px-2.5 py-1 rounded-md bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] font-medium text-[var(--color-ink-primary)]">
                Google Pay
              </div>
              <div className="px-2.5 py-1 rounded-md bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] font-medium text-[var(--color-ink-primary)]">
                Klarna / Affirm
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[#C5A059]">
                <Lock className="w-3 h-3" />
                <span className="text-[10px] font-semibold text-[var(--color-ink-primary)]">256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-ink-muted)]">
            <p>© 2026 Frame Cottage Atelier Ltd. All rights reserved. Handcrafted in the USA.</p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="hover:text-[#C5A059] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#C5A059] transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/accessibility" className="hover:text-[#C5A059] transition-colors">
                Accessibility Statement
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-[#C5A059] transition-colors">
                Cookie Preferences
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
