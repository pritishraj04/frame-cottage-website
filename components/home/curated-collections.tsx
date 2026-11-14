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
      className="w-full bg-[#F5F5F7] py-14 sm:py-20 border-b border-[#D2D2D7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            EDITORIAL SECTION HEADER
           ========================================================================= */}
        <div
          data-testid="curated-collections-header"
          className="max-w-3xl mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1D1D1F] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B88E56]" />
            <span>Artisan Milling & Conservation Glazing</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1D1D1F] tracking-tight leading-[1.12]">
            Curated Framing Collections
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#86868B] leading-relaxed">
            Each silhouette is custom-milled to the millimeter from sustainably sourced
            American hardwoods, hand-finished with organic oils or genuine gold leaf,
            and glazed with museum-grade Tru Vue® UV-shield acrylic.
          </p>
        </div>

        {/* =========================================================================
            FILTER TABS: All, Natural Timber, Heritage Gilded, Modern Metal, Gallery Sets
           ========================================================================= */}
        <div className="flex items-center justify-between gap-4 border-b border-[#D2D2D7] pb-4 mb-8 overflow-x-auto scrollbar-none">
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
                      ? "bg-[#1D1D1F] text-white shadow-sm"
                      : "bg-[#FFFFFF] text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#E8E8ED] border border-[#D2D2D7]"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px] font-semibold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#E8E8ED] text-[#86868B]"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#86868B]">
            <Layers className="w-3.5 h-3.5 text-[#1D1D1F]" />
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
        <div className="mt-14 sm:mt-18 pt-8 border-t border-[#D2D2D7] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E8E8ED] flex items-center justify-center text-[#1D1D1F]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]">
                100-Year Archival Guarantee
              </p>
              <p className="text-xs text-[#86868B]">
                Acid-free 4-ply cotton rag mats and Tru Vue® conservation glazing on all builds.
              </p>
            </div>
          </div>

          <a
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] hover:text-[#86868B] group transition-colors"
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
