"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowRight, Check, Sparkles, ShieldCheck } from "lucide-react";
import {
  CuratedFrameProduct,
  FRAME_SIZE_OPTIONS,
  SizeOption,
} from "@/lib/constants/collections";
import {
  MOULDINGS,
  MAT_OPTIONS,
  MAT_OPTION_LIST,
  MatId,
} from "@/lib/constants/frames";
import { FrameArtwork } from "./frame-artworks";
import { cn } from "@/lib/utils";
import { createWhatsAppCustomizerUrl } from "@/lib/constants/whatsapp";

interface QuickCustomiseDialogProps {
  product: CuratedFrameProduct | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickCustomiseDialog({
  product,
  isOpen,
  onOpenChange,
}: QuickCustomiseDialogProps) {
  if (!product) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          data-testid="dialog-overlay"
          className="fixed inset-0 z-50 bg-[#1D1D1F]/60 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <QuickCustomiseContent key={product.id} product={product} />
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function QuickCustomiseContent({ product }: { product: CuratedFrameProduct }) {
  const [selectedSizeId, setSelectedSizeId] = useState<SizeOption["id"]>("8x10");
  const [selectedMatId, setSelectedMatId] = useState<MatId>(
    product.defaultMatId || "classic"
  );

  const currentMoulding = MOULDINGS[product.mouldingId] || MOULDINGS.walnut;
  const currentMat = MAT_OPTIONS[selectedMatId] || MAT_OPTIONS.classic;
  const selectedSize =
    FRAME_SIZE_OPTIONS.find((s) => s.id === selectedSizeId) ||
    FRAME_SIZE_OPTIONS[0];

  const calculatedPrice =
    product.startingPrice + selectedSize.priceDelta + currentMat.price;

  const whatsAppUrl = createWhatsAppCustomizerUrl({
    mouldingName: currentMoulding.name,
    matName: currentMat.name,
    matColor: "Off-White",
    glazingName: "Tru Vue® UV-Shield Acrylic",
    size: `${selectedSize.label} (${selectedSize.dimensions})`,
    artworkName: product.name,
    price: calculatedPrice,
  });

  return (
    <Dialog.Content
      data-testid="quick-customise-dialog"
      className={cn(
        "relative w-full max-w-3xl rounded-2xl bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] shadow-2xl p-6 sm:p-8 md:p-10",
        "text-[var(--color-ink-primary)] overflow-hidden my-auto",
        "transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      )}
    >
      {/* Top decorative badge & close button */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] text-xs font-semibold text-[var(--color-ink-primary)] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Quick Atelier Customiser</span>
        </div>
        <Dialog.Close
          data-testid="dialog-close-btn"
          aria-label="Close dialog"
          className="rounded-full p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] transition-colors cursor-pointer"
        >
          <span data-testid="dialog-close-button" className="flex items-center justify-center">
            <X className="w-5 h-5" />
          </span>
        </Dialog.Close>
      </div>

      {/* Header info */}
      <div className="mt-4">
        <Dialog.Title
          data-testid="dialog-product-title"
          className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink-primary)]"
        >
          <span data-testid="dialog-title">{product.name}</span>
        </Dialog.Title>
        <Dialog.Description
          data-testid="dialog-description"
          className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1"
        >
          {product.material} • Custom-milled to the millimeter with 99% UV conservation glazing.
        </Dialog.Description>
      </div>

      {/* Main Interactive Grid: Live Frame Preview & Customization Selectors */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Column: Live Frame Mockup Stage */}
        <div
          data-testid="dialog-frame-preview"
          className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--color-canvas-base)] border border-[var(--color-border-subtle)] relative overflow-hidden"
        >
          {/* Frame Outer Moulding */}
          <div
            style={{
              background: currentMoulding.frameGradient,
              borderColor: currentMoulding.borderColor,
              boxShadow: "var(--shadow-frame-resting)",
            }}
            className="relative p-3.5 rounded-xs border border-t-[rgba(255,255,255,0.3)] border-b-[rgba(0,0,0,0.35)] transition-all duration-300 transform"
          >
            {/* Inner lip */}
            <div
              style={{ borderColor: currentMoulding.innerLipColor }}
              className="border border-black/30 p-0.5 rounded-xs"
            >
              {/* Mat layer */}
              <div
                style={{
                  padding:
                    selectedMatId === "none"
                      ? "0px"
                      : selectedMatId === "classic"
                      ? "14px"
                      : "22px",
                  backgroundColor: "#F4F1EA",
                }}
                className={cn(
                  "transition-all duration-300",
                  selectedMatId !== "none" &&
                    "border border-[#E0DCD3] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
                )}
              >
                {/* Artwork window */}
                <div
                  style={{
                    boxShadow:
                      selectedMatId !== "none"
                        ? "var(--shadow-frame-inner-mat)"
                        : "inset 0 1px 3px rgba(0,0,0,0.25)",
                  }}
                  className={cn(
                    "w-36 h-44 sm:w-40 sm:h-48 overflow-hidden bg-[#FAF6EE] relative transition-all duration-300",
                    selectedSize.aspectClass
                  )}
                >
                  <FrameArtwork type={product.artworkType} />
                  {/* Conservation Glass Sheen */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Subtext info under mockup */}
          <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-[#9E9E9E]">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Tru Vue® UV-Shield Acrylic Included</span>
          </div>
        </div>

        {/* Right Column: Configuration Options */}
        <div className="md:col-span-7 space-y-5">
          {/* 1. Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                id="size-selector-label"
                className="text-xs font-semibold uppercase tracking-wider text-[#F4F1EA]"
              >
                1. Standard Dimensions
              </label>
              <span className="text-xs text-[#9E9E9E]">
                {selectedSize.dimensions}
              </span>
            </div>

            <div
              role="radiogroup"
              aria-labelledby="size-selector-label"
              className="grid grid-cols-2 gap-2.5"
            >
              {FRAME_SIZE_OPTIONS.map((size) => {
                const isSelected = size.id === selectedSizeId;
                return (
                  <button
                    key={size.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    data-testid={`dialog-size-option-${size.id}`}
                    onClick={() => setSelectedSizeId(size.id)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-accent bg-accent-light/40 ring-2 ring-accent/30 shadow-xs text-accent font-semibold"
                        : "border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/60 hover:bg-[var(--color-canvas-subtle)] hover:border-accent/50 text-[var(--color-ink-secondary)]"
                    )}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-ink-primary)]">
                        {size.label}
                      </p>
                      <p className="text-[11px] text-[var(--color-ink-muted)]">
                        {size.id === "8x10" ? "Standard" : `+₹${size.priceDelta.toLocaleString("en-IN")}`}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Mat Style Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                id="mat-selector-label"
                className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-primary)]"
              >
                2. Archival Mat Style
              </label>
              <span className="text-xs text-[var(--color-ink-muted)]">
                {currentMat.widthInches}
              </span>
            </div>

            <div
              role="radiogroup"
              aria-labelledby="mat-selector-label"
              className="grid grid-cols-3 gap-2"
            >
              {MAT_OPTION_LIST.map((mat) => {
                const isSelected = mat.id === selectedMatId;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    data-testid={`dialog-mat-option-${mat.id}`}
                    onClick={() => setSelectedMatId(mat.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-accent bg-accent-light/40 ring-2 ring-accent/30 shadow-xs text-accent font-semibold"
                        : "border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/60 hover:bg-[var(--color-canvas-subtle)] hover:border-accent/50 text-[var(--color-ink-secondary)]"
                    )}
                  >
                    <span className="text-xs font-semibold text-[var(--color-ink-primary)]">
                      {mat.name.split(" ")[0]} {mat.name.split(" ")[1] || ""}
                    </span>
                    <span className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">
                      {mat.price === 0 ? "Included" : `+₹${mat.price.toLocaleString("en-IN")}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & CTA Summary */}
          <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] block">
                Calculated Atelier Total
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  data-testid="dialog-dynamic-price"
                  className="font-serif text-3xl font-bold text-accent"
                >
                  <span data-testid="dialog-total-price">₹{calculatedPrice.toLocaleString("en-IN")}</span>
                </span>
                <span className="text-xs text-[#9E9E9E]">
                  (Base ₹{product.startingPrice.toLocaleString("en-IN")}
                  {selectedSize.priceDelta > 0 && ` + Size ₹${selectedSize.priceDelta.toLocaleString("en-IN")}`}
                  {currentMat.price > 0 && ` + Mat ₹${currentMat.price.toLocaleString("en-IN")}`})
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="dialog-whatsapp-order-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-[#0A2612] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer group"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
                </svg>
                <span>Order via WhatsApp</span>
              </a>

              <a
                href={`/customise?moulding=${product.mouldingId}&size=${selectedSizeId}&mat=${selectedMatId}`}
                data-testid="dialog-cta-button"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-accent/20 group cursor-pointer"
              >
                <span>Proceed to Full Customiser</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Dialog.Content>
  );
}
