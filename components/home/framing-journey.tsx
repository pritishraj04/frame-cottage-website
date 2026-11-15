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
  UploadCloud,
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] text-accent text-xs font-mono font-medium uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
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
            <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent border-t border-dashed border-accent/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {FRAMING_STEPS.map((step, idx) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={step.stepNumber}
                  data-testid={`framing-step-${idx + 1}`}
                  className="group relative flex flex-col justify-between bg-[var(--color-canvas-surface)] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 p-6 shadow-sm hover:shadow-xl hover:border-accent/60 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Card Header & Badge row */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      {/* Numbered Badge */}
                      <div
                        data-testid={`framing-step-number-${idx + 1}`}
                        className="w-11 h-11 rounded-xl bg-accent text-white font-serif text-lg font-bold flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-200"
                      >
                        {step.stepNumber}
                      </div>

                      {/* Pill & Icon Tag */}
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-canvas-subtle)] text-[var(--color-ink-secondary)] border border-dashed border-[var(--color-border-strong)] text-[10px] font-mono font-semibold uppercase tracking-wider">
                          {step.pillTitle}
                        </span>
                        <div className="w-7 h-7 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] text-accent flex items-center justify-center">
                          <StepIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Process Step Diagram PNG Drop Zone */}
                    <div
                      data-testid={`journey-step-dropzone-${step.stepNumber}`}
                      className="w-full h-32 rounded-xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-base)]/60 my-3 flex flex-col items-center justify-center text-center p-3 hover:border-accent group-hover:border-accent group-hover:bg-accent-light/50 transition-all duration-300 group/stepdrop relative overflow-hidden"
                    >
                      <div className="w-8 h-8 rounded-lg border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-accent mb-1.5 shadow-2xs group-hover/stepdrop:scale-105 transition-transform">
                        <UploadCloud className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">
                        Step {step.stepNumber} Diagram PNG Drop Zone
                      </span>
                      <p className="text-[10px] text-[var(--color-ink-muted)] mt-0.5 line-clamp-1 max-w-[220px]">
                        Designer to place workflow illustration PNG here ({step.title})
                      </p>
                      <div className="mt-1.5 px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[9px] font-mono text-accent bg-[var(--color-canvas-surface)]/80">
                        PNG Diagram • 600×400
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <div className="space-y-1.5 mb-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-accent font-semibold">
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
                          <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="pt-2">
                    <a
                      href="#curated-collections"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
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
            <div className="w-12 h-12 rounded-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] flex items-center justify-center text-accent shrink-0">
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
              className="px-5 py-2.5 rounded-full bg-accent text-white text-xs sm:text-sm font-semibold hover:bg-accent-hover transition-all shadow-md shadow-accent/20"
            >
              Request Studio Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
