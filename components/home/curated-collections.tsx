"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Layers } from "lucide-react";
import {
  CURATED_PRODUCTS,
  COLLECTION_FILTER_TABS,
  CollectionFilterId,
  CuratedFrameProduct,
} from "@/lib/constants/collections";
import { FrameCard } from "./frame-card";
import { QuickCustomiseDialog } from "./quick-customise-dialog";
import { cn } from "@/lib/utils";

export function CuratedCollections() {
  const [activeTab, setActiveTab] = useState<CollectionFilterId>("all");
  const [selectedProduct, setSelectedProduct] =
    useState<CuratedFrameProduct | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProducts =
    activeTab === "all"
      ? CURATED_PRODUCTS
      : CURATED_PRODUCTS.filter((product) => product.category === activeTab);

  const handleQuickCustomise = (product: CuratedFrameProduct) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <section
      id="curated-collections"
      data-testid="curated-collections"
      aria-label="Curated Framing Collections"
      className="w-full bg-[var(--background)] py-14 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            EDITORIAL SECTION HEADER
           ========================================================================= */}
        <div
          data-testid="curated-collections-header"
          className="max-w-3xl mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-primary)] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Artisan Milling & Conservation Glazing</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            Curated Framing Collections
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed">
            Each silhouette is custom-milled to the millimeter from sustainably sourced
            American hardwoods, hand-finished with organic oils or genuine gold leaf,
            and glazed with museum-grade Tru Vue® UV-shield acrylic.
          </p>
        </div>

        {/* =========================================================================
            FILTER TABS: All, Natural Timber, Heritage Gilded, Modern Metal, Gallery Sets
           ========================================================================= */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-4 mb-8 overflow-x-auto scrollbar-none">
          <div
            role="tablist"
            aria-label="Collection categories"
            className="flex items-center gap-2 sm:gap-3 flex-nowrap"
          >
            {COLLECTION_FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-testid={`collection-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-[#6B1C23] text-[#F4F1EA] border border-[#6B1C23] shadow-sm"
                      : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)]"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px] font-semibold",
                      isActive
                        ? "bg-[#54161C] text-[#F4F1EA]"
                        : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)]"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)]">
            <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{filteredProducts.length} Atelier Silhouettes</span>
          </div>
        </div>

        {/* =========================================================================
            RESPONSIVE PRODUCT GRID (1 col mobile, 2 cols tablet, 4 cols desktop)
           ========================================================================= */}
        <div
          data-testid="collection-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <FrameCard
              key={product.id}
              product={product}
              onQuickCustomise={handleQuickCustomise}
            />
          ))}
        </div>

        {/* =========================================================================
            BOTTOM CATALOG VALUE PROPOSITION FOOTER
           ========================================================================= */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#242424] border border-[#333333] flex items-center justify-center text-[#C5A059]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F4F1EA]">
                100-Year Archival Guarantee
              </p>
              <p className="text-xs text-[#9E9E9E]">
                Acid-free 4-ply cotton rag mats and Tru Vue® conservation glazing on all builds.
              </p>
            </div>
          </div>

          <a
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#D4AF37] group transition-colors"
          >
            <span>Explore All 48 Framing Profiles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Accessible Quick Customise Dialog */}
      <QuickCustomiseDialog
        product={selectedProduct}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
