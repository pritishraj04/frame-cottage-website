"use client";

import { useState, useRef, useCallback } from "react";
import {
  TreePine,
  ShieldCheck,
  SunDim,
  Layers,
  Sparkles,
  ChevronsLeftRight,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MaterialPillar {
  id: string;
  testId: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  highlight: string;
  icon: typeof TreePine;
}

export const ATELIER_PILLARS: MaterialPillar[] = [
  {
    id: "fsc-hardwoods",
    testId: "material-pillar-hardwoods",
    badge: "100% Sustainable Timber",
    title: "FSC-Certified Appalachian Hardwoods",
    tagline: "Solid White Oak, Black Walnut & Rock Maple",
    description:
      "Every frame profile begins with sustainably harvested North American hardwoods from FSC-certified family mills in the Appalachian mountain range. We never use MDF, particleboard, plastic polymers, or printed vinyl faux veneers.",
    specs: [
      { label: "Timber Sourcing", value: "FSC-Certified Appalachian Mills" },
      { label: "Wood Species", value: "Black Walnut, White Oak, Hard Maple" },
      { label: "Toxin Standard", value: "Zero Formaldehyde & VOC-Free Oils" },
    ],
    highlight: "Sustainably harvested timber replenishes twice as much canopy as harvested.",
    icon: TreePine,
  },
  {
    id: "corner-splines",
    testId: "material-pillar-splines",
    badge: "Generational Joinery",
    title: "Corner Spline Joinery",
    tagline: "Mortise-Keyed Hardwood Spline Reinforcement",
    description:
      "Unlike mass-market frames held together with cheap metal V-nails or corrugated staples, our atelier frames feature precision-milled contrasting hardwood corner splines. Hand-planed flush to the profile, this ancient cabinetmaker technique creates an unbreakable structural bond.",
    specs: [
      { label: "Joinery Method", value: "Mitered Joint + Inlaid Hardwood Spline" },
      { label: "Adhesive Type", value: "Archival Aliphatic Resin Bond" },
      { label: "Torsional Strength", value: "3.8× Greater than V-Nail Corners" },
    ],
    highlight: "Withstands generational seasonal expansion and humidity changes without separating.",
    icon: Layers,
  },
  {
    id: "cotton-rag-mats",
    testId: "material-pillar-cotton-mats",
    badge: "Museum Preservation",
    title: "4-Ply Archival Cotton Rag Mats",
    tagline: "100% Acid-Free & Lignin-Free Virgin Cotton Core",
    description:
      "Standard paper mats contain acidic wood pulp that yellows and bleeds irreversible acid burns into precious artwork. Our atelier mats are crafted from 100% virgin cotton linters, buffered with calcium carbonate to actively neutralize ambient airborne acids.",
    specs: [
      { label: "Core Composition", value: "100% Cotton Rag Alpha-Cellulose" },
      { label: "Bevel Geometry", value: "Laser-Guided 45° Clean Cut" },
      { label: "pH Range", value: "8.5–9.5 Alkaline Buffered" },
    ],
    highlight: "Guaranteed never to discolor or burn paper prints over a 100-year archival lifespan.",
    icon: ShieldCheck,
  },
  {
    id: "conservation-acrylic",
    testId: "material-pillar-acrylic",
    badge: "Optical Precision",
    title: "TruVue® Conservation Glazing",
    tagline: "99% UV-Shielding Optical Grade Acrylic",
    description:
      "Sunlight and ambient indoor light emit damaging ultraviolet spectrum rays that permanently bleach watercolors, photography, and fine art prints. TruVue® Conservation Acrylic blocks 99% of UV rays while delivering unmatched optical clarity and shatter resistance.",
    specs: [
      { label: "UV Protection", value: "99% Blockade (300nm–380nm)" },
      { label: "Impact Safety", value: "Shatter-Resistant Optical Acrylic" },
      { label: "Light Transmission", value: ">97% Pure Optical Transparency" },
    ],
    highlight: "Shatter-safe in transit, 50% lighter than regular glass, and zero greenish tint.",
    icon: SunDim,
  },
];

/* =========================================================================
   INTERACTIVE GLASS COMPARISON SLIDER
   ========================================================================= */
export function GlassComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const rawPercent = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, Math.round(rawPercent)));
    setSliderPosition(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    calculatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    calculatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className="w-full bg-[var(--color-canvas-surface)] rounded-2xl border border-[var(--color-border-subtle)] p-6 sm:p-8 shadow-sm text-[var(--color-ink-primary)]">
      {/* Slider Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] text-[#C5A059] text-xs font-semibold uppercase tracking-wider mb-2">
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Glare & UV Simulation</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
            Standard Glare-Prone Glass vs. TruVue® Conservation Acrylic
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-2xl">
            Drag the handle horizontally to witness how ordinary reflective glass creates milky glare washes and permits fading UV penetration, versus TruVue® museum-grade clarity.
          </p>
        </div>

        {/* Preset View Switcher Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-testid="slider-preset-standard"
            onClick={() => setSliderPosition(100)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer",
              sliderPosition >= 90
                ? "bg-[#6B1C23] text-[#F4F1EA] border-[#6B1C23]"
                : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] border-[var(--color-border-subtle)] hover:bg-[var(--color-canvas-card-elevated)] hover:text-[var(--color-ink-primary)]"
            )}
          >
            Standard Glass
          </button>
          <button
            type="button"
            data-testid="slider-preset-split"
            onClick={() => setSliderPosition(50)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer",
              sliderPosition > 20 && sliderPosition < 80
                ? "bg-[#6B1C23] text-[#F4F1EA] border-[#6B1C23]"
                : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] border-[var(--color-border-subtle)] hover:bg-[var(--color-canvas-card-elevated)] hover:text-[var(--color-ink-primary)]"
            )}
          >
            Split 50/50
          </button>
          <button
            type="button"
            data-testid="slider-preset-truvue"
            onClick={() => setSliderPosition(0)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer",
              sliderPosition <= 10
                ? "bg-[#6B1C23] text-[#F4F1EA] border-[#6B1C23]"
                : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] border-[var(--color-border-subtle)] hover:bg-[var(--color-canvas-card-elevated)] hover:text-[var(--color-ink-primary)]"
            )}
          >
            TruVue® Clarity
          </button>
        </div>
      </div>

      {/* =========================================================================
          THE INTERACTIVE COMPARISON STAGE
         ========================================================================= */}
      <div
        ref={containerRef}
        data-testid="glass-comparison-slider"
        aria-label="Glass Glare Comparison Slider: Left is Standard Glass, Right is TruVue Conservation Acrylic"
        role="slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${sliderPosition}% Standard Glass vs ${100 - sliderPosition}% TruVue Conservation Acrylic`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-[var(--color-border-subtle)] shadow-md focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
      >
        {/* =====================================================================
            LAYER 1 (BASE): STANDARD REFLECTION-PRONE GLASS
           ===================================================================== */}
        <div
          data-testid="standard-glass-panel"
          className="absolute inset-0 w-full h-full bg-[var(--color-canvas-subtle)] flex items-center justify-center overflow-hidden"
        >
          {/* Rich Artwork Canvas under Standard Glass */}
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br dark:from-[#2D2218] dark:via-[#1E1710] dark:to-[#0F0C08] from-[#F4EFE6] via-[#EAE2D2] to-[#DFD5C2] p-6 sm:p-10">
            {/* The Artwork Itself (Artisanal Botanical & Geometric Still Life) */}
            <div className="relative w-full max-w-md h-full rounded-lg bg-[#F5ECE0] border-8 border-[#3A2A1E] shadow-inner flex flex-col items-center justify-between p-6 overflow-hidden">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#86868B] font-serif">
                  Atelier Archival Plate No. 12
                </span>
                <h4 className="font-serif text-lg font-bold text-[#1D1D1F]">
                  Botanical Still Life in Sunlight
                </h4>
              </div>

              {/* Central Illustration Motif */}
              <div className="my-auto flex items-center justify-center relative">
                <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md">
                  <circle cx="100" cy="100" r="75" fill="#C5A059" opacity="0.35" />
                  <circle cx="100" cy="100" r="50" fill="#B45309" opacity="0.45" />
                  <path
                    d="M100 25 C70 65, 55 105, 100 175 C145 105, 130 65, 100 25 Z"
                    fill="#3F4E3F"
                  />
                  <line x1="100" y1="35" x2="100" y2="165" stroke="#FAF7F2" strokeWidth="2" />
                  <circle cx="100" cy="90" r="14" fill="#FAF7F2" />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-[9px] uppercase tracking-wider text-[#86868B]">
                  Archival Pigment on 310gsm Cotton Rag
                </p>
              </div>
            </div>

            {/* SIMULATED PROBLEM: Heavy Milky Specular Window Reflection & Glare Sheen */}
            <div
              data-testid="standard-glare-overlay"
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/35 via-white/55 to-white/10 backdrop-blur-[0.75px] mix-blend-screen flex items-center justify-center"
            >
              {/* Window Pane Specular Diagonal Reflections */}
              <div className="absolute -inset-10 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.85)_50%,transparent_65%)] opacity-85 rotate-6" />
              <div className="absolute -inset-10 bg-[linear-gradient(115deg,transparent_45%,rgba(255,255,255,0.5)_60%,transparent_75%)] opacity-70 rotate-6" />
            </div>

            {/* Standard Glass Warning Badge */}
            <div
              data-testid="standard-glass-label"
              className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1.5 pointer-events-none max-w-[210px] sm:max-w-xs"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D1D1F]/90 text-white backdrop-blur-md border border-red-500/40 shadow-lg">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold tracking-tight text-[#FAF7F2]">
                  Standard Reflection-Prone Glass
                </span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#1D1D1F]/80 text-[#FAF7F2] text-[10px] sm:text-[11px] backdrop-blur-sm border border-white/10 space-y-0.5">
                <p className="font-semibold text-amber-300">• Uncoated specular glare</p>
                <p className="text-[#FAF7F2]/80">• Only ~45% UV protection (fades in 2-3 yrs)</p>
                <p className="text-[#FAF7F2]/80">• Heavy, fragile & risky to ship</p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            LAYER 2 (TOP): TRUVUE CONSERVATION ACRYLIC (Clipped dynamically by slider)
           ===================================================================== */}
        <div
          data-testid="truvue-acrylic-panel"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          className="absolute inset-0 w-full h-full bg-[var(--color-canvas-subtle)] flex items-center justify-center overflow-hidden transition-none"
        >
          {/* Pristine, Vivid Artwork Canvas with 99% UV Conservation Acrylic */}
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br dark:from-[#2D2218] dark:via-[#1E1710] dark:to-[#0F0C08] from-[#F4EFE6] via-[#EAE2D2] to-[#DFD5C2] p-6 sm:p-10">
            {/* Exactly identical artwork underneath, but with Rich, Saturated, Crystal-Clear Rendering */}
            <div className="relative w-full max-w-md h-full rounded-lg bg-[#FDF9F2] border-8 border-[#3A2A1E] shadow-2xl flex flex-col items-center justify-between p-6 overflow-hidden">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#86868B] font-serif">
                  Atelier Archival Plate No. 12
                </span>
                <h4 className="font-serif text-lg font-bold text-[#1D1D1F]">
                  Botanical Still Life in Sunlight
                </h4>
              </div>

              {/* Central Illustration Motif: Highly Saturated & Deep Contrast */}
              <div className="my-auto flex items-center justify-center relative">
                <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-xl">
                  <circle cx="100" cy="100" r="75" fill="#C5A059" opacity="0.65" />
                  <circle cx="100" cy="100" r="50" fill="#B45309" opacity="0.8" />
                  <path
                    d="M100 25 C70 65, 55 105, 100 175 C145 105, 130 65, 100 25 Z"
                    fill="#2E3C2E"
                  />
                  <line x1="100" y1="35" x2="100" y2="165" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx="100" cy="90" r="14" fill="#FFFFFF" />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-[9px] uppercase tracking-wider text-[#86868B]">
                  Archival Pigment on 310gsm Cotton Rag
                </p>
              </div>
            </div>

            {/* Zero Glare: Only extremely subtle, high-end optical museum anti-reflective coating sheen */}
            <div
              data-testid="truvue-clarity-overlay"
              className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-cyan-400/3 to-transparent"
            />
          </div>

          {/* TruVue Conservation Acrylic Feature Badge */}
          <div
            data-testid="truvue-acrylic-label"
            className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5 pointer-events-none max-w-[210px] sm:max-w-xs text-right"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D1D1F]/90 text-white backdrop-blur-md border border-[var(--color-border-subtle)] shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span className="text-xs font-bold tracking-tight text-white">
                TruVue® Conservation Acrylic
              </span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#1D1D1F]/80 text-white text-[10px] sm:text-[11px] backdrop-blur-sm border border-white/10 space-y-0.5">
              <p className="font-semibold text-[#C5A059]">• 99% UV-defense shields pigments</p>
              <p className="text-white/90">• Optically clear, saturated color preservation</p>
              <p className="text-white/90">• Lightweight, shatter-resistant & safe</p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            DRAGGABLE SPLIT HANDLE
           ===================================================================== */}
        <div
          data-testid="glass-slider-handle"
          style={{ left: `${sliderPosition}%` }}
          className="absolute top-0 bottom-0 w-1 -ml-0.5 z-30 bg-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.5)] pointer-events-none flex items-center justify-center"
        >
          {/* Top Finial */}
          <div className="absolute top-0 w-3 h-3 rounded-full bg-[#C5A059] -mt-1 shadow-sm" />

          {/* Center Draggable Knob */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C5A059] border-2 border-[#F4F1EA] text-[#1A1A1A] flex items-center justify-center shadow-2xl transform active:scale-95 transition-transform">
            <ChevronsLeftRight className="w-5 h-5 text-[#1A1A1A]" />
          </div>

          {/* Bottom Finial */}
          <div className="absolute bottom-0 w-3 h-3 rounded-full bg-[#C5A059] -mb-1 shadow-sm" />
        </div>
      </div>

      {/* Slider Footer Status Bar */}
      <div
        data-testid="glass-slider-track"
        className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-ink-muted)] pt-3 border-t border-[var(--color-border-subtle)]"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--color-ink-primary)]">Current Ratio:</span>
          <span className="px-2 py-0.5 rounded bg-[var(--color-canvas-subtle)] font-mono text-[11px] font-bold text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)]">
            {sliderPosition}% Standard Glass / {100 - sliderPosition}% TruVue®
          </span>
        </div>

        <div className="text-[11px] text-[var(--color-ink-muted)] flex items-center gap-2">
          <span>Tip: Click and drag handle, or use keyboard arrow keys</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   THE ATELIER: MATERIAL TRANSPARENCY & SUSTAINABILITY SECTION
   ========================================================================= */
export function AtelierMaterials() {
  return (
    <section
      id="atelier-materials"
      data-testid="atelier-materials"
      aria-label="The Atelier: Material Transparency & Sustainability"
      className="w-full bg-[var(--background)] py-16 sm:py-24 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            EDITORIAL SECTION HEADER
           ===================================================================== */}
        <div
          data-testid="atelier-header"
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Master Guild Workshop Standards</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            The Atelier: Material Transparency & Sustainability
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed font-normal max-w-2xl mx-auto">
            Deep dive into craft standards: FSC-certified Appalachian hardwoods, corner spline joinery, 4-ply cotton rag mats, and conservation acrylic.
          </p>
        </div>

        {/* =====================================================================
            4 MATERIAL & CRAFTSMANSHIP PILLARS
           ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 sm:mb-20">
          {ATELIER_PILLARS.map((pillar) => {
            const PillarIcon = pillar.icon;

            return (
              <div
                key={pillar.id}
                data-testid={pillar.testId}
                className="bg-[var(--color-canvas-surface)] rounded-2xl border border-[var(--color-border-subtle)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[var(--color-accent-gold)] transition-all duration-200 group"
              >
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-canvas-subtle)] text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)] text-xs font-semibold uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-canvas-subtle)] text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <PillarIcon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--color-ink-primary)] tracking-tight mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent-gold)] font-medium mb-3">
                    {pillar.tagline}
                  </p>
                  <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="bg-[var(--color-canvas-subtle)] rounded-xl border border-[var(--color-border-subtle)] p-4 space-y-2 mb-4">
                    {pillar.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-xs gap-2"
                      >
                        <span className="text-[var(--color-ink-muted)] font-medium">{spec.label}</span>
                        <span className="text-[var(--color-ink-primary)] font-semibold text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Craft Highlight Pill */}
                <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center gap-2 text-xs text-[var(--color-ink-secondary)]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--color-accent-gold)]" />
                  <span className="font-medium">{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            INTERACTIVE GLASS GLARE COMPARISON SLIDER STAGE
           ===================================================================== */}
        <GlassComparisonSlider />
      </div>
    </section>
  );
}
