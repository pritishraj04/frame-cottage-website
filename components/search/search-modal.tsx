"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Command,
  CornerDownLeft,
  Layers,
  Box,
  Compass,
  FileText,
  Phone,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import {
  searchStudio,
  TRENDING_STUDIO_SEARCHES,
  SearchResultItem,
  SearchCategory,
} from "@/lib/search/search-index";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

type FilterTab = "all" | "verticals" | "products" | "materials" | "portals";

export function SearchModal({ isOpen, onClose, initialQuery = "" }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<FilterTab>("all");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setHighlightedIndex(-1);
      // Autofocus input
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  // Global escape key listener inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Map category filter to searchStudio
  const mappedCategoryFilter = useMemo(() => {
    if (selectedCategory === "portals") return "actions";
    return selectedCategory;
  }, [selectedCategory]);

  // Run search
  const searchResults = useMemo(() => {
    return searchStudio(query, mappedCategoryFilter);
  }, [query, mappedCategoryFilter]);

  // Flat list of visible results for keyboard navigation
  const flatResults = searchResults.all;

  // Reset highlight index when query or category changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query, selectedCategory]);

  const handleSelectResult = useCallback(
    (item: SearchResultItem) => {
      onClose();
      if (item.href.startsWith("http")) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onClose, router]
  );

  const handleViewAllDedicated = useCallback(() => {
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }, [onClose, query, router]);

  // Keyboard navigation inside modal: Up, Down, Enter
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatResults.length === 0) return;
      setHighlightedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatResults.length === 0) return;
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < flatResults.length) {
        handleSelectResult(flatResults[highlightedIndex]);
      } else if (query.trim()) {
        handleViewAllDedicated();
      }
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && resultsContainerRef.current) {
      const activeElement = resultsContainerRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Global Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        data-testid="search-modal"
        className="w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl bg-[var(--background)] border-2 border-dashed border-[var(--color-border-strong)]/70 shadow-2xl overflow-hidden transition-all text-[var(--color-ink-primary)]"
      >
        {/* Top Header / Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)]/80 relative">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-[var(--color-accent-gold)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              data-testid="search-modal-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search studio verticals, frames, materials, specs..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] outline-none font-sans font-medium"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                type="button"
                data-testid="search-modal-clear"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] text-[10px] font-mono text-[var(--color-ink-muted)] uppercase">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] transition-colors sm:hidden"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pt-1">
            <button
              type="button"
              data-testid="modal-filter-all"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedCategory === "all"
                  ? "bg-[var(--color-accent-gold)] text-black font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              All
            </button>
            <button
              type="button"
              data-testid="modal-filter-verticals"
              onClick={() => setSelectedCategory("verticals")}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedCategory === "verticals"
                  ? "bg-[var(--color-accent-gold)] text-black font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Verticals
            </button>
            <button
              type="button"
              data-testid="modal-filter-products"
              onClick={() => setSelectedCategory("products")}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedCategory === "products"
                  ? "bg-[var(--color-accent-gold)] text-black font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Products
            </button>
            <button
              type="button"
              data-testid="modal-filter-materials"
              onClick={() => setSelectedCategory("materials")}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedCategory === "materials"
                  ? "bg-[var(--color-accent-gold)] text-black font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Materials
            </button>
            <button
              type="button"
              data-testid="modal-filter-portals"
              onClick={() => setSelectedCategory("portals")}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                selectedCategory === "portals"
                  ? "bg-[var(--color-accent-gold)] text-black font-semibold shadow-xs"
                  : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)]"
              }`}
            >
              Portals
            </button>
          </div>
        </div>

        {/* Content Body: Trending Pills OR Live Search Results */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4"
        >
          {/* Default Empty State when Query is Blank: Show Trending Searches */}
          {!query.trim() ? (
            <div className="py-2 space-y-5">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-accent-gold)] font-medium mb-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trending Studio Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_STUDIO_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      data-testid={`trending-pill-${term.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono border border-[var(--color-border-strong)]/50 bg-[var(--color-canvas-subtle)]/70 hover:bg-[var(--color-accent-gold)] hover:text-black hover:border-[var(--color-accent-gold)] transition-all cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Jump Portals */}
              <div className="pt-2 border-t border-[var(--color-border-subtle)]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-muted)] mb-2.5">
                  Direct Atelier Shortcuts
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectResult(searchResults.actions.find((a) => a.id === "action-rfq") || searchResults.all[0])}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 hover:bg-[var(--color-canvas-subtle)] transition-all text-left group"
                  >
                    <div>
                      <div className="text-xs font-medium text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors">
                        RFQ Specification Portal
                      </div>
                      <div className="text-[11px] text-[var(--color-ink-muted)]">
                        Upload CAD blueprints & tender docs
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectResult(searchResults.actions.find((a) => a.id === "action-concierge") || searchResults.all[0])}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 hover:bg-[var(--color-canvas-subtle)] transition-all text-left group"
                  >
                    <div>
                      <div className="text-xs font-medium text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors">
                        Decision Concierge
                      </div>
                      <div className="text-[11px] text-[var(--color-ink-muted)]">
                        Interactive moulding & glazing wizard
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : flatResults.length === 0 ? (
            /* Empty Search State when query doesn't match anything */
            <div data-testid="modal-no-results" className="py-8 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)]/60 flex items-center justify-center text-[var(--color-ink-muted)]">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)]">
                No studio records found matching &ldquo;{query}&rdquo;
              </h4>
              <p className="text-xs text-[var(--color-ink-muted)] max-w-sm mx-auto">
                Check for typos or try searching for keywords like &ldquo;Walnut&rdquo;, &ldquo;TruVue&rdquo;, &ldquo;Signage&rdquo;, or &ldquo;CNC Screen&rdquo;.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                {TRENDING_STUDIO_SEARCHES.slice(0, 4).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--color-canvas-subtle)] text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-accent-gold)] hover:text-black transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Live Grouped Results List */
            <div data-testid="search-results-list" className="space-y-4">
              {/* Service Verticals Group */}
              {searchResults.verticals.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-accent-gold)] font-semibold mb-2 px-1">
                    Service Verticals ({searchResults.verticals.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.verticals.map((item) => {
                      const overallIndex = flatResults.findIndex((r) => r.id === item.id);
                      const isHighlighted = overallIndex === highlightedIndex;

                      return (
                        <div
                          key={item.id}
                          data-index={overallIndex}
                          data-testid={`search-result-item-${item.id}`}
                          onClick={() => handleSelectResult(item)}
                          onMouseEnter={() => setHighlightedIndex(overallIndex)}
                          className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isHighlighted
                              ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 shadow-xs"
                              : "border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 hover:bg-[var(--color-canvas-subtle)]"
                          }`}
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)] border border-[var(--color-accent-gold)]/30">
                                {item.categoryLabel}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="font-serif text-sm sm:text-base font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-[var(--color-ink-muted)] line-clamp-1">
                              {item.subtitle}
                            </div>
                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="text-[11px] font-mono text-[var(--color-accent-gold)] font-medium">
                                {item.priceOrLeadTime}
                              </span>
                            </div>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isHighlighted
                                ? "text-[var(--color-accent-gold)] translate-x-1"
                                : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent-gold)]"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Products & Frames Group */}
              {searchResults.products.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-accent-gold)] font-semibold mb-2 px-1">
                    Products & Framing Models ({searchResults.products.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.products.map((item) => {
                      const overallIndex = flatResults.findIndex((r) => r.id === item.id);
                      const isHighlighted = overallIndex === highlightedIndex;

                      return (
                        <div
                          key={item.id}
                          data-index={overallIndex}
                          data-testid={`search-result-item-${item.id}`}
                          onClick={() => handleSelectResult(item)}
                          onMouseEnter={() => setHighlightedIndex(overallIndex)}
                          className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isHighlighted
                              ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 shadow-xs"
                              : "border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 hover:bg-[var(--color-canvas-subtle)]"
                          }`}
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider bg-[#6B1C23]/25 text-[#E09095] border border-[#6B1C23]/40">
                                {item.categoryLabel}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="font-serif text-sm sm:text-base font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-[var(--color-ink-muted)] line-clamp-1">
                              {item.subtitle}
                            </div>
                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="text-[11px] font-mono text-[var(--color-accent-gold)] font-medium">
                                {item.priceOrLeadTime}
                              </span>
                            </div>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isHighlighted
                                ? "text-[var(--color-accent-gold)] translate-x-1"
                                : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent-gold)]"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Materials & Machinery Group */}
              {searchResults.materials.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-accent-gold)] font-semibold mb-2 px-1">
                    Materials, Glazing & Machinery ({searchResults.materials.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.materials.map((item) => {
                      const overallIndex = flatResults.findIndex((r) => r.id === item.id);
                      const isHighlighted = overallIndex === highlightedIndex;

                      return (
                        <div
                          key={item.id}
                          data-index={overallIndex}
                          data-testid={`search-result-item-${item.id}`}
                          onClick={() => handleSelectResult(item)}
                          onMouseEnter={() => setHighlightedIndex(overallIndex)}
                          className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isHighlighted
                              ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 shadow-xs"
                              : "border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 hover:bg-[var(--color-canvas-subtle)]"
                          }`}
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider bg-[var(--color-canvas-elevated)] text-[var(--color-ink-secondary)] border border-[var(--color-border-strong)]">
                                {item.categoryLabel}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-mono text-[var(--color-accent-gold)]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="font-serif text-sm sm:text-base font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-[var(--color-ink-muted)] line-clamp-1">
                              {item.subtitle}
                            </div>
                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="text-[11px] font-mono text-[var(--color-accent-gold)] font-medium">
                                {item.priceOrLeadTime}
                              </span>
                            </div>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isHighlighted
                                ? "text-[var(--color-accent-gold)] translate-x-1"
                                : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent-gold)]"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions & Portals Group */}
              {searchResults.actions.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--color-accent-gold)] font-semibold mb-2 px-1">
                    Studio Portals & Actions ({searchResults.actions.length})
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.actions.map((item) => {
                      const overallIndex = flatResults.findIndex((r) => r.id === item.id);
                      const isHighlighted = overallIndex === highlightedIndex;

                      return (
                        <div
                          key={item.id}
                          data-index={overallIndex}
                          data-testid={`search-result-item-${item.id}`}
                          onClick={() => handleSelectResult(item)}
                          onMouseEnter={() => setHighlightedIndex(overallIndex)}
                          className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isHighlighted
                              ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 shadow-xs"
                              : "border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 hover:bg-[var(--color-canvas-subtle)]"
                          }`}
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider bg-[var(--color-accent-gold)] text-black font-semibold">
                                {item.categoryLabel}
                              </span>
                            </div>
                            <div className="font-serif text-sm sm:text-base font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-[var(--color-ink-muted)] line-clamp-1">
                              {item.subtitle}
                            </div>
                            <div className="flex items-center gap-2 pt-0.5">
                              <span className="text-[11px] font-mono text-[var(--color-accent-gold)] font-medium">
                                {item.actionText || "Open"}
                              </span>
                            </div>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isHighlighted
                                ? "text-[var(--color-accent-gold)] translate-x-1"
                                : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent-gold)]"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Bar: "View all results on dedicated search page" button */}
        <div className="p-3 sm:p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)]/90 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-[11px] font-mono text-[var(--color-ink-muted)] hidden sm:flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] text-[10px]">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] text-[10px]">
                ↓
              </kbd>{" "}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] text-[10px]">
                Enter
              </kbd>{" "}
              Select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] text-[10px]">
                ESC
              </kbd>{" "}
              Close
            </span>
          </div>

          <button
            type="button"
            data-testid="view-all-results-btn"
            onClick={handleViewAllDedicated}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider bg-[var(--color-accent-gold)] text-black hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>
              {query.trim()
                ? `View all ${flatResults.length} results on dedicated page`
                : "Explore all records on dedicated search page"}
            </span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
