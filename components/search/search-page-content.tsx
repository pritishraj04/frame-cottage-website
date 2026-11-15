"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  Maximize2,
  Sparkles,
  Phone,
  FileText,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Layers,
  Box,
  CornerDownRight,
} from "lucide-react";
import {
  searchStudio,
  TRENDING_STUDIO_SEARCHES,
  SearchResultItem,
  SearchCategory,
} from "@/lib/search/search-index";

// 4:3 Spatial Canvas Blueprint Graphic Component
function SpatialDropZoneGraphic({
  type,
  aspectGuide,
  title,
  category,
}: {
  type?: "frame" | "signage" | "screen" | "plaque" | "award" | "material" | "action";
  aspectGuide?: string;
  title: string;
  category: SearchCategory;
}) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/50 p-4 sm:p-5 flex flex-col justify-between overflow-hidden group hover:border-[var(--color-accent-gold)]/70 transition-all duration-300">
      {/* Corner Registration Crosshairs */}
      <span className="absolute top-2 left-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>
      <span className="absolute top-2 right-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>

      {/* Top Banner Guide */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-muted)] relative z-10">
        <span className="px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/80 text-[var(--color-accent-gold)]">
          4:3 ARCHIVAL CANVAS • 300 DPI
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/60 text-[9px] uppercase">
          {category}
        </span>
      </div>

      {/* Central Visual Art / Blueprint Wireframe */}
      <div className="relative flex-1 flex items-center justify-center py-2 sm:py-3">
        {type === "frame" || category === "verticals" ? (
          <div className="relative w-36 sm:w-44 h-24 sm:h-28 border-4 border-[#6B4931] shadow-xl rounded-sm p-1.5 bg-[#2A2A2A]/40 flex flex-col items-center justify-center">
            {/* Corner Splines */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#C5A059]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#C5A059]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#C5A059]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#C5A059]" />
            {/* Mat Aperture */}
            <div className="w-full h-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)]/80 flex flex-col items-center justify-center text-center p-1.5">
              <span className="text-[10px] font-serif text-[var(--color-accent-gold)] italic truncate max-w-[90%]">
                {title}
              </span>
              <span className="text-[8px] font-mono text-[var(--color-ink-muted)] mt-0.5">
                Archival Joinery
              </span>
            </div>
          </div>
        ) : type === "signage" ? (
          <div className="relative w-44 sm:w-52 h-18 sm:h-22 rounded-lg bg-gradient-to-r from-[#222] via-[#2D281E] to-[#222] border border-[#C5A059]/70 shadow-lg flex flex-col items-center justify-center p-2 overflow-hidden">
            <div className="text-[8.5px] font-mono tracking-[0.25em] uppercase text-[#C5A059] font-bold text-center truncate max-w-[90%]">
              ✦ {title.toUpperCase()} ✦
            </div>
            <div className="text-[7.5px] font-mono text-[var(--color-ink-muted)] mt-1">
              316 MARINE ALLOY • IP67 LED
            </div>
            <div className="absolute -bottom-2 inset-x-4 h-1.5 bg-[#C5A059] blur-xs opacity-60" />
          </div>
        ) : type === "screen" ? (
          <div className="relative w-32 sm:w-36 h-24 sm:h-28 border-2 border-[#C5A059]/60 rounded p-1.5 bg-[var(--color-canvas-base)]/50 overflow-hidden flex items-center justify-center">
            <svg
              className="w-full h-full opacity-65 text-[#C5A059]"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <pattern id="jaali-search-pat" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="6" stroke="currentColor" fill="none" />
                <path d="M0,10 L20,10 M10,0 L10,20" stroke="currentColor" />
              </pattern>
              <rect width="100" height="100" fill="url(#jaali-search-pat)" />
            </svg>
            <div className="absolute px-2 py-0.5 bg-[var(--color-canvas-surface)]/90 border border-[#C5A059]/40 rounded text-[8.5px] font-mono text-[#C5A059]">
              3000W Laser Cut
            </div>
          </div>
        ) : type === "award" ? (
          <div className="relative w-28 sm:w-32 h-24 sm:h-28 flex flex-col items-center justify-end">
            <div className="w-16 sm:w-20 h-16 sm:h-20 border-2 border-[#C5A059]/80 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-xs flex items-center justify-center text-[10px] font-serif text-[var(--color-accent-gold)] shadow-md">
              K9 Crystal
            </div>
            <div className="w-24 sm:w-28 h-5 bg-[#3E2723] border border-[#C5A059]/60 shadow-md rounded-xs flex items-center justify-center text-[8px] font-mono text-[#F4F1EA]">
              Solid Walnut Plinth
            </div>
          </div>
        ) : type === "plaque" ? (
          <div className="relative w-40 sm:w-48 h-20 sm:h-24 bg-gradient-to-br from-[#8C6D37] via-[#C5A059] to-[#6E5023] rounded-sm p-1 shadow-lg flex items-center justify-center">
            <div className="w-full h-full border border-black/40 bg-black/60 p-2 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-serif tracking-widest text-[#E6C687] uppercase font-bold truncate max-w-[95%]">
                {title}
              </span>
              <span className="text-[7.5px] font-mono text-[#C5A059] mt-0.5">
                GeM Tender Audited
              </span>
            </div>
          </div>
        ) : type === "material" ? (
          <div className="relative w-36 sm:w-44 h-22 sm:h-26 border border-dashed border-[var(--color-accent-gold)]/60 rounded-xl bg-[var(--color-canvas-surface)]/90 p-2 flex flex-col items-center justify-center text-center shadow-xs">
            <Layers className="w-5 h-5 text-[var(--color-accent-gold)] mb-1" />
            <span className="text-[10px] font-mono font-medium text-[var(--color-ink-primary)] truncate max-w-[90%]">
              {title}
            </span>
            <span className="text-[8px] font-mono text-[var(--color-ink-muted)] mt-0.5">
              Technical Specification
            </span>
          </div>
        ) : (
          <div className="relative w-36 sm:w-44 h-22 sm:h-26 border border-dashed border-[var(--color-accent-gold)]/60 rounded-xl bg-[var(--color-canvas-surface)]/90 p-2 flex flex-col items-center justify-center text-center shadow-xs">
            <Box className="w-5 h-5 text-[var(--color-accent-gold)] mb-1" />
            <span className="text-[10px] font-mono font-medium text-[var(--color-ink-primary)] truncate max-w-[90%]">
              {title}
            </span>
            <span className="text-[8px] font-mono text-[var(--color-ink-muted)] mt-0.5">
              Direct Atelier Shortcut
            </span>
          </div>
        )}
      </div>

      {/* Bottom Dimensions & In-Situ Guide */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-muted)] border-t border-dashed border-[var(--color-border-strong)]/40 pt-2 relative z-10">
        <span className="truncate pr-2">{aspectGuide || "[ 4:3 BLUEPRINT ]"}</span>
        <span className="shrink-0 text-[var(--color-accent-gold)] flex items-center gap-1">
          <Maximize2 className="w-3 h-3" />
          In-Situ
        </span>
      </div>
    </div>
  );
}

