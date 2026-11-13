import Link from "next/link";
import { LiveFrameSwitcher } from "./live-frame-switcher";
import {
  ArrowRight,
  Sparkles,
  TreePine,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function HeroContainer() {
  return (
    <section
      aria-label="Frame Cottage Bespoke Framing"
      data-testid="hero-section"
      className="relative overflow-hidden bg-[#FAF7F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8E1D5]"
    >
      {/* Background Subtle Gradient & Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#F3ECE2] via-[#EBDCC8]/40 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Editorial Copy, CTAs & Trust Signals */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {/* Artisanal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#E8E1D5] text-xs font-semibold uppercase tracking-[0.18em] text-[#B45309]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Framing Atelier</span>
            </div>

            {/* Editorial Serif Headline */}
            <h1
              data-testid="hero-headline"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#191614] leading-[1.12]"
            >
              Museum-Grade Framing, Handcrafted for Life’s Masterpieces.
            </h1>

            {/* Subheadline describing timber craft & digital customizer */}
            <p
              data-testid="hero-subheadline"
              className="text-base sm:text-lg text-[#5C554E] leading-relaxed max-w-xl"
            >
              Every frame is precision-milled from sustainably harvested
              hardwoods and hand-joined by master artisans. Preview finishes in
              our interactive studio, customize down to the millimeter, and
              receive your archival piece ready to hang.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/customizer"
                data-testid="cta-start-framing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white text-sm sm:text-base font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <span>Start Framing</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/ready-made"
                data-testid="cta-explore-collections"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#DCD3C4] hover:border-[#191614] bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#191614] text-sm sm:text-base font-medium transition-all duration-200"
              >
                <span>Explore Collections</span>
              </Link>
            </div>

            {/* Trust Highlights Row */}
            <div
              data-testid="trust-highlights"
              className="pt-4 border-t border-[#E8E1D5] grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div
                data-testid="trust-item-hardwoods"
                className="flex items-center gap-2"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#F3ECE2] flex items-center justify-center text-[#B45309]">
                  <TreePine className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#191614] leading-snug">
                  100% Solid Hardwoods
                </span>
              </div>

              <div
                data-testid="trust-item-mats"
                className="flex items-center gap-2"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#F3ECE2] flex items-center justify-center text-[#B45309]">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#191614] leading-snug">
                  Archival 4-Ply Mats
                </span>
              </div>

              <div
                data-testid="trust-item-glazing"
                className="flex items-center gap-2"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#F3ECE2] flex items-center justify-center text-[#B45309]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#191614] leading-snug">
                  Conservation Glazing
                </span>
              </div>

              <div
                data-testid="trust-item-ready-to-hang"
                className="flex items-center gap-2"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#F3ECE2] flex items-center justify-center text-[#B45309]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#191614] leading-snug">
                  Ready to Hang
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Frame Switcher Island */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <LiveFrameSwitcher />
          </div>
        </div>
      </div>
    </section>
  );
}
