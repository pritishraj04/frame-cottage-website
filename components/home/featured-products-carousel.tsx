"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sliders,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  CURATED_PRODUCTS,
  CuratedFrameProduct,
} from "@/lib/constants/collections";
import { MOULDINGS, MouldingId } from "@/lib/constants/frames";
import { FrameArtwork } from "./frame-artworks";
import { QuickCustomiseDialog } from "./quick-customise-dialog";
import { cn } from "@/lib/utils";

export interface FeaturedProductItem {
  id: string;
  name: string;
  mouldingId: MouldingId;
  material: string;
  finishBadge: string;
  dimensions: string;
  price: number;
  artworkType: CuratedFrameProduct["artworkType"];
  artworkTitle: string;
  artistNote: string;
  splineDetail: string;
  curatedId: string;
}

export const FEATURED_PRODUCTS: FeaturedProductItem[] = [
  {
    id: "architectural-wayfinding",
    name: "Architectural Wayfinding & Illuminated LED Pylon",
    mouldingId: "black",
    material: "Structural 5052-H32 Architectural Aluminum",
    finishBadge: "IP67 LED & 3D Letters",
    dimensions: '84" × 24" × 8"',
    price: 850,
    artworkType: "architectural",
    artworkTitle: "Campus Wayfinding System",
    artistNote: "PVDF Coated & Anti-Graffiti Seal",
    splineDetail: "Welded Internal Spaceframe",
    curatedId: "architectural-wayfinding",
  },
  {
    id: "mendocino-walnut",
    name: "The Mendocino Archival American Walnut Frame with Giclée",
    mouldingId: "walnut",
    material: "Solid Appalachian Black Walnut",
    finishBadge: "Organic Linseed Oil",
    dimensions: '16" × 20"',
    price: 64,
    artworkType: "botanical",
    artworkTitle: "Ginkgo biloba L.",
    artistNote: "310gsm Archival Cotton Rag",
    splineDetail: "Mortise-Keyed Maple Spline",
    curatedId: "mendocino-walnut",
  },
  {
    id: "laser-cut-brass-monument",
    name: "Precision CNC Laser-Cut Brass Monument Civic Plaque",
    mouldingId: "brass",
    material: "Solid Jewelers C260 Heavy Brass Plate",
    finishBadge: "GeM & Municipal Certified",
    dimensions: '24" × 36"',
    price: 420,
    artworkType: "classical",
    artworkTitle: "Civic Dedication Monolith",
    artistNote: "Deep Chemical Relief Etch",
    splineDetail: "Blind Stud Wall Anchoring",
    curatedId: "laser-cut-brass-monument",
  },
  {
    id: "perforated-metal-facade",
    name: "Architectural Perforated Metal Facade & CNC Screen",
    mouldingId: "brass",
    material: "Marine-Grade 316 Stainless & Brass",
    finishBadge: "5-Axis CNC Precision",
    dimensions: '48" × 96"',
    price: 680,
    artworkType: "geometric",
    artworkTitle: "Parametric Acoustic Lattice",
    artistNote: "Fiber Laser Profile (±0.1mm)",
    splineDetail: "Concealed Fixing Channels",
    curatedId: "perforated-metal-facade",
  },
  {
    id: "highline-shadowbox-canvas",
    name: "Highline Shadowbox Stretched Canvas Art",
    mouldingId: "black",
    material: "Solid Rock Maple with Linen Float Margin",
    finishBadge: "Museum Velvet Lacquer",
    dimensions: '24" × 36"',
    price: 110,
    artworkType: "abstract",
    artworkTitle: "Studies in Raw Linen & Ochre",
    artistNote: "Hand-Stretched Belgian Linen",
    splineDetail: "1.75″ Deep Gallery Margin",
    curatedId: "highline-matte-black",
  },
  {
    id: "executive-crystal-walnut",
    name: "Executive Crystal & Solid Walnut Memento Award",
    mouldingId: "walnut",
    material: "FSC® American Walnut & K9 Beveled Crystal",
    finishBadge: "Optical K9 & Walnut",
    dimensions: '10" × 5" × 3"',
    price: 145,
    artworkType: "minimalist",
    artworkTitle: "Presidential Leadership Honor",
    artistNote: "Sub-Surface 3D Laser Engraving",
    splineDetail: "Lined Keepsake Presentation Box",
    curatedId: "executive-crystal-walnut",
  },
  {
    id: "ready-made-gallery-set",
    name: "Ready-Made Archival Gallery Wall Set",
    mouldingId: "oak",
    material: "Quarter-Sawn White Oak & Natural Glass",
    finishBadge: "Laser Spacing Templates",
    dimensions: 'Set of 6 (8"×10" to 16"×20")',
    price: 195,
    artworkType: "triptych",
    artworkTitle: "Botanical Heritage Suite",
    artistNote: "Cotton Mats & Pre-Installed Wire",
    splineDetail: "Hardwood Corner Joinery",
    curatedId: "montmartre-gallery-set",
  },
  {
    id: "gilded-atelier-brass",
    name: "Gilded Atelier Brass Architectural Frame",
    mouldingId: "brass",
    material: "Solid Spun Brass over Birch Core",
    finishBadge: "Hand-Brushed Satin Patina",
    dimensions: '11" × 14"',
    price: 78,
    artworkType: "abstract",
    artworkTitle: "Study in Form & Ochre",
    artistNote: "Giclée Mineral Pigment",
    splineDetail: "Precision Mitered Brass Casing",
    curatedId: "tribeca-brass",
  },
];

