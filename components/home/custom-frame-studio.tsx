"use client";

import { LiveFrameSwitcher } from "@/components/hero/live-frame-switcher";
import {
  Sparkles,
  TreePine,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function CustomFrameStudio() {
  return (
    <section
      id="custom-frame-studio"
      aria-label="The Custom Frame Studio"
      data-testid="custom-frame-studio"
      className="relative overflow-hidden bg-[#F5F5F7] py-16 sm:py-20 lg:py-24 border-b border-[#D2D2D7]"
    >
      {/* Background Soft Lighting Gradients */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-white/80 via-[#E8E8ED]/60 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D2D2D7] text-xs font-semibold uppercase tracking-[0.18em] text-[#1D1D1F] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#B88E56]" />
            <span>Interactive Studio</span>
          </div>

          <h2
            data-testid="frame-studio-title"
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.12]"
          >
            The Custom Frame Studio
          </h2>

          <p
            data-testid="frame-studio-subtitle"
            className="text-base sm:text-lg text-[#86868B] leading-relaxed max-w-2xl mx-auto"
          >
            Choose your moulding, customize your matting, and preview your art in real time.
          </p>
        </div>

        {/* Live Frame Switcher Island */}
        <div className="w-full flex justify-center mb-10 sm:mb-14">
          <LiveFrameSwitcher />
        </div>

        {/* Trust Highlights Row */}
        <div
          data-testid="trust-highlights"
          className="pt-8 border-t border-[#D2D2D7] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div
            data-testid="trust-item-hardwoods"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] shadow-2xs">
              <TreePine className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#1D1D1F] leading-snug">
              100% Solid Hardwoods
            </span>
          </div>

          <div
            data-testid="trust-item-mats"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#1D1D1F] leading-snug">
              Archival 4-Ply Mats
            </span>
          </div>

          <div
            data-testid="trust-item-glazing"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#1D1D1F] leading-snug">
              Conservation Glazing
            </span>
          </div>

          <div
            data-testid="trust-item-ready-to-hang"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#D2D2D7] flex items-center justify-center text-[#1D1D1F] shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#1D1D1F] leading-snug">
              Ready to Hang
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
