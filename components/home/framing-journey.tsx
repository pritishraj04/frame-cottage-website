"use client";

import {
  UploadCloud,
  Mail,
  Palette,
  Sparkles,
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  Award,
} from "lucide-react";

export interface FramingStep {
  stepNumber: string;
  badgeLabel: string;
  pillTitle: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  icon: typeof UploadCloud;
}

export const FRAMING_STEPS: FramingStep[] = [
  {
    stepNumber: "01",
    badgeLabel: "Step 01",
    pillTitle: "Upload / Send",
    title: "Upload or Mail In",
    tagline: "Archival Giclée Print or Insured Mailer Kit",
    description:
      "Upload high-res photos for 12-color archival giclée printing, or request our insured prepaid mailer for physical artwork and heirlooms.",
    bullets: [
      "Upload digital files (JPEG, TIFF, RAW) with instant DPI inspection",
      "12-color archival pigment inks on 310gsm Hahnemühle cotton rag",
      "Complimentary crush-proof art mailer with prepaid insurance",
    ],
    ctaLabel: "Upload Photo or Order Mailer",
    icon: UploadCloud,
  },
  {
    stepNumber: "02",
    badgeLabel: "Step 02",
    pillTitle: "Customise",
    title: "Design with Precision",
    tagline: "Solid Timber, Beveled Mats & Conservation Glass",
    description:
      "Pair your piece with solid hardwoods, archival cotton mats, and TruVue® conservation glazing with real-time room preview.",
    bullets: [
      "5 hand-finished Appalachian solid hardwood profiles & vintage gilded styles",
      "4-ply acid-free cotton mats cut with a 45° conservation bevel",
      "TruVue® 99% UV-blocking acrylic with real-time room lighting preview",
    ],
    ctaLabel: "Explore Studio Customiser",
    icon: Palette,
  },
  {
    stepNumber: "03",
    badgeLabel: "Step 03",
    pillTitle: "Ready-to-Hang",
    title: "Delivered Ready to Hang",
    tagline: "Master Framer Handcraft & Guaranteed Transit",
    description:
      "Handcrafted by master framers in 5-7 days, backed with archival dust covers, and shipped with all brass hanging hardware included.",
    bullets: [
      "Individually hand-assembled and inspected by master framers in 5-7 days",
      "Sealed with Permacel archival Kraft paper and corner spline joinery",
      "Solid brass wall hooks, coated wire, nails, and mini level included in every box",
    ],
    ctaLabel: "View Delivery Guarantee",
    icon: PackageCheck,
  },
];

