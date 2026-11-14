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
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
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
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-ink-primary)] transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              data-testid="category-scroll-next"
              aria-label="Scroll categories right"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-ink-primary)] transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Track */}
        <div
          ref={scrollContainerRef}
          data-testid="category-pills-scroll"
          role="tablist"
          aria-label="Service vertical discovery tabs"
          className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory scroll-smooth"
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
                onClick={() => handleSelect(category.id)}
                className="group flex flex-col items-center flex-shrink-0 snap-center focus:outline-none cursor-pointer"
              >
                {/* Circular Swatch */}
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-[var(--color-accent-gold)] ring-offset-2 ring-offset-[var(--background)] scale-105 shadow-md"
                      : "ring-1 ring-[var(--color-border-subtle)] hover:ring-[var(--color-accent-gold)]/60 hover:scale-105 shadow-2xs"
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-[var(--color-canvas-surface)]">
                    <CategorySwatch id={category.id} />
                  </div>
                </div>

                {/* Client Badge */}
                <span className="mt-2 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[#C5A059]">
                  {category.clientBadge}
                </span>

                {/* Category Name */}
                <span
                  data-testid={`category-pill-label-${category.id}`}
                  className={`mt-1.5 text-xs sm:text-sm tracking-tight text-center transition-colors max-w-[120px] sm:max-w-[140px] line-clamp-2 ${
                    isSelected
                      ? "text-[var(--color-ink-primary)] font-bold"
                      : "text-[var(--color-ink-secondary)] font-medium group-hover:text-[var(--color-ink-primary)]"
                  }`}
                >
                  {category.name}
                </span>

                {/* Subtitle / Count Tag */}
                <span className="text-[11px] text-[#9E9E9E] tracking-normal mt-0.5 hidden sm:block max-w-[130px] truncate text-center">
                  {category.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
