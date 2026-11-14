"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Frame,
  Palette,
  Compass,
  Cpu,
  Award,
  Landmark,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Maximize2,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

interface HeroSlide {
  id: string;
  verticalId: string;
  badge: string;
  title: string;
  tagline: string;
  specs: string;
  aspectRatio: string;
  href: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    verticalId: "bespoke-framing",
    badge: "B2C / B2B • Bespoke Framing",
    title: "Bespoke Art & Archival Custom Framing",
    tagline: "Fine Art Printing, Canvas Stretching & Archival Preservation",
    specs: "Museum UV99 Glazing • FSC® Hardwood Core • Acid-Free 4-Ply Mat",
    aspectRatio: "16:9 Full-Bleed Spatial Canvas",
    href: "/services/bespoke-framing",
  },
  {
    id: "slide-2",
    verticalId: "spatial-signage",
    badge: "B2B • Spatial Design",
    title: "Spatial Design & Architectural Signage",
    tagline: "Wayfinding Systems, Dimensional Acrylic & LED Signage",
    specs: "Edge-Lit Acrylic • Precision Dimensional Brass • Architectural Wayfinding",
    aspectRatio: "16:9 Full-Bleed Spatial Canvas",
    href: "/services/spatial-signage",
  },
  {
    id: "slide-3",
    verticalId: "industrial-cnc",
    badge: "Commercial & Public Sector",
    title: "Industrial Fabrication & Civic Projects",
    tagline: "Heavy CNC Milling, Architectural Metalworks & GeM Certified",
    specs: "Aerospace Aluminium • Laser-Cut Brass • GeM Registered & ISO 9001",
    aspectRatio: "16:9 Full-Bleed Spatial Canvas",
    href: "/services/industrial-cnc",
  },
];

interface ServiceVerticalItem {
  id: string;
  name: string;
  audienceBadge: string;
  audienceFull: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  specLabel: string;
}

