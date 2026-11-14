"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
          {/* Architectural Living Room & Fine Art Atelier Scene */}
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
                        Atelier Monograph • Fine Art Giclée
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
                        Archival Canvas & Appalachian Walnut
                      </p>
                      <p className="text-[8px] uppercase tracking-[0.18em] text-[#86868B]">
                        310gsm German Etching Cotton Rag • TruVue® UV Glazing
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
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
          {/* Architectural Wayfinding Pylon & Environmental Branding Visual */}
          <div className="relative w-full max-w-lg lg:max-w-xl aspect-[4/3] flex items-center justify-center">
            {/* Architectural Ambient Grid & Backlight */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[#1E2530]/90 via-[#141820]/95 to-[#0F1218] border border-[#2D3748] shadow-2xl p-6 flex items-center justify-center overflow-hidden">
              {/* Background Technical Grid */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4FD1C5_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Glowing Monolithic Architectural Totem */}
              <div className="relative z-10 flex items-center gap-6">
                {/* 3D Illuminated Wayfinding Pylon */}
                <div className="relative w-36 sm:w-44 h-64 sm:h-76 bg-gradient-to-b from-[#2D3748] via-[#1A202C] to-[#171923] rounded-lg border border-[#4A5568] shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
                  {/* Illuminated Top Accent Bar */}
                  <div className="w-full h-1.5 bg-gradient-to-r from-[#C5A059] via-[#E2C785] to-[#C5A059] rounded-full shadow-[0_0_12px_rgba(197,160,89,0.8)]" />

                  {/* Directional Wayfinding Spec */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                      <div className="w-5 h-5 rounded-md bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] text-[10px] font-bold">
                        HQ
                      </div>
                      <span className="text-[10px] font-semibold text-white tracking-wider uppercase">
                        Enterprise Center
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[9px] text-[#A0AEC0]">
                      <div className="flex items-center justify-between text-white font-medium">
                        <span>Level 4 • Atelier Studio</span>
                        <span className="text-[#C5A059]">↑</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Level 3 • Design Lab</span>
                        <span>→</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Level 2 • CNC Metalworks</span>
                        <span>→</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Level 1 • Civic Archives</span>
                        <span>←</span>
                      </div>
                    </div>
                  </div>

                  {/* Illuminated 3D LED Badge */}
                  <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-widest text-[#718096]">
                      IP67 Architectural LED
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                  </div>
                </div>

                {/* Exterior Illuminated Commercial Sign Detail */}
                <div className="hidden sm:flex flex-col gap-3">
                  <div className="p-3.5 rounded-lg bg-[#2D3748]/60 border border-[#4A5568]/80 backdrop-blur-md shadow-md text-left w-40">
                    <div className="text-[10px] text-[#C5A059] font-semibold uppercase tracking-wider mb-1">
                      Environmental Branding
                    </div>
                    <div className="text-xs text-white font-serif">
                      Architectural Wayfinding & 3D Letters
                    </div>
                    <div className="text-[9px] text-[#A0AEC0] mt-1">
                      Precision aluminum casing with edge-lit halo LED.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#1A202C]/80 border border-[#C5A059]/40 shadow-xs text-left w-40">
                    <div className="flex items-center gap-1.5 text-[10px] text-white font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>ADA Code Compliant</span>
                    </div>
                    <div className="text-[9px] text-[#A0AEC0] mt-0.5">
                      Tactile Grade 2 Braille & vandal-resistant finish.
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
          {/* Heavy Precision CNC Metalworks & Civic Monument Visual */}
          <div className="relative w-full max-w-lg lg:max-w-xl aspect-[4/3] flex items-center justify-center">
            {/* Industrial Stainless & Brass Backplate */}
            <div className="relative w-72 sm:w-84 h-72 sm:h-80 rounded-xl p-6 shadow-2xl bg-gradient-to-br from-[#201D1A] via-[#161514] to-[#0D0C0B] border border-[#524436] flex flex-col justify-between">
              {/* Corner Machined Bolts */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-[#9E8668] border border-[#D5BE9B] shadow-inner flex items-center justify-center text-[7px] text-black font-bold">
                +
              </div>
              <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-[#9E8668] border border-[#D5BE9B] shadow-inner flex items-center justify-center text-[7px] text-black font-bold">
                +
              </div>
              <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-[#9E8668] border border-[#D5BE9B] shadow-inner flex items-center justify-center text-[7px] text-black font-bold">
                +
              </div>
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-[#9E8668] border border-[#D5BE9B] shadow-inner flex items-center justify-center text-[7px] text-black font-bold">
                +
              </div>

              {/* Laser-Cut Brass Monument Civic Plaque */}
              <div className="relative w-full h-full rounded-lg bg-gradient-to-tr from-[#94742B] via-[#C5A059] to-[#EBD79B] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#1A1816] rounded-md p-4 flex flex-col justify-between items-center text-center border border-[#C5A059]/40">
                  {/* Civic Monument Seal / Heading */}
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[9px] font-semibold text-[#EBD79B] uppercase tracking-widest">
                      Civic Monument & Tender
                    </div>
                    <h4 className="font-serif text-xs sm:text-sm font-semibold text-white tracking-wide">
                      MUNICIPAL CIVIC ARCHIVES
                    </h4>
                  </div>

                  {/* Precision CNC Laser Geometric Motif */}
                  <div className="my-auto py-2">
                    <svg viewBox="0 0 100 80" className="w-24 h-20 text-[#C5A059]" fill="none">
                      <rect x="10" y="10" width="80" height="60" rx="4" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="4 2" />
                      <circle cx="50" cy="40" r="22" stroke="#EBD79B" strokeWidth="1.5" />
                      <circle cx="50" cy="40" r="14" fill="#C5A059" fillOpacity="0.2" stroke="#C5A059" strokeWidth="1" />
                      <path d="M50 20 L50 60 M30 40 L70 40" stroke="#EBD79B" strokeWidth="0.8" />
                      <circle cx="50" cy="40" r="4" fill="#EBD79B" />
                    </svg>
                  </div>

                  {/* CNC Engineering Tolerances Spec */}
                  <div className="w-full pt-2 border-t border-white/10 text-[9px] text-[#A0AEC0] flex items-center justify-between">
                    <span>5-Axis CNC • ±0.1mm</span>
                    <span className="text-[#C5A059] font-medium">GeM Registered</span>
                  </div>
                </div>
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
      className="relative w-full bg-[var(--background)] overflow-hidden border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div
          data-testid="hero-carousel-slide"
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

          {/* Right Column: Visual Stage */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            {active.renderVisual()}
          </div>
        </div>

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
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-ink-primary)] transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              data-testid="hero-carousel-next"
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
