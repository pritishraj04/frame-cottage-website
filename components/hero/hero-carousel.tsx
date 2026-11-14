"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Compass,
  Cpu,
  Layers,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  UploadCloud,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  id: string;
  eyebrow: string;
  eyebrowIcon: typeof Sparkles;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  badgeText: string;
  theme: "light" | "dark";
  renderVisual: () => React.ReactNode;
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const slides: CarouselSlide[] = [
    {
      id: "slide-bespoke-framing",
      eyebrow: "Bespoke Art & Custom Framing",
      eyebrowIcon: Sparkles,
      title: "Bespoke Art & Archival Custom Framing",
      subtitle:
        "Gallery-quality fine art printing, canvas stretching, and archival-grade framing precision-milled from Appalachian hardwoods and hand-joined with master splines.",
      primaryCtaText: "Customise Your Frame",
      primaryCtaLink: "/customizer",
      secondaryCtaText: "Explore Collections",
      secondaryCtaLink: "/services/bespoke-framing",
      badgeText: "Gallery-Quality Fine Art Printing & Archival Joinery",
      theme: "light",
      renderVisual: () => (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-md group-hover:scale-105 group-hover:border-[var(--color-accent-gold)] transition-all duration-300 mb-4">
            <UploadCloud className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="font-mono text-base sm:text-lg font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">
            Full Bleed PNG Hero Asset 1: Bespoke Art &amp; Custom Framing
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed mt-2 max-w-sm font-sans">
            Designer to place transparent or styled PNG render here (e.g.{" "}
            <code className="px-1.5 py-0.5 rounded bg-[var(--color-canvas-base)] text-[var(--color-accent-gold)] font-mono text-[11px] border border-[var(--color-border-subtle)]">
              /public/images/hero-slide-bespoke-framing.png
            </code>
            , 1200×900 or 1920×1080).
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/80 text-[11px] font-mono text-[var(--color-ink-secondary)] shadow-2xs mt-4">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
            <span>Format: Transparent PNG • High-Res 300 DPI</span>
          </div>
        </div>
      ),
    },
    {
      id: "slide-spatial-signage",
      eyebrow: "Spatial Design & Signage",
      eyebrowIcon: Compass,
      title: "Spatial Design & Architectural Signage",
      subtitle:
        "Complete environmental branding, architectural wayfinding, exterior commercial signage, and custom illuminated LED displays engineered for commercial campuses.",
      primaryCtaText: "Customise Your Frame",
      primaryCtaLink: "/customizer",
      secondaryCtaText: "Explore Collections",
      secondaryCtaLink: "/services/spatial-signage",
      badgeText: "Architectural Wayfinding & 3D Illuminated LED",
      theme: "light",
      renderVisual: () => (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-md group-hover:scale-105 group-hover:border-[var(--color-accent-gold)] transition-all duration-300 mb-4">
            <UploadCloud className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="font-mono text-base sm:text-lg font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">
            Full Bleed PNG Hero Asset 2: Spatial Design &amp; Signage
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed mt-2 max-w-sm font-sans">
            Designer to place transparent or styled PNG render here (e.g.{" "}
            <code className="px-1.5 py-0.5 rounded bg-[var(--color-canvas-base)] text-[var(--color-accent-gold)] font-mono text-[11px] border border-[var(--color-border-subtle)]">
              /public/images/hero-slide-spatial-signage.png
            </code>
            , 1200×900 or 1920×1080).
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/80 text-[11px] font-mono text-[var(--color-ink-secondary)] shadow-2xs mt-4">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
            <span>Format: Transparent PNG • High-Res 300 DPI</span>
          </div>
        </div>
      ),
    },
    {
      id: "slide-industrial-civic",
      eyebrow: "Industrial Fabrication & Civic Projects",
      eyebrowIcon: Cpu,
      title: "Industrial Fabrication & Civic Projects",
      subtitle:
        "Precision manufacturing, 5-axis CNC routing, fiber laser cutting, and scalable execution of municipal signage, civic installations, and public sector tenders.",
      primaryCtaText: "Customise Your Frame",
      primaryCtaLink: "/customizer",
      secondaryCtaText: "Explore Collections",
      secondaryCtaLink: "/services/civic-projects",
      badgeText: "Precision CNC Metalworks & GeM Certified",
      theme: "light",
      renderVisual: () => (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-md group-hover:scale-105 group-hover:border-[var(--color-accent-gold)] transition-all duration-300 mb-4">
            <UploadCloud className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="font-mono text-base sm:text-lg font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">
            Full Bleed PNG Hero Asset 3: Industrial Fabrication &amp; Civic Projects
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed mt-2 max-w-sm font-sans">
            Designer to place transparent or styled PNG render here (e.g.{" "}
            <code className="px-1.5 py-0.5 rounded bg-[var(--color-canvas-base)] text-[var(--color-accent-gold)] font-mono text-[11px] border border-[var(--color-border-subtle)]">
              /public/images/hero-slide-industrial-civic.png
            </code>
            , 1200×900 or 1920×1080).
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/80 text-[11px] font-mono text-[var(--color-ink-secondary)] shadow-2xs mt-4">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
            <span>Format: Transparent PNG • High-Res 300 DPI</span>
          </div>
        </div>
      ),
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const active = slides[currentSlide];
  const EyebrowIcon = active.eyebrowIcon;

  return (
    <section
      aria-label="Frame Cottage Studio Showcase"
      data-testid="hero-carousel"
      id="hero-image-carousel"
      className="relative w-full bg-[var(--background)] overflow-hidden border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            data-testid="hero-carousel-slide"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-primary)] shadow-2xs">
                <EyebrowIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{active.eyebrow}</span>
              </div>

              {/* Apple-grade Display Typography */}
              <h1
                data-testid="hero-headline"
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-ink-primary)] leading-[1.08]"
              >
                {active.title}
              </h1>

              {/* Subheadline */}
              <p
                data-testid="hero-subheadline"
                className="text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed max-w-2xl"
              >
                {active.subtitle}
              </p>

              {/* Dual CTA Button Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={active.primaryCtaLink}
                  data-testid="cta-customise-frame"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-accent-gold)] hover:bg-[#B38F48] text-[#1A1A1A] font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span>{active.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={active.secondaryCtaLink}
                  data-testid="cta-explore-collections"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <span>{active.secondaryCtaText}</span>
                </Link>
              </div>

              {/* Trust Micro-Badge */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[var(--color-ink-secondary)] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{active.badgeText}</span>
              </div>
            </div>

            {/* Right Column: Spatial Designer Container Stage with Prominent Dashed Box */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div
                data-testid="hero-png-dropzone"
                className="w-full min-h-[380px] sm:min-h-[460px] border-4 border-dashed border-[var(--color-border-strong)]/70 rounded-3xl bg-[var(--color-canvas-subtle)]/60 flex flex-col items-center justify-between text-center p-6 sm:p-10 group hover:border-[var(--color-accent-gold)] transition-colors duration-300 relative overflow-hidden backdrop-blur-xs"
              >
                {/* Top Bar with Badge and Aspect Ratio Tag */}
                <div className="flex items-center justify-between gap-3 w-full mb-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-[var(--color-canvas-base)]/80 text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Hero Asset Drop Zone
                  </span>
                  <div className="text-[11px] font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-2.5 py-0.5 rounded-full bg-[var(--color-canvas-base)]/40">
                    16:9 Full Bleed • 1920×1080 / 1200×900
                  </div>
                </div>

                {/* Center Visual / Artwork Canvas */}
                <div className="relative w-full flex flex-col items-center justify-center my-auto z-10">
                  {active.renderVisual()}
                  <span className="sr-only">Designer Canvas Drop Zone</span>
                </div>

                {/* Bottom Bar: Specifications & Drop Zone Guides */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 mt-4 border-t border-dashed border-[var(--color-border-strong)]/40 w-full z-10 text-[11px] font-mono text-[var(--color-ink-muted)]">
                  <span className="truncate">{active.badgeText}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
                    <span>Format: Transparent PNG • High-Res 300 DPI</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Bar (Bottom Controls) */}
        <div
          data-testid="hero-carousel-indicators"
          className="mt-8 pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between"
        >
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                data-testid={`hero-carousel-indicator-${index}`}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  currentSlide === index
                    ? "w-8 bg-[var(--color-accent-gold)]"
                    : "w-2 bg-[var(--color-border-subtle)] hover:bg-[var(--color-ink-muted)]"
                )}
              />
            ))}
          </div>

          {/* Previous / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              data-testid="hero-carousel-prev"
              data-test-alias="hero-prev-btn"
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-ink-primary)] transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              data-testid="hero-carousel-next"
              data-test-alias="hero-next-btn"
              aria-label="Next slide"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-ink-primary)] transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
