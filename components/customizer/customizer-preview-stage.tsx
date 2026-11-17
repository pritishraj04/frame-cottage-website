"use client";

import React from "react";
import {
  MOULDINGS,
  MAT_OPTIONS,
  type MouldingId,
  type MatId,
} from "@/lib/constants/frames";
import {
  MAT_COLORS,
  GLAZING_OPTIONS,
  SIZE_OPTIONS,
  type MatColorId,
  type GlazingId,
  type SizeId,
  type ArtworkPresetId,
  calculateDpi,
} from "@/lib/constants/customizer";
import { CustomizerArtworkRenderer } from "./customizer-artwork-renderer";
import { cn } from "@/lib/utils";
import { Sun, Lamp, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface CustomizerPreviewStageProps {
  mouldingId: MouldingId;
  matId: MatId;
  matColorId: MatColorId;
  glazingId: GlazingId;
  sizeId: SizeId;
  customWidth: number;
  customHeight: number;
  artworkType: "preset" | "upload";
  presetId: ArtworkPresetId;
  uploadedImageUrl: string | null;
  uploadedImageName: string | null;
  uploadedImageWidth: number | null;
  uploadedImageHeight: number | null;
  previewMode: "studio" | "room";
  onTogglePreviewMode: (mode: "studio" | "room") => void;
}

export function CustomizerPreviewStage({
  mouldingId,
  matId,
  matColorId,
  glazingId,
  sizeId,
  customWidth,
  customHeight,
  artworkType,
  presetId,
  uploadedImageUrl,
  uploadedImageName,
  uploadedImageWidth,
  uploadedImageHeight,
  previewMode,
  onTogglePreviewMode,
}: CustomizerPreviewStageProps) {
  const moulding = MOULDINGS[mouldingId] || MOULDINGS.walnut;
  const mat = MAT_OPTIONS[matId] || MAT_OPTIONS.classic;
  const matColor = MAT_COLORS[matColorId] || MAT_COLORS["off-white"];
  const glazing = GLAZING_OPTIONS[glazingId] || GLAZING_OPTIONS["conservation-clear"];
  const size = SIZE_OPTIONS[sizeId] || SIZE_OPTIONS["8x10"];

  const isRoom = previewMode === "room";

  // Effective dimensions for aspect ratio & DPI
  const effectiveWidthInches = sizeId === "custom" ? customWidth : size.widthInches;
  const effectiveHeightInches = sizeId === "custom" ? customHeight : size.heightInches;

  // Aspect ratio string (width / height)
  const aspectRatio = `${effectiveWidthInches} / ${effectiveHeightInches}`;

  // DPI calculation for image uploads or presets
  const dpiInfo = calculateDpi(
    uploadedImageWidth,
    uploadedImageHeight,
    effectiveWidthInches,
    effectiveHeightInches
  );

  // Dynamic mat padding
  // Scale mat width: none = 0px, classic = 28px, gallery = 44px
  const matPaddingPx =
    mat.id === "none" ? 0 : mat.id === "classic" ? 28 : 44;

  return (
    <div
      data-testid="customizer-preview-stage"
      className="relative flex flex-col w-full rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-surface)] shadow-2xl overflow-hidden"
    >
      {/* Stage Top Bar: Context Toggle & Studio Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-wider uppercase text-accent">
            Live Atelier Visualizer
          </span>
          <span className="hidden sm:inline text-xs font-mono text-[var(--color-ink-muted)]">
            • {effectiveWidthInches}×{effectiveHeightInches}″ ({size.label})
          </span>
        </div>

        {/* Dual-Stage Toggle: Studio Spotlight vs Curated Room */}
        <div
          role="radiogroup"
          aria-label="Preview stage environment"
          className="inline-flex p-1 rounded-full bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)]"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!isRoom}
            data-testid="preview-toggle-studio"
            onClick={() => onTogglePreviewMode("studio")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
              !isRoom
                ? "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] shadow-xs font-semibold"
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
            data-testid="preview-toggle-room"
            onClick={() => onTogglePreviewMode("room")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
              isRoom
                ? "bg-[#2A332B] text-[#FAF7F2] shadow-xs font-semibold"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
            )}
          >
            <Lamp className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>In-Situ Room</span>
          </button>
        </div>
      </div>

      {/* Main Display Canvas */}
      <div
        data-testid="frame-display-container"
        className={cn(
          "relative min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center p-6 sm:p-12 transition-colors duration-500 overflow-hidden",
          !isRoom
            ? "bg-[var(--color-canvas-base)] text-[var(--color-ink-primary)]"
            : "bg-gradient-to-b from-[#1C211D] via-[#151916] to-[#0E120F] text-[#FAF7F2]"
        )}
      >
        {/* Wall Background Texture */}
        {!isRoom ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C4B5A5_1px,transparent_1px)] [background-size:24px_24px]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#D5B880_1px,transparent_1px)] [background-size:28px_28px]"
          />
        )}

        {/* Ambient Overhead Light Bloom */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-700",
            !isRoom ? "bg-amber-100/40 opacity-70" : "bg-amber-500/20 opacity-90"
          )}
        />

        {/* Top Floating Badge: DPI / Health Status */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex flex-wrap items-center gap-2">
          <div
            data-testid="customizer-dpi-badge"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wide border backdrop-blur-md shadow-xs transition-colors",
              dpiInfo.level === "optimal"
                ? "border-emerald-500/40 bg-emerald-950/70 text-emerald-200"
                : dpiInfo.level === "acceptable"
                ? "border-amber-500/40 bg-amber-950/70 text-amber-200"
                : "border-rose-500/40 bg-rose-950/70 text-rose-200"
            )}
          >
            {dpiInfo.level === "optimal" ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            ) : dpiInfo.level === "acceptable" ? (
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
            )}
            <span>{dpiInfo.badgeText}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)]/80 text-[var(--color-ink-muted)] backdrop-blur-sm">
            <ShieldCheck className="w-3 h-3 text-accent" />
            <span>{glazing.name.split(" ")[0]} Glaze</span>
          </div>
        </div>

        {/* Realistic Layered Frame Island */}
        <div
          data-testid="customizer-outer-moulding"
          style={{
            background: moulding.frameGradient,
            boxShadow: isRoom
              ? "0 30px 60px -12px rgba(0, 0, 0, 0.75), 0 18px 36px -18px rgba(0, 0, 0, 0.6), inset 0 0 1px 1px rgba(255, 255, 255, 0.15)"
              : "0 20px 45px -10px rgba(0, 0, 0, 0.35), 0 10px 20px -10px rgba(0, 0, 0, 0.2), inset 0 0 1px 1px rgba(255, 255, 255, 0.2)",
            borderColor: moulding.borderColor,
            aspectRatio: aspectRatio,
          }}
          className={cn(
            "relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] p-3.5 sm:p-5 rounded-xs transition-all duration-500 border border-t-[rgba(255,255,255,0.3)] border-b-[rgba(0,0,0,0.4)]",
            "transform will-change-transform"
          )}
        >
          {/* Inner Moulding Lip / Miter Shadow */}
          <div
            style={{
              borderColor: moulding.innerLipColor,
            }}
            className="relative w-full h-full p-0.5 border border-black/30 rounded-xs overflow-hidden flex flex-col"
          >
            {/* Matboard Layer */}
            <div
              data-testid="customizer-mat-board"
              style={{
                padding: `${matPaddingPx}px`,
                backgroundColor: matColor.hex,
                borderColor: matColor.borderColor,
              }}
              className={cn(
                "relative w-full h-full transition-all duration-300 flex flex-col",
                mat.id !== "none" &&
                  "shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] border"
              )}
            >
              {/* Beveled 45-degree Rag Edge Cut Line */}
              <div
                data-testid="frame-artwork"
                style={{
                  boxShadow:
                    mat.id !== "none"
                      ? "inset 1px 1px 3px rgba(0,0,0,0.28), inset -1px -1px 2px rgba(255,255,255,0.6)"
                      : "inset 0 1px 3px rgba(0,0,0,0.3)",
                }}
                className="relative w-full h-full flex-1 overflow-hidden select-none bg-[#FAF6EE]"
              >
                {/* Visual Art Content */}
                <CustomizerArtworkRenderer
                  artworkType={artworkType}
                  presetId={presetId}
                  uploadedImageUrl={uploadedImageUrl}
                  uploadedImageName={uploadedImageName}
                />

                {/* Glazing Reflection / Light Sheen Layer */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-300",
                    glazing.id === "conservation-clear"
                      ? "bg-gradient-to-tr from-transparent via-white/[0.08] to-white/[0.04] opacity-90"
                      : glazing.id === "acrylic"
                      ? "bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent opacity-80"
                      : "bg-gradient-to-tr from-transparent via-cyan-100/[0.02] to-transparent opacity-30" // Museum glass is virtually invisible!
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pill: Active Configuration Summary */}
        <div
          className={cn(
            "absolute bottom-3 sm:bottom-4 px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all flex items-center gap-2 z-20 shadow-md",
            !isRoom
              ? "bg-[var(--color-canvas-surface)]/90 text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              : "bg-[#1E241F]/90 text-[#FAF7F2] border border-[#3E4A3F]"
          )}
        >
          <span className="font-semibold">{moulding.name}</span>
          <span className="text-[#C5A059]">•</span>
          <span className="text-[var(--color-ink-secondary)]">
            {mat.name} {mat.id !== "none" ? `(${matColor.name})` : ""}
          </span>
          <span className="text-[#C5A059]">•</span>
          <span className="text-[var(--color-ink-muted)]">
            {effectiveWidthInches}×{effectiveHeightInches}″
          </span>
        </div>
      </div>
    </div>
  );
}
