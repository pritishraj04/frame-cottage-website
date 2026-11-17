"use client";

import React, { useRef, useEffect, useState } from "react";
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
  ARTWORK_PRESETS,
} from "@/lib/constants/customizer";
import { X, Printer, Shield, Check, Award, FileText } from "lucide-react";

interface CustomizerSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  mouldingId: MouldingId;
  matId: MatId;
  matColorId: MatColorId;
  glazingId: GlazingId;
  sizeId: SizeId;
  customWidth: number;
  customHeight: number;
  artworkType: "preset" | "upload";
  presetId: ArtworkPresetId;
  uploadedImageName: string | null;
  totalPrice: number;
}

export function CustomizerSpecModal({
  isOpen,
  onClose,
  mouldingId,
  matId,
  matColorId,
  glazingId,
  sizeId,
  customWidth,
  customHeight,
  artworkType,
  presetId,
  uploadedImageName,
  totalPrice,
}: CustomizerSpecModalProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [specNumber] = useState(() => `FC-SPEC-${Date.now().toString(36).toUpperCase()}`);


  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const moulding = MOULDINGS[mouldingId] || MOULDINGS.walnut;
  const mat = MAT_OPTIONS[matId] || MAT_OPTIONS.classic;
  const matColor = MAT_COLORS[matColorId] || MAT_COLORS["off-white"];
  const glazing = GLAZING_OPTIONS[glazingId] || GLAZING_OPTIONS["conservation-clear"];
  const size = SIZE_OPTIONS[sizeId] || SIZE_OPTIONS["8x10"];
  const preset = ARTWORK_PRESETS[presetId];

  const widthInches = sizeId === "custom" ? customWidth : size.widthInches;
  const heightInches = sizeId === "custom" ? customHeight : size.heightInches;
  const widthMm = Math.round(widthInches * 25.4);
  const heightMm = Math.round(heightInches * 25.4);



  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="spec-sheet-title"
      data-testid="spec-sheet-dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[var(--color-canvas-surface)] border border-[var(--color-border-strong)] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            <h2 id="spec-sheet-title" className="font-serif text-lg font-bold text-[var(--color-ink-primary)]">
              Archival Engineering Spec Sheet
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              data-testid="print-spec-sheet-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              data-testid="close-spec-modal-btn"
              aria-label="Close specification sheet"
              className="p-1.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-surface)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Specification Body */}
        <div ref={printRef} className="p-6 sm:p-8 space-y-6 text-[var(--color-ink-primary)] print:p-0">
          {/* Atelier Brand Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-dashed border-[var(--color-border-strong)] gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                FRAMES COTTAGE • BESPOKE ATELIER
              </p>
              <h1 className="font-serif text-2xl font-bold tracking-tight mt-0.5">
                Archival Framing Certificate &amp; Technical Schedule
              </h1>
              <p className="text-xs text-[var(--color-ink-muted)] mt-1">
                Precision Handcrafted Joinery &amp; Conservation Glazing Specification
              </p>
            </div>
            <div className="sm:text-right font-mono text-xs text-[var(--color-ink-muted)] space-y-0.5">
              <div>Document ID: <strong className="text-[var(--color-ink-primary)]">{specNumber}</strong></div>
              <div>Date: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</div>
              <div>Valuation: <strong className="text-accent text-sm font-serif">₹{totalPrice}</strong></div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Moulding Profile */}
            <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                1. Moulding Profile
              </span>
              <h3 className="font-semibold text-sm">{moulding.name}</h3>
              <p className="text-xs text-[var(--color-ink-secondary)]">{moulding.description}</p>
              <div className="pt-2 text-[11px] font-mono text-[var(--color-ink-muted)] border-t border-[var(--color-border-subtle)] space-y-0.5">
                <div>Material: {moulding.material}</div>
                <div>Face Profile: {moulding.dimensions}</div>
                <div>Joinery: Internal biscuit &amp; exposed Japanese hardwood splines</div>
              </div>
            </div>

            {/* Matting Specification */}
            <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                2. Museum Matboard
              </span>
              <h3 className="font-semibold text-sm">
                {mat.name} {mat.id !== "none" ? `• ${matColor.name}` : ""}
              </h3>
              <p className="text-xs text-[var(--color-ink-secondary)]">
                {mat.id === "none"
                  ? "Artwork mounted edge-to-edge with archival spacers."
                  : matColor.description}
              </p>
              <div className="pt-2 text-[11px] font-mono text-[var(--color-ink-muted)] border-t border-[var(--color-border-subtle)] space-y-0.5">
                <div>Margin Width: {mat.widthInches} ({mat.widthPx}px atelier scale)</div>
                <div>Substrate: 100% Alpha-Cellulose 4-Ply Cotton Rag</div>
                <div>Bevel Cut: Precision 45-degree hand-calibrated diamond wheel</div>
              </div>
            </div>

            {/* Conservation Glazing */}
            <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                3. Conservation Glazing
              </span>
              <h3 className="font-semibold text-sm">{glazing.name}</h3>
              <p className="text-xs text-[var(--color-ink-secondary)]">{glazing.description}</p>
              <div className="pt-2 text-[11px] font-mono text-[var(--color-ink-muted)] border-t border-[var(--color-border-subtle)] space-y-0.5">
                <div>UV Shielding: {glazing.uvProtection}</div>
                <div>Optical Reflection: {glazing.reflection}</div>
                <div>Glass Spec: {glazing.spec}</div>
              </div>
            </div>

            {/* Dimension & Aspect Proportions */}
            <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                4. Dimensions &amp; Geometry
              </span>
              <h3 className="font-semibold text-sm">
                {size.label} ({widthInches}″ × {heightInches}″)
              </h3>
              <p className="text-xs text-[var(--color-ink-secondary)]">
                Metric Aperture: {widthMm} mm × {heightMm} mm
              </p>
              <div className="pt-2 text-[11px] font-mono text-[var(--color-ink-muted)] border-t border-[var(--color-border-subtle)] space-y-0.5">
                <div>Aspect Ratio: {size.aspectRatio}</div>
                <div>Backing: Acid-free 3mm archival foam-core barrier</div>
                <div>Hanging: Pre-installed heavy gauge braided brass hanging wire</div>
              </div>
            </div>
          </div>

          {/* Artwork Attribution */}
          <div className="p-4 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)]/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-muted)]">
                Subject Artwork:
              </span>
              <h4 className="font-semibold text-sm">
                {artworkType === "upload"
                  ? uploadedImageName || "Client Fine Art Upload"
                  : `${preset.title} (${preset.artist})`}
              </h4>
              <p className="text-xs text-[var(--color-ink-muted)]">
                {artworkType === "upload"
                  ? "Archival pigment print verified to client supplied digital asset"
                  : preset.medium}
              </p>
            </div>
            <Award className="w-8 h-8 text-accent opacity-80 shrink-0" />
          </div>

          {/* Guarantee Footer */}
          <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--color-ink-muted)]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-accent" />
              <span>Certified 100-Year Archival Museum Standards (ISO 18916)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Crafted in atelier with lifetime miter warranty</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]">
          <button
            type="button"
            onClick={onClose}
            data-testid="close-spec-footer-btn"
            className="px-4 py-2 rounded-lg text-xs font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Specification</span>
          </button>
        </div>
      </div>
    </div>
  );
}
