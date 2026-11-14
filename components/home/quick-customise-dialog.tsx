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

  return (
    <Dialog.Content
      data-testid="quick-customise-dialog"
      className={cn(
        "relative w-full max-w-3xl rounded-2xl bg-[#242424] border border-[#333333] shadow-2xl p-6 sm:p-8 md:p-10",
        "text-[#F4F1EA] overflow-hidden my-auto",
        "transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      )}
    >
      {/* Top decorative badge & close button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#333333]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A2A2A] border border-[#333333] text-xs font-semibold text-[#F4F1EA] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Quick Atelier Customiser</span>
        </div>
        <Dialog.Close
          data-testid="dialog-close-button"
          aria-label="Close dialog"
          className="rounded-full p-2 text-[#9E9E9E] hover:text-[#F4F1EA] hover:bg-[#333333] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </Dialog.Close>
      </div>

      {/* Header info */}
      <div className="mt-4">
        <Dialog.Title
          data-testid="dialog-title"
          className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F1EA]"
        >
          {product.name}
        </Dialog.Title>
        <Dialog.Description
          data-testid="dialog-description"
          className="text-xs sm:text-sm text-[#9E9E9E] mt-1"
        >
          {product.material} • Custom-milled to the millimeter with 99% UV conservation glazing.
        </Dialog.Description>
      </div>

      {/* Main Interactive Grid: Live Frame Preview & Customization Selectors */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Column: Live Frame Mockup Stage */}
        <div
          data-testid="dialog-frame-preview"
          className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-[#1A1A1A] border border-[#333333] relative overflow-hidden"
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
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
                        ? "border-[#C5A059] bg-[#2A2A2A] ring-2 ring-[#C5A059]/40 shadow-xs text-[#F4F1EA]"
                        : "border-[#333333] bg-[#2A2A2A] hover:bg-[#333333] hover:border-[#C5A059]/50 text-[#E0E0E0]"
                    )}
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#F4F1EA]">
                        {size.label}
                      </p>
                      <p className="text-[11px] text-[#9E9E9E]">
                        {size.id === "8x10" ? "Standard" : `+$${size.priceDelta}`}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#C5A059] text-[#1A1A1A] flex items-center justify-center">
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
                className="text-xs font-semibold uppercase tracking-wider text-[#F4F1EA]"
              >
                2. Archival Mat Style
              </label>
              <span className="text-xs text-[#9E9E9E]">
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
                        ? "border-[#C5A059] bg-[#2A2A2A] ring-2 ring-[#C5A059]/40 shadow-xs text-[#F4F1EA]"
                        : "border-[#333333] bg-[#2A2A2A] hover:bg-[#333333] hover:border-[#C5A059]/50 text-[#E0E0E0]"
                    )}
                  >
                    <span className="text-xs font-semibold text-[#F4F1EA]">
                      {mat.name.split(" ")[0]} {mat.name.split(" ")[1] || ""}
                    </span>
                    <span className="text-[11px] text-[#9E9E9E] mt-0.5">
                      {mat.price === 0 ? "Included" : `+$${mat.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & CTA Summary */}
          <div className="mt-6 pt-4 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#9E9E9E] block">
                Calculated Atelier Total
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  data-testid="dialog-total-price"
                  className="font-serif text-3xl font-bold text-[#C5A059]"
                >
                  ${calculatedPrice}
                </span>
                <span className="text-xs text-[#9E9E9E]">
                  (Base ${product.startingPrice}
                  {selectedSize.priceDelta > 0 && ` + Size $${selectedSize.priceDelta}`}
                  {currentMat.price > 0 && ` + Mat $${currentMat.price}`})
                </span>
              </div>
            </div>

            <a
              href={`/customise?moulding=${product.mouldingId}&size=${selectedSizeId}&mat=${selectedMatId}`}
              data-testid="dialog-cta-button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C5A059] hover:bg-[#B38F48] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md group cursor-pointer"
            >
              <span>Proceed to Full Customiser</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </Dialog.Content>
  );
}
