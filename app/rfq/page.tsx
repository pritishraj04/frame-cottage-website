"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileText,
  Building2,
  Landmark,
  Palette,
  Sparkles,
  Clock,
  Calendar,
  MapPin,
  Mail,
  Phone,
  User,
  Download,
  RotateCcw,
  Check,
  X,
  FileCheck,
  Briefcase,
  Layers,
  ChevronRight,
  Home,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  CLIENT_TIER_OPTIONS,
  RFQ_VERTICAL_OPTIONS,
  RFQ_MATERIAL_OPTIONS,
  RFQ_CAPABILITY_OPTIONS,
  RFQ_VOLUME_OPTIONS,
  RFQ_TIMELINE_OPTIONS,
  type ClientTierId,
} from "@/lib/constants/rfq";
import { VerticalId } from "@/lib/constants/verticals";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

const fadeSlide: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const STEPS = [
  { step: 1, title: "Client Tier", short: "Tier" },
  { step: 2, title: "Service Verticals", short: "Verticals" },
  { step: 3, title: "Specs & Materials", short: "Specs" },
  { step: 4, title: "Scope & Upload", short: "Scope" },
  { step: 5, title: "Review & Submit", short: "Submit" },
];

function SearchParamsHandler({
  onSelectVertical,
  onOpenConsultation,
}: {
  onSelectVertical: (vert: VerticalId) => void;
  onOpenConsultation: () => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const vertical = searchParams.get("vertical") as VerticalId | null;
    if (
      vertical &&
      [
        "retail-framing",
        "bespoke-framing",
        "spatial-signage",
        "industrial-cnc",
        "custom-gifting",
        "civic-projects",
      ].includes(vertical)
    ) {
      onSelectVertical(vertical);
    }
    if (searchParams.get("consultation") === "true") {
      onOpenConsultation();
    }
  }, [searchParams, onSelectVertical, onOpenConsultation]);

  return null;
}

