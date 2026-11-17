"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  MOULDINGS,
  MOULDING_LIST,
  MAT_OPTIONS,
  MAT_OPTION_LIST,
  type MouldingId,
  type MatId,
} from "@/lib/constants/frames";
import {
  GLAZING_OPTIONS,
  GLAZING_OPTION_LIST,
  MAT_COLORS,
  MAT_COLOR_LIST,
  SIZE_OPTIONS,
  SIZE_OPTION_LIST,
  ARTWORK_PRESET_LIST,
  type GlazingId,
  type MatColorId,
  type SizeId,
  type ArtworkPresetId,
  type CustomizerStep,
  calculateCustomizerPrice,
  calculateDpi,
} from "@/lib/constants/customizer";
import { useStorefront, CartItem, WishlistItem } from "@/lib/store/storefront-context";
import { cn } from "@/lib/utils";
import {
  UploadCloud,
  Check,
  ShieldCheck,
  ShoppingBag,
  Heart,
  FileText,
  Briefcase,
  Maximize2,
  X,
  CheckCircle2,
} from "lucide-react";

interface CustomizerControlsProps {
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
  currentStep: CustomizerStep;
  onSelectMoulding: (id: MouldingId) => void;
  onSelectMat: (id: MatId) => void;
  onSelectMatColor: (id: MatColorId) => void;
  onSelectGlazing: (id: GlazingId) => void;
  onSelectSize: (id: SizeId) => void;
  onChangeCustomDimensions: (w: number, h: number) => void;
  onSelectPresetArtwork: (id: ArtworkPresetId) => void;
  onImageUploaded: (url: string, name: string, w: number, h: number) => void;
  onClearUploadedImage: () => void;
  onStepChange: (step: CustomizerStep) => void;
  onOpenSpecSheet: () => void;
}

