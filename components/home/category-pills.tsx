"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CategorySwatch } from "./category-swatches";

export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  count: string;
  href: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "solid-hardwoods",
    name: "Solid Hardwoods",
    subtitle: "Natural Walnut & Oak Woodgrain",
    count: "24 Styles",
    href: "/collections/solid-hardwoods",
  },
  {
    id: "brushed-metals",
    name: "Brushed Metals",
    subtitle: "Antique Brass & Metallic Sheen",
    count: "18 Styles",
    href: "/collections/brushed-metals",
  },
  {
    id: "vintage-gilded",
    name: "Vintage & Gilded",
    subtitle: "Warm Gold Foil Bevel",
    count: "14 Styles",
    href: "/collections/vintage-gilded",
  },
  {
    id: "gallery-wall-sets",
    name: "Gallery Wall Sets",
    subtitle: "Miniature Triptych Layout",
    count: "12 Curations",
    href: "/collections/gallery-walls",
  },
  {
    id: "tabletop-minis",
    name: "Tabletop & Minis",
    subtitle: "Desk Frame with Easel Back",
    count: "16 Styles",
    href: "/collections/tabletop-minis",
  },
  {
    id: "archival-shadowboxes",
    name: "Archival Shadowboxes",
    subtitle: "Deep Dimensional Shadowbox",
    count: "10 Styles",
    href: "/collections/shadowboxes",
  },
];

interface CategoryPillsProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export function CategoryPills({
  activeCategory = "solid-hardwoods",
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
      aria-label="Visual Category Discovery"
      data-testid="category-pills"
      className="w-full bg-[#F5F5F7] py-10 lg:py-14 border-b border-[#D2D2D7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Scroll Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1D1D1F] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B88E56]" />
              <span>Curated by Silhouette & Craft</span>
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
              Visual Category Discovery
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#86868B] max-w-xl">
              Explore bespoke mouldings across authentic North American hardwoods, spun metals, and heirloom arrangements.
            </p>
          </div>

          {/* Smooth Carousel Scroll Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => scroll("left")}
              data-testid="category-scroll-prev"
              aria-label="Scroll categories left"
              className="w-9 h-9 rounded-full border border-[#D2D2D7] hover:border-[#1D1D1F] bg-[#FFFFFF] hover:bg-[#E8E8ED] flex items-center justify-center text-[#1D1D1F] transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              data-testid="category-scroll-next"
              aria-label="Scroll categories right"
              className="w-9 h-9 rounded-full border border-[#D2D2D7] hover:border-[#1D1D1F] bg-[#FFFFFF] hover:bg-[#E8E8ED] flex items-center justify-center text-[#1D1D1F] transition-all duration-200 cursor-pointer shadow-2xs"
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
          aria-label="Category filter tabs"
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
                      ? "ring-2 ring-[#1D1D1F] ring-offset-2 ring-offset-[#F5F5F7] scale-105 shadow-md"
                      : "ring-1 ring-[#D2D2D7] hover:ring-[#86868B] hover:scale-105 shadow-2xs"
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-[#E8E8ED]">
                    <CategorySwatch id={category.id} />
                  </div>
                </div>

                {/* Category Name */}
                <span
                  data-testid={`category-pill-label-${category.id}`}
                  className={`mt-3 text-xs sm:text-sm tracking-tight text-center transition-colors max-w-[110px] sm:max-w-[130px] line-clamp-1 ${
                    isSelected
                      ? "text-[#1D1D1F] font-bold"
                      : "text-[#1D1D1F] font-medium group-hover:text-[#86868B]"
                  }`}
                >
                  {category.name}
                </span>

                {/* Subtitle / Count Tag */}
                <span className="text-[11px] text-[#86868B] tracking-normal mt-0.5 hidden sm:block">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
