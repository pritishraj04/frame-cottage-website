"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sliders, Eye, UploadCloud, ImageIcon } from "lucide-react";
import { CuratedFrameProduct } from "@/lib/constants/collections";
import { MOULDINGS } from "@/lib/constants/frames";
import { FrameArtwork } from "./frame-artworks";
import { cn } from "@/lib/utils";

interface FrameCardProps {
  product: CuratedFrameProduct;
  onQuickCustomise: (product: CuratedFrameProduct) => void;
}

export function FrameCard({ product, onQuickCustomise }: FrameCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const currentMoulding = MOULDINGS[product.mouldingId] || MOULDINGS.walnut;

  return (
    <motion.article
      data-testid={`frame-card-${product.id}`}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
      className="group relative flex flex-col bg-[var(--color-canvas-surface)] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent/60"
    >
      {/* Visual Presentation Container (Dual-State Swapper: Studio Rest -> In-Situ Room) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-canvas-subtle)] select-none">
        {/* =========================================================================
            STATE 1: DEFAULT REST STATE (Crisp studio frame cutout on museum canvas)
           ========================================================================= */}
        <div
          data-testid={`frame-card-rest-${product.id}`}
          className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-b from-[#242424] via-[#202020] to-[#1A1A1A] transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        >
          {/* Spatial PNG Asset Zone Tag */}
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)]/80 text-accent backdrop-blur-xs">
            <span>4:5 Asset Zone</span>
          </div>
          {/* Subtle Studio Architectural Background Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:20px_20px]"
          />

          {/* Studio Radial Ambient Highlight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_75%)]"
          />

          {/* Studio Frame Cutout */}
          <div
            style={{
              background: currentMoulding.frameGradient,
              borderColor: currentMoulding.borderColor,
              boxShadow: "var(--shadow-frame-resting)",
            }}
            className="relative w-44 h-56 sm:w-48 sm:h-60 p-3.5 rounded-xs border border-t-[rgba(255,255,255,0.35)] border-b-[rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-95"
          >
            {/* Moulding Inner Lip Miter Detail */}
            <div
              style={{ borderColor: currentMoulding.innerLipColor }}
              className="w-full h-full border border-black/30 p-0.5 rounded-xs"
            >
              {/* Archival Mat Board (Soft Ivory #F4F1EA) */}
              <div
                style={{
                  padding: product.defaultMatId === "gallery" ? "14px" : "10px",
                  backgroundColor: "#F4F1EA",
                }}
                className="w-full h-full relative border border-[#E0DACE] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
              >
                {/* Artwork Window with Inner Mat Bevel Shadow: Project PNG Drop Zone */}
                <div
                  data-testid={`project-png-dropzone-${product.id}`}
                  style={{
                    boxShadow: "var(--shadow-frame-inner-mat)",
                  }}
                  className="w-full h-full relative overflow-hidden bg-[#FAF6EE] flex flex-col items-center justify-center p-2 text-center"
                >
                  <div className="w-full h-full rounded-lg border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-base)]/60 flex flex-col items-center justify-center text-center p-2 group-hover:border-accent group-hover:bg-accent-light/50 transition-all duration-300">
                    <div className="w-6 h-6 rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-accent mb-1 shadow-2xs">
                      <UploadCloud className="w-3.5 h-3.5 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-ink-primary)] leading-tight">
                      Project PNG Drop Zone (800×600)
                    </span>
                    <p className="text-[8.5px] text-[var(--color-ink-muted)] mt-0.5 line-clamp-2 max-w-[140px] leading-tight">
                      Designer to place project photo or transparent frame render here
                    </p>
                    <div className="mt-1 px-1.5 py-0.2 rounded-full border border-dashed border-[var(--color-border-strong)] text-[8px] font-mono text-accent bg-[var(--color-canvas-surface)]/80">
                      4:3 • Format: PNG
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Craft Badge Pill (Rest State subtle indicator) */}
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-[var(--color-canvas-surface)]/90 text-[var(--color-ink-muted)] border border-[var(--color-border-subtle)] shadow-2xs backdrop-blur-xs">
            <span>{currentMoulding.dimensions.split(" ")[0]} Moulding</span>
          </div>
        </div>

        {/* =========================================================================
            STATE 2: HOVER STATE (Styled living room in-situ photograph / scene)
           ========================================================================= */}
        <div
          data-testid={`frame-card-insitu-${product.id}`}
          className="absolute inset-0 flex flex-col justify-between overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none group-hover:pointer-events-auto"
          style={{
            backgroundColor: product.roomContext.wallColor,
          }}
        >
          {/* In-Situ Ambient Overhead Gallery Spotlight Beam */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,242,215,0.4)_0%,rgba(0,0,0,0.3)_100%)]"
          />

          {/* Wall Texture Grain */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#FFFFFF_0.75px,transparent_0.75px)] [background-size:16px_16px]"
          />

          {/* Top Bar inside In-Situ: Context Pill */}
          <div className="relative z-10 p-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide bg-[#1D1D1F]/70 text-[#F5F5F7] backdrop-blur-md border border-white/10 shadow-xs">
              <Eye className="w-3 h-3 text-[#B88E56]" />
              <span>{product.roomContext.title}</span>
            </span>
          </div>

          {/* Centered In-Situ Wall Hung Frame */}
          <div className="relative z-10 my-auto flex items-center justify-center px-4">
            <div
              style={{
                background: currentMoulding.frameGradient,
                borderColor: currentMoulding.borderColor,
                boxShadow: "var(--shadow-frame-room)",
              }}
              className="relative w-40 h-52 sm:w-44 sm:h-56 p-3 rounded-xs border border-t-[rgba(255,255,255,0.3)] border-b-[rgba(0,0,0,0.5)] transform scale-100 transition-transform duration-500 group-hover:scale-105"
            >
              <div
                style={{ borderColor: currentMoulding.innerLipColor }}
                className="w-full h-full border border-black/30 p-0.5 rounded-xs"
              >
                <div
                  style={{
                    padding: product.defaultMatId === "gallery" ? "12px" : "8px",
                    backgroundColor: "#FAF8F5",
                  }}
                  className="w-full h-full relative border border-[#EBE4D8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
                >
                  <div
                    style={{
                      boxShadow: "var(--shadow-frame-inner-mat)",
                    }}
                    className="w-full h-full relative overflow-hidden bg-[#FAF6EE] flex flex-col items-center justify-center p-2 text-center"
                  >
                    <div className="w-full h-full rounded-lg border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-base)]/80 flex flex-col items-center justify-center text-center p-2 hover:border-[var(--color-accent-gold)] transition-colors">
                      <div className="w-6 h-6 rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] mb-1">
                        <ImageIcon className="w-3.5 h-3.5 stroke-[1.5]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-ink-primary)] leading-tight">
                        In-Situ Scene PNG Drop Zone (1200×900)
                      </span>
                      <p className="text-[8.5px] text-[var(--color-ink-muted)] mt-0.5 line-clamp-2 max-w-[140px] leading-tight">
                        Designer to place {product.roomContext.title} PNG render here
                      </p>
                      <div className="mt-1 px-1.5 py-0.2 rounded-full border border-dashed border-[var(--color-border-strong)] text-[8px] font-mono text-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)]/80">
                        In Situ • 1200×900
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom In-Situ Room Architectural Anchors */}
          <div className="relative z-10 w-full overflow-hidden">
            {/* Furniture Architecture silhouette at bottom of frame */}
            {product.roomContext.settingType === "credenza" && (
              <div className="relative w-full h-8 flex flex-col justify-end">
                <div
                  style={{ backgroundColor: product.roomContext.furnitureColor }}
                  className="w-full h-6 rounded-t-lg border-t border-white/20 shadow-lg relative"
                >
                  <div className="w-full h-[1px] bg-white/10 mt-1" />
                </div>
              </div>
            )}

            {product.roomContext.settingType === "mantle" && (
              <div className="relative w-full h-8 flex flex-col justify-end">
                <div
                  style={{ backgroundColor: product.roomContext.furnitureColor }}
                  className="w-full h-5 rounded-t-xs border-t-2 border-white/30 shadow-lg"
                />
              </div>
            )}

            {product.roomContext.settingType === "console" && (
              <div className="relative w-full h-8 flex flex-col justify-end">
                <div
                  style={{ backgroundColor: product.roomContext.furnitureColor }}
                  className="w-full h-4 rounded-t-md border-t border-white/20 shadow-md"
                />
              </div>
            )}

            {product.roomContext.settingType === "gallery-shelf" && (
              <div className="relative w-full h-10 flex flex-col justify-end">
                <div className="w-full h-4 bg-[#4A433D] border-t border-white/20 shadow-md" />
              </div>
            )}

            {product.roomContext.settingType === "salon-wall" && (
              <div className="relative w-full h-12 flex flex-col justify-end">
                <div
                  style={{ backgroundColor: product.roomContext.furnitureColor }}
                  className="w-full h-8 rounded-t-2xl border-t border-white/20 shadow-xl relative"
                >
                  <div className="w-full h-[1px] bg-white/10 mt-1" />
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              HOVER OVERLAY ACTION: Quick Customise Floating Button
             ========================================================================= */}
          <div className="absolute inset-x-0 bottom-14 z-20 flex items-center justify-center px-4 pointer-events-auto">
            <motion.button
              type="button"
              data-testid={`quick-customise-btn-${product.id}`}
              whileTap={{ scale: 0.94 }}
              onClick={(e) => {
                e.stopPropagation();
                onQuickCustomise(product);
              }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full",
                "bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)]",
                "text-xs font-semibold uppercase tracking-wider",
                "shadow-xl border border-white/25 backdrop-blur-md",
                "transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                "transition-all duration-300 ease-out cursor-pointer"
              )}
            >
              <Sliders className="w-3.5 h-3.5 text-[var(--color-accent-contrast)]" />
              <span>Quick Customise</span>
            </motion.button>
          </div>
        </div>

        {/* Wishlist Toggle Button (Top-Right Floating Overlay) */}
        <div className="absolute top-3 right-3 z-30">
          <motion.button
            type="button"
            data-testid={`wishlist-btn-${product.id}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            whileTap={{ scale: 0.94 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted((prev) => !prev);
            }}
            className={cn(
              "p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm",
              isWishlisted
                ? "bg-accent text-white scale-105"
                : "bg-[var(--color-canvas-surface)]/90 text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] hover:border-accent"
            )}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-transform",
                isWishlisted && "fill-white stroke-white scale-110"
              )}
            />
          </motion.button>
        </div>
      </div>

      {/* =========================================================================
          METADATA & EDITORIAL PRODUCT DETAILS
         ========================================================================= */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[var(--color-canvas-surface)]">
        <div>
          {/* Frame Name (Serif Title) */}
          <h3
            data-testid={`frame-card-title-${product.id}`}
            className="font-serif text-lg font-normal text-[var(--color-ink-primary)] group-hover:text-accent transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Material Description */}
          <p
            data-testid={`frame-card-material-${product.id}`}
            className="text-xs text-[var(--color-ink-muted)] line-clamp-1 mt-1 font-normal"
          >
            {product.material}
          </p>
        </div>

        {/* Footer: Standard Sizes Badge & Starting Price Tag */}
        <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-2">
          {/* Standard Sizes Badge */}
          <span
            data-testid={`frame-card-size-${product.id}`}
            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[var(--color-canvas-subtle)] text-[var(--color-ink-secondary)] border border-[var(--color-border-subtle)]"
          >
            {product.sizeRange}
          </span>

          {/* Starting Price Tag (Peacock Teal) */}
          <span
            data-testid={`frame-card-price-${product.id}`}
            className="text-sm font-semibold text-accent tracking-tight"
          >
            From ₹{product.startingPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
