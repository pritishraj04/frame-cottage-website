"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Compass,
  Cpu,
  CheckCircle2,
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
  cutoutImage: string;
  specs: string;
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
      cutoutImage: "/images/hero/hero-cutout-bespoke-framing.png",
      specs: "Appalachian Walnut • 4-Ply Cotton Rag • Optium Glazing",
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
      cutoutImage: "/images/hero/hero-cutout-spatial-signage.png",
      specs: "Grade 6061-T6 Aluminum • 3000K Halo LED • Standoff Mounts",
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
      cutoutImage: "/images/hero/hero-cutout-industrial-cnc.png",
      specs: "5-Axis CNC Laser • 5.0mm Solid Brass • GeM Tender Certified",
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
      className="relative w-full min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] bg-[var(--background)] overflow-hidden border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Atmospheric Studio Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-gold)/6%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,var(--background)_100%)] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 w-full flex-1 flex flex-col justify-between relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            data-testid="hero-carousel-slide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-1 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8"
          >
            {/* Editorial Headline & Studio CTAs */}
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-primary)] shadow-2xs">
                <EyebrowIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{active.eyebrow}</span>
              </div>

              {/* Apple-grade Serif Display Typography */}
              <h1
                data-testid="hero-headline"
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-ink-primary)] leading-[1.08]"
              >
                {active.title}
              </h1>

              {/* Subheadline */}
              <p
                data-testid="hero-subheadline"
                className="text-sm sm:text-base lg:text-lg text-[var(--color-ink-secondary)] leading-relaxed max-w-2xl font-sans"
              >
                {active.subtitle}
              </p>

              {/* Dual CTA Button Group + Trust Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
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

                {/* Trust Micro-Badge */}
                <div className="sm:ml-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--color-canvas-subtle)]/60 border border-[var(--color-border-subtle)]/60 text-xs text-[var(--color-ink-secondary)] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="truncate max-w-[240px] sm:max-w-none">{active.badgeText}</span>
                </div>
              </div>
            </div>

            {/* Full-Stage Designer PNG Dropzone Canvas with Placed High-Resolution Transparent Cutout */}
            <div
              data-testid="hero-png-dropzone"
              className="w-full relative border-2 border-dashed border-[var(--color-border-strong)]/40 rounded-3xl p-4 sm:p-6 bg-[var(--color-canvas-subtle)]/40 backdrop-blur-xs flex flex-col justify-between group hover:border-[var(--color-accent-gold)]/70 transition-colors duration-300 shadow-xl overflow-hidden"
            >
              {/* Top Specification Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 w-full pb-3 border-b border-dashed border-[var(--color-border-strong)]/30 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-[var(--color-canvas-base)]/80 text-[var(--color-accent-gold)] border border-[var(--color-border-subtle)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Hero Asset Drop Zone
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-canvas-base)]/60 text-[var(--color-ink-secondary)] text-[11px] border border-[var(--color-border-subtle)]/60">
                    Asset: <code className="text-[var(--color-accent-gold)]">{active.cutoutImage}</code>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[var(--color-ink-muted)]">
                  <span className="px-2.5 py-1 rounded-full bg-[var(--color-canvas-base)]/50 border border-dashed border-[var(--color-border-strong)]/50">
                    Full Bleed Stage • 1400×1050 Master
                  </span>
                  <span className="hidden md:inline-block px-2.5 py-1 rounded-full bg-[var(--color-canvas-base)]/50 border border-[var(--color-border-subtle)]">
                    {active.specs}
                  </span>
                </div>
              </div>

              {/* Center Stage: High-Resolution Transparent Cutout PNG Showcase */}
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] flex items-center justify-center my-3 sm:my-5 overflow-visible">
                <Image
                  src={active.cutoutImage}
                  alt={active.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Bottom Specification & Format Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-dashed border-[var(--color-border-strong)]/30 w-full text-[11px] font-mono text-[var(--color-ink-muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
                  <span>Format: Transparent PNG • High-Res 300 DPI</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="truncate">{active.badgeText}</span>
                  <span className="hidden sm:inline text-[var(--color-accent-gold)] font-medium">
                    True Alpha Channel Cutout
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Bar (Bottom Controls) */}
        <div
          data-testid="hero-carousel-indicators"
          className="mt-6 pt-5 border-t border-[var(--color-border-subtle)] flex items-center justify-between w-full"
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

          {/* Slide Progress / Counter */}
          <div className="text-xs font-mono text-[var(--color-ink-muted)] tracking-wider">
            <span className="text-[var(--color-accent-gold)] font-bold">0{currentSlide + 1}</span>
            <span className="mx-1 opacity-50">/</span>
            <span>0{totalSlides}</span>
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
