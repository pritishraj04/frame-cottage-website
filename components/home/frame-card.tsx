"use client";

import { useState } from "react";
import { Heart, Sliders, Eye } from "lucide-react";
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
    <article
      data-testid={`frame-card-${product.id}`}
      className="group relative flex flex-col bg-[#FFFFFF] rounded-2xl border border-[#E8E1D5] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D1C7B7]"
    >
      {/* Visual Presentation Container (Dual-State Swapper: Studio Rest -> In-Situ Room) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF7F2] select-none">
        {/* =========================================================================
            STATE 1: DEFAULT REST STATE (Crisp studio frame cutout on warm parchment)
           ========================================================================= */}
        <div
          data-testid={`frame-card-rest-${product.id}`}
          className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-b from-[#FAF7F2] via-[#F6F0E6] to-[#ECE3D4] transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        >
          {/* Subtle Studio Architectural Background Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#A99682_1px,transparent_1px)] [background-size:20px_20px]"
          />

          {/* Studio Radial Ambient Highlight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_75%)]"
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
              {/* Archival Mat Board */}
              <div
                style={{
                  padding: product.defaultMatId === "gallery" ? "14px" : "10px",
                  backgroundColor: "#FAF8F5",
                }}
                className="w-full h-full relative border border-[#EBE4D8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
              >
                {/* Artwork Window with Inner Mat Bevel Shadow */}
                <div
                  style={{
                    boxShadow: "var(--shadow-frame-inner-mat)",
                  }}
                  className="w-full h-full relative overflow-hidden bg-[#FAF6EE]"
                >
                  <FrameArtwork type={product.artworkType} />
                  {/* Studio Specular Glazing Light Glare */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/15 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Craft Badge Pill (Rest State subtle indicator) */}
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-[#FAF7F2]/90 text-[#5C554E] border border-[#E8E1D5] shadow-2xs backdrop-blur-xs">
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide bg-[#191614]/70 text-[#FAF7F2] backdrop-blur-md border border-white/10 shadow-xs">
              <Eye className="w-3 h-3 text-[#C5A059]" />
              <span>{product.roomContext.title}</span>
            </span>
          </div>

          {/* Centered Frame Hung on the Wall */}
          <div className="relative z-10 my-auto flex items-center justify-center px-4">
            <div
              style={{
                background: currentMoulding.frameGradient,
                borderColor: currentMoulding.borderColor,
                boxShadow: "var(--shadow-frame-room)",
              }}
              className="relative w-36 h-44 sm:w-40 sm:h-48 p-2.5 rounded-xs border border-t-[rgba(255,255,255,0.3)] border-b-[rgba(0,0,0,0.4)] transform transition-transform duration-500 group-hover:scale-102"
            >
              <div
                style={{ borderColor: currentMoulding.innerLipColor }}
                className="w-full h-full border border-black/30 p-0.5 rounded-xs"
              >
                <div
                  style={{
                    padding: product.defaultMatId === "gallery" ? "10px" : "8px",
                    backgroundColor: "#FAF8F5",
                  }}
                  className="w-full h-full relative border border-[#EBE4D8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
                >
                  <div
                    style={{ boxShadow: "var(--shadow-frame-inner-mat)" }}
                    className="w-full h-full relative overflow-hidden bg-[#FAF6EE]"
                  >
                    <FrameArtwork type={product.artworkType} />
                    {/* Living Room Soft Lamp Sheen */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-amber-100/10 to-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Interior Furniture Anchor (Credenza, Mantle, Console, etc.) */}
          <div className="relative z-10 w-full mt-auto">
            {product.roomContext.settingType === "credenza" && (
              <div className="relative w-full h-12 flex flex-col justify-end">
                {/* Mid-century Teak Credenza Top */}
                <div
                  style={{ backgroundColor: product.roomContext.furnitureColor }}
                  className="w-full h-7 border-t border-amber-200/20 shadow-lg relative flex items-center justify-between px-6"
                >
                  <div className="w-full h-[1px] bg-white/10 absolute top-0 inset-x-0" />
                  {/* Decorative Ceramic Bud Vase */}
                  <div className="absolute -top-7 right-8 flex flex-col items-center">
                    <div className="w-1.5 h-4 bg-[#B45309]/80 rounded-full" />
                    <div className="w-5 h-5 rounded-full bg-[#E8D9C5] border border-amber-900/20 shadow-xs" />
                  </div>
                </div>
              </div>
            )}

            {product.roomContext.settingType === "mantle" && (
              <div className="relative w-full h-12 flex flex-col justify-end">
                {/* French Limestone Fireplace Mantle */}
                <div
                  style={{ backgroundColor: product.roomContext.furnitureColor }}
                  className="w-full h-7 border-t-2 border-stone-200 shadow-xl relative"
                >
                  <div className="w-full h-2 bg-stone-300/40" />
                  {/* Brass Candlestick Accent */}
                  <div className="absolute -top-8 left-8 flex flex-col items-center">
                    <div className="w-1 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <div className="w-1 h-3 bg-stone-100" />
                    <div className="w-3 h-5 bg-[#C5A059] rounded-xs shadow-xs" />
                  </div>
                </div>
              </div>
            )}

            {product.roomContext.settingType === "console" && (
              <div className="relative w-full h-12 flex flex-col justify-end">
                {/* Architectural Console Table */}
                <div
                  style={{ backgroundColor: product.roomContext.furnitureColor }}
                  className="w-full h-6 border-t border-white/20 shadow-md relative"
                >
                  {/* Travertine art book stack */}
                  <div className="absolute -top-4 right-10 w-10 h-3 bg-[#FAF7F2] border border-stone-300 rounded-2xs shadow-2xs rotate-[-3deg]" />
                </div>
              </div>
            )}

            {product.roomContext.settingType === "gallery-shelf" && (
              <div className="relative w-full h-10 flex flex-col justify-end">
                {/* Gallery Picture Rail */}
                <div className="w-full h-4 bg-[#4A433D] border-t border-white/20 shadow-md" />
              </div>
            )}

            {product.roomContext.settingType === "salon-wall" && (
              <div className="relative w-full h-12 flex flex-col justify-end">
                {/* Velvet Settee Backrest Cushion Curve */}
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
            <button
              type="button"
              data-testid={`quick-customise-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onQuickCustomise(product);
              }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full",
                "bg-[#191614]/90 hover:bg-[#B45309] text-[#FAF7F2]",
                "text-xs font-semibold uppercase tracking-wider",
                "shadow-xl border border-white/25 backdrop-blur-md",
                "transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                "transition-all duration-300 ease-out cursor-pointer active:scale-95"
              )}
            >
              <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Quick Customise</span>
            </button>
          </div>
        </div>

        {/* Wishlist Toggle Button (Top-Right Floating Overlay) */}
        <div className="absolute top-3 right-3 z-30">
          <button
            type="button"
            data-testid={`wishlist-btn-${product.id}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted((prev) => !prev);
            }}
            className={cn(
              "p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm",
              isWishlisted
                ? "bg-[#B45309] text-white hover:bg-[#92400E] scale-105"
                : "bg-white/85 text-[#5C554E] hover:text-[#B45309] hover:bg-white border border-[#E8E1D5]"
            )}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-transform",
                isWishlisted && "fill-white stroke-white scale-110"
              )}
            />
          </button>
        </div>
      </div>

      {/* =========================================================================
          METADATA & EDITORIAL PRODUCT DETAILS
         ========================================================================= */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#FFFFFF]">
        <div>
          {/* Frame Name (Serif Title) */}
          <h3
            data-testid={`frame-card-title-${product.id}`}
            className="font-serif text-lg font-normal text-[#191614] group-hover:text-[#B45309] transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Material Description */}
          <p
            data-testid={`frame-card-material-${product.id}`}
            className="text-xs text-[#5C554E] line-clamp-1 mt-1 font-normal"
          >
            {product.material}
          </p>
        </div>

        {/* Footer: Standard Sizes Badge & Starting Price Tag */}
        <div className="mt-4 pt-3 border-t border-[#E8E1D5]/80 flex items-center justify-between gap-2">
          {/* Standard Sizes Badge */}
          <span
            data-testid={`frame-card-size-${product.id}`}
            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#F3ECE2] text-[#5C554E] border border-[#E8E1D5]"
          >
            {product.sizeRange}
          </span>

          {/* Starting Price Tag */}
          <span
            data-testid={`frame-card-price-${product.id}`}
            className="text-sm font-semibold text-[#191614] tracking-tight"
          >
            From ${product.startingPrice}
          </span>
        </div>
      </div>
    </article>
  );
}
