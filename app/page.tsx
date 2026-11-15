"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Layers, UploadCloud } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { HeroCarousel } from "@/components/hero/hero-carousel";
import { CustomFrameStudio } from "@/components/home/custom-frame-studio";
import { CategoryPills } from "@/components/home/category-pills";
import { TrustBar } from "@/components/home/trust-bar";
import { CuratedCollections } from "@/components/home/curated-collections";
import { FeaturedProductsCarousel } from "@/components/home/featured-products-carousel";
import { FramingJourney } from "@/components/home/framing-journey";
import { CustomerLookbook } from "@/components/home/customer-lookbook";
import { FAQSection } from "@/components/home/faq-section";
import { DecisionConcierge } from "@/components/interactive/decision-concierge";
import { SiteFooter } from "@/components/layout/site-footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-accent-gold)]/20 selection:text-[var(--color-accent-gold)]">
      {/* 1. Sticky Header with 6-vertical mega-menu, search, cart, and theme toggle */}
      <SiteHeader />

      <main className="flex-1 w-full flex flex-col overflow-x-clip">
        {/* 2. Full-Image PNG Hero Carousel with Framer Motion AnimatePresence & Spatial Designer Drop Zones */}
        <HeroCarousel />

        {/* 3. Flagship Interactive Live Frame & Canvas Switcher Island */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <CustomFrameStudio />
        </motion.div>

        {/* 4. 6 Core Service Verticals Discovery Navigator with Audience Tags */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <CategoryPills />
        </motion.div>

        {/* 5. 4 Studio Capabilities Trust Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <TrustBar />
        </motion.div>

        {/* 6. Curated Projects & Capabilities Grid with 6 Vertical Filter Tabs & Modal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <CuratedCollections />
        </motion.div>

        {/* 7. Pure Image-Based 8-Product Carousel with Apple-style blurred controls */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <FeaturedProductsCarousel />
        </motion.div>

        {/* 8. Featured Product & Capability Highlight (Designer Spatial Container Section) */}
        <motion.section
          data-testid="featured-product-highlight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-[var(--color-border-subtle)]"
          aria-label="Featured Product and Capability Highlight"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column: Aspect-Square Floating / Shadow Frame & CNC Drop Zone */}
            <div
              data-testid="featured-product-canvas-dropzone"
              className="aspect-square w-full rounded-3xl border-4 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-subtle)]/60 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group hover:border-[var(--color-accent-gold)] transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] flex items-center justify-center text-[var(--color-accent-gold)] mb-4 bg-[var(--color-canvas-base)]/70 group-hover:scale-105 group-hover:border-[var(--color-accent-gold)] transition-all duration-300 shadow-md">
                <UploadCloud className="w-8 h-8 stroke-[1.5]" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-[var(--color-accent-gold)] mb-1">
                Featured Asset Container
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[var(--foreground)]">
                Floating / Shadow Frame &amp; CNC Design Drop Zone
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[var(--color-ink-muted)] mt-2 max-w-md">
                Designer to place transparent high-resolution PNG render here (e.g. /public/images/featured-shadowbox.png, 1080×1080).
              </p>
              <div className="mt-4 px-3.5 py-1.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[11px] font-mono text-[var(--color-accent-gold)] bg-[var(--color-canvas-base)]/70 shadow-2xs">
                1:1 Aspect Ratio • Full-Bleed PNG Asset (300 DPI)
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

        {/* 9. Interactive Project & Material Decision Concierge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <DecisionConcierge />
        </motion.div>

        {/* 10. 4-Stage End-to-End Studio Execution Workflow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <FramingJourney />
        </motion.div>

        {/* 10. Real-World Client Installations Lookbook with Interactive Hotspot Pins */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <CustomerLookbook />
        </motion.div>

        {/* 11. Technical Radix Accordion FAQ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="w-full"
        >
          <FAQSection />
        </motion.div>
      </main>

      {/* 12. 4-Column Studio Footer with Certifications */}
      <SiteFooter />
    </div>
  );
}
