"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CategorySwatch } from "./category-swatches";

export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  count: string;
  clientBadge: string;
  href: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "retail-framing",
    name: "Retail & Standard Framing",
    subtitle: "Premium Photo Frames & Display Solutions",
    count: "B2C / Residential",
    clientBadge: "B2C",
    href: "/services/retail-framing",
  },
  {
    id: "bespoke-framing",
    name: "Bespoke Art & Custom Framing",
    subtitle: "Fine Art Printing, Canvas & Archival Frames",
    count: "B2C / B2B / Galleries",
    clientBadge: "B2C / B2B",
    href: "/services/bespoke-framing",
  },
  {
    id: "spatial-signage",
    name: "Spatial Design & Signage",
    subtitle: "Environmental Branding & Wayfinding Systems",
    count: "B2B / Commercial",
    clientBadge: "B2B",
    href: "/services/spatial-signage",
  },
  {
    id: "industrial-cnc",
    name: "Industrial Fabrication & CNC",
    subtitle: "CNC Routing, Fiber Laser & Metalworks",
    count: "Commercial / Architecture",
    clientBadge: "Commercial",
    href: "/services/industrial-cnc",
  },
  {
    id: "custom-gifting",
    name: "Custom Gifting & Mementos",
    subtitle: "Executive Awards & Commemorative Plaques",
    count: "Corporate & Institutional",
    clientBadge: "Corporate",
    href: "/services/custom-gifting",
  },
  {
    id: "civic-projects",
    name: "Government & Civic Projects",
    subtitle: "Municipal Signage & Public Tender Execution",
    count: "Public Sector / GeM",
    clientBadge: "Public Sector",
    href: "/services/civic-projects",
  },
];

interface CategoryPillsProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export function CategoryPills({
  activeCategory = "retail-framing",
  onSelectCategory,
}: CategoryPillsProps) {
  const [selectedId, setSelectedId] = useState(activeCategory);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelectCategory?.(id);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Core Service Verticals Discovery"
      data-testid="category-pills"
      className="w-full bg-[var(--background)] py-10 lg:py-14 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Scroll Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-primary)] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>6 Core Service Verticals • End-to-End Solutions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
              Service Verticals Discovery
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-xl">
              Delivering end-to-end spatial, industrial, and aesthetic solutions for B2C, B2B, and public sector clients.
            </p>
          </div>

          {/* Smooth Carousel Scroll Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => scroll("left")}
              data-testid="category-scroll-prev"
              aria-label="Scroll categories left"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] hover:border-accent bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-ink-primary)] hover:text-accent transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              data-testid="category-scroll-next"
              aria-label="Scroll categories right"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] hover:border-accent bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-ink-primary)] hover:text-accent transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PNG-Styled 6 Service Verticals Canvas Scroll Track */}
        <div
          ref={scrollContainerRef}
          data-testid="category-pills-scroll"
          role="tablist"
          aria-label="Service vertical discovery tabs"
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedId === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                tabIndex={0}
                aria-selected={isSelected}
                aria-label={category.name}
                data-testid={`category-pill-${category.id}`}
                data-test-alias={`pill-category-${category.id}`}
                onClick={() => handleSelect(category.id)}
                className={`group flex flex-col justify-between flex-shrink-0 snap-center focus:outline-none cursor-pointer aspect-[4/5] w-56 sm:w-64 p-4 sm:p-5 rounded-2xl border-2 border-dashed transition-all duration-500 text-left ${
                  isSelected
                    ? "bg-accent text-white border-accent shadow-sm ring-2 ring-accent/30"
                    : "border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/50 hover:border-accent/60 hover:bg-[var(--color-canvas-subtle)]"
                }`}
              >
                {/* Top Row: Audience Tag & Canvas Aspect Ratio Badge */}
                <div className="flex items-center justify-between gap-2 w-full z-10">
                  <span
                    className={`text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-dashed ${
                      isSelected
                        ? "border-white/30 text-white bg-white/15"
                        : "border-[var(--color-border-strong)] text-accent bg-[var(--color-canvas-base)]/70"
                    }`}
                  >
                    {category.clientBadge}
                  </span>
                  <span
                    className={`text-[10px] font-mono border border-dashed px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "border-white/20 text-white/80 bg-white/10"
                        : "border-[var(--color-border-strong)] text-[var(--color-ink-muted)] bg-[var(--color-canvas-base)]/40"
                    }`}
                  >
                    4:5 Spatial Asset
                  </span>
                </div>

                {/* Center Spatial Container: Dedicated Dashed Dropzone for Vertical PNG Render */}
                <div
                  className={`w-full flex-1 my-3 rounded-xl border border-dashed flex flex-col items-center justify-center p-3 relative overflow-hidden transition-colors ${
                    isSelected
                      ? "border-white/30 bg-white/10"
                      : "border-[var(--color-border-strong)]/50 bg-[var(--color-canvas-base)]/50 group-hover:border-accent/50"
                  }`}
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 transition-transform duration-700 group-hover:scale-105">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-[var(--color-canvas-surface)]">
                      <CategorySwatch id={category.id} />
                    </div>
                  </div>
                  <span
                    className={`mt-2 text-[9px] font-mono ${
                      isSelected ? "text-white/80" : "text-[var(--color-ink-muted)]"
                    }`}
                  >
                    PNG Render Zone
                  </span>
                </div>

                {/* Bottom Row: Vertical Title, Subtitle, and Specification Guide */}
                <div className="w-full pt-1">
                  <span
                    data-testid={`category-pill-label-${category.id}`}
                    className={`block font-serif text-sm sm:text-base tracking-tight transition-colors line-clamp-1 ${
                      isSelected
                        ? "text-white font-bold"
                        : "text-[var(--color-ink-primary)] font-semibold group-hover:text-accent"
                    }`}
                  >
                    {category.name}
                  </span>

                  <span
                    className={`block text-xs font-sans mt-1 line-clamp-1 ${
                      isSelected ? "text-white/85" : "text-[var(--color-ink-muted)]"
                    }`}
                  >
                    {category.subtitle}
                  </span>

                  <div
                    className={`mt-2.5 pt-2 border-t border-dashed flex items-center justify-between text-[10px] font-mono ${
                      isSelected
                        ? "border-white/20 text-white/85"
                        : "border-[var(--color-border-strong)]/40 text-[var(--color-ink-muted)]"
                    }`}
                  >
                    <span>{category.count}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : "bg-accent"
                      }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
