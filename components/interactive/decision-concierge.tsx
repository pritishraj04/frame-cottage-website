"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Palette,
  Compass,
  Cpu,
  Award,
  Landmark,
  Sun,
  Eye,
  CloudRain,
  Briefcase,
  Trees,
  Sparkles,
  Box,
  Grid,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  UploadCloud,
  Layers,
  ShieldCheck,
  Clock,
  Coins,
  ExternalLink,
} from "lucide-react";

import { VerticalId } from "@/lib/constants/verticals";

// Step 1: Project Scope & Application Options
interface ScopeOption {
  id: VerticalId;
  title: string;
  tagline: string;
  audienceBadge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SCOPE_OPTIONS: ScopeOption[] = [
  {
    id: "bespoke-framing",
    title: "Fine Art, Photography & Archival Heirlooms",
    tagline: "Bespoke Art & Custom Framing",
    audienceBadge: "B2C / B2B Curation",
    description:
      "Museum conservation, archival mineral giclée printing, 99% UV optical acrylic glazing, and hand-splined solid hardwood framing.",
    icon: Palette,
  },
  {
    id: "spatial-signage",
    title: "Commercial Headquarters, Hospitality & Wayfinding",
    tagline: "Spatial Design & Signage",
    audienceBadge: "B2B Architecture & Commercial",
    description:
      "Turnkey multi-floor architectural wayfinding, exterior monolith pylons, illuminated 3D LED channel lettering, and ADA signage.",
    icon: Compass,
  },
  {
    id: "industrial-cnc",
    title: "Architectural Screens, Facades & Metal Fabrication",
    tagline: "Industrial CNC Metalworks",
    audienceBadge: "Commercial & Industrial",
    description:
      "High-power fiber laser cutting, 5-axis CNC router milling, parametric architectural perforated screens, and heavy-gauge structural metalworks.",
    icon: Cpu,
  },
  {
    id: "custom-gifting",
    title: "Corporate Awards, Plaques & VIP Institutional Gifts",
    tagline: "Custom Gifting & Mementos",
    audienceBadge: "Corporate & Institutional",
    description:
      "Sculpted Appalachian walnut trophies, fiber laser-engraved solid jeweler's brass plaques, and handcrafted velvet-lined presentation cases.",
    icon: Award,
  },
  {
    id: "civic-projects",
    title: "Municipal Tenders, Civic Memorials & Public Sector Contracts",
    tagline: "Government & Civic Projects",
    audienceBadge: "Public Sector & GeM Tenders",
    description:
      "GeM e-tender compliance, vandal-resistant public park infrastructure, council chamber constitutional charters, and civic monument displays.",
    icon: Landmark,
  },
];

// Step 2: Environment & Lighting Conditions Options
interface EnvironmentOption {
  id: string;
  title: string;
  glazing: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ENVIRONMENT_OPTIONS: EnvironmentOption[] = [
  {
    id: "uv-daylight",
    title: "High Natural Daylight / UV Sun Exposure",
    glazing: "TruVue® Conservation Clear 99% UV Acrylic",
    description:
      "Direct sunlight, south-facing glass facades, floor-to-ceiling windows, or skylit atriums requiring irreversible UV degradation defense.",
    icon: Sun,
  },
  {
    id: "gallery-museum",
    title: "Gallery Showcase / Zero Reflection Requirement",
    glazing: "TruVue® Optium Museum Acrylic Anti-Reflective",
    description:
      "Directional gallery spotlighting, high-CRI museum fixtures, or private collections demanding virtually invisible non-reflective glazing (< 1% reflection).",
    icon: Eye,
  },
  {
    id: "exterior-weather",
    title: "Exterior Architectural / All-Weather High-Traffic",
    glazing: "316 Marine Stainless with Ceramic Clearcoat",
    description:
      "Outdoor campus wayfinding, streetscape installations, coastal humidity, heavy monsoon exposure, and high-touch vandal defense.",
    icon: CloudRain,
  },
  {
    id: "executive-tabletop",
    title: "Executive Suite / Tabletop Display",
    glazing: "Appalachian Hardwood with 4-Ply Cotton Rag",
    description:
      "Climate-controlled boardrooms, executive desks, luxury residential mantels, or private library collections in soft ambient indoor light.",
    icon: Briefcase,
  },
];

// Step 3: Material & Aesthetic Tone Options
interface MaterialOption {
  id: string;
  title: string;
  substrate: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    id: "hardwoods",
    title: "Warm Architectural Hardwoods (American Walnut, White Oak, Rock Maple)",
    substrate: "FSC® Select Appalachian Black Walnut & White Oak",
    description:
      "Sustainably harvested North American hardwoods finished with hand-rubbed organic beeswax, contrasting timber splines, and satin luster.",
    icon: Trees,
  },
  {
    id: "heritage-metals",
    title: "Hand-Burnished Heritage Metals (Gilded Brass, Aged Bronze, Raw Copper)",
    substrate: "Solid C360 Jeweler's Brass & Living Patina Bronze",
    description:
      "Hand-patinated antique statuary bronze, brushed jewelers brass, and raw copper treated with specialized acid oxidation and microcrystalline wax seal.",
    icon: Sparkles,
  },
  {
    id: "modern-aluminum",
    title: "Minimalist Modern Metal (6061-T6 Aerospace Aluminum, Matte Black)",
    substrate: "6061-T6 Aerospace Aluminum / Architectural Powder Coat",
    description:
      "Ultra-crisp razor profiles with architectural electrostatic powder coating (RAL palette) or satin anodized finishes for contemporary monoliths.",
    icon: Box,
  },
  {
    id: "cnc-perforated",
    title: "CNC Precision Perforated Lattice & Architectural Relief",
    substrate: "Parametric 5-Axis Laser Cut Stainless & Acoustic Composite",
    description:
      "Parametrically calculated geometric perforations, acoustic baffle integration, and deep relief spatial facades cut to ±0.1 mm tolerances.",
    icon: Grid,
  },
];

// Step Slide Variants
const stepVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

export function DecisionConcierge() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [direction, setDirection] = useState<number>(1);

