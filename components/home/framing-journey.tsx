"use client";

import {
  Compass,
  Cpu,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Award,
  Layers,
  Wrench,
  Building2,
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
  icon: typeof Compass;
}

export const FRAMING_STEPS: FramingStep[] = [
  {
    stepNumber: "01",
    badgeLabel: "Stage 01",
    pillTitle: "Consult & Spec",
    title: "Spatial Consultation & 3D Spec",
    tagline: "Architectural Survey & 3D Modeling",
    description:
      "We review site plans, CAD drawings, or artwork dimensions to produce 3D visual specifications, material samples, and precise engineering schematics.",
    bullets: [
      "Comprehensive site survey & architectural CAD review",
      "3D photorealistic spatial rendering & lighting simulation",
      "Physical material & finish swatch sample kits dispatched in 48 hours",
    ],
    ctaLabel: "Book Spatial Consultation",
    icon: Compass,
  },
  {
    stepNumber: "02",
    badgeLabel: "Stage 02",
    pillTitle: "Precision Fabrication",
    title: "Engineering & Precision Fabrication",
    tagline: "5-Axis CNC, Fiber Laser & Master Joinery",
    description:
      "In-house precision manufacturing combining heavy CNC routing, fiber laser metalworks, and traditional European woodworking.",
    bullets: [
      "Tolerance-critical CNC metal cutting and brake forming (±0.1mm)",
      "Sustainably harvested FSC® hardwoods & structural aluminum",
      "12-color archival giclée printing on 310gsm German etching rag",
    ],
    ctaLabel: "Explore Fabrication Tech",
    icon: Cpu,
  },
  {
    stepNumber: "03",
    badgeLabel: "Stage 03",
    pillTitle: "Archival Curation",
    title: "Museum Archival Curation & Quality Control",
    tagline: "ISO Certified & Conservation Curation",
    description:
      "Rigorous quality inspection in cleanroom environments, mounting with reversible archival corners, TruVue® UV glazing, and structural load testing.",
    bullets: [
      "100% reversible museum-grade mounting & acid-free barriers",
      "TruVue® 99% UV-protective optical glazing with zero distortion",
      "Structural integrity and wind-load certification for commercial signage",
    ],
    ctaLabel: "Review Conservation Standards",
    icon: ShieldCheck,
  },
  {
    stepNumber: "04",
    badgeLabel: "Stage 04",
    pillTitle: "Turnkey Handover",
    title: "White-Glove Installation & Turnkey Handover",
    tagline: "On-Site Installation & Turnkey Commissioning",
    description:
      "Certified nationwide installation teams handle structural anchoring, electrical hookup for illuminated signage, and flawless handover.",
    bullets: [
      "Licensed on-site installation and commercial rigging teams",
      "Complete electrical compliance for illuminated LED architectural signage",
      "Turnkey documentation, GeM handover certificates & lifetime warranty",
    ],
    ctaLabel: "View Installation Services",
    icon: PackageCheck,
  },
];

