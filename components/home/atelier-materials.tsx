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
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 shadow-sm">
      {/* Slider Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-[#E8E1D5]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE2] text-[#B45309] text-xs font-semibold uppercase tracking-wider mb-2">
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Glare & UV Simulation</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#191614] tracking-tight">
            Standard Glare-Prone Glass vs. TruVue® Conservation Acrylic
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#5C554E] max-w-2xl">
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
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
              sliderPosition >= 90
                ? "bg-[#191614] text-white border-[#191614]"
                : "bg-[#FAF7F2] text-[#5C554E] border-[#E8E1D5] hover:bg-[#F3ECE2]"
            )}
          >
            Standard Glass
          </button>
          <button
            type="button"
            data-testid="slider-preset-split"
            onClick={() => setSliderPosition(50)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
              sliderPosition > 20 && sliderPosition < 80
                ? "bg-[#191614] text-white border-[#191614]"
                : "bg-[#FAF7F2] text-[#5C554E] border-[#E8E1D5] hover:bg-[#F3ECE2]"
            )}
          >
            Split 50/50
          </button>
          <button
            type="button"
            data-testid="slider-preset-truvue"
            onClick={() => setSliderPosition(0)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
              sliderPosition <= 10
                ? "bg-[#B45309] text-white border-[#B45309]"
                : "bg-[#FAF7F2] text-[#5C554E] border-[#E8E1D5] hover:bg-[#F3ECE2]"
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
        className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-xl overflow-hidden cursor-ew-resize select-none border-2 border-[#191614] shadow-md focus:outline-none focus:ring-2 focus:ring-[#B45309]"
      >
        {/* =====================================================================
            LAYER 1 (BASE): STANDARD REFLECTION-PRONE GLASS
           ===================================================================== */}
        <div
          data-testid="standard-glass-panel"
          className="absolute inset-0 w-full h-full bg-[#191614] flex items-center justify-center overflow-hidden"
        >
          {/* Rich Artwork Canvas under Standard Glass */}
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2D2218] via-[#1E1710] to-[#0F0C08] p-6 sm:p-10">
            {/* The Artwork Itself (Artisanal Botanical & Geometric Still Life) */}
            <div className="relative w-full max-w-md h-full rounded-lg bg-[#F5ECE0] border-8 border-[#3A2A1E] shadow-inner flex flex-col items-center justify-between p-6 overflow-hidden">
              {/* Paper Texture */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30 bg-[radial-gradient(#9B836A_1px,transparent_1px)] [background-size:12px_12px]"
              />

              {/* Art Header */}
              <div className="relative z-10 text-center w-full">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#8F877E] font-medium">
                  Atelier Heritage Edition • 1892
                </span>
                <h4 className="font-serif italic text-base sm:text-lg text-[#191614]">
                  Flora Americana & Sunlit Grove
                </h4>
              </div>

              {/* Vibrant Botanical Graphic */}
              <div className="relative z-10 my-auto flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md">
                  <circle cx="100" cy="100" r="80" fill="#994D1C" opacity="0.85" />
                  <circle cx="100" cy="100" r="56" fill="#C5A059" opacity="0.9" />
                  <circle cx="100" cy="100" r="32" fill="#2E4034" />
                  {/* Botanical Leaves */}
                  <path
                    d="M100 20 C 130 50, 160 80, 100 130 C 40 80, 70 50, 100 20 Z"
                    fill="#3F5A3E"
                  />
                  <path
                    d="M30 100 C 60 70, 90 40, 140 100 C 90 160, 60 130, 30 100 Z"
                    fill="#C5A059"
                    opacity="0.8"
                  />
                  <circle cx="100" cy="100" r="12" fill="#FAF7F2" />
                  <circle cx="100" cy="100" r="6" fill="#B45309" />
                </svg>
              </div>

              {/* Art Footer */}
              <div className="relative z-10 text-center w-full border-t border-[#D5C7B5] pt-2">
                <p className="font-serif text-[10px] text-[#5C554E]">
                  Solid Cotton Archival Pigment • 310gsm
                </p>
              </div>
            </div>

            {/* =================================================================
                THE HARSH GLARE WASH (STANDARD GLASS DEFECTS)
               ================================================================= */}
            {/* 1. Milky specular wash lowering contrast */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-white/35 backdrop-brightness-110 backdrop-contrast-[0.72] backdrop-saturate-[0.65]"
            />

            {/* 2. Harsh diagonal window pane reflection streaks */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              {/* Window Pane Reflection 1 */}
              <div className="absolute -top-20 -left-20 w-[140%] h-48 bg-gradient-to-b from-white/70 via-white/40 to-transparent -rotate-35 transform blur-[2px]" />
              {/* Window Pane Reflection 2 */}
              <div className="absolute top-28 -left-20 w-[140%] h-36 bg-gradient-to-b from-white/60 via-white/30 to-transparent -rotate-35 transform blur-[3px]" />
              {/* Window Mullion bar shadow */}
              <div className="absolute top-20 -left-20 w-[140%] h-8 bg-black/15 -rotate-35 transform blur-[1px]" />
              {/* Specular light hotspot */}
              <div className="absolute top-8 left-12 w-44 h-44 rounded-full bg-radial from-white/60 via-white/20 to-transparent blur-md" />
            </div>
          </div>

          {/* Standard Glass Badge & Overlay Tag (Left Side) */}
          <div
            data-testid="standard-glass-label"
            className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none max-w-[210px] sm:max-w-xs"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/85 text-white backdrop-blur-md border border-white/20 shadow-lg">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="text-xs font-bold tracking-tight">
                Standard Reflection-Prone Glass
              </span>
            </div>
            <div className="px-2.5 py-1 rounded bg-black/70 text-white/90 text-[10px] sm:text-[11px] backdrop-blur-sm border border-white/10 space-y-0.5">
              <p className="font-semibold text-red-300">• Cloudy glare washes out fine art details</p>
              <p className="text-white/80">• Reflects 8–12% ambient room light</p>
              <p className="text-white/80">• Less than 40% UV block (causes rapid fading)</p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            LAYER 2 (TOP / REVEAL): TRUVUE® CONSERVATION ACRYLIC
           ===================================================================== */}
        <div
          data-testid="truvue-acrylic-panel"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          className="absolute inset-0 w-full h-full bg-[#191614] flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Pristine Museum Artwork (Crisp, Ultra-Vibrant, Zero Glare) */}
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2D2218] via-[#1E1710] to-[#0F0C08] p-6 sm:p-10">
            {/* Same Artwork, razor-sharp with saturated pigments & archival depth */}
            <div className="relative w-full max-w-md h-full rounded-lg bg-[#FAF4EB] border-8 border-[#3A2A1E] shadow-2xl flex flex-col items-center justify-between p-6 overflow-hidden">
              {/* Crisp Paper Texture */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-35 bg-[radial-gradient(#9B836A_1px,transparent_1px)] [background-size:12px_12px]"
              />

              {/* Art Header */}
              <div className="relative z-10 text-center w-full">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#B45309] font-bold">
                  Atelier Heritage Edition • 1892
                </span>
                <h4 className="font-serif italic text-base sm:text-lg text-[#191614] font-semibold">
                  Flora Americana & Sunlit Grove
                </h4>
              </div>

              {/* Saturated Botanical Graphic with zero washed-out glare */}
              <div className="relative z-10 my-auto flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-xl">
                  <circle cx="100" cy="100" r="80" fill="#B45309" />
                  <circle cx="100" cy="100" r="56" fill="#C5A059" />
                  <circle cx="100" cy="100" r="32" fill="#1C3829" />
                  {/* Botanical Leaves */}
                  <path
                    d="M100 20 C 130 50, 160 80, 100 130 C 40 80, 70 50, 100 20 Z"
                    fill="#275034"
                  />
                  <path
                    d="M30 100 C 60 70, 90 40, 140 100 C 90 160, 60 130, 30 100 Z"
                    fill="#DDB56C"
                  />
                  <circle cx="100" cy="100" r="12" fill="#FFFFFF" />
                  <circle cx="100" cy="100" r="6" fill="#B45309" />
                </svg>
              </div>

              {/* Art Footer */}
              <div className="relative z-10 text-center w-full border-t border-[#D5C7B5] pt-2">
                <p className="font-serif text-[10px] text-[#191614] font-semibold">
                  Solid Cotton Archival Pigment • 310gsm • 99% UV Preserved
                </p>
              </div>

              {/* Anti-Reflective Watermark */}
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#92400E] text-[7.5px] font-bold uppercase tracking-wider">
                True Museum Fidelity
              </div>
            </div>

            {/* Zero Glare Overlay - Optically Pure Crystal Finish */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10"
            />
          </div>

          {/* TruVue Conservation Acrylic Badge & Tag (Right Side) */}
          <div
            data-testid="truvue-acrylic-label"
            className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5 pointer-events-none max-w-[210px] sm:max-w-xs text-right"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191614]/90 text-white backdrop-blur-md border border-[#C5A059] shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="text-xs font-bold tracking-tight text-[#FAF7F2]">
                TruVue® Conservation Acrylic
              </span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#191614]/80 text-[#FAF7F2] text-[10px] sm:text-[11px] backdrop-blur-sm border border-[#C5A059]/30 space-y-0.5">
              <p className="font-semibold text-emerald-300">• 99% UV-defense shields pigments</p>
              <p className="text-[#FAF7F2]/90">• Optically clear, saturated color preservation</p>
              <p className="text-[#FAF7F2]/90">• Lightweight, shatter-resistant & safe</p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            DRAGGABLE SPLIT HANDLE
           ===================================================================== */}
        <div
          data-testid="glass-slider-handle"
          style={{ left: `${sliderPosition}%` }}
          className="absolute top-0 bottom-0 w-1 -ml-0.5 z-30 bg-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.8)] pointer-events-none flex items-center justify-center"
        >
          {/* Top Brass Finial */}
          <div className="absolute top-0 w-3 h-3 rounded-full bg-[#C5A059] -mt-1 shadow-sm" />

          {/* Center Draggable Knob */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#191614] border-2 border-[#C5A059] text-[#FAF7F2] flex items-center justify-center shadow-2xl transform active:scale-95 transition-transform">
            <ChevronsLeftRight className="w-5 h-5 text-[#C5A059]" />
          </div>

          {/* Bottom Brass Finial */}
          <div className="absolute bottom-0 w-3 h-3 rounded-full bg-[#C5A059] -mb-1 shadow-sm" />
        </div>
      </div>

      {/* Slider Footer Status Bar */}
      <div
        data-testid="glass-slider-track"
        className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C554E] pt-3 border-t border-[#E8E1D5]"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#191614]">Current Ratio:</span>
          <span className="px-2 py-0.5 rounded bg-[#F3ECE2] font-mono text-[11px] font-bold text-[#B45309]">
            {sliderPosition}% Standard Glass / {100 - sliderPosition}% TruVue®
          </span>
        </div>

        <div className="text-[11px] text-[#8F877E] flex items-center gap-2">
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
      className="w-full bg-[#FAF7F2] py-16 sm:py-24 border-b border-[#E8E1D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            EDITORIAL SECTION HEADER
           ===================================================================== */}
        <div
          data-testid="atelier-header"
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE2] border border-[#E8E1D5] text-[#B45309] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Master Guild Workshop Standards</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#191614] tracking-tight leading-[1.18]">
            The Atelier: Material Transparency & Sustainability
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#5C554E] leading-relaxed font-sans max-w-2xl mx-auto">
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
                className="bg-[#FFFFFF] rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#C5A059]/50 transition-all duration-200 group"
              >
                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#FAF7F2] text-[#B45309] border border-[#E8E1D5] text-xs font-semibold uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F3ECE2] text-[#B45309] border border-[#E8E1D5] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <PillarIcon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-2xl font-normal text-[#191614] tracking-tight mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#8F877E] font-medium mb-3">
                    {pillar.tagline}
                  </p>
                  <p className="text-sm text-[#5C554E] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="bg-[#FAF7F2] rounded-xl border border-[#E8E1D5] p-4 space-y-2 mb-4">
                    {pillar.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-xs gap-2"
                      >
                        <span className="text-[#8F877E] font-medium">{spec.label}</span>
                        <span className="text-[#191614] font-semibold text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Craft Highlight Pill */}
                <div className="pt-2 border-t border-[#E8E1D5] flex items-center gap-2 text-xs text-[#B45309]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
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
