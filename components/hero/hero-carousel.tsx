"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  LayoutGrid,
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
  renderVisual: () => React.ReactNode;
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const slides: CarouselSlide[] = [
    {
      id: "slide-architectural",
      eyebrow: "Bespoke Framing Atelier",
      eyebrowIcon: Sparkles,
      title: "Bespoke Framing. Crafted for Life's Masterpieces.",
      subtitle:
        "Every frame is precision-milled from sustainably harvested Appalachian hardwoods and hand-joined by master artisans. Receive your archival piece ready to hang.",
      primaryCtaText: "Customise Your Frame",
      primaryCtaLink: "/customizer",
      secondaryCtaText: "Explore Collections",
      secondaryCtaLink: "/ready-made",
      badgeText: "100% Solid Appalachian Hardwood",
      theme: "light",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
          {/* Architectural Living Room Scene */}
          <div className="relative w-full max-w-lg lg:max-w-xl aspect-[4/3] flex items-center justify-center">
            {/* Wall Daylight Bloom */}
            <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full bg-gradient-to-br from-white/70 via-amber-50/30 to-transparent blur-3xl pointer-events-none" />

            {/* Credenza Base Horizon Line */}
            <div className="absolute bottom-4 left-0 right-0 h-14 bg-gradient-to-t from-[#D6CFBE]/40 to-transparent border-t border-[#D2D2D7]/60 pointer-events-none" />
            
            {/* Minimalist Designer Credenza */}
            <div className="absolute bottom-0 w-3/4 h-7 rounded-t-sm bg-[#5C4230] shadow-md border-t border-[#785741] flex items-center justify-between px-6">
              <div className="w-10 h-1 bg-[#3E2C1F]/60 rounded-full" />
              <div className="w-10 h-1 bg-[#3E2C1F]/60 rounded-full" />
            </div>

            {/* Statement Framed Art in Living Room Setting */}
            <div
              className="relative p-4 sm:p-5 rounded-xs transition-transform duration-700 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, #4A3324 0%, #2E1F16 50%, #1E140E 100%)",
                boxShadow: "0 28px 56px -12px rgba(0, 0, 0, 0.28), 0 10px 24px -6px rgba(0, 0, 0, 0.12)",
                border: "1px solid #5F4230",
              }}
            >
              {/* Inner Lip */}
              <div className="p-0.5 border border-black/40 rounded-xs">
                {/* 4-Ply Archival Cotton Mat */}
                <div className="p-5 sm:p-7 bg-[#FAF9F6] shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)] border border-[#EBE5DB]">
                  {/* Artwork Canvas */}
                  <div className="relative w-44 h-56 sm:w-56 sm:h-72 bg-[#F6F2EA] flex flex-col items-center justify-between p-4 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]">
                    {/* Archival Texture */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8C7765_1px,transparent_1px)] [background-size:10px_10px]" />
                    
                    {/* Art Header */}
                    <div className="relative z-10 w-full text-center">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-[#86868B] font-medium">
                        Atelier Monograph • No. VII
                      </span>
                      <div className="mx-auto my-1 w-6 h-[1px] bg-[#B88E56]/60" />
                    </div>

                    {/* Geometric Abstract Centerpiece SVG */}
                    <div className="relative z-10 my-auto">
                      <svg viewBox="0 0 120 140" className="w-28 h-36 sm:w-36 sm:h-44 text-[#1D1D1F]" fill="none">
                        <circle cx="60" cy="50" r="34" fill="#B88E56" fillOpacity="0.25" stroke="#B88E56" strokeWidth="1.2" />
                        <path d="M26 120 C 26 80, 94 80, 94 120 Z" fill="#1D1D1F" />
                        <circle cx="60" cy="50" r="16" fill="#1D1D1F" />
                        <line x1="15" y1="120" x2="105" y2="120" stroke="#86868B" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="78" cy="38" r="4" fill="#B88E56" />
                      </svg>
                    </div>

                    {/* Taxonomy Footer */}
                    <div className="relative z-10 w-full text-center">
                      <p className="font-sans text-[11px] font-medium tracking-tight text-[#1D1D1F]">
                        Composition in Form & Negative Space
                      </p>
                      <p className="text-[8px] uppercase tracking-[0.18em] text-[#86868B]">
                        310gsm German Etching Cotton Rag
                      </p>
                    </div>

                    {/* TruVue Glass Sheen Reflection */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* In-Situ Ceramic Accent */}
            <div className="absolute bottom-6 right-6 sm:right-10 flex flex-col items-center pointer-events-none">
              <div className="w-6 h-12 rounded-t-full bg-gradient-to-r from-[#DFD7CB] to-[#C9BFB0] shadow-sm border border-[#BCB1A0]" />
              <div className="w-10 h-2 rounded-full bg-[#1D1D1F]/15 blur-xs" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "slide-gallery-wall",
      eyebrow: "The Salon Collection",
      eyebrowIcon: LayoutGrid,
      title: "The Gallery Wall, Reimagined.",
      subtitle:
        "Curated multi-frame arrangements precision-balanced in natural American Walnut and White Oak. Comes with hanging templates for effortless installation.",
      primaryCtaText: "Customise Your Frame",
      primaryCtaLink: "/customizer",
      secondaryCtaText: "Explore Collections",
      secondaryCtaLink: "/gallery-walls",
      badgeText: "Laser-Aligned Spacing Templates",
      theme: "light",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
          {/* Symmetrical Salon Grid Wall */}
          <div className="relative w-full max-w-lg lg:max-w-xl aspect-[4/3] flex items-center justify-center">
            {/* Gallery Accent Backing Grid */}
            <div className="relative grid grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-br from-white/60 via-white/30 to-white/10 rounded-2xl border border-[#D2D2D7]/60 shadow-xs backdrop-blur-xs">
              {/* Frame 1: American Walnut Portrait */}
              <div
                className="p-2 sm:p-2.5 rounded-xs shadow-md transition-transform duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #442E1F 0%, #2A1C13 100%)",
                  border: "1px solid #5A3E2B",
                }}
              >
                <div className="p-2 sm:p-3 bg-[#FAF8F5] border border-[#EBE3D7]">
                  <div className="w-20 h-26 sm:w-28 sm:h-34 bg-[#F2EDE2] flex items-center justify-center p-2">
                    <svg viewBox="0 0 80 100" className="w-full h-full text-[#3A4A3E]" fill="none">
                      <path d="M40 90 L40 15 M40 30 C 55 25, 65 35, 60 45 C 50 40, 42 42, 40 45" stroke="#483321" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="40" cy="20" r="12" fill="#526454" fillOpacity="0.4" stroke="#3A483B" strokeWidth="0.8" />
                      <circle cx="58" cy="42" r="8" fill="#B88E56" fillOpacity="0.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Frame 2: Natural White Oak Architecture */}
              <div
                className="p-2 sm:p-2.5 rounded-xs shadow-md transition-transform duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #C2A584 0%, #9F8363 100%)",
                  border: "1px solid #D2BA9C",
                }}
              >
                <div className="p-2 sm:p-3 bg-[#FAF8F5] border border-[#EBE3D7]">
                  <div className="w-20 h-26 sm:w-28 sm:h-34 bg-[#F2EDE2] flex items-center justify-center p-2">
                    <svg viewBox="0 0 80 100" className="w-full h-full text-[#1D1D1F]" fill="none">
                      <rect x="15" y="20" width="50" height="60" stroke="#1D1D1F" strokeWidth="1" fill="#E8E3D8" />
                      <line x1="15" y1="50" x2="65" y2="50" stroke="#1D1D1F" strokeWidth="0.8" />
                      <line x1="40" y1="20" x2="40" y2="80" stroke="#1D1D1F" strokeWidth="0.8" />
                      <circle cx="40" cy="50" r="14" fill="#B88E56" fillOpacity="0.4" stroke="#B88E56" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Frame 3: Matte Black Float Minimal */}
              <div
                className="p-2 sm:p-2.5 rounded-xs shadow-md transition-transform duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #242426 0%, #151516 100%)",
                  border: "1px solid #3A3A3D",
                }}
              >
                <div className="p-2 sm:p-3 bg-[#FAF8F5] border border-[#EBE3D7]">
                  <div className="w-20 h-26 sm:w-28 sm:h-34 bg-[#F2EDE2] flex items-center justify-center p-2">
                    <svg viewBox="0 0 80 100" className="w-full h-full text-[#1D1D1F]" fill="none">
                      <path d="M20 70 Q 40 20, 60 70" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
                      <circle cx="40" cy="35" r="7" fill="#B88E56" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Frame 4: Florentine Antique Brass */}
              <div
                className="p-2 sm:p-2.5 rounded-xs shadow-md transition-transform duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #997A15 50%, #68500C 100%)",
                  border: "1px solid #E5C358",
                }}
              >
                <div className="p-2 sm:p-3 bg-[#FAF8F5] border border-[#EBE3D7]">
                  <div className="w-20 h-26 sm:w-28 sm:h-34 bg-[#F2EDE2] flex items-center justify-center p-2">
                    <svg viewBox="0 0 80 100" className="w-full h-full" fill="none">
                      <circle cx="40" cy="50" r="22" stroke="#8F7124" strokeWidth="1.2" strokeDasharray="3 3" />
                      <circle cx="40" cy="50" r="12" fill="#B88E56" fillOpacity="0.3" stroke="#8F7124" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Walnut Credenza Shelf Horizon */}
            <div className="absolute -bottom-2 w-5/6 h-4 rounded-full bg-[#463223] shadow-md border-t border-[#654832]" />
          </div>
        </div>
      ),
    },
    {
      id: "slide-preservation",
      eyebrow: "Museum-Grade Preservation",
      eyebrowIcon: ShieldCheck,
      title: "Museum-Grade Preservation.",
      subtitle:
        "Archival cotton matting, optical conservation glazing blocking 99% of UV rays, and mortise spline joinery engineered to safeguard memories for centuries.",
      primaryCtaText: "Customise Your Frame",
      primaryCtaLink: "/customizer",
      secondaryCtaText: "Explore Collections",
      secondaryCtaLink: "/atelier",
      badgeText: "TruVue® 99% UV-Shield Optical Acrylic",
      theme: "light",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
          {/* Precision Atelier Exploded Layer Perspective */}
          <div className="relative w-full max-w-lg lg:max-w-xl aspect-[4/3] flex items-center justify-center">
            {/* Layer 1: Hand-Milled Walnut Splined Corner */}
            <div
              className="relative w-64 h-72 sm:w-76 sm:h-84 rounded-lg p-5 shadow-2xl transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, #483323 0%, #2A1D14 100%)",
                border: "2px solid #5F422E",
              }}
            >
              {/* Solid Maple Corner Spline Accent */}
              <div className="absolute top-2 left-2 w-7 h-1.5 bg-[#D5BE9B] rotate-45 rounded-xs shadow-xs border border-[#9E8668]" />
              <div className="absolute top-4 left-4 w-7 h-1.5 bg-[#D5BE9B] rotate-45 rounded-xs shadow-xs border border-[#9E8668]" />

              {/* Layer 2: TruVue 99% UV Acrylic Float */}
              <div className="relative w-full h-full rounded-md p-4 bg-gradient-to-tr from-white/95 via-white/80 to-amber-50/70 border border-[#D2D2D7] shadow-inner flex flex-col justify-between">
                {/* 45-degree Bevel Mat Rim */}
                <div className="relative w-full h-full border-4 border-[#F3ECE2] bg-[#FAF8F5] p-4 flex flex-col justify-between items-center text-center shadow-xs">
                  {/* UV Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1D1D1F] text-white text-[10px] font-semibold tracking-wider uppercase">
                    <ShieldCheck className="w-3 h-3 text-[#B88E56]" />
                    <span>99% UV Conservation Glass</span>
                  </div>

                  {/* Botanical Lithograph Detail */}
                  <div className="my-auto">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28 text-[#526454]" fill="none">
                      <path d="M50 85 C 50 60, 50 30, 50 15" stroke="#483321" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M50 40 C 35 30, 20 40, 25 55 C 35 60, 48 50, 50 40 Z" fill="#627865" stroke="#3A483B" strokeWidth="0.8" />
                      <path d="M50 30 C 65 20, 80 30, 75 45 C 65 50, 52 40, 50 30 Z" fill="#758C77" stroke="#3A483B" strokeWidth="0.8" />
                      <circle cx="50" cy="15" r="3" fill="#B88E56" />
                    </svg>
                  </div>

                  {/* Archival Specification Strip */}
                  <div className="w-full pt-2 border-t border-[#D2D2D7]/70 text-[10px] text-[#86868B] flex items-center justify-between">
                    <span>100% Cotton Rag Core</span>
                    <span className="font-semibold text-[#1D1D1F]">Acid-Free</span>
                  </div>
                </div>

                {/* Optical Glazing Glare Simulation */}
                <div className="absolute inset-0 rounded-md pointer-events-none bg-gradient-to-tr from-transparent via-violet-500/5 to-transparent border border-white/40" />
              </div>
            </div>
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-rotation with hover pause
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    if (deltaX > minSwipeDistance) {
      nextSlide();
    } else if (deltaX < -minSwipeDistance) {
      prevSlide();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeSlide = slides[currentSlide];
  const EyebrowIcon = activeSlide.eyebrowIcon;

  return (
    <section
      aria-label="Frame Cottage Bespoke Framing Hero Carousel"
      aria-roledescription="carousel"
      data-testid="hero-carousel"
      className="relative w-full overflow-hidden bg-[#1A1A1A] border-b border-[#333333] h-[520px] sm:h-[600px] lg:h-[700px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Subtle Ambient Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#6B1C23]/15 via-[#C5A059]/10 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center relative z-10">
        <div
          data-testid="hero-carousel-slide"
          role="group"
          aria-roledescription="slide"
          aria-label={`${currentSlide + 1} of ${totalSlides}`}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-700 ease-in-out"
        >
          {/* Left Column: Editorial Headline, Subtitle, Dual CTAs & Trust Badge */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            {/* Museum-style Frosted Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#242424]/90 border border-[#333333] text-xs font-semibold uppercase tracking-[0.18em] text-[#F4F1EA] shadow-2xs backdrop-blur-md">
              <EyebrowIcon className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{activeSlide.eyebrow}</span>
            </div>

            {/* Museum Serif Elegant Headline */}
            <h1
              data-testid="hero-headline"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4F1EA] leading-[1.08]"
            >
              {activeSlide.title}
            </h1>

            {/* Subheadline */}
            <p
              data-testid="hero-subheadline"
              className="text-sm sm:text-base lg:text-lg text-[#E0E0E0] leading-relaxed max-w-xl font-normal"
            >
              {activeSlide.subtitle}
            </p>

            {/* Dual CTAs in Museum Muted Gold and Rich Burgundy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href={activeSlide.primaryCtaLink}
                data-testid="cta-customise-frame"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#B38F48] text-[#1A1A1A] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg group cursor-pointer"
              >
                <span>{activeSlide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={activeSlide.secondaryCtaLink}
                data-testid="cta-explore-collections"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#6B1C23] hover:border-[#C5A059] bg-[#6B1C23]/25 hover:bg-[#6B1C23]/40 text-[#F4F1EA] text-xs sm:text-sm font-medium backdrop-blur-md transition-all shadow-2xs cursor-pointer"
              >
                <span>{activeSlide.secondaryCtaText}</span>
              </Link>
            </div>

            {/* Slide Sub-Badge Trust Signal */}
            <div className="inline-flex items-center gap-2 pt-2 text-xs text-[#E0E0E0]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-medium text-[#F4F1EA]">{activeSlide.badgeText}</span>
              <span>• Handcrafted in 5–7 Days</span>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Scene */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            {activeSlide.renderVisual()}
          </div>
        </div>
      </div>

      {/* Glassmorphic Carousel Left/Right Navigation Controls */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        data-testid="hero-carousel-prev"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#242424]/80 hover:bg-[#2A2A2A] text-[#F4F1EA] border border-[#333333] backdrop-blur-md flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        data-testid="hero-carousel-next"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#242424]/80 hover:bg-[#2A2A2A] text-[#F4F1EA] border border-[#333333] backdrop-blur-md flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Museum-Style Bottom Pill Progress Indicators */}
      <div
        data-testid="hero-carousel-indicators"
        role="tablist"
        aria-label="Carousel slide pagination"
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-y-0 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#242424]/80 backdrop-blur-md border border-[#333333] shadow-xs"
      >
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              data-testid={`hero-carousel-indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={cn(
                "transition-all duration-300 rounded-full cursor-pointer",
                isActive
                  ? "w-7 h-2 bg-[#C5A059]"
                  : "w-2 h-2 bg-[#444444] hover:bg-[#666666]"
              )}
            />
          );
        })}
      </div>
    </section>
  );
}
