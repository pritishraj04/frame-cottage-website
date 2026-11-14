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
      className="relative overflow-hidden bg-[var(--background)] py-16 sm:py-20 lg:py-24 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      {/* Background Soft Museum Lighting Gradients */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-[#6B1C23]/10 via-[#C5A059]/10 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-primary)] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Interactive Studio</span>
          </div>

          <h2
            data-testid="frame-studio-title"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-ink-primary)] leading-[1.12]"
          >
            The Custom Frame Studio
          </h2>

          <p
            data-testid="frame-studio-subtitle"
            className="text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed max-w-2xl mx-auto"
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
          className="pt-8 border-t border-[var(--color-border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div
            data-testid="trust-item-hardwoods"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <TreePine className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
              100% Solid Hardwoods
            </span>
          </div>

          <div
            data-testid="trust-item-mats"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
              Archival 4-Ply Mats
            </span>
          </div>

          <div
            data-testid="trust-item-glazing"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
              Conservation Glazing
            </span>
          </div>

          <div
            data-testid="trust-item-ready-to-hang"
            className="flex items-center gap-2.5 justify-center sm:justify-start"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
              Ready to Hang
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