export function FeaturedProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<CuratedFrameProduct | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Responsive visible cards listener
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else if (width < 1280) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = FEATURED_PRODUCTS.length;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
    },
    [maxIndex]
  );

  // Auto-advance every 5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const delta = touchDeltaXRef.current;
    const threshold = 45;
    if (delta < -threshold) {
      handleNext();
    } else if (delta > threshold) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  const handleQuickCustomise = (product: FeaturedProductItem) => {
    const found =
      CURATED_PRODUCTS.find((p) => p.id === product.curatedId) ||
      CURATED_PRODUCTS[0];
    setSelectedProduct(found);
    setIsDialogOpen(true);
  };

  // Safe percentage step for CSS transform translation
  const translatePercent = currentIndex * (100 / visibleCards);

  return (
    <section
      id="featured-products-carousel"
      data-testid="featured-products-carousel"
      aria-label="Featured Handcrafted Frames Carousel"
      className="w-full bg-[var(--background)] py-14 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            EDITORIAL HEADER WITH CONTROLS
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-gold)] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Curated Atelier Gallery • 6 Core Service Verticals</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
              Featured Handcrafted Works & Studio Capabilities
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed">
              Exquisite frame silhouettes, spatial signage pylons, and precision CNC metalworks precision-milled from sustainably sourced
              American hardwoods, structural metals, and glazed with TruVue® museum conservation acrylic.
            </p>
          </div>

          {/* Apple-style circular Prev / Next navigation buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous frame"
              data-testid="carousel-prev-btn"
              className="w-11 h-11 rounded-full bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)] backdrop-blur-md flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer hover:border-[var(--color-accent-gold)]/60"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next frame"
              data-testid="carousel-next-btn"
              className="w-11 h-11 rounded-full bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)] backdrop-blur-md flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer hover:border-[var(--color-accent-gold)]/60"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            PURE IMAGE-BASED CAROUSEL WINDOW & TRACK
           ========================================================================= */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {FEATURED_PRODUCTS.map((product) => {
              const currentMoulding =
                MOULDINGS[product.mouldingId] || MOULDINGS.walnut;

              return (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2 sm:px-3"
                >
                  <article
                    data-testid={`featured-product-card-${product.id}`}
                    className="group relative flex flex-col h-full bg-[var(--color-canvas-surface)] rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-accent-gold)]/60"
                  >
                    {/* =========================================================================
                        PURE IMAGE SHOWCASE STAGE
                       ========================================================================= */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-canvas-subtle)] flex items-center justify-center p-5 select-none">
                      {/* Architectural grid texture */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:18px_18px]"
                      />

                      {/* Ambient radial highlight */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.12)_0%,transparent_70%)]"
                      />

                      {/* Prominent Realistic Frame with Multi-Layer Drop Shadow */}
                      <div
                        style={{
                          background: currentMoulding.frameGradient,
                          borderColor: currentMoulding.borderColor,
                          boxShadow:
                            "0 22px 45px -10px rgba(0, 0, 0, 0.45), 0 8px 18px -4px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
                        }}
                        className="relative w-44 h-56 sm:w-48 sm:h-60 p-3.5 rounded-xs border border-t-[rgba(255,255,255,0.4)] border-b-[rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-[1.03]"
                      >
                        {/* Mitered Corner Splines Key Indicators */}
                        <div
                          aria-hidden="true"
                          className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -top-px -right-px w-2 h-2 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none"
                        />

                        {/* Inner lip moulding detail */}
                        <div
                          style={{ borderColor: currentMoulding.innerLipColor }}
                          className="w-full h-full border border-black/35 p-0.5 rounded-xs"
                        >
                          {/* 4-Ply Archival Bevel-Cut Mat Board */}
                          <div
                            style={{
                              backgroundColor: "#F4F1EA",
                            }}
                            className="w-full h-full relative p-3 sm:p-3.5 border border-[#DFD8CC] shadow-[inset_0_1px_3px_rgba(0,0,0,0.14)]"
                          >
                            {/* Artwork Window with Inner Bevel Cut Shadow */}
                            <div
                              style={{
                                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.25)",
                              }}
                              className="w-full h-full relative overflow-hidden bg-[#FAF6EE]"
                            >
                              <FrameArtwork type={product.artworkType} />

                              {/* Optical Glaze Reflection Highlight */}
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/16 to-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subtle floating craft pills */}
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide bg-[var(--color-canvas-surface)]/90 text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)] shadow-xs backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        <span>{product.splineDetail}</span>
                      </div>

                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide bg-[var(--color-canvas-surface)]/90 text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)] shadow-xs backdrop-blur-md">
                        <span>{product.finishBadge}</span>
                      </div>
                    </div>

                    {/* =========================================================================
                        EDITORIAL METADATA & QUICK ACTIONS
                       ========================================================================= */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[var(--color-canvas-surface)] border-t border-[var(--color-border-subtle)]">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[var(--color-ink-muted)] mb-1">
                          <span className="truncate pr-2">{product.material}</span>
                          <span className="font-mono text-[11px] text-[var(--color-ink-secondary)] flex-shrink-0">
                            {product.dimensions}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl font-medium text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[var(--color-ink-secondary)] mt-0.5 truncate">
                          {product.artworkTitle} • {product.artistNote}
                        </p>
                      </div>

                      {/* Action & Price Footer */}
                      <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)] block">
                            Bespoke Atelier
                          </span>
                          <span className="text-sm font-semibold text-[var(--color-accent-gold)]">
                            From ${product.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href="#custom-frame-studio"
                            data-testid={`featured-card-link-${product.id}`}
                            className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-accent-gold)] transition-colors px-2 py-1"
                          >
                            Studio &rarr;
                          </a>
                          <button
                            type="button"
                            onClick={() => handleQuickCustomise(product)}
                            data-testid={`featured-card-customise-${product.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6B1C23] hover:bg-[#54161C] text-[#F4F1EA] text-xs font-medium transition-all shadow-xs hover:shadow-sm cursor-pointer"
                          >
                            <Sliders className="w-3 h-3 text-[#C5A059]" />
                            <span>Customise</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            DOT INDICATORS / PAGINATION BAR
           ========================================================================= */}
        <div
          role="tablist"
          aria-label="Featured frames pagination"
          className="flex items-center justify-center gap-2 mt-8 sm:mt-10"
        >
          {FEATURED_PRODUCTS.map((product, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}: ${product.name}`}
                data-testid={`carousel-dot-${index}`}
                onClick={() => goToIndex(index)}
                className={cn(
                  "transition-all duration-300 rounded-full cursor-pointer",
                  isActive
                    ? "w-8 h-2.5 bg-[#C5A059] shadow-xs"
                    : "w-2.5 h-2.5 bg-[var(--color-canvas-subtle)] hover:bg-[var(--color-ink-muted)] border border-[var(--color-border-subtle)]"
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Quick Customise Modal */}
      <QuickCustomiseDialog
        product={selectedProduct}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