export default function RFQPortalPage() {
  // Navigation & Step State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);

  // Form State
  const [clientTier, setClientTier] = useState<ClientTierId>("b2b");
  const [selectedVerticals, setSelectedVerticals] = useState<VerticalId[]>([
    "spatial-signage",
    "industrial-cnc",
  ]);

  const handleUrlVertical = React.useCallback((vertical: VerticalId) => {
    setSelectedVerticals([vertical]);
    if (vertical === "civic-projects") {
      setClientTier("public");
    } else if (vertical === "retail-framing" || vertical === "bespoke-framing") {
      setClientTier("b2c");
    } else {
      setClientTier("b2b");
    }
  }, []);

  const handleOpenConsultation = React.useCallback(() => {
    setIsConsultationModalOpen(true);
  }, []);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    "architectural-metals",
    "appalachian-hardwoods",
  ]);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    "cnc-cutting",
    "spatial-modeling",
  ]);
  const [volume, setVolume] = useState<string>("commercial");
  const [timeline, setTimeline] = useState<string>("standard");
  const [tenderId, setTenderId] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      name: "Architectural-Spatial-Facade-Spec.dwg",
      size: "4.8 MB",
      type: "CAD Drawing",
    },
  ]);

  // Client Details Form State
  const [clientName, setClientName] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [projectLocation, setProjectLocation] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");
  const [gemComplianceRequired, setGemComplianceRequired] = useState<boolean>(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedReferenceId, setSubmittedReferenceId] = useState<string>("");
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
      if (!visitedSteps.includes(step)) {
        setVisitedSteps((prev) => [...prev, step]);
      }
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentStep === 2 && selectedVerticals.length === 0) {
      setFormErrors({ verticals: "Please select at least one core service vertical." });
      return;
    }
    setFormErrors({});
    goToStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const toggleVertical = (id: VerticalId) => {
    setSelectedVerticals((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
    if (formErrors.verticals) {
      setFormErrors((prev) => ({ ...prev, verticals: "" }));
    }
  };

  const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleCapability = (id: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: UploadedFile[] = Array.from(files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        type: f.name.split(".").pop()?.toUpperCase() || "FILE",
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!clientName.trim()) errors.clientName = "Full Name is required.";
    if (!clientEmail.trim() || !clientEmail.includes("@"))
      errors.clientEmail = "A valid official email is required.";
    if (!clientPhone.trim()) errors.clientPhone = "Direct phone number is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `FC-RFQ-${new Date().getFullYear()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`;
      setSubmittedReferenceId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 750);
  };

  const handleDownloadSummary = () => {
    const activeTier = CLIENT_TIER_OPTIONS.find((t) => t.id === clientTier);
    const activeVolume = RFQ_VOLUME_OPTIONS.find((v) => v.id === volume);
    const activeTimeline = RFQ_TIMELINE_OPTIONS.find((t) => t.id === timeline);

    const summaryData = {
      referenceId: submittedReferenceId || "DRAFT-SPEC",
      generatedDate: new Date().toISOString(),
      studio: "Frames Cottage Design, Fabrication & Framing Studio",
      clientTier: activeTier?.title,
      selectedVerticals: selectedVerticals.map(
        (v) => RFQ_VERTICAL_OPTIONS.find((opt) => opt.id === v)?.name
      ),
      materials: selectedMaterials.map(
        (m) => RFQ_MATERIAL_OPTIONS.find((opt) => opt.id === m)?.name
      ),
      technicalCapabilities: selectedCapabilities.map(
        (c) => RFQ_CAPABILITY_OPTIONS.find((opt) => opt.id === c)?.name
      ),
      scopeVolume: `${activeVolume?.label} (${activeVolume?.range})`,
      deliveryTimeline: `${activeTimeline?.label} (${activeTimeline?.duration})`,
      tenderReference: tenderId || "N/A",
      uploadedBlueprintsCount: uploadedFiles.length,
      uploadedFiles: uploadedFiles.map((f) => f.name),
      clientDetails: {
        name: clientName || "Valued Client",
        organization: organization || "Studio Partner",
        email: clientEmail || "client@example.com",
        phone: clientPhone || "N/A",
        location: projectLocation || "National / Global",
        notes: projectNotes || "No specific instructions provided.",
        gemComplianceRequired,
      },
      assignedStudioDirector: {
        name: "Vikram Singhania",
        title: "Director of Spatial Architecture & High-Precision Fabrication",
        directEmail: "rfq@framecottage.com",
      },
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(summaryData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `FramesCottage-Specification-${summaryData.referenceId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedReferenceId("");
    setCurrentStep(1);
    setVisitedSteps([1]);
    setClientName("");
    setOrganization("");
    setClientEmail("");
    setClientPhone("");
    setProjectLocation("");
    setProjectNotes("");
    setFormErrors({});
  };

  const currentTierObj = CLIENT_TIER_OPTIONS.find((t) => t.id === clientTier);
  const currentVolumeObj = RFQ_VOLUME_OPTIONS.find((v) => v.id === volume);
  const currentTimelineObj = RFQ_TIMELINE_OPTIONS.find((t) => t.id === timeline);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-accent-gold)]/20 selection:text-[var(--color-accent-gold)]">
      {/* 1. Sticky Navigation Header */}
      <SiteHeader />
      <Suspense fallback={null}>
        <SearchParamsHandler
          onSelectVertical={handleUrlVertical}
          onOpenConsultation={handleOpenConsultation}
        />
      </Suspense>

      <main className="flex-1 w-full flex flex-col overflow-x-clip">
        {/* Editorial Portal Header */}
        <section
          aria-label="RFQ Portal Header"
          className="relative py-12 sm:py-16 border-b border-[var(--color-border-subtle)] bg-gradient-to-b from-[var(--color-canvas-subtle)]/40 via-[var(--background)] to-[var(--background)]"
        >
          {/* Subtle Ambient Studio Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-[500px] h-[350px] rounded-full bg-gradient-to-br from-accent/10 via-[#6B1C23]/10 to-transparent blur-3xl pointer-events-none -z-10"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumbs"
              className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)] mb-6 flex-wrap"
            >
              <Link
                href="/"
                className="hover:text-[var(--color-accent-gold)] transition-colors flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
              <Link
                href="/#categories"
                className="hover:text-[var(--color-accent-gold)] transition-colors"
              >
                Studio Services
              </Link>
              <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
              <span className="text-[var(--color-ink-primary)] font-medium">
                Project Specification & RFQ Portal
              </span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-primary)] shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Commercial & Institutional Gateway</span>
                </div>

                <h1
                  data-testid="rfq-page-title"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-ink-primary)] leading-[1.15]"
                >
                  Project Specification & RFQ Portal
                </h1>

                <p
                  data-testid="rfq-page-subtitle"
                  className="text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed"
                >
                  Configure architectural blueprints, fabrication tolerances, and archival framing requirements.
                  Direct engineering review for private collectors, commercial architects, and GeM public tenders.
                </p>
              </div>

              {/* Client Tier Badges in Header */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {CLIENT_TIER_OPTIONS.map((tier) => {
                  const isActive = clientTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      data-testid={`header-tier-badge-${tier.id}`}
                      onClick={() => {
                        setClientTier(tier.id);
                        goToStep(1);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-accent/15 border-accent text-accent font-semibold shadow-xs"
                          : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] text-[var(--color-ink-secondary)] hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      <tier.icon className="w-3.5 h-3.5" />
                      <span>{tier.shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Step Specification Builder Container */}
        <section className="py-10 sm:py-14 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!isSubmitted ? (
              <>
                {/* 5-Step Progress Indicator */}
                <div
                  data-testid="step-indicator"
                  className="mb-10 sm:mb-12 bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] rounded-2xl p-4 sm:p-6 shadow-sm"
                >
                  {/* Progress Bar Line */}
                  <div className="relative mb-6">
                    <div className="w-full h-1.5 bg-[var(--color-canvas-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Step Buttons */}
                  <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
                    {STEPS.map((s) => {
                      const isComplete = currentStep > s.step;
                      const isCurrent = currentStep === s.step;
                      const isVisited = visitedSteps.includes(s.step);

                      return (
                        <button
                          key={s.step}
                          type="button"
                          data-testid={`step-btn-${s.step}`}
                          disabled={!isVisited && s.step > currentStep + 1}
                          onClick={() => goToStep(s.step)}
                          className={`flex flex-col items-center group transition-all text-left sm:text-center ${
                            !isVisited && s.step > currentStep + 1
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold mb-2 transition-all duration-300 ${
                              isComplete
                                ? "bg-accent text-[var(--color-accent-contrast)]"
                                : isCurrent
                                ? "bg-[var(--color-canvas-subtle)] border-2 border-accent text-accent shadow-sm"
                                : "bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] text-[var(--color-ink-muted)] group-hover:border-[var(--color-border-strong)]"
                            }`}
                          >
                            {isComplete ? (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                            ) : (
                              <span>{s.step}</span>
                            )}
                          </div>
                          <span
                            className={`text-[11px] sm:text-xs font-medium tracking-tight line-clamp-1 transition-colors ${
                              isCurrent
                                ? "text-[var(--color-ink-primary)] font-semibold"
                                : isComplete
                                ? "text-accent"
                                : "text-[var(--color-ink-muted)]"
                            }`}
                          >
                            <span className="hidden sm:inline">{s.title}</span>
                            <span className="sm:hidden">{s.short}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step Content Area with Framer Motion AnimatePresence */}
                <div className="min-h-[460px]">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: Client Category */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        variants={fadeSlide}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        data-testid="step-1-container"
                        className="space-y-8"
                      >
                        <div className="space-y-2">
                          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)]">
                            Select Your Client Tier & Commercial Context
                          </h2>
                          <p className="text-sm sm:text-base text-[var(--color-ink-secondary)]">
                            Our studio deploys distinct engineering standards, dedicated account teams, and procurement documentation for each category.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {CLIENT_TIER_OPTIONS.map((tier) => {
                            const isSelected = clientTier === tier.id;
                            const Icon = tier.icon;
                            return (
                              <div
                                key={tier.id}
                                data-testid={`tier-card-${tier.id}`}
                                onClick={() => setClientTier(tier.id)}
                                className={`relative rounded-2xl p-6 sm:p-7 border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                                  isSelected
                                    ? "bg-[var(--color-canvas-card)] border-accent shadow-lg ring-1 ring-accent/40"
                                    : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] hover:shadow-md"
                                }`}
                              >
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div
                                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                        isSelected
                                          ? "bg-accent/20 text-accent"
                                          : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink-primary)]"
                                      }`}
                                    >
                                      <Icon className="w-6 h-6" />
                                    </div>

                                    <div
                                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                        isSelected
                                          ? "border-accent bg-accent"
                                          : "border-[var(--color-border-strong)] bg-transparent"
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-accent-contrast)] stroke-[3]" />}
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                                      {tier.badge}
                                    </span>
                                    <h3 className="font-serif text-xl font-semibold text-[var(--color-ink-primary)] mt-1">
                                      {tier.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] mt-2 leading-relaxed">
                                      {tier.subtitle}
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-[var(--color-border-subtle)] space-y-2">
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-ink-muted)]">
                                      Key Protocols
                                    </p>
                                    <ul className="space-y-1.5">
                                      {tier.highlights.map((h, i) => (
                                        <li
                                          key={i}
                                          className="flex items-center gap-2 text-xs text-[var(--color-ink-secondary)]"
                                        >
                                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                                          <span>{h}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-ink-muted)]">
                                  <span className="font-medium text-[var(--color-ink-secondary)]">Best for: </span>
                                  {tier.recommendedFor}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Core Service Verticals Multi-Select */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        variants={fadeSlide}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        data-testid="step-2-container"
                        className="space-y-8"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)]">
                              Select Core Service Verticals (Multi-Select)
                            </h2>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-accent-gold)]">
                              {selectedVerticals.length} Selected
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-[var(--color-ink-secondary)]">
                            Choose all fabrication disciplines and studio departments involved in your scope of work.
                          </p>
                          {formErrors.verticals && (
                            <p className="text-xs text-red-400 font-medium">{formErrors.verticals}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {RFQ_VERTICAL_OPTIONS.map((vertical) => {
                            const isSelected = selectedVerticals.includes(vertical.id);
                            const Icon = vertical.icon;

                            return (
                              <div
                                key={vertical.id}
                                data-testid={`vertical-card-${vertical.id}`}
                                onClick={() => toggleVertical(vertical.id)}
                                className={`rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                                  isSelected
                                    ? "bg-[var(--color-canvas-card)] border-accent shadow-md ring-1 ring-accent/40"
                                    : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] hover:shadow-xs"
                                }`}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div
                                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                        isSelected
                                          ? "bg-accent/20 text-accent"
                                          : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink-primary)]"
                                      }`}
                                    >
                                      <Icon className="w-5 h-5" />
                                    </div>

                                    <div
                                      data-testid={`vertical-checkbox-${vertical.id}`}
                                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                        isSelected
                                          ? "border-accent bg-accent"
                                          : "border-[var(--color-border-strong)] bg-transparent"
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-accent-contrast)] stroke-[3]" />}
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
                                      {vertical.audienceBadge}
                                    </span>
                                    <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)] mt-0.5">
                                      {vertical.name}
                                    </h3>
                                    <p className="text-xs text-[var(--color-ink-secondary)] mt-1.5 leading-relaxed">
                                      {vertical.subtitle}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center gap-1.5 flex-wrap">
                                  {vertical.deliverables.map((deliv, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-canvas-subtle)] text-[var(--color-ink-secondary)]"
                                    >
                                      {deliv}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Materials & Technical Capabilities */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-3"
                        variants={fadeSlide}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        data-testid="step-3-container"
                        className="space-y-10"
                      >
                        <div className="space-y-2">
                          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)]">
                            Specify Materials & Technical Capabilities
                          </h2>
                          <p className="text-sm sm:text-base text-[var(--color-ink-secondary)]">
                            Define the architectural substrates, archival conservation standards, and fabrication tolerances required.
                          </p>
                        </div>

                        {/* Sub-Group 1: Architectural & Archival Materials */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-accent" />
                            <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)]">
                              1. Architectural & Conservation Materials
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {RFQ_MATERIAL_OPTIONS.map((material) => {
                              const isSelected = selectedMaterials.includes(material.id);
                              const Icon = material.icon;

                              return (
                                <div
                                  key={material.id}
                                  data-testid={`material-toggle-${material.id}`}
                                  onClick={() => toggleMaterial(material.id)}
                                  className={`rounded-xl p-4 sm:p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                      ? "bg-[var(--color-canvas-card)] border-accent shadow-xs"
                                      : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)]"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                          isSelected
                                            ? "bg-accent/20 text-accent"
                                            : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)]"
                                        }`}
                                      >
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                                          {material.badge}
                                        </span>
                                        <h4 className="font-semibold text-sm text-[var(--color-ink-primary)]">
                                          {material.name}
                                        </h4>
                                      </div>
                                    </div>

                                    <div
                                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-1 ${
                                        isSelected
                                          ? "border-accent bg-accent"
                                          : "border-[var(--color-border-strong)] bg-transparent"
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3 h-3 text-[var(--color-accent-contrast)] stroke-[3]" />}
                                    </div>
                                  </div>
                                  <p className="text-xs text-[var(--color-ink-secondary)] mt-3 leading-relaxed">
                                    {material.spec}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Sub-Group 2: Capabilities Required */}
                        <div className="space-y-4 pt-4 border-t border-[var(--color-border-subtle)]">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-accent" />
                            <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)]">
                              2. Required Studio Capabilities & Engineering Services
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {RFQ_CAPABILITY_OPTIONS.map((cap) => {
                              const isSelected = selectedCapabilities.includes(cap.id);
                              const Icon = cap.icon;

                              return (
                                <div
                                  key={cap.id}
                                  data-testid={`capability-toggle-${cap.id}`}
                                  onClick={() => toggleCapability(cap.id)}
                                  className={`rounded-xl p-4 sm:p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                      ? "bg-[var(--color-canvas-card)] border-accent shadow-xs"
                                      : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)]"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                          isSelected
                                            ? "bg-accent/20 text-accent"
                                            : "bg-[var(--color-canvas-subtle)] text-[var(--color-ink-muted)]"
                                        }`}
                                      >
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                                          {cap.badge}
                                        </span>
                                        <h4 className="font-semibold text-sm text-[var(--color-ink-primary)]">
                                          {cap.name}
                                        </h4>
                                      </div>
                                    </div>

                                    <div
                                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-1 ${
                                        isSelected
                                          ? "border-accent bg-accent"
                                          : "border-[var(--color-border-strong)] bg-transparent"
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3 h-3 text-[var(--color-accent-contrast)] stroke-[3]" />}
                                    </div>
                                  </div>
                                  <p className="text-xs text-[var(--color-ink-secondary)] mt-3 leading-relaxed">
                                    {cap.spec}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Project Scope, Timeline & Blueprint Upload */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step-4"
                        variants={fadeSlide}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        data-testid="step-4-container"
                        className="space-y-10"
                      >
                        <div className="space-y-2">
                          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)]">
                            Scope Volume, Production Cadence & Blueprints
                          </h2>
                          <p className="text-sm sm:text-base text-[var(--color-ink-secondary)]">
                            Indicate anticipated unit volume, deadline urgency, and drop in architectural CAD or artwork files.
                          </p>
                        </div>

                        {/* Volume Selection */}
                        <div className="space-y-3">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]">
                            1. Estimated Project Volume & Unit Scale
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {RFQ_VOLUME_OPTIONS.map((vol) => {
                              const isSelected = volume === vol.id;
                              return (
                                <div
                                  key={vol.id}
                                  data-testid={`volume-option-${vol.id}`}
                                  onClick={() => setVolume(vol.id)}
                                  className={`rounded-xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? "bg-[var(--color-canvas-card)] border-accent shadow-xs"
                                      : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)]"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-[var(--color-ink-primary)]">
                                      {vol.label}
                                    </span>
                                    <span className="text-[11px] font-bold text-accent">
                                      {vol.range}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[var(--color-ink-muted)] mt-1 leading-relaxed">
                                    {vol.description}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Timeline Selection */}
                        <div className="space-y-3 pt-4 border-t border-[var(--color-border-subtle)]">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]">
                            2. Target Delivery Schedule
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {RFQ_TIMELINE_OPTIONS.map((time) => {
                              const isSelected = timeline === time.id;
                              return (
                                <div
                                  key={time.id}
                                  data-testid={`timeline-option-${time.id}`}
                                  onClick={() => setTimeline(time.id)}
                                  className={`rounded-xl p-4 border-2 transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? "bg-[var(--color-canvas-card)] border-accent shadow-xs"
                                      : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)]"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-[var(--color-ink-primary)]">
                                      {time.label}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-canvas-subtle)] text-accent font-medium">
                                      {time.duration}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[var(--color-ink-muted)] mt-1.5 leading-relaxed">
                                    {time.description}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Government Tender / RFP Reference ID */}
                        <div className="space-y-3 pt-4 border-t border-[var(--color-border-subtle)]">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="tender-id-input"
                              className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]"
                            >
                              3. GeM Tender / RFP Reference ID (Optional)
                            </label>
                            <span className="text-[11px] text-[var(--color-ink-muted)]">
                              For GeM & Corporate Portals
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              id="tender-id-input"
                              type="text"
                              data-testid="tender-id-input"
                              value={tenderId}
                              onChange={(e) => setTenderId(e.target.value)}
                              placeholder="e.g. GeM-2026-B-89104 or RFP-ARCH-442"
                              className="w-full px-4 py-3 rounded-xl bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                            />
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]">
                              <Landmark className="w-4 h-4" />
                            </div>
                          </div>
                          <p className="text-[11px] text-[var(--color-ink-muted)]">
                            Entering your official tender reference maps this submission directly to our institutional bidding and compliance desk.
                          </p>
                        </div>

                        {/* Spatial Dashed Container Drop Zone */}
                        <div className="space-y-3 pt-4 border-t border-[var(--color-border-subtle)]">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]">
                              4. Architectural Blueprint & Artwork Drop Zone
                            </label>
                            <span className="text-[11px] text-[var(--color-ink-muted)]">
                              CAD, BIM, PDF, STEP, TIFF, PNG
                            </span>
                          </div>

                          <div
                            data-testid="blueprint-dropzone"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-[var(--color-border-strong)]/70 hover:border-accent rounded-2xl p-8 sm:p-10 text-center bg-[var(--color-canvas-subtle)]/30 hover:bg-[var(--color-canvas-subtle)]/50 transition-all cursor-pointer group"
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              data-testid="blueprint-file-input"
                              onChange={handleFileUpload}
                              className="hidden"
                              accept=".dwg,.dxf,.pdf,.step,.stp,.tiff,.tif,.png,.jpg,.jpeg,.ai"
                            />

                            <div className="w-14 h-14 rounded-2xl bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] group-hover:border-accent mx-auto flex items-center justify-center text-accent transition-colors shadow-2xs mb-4">
                              <UploadCloud className="w-7 h-7" />
                            </div>

                            <h4 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)]">
                              Drop Architectural Blueprints & CAD Specifications Here
                            </h4>
                            <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] max-w-md mx-auto mt-1.5">
                              Drag and drop your DWG, DXF, 3D STEP, Vector PDF, or high-res TIFF artwork (up to 250MB per file).
                            </p>

                            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                              {["CAD / DWG", "Vector PDF", "3D STEP", "TIFF / PNG", "BIM Revit"].map((fmt, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-secondary)]"
                                >
                                  {fmt}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Attached Files List */}
                          {uploadedFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs font-semibold text-[var(--color-ink-primary)]">
                                Attached Specifications ({uploadedFiles.length}):
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {uploadedFiles.map((file, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-xs"
                                  >
                                    <div className="flex items-center gap-2.5 truncate pr-2">
                                      <FileText className="w-4 h-4 text-accent shrink-0" />
                                      <div className="truncate">
                                        <p className="font-medium text-[var(--color-ink-primary)] truncate">
                                          {file.name}
                                        </p>
                                        <p className="text-[10px] text-[var(--color-ink-muted)]">
                                          {file.size} • {file.type}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      data-testid={`remove-file-${idx}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(idx);
                                      }}
                                      className="p-1 rounded-md text-[var(--color-ink-muted)] hover:text-red-400 hover:bg-[var(--color-canvas-subtle)] transition-colors"
                                      title="Remove specification"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 5: Client Details & Submission */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step-5"
                        variants={fadeSlide}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        data-testid="step-5-container"
                        className="space-y-8"
                      >
                        <div className="space-y-2">
                          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)]">
                            Final Review & Authorized Contact Details
                          </h2>
                          <p className="text-sm sm:text-base text-[var(--color-ink-secondary)]">
                            Provide your project lead contact information. Your formal bill of quantities and CAD feasibility analysis will be delivered directly.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          {/* Left Column: Form Details */}
                          <form
                            onSubmit={handleSubmit}
                            className="lg:col-span-7 space-y-5 bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8 shadow-xs"
                          >
                            <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)] border-b border-[var(--color-border-subtle)] pb-3">
                              Lead Contact & Installation Location
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-[var(--color-ink-secondary)]">
                                  Full Name / Project Lead *
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    name="clientName"
                                    data-testid="input-client-name"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    placeholder="e.g. Ar. Rajesh Mehra"
                                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-canvas-subtle)] border text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none transition-colors ${
                                      formErrors.clientName
                                        ? "border-red-400 focus:border-red-400"
                                        : "border-[var(--color-border-subtle)] focus:border-accent focus:ring-1 focus:ring-accent"
                                    }`}
                                  />
                                  <User className="w-4 h-4 text-[var(--color-ink-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                                {formErrors.clientName && (
                                  <p className="text-[11px] text-red-400">{formErrors.clientName}</p>
                                )}
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-[var(--color-ink-secondary)]">
                                  Organization / Studio / Ministry
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    name="organization"
                                    data-testid="input-organization"
                                    value={organization}
                                    onChange={(e) => setOrganization(e.target.value)}
                                    placeholder="e.g. Studio Morphogenesis / CPWD"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] focus:border-accent focus:ring-1 focus:ring-accent text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none transition-colors"
                                  />
                                  <Building2 className="w-4 h-4 text-[var(--color-ink-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-[var(--color-ink-secondary)]">
                                  Official Email Address *
                                </label>
                                <div className="relative">
                                  <input
                                    type="email"
                                    name="clientEmail"
                                    data-testid="input-client-email"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    placeholder="director@firm.com"
                                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-canvas-subtle)] border text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none transition-colors ${
                                      formErrors.clientEmail
                                        ? "border-red-400 focus:border-red-400"
                                        : "border-[var(--color-border-subtle)] focus:border-accent focus:ring-1 focus:ring-accent"
                                    }`}
                                  />
                                  <Mail className="w-4 h-4 text-[var(--color-ink-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                                {formErrors.clientEmail && (
                                  <p className="text-[11px] text-red-400">{formErrors.clientEmail}</p>
                                )}
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-[var(--color-ink-secondary)]">
                                  Direct Phone / WhatsApp *
                                </label>
                                <div className="relative">
                                  <input
                                    type="tel"
                                    name="clientPhone"
                                    data-testid="input-client-phone"
                                    value={clientPhone}
                                    onChange={(e) => setClientPhone(e.target.value)}
                                    placeholder="+91 98100 XXXXX"
                                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-canvas-subtle)] border text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none transition-colors ${
                                      formErrors.clientPhone
                                        ? "border-red-400 focus:border-red-400"
                                        : "border-[var(--color-border-subtle)] focus:border-accent focus:ring-1 focus:ring-accent"
                                    }`}
                                  />
                                  <Phone className="w-4 h-4 text-[var(--color-ink-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                                {formErrors.clientPhone && (
                                  <p className="text-[11px] text-red-400">{formErrors.clientPhone}</p>
                                )}
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-xs font-medium text-[var(--color-ink-secondary)]">
                                Project Site / Delivery Location
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="projectLocation"
                                  data-testid="input-project-location"
                                  value={projectLocation}
                                  onChange={(e) => setProjectLocation(e.target.value)}
                                  placeholder="e.g. Aerocity HQ, New Delhi / BKC, Mumbai"
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] focus:border-accent focus:ring-1 focus:ring-accent text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none transition-colors"
                                />
                                <MapPin className="w-4 h-4 text-[var(--color-ink-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-xs font-medium text-[var(--color-ink-secondary)]">
                                Technical Specifications & Project Notes
                              </label>
                              <textarea
                                name="projectNotes"
                                data-testid="input-project-notes"
                                rows={3}
                                value={projectNotes}
                                onChange={(e) => setProjectNotes(e.target.value)}
                                placeholder="Detail any non-standard tolerances, seismic rigging considerations, custom bronze patinas, or archival glazing specifications..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] focus:border-accent focus:ring-1 focus:ring-accent text-sm text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none transition-colors resize-none"
                              />
                            </div>

                            <div className="pt-2">
                              <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={gemComplianceRequired}
                                  onChange={(e) => setGemComplianceRequired(e.target.checked)}
                                  className="w-4 h-4 rounded border-[var(--color-border-strong)] text-accent focus:ring-accent"
                                />
                                <span className="text-xs text-[var(--color-ink-secondary)]">
                                  Issue formal GeM tender compliance certificate & official GST proforma invoice
                                </span>
                              </label>
                            </div>

                            <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-4">
                              <button
                                type="button"
                                data-testid="rfq-back-btn"
                                onClick={handleBack}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] hover:bg-[var(--color-canvas-card)] text-xs font-semibold text-[var(--color-ink-secondary)] transition-colors cursor-pointer"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Previous Step</span>
                              </button>

                              <button
                                type="submit"
                                data-testid="rfq-submit-btn"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
                              >
                                {isSubmitting ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-[var(--color-accent-contrast)] border-t-transparent rounded-full animate-spin" />
                                    <span>Registering Specification...</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Submit Specification & RFQ</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            </div>
                          </form>

                          {/* Right Column: Live Project Scope Summary */}
                          <div className="lg:col-span-5 sticky top-28 space-y-4">
                            <div
                              data-testid="live-scope-summary"
                              className="rounded-2xl p-6 bg-[var(--color-canvas-surface)] border-2 border-accent/40 shadow-md space-y-5"
                            >
                              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-5 h-5 text-accent" />
                                  <h3 className="font-serif text-base font-semibold text-[var(--color-ink-primary)]">
                                    Project Scope Summary
                                  </h3>
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                                  Live Spec
                                </span>
                              </div>

                              <div className="space-y-3 text-xs">
                                {/* Tier */}
                                <div>
                                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                                    Client Tier
                                  </span>
                                  <p
                                    data-testid="summary-tier"
                                    className="font-semibold text-sm text-[var(--color-ink-primary)] mt-0.5"
                                  >
                                    {currentTierObj?.title}
                                  </p>
                                </div>

                                {/* Verticals */}
                                <div>
                                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                                    Core Verticals ({selectedVerticals.length})
                                  </span>
                                  <div
                                    data-testid="summary-verticals"
                                    className="flex items-center gap-1.5 flex-wrap mt-1"
                                  >
                                    {selectedVerticals.map((vId) => {
                                      const vert = RFQ_VERTICAL_OPTIONS.find((opt) => opt.id === vId);
                                      return (
                                        <span
                                          key={vId}
                                          className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--color-canvas-subtle)] text-[var(--color-ink-secondary)] font-medium border border-[var(--color-border-subtle)]"
                                        >
                                          {vert?.name}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Materials & Specs */}
                                <div data-testid="summary-specs">
                                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                                    Materials & Capabilities
                                  </span>
                                  <p className="text-xs text-[var(--color-ink-secondary)] mt-0.5">
                                    {selectedMaterials.length} Substrates • {selectedCapabilities.length} Fabrication Services
                                  </p>
                                </div>

                                {/* Volume & Schedule */}
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                                      Unit Volume
                                    </span>
                                    <p
                                      data-testid="summary-volume"
                                      className="font-medium text-xs text-[var(--color-ink-primary)] mt-0.5"
                                    >
                                      {currentVolumeObj?.label} ({currentVolumeObj?.range})
                                    </p>
                                  </div>

                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                                      Schedule
                                    </span>
                                    <p
                                      data-testid="summary-timeline"
                                      className="font-medium text-xs text-[var(--color-ink-primary)] mt-0.5"
                                    >
                                      {currentTimelineObj?.duration}
                                    </p>
                                  </div>
                                </div>

                                {/* Blueprints Attached */}
                                <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                                    Blueprints Attached
                                  </span>
                                  <span
                                    data-testid="summary-files-count"
                                    className="font-semibold text-xs text-[var(--color-ink-primary)]"
                                  >
                                    {uploadedFiles.length} File{uploadedFiles.length === 1 ? "" : "s"}
                                  </span>
                                </div>

                                {tenderId && (
                                  <div className="pt-2 border-t border-[var(--color-border-subtle)]">
                                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                                      Tender / RFP Code
                                    </span>
                                    <p
                                      data-testid="summary-tender-id"
                                      className="font-mono text-xs font-semibold text-[var(--color-accent-gold)] mt-0.5"
                                    >
                                      {tenderId}
                                    </p>
                                  </div>
                                )}

                                {/* Studio SLA Turnaround */}
                                <div
                                  data-testid="summary-turnaround"
                                  className="mt-4 p-3 rounded-xl bg-[var(--color-canvas-subtle)]/70 border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-ink-secondary)] flex items-center gap-2"
                                >
                                  <Clock className="w-4 h-4 text-accent shrink-0" />
                                  <span>
                                    <strong className="text-[var(--color-ink-primary)]">Studio Guarantee: </strong>
                                    Feasibility analysis & BOQ quote within 24 business hours.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Navigation Buttons (for steps 1-4) */}
                {currentStep < 5 && (
                  <div className="mt-12 pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                    <button
                      type="button"
                      data-testid="rfq-back-btn"
                      disabled={currentStep === 1}
                      onClick={handleBack}
                      className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)] text-xs font-semibold text-[var(--color-ink-secondary)] transition-colors ${
                        currentStep === 1
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-[var(--color-canvas-subtle)] cursor-pointer"
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      data-testid="rfq-next-btn"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <span>
                        {currentStep === 1 && "Proceed to Verticals"}
                        {currentStep === 2 && "Proceed to Specs & Materials"}
                        {currentStep === 3 && "Proceed to Scope & Upload"}
                        {currentStep === 4 && "Review & Submit"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Success State upon Submission */
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                data-testid="rfq-success-container"
                className="max-w-3xl mx-auto py-8 text-center space-y-8"
              >
                <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent mx-auto flex items-center justify-center text-accent shadow-xl animate-in zoom-in-75 duration-300">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-accent">
                    Specification Registered
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--color-ink-primary)]">
                    Project RFQ Confirmed
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--color-ink-secondary)] max-w-xl mx-auto leading-relaxed">
                    Your multi-disciplinary project specification has been logged in our engineering fabrication queue. A studio director has been assigned.
                  </p>
                </div>

                {/* Reference ID & Senior Studio Lead Card */}
                <div className="rounded-2xl p-6 sm:p-8 bg-[var(--color-canvas-surface)] border-2 border-[var(--color-border-subtle)] text-left shadow-lg space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-5">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-ink-muted)]">
                        Project RFQ Reference ID
                      </span>
                      <div
                        data-testid="rfq-reference-id"
                        className="font-mono text-xl sm:text-2xl font-bold text-accent mt-0.5 tracking-wider"
                      >
                        {submittedReferenceId}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        Queue Position #1
                      </span>
                    </div>
                  </div>

                  {/* Assigned Senior Lead */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#6B1C23] text-[#F4F1EA] flex items-center justify-center font-serif text-lg font-bold shrink-0 shadow-xs">
                      VS
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">
                        Assigned Senior Studio Lead
                      </span>
                      <h4
                        data-testid="rfq-lead-name"
                        className="font-semibold text-base text-[var(--color-ink-primary)]"
                      >
                        Vikram Singhania
                      </h4>
                      <p className="text-xs text-[var(--color-ink-secondary)]">
                        Director of Spatial Architecture & High-Precision Fabrication
                      </p>
                      <p className="text-[11px] text-[var(--color-ink-muted)]">
                        Direct Desk: +91 11 4821 9900 • rfq@framecottage.com
                      </p>
                    </div>
                  </div>

                  {/* Next Steps List */}
                  <div className="pt-4 border-t border-[var(--color-border-subtle)] space-y-2 text-xs text-[var(--color-ink-secondary)]">
                    <p className="font-semibold text-[var(--color-ink-primary)]">Next Execution Milestones:</p>
                    <ul className="space-y-1 text-[11px]">
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-accent" />
                        CAD drawing & 3D STEP tolerance analysis (±0.1mm review).
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-accent" />
                        Formal Bill of Quantities (BOQ) and itemized pricing quote generated.
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-accent" />
                        {gemComplianceRequired
                          ? "GeM portal documentation and compliance certificate issued."
                          : "Studio material sample kit dispatched to project site."}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Consultation Confirmation Banner */}
                {isConsultationModalOpen && (
                  <div
                    data-testid="consultation-scheduled-banner"
                    className="p-4 rounded-xl bg-accent/10 border border-accent text-left text-xs text-[var(--color-ink-primary)] space-y-1 animate-in fade-in"
                  >
                    <div className="flex items-center gap-2 font-semibold text-accent">
                      <BadgeCheck className="w-4 h-4" />
                      <span>Studio Consultation Reserved</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-ink-secondary)]">
                      A calendar invite and virtual design room link have been sent to <strong>{clientEmail || "your email"}</strong>. Lead engineer Vikram Singhania will host your review.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    data-testid="download-summary-btn"
                    onClick={handleDownloadSummary}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--color-canvas-surface)] border border-[var(--color-border-strong)] hover:border-accent text-xs font-semibold text-[var(--color-ink-primary)] transition-all cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4 text-accent" />
                    <span>Download Specification Summary (PDF/JSON)</span>
                  </button>

                  <button
                    type="button"
                    data-testid="schedule-consultation-btn"
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Schedule Direct Consultation</span>
                  </button>

                  <button
                    type="button"
                    data-testid="create-another-btn"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Create Another Specification</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* 5. Site Footer */}
      <SiteFooter />
    </div>
  );
}