export function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const urlQuery = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "all";

  const [query, setQuery] = useState(urlQuery);
  const [selectedFilter, setSelectedFilter] = useState(urlCategory);

  // Sync state with URL parameter changes
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    setSelectedFilter(urlCategory);
  }, [urlCategory]);

  // Execute Search
  const searchResults = useMemo(() => {
    return searchStudio(query, selectedFilter);
  }, [query, selectedFilter]);

  // Update URL search parameters
  const updateQueryParams = (newQuery: string, newCategory: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (newQuery.trim()) {
        params.set("q", newQuery.trim());
      }
      if (newCategory && newCategory !== "all") {
        params.set("category", newCategory);
      }
      const newUrl = params.toString() ? `/search?${params.toString()}` : "/search";
      router.replace(newUrl, { scroll: false });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    updateQueryParams(val, selectedFilter);
  };

  const handleFilterClick = (filterKey: string) => {
    setSelectedFilter(filterKey);
    updateQueryParams(query, filterKey);
  };

  const handleClear = () => {
    setQuery("");
    updateQueryParams("", selectedFilter);
  };

  return (
    <div className="w-full min-h-screen bg-[var(--background)] text-[var(--color-ink-primary)]">
      {/* Top Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-8 sm:pb-12 border-b border-[var(--color-border-subtle)] bg-gradient-to-b from-[var(--color-canvas-subtle)]/40 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Subtitle */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-accent-gold)] uppercase mb-3">
            <Link href="/" className="hover:underline">
              Atelier
            </Link>
            <span>/</span>
            <span>Studio Search & Specifications</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)]">
                Studio Archive Search
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[var(--color-ink-muted)] max-w-2xl">
                Explore our 6 core service verticals, handcrafted framing models, precision CNC fabrication capabilities, museum-grade materials, and tender archives.
              </p>
            </div>

            {/* Live Result Counter Badge */}
            <div
              data-testid="search-results-counter"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-dashed border-[var(--color-accent-gold)]/60 bg-[var(--color-canvas-subtle)]/80 text-xs font-mono font-medium text-[var(--color-accent-gold)] shrink-0 self-start md:self-end"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{searchResults.totalCount} Studio Records Found</span>
            </div>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative max-w-3xl">
            <div className="relative flex items-center">
              <input
                type="text"
                data-testid="search-page-input"
                value={query}
                onChange={handleInputChange}
                placeholder="Search verticals, Appalachian walnut, TruVue acrylic, CNC screens, GeM tenders..."
                className="w-full h-13 sm:h-14 pl-12 pr-12 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] text-sm sm:text-base text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-accent-gold)] focus:ring-2 focus:ring-[var(--color-accent-gold)]/20 shadow-sm transition-all font-sans font-medium"
              />
              <Search className="w-5 h-5 text-[var(--color-accent-gold)] absolute left-4 pointer-events-none" />
              {query && (
                <button
                  type="button"
                  data-testid="search-page-clear"
                  onClick={handleClear}
                  className="p-1.5 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] absolute right-4 transition-colors"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              data-testid="search-filter-all"
              onClick={() => handleFilterClick("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedFilter === "all"
                  ? "bg-accent text-[var(--color-accent-contrast)] font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              All Records
            </button>
            <button
              type="button"
              data-testid="search-filter-verticals"
              onClick={() => handleFilterClick("verticals")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedFilter === "verticals"
                  ? "bg-accent text-[var(--color-accent-contrast)] font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Service Verticals
            </button>
            <button
              type="button"
              data-testid="search-filter-products"
              onClick={() => handleFilterClick("products")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedFilter === "products"
                  ? "bg-accent text-[var(--color-accent-contrast)] font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Products & Frames
            </button>
            <button
              type="button"
              data-testid="search-filter-materials"
              onClick={() => handleFilterClick("materials")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedFilter === "materials"
                  ? "bg-accent text-[var(--color-accent-contrast)] font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Materials & Specs
            </button>
            <button
              type="button"
              data-testid="search-filter-actions"
              onClick={() => handleFilterClick("actions")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedFilter === "actions"
                  ? "bg-accent text-[var(--color-accent-contrast)] font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Actions & Portals
            </button>
          </div>
        </div>
      </section>

      {/* Main Results Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {searchResults.totalCount === 0 ? (
          /* Empty Search State */
          <div
            data-testid="search-empty-state"
            className="my-8 sm:my-16 p-8 sm:p-14 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 text-center flex flex-col items-center justify-center max-w-2xl mx-auto space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-xs">
              <Search className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-ink-primary)]">
                No studio records found matching &ldquo;{query}&rdquo;
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] max-w-md mx-auto">
                We couldn&apos;t find an exact match in our archival directory. Try adjusting your query or explore these popular architectural searches:
              </p>
            </div>

            {/* Popular Shortcut Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {TRENDING_STUDIO_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    updateQueryParams(tag, selectedFilter);
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-[var(--color-accent-gold)] hover:bg-accent hover:text-[var(--color-accent-contrast)] hover:border-accent transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Actions for Empty State */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full sm:w-auto">
              <a
                href="https://wa.me/919810000000?text=Hello%20Frame%20Cottage%20Team%2C%20I%20am%20looking%20for%20a%20custom%20fabrication%20specification"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium tracking-wider bg-[#25D366] text-black hover:bg-[#20ba59] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Consult with Studio Expert on WhatsApp</span>
              </a>

              <Link
                href="/rfq"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium tracking-wider bg-[var(--color-canvas-surface)] border border-[var(--color-border-strong)] text-[var(--color-ink-primary)] hover:border-[var(--color-accent-gold)] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                <span>Request Custom RFQ</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Results Grid in PNG-Styled Spatial Canvas Architecture */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {searchResults.all.map((item) => {
              return (
                <div
                  key={item.id}
                  data-testid={`search-card-${item.id}`}
                  className="p-5 sm:p-6 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-surface)] flex flex-col justify-between hover:border-[var(--color-accent-gold)]/60 transition-all duration-300 shadow-xs group"
                >
                  <div className="space-y-4">
                    {/* 4:3 Spatial Canvas Drop Zone */}
                    <SpatialDropZoneGraphic
                      type={item.svgType}
                      aspectGuide={item.aspectGuide}
                      title={item.title}
                      category={item.category}
                    />

                    {/* Header info & Badges */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)]/70">
                          {item.categoryLabel}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Technical Specs List */}
                    <div className="p-3.5 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 space-y-2 text-xs">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-accent-gold)] font-semibold">
                        Technical Specs
                      </div>
                      <ul className="space-y-1">
                        {item.specs.map((spec, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-1.5 text-[11px] text-[var(--color-ink-secondary)]"
                          >
                            <span className="text-[var(--color-accent-gold)] mt-0.5 shrink-0">✦</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom / Action Row */}
                  <div className="pt-5 mt-4 border-t border-dashed border-[var(--color-border-subtle)] flex items-center justify-between gap-3">
                    <div className="text-xs font-mono font-semibold text-[var(--color-accent-gold)]">
                      {item.priceOrLeadTime}
                    </div>

                    {item.href.startsWith("http") ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium tracking-wider bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] transition-all duration-200 cursor-pointer shadow-xs"
                      >
                        <span>{item.actionText || "Consult"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium tracking-wider bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] transition-all duration-200 cursor-pointer shadow-xs"
                      >
                        <span>{item.actionText || "Explore"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Studio Quality Commitments Banner */}
        <section className="mt-14 sm:mt-20 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--color-ink-muted)]">
          <div className="space-y-1.5">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-gold)] font-bold">
              01 • Precision Machining
            </div>
            <p>
              Raycus 3000W fiber laser profiling and 5-axis CNC routing calibrated to tolerances down to ±0.05mm.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-gold)] font-bold">
              02 • Archival Conservation
            </div>
            <p>
              TruVue® Optium Museum Acrylic and 100% alpha-cellulose cotton rag barrier boards guarding fine art.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-gold)] font-bold">
              03 • Public & Corporate GeM
            </div>
            <p>
              Verified Government e-Marketplace vendor delivering audit-ready proforma invoicing for state tenders.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
