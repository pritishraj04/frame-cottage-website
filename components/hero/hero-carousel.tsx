"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  id: string;
  title: string;
  cutoutImage: string;
  theme?: "light" | "dark";
  eyebrow?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  badgeText?: string;
  specs?: string;
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const slides: CarouselSlide[] = [
    {
      id: "slide-bespoke-framing",
      title: "Bespoke Art & Archival Custom Framing",
      cutoutImage: "/images/hero/hero-cutout-bespoke-framing.png",
      theme: "light",
    },
    {
      id: "slide-spatial-signage",
      title: "Spatial Design & Architectural Signage",
      cutoutImage: "/images/hero/hero-cutout-spatial-signage.png",
      theme: "light",
    },
    {
      id: "slide-industrial-civic",
      title: "Industrial Fabrication & Civic Projects",
      cutoutImage: "/images/hero/hero-cutout-industrial-cnc.png",
      theme: "light",
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

  return (
    <section
      aria-label="Frame Cottage Studio Showcase"
      data-testid="hero-carousel"
      id="hero-image-carousel"
      className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[88vh] overflow-hidden bg-[var(--background)] border-b border-[var(--color-border-subtle)] touch-pan-y select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Atmospheric Studio Background with Subtle Radial Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--color-accent-gold)/6%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,var(--background)_100%)] opacity-70" />
      </div>

      {/* Pure Edge-to-Edge Visual Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          data-testid="hero-carousel-slide"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* High-Resolution Cutout PNG Filling Full Width/Height Stage */}
          <div
            data-testid="hero-png-dropzone"
            className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 lg:p-10"
          >
            <Image
              src={active.cutoutImage}
              alt={active.title}
              fill
              sizes="100vw"
              className="object-contain drop-shadow-2xl select-none transition-transform duration-700 hover:scale-[1.01]"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Sleek Floating Glassmorphic Arrow Controls */}
      <button
        type="button"
        onClick={prevSlide}
        data-testid="hero-carousel-prev"
        data-test-alias="hero-prev-btn"
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)]/70 hover:bg-[var(--color-canvas-surface)] backdrop-blur-md flex items-center justify-center text-[var(--color-ink-primary)] transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        data-testid="hero-carousel-next"
        data-test-alias="hero-next-btn"
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)]/70 hover:bg-[var(--color-canvas-surface)] backdrop-blur-md flex items-center justify-center text-[var(--color-ink-primary)] transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Sleek Floating Bottom Indicator Dots */}
      <div
        data-testid="hero-carousel-indicators"
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-canvas-surface)]/60 backdrop-blur-md border border-[var(--color-border-subtle)] shadow-md"
      >
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
    </section>
  );
}