const SERVICE_VERTICALS: ServiceVerticalItem[] = [
  {
    id: "retail-framing",
    name: "Retail & Standard Framing",
    audienceBadge: "B2C",
    audienceFull: "B2C / Residential",
    icon: Frame,
    href: "/services/retail-framing",
    specLabel: "Standard Displays & Gallery Wall Kits",
  },
  {
    id: "bespoke-framing",
    name: "Bespoke Art & Custom Framing",
    audienceBadge: "B2C / B2B",
    audienceFull: "B2C / B2B Fine Art",
    icon: Palette,
    href: "/services/bespoke-framing",
    specLabel: "Fine Art Printing & Archival Shadowboxes",
  },
  {
    id: "spatial-signage",
    name: "Spatial Design & Signage",
    audienceBadge: "B2B",
    audienceFull: "B2B Architecture",
    icon: Compass,
    href: "/services/spatial-signage",
    specLabel: "Wayfinding Systems & Dimensional Acrylic",
  },
  {
    id: "industrial-cnc",
    name: "Industrial Fabrication & CNC Metalworks",
    audienceBadge: "Commercial",
    audienceFull: "Commercial & Industrial",
    icon: Cpu,
    href: "/services/industrial-cnc",
    specLabel: "Heavy CNC Milling & Perforated Metal",
  },
  {
    id: "custom-gifting",
    name: "Custom Gifting & Mementos",
    audienceBadge: "Corporate",
    audienceFull: "Corporate & Mementos",
    icon: Award,
    href: "/services/custom-gifting",
    specLabel: "Executive Awards & Custom Presentation Boxes",
  },
  {
    id: "civic-projects",
    name: "Government & Civic Projects",
    audienceBadge: "Public Sector",
    audienceFull: "Public Sector & Civic",
    icon: Landmark,
    href: "/services/civic-projects",
    specLabel: "GeM Tender Compliance & Monumental Installs",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-accent-gold)]/20 selection:text-[var(--color-accent-gold)]">
      <SiteHeader />

      <main className="flex-1 w-full flex flex-col overflow-x-hidden">
        {/* ================================================================= */}
        {/* SECTION 1: Full-Image PNG Hero Carousel (AnimatePresence)          */}
        {/* ================================================================= */}
        <section
          data-testid="hero-image-carousel"
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Full-Image PNG Hero Carousel"
        >
          <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                data-testid="hero-carousel-slide"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                {/* Dedicated spatial container with dashed border for designer PNG asset */}
                <div className="w-full h-[400px] sm:h-[460px] lg:h-[520px] border-2 border-dashed border-[var(--color-border-strong)]/60 rounded-2xl bg-[var(--color-canvas-subtle)]/50 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-xs group hover:border-[var(--color-accent-gold)]/60 transition-colors duration-500">
                  {/* Top Bar of Spatial Container */}
                  <div className="flex items-center justify-between gap-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-[var(--color-canvas-base)]/80 text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)]">
                      <Sparkles className="w-3.5 h-3.5" />
                      {activeSlide.badge}
                    </span>

                    <div className="text-[11px] font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-3 py-1 rounded-full bg-[var(--color-canvas-base)]/40">
                      {activeSlide.aspectRatio}
                    </div>
                  </div>

                  {/* Center Canvas Drop Zone */}
                  <div className="my-auto flex flex-col items-center justify-center text-center p-4 z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] flex items-center justify-center text-[var(--color-accent-gold)] mb-4 bg-[var(--color-canvas-base)]/50 group-hover:scale-105 transition-transform duration-500">
                      <Maximize2 className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-mono text-[var(--color-accent-gold)] mb-1">
                      Designer Canvas Drop Zone
                    </span>
                    <h1
                      data-testid="hero-headline"
                      className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium text-[var(--foreground)] tracking-tight max-w-3xl"
                    >
                      {activeSlide.title}
                    </h1>
                    <p
                      data-testid="hero-subheadline"
                      className="text-sm sm:text-base font-sans text-[var(--color-ink-muted)] max-w-xl mt-2 line-clamp-2"
                    >
                      {activeSlide.tagline}
                    </p>
                  </div>

                  {/* Bottom Bar: Specifications & Drop Zone Guides */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-dashed border-[var(--color-border-strong)]/40 z-10 text-xs font-mono text-[var(--color-ink-muted)]">
                    <span className="truncate">{activeSlide.specs}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
                      <span>PNG Full-Bleed Asset Layer</span>
                    </div>
                  </div>

                  {/* Subtle Background Pattern Accent */}
                  <div className="absolute inset-0 bg-radial from-[var(--color-accent-gold)]/5 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Manual Controls & Slide Indicator Dots */}
          <div className="flex items-center justify-between max-w-md mx-auto mt-6 px-4">
            <button
              type="button"
              data-testid="carousel-prev-btn"
              onClick={() =>
                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
              }
              className="p-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--foreground)] hover:border-[var(--color-accent-gold)] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div
              data-testid="carousel-indicators"
              className="flex items-center gap-3"
            >
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  data-testid={`carousel-dot-${idx}`}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-8 bg-[var(--color-accent-gold)]"
                      : "w-2.5 bg-[var(--color-border-strong)]/60 hover:bg-[var(--color-border-strong)]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  aria-current={currentSlide === idx ? "true" : "false"}
                />
              ))}
            </div>

            <button
              type="button"
              data-testid="carousel-next-btn"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] hover:text-[var(--foreground)] hover:border-[var(--color-accent-gold)] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 2: 6 Core Service Verticals Staggered Grid (motion.div)   */}
        {/* ================================================================= */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          data-testid="core-service-verticals-grid"
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
          aria-label="Core Service Verticals Grid"
        >
          {/* Section Title Graphic Spatial Container (Dashed Border) */}
          <motion.div
            variants={fadeUp}
            data-testid="section-title-graphic"
            className="w-full mb-10 sm:mb-12 border-2 border-dashed border-[var(--color-border-strong)]/60 rounded-2xl bg-[var(--color-canvas-subtle)]/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent-gold)] font-mono font-medium">
                Capabilities Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--foreground)] font-medium mt-1">
                6 Core Service Verticals
              </h2>
            </div>
            <div className="text-xs font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-4 py-2 rounded-full bg-[var(--color-canvas-base)]/40">
              Designer Section Title Graphic Drop Zone
            </div>
          </motion.div>

          {/* 6 Responsive Cards (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICE_VERTICALS.map((vertical) => {
              const Icon = vertical.icon;
              return (
                <motion.div
                  key={vertical.id}
                  variants={fadeUp}
                  data-testid={`service-vertical-card-${vertical.id}`}
                  className="aspect-[4/5] group relative rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)] shadow-sm hover:shadow-xl transition-all duration-500 p-6 flex flex-col justify-between"
                >
                  {/* Spatial dashed container for designer PNG asset with hover scale */}
                  <div className="flex-1 w-full border-2 border-dashed border-[var(--color-border-strong)]/40 rounded-xl bg-[var(--color-canvas-subtle)]/60 flex flex-col items-center justify-center p-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-canvas-base)]/60 border border-[var(--color-border-strong)]/40 flex items-center justify-center text-[var(--color-accent-gold)] mb-3 group-hover:border-[var(--color-accent-gold)] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-muted)] text-center">
                      PNG Asset Drop Zone
                    </span>
                    <span className="text-[10px] text-[var(--color-ink-muted)]/70 mt-1 font-mono text-center">
                      {vertical.specLabel}
                    </span>
                  </div>

                  {/* Crisp Vertical Title and Audience Badge */}
                  <div className="pt-4 flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-[var(--color-canvas-subtle)] text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)] mb-1.5">
                        {vertical.audienceBadge}
                      </span>
                      <h3 className="text-lg font-serif font-medium text-[var(--foreground)] group-hover:text-[var(--color-accent-gold)] transition-colors line-clamp-1">
                        {vertical.name}
                      </h3>
                      <p className="text-xs font-sans text-[var(--color-ink-muted)] line-clamp-1">
                        {vertical.audienceFull}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-ink-muted)] group-hover:text-[var(--foreground)] group-hover:border-[var(--color-accent-gold)] transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ================================================================= */}
        {/* SECTION 3: Featured Product & Capability Highlight (motion.div)   */}
        {/* ================================================================= */}
        <motion.section
          data-testid="featured-product-highlight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[var(--color-border-subtle)]"
          aria-label="Featured Product and Capability Highlight"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column: Aspect-Square Floating / Shadow Frame & CNC Drop Zone */}
            <div
              data-testid="featured-product-canvas-dropzone"
              className="aspect-square w-full rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/50 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group hover:border-[var(--color-accent-gold)]/60 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] flex items-center justify-center text-[var(--color-accent-gold)] mb-4 bg-[var(--color-canvas-base)]/50 group-hover:scale-105 transition-transform duration-500">
                <Layers className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[var(--color-accent-gold)] mb-1">
                Featured Asset Container
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[var(--foreground)]">
                Floating / Shadow Frame & CNC Design Drop Zone
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[var(--color-ink-muted)] mt-2 max-w-md">
                Dedicated spatial canvas for transparent high-resolution PNG renders, 3D shadowbox assets, and architectural fabrication details.
              </p>
              <div className="mt-4 px-3 py-1.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[11px] font-mono text-[var(--color-ink-muted)] bg-[var(--color-canvas-base)]/40">
                1:1 Aspect Ratio • Full-Bleed PNG Asset
              </div>
            </div>

            {/* Right Column: Clean Spatial Containers with Dashed Borders */}
            <div className="flex flex-col gap-6">
              {/* Product Typography / Title Graphic Container */}
              <div
                data-testid="featured-product-title-container"
                className="h-12 border-2 border-dashed border-[var(--color-border-strong)]/60 rounded-xl bg-[var(--color-canvas-subtle)]/40 flex items-center justify-between px-4"
              >
                <span className="text-sm font-serif font-medium text-[var(--foreground)]">
                  The Mendocino Heritage Walnut & Floating Canvas
                </span>
                <span className="text-[11px] font-mono text-[var(--color-accent-gold)] border border-dashed border-[var(--color-border-strong)] px-2.5 py-0.5 rounded-full">
                  Title Graphic Container (h-12)
                </span>
              </div>

              {/* Product Description / Details Container */}
              <div
                data-testid="featured-product-details-container"
                className="h-32 border-2 border-dashed border-[var(--color-border-strong)]/60 rounded-xl bg-[var(--color-canvas-subtle)]/40 flex flex-col justify-center p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-gold)]">
                    Specification & Details Graphic Container (h-32)
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                    FSC® American Walnut
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-[var(--color-ink-muted)] line-clamp-3">
                  Precision-milled FSC® Appalachian Walnut casing with 4-ply acid-free conservation rag matting, Tru Vue® Conservation Clear acrylic, and archival mounting hardware.
                </p>
              </div>

              {/* CTA Button Design Container */}
              <div className="pt-2">
                <button
                  type="button"
                  data-testid="featured-product-cta-container"
                  className="h-12 w-44 border-2 border-dashed border-[var(--color-border-strong)] rounded-full flex items-center justify-center bg-[var(--color-accent-gold)] text-[#1A1A1A] font-semibold cursor-pointer hover:opacity-95 transition-opacity shadow-sm"
                >
                  <span className="text-xs uppercase tracking-wider font-mono font-bold">
                    Request Spec
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