  // User selections
  const [selectedScope, setSelectedScope] = useState<VerticalId>("bespoke-framing");
  const [selectedEnv, setSelectedEnv] = useState<string>("gallery-museum");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("hardwoods");

  const handleSelectScope = (scopeId: VerticalId) => {
    setSelectedScope(scopeId);
    setDirection(1);
    setStep(2);
  };

  const handleSelectEnv = (envId: string) => {
    setSelectedEnv(envId);
    setDirection(1);
    setStep(3);
  };

  const handleSelectMaterial = (materialId: string) => {
    setSelectedMaterial(materialId);
    setDirection(1);
    setStep(4);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleReset = () => {
    setDirection(-1);
    setStep(1);
  };

  // Matched Blueprint Data
  const currentScope = SCOPE_OPTIONS.find((s) => s.id === selectedScope) || SCOPE_OPTIONS[0];
  const currentEnv =
    ENVIRONMENT_OPTIONS.find((e) => e.id === selectedEnv) || ENVIRONMENT_OPTIONS[0];
  const currentMaterial =
    MATERIAL_OPTIONS.find((m) => m.id === selectedMaterial) || MATERIAL_OPTIONS[0];

  // Tailored specifications calculation
  const getRecommendationDetails = () => {
    let joinery = "Mortise-Keyed Hardwood Splines with Reversible Japanese Paper Hinging";
    let budgetRange = "₹12,500 – ₹48,000 / piece";
    let leadTime = "5–8 Business Days";
    let warranty = "Lifetime Museum Conservation Guarantee";

    switch (selectedScope) {
      case "spatial-signage":
        joinery = "Structural TIG Welded Aluminum Subframe with Concealed Cleat Rigging";
        budgetRange = "₹45,000 – ₹2,80,000 / project phase";
        leadTime = "10–14 Business Days";
        warranty = "10-Year Weather & Structural Guarantee";
        break;
      case "industrial-cnc":
        joinery = "Fiber Laser Profiled Interlocking Tabs with Blind Stainless Fasteners";
        budgetRange = "₹35,000 – ₹3,50,000 / custom installation";
        leadTime = "7–12 Business Days";
        warranty = "ISO 9001:2015 Dimensional Guarantee (±0.1 mm)";
        break;
      case "custom-gifting":
        joinery = "Precision CNC Routed Recesses with French Cleat Presentation Box";
        budgetRange = "₹4,500 – ₹28,000 / unit (Tiered volume scaling)";
        leadTime = "7–10 Business Days";
        warranty = "Executive VIP Hand-Inspected Guarantee";
        break;
      case "civic-projects":
        joinery = "Heavy-Gauge Structural Steel Anchors with Anti-Tamper Security Fasteners";
        budgetRange = "₹1,50,000 – ₹12,00,000+ (GeM Tender Tiered)";
        leadTime = "15–25 Business Days (Phased Handover)";
        warranty = "50-Year Municipal Longevity & GeM Compliance";
        break;
      default:
        joinery = "Mortise-Keyed Hardwood Splines with Reversible Japanese Paper Hinging";
        budgetRange = "₹12,500 – ₹48,000 / piece";
        leadTime = "5–8 Business Days";
        warranty = "Lifetime Museum Conservation Guarantee";
        break;
    }

    return { joinery, budgetRange, leadTime, warranty };
  };

  const details = getRecommendationDetails();

  // WhatsApp Pre-filled Summary Message
  const whatsAppText = encodeURIComponent(
    `Hello Frame Cottage Studio,\n\nI completed the Interactive Project & Material Decision Concierge:\n• Project Scope: ${currentScope.title}\n• Recommended Vertical: ${currentScope.tagline} (${currentScope.id})\n• Environment & Lighting: ${currentEnv.title}\n• Aesthetic & Material: ${currentMaterial.title}\n• Substrate: ${currentMaterial.substrate}\n• Glazing: ${currentEnv.glazing}\n• Joinery: ${details.joinery}\n\nI would like to consult with an atelier specialist and request a quotation.`
  );
  const whatsAppDeepLink = `https://wa.me/919876543210?text=${whatsAppText}`;

  return (
    <section
      id="decision-concierge"
      data-testid="decision-concierge"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-[var(--color-border-subtle)] scroll-mt-24"
      aria-label="Interactive Project & Material Decision Concierge"
    >
      {/* PNG-Styled Spatial Canvas Outer Box with Dashed Borders */}
      <div className="border-2 border-dashed border-[var(--color-border-strong)]/60 rounded-3xl bg-[var(--color-canvas-subtle)]/50 p-6 sm:p-10 lg:p-12 shadow-[0_18px_36px_-10px_rgba(0,0,0,0.35)] relative overflow-hidden backdrop-blur-sm">
        {/* Subtle Watermark Decorator */}
        <div className="absolute top-4 right-6 font-mono text-[10px] tracking-widest text-[var(--color-accent-gold)]/40 uppercase hidden sm:block">
          FRAME COTTAGE • DECISION CONCIERGE ENGINE
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-dashed border-[var(--color-accent-gold)] text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--color-accent-gold)] mb-3 bg-[var(--color-canvas-base)]/80">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Specification &amp; Decision Concierge
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--foreground)] tracking-tight">
            Find the Exact Specification for Your Space
          </h2>
          <p className="mt-3 text-xs sm:text-base font-sans text-[var(--color-ink-muted)] leading-relaxed">
            Answer 3 quick architectural questions to receive a tailored substrate blueprint, glazing grade, estimated budget, and direct studio route.
          </p>

          {/* Progress Indicator Steps */}
          <div
            data-testid="concierge-step-indicator"
            className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8"
          >
            {[
              { num: 1, label: "Scope" },
              { num: 2, label: "Environment" },
              { num: 3, label: "Material" },
              { num: 4, label: "Recommendation" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={s.num > step}
                  onClick={() => {
                    if (s.num < step) {
                      setDirection(-1);
                      setStep(s.num as 1 | 2 | 3 | 4);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    step === s.num
                      ? "bg-accent text-white font-bold shadow-xs"
                      : step > s.num
                      ? "border border-dashed border-accent text-accent bg-[var(--color-canvas-base)] hover:bg-accent-light/30 cursor-pointer"
                      : "border border-dashed border-[var(--color-border-subtle)] text-[var(--color-ink-muted)] opacity-60 cursor-not-allowed"
                  }`}
                >
                  <span>{s.num}.</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {s.num < 4 && (
                  <span className="text-[var(--color-border-subtle)] text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Cards with AnimatePresence */}
        <div className="relative min-h-[380px] flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            {/* STEP 1: Project Scope */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent">
                    Step 1 of 3: Architectural Scope
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[var(--foreground)] mt-1">
                    Select Your Project Scope &amp; Application
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1">
                    Select the commission vertical that best describes your project requirements:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SCOPE_OPTIONS.map((opt) => {
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        data-testid={`concierge-option-${opt.id}`}
                        onClick={() => handleSelectScope(opt.id)}
                        className={`text-left p-5 rounded-2xl border-2 border-dashed transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                          selectedScope === opt.id
                            ? "border-accent bg-accent-light/40 ring-1 ring-accent shadow-md"
                            : "border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-card)]/60 hover:border-accent hover:bg-[var(--color-canvas-card)]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)] flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent transition-all">
                              <IconComponent className="w-5 h-5 stroke-[1.5]" />
                            </div>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-accent">
                              {opt.audienceBadge}
                            </span>
                          </div>
                          <h4 className="text-base font-serif font-bold text-[var(--foreground)] group-hover:text-accent transition-colors leading-snug">
                            {opt.title}
                          </h4>
                          <span className="inline-block text-[11px] font-mono text-accent mt-1">
                            {opt.tagline}
                          </span>
                          <p className="text-xs text-[var(--color-ink-muted)] mt-2 font-sans line-clamp-3">
                            {opt.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-dashed border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono text-accent">
                          <span>Select Scope</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Environment & Lighting Conditions */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent">
                    Step 2 of 3: Environmental Conditions
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[var(--foreground)] mt-1">
                    Select Environment &amp; Exposure Conditions
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1">
                    Where will the finished commission live and be illuminated?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ENVIRONMENT_OPTIONS.map((opt) => {
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        data-testid={`concierge-option-${opt.id}`}
                        onClick={() => handleSelectEnv(opt.id)}
                        className={`text-left p-5 rounded-2xl border-2 border-dashed transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                          selectedEnv === opt.id
                            ? "border-accent bg-accent-light/40 ring-1 ring-accent shadow-md"
                            : "border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-card)]/60 hover:border-accent hover:bg-[var(--color-canvas-card)]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)] flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent transition-all">
                              <IconComponent className="w-5 h-5 stroke-[1.5]" />
                            </div>
                            <span className="text-[10px] font-mono text-accent border border-dashed border-accent/40 px-2.5 py-0.5 rounded-full bg-accent/5">
                              Recommended Glazing Spec
                            </span>
                          </div>
                          <h4 className="text-base font-serif font-bold text-[var(--foreground)] group-hover:text-accent transition-colors leading-snug">
                            {opt.title}
                          </h4>
                          <div className="mt-2 text-xs font-mono text-accent bg-[var(--color-canvas-base)]/80 border border-dashed border-[var(--color-border-subtle)] p-2 rounded-lg">
                            {opt.glazing}
                          </div>
                          <p className="text-xs text-[var(--color-ink-muted)] mt-2 font-sans">
                            {opt.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-dashed border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono text-accent">
                          <span>Apply Condition</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-start">
                  <button
                    type="button"
                    data-testid="concierge-back-btn"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-dashed border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-[var(--foreground)] hover:border-accent transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Step 1 (Scope)
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Material & Aesthetic Tone */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent">
                    Step 3 of 3: Tactile &amp; Aesthetic Tone
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[var(--foreground)] mt-1">
                    Select Material &amp; Aesthetic Tone
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1">
                    Define the structural material personality and tactile touch of your project:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MATERIAL_OPTIONS.map((opt) => {
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        data-testid={`concierge-option-${opt.id}`}
                        onClick={() => handleSelectMaterial(opt.id)}
                        className={`text-left p-5 rounded-2xl border-2 border-dashed transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                          selectedMaterial === opt.id
                            ? "border-accent bg-accent-light/40 ring-1 ring-accent shadow-md"
                            : "border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-card)]/60 hover:border-accent hover:bg-[var(--color-canvas-card)]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)] flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent transition-all">
                              <IconComponent className="w-5 h-5 stroke-[1.5]" />
                            </div>
                            <span className="text-[10px] font-mono text-accent border border-dashed border-accent/40 px-2.5 py-0.5 rounded-full bg-accent/5">
                              Substrate Blueprint
                            </span>
                          </div>
                          <h4 className="text-base font-serif font-bold text-[var(--foreground)] group-hover:text-accent transition-colors leading-snug">
                            {opt.title}
                          </h4>
                          <div className="mt-2 text-xs font-mono text-accent bg-[var(--color-canvas-base)]/80 border border-dashed border-[var(--color-border-subtle)] p-2 rounded-lg">
                            {opt.substrate}
                          </div>
                          <p className="text-xs text-[var(--color-ink-muted)] mt-2 font-sans">
                            {opt.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-dashed border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono text-accent">
                          <span>Generate Blueprint</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-start">
                  <button
                    type="button"
                    data-testid="concierge-back-btn"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-dashed border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-[var(--foreground)] hover:border-accent transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Step 2 (Environment)
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Tailored Studio Recommendation & Blueprint Card */}
            {step === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                data-testid="concierge-recommendation-card"
                className="w-full bg-[var(--color-canvas-card)] rounded-2xl border-2 border-dashed border-accent/80 p-6 sm:p-8 shadow-2xl relative"
              >
                {/* Recommendation Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-dashed border-[var(--color-border-subtle)] pb-6 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-dashed border-accent text-[11px] font-mono font-semibold text-accent mb-2 bg-[var(--color-canvas-base)]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tailored Studio Specification &amp; Blueprint
                    </div>
                    <h3
                      data-testid="concierge-recommended-title"
                      className="text-2xl sm:text-3xl font-serif font-bold text-[var(--foreground)]"
                    >
                      {currentScope.tagline}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1 font-sans">
                      Precision-calibrated for <span className="text-[var(--foreground)] font-medium">{currentScope.title}</span> in {currentEnv.title.toLowerCase()}.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      data-testid="concierge-recommended-badge"
                      className="px-3 py-1 rounded-full border border-dashed border-accent text-xs font-mono font-bold text-accent bg-[var(--color-canvas-base)]"
                    >
                      {currentScope.audienceBadge}
                    </span>
                    <Link
                      href={`/services/${currentScope.id}`}
                      data-testid="concierge-recommended-link"
                      className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:underline py-1 px-2 rounded-md hover:bg-[var(--color-canvas-subtle)] transition-colors"
                    >
                      <span>Explore Vertical</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Grid: Left Column (Specifications) & Right Column (Dedicated PNG Drop Zone Container) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-center">
                  {/* Left Column: Blueprint Details */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-gold)] font-bold">
                      Architectural Specification Matrix
                    </h4>

                    {/* Specification Specs Table */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50">
                        <span className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)] block mb-1">
                          Substrate Core
                        </span>
                        <span className="font-serif font-semibold text-[var(--foreground)] block">
                          {currentMaterial.substrate}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50">
                        <span className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)] block mb-1">
                          Glazing / Barrier
                        </span>
                        <span className="font-serif font-semibold text-[var(--foreground)] block">
                          {currentEnv.glazing}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50">
                        <span className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)] block mb-1">
                          Joinery &amp; Assembly
                        </span>
                        <span className="font-sans text-[var(--foreground)] font-medium block">
                          {details.joinery}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50">
                        <span className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)] block mb-1">
                          Quality Guarantee
                        </span>
                        <span className="font-sans text-[var(--foreground)] font-medium block">
                          {details.warranty}
                        </span>
                      </div>
                    </div>

                    {/* Budget & Turnaround Badges */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-base)] text-xs font-mono text-[var(--foreground)]">
                        <Coins className="w-3.5 h-3.5 text-accent" />
                        <span>Estimated Budget: <strong className="text-accent">{details.budgetRange}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-base)] text-xs font-mono text-[var(--foreground)]">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>Turnaround Lead Time: <strong>{details.leadTime}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dedicated Dashed PNG Drop Zone Container */}
                  <div className="lg:col-span-5">
                    <div
                      data-testid="concierge-dropzone"
                      className="aspect-square sm:aspect-4/3 w-full rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/80 bg-[var(--color-canvas-subtle)]/60 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group hover:border-accent group-hover:border-accent group-hover:bg-accent-light/50 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] flex items-center justify-center text-accent mb-3 bg-[var(--color-canvas-base)]/70 group-hover:scale-105 group-hover:border-accent transition-all duration-300 shadow-md">
                        <UploadCloud className="w-7 h-7 stroke-[1.5]" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-accent mb-1">
                        PNG Studio Drop Zone
                      </span>
                      <h5 className="text-sm sm:text-base font-serif font-medium text-[var(--foreground)]">
                        {currentScope.tagline} Spatial Blueprint
                      </h5>
                      <p className="text-[11px] font-sans text-[var(--color-ink-muted)] mt-1.5 max-w-xs">
                        Designer transparent PNG render container (e.g. /public/images/concierge/{currentScope.id}.png, 1080×1080).
                      </p>
                      <div className="mt-3 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)] text-[10px] font-mono text-accent bg-[var(--color-canvas-base)]/70">
                        1:1 Aspect Ratio • Full-Bleed PNG Asset (300 DPI)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instant Dual Action CTAs + Retake Button */}
                <div className="pt-6 border-t border-dashed border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* RFQ Direct Transition Button */}
                    <Link
                      href={`/rfq?vertical=${currentScope.id}`}
                      data-testid="concierge-rfq-btn"
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent hover:bg-accent-hover active:scale-[0.98] text-[var(--color-accent-contrast)] font-semibold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-md shadow-accent/25 transition-all cursor-pointer"
                    >
                      <span>Configure in RFQ Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* WhatsApp Deep Link Button */}
                    <a
                      href={whatsAppDeepLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="concierge-whatsapp-btn"
                      className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-[#0A2612] font-semibold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
                      </svg>
                      <span>Consult on WhatsApp</span>
                    </a>
                  </div>

                  {/* Retake Decision Quiz */}
                  <button
                    type="button"
                    data-testid="concierge-reset-btn"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-[var(--foreground)] hover:border-accent hover:text-accent transition-colors cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Decision Quiz</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
