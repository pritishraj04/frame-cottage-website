"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MOULDINGS,
  MOULDING_LIST,
  MAT_OPTIONS,
  MAT_OPTION_LIST,
  CONTEXT_VIEWS,
  type MouldingId,
  type MatId,
  type ContextViewId,
  calculateFramePrice,
} from "@/lib/constants/frames";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ShieldCheck,
  Upload,
  Sliders,
  Check,
  Eye,
  Sun,
  Lamp,
} from "lucide-react";

export function LiveFrameSwitcher() {
  const [mouldingId, setMouldingId] = useState<MouldingId>("walnut");
  const [matId, setMatId] = useState<MatId>("classic");
  const [contextView, setContextView] = useState<ContextViewId>("studio");

  const currentMoulding = MOULDINGS[mouldingId];
  const currentMat = MAT_OPTIONS[matId];
  const totalPrice = calculateFramePrice(mouldingId, matId);

  const isRoom = contextView === "room";

  return (
    <div
      data-testid="live-frame-switcher"
      className="relative flex flex-col w-full max-w-xl mx-auto lg:max-w-none rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)] shadow-2xl overflow-hidden transition-colors duration-250"
    >
      {/* Top Bar: Room Context Toggle & Live Spec Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-ink-muted)]">
            Interactive Atelier Island
          </span>
        </div>

        {/* Room Context Segmented Toggle */}
        <div
          role="radiogroup"
          aria-label="Room context preview"
          className="inline-flex p-1 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)]"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!isRoom}
            data-testid="context-toggle-studio"
            onClick={() => setContextView("studio")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
              !isRoom
                ? "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] shadow-xs"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
            )}
          >
            <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Studio Neutral</span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={isRoom}
            data-testid="context-toggle-room"
            onClick={() => setContextView("room")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
              isRoom
                ? "bg-[#2A332B] text-[#F5F5F7] shadow-xs"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
            )}
          >
            <Lamp className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Curated Living Room</span>
          </button>
        </div>
      </div>

      {/* Main Display Stage: In-situ Wall Backdrop with Live Frame */}
      <div
        data-testid="frame-display-container"
        className={cn(
          "relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-6 sm:p-10 transition-colors duration-500 overflow-hidden",
          !isRoom
            ? "bg-[var(--color-canvas-base)] text-[var(--color-ink-primary)]"
            : "bg-gradient-to-b from-[#1E241F] via-[#161B17] to-[#111412] text-[#FAF7F2]"
        )}
      >
        {/* Subtle Ambient Wall Background Grid & Light Gradients */}
        {!isRoom ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C4B5A5_1px,transparent_1px)] [background-size:24px_24px]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D5B880_1px,transparent_1px)] [background-size:28px_28px]"
          />
        )}

        {/* Ambient Overhead Light Bloom */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-700",
            !isRoom
              ? "bg-amber-100/40 opacity-70"
              : "bg-amber-500/20 opacity-80"
          )}
        />

        {/* Wall Mood Tag */}
        <div
          className={cn(
            "absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide transition-all backdrop-blur-sm",
            !isRoom
              ? "bg-[var(--color-canvas-surface)]/90 text-[var(--color-ink-secondary)] border border-[var(--color-border-subtle)]"
              : "bg-[#2A332B]/90 text-[#D8CFBF] border border-[#3E4A3F]"
          )}
        >
          <Eye className="w-3 h-3 text-[#C5A059]" />
          <span>{CONTEXT_VIEWS[contextView].tagline}</span>
        </div>

        {/* Live Dynamic Frame Island */}
        <div
          data-testid="frame-outer-moulding"
          style={{
            background: currentMoulding.frameGradient,
            boxShadow: isRoom
              ? "var(--shadow-frame-room)"
              : "var(--shadow-frame-resting)",
            borderColor: currentMoulding.borderColor,
          }}
          className={cn(
            "relative p-3.5 sm:p-5 rounded-xs transition-all duration-500 border border-t-[rgba(255,255,255,0.25)] border-b-[rgba(0,0,0,0.35)]",
            "transform will-change-transform hover:scale-[1.01]"
          )}
        >
          {/* Inner Moulding Lip / Miter Shadow */}
          <div
            style={{
              borderColor: currentMoulding.innerLipColor,
            }}
            className="relative p-0.5 border border-black/30 rounded-xs"
          >
            {/* Mat Board Layer (Soft Ivory / Cream #F4F1EA) */}
            <div
              data-testid="frame-mat-board"
              style={{
                padding: `${currentMat.widthPx}px`,
                backgroundColor: "#F4F1EA",
              }}
              className={cn(
                "relative transition-all duration-300",
                currentMat.id !== "none" &&
                  "shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] border border-[#E0DACE]"
              )}
            >
              {/* Beveled 45-degree Rag Edge Shadow (when mat is present) */}
              <div
                data-testid="frame-artwork"
                style={{
                  boxShadow:
                    currentMat.id !== "none"
                      ? "var(--shadow-frame-inner-mat)"
                      : "inset 0 1px 3px rgba(0,0,0,0.25)",
                }}
                className="relative overflow-hidden bg-[#FAF6EE] select-none"
              >
                {/* Archival Artwork: Exquisite Botanical Plate Print */}
                <div className="relative w-48 h-60 sm:w-60 sm:h-72 p-4 flex flex-col justify-between items-center text-center bg-[#FAF6EE] text-[#1D1D1F]">
                  {/* Subtle Archival Texture Grain */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#A08D79_0.75px,transparent_0.75px)] [background-size:12px_12px]"
                  />

                  {/* Artwork Header */}
                  <div className="relative z-10 w-full pt-1">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#86868B] font-medium">
                      Atelier Herbarium • Tab. IV
                    </p>
                    <div className="mx-auto my-1 w-8 h-[1px] bg-[#C5A059]/60" />
                  </div>

                  {/* Botanical Centerpiece Illustration (SVG) */}
                  <div className="relative z-10 my-auto flex items-center justify-center">
                    <svg
                      viewBox="0 0 120 150"
                      className="w-28 h-36 sm:w-32 sm:h-40 text-[#3C4A3E] drop-shadow-xs"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Delicate Botanical Ginkgo Foliage */}
                      <path
                        d="M60 142 C 60 115, 61 78, 59 40"
                        stroke="#725838"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M59 75 C 68 68, 76 60, 84 50"
                        stroke="#725838"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M60 98 C 48 90, 42 82, 34 74"
                        stroke="#725838"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />

                      {/* Main Center Ginkgo Leaf */}
                      <path
                        d="M59 40 C 45 35, 32 24, 38 12 C 45 1, 58 10, 59 22 C 60 10, 73 1, 80 12 C 86 24, 73 35, 59 40 Z"
                        fill="#526454"
                        stroke="#3A483B"
                        strokeWidth="0.8"
                      />
                      {/* Left Leaf */}
                      <path
                        d="M34 74 C 22 70, 12 60, 16 50 C 22 40, 33 48, 34 58 C 35 48, 46 40, 52 50 C 57 60, 46 70, 34 74 Z"
                        fill="#748A76"
                        stroke="#4B5B4D"
                        strokeWidth="0.8"
                      />
                      {/* Right Leaf */}
                      <path
                        d="M84 50 C 96 46, 106 36, 102 26 C 96 16, 85 24, 84 34 C 83 24, 72 16, 66 26 C 61 36, 72 46, 84 50 Z"
                        fill="#627865"
                        stroke="#455447"
                        strokeWidth="0.8"
                      />
                      {/* Terracotta/Brass Seed Accent */}
                      <circle cx="59" cy="38" r="2.5" fill="#6B1C23" />
                      <circle cx="84" cy="48" r="2" fill="#C5A059" />
                      <circle cx="34" cy="72" r="2" fill="#6B1C23" />
                    </svg>
                  </div>

                  {/* Artwork Footer Taxonomy */}
                  <div className="relative z-10 w-full pb-1">
                    <p className="font-serif italic text-xs tracking-wide text-[#1D1D1F]">
                      Ginkgo biloba L.
                    </p>
                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#86868B] mt-0.5">
                      Archival Pigment • 310gsm Cotton Rag
                    </p>
                  </div>

                  {/* Museum Glass Sheen Simulation */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/12 to-white/5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Selection Pill at bottom of preview */}
        <div
          className={cn(
            "absolute bottom-3 sm:bottom-4 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all flex items-center gap-2",
            !isRoom
              ? "bg-[var(--color-canvas-surface)]/90 text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)] shadow-md"
              : "bg-[#1E241F]/90 text-[#FAF7F2] border border-[#3E4A3F] shadow-md"
          )}
        >
          <span className="font-semibold">{currentMoulding.name}</span>
          <span className="text-[#C5A059]">•</span>
          <span className="text-[var(--color-ink-secondary)]">
            {currentMat.name}
          </span>
        </div>
      </div>

      {/* Interactive Controls Island */}
      <div className="p-5 sm:p-6 space-y-5 bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]">
        {/* Row 1: Moulding Selection */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label
              id="moulding-picker-label"
              className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-primary)]"
            >
              1. Choose Solid Hardwood Moulding
            </label>
            <span className="text-xs text-[var(--color-ink-muted)]">
              {currentMoulding.dimensions}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-labelledby="moulding-picker-label"
            data-testid="moulding-picker"
            className="grid grid-cols-2 sm:grid-cols-5 gap-2.5"
          >
            {MOULDING_LIST.map((m) => {
              const isSelected = m.id === mouldingId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`moulding-option-${m.id}`}
                  onClick={() => setMouldingId(m.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-200 group text-left cursor-pointer",
                    isSelected
                      ? "border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] ring-2 ring-[var(--color-accent-gold)]/40 shadow-xs text-[var(--color-ink-primary)]"
                      : "border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)]/60 bg-[var(--color-canvas-subtle)]/50 text-[var(--color-ink-secondary)] hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  {/* Swatch Pill with Realistic Gradient */}
                  <div className="relative mb-2">
                    <span
                      style={{ background: m.swatchGradient }}
                      className={cn(
                        "block w-7 h-7 rounded-full shadow-xs border border-black/15 transition-transform group-hover:scale-105",
                        isSelected && "ring-2 ring-offset-1 ring-offset-[var(--color-canvas-surface)] ring-[#C5A059]"
                      )}
                    />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#C5A059] text-[#1A1A1A]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-[var(--color-ink-primary)] leading-tight line-clamp-1">
                    {m.name.split(" ")[0]} {m.name.split(" ")[1] || ""}
                  </span>
                  <span className="text-[11px] text-[var(--color-ink-muted)] mt-0.5 font-normal">
                    ${m.basePrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Mat Option Selection */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label
              id="mat-picker-label"
              className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-primary)]"
            >
              2. Select Archival Matting Margin
            </label>
            <span className="text-xs text-[var(--color-ink-muted)]">4-Ply Cotton Rag</span>
          </div>

          <div
            role="radiogroup"
            aria-labelledby="mat-picker-label"
            data-testid="mat-picker"
            className="grid grid-cols-3 gap-2.5"
          >
            {MAT_OPTION_LIST.map((mat) => {
              const isSelected = mat.id === matId;
              return (
                <button
                  key={mat.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`mat-option-${mat.id}`}
                  onClick={() => setMatId(mat.id)}
                  className={cn(
                    "flex flex-col items-center justify-center py-2.5 px-3 rounded-xl border transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] ring-2 ring-[var(--color-accent-gold)]/40 font-medium"
                      : "border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)]/60 bg-[var(--color-canvas-subtle)]/50 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
                  )}
                >
                  <span className="text-xs font-medium">{mat.name}</span>
                  <span className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">
                    {mat.price === 0 ? "Included" : `+$${mat.price}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Price Display & Action CTAs */}
        <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div data-testid="frame-price-display" className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xs uppercase tracking-wider text-[var(--color-ink-muted)]">
                Total Price:
              </span>
              <span
                data-testid="frame-price-amount"
                className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-accent-gold)]"
              >
                ${totalPrice}
              </span>
            </div>
            <p className="text-[11px] text-[var(--color-ink-muted)]">
              Includes {currentMoulding.name} (${currentMoulding.basePrice})
              {currentMat.price > 0 && ` + Mat ($${currentMat.price})`} + UV
              Acrylic
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href={`/customizer?moulding=${mouldingId}&mat=${matId}`}
              data-testid="cta-customize"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-accent-gold)] hover:bg-[#B38F48] text-[var(--background)] text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-xs"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize This Frame</span>
            </Link>

            <Link
              href="/upload"
              data-testid="cta-upload"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border-strong)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] hover:bg-[var(--color-canvas-card-elevated)] text-[var(--color-ink-primary)] text-xs sm:text-sm font-medium transition-colors"
            >
              <Upload className="w-4 h-4 text-[#C5A059]" />
              <span>Upload Your Photo</span>
            </Link>
          </div>
        </div>

        {/* Trust Note */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-[var(--color-ink-muted)]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>99% UV-Shielding Museum Glass Included</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Handmade in 5–7 Days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