export function FramingJourney() {
  return (
    <section
      id="framing-journey"
      data-testid="framing-journey"
      aria-label="End-to-End Studio Execution Workflow"
      className="w-full bg-[var(--background)] py-16 sm:py-24 border-b border-[var(--color-border-subtle)] relative overflow-hidden text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      {/* Decorative subtle background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(var(--color-ink-primary)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            SECTION HEADER WITH PNG WORKFLOW SPATIAL BADGES
           ========================================================================= */}
        <div
          data-testid="framing-journey-header"
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] text-xs font-mono font-medium uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span>End-to-End Studio Workflow</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            Turnkey Studio Execution Workflow
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed font-normal max-w-2xl mx-auto">
            From initial spatial consultation and 3D modeling to precision fabrication, museum curation, and white-glove turnkey installation.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)] text-[11px] font-mono text-[var(--color-ink-muted)] bg-[var(--color-canvas-base)]/40">
            4-Stage Spatial Diagram & Process Spec PNG Zone
          </div>
        </div>

        {/* =========================================================================
            4-STAGE JOURNEY GRID WITH CONNECTORS
           ========================================================================= */}
        <div className="relative">
          {/* Desktop connecting hairline with brass nodes */}
          <div
            data-testid="framing-journey-connectors"
            aria-hidden="true"
            className="hidden xl:block absolute top-[132px] left-[12%] right-[12%] h-[2px] z-0"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent border-t border-dashed border-[#C5A059]/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {FRAMING_STEPS.map((step, idx) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={step.stepNumber}
                  data-testid={`framing-step-${idx + 1}`}
                  className="group relative flex flex-col justify-between bg-[var(--color-canvas-surface)] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 p-6 shadow-sm hover:shadow-xl hover:border-[var(--color-accent-gold)]/60 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Card Header & Badge row */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      {/* Numbered Badge */}
                      <div
                        data-testid={`framing-step-number-${idx + 1}`}
                        className="w-11 h-11 rounded-xl bg-[var(--color-accent-gold)] text-[var(--background)] font-serif text-lg font-bold flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-200"
                      >
                        {step.stepNumber}
                      </div>

                      {/* Pill & Icon Tag */}
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-canvas-subtle)] text-[var(--color-ink-secondary)] border border-dashed border-[var(--color-border-strong)] text-[10px] font-mono font-semibold uppercase tracking-wider">
                          {step.pillTitle}
                        </span>
                        <div className="w-7 h-7 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] text-[var(--color-accent-gold)] flex items-center justify-center">
                          <StepIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Step Dedicated Dashed Spatial Drop Zone Container for Process PNG / Diagram */}
                    <div className="mb-5 h-36 rounded-xl bg-[var(--color-canvas-subtle)]/50 border-2 border-dashed border-[var(--color-border-strong)]/60 overflow-hidden flex items-center justify-center relative p-3 group-hover:border-[var(--color-accent-gold)]/60 transition-colors">
                      {idx === 0 && (
                        /* Step 1 Visual: 3D CAD Blueprint & Spatial Modeling */
                        <div className="relative w-full h-full flex items-center justify-around select-none">
                          <div className="w-full h-full rounded-lg bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] shadow-xs p-2 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-dashed border-[var(--color-border-subtle)] pb-1">
                              <span className="text-[9px] font-mono text-[#C5A059]">CAD: Spatial Model</span>
                              <span className="text-[8px] font-mono text-[var(--color-ink-muted)]">3D Revit / Rhino</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 my-1">
                              <div className="h-10 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[8px] font-mono">Elevation</div>
                              <div className="h-10 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[8px] font-mono">Plan</div>
                              <div className="h-10 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[8px] font-mono">3D Mesh</div>
                            </div>
                            <div className="text-[8px] font-mono text-[var(--color-ink-muted)] flex justify-between">
                              <span>Spec: ±0.1mm</span>
                              <span className="text-[#10B981]">Verified</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 1 && (
                        /* Step 2 Visual: 5-Axis CNC & Fiber Laser Fabrication */
                        <div className="relative w-full h-full flex items-center justify-center select-none">
                          <div className="w-full h-full rounded-lg bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] shadow-xs p-2 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-dashed border-[var(--color-border-subtle)] pb-1">
                              <span className="text-[9px] font-mono text-[#C5A059]">CNC: Fiber Laser 5-Axis</span>
                              <span className="text-[8px] font-mono text-[#10B981]">Operating</span>
                            </div>
                            <div className="flex items-center justify-center py-1">
                              <svg viewBox="0 0 80 40" className="w-20 h-10 text-[#C5A059]" fill="none">
                                <rect x="5" y="5" width="70" height="30" rx="3" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" />
                                <circle cx="40" cy="20" r="10" stroke="#FAF7F2" strokeWidth="1.5" />
                                <line x1="20" y1="20" x2="60" y2="20" stroke="#EF4444" strokeWidth="1" />
                                <circle cx="40" cy="20" r="2" fill="#EF4444" />
                              </svg>
                            </div>
                            <div className="text-[8px] font-mono text-[var(--color-ink-muted)] flex justify-between">
                              <span>Bed: 3000×1500mm</span>
                              <span>Brass / Timber</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 2 && (
                        /* Step 3 Visual: Cleanroom Archival & ISO QC Inspection */
                        <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
                          <div className="w-full h-full rounded-lg bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] shadow-xs p-2 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-dashed border-[var(--color-border-subtle)] pb-1">
                              <span className="text-[9px] font-mono text-[#C5A059]">Cleanroom QC</span>
                              <span className="text-[8px] font-mono text-[#10B981]">ISO 9001:2015</span>
                            </div>
                            <div className="flex items-center justify-around py-1 text-center">
                              <div>
                                <ShieldCheck className="w-6 h-6 text-[#C5A059] mx-auto" />
                                <span className="text-[7.5px] font-mono text-[var(--color-ink-muted)]">TruVue 99% UV</span>
                              </div>
                              <div className="w-px h-8 bg-[var(--color-border-subtle)]" />
                              <div>
                                <Layers className="w-6 h-6 text-[#C5A059] mx-auto" />
                                <span className="text-[7.5px] font-mono text-[var(--color-ink-muted)]">Acid-Free Cotton</span>
                              </div>
                            </div>
                            <div className="text-[8px] font-mono text-[var(--color-ink-muted)] text-center">
                              100% Reversible Archival Barrier
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 3 && (
                        /* Step 4 Visual: Turnkey On-Site Rigging & Handover */
                        <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
                          <div className="w-full h-full rounded-lg bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] shadow-xs p-2 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-dashed border-[var(--color-border-subtle)] pb-1">
                              <span className="text-[9px] font-mono text-[#C5A059]">Turnkey Handover</span>
                              <span className="text-[8px] font-mono text-[#C5A059]">GeM Certified</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 py-1">
                              <Building2 className="w-6 h-6 text-[#C5A059]" />
                              <div className="text-left">
                                <div className="text-[8px] font-bold text-[var(--color-ink-primary)]">On-Site Commissioning</div>
                                <div className="text-[7px] text-[var(--color-ink-muted)]">Structural Rigging & Electric</div>
                              </div>
                            </div>
                            <div className="text-[8px] font-mono text-[var(--color-ink-muted)] flex justify-between">
                              <span>White-Glove Team</span>
                              <span className="text-[#10B981]">Complete</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step Title & Description */}
                    <div className="space-y-1.5 mb-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#C5A059] font-semibold">
                        {step.tagline}
                      </p>
                      <h3
                        data-testid={`framing-step-title-${idx + 1}`}
                        className="font-serif text-lg sm:text-xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-snug"
                      >
                        {step.title}
                      </h3>
                      <p
                        data-testid={`framing-step-desc-${idx + 1}`}
                        className="text-xs text-[var(--color-ink-secondary)] leading-relaxed pt-1"
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Step Feature Checklist */}
                    <ul className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-ink-secondary)] mb-5">
                      {step.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#C5A059] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="pt-2">
                    <a
                      href="#curated-collections"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-gold)] hover:text-[#D4AF37] transition-colors"
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
                The Frame Cottage Lifetime Studio Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)]">
                Every residential, architectural, and civic installation is warranted for structural integrity and archival longevity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="/rfq"
              className="px-5 py-2.5 rounded-full bg-[var(--color-accent-gold)] text-[var(--background)] text-xs sm:text-sm font-semibold hover:bg-[#B38F48] transition-all shadow-xs"
            >
              Request Studio Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
