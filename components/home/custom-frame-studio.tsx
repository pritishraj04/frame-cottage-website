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
        {/* Section Header with PNG Spatial Dropzone Badging */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] text-xs font-mono font-medium uppercase tracking-[0.18em] text-[var(--color-accent-gold)] shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span>Interactive Frame Visualizer • PNG Spatial Canvas</span>
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

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)]/60 text-[11px] font-mono text-[var(--color-ink-muted)] bg-[var(--color-canvas-subtle)]/50">
            Dedicated Spatial Container • Transparent PNG Asset Layer
          </div>
        </div>

        {/* Live Frame Switcher Island */}
        <div className="w-full flex justify-center mb-10 sm:mb-14">
          <LiveFrameSwitcher />
        </div>

        {/* Trust Highlights Row with Dashed Spatial Drop Containers */}
        <div
          data-testid="trust-highlights"
          className="pt-8 border-t border-[var(--color-border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          <div
            data-testid="trust-item-hardwoods"
            className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-colors"
          >
            <div className="shrink-0 w-9 h-9 rounded-lg border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <TreePine className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
                100% Solid Hardwoods
              </span>
              <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                FSC® Appalachian
              </span>
            </div>
          </div>

          <div
            data-testid="trust-item-mats"
            className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-colors"
          >
            <div className="shrink-0 w-9 h-9 rounded-lg border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
                Archival 4-Ply Mats
              </span>
              <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                100% Cotton Rag
              </span>
            </div>
          </div>

          <div
            data-testid="trust-item-glazing"
            className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-colors"
          >
            <div className="shrink-0 w-9 h-9 rounded-lg border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
                Conservation Glazing
              </span>
              <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                TruVue® 99% UV
              </span>
            </div>
          </div>

          <div
            data-testid="trust-item-ready-to-hang"
            className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-colors"
          >
            <div className="shrink-0 w-9 h-9 rounded-lg border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[var(--color-ink-primary)] leading-snug">
                Ready to Hang
              </span>
              <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                Hardware Included
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
