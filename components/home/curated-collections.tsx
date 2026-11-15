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
      aria-label="Curated Projects & Capabilities"
      className="w-full bg-[var(--background)] py-14 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            EDITORIAL SECTION HEADER WITH PNG SPATIAL BADGES
           ========================================================================= */}
        <div
          data-testid="curated-collections-header"
          className="max-w-3xl mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-[0.2em] text-accent mb-3 px-3.5 py-1.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)]/60">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Artisan Milling & Spatial Capabilities • Tru Vue® UV-Shield Acrylic</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            Curated Projects & Capabilities
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed">
            Delivering end-to-end spatial, industrial, and aesthetic solutions for residential spaces,
            commercial enterprises, and public sector tenders. Each project is precision-engineered
            from Appalachian hardwoods, structural metals, and conservation glazing.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)] text-[11px] font-mono text-[var(--color-ink-muted)] bg-[var(--color-canvas-base)]/40">
            PNG Curated Showcase Matrix • 6 Service Verticals
          </div>
        </div>

        {/* =========================================================================
            FILTER TABS: All Verticals, Bespoke Framing & Art, Spatial & Signage, Industrial CNC, Custom Gifting, Civic & Government
           ========================================================================= */}
        <div className="flex items-center justify-between gap-4 border-b border-dashed border-[var(--color-border-strong)]/40 pb-4 mb-8 overflow-x-auto scrollbar-none">
          <div
            role="tablist"
            aria-label="Core service vertical tabs"
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
                  data-test-alias={`collection-filter-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer border-2",
                    isActive
                      ? "bg-accent text-white border-accent shadow-sm"
                      : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-accent hover:bg-[var(--color-canvas-subtle)] border-dashed border-[var(--color-border-strong)]/60 hover:border-accent/60"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px] font-semibold",
                      isActive
                        ? "bg-accent-hover text-white"
                        : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)]"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            RESPONSIVE DUAL-STATE IN-SITU PRODUCT GRID
           ========================================================================= */}
        <div
          data-testid="collection-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <FrameCard
              key={product.id}
              product={product}
              onQuickCustomise={handleQuickCustomise}
            />
          ))}
        </div>

        {/* Quick Customise Modal Dialog */}
        {selectedProduct && (
          <QuickCustomiseDialog
            isOpen={isDialogOpen}
            product={selectedProduct}
            onOpenChange={setIsDialogOpen}
          />
        )}
      </div>
    </section>
  );
}