export function CustomizerControls({
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
  currentStep,
  onSelectMoulding,
  onSelectMat,
  onSelectMatColor,
  onSelectGlazing,
  onSelectSize,
  onChangeCustomDimensions,
  onSelectPresetArtwork,
  onImageUploaded,
  onClearUploadedImage,
  onStepChange,
  onOpenSpecSheet,
}: CustomizerControlsProps) {
  const { addToCart, addToWishlist } = useStorefront();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pricing calculation
  const pricing = calculateCustomizerPrice({
    mouldingId,
    matId,
    glazingId,
    sizeId,
    customWidth,
    customHeight,
  });

  const currentMoulding = MOULDINGS[mouldingId] || MOULDINGS.walnut;
  const currentMat = MAT_OPTIONS[matId] || MAT_OPTIONS.classic;
  const currentMatColor = MAT_COLORS[matColorId] || MAT_COLORS["off-white"];
  const currentGlazing = GLAZING_OPTIONS[glazingId] || GLAZING_OPTIONS["conservation-clear"];
  const currentSize = SIZE_OPTIONS[sizeId] || SIZE_OPTIONS["8x10"];

  const effectiveWidth = sizeId === "custom" ? customWidth : currentSize.widthInches;
  const effectiveHeight = sizeId === "custom" ? customHeight : currentSize.heightInches;

  const dpiInfo = calculateDpi(
    uploadedImageWidth,
    uploadedImageHeight,
    effectiveWidth,
    effectiveHeight
  );

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onImageUploaded(result, file.name, img.naturalWidth, img.naturalHeight);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onImageUploaded(result, file.name, img.naturalWidth, img.naturalHeight);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const cartPayload: Omit<CartItem, "id"> = {
      title: `${currentMoulding.name} Bespoke Frame`,
      category: "Bespoke Framing",
      dimensions: `${currentSize.label} (${effectiveWidth}″ × ${effectiveHeight}″)`,
      specs: `${currentMoulding.material} • ${currentMat.name}${
        currentMat.id !== "none" ? ` (${currentMatColor.name})` : ""
      } • ${currentGlazing.name}`,
      unitPrice: pricing.total,
      quantity: 1,
      vertical: "bespoke-framing",
    };

    addToCart(cartPayload);
    setToastMessage(`Added "${currentMoulding.name} Bespoke Frame" to cart (₹${pricing.total})`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Add to wishlist handler
  const handleAddToWishlist = () => {
    const wishPayload: WishlistItem = {
      id: `fc-custom-${Date.now()}`,
      title: `${currentMoulding.name} Bespoke Frame`,
      category: "Bespoke Framing",
      vertical: "bespoke-framing",
      dimensions: `${currentSize.label} (${effectiveWidth}″ × ${effectiveHeight}″)`,
      material: `${currentMoulding.material} • ${currentMat.name} (${currentMatColor.name})`,
      glazing: currentGlazing.name,
      price: pricing.total,
      aspectGuide: `${currentSize.label} • Bespoke Atelier Custom Frame`,
      svgType: "frame",
    };

    addToWishlist(wishPayload);
    setIsWishlisted(true);
    setToastMessage(`Saved "${currentMoulding.name} Bespoke Frame" to Wishlist`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const rfqUrl = `/rfq?source=customizer&specs=${encodeURIComponent(
    `${currentMoulding.id}-${currentMat.id}-${currentSize.id}-${currentGlazing.id}`
  )}`;

  return (
    <div
      data-testid="customizer-controls-panel"
      className="flex flex-col w-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          data-testid="customizer-cart-toast"
          role="status"
          aria-live="polite"
          className="flex items-center justify-between px-5 py-3 bg-accent text-[var(--color-accent-contrast)] font-medium text-xs sm:text-sm animate-in fade-in slide-in-from-top duration-300 z-30"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 rounded hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Quick Jump Ribbon */}
      <div className="sticky top-0 z-20 bg-[var(--color-canvas-subtle)] border-b border-[var(--color-border-subtle)] px-4 py-2.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-1.5 min-w-max text-xs">
          <button
            type="button"
            data-testid="customizer-step-moulding"
            onClick={() => {
              onStepChange("moulding");
              scrollToSection("section-moulding");
            }}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer",
              currentStep === "moulding"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            1. Moulding
          </button>
          <span className="text-[var(--color-border-strong)]">•</span>
          <button
            type="button"
            data-testid="customizer-step-mat"
            onClick={() => {
              onStepChange("mat");
              scrollToSection("section-mat");
            }}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer",
              currentStep === "mat"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            2. Matting
          </button>
          <span className="text-[var(--color-border-strong)]">•</span>
          <button
            type="button"
            data-testid="customizer-step-size"
            onClick={() => {
              onStepChange("size");
              scrollToSection("section-size");
            }}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer",
              currentStep === "size"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            3. Size
          </button>
          <span className="text-[var(--color-border-strong)]">•</span>
          <button
            type="button"
            data-testid="customizer-step-glazing"
            onClick={() => {
              onStepChange("glazing");
              scrollToSection("section-glazing");
            }}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer",
              currentStep === "glazing"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            4. Glazing
          </button>
          <span className="text-[var(--color-border-strong)]">•</span>
          <button
            type="button"
            data-testid="customizer-step-artwork"
            onClick={() => {
              onStepChange("artwork");
              scrollToSection("section-artwork");
            }}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer",
              currentStep === "artwork"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            5. Artwork
          </button>
        </div>
      </div>

      {/* Stacked Interactive Configuration Panels */}
      <div className="p-5 sm:p-7 space-y-8 divide-y divide-[var(--color-border-subtle)]">
        {/* Section 1: Solid Hardwood Moulding Profile */}
        <section id="section-moulding" className="space-y-3.5 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                1. Solid Hardwood Moulding Profile
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Precision-milled sustainable American hardwoods with hand-finished oil &amp; leaf.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--color-ink-muted)]">
              {currentMoulding.dimensions}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label="Moulding profiles"
            data-testid="moulding-picker"
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
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
                  onClick={() => onSelectMoulding(m.id)}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative group",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-md ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ background: m.swatchGradient }}
                      className={cn(
                        "block w-8 h-8 rounded-full shadow-xs border border-black/20 shrink-0 transition-transform group-hover:scale-105",
                        isSelected && "ring-2 ring-offset-2 ring-accent"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[var(--color-ink-primary)] truncate">
                          {m.name.split(" ")[0]} {m.name.split(" ")[1] || ""}
                        </h4>
                        {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                      </div>
                      <span className="text-[11px] font-serif font-bold text-accent">
                        ₹{m.basePrice}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[var(--color-ink-muted)] mt-1.5 line-clamp-1">
                    {m.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Archival Matting Margin & Tone */}
        <section id="section-mat" className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                2. Archival Matting Margin &amp; Museum Tone
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                100% Alpha-cellulose 4-ply cotton rag with 45-degree beveled cut line.
              </p>
            </div>
          </div>

          {/* Margins */}
          <div
            role="radiogroup"
            aria-label="Mat margin width"
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
                  onClick={() => onSelectMat(mat.id)}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-xs ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-ink-primary)]">
                      {mat.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                  </div>
                  <span className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">
                    {mat.widthInches}
                  </span>
                  <span className="font-serif text-xs font-bold text-accent mt-2">
                    {mat.price === 0 ? "Included" : `+₹${mat.price}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mat Color Options (Active if Mat is not 'none') */}
          {matId !== "none" && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]">
                Archival Mat Tone:
              </span>
              <div
                role="radiogroup"
                aria-label="Matboard colors"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
              >
                {MAT_COLOR_LIST.map((c) => {
                  const isSelected = c.id === matColorId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      data-testid={`mat-color-${c.id}`}
                      onClick={() => onSelectMatColor(c.id)}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border text-left transition-all duration-200 cursor-pointer",
                        isSelected
                          ? "border-accent bg-accent-light/30 ring-1 ring-accent"
                          : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40"
                      )}
                    >
                      <span
                        style={{ backgroundColor: c.hex, borderColor: c.borderColor }}
                        className="w-5 h-5 rounded-full border shadow-2xs shrink-0"
                      />
                      <span className="text-[11px] font-medium text-[var(--color-ink-primary)] truncate">
                        {c.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Frame Dimensions & Aperture */}
        <section id="section-size" className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                3. Frame Dimensions &amp; Geometry
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Standard gallery formats or millimeter-cut custom sizes.
              </p>
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Frame dimensions"
            data-testid="size-picker"
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
          >
            {SIZE_OPTION_LIST.map((s) => {
              const isSelected = s.id === sizeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`size-option-${s.id}`}
                  onClick={() => onSelectSize(s.id)}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-xs ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  {s.popular && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded text-[8px] font-mono uppercase bg-accent text-[var(--color-accent-contrast)] font-bold">
                      Standard
                    </span>
                  )}
                  <span className="text-xs font-bold text-[var(--color-ink-primary)]">
                    {s.label}
                  </span>
                  <span className="text-[10px] text-[var(--color-ink-muted)] font-mono mt-0.5">
                    {s.dimensions}
                  </span>
                  <div className="pt-1.5 mt-1.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--color-ink-muted)]">{s.aspectRatio}</span>
                    <span className="font-serif font-bold text-accent">
                      {s.id === "custom"
                        ? "Scale"
                        : s.priceDelta === 0
                        ? "Base"
                        : `+₹${s.priceDelta}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Dimension Box */}
          {sizeId === "custom" && (
            <div className="p-3.5 rounded-xl border border-dashed border-accent/80 bg-accent-light/10 space-y-2.5">
              <div className="flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-wider">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Custom Aperture Builder (Inches)</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[var(--color-ink-secondary)] mb-1">
                    Width (in):
                  </label>
                  <input
                    type="number"
                    min={6}
                    max={60}
                    step={0.5}
                    value={customWidth}
                    onChange={(e) =>
                      onChangeCustomDimensions(
                        Math.max(6, Math.min(60, parseFloat(e.target.value) || 6)),
                        customHeight
                      )
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[var(--color-ink-secondary)] mb-1">
                    Height (in):
                  </label>
                  <input
                    type="number"
                    min={6}
                    max={72}
                    step={0.5}
                    value={customHeight}
                    onChange={(e) =>
                      onChangeCustomDimensions(
                        customWidth,
                        Math.max(6, Math.min(72, parseFloat(e.target.value) || 6))
                      )
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-primary)]"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-ink-muted)] font-mono">
                Metric: {Math.round(customWidth * 25.4)} × {Math.round(customHeight * 25.4)} mm • Proportional scale: +₹{pricing.sizePrice}
              </p>
            </div>
          )}
        </section>

        {/* Section 4: Conservation Glazing */}
        <section id="section-glazing" className="space-y-3.5 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                4. Conservation Glazing Selection
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Every frame includes 99% UV-protective museum optics.
              </p>
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Conservation glazing"
            data-testid="glazing-picker"
            className="space-y-2.5"
          >
            {GLAZING_OPTION_LIST.map((g) => {
              const isSelected = g.id === glazingId;
              return (
                <button
                  key={g.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`glazing-option-${g.id}`}
                  onClick={() => onSelectGlazing(g.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer gap-3",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-xs ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--color-ink-primary)]">
                        {g.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                    </div>
                    <p className="text-[11px] text-[var(--color-ink-secondary)]">
                      {g.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-accent pt-1">
                      <span>{g.uvProtection}</span>
                      <span>•</span>
                      <span>{g.reflection}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-sm font-bold text-accent">
                      {g.price === 0 ? "Included" : `+₹${g.price}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 5: Fine Art & Archival Upload Dropzone */}
        <section id="section-artwork" className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                5. Artwork &amp; Fine Art Upload Dropzone
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Drag and drop your fine art file or select a museum archival specimen.
              </p>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            data-testid="customizer-upload-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer group",
              uploadedImageUrl
                ? "border-accent bg-accent-light/20"
                : "border-[var(--color-border-strong)] hover:border-accent bg-[var(--color-canvas-subtle)]/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              data-testid="customizer-file-input"
              accept="image/*,.png,.jpg,.jpeg,.webp,.tiff"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploadedImageUrl ? (
              <div className="flex items-center gap-3 w-full text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded thumbnail"
                  className="w-12 h-12 object-contain rounded border border-[var(--color-border-subtle)] bg-black/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-xs truncate">
                      {uploadedImageName || "Client Fine Art Upload"}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-ink-muted)] mt-0.5">
                    {uploadedImageWidth}×{uploadedImageHeight} px • <span className="text-accent font-semibold">{dpiInfo.badgeText}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearUploadedImage();
                  }}
                  className="p-1 rounded text-[var(--color-ink-muted)] hover:text-rose-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-accent mb-1.5 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-[var(--color-ink-primary)]">
                  Click or Drag &amp; Drop Fine Art File Here
                </span>
                <span className="text-[10px] text-[var(--color-ink-muted)] mt-0.5">
                  High-res PNG, JPG, WebP, or TIFF up to 50MB
                </span>
              </>
            )}
          </div>

          {/* Curated Presets */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]">
              Or Choose Curated Atelier Preset:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {ARTWORK_PRESET_LIST.map((p) => {
                const isSelected = artworkType === "preset" && presetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    data-testid={`artwork-preset-${p.id}`}
                    onClick={() => onSelectPresetArtwork(p.id)}
                    className={cn(
                      "flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-accent bg-accent-light/30 ring-1 ring-accent"
                        : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40"
                    )}
                  >
                    <div
                      style={{ backgroundColor: p.accentColor }}
                      className="w-7 h-7 rounded text-white text-[11px] font-serif font-bold flex items-center justify-center shrink-0"
                    >
                      {p.title.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-[var(--color-ink-primary)] truncate">
                        {p.title}
                      </span>
                      <span className="block text-[10px] text-[var(--color-ink-muted)] truncate">
                        {p.artist}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Action & Pricing Deck */}
      <div className="p-5 sm:p-6 bg-[var(--color-canvas-subtle)] border-t border-[var(--color-border-subtle)] space-y-4">
        {/* Itemized Price Summary */}
        <div
          data-testid="customizer-price-breakdown"
          className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
        >
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)] font-mono">
              Itemized Atelier Total:
            </span>
            <div className="flex items-baseline gap-2">
              <span
                data-testid="customizer-total-price"
                className="font-serif text-2xl sm:text-3xl font-bold text-accent"
              >
                ₹{pricing.total}
              </span>
              <span data-testid="frame-price-amount" className="sr-only">
                ₹{pricing.total}
              </span>
              <span className="text-xs text-[var(--color-ink-muted)] font-mono">
                (Moulding ₹{pricing.mouldingPrice} + Mat ₹{pricing.matPrice} + Glazing ₹{pricing.glazingPrice} + Size ₹{pricing.sizePrice})
              </span>
            </div>
          </div>

          <button
            type="button"
            data-testid="customizer-spec-sheet"
            onClick={onOpenSpecSheet}
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold cursor-pointer shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Archival Spec Sheet</span>
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            data-testid="customizer-add-to-cart"
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md shadow-accent/20 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Frame to Cart (₹{pricing.total})</span>
          </button>

          <button
            type="button"
            data-testid="customizer-add-to-wishlist"
            onClick={handleAddToWishlist}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs sm:text-sm font-medium transition-colors cursor-pointer",
              isWishlisted
                ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                : "border-[var(--color-border-strong)] hover:border-accent bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)]"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-rose-500 text-rose-500")} />
            <span>{isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}</span>
          </button>
        </div>

        {/* B2B / RFP Link */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[var(--color-ink-muted)]">
          <Link
            href={rfqUrl}
            data-testid="customizer-rfp-link"
            className="inline-flex items-center gap-1 text-accent hover:underline font-mono"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Request Enterprise / Tender RFQ for Multiple Frames →</span>
          </Link>
          <div className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Archival Framing Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