export function FramingJourney() {
  return (
    <section
      id="framing-journey"
      data-testid="framing-journey"
      aria-label="How Custom Framing Works - 3-Step Journey"
      className="w-full bg-[var(--background)] py-16 sm:py-24 border-b border-[var(--color-border-subtle)] relative overflow-hidden text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      {/* Decorative subtle background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(var(--color-ink-primary)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            SECTION HEADER
           ========================================================================= */}
        <div
          data-testid="framing-journey-header"
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Bespoke Framing Process</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            How Custom Framing Works
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed font-normal max-w-2xl mx-auto">
            From digital memory to handcrafted heirloom in three seamless steps.
          </p>
        </div>

        {/* =========================================================================
            3-STEP JOURNEY GRID WITH CONNECTORS
           ========================================================================= */}
        <div className="relative">
          {/* Desktop connecting hairline with brass nodes */}
          <div
            data-testid="framing-journey-connectors"
            aria-hidden="true"
            className="hidden lg:block absolute top-[132px] left-[16%] right-[16%] h-[2px] z-0"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent border-t border-dashed border-[#C5A059]/60" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 relative z-10">
            {FRAMING_STEPS.map((step, idx) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={step.stepNumber}
                  data-testid={`framing-step-${idx + 1}`}
                  className="group relative flex flex-col justify-between bg-[var(--color-canvas-surface)] rounded-2xl border border-[var(--color-border-subtle)] p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[var(--color-accent-gold)] transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Card Header & Badge row */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      {/* Numbered Badge */}
                      <div
                        data-testid={`framing-step-number-${idx + 1}`}
                        className="w-12 h-12 rounded-xl bg-[var(--color-accent-gold)] text-[var(--background)] font-serif text-xl font-bold flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-200"
                      >
                        {step.stepNumber}
                      </div>

                      {/* Pill & Icon Tag */}
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[var(--color-canvas-subtle)] text-[var(--color-ink-secondary)] border border-[var(--color-border-subtle)] text-[11px] font-semibold uppercase tracking-wider">
                          {step.pillTitle}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[var(--color-canvas-subtle)] text-[var(--color-accent-gold)] flex items-center justify-center">
                          <StepIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Step Visual Miniature Illustration */}
                    <div className="mb-6 h-36 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] overflow-hidden flex items-center justify-center relative p-4 group-hover:border-[var(--color-accent-gold)]/40 transition-colors">
                      {idx === 0 && (
                        /* Step 1 Visual: Art upload & mailer box */
                        <div className="relative w-full h-full flex items-center justify-around select-none">
                          {/* Digital Upload Phone/Tablet preview */}
                          <div className="w-20 h-28 rounded-lg bg-[#242424] border border-[#333333] shadow-xs p-1.5 flex flex-col items-center justify-between">
                            <div className="w-full h-16 rounded bg-[#1A1A1A] border border-dashed border-[#333333] flex flex-col items-center justify-center gap-1">
                              <UploadCloud className="w-5 h-5 text-[#C5A059]" />
                              <span className="text-[8px] font-medium text-[#9E9E9E]">300+ DPI</span>
                            </div>
                            <div className="w-full flex items-center justify-between text-[7px] text-[#9E9E9E] font-medium pt-1 border-t border-[#333333]">
                              <span>Digital</span>
                              <span className="text-[#C5A059] font-bold">12-Color</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center text-[#9E9E9E]">
                            <span className="text-[10px] italic text-[#9E9E9E]">or</span>
                            <div className="w-6 h-[1px] bg-[#333333] my-1" />
                          </div>

                          {/* Physical Mailer Envelope / Box */}
                          <div className="w-24 h-24 rounded-lg bg-[#242424] border border-[#333333] shadow-xs p-2 flex flex-col justify-between relative">
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center">
                              <ShieldCheck className="w-2 h-2 text-[#C5A059]" />
                            </div>
                            <Mail className="w-5 h-5 text-[#C5A059]" />
                            <div className="space-y-0.5">
                              <p className="text-[8px] font-bold text-[#F4F1EA] uppercase tracking-wider">
                                Pre-Paid Mailer
                              </p>
                              <p className="text-[7px] text-[#9E9E9E]">Insured up to $5,000</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 1 && (
                        /* Step 2 Visual: Bespoke Customiser with frame moulding & mat beveled cut */
                        <div className="relative w-full h-full flex items-center justify-center select-none">
                          <div className="w-44 h-28 rounded-lg bg-[#242424] border-4 border-[#3D2817] shadow-md p-2 flex items-center justify-center relative">
                            {/* Beveled Mat border */}
                            <div className="w-full h-full bg-[#F4F1EA] border-2 border-[#E0DCD3] p-2 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                              <div className="w-full h-full bg-[#1A1A1A] rounded flex flex-col items-center justify-center text-center p-1">
                                <Sparkles className="w-4 h-4 text-[#C5A059] mb-1" />
                                <span className="text-[8px] italic text-[#F4F1EA]">
                                  TruVue® Glazing
                                </span>
                                <span className="text-[6.5px] uppercase tracking-wider text-[#C5A059]">
                                  4-Ply Cotton Core
                                </span>
                              </div>
                            </div>
                            {/* Precision corner badge */}
                            <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded bg-[#6B1C23] text-[#F4F1EA] text-[7.5px] font-medium flex items-center gap-0.5">
                              <SlidersHorizontal className="w-2.5 h-2.5 text-[#C5A059]" />
                              <span>Live Preview</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 2 && (
                        /* Step 3 Visual: Ready-to-hang framed heirloom on wall with brass hardware */
                        <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
                          {/* Brass wall hanger wire node */}
                          <div className="flex flex-col items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#B38F48] shadow-xs" />
                            <div className="w-16 h-3 border-t border-l border-r border-[#C5A059] -mt-1" />
                          </div>
                          {/* Framed Artwork Ready to Hang */}
                          <div className="w-36 h-20 bg-[#242424] rounded p-1 shadow-lg border border-[#333333] flex items-center justify-center">
                            <div className="w-full h-full bg-[#1A1A1A] rounded-xs flex items-center justify-between px-2.5">
                              <div className="text-left">
                                <p className="text-[8px] font-sans font-bold text-[#F4F1EA]">
                                  Ready to Hang
                                </p>
                                <p className="text-[6.5px] text-[#9E9E9E]">
                                  Brass Hardware Included
                                </p>
                              </div>
                              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                            </div>
                          </div>
                          <span className="mt-1 text-[8px] font-medium text-[#C5A059]">
                            5–7 Days Workshop Dispatch
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Step Title & Description */}
                    <div className="space-y-2 mb-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
                        {step.tagline}
                      </p>
                      <h3
                        data-testid={`framing-step-title-${idx + 1}`}
                        className="font-serif text-2xl font-semibold text-[var(--color-ink-primary)] tracking-tight"
                      >
                        {step.title}
                      </h3>
                      <p
                        data-testid={`framing-step-desc-${idx + 1}`}
                        className="text-sm text-[var(--color-ink-secondary)] leading-relaxed pt-1"
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Step Feature Checklist */}
                    <ul className="space-y-2.5 pt-2 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-ink-secondary)] mb-6">
                      {step.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="pt-2">
                    <a
                      href="#curated-collections"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-accent-gold)] hover:text-[#D4AF37] transition-colors"
                    >
                      <span>{step.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM TRUST BANNER
           ========================================================================= */}
        <div className="mt-12 sm:mt-16 bg-[var(--color-canvas-surface)] rounded-2xl border border-[var(--color-border-subtle)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] shrink-0">
              <Award className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)]">
                The Frame Cottage Lifetime Craft Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)]">
                If your bespoke frame ever loosens, warps, or fails under normal room conditions, we rebuild it for free.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#atelier-materials"
              className="px-5 py-2.5 rounded-full bg-[var(--color-accent-gold)] text-[var(--background)] text-xs sm:text-sm font-semibold hover:bg-[#B38F48] transition-all shadow-xs"
            >
              Explore The Atelier Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
