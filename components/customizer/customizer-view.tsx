"use client";

import React, { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  MOULDINGS,
  MAT_OPTIONS,
  type MouldingId,
  type MatId,
} from "@/lib/constants/frames";
import {
  SIZE_OPTIONS,
  ARTWORK_PRESETS,
  type MatColorId,
  type GlazingId,
  type SizeId,
  type ArtworkPresetId,
  type CustomizerStep,
  calculateCustomizerPrice,
} from "@/lib/constants/customizer";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CustomizerPreviewStage } from "./customizer-preview-stage";
import { CustomizerControls } from "./customizer-controls";
import { CustomizerSpecModal } from "./customizer-spec-modal";
import { useStorefront } from "@/lib/store/storefront-context";
import { Sparkles, ChevronRight, ShieldCheck, Home } from "lucide-react";

export function CustomizerView() {
  const searchParams = useSearchParams();
  const { cartCount } = useStorefront();

  // Search parameters extraction with safe fallbacks
  const paramMoulding = searchParams.get("moulding") as MouldingId | null;
  const paramMat = searchParams.get("mat") as MatId | null;
  const paramSize = searchParams.get("size") as SizeId | null;
  const paramArtwork = searchParams.get("artwork") as ArtworkPresetId | "upload" | null;
  const paramStep = searchParams.get("step") as CustomizerStep | null;

  // Initial State Hydration
  const [mouldingId, setMouldingId] = useState<MouldingId>(() => {
    if (paramMoulding && paramMoulding in MOULDINGS) {
      return paramMoulding;
    }
    return "walnut";
  });

  const [matId, setMatId] = useState<MatId>(() => {
    if (paramMat && paramMat in MAT_OPTIONS) {
      return paramMat;
    }
    return "classic";
  });

  const [matColorId, setMatColorId] = useState<MatColorId>("off-white");
  const [glazingId, setGlazingId] = useState<GlazingId>("conservation-clear");

  const [sizeId, setSizeId] = useState<SizeId>(() => {
    if (paramSize && paramSize in SIZE_OPTIONS) {
      return paramSize;
    }
    return "8x10";
  });

  const [customWidth, setCustomWidth] = useState<number>(16);
  const [customHeight, setCustomHeight] = useState<number>(20);

  const [artworkType, setArtworkType] = useState<"preset" | "upload">(() => {
    if (paramArtwork === "upload" || paramStep === "artwork") {
      return "upload";
    }
    return "preset";
  });

  const [presetId, setPresetId] = useState<ArtworkPresetId>(() => {
    if (paramArtwork && paramArtwork in ARTWORK_PRESETS) {
      return paramArtwork as ArtworkPresetId;
    }
    return "ginkgo";
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const [uploadedImageWidth, setUploadedImageWidth] = useState<number | null>(null);
  const [uploadedImageHeight, setUploadedImageHeight] = useState<number | null>(null);

  const [previewMode, setPreviewMode] = useState<"studio" | "room">("studio");

  const [currentStep, setCurrentStep] = useState<CustomizerStep>(() => {
    if (
      paramStep &&
      ["artwork", "moulding", "mat", "size", "glazing", "review"].includes(paramStep)
    ) {
      return paramStep;
    }
    return "moulding";
  });

  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);

  // Sync state if URL query params change dynamically (React 19 pattern)
  const [prevParams, setPrevParams] = useState({
    moulding: paramMoulding,
    mat: paramMat,
    size: paramSize,
    artwork: paramArtwork,
    step: paramStep,
  });

  if (
    prevParams.moulding !== paramMoulding ||
    prevParams.mat !== paramMat ||
    prevParams.size !== paramSize ||
    prevParams.artwork !== paramArtwork ||
    prevParams.step !== paramStep
  ) {
    setPrevParams({
      moulding: paramMoulding,
      mat: paramMat,
      size: paramSize,
      artwork: paramArtwork,
      step: paramStep,
    });
    if (paramMoulding && paramMoulding in MOULDINGS && paramMoulding !== mouldingId) {
      setMouldingId(paramMoulding);
    }
    if (paramMat && paramMat in MAT_OPTIONS && paramMat !== matId) {
      setMatId(paramMat);
    }
    if (paramSize && paramSize in SIZE_OPTIONS && paramSize !== sizeId) {
      setSizeId(paramSize);
    }
    if (paramArtwork && paramArtwork in ARTWORK_PRESETS && paramArtwork !== presetId) {
      setPresetId(paramArtwork as ArtworkPresetId);
      setArtworkType("preset");
    }
    if (
      paramStep &&
      ["artwork", "moulding", "mat", "size", "glazing", "review"].includes(paramStep) &&
      paramStep !== currentStep
    ) {
      setCurrentStep(paramStep);
    }
  }

  // Update browser URL query params smoothly without full reloads
  const updateQueryParams = useCallback(
    (newMoulding: MouldingId, newMat: MatId, newSize: SizeId, newStep: CustomizerStep) => {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("moulding", newMoulding);
        url.searchParams.set("mat", newMat);
        url.searchParams.set("size", newSize);
        url.searchParams.set("step", newStep);
        window.history.replaceState(null, "", url.toString());
      }
    },
    []
  );

  const handleSelectMoulding = (id: MouldingId) => {
    setMouldingId(id);
    updateQueryParams(id, matId, sizeId, currentStep);
  };

  const handleSelectMat = (id: MatId) => {
    setMatId(id);
    updateQueryParams(mouldingId, id, sizeId, currentStep);
  };

  const handleSelectSize = (id: SizeId) => {
    setSizeId(id);
    updateQueryParams(mouldingId, matId, id, currentStep);
  };

  const handleStepChange = (step: CustomizerStep) => {
    setCurrentStep(step);
    updateQueryParams(mouldingId, matId, sizeId, step);
  };

  const handleImageUploaded = (url: string, name: string, w: number, h: number) => {
    setUploadedImageUrl(url);
    setUploadedImageName(name);
    setUploadedImageWidth(w);
    setUploadedImageHeight(h);
    setArtworkType("upload");
  };

  const handleClearUploadedImage = () => {
    setUploadedImageUrl(null);
    setUploadedImageName(null);
    setUploadedImageWidth(null);
    setUploadedImageHeight(null);
    setArtworkType("preset");
  };

  const handleSelectPresetArtwork = (id: ArtworkPresetId) => {
    setPresetId(id);
    setArtworkType("preset");
  };

  const pricing = calculateCustomizerPrice({
    mouldingId,
    matId,
    glazingId,
    sizeId,
    customWidth,
    customHeight,
  });

  return (
    <div
      data-testid="studio-customizer-page"
      className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] overflow-x-clip"
    >
      <SiteHeader cartCount={cartCount} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb & Atelier Header */}
        <div className="space-y-2">
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center space-x-2 text-xs font-mono text-[var(--color-ink-muted)]"
          >
            <Link
              href="/"
              className="hover:text-accent flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Atelier</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
            <Link
              href="/services/bespoke-framing"
              className="hover:text-accent transition-colors"
            >
              Bespoke Framing
            </Link>
            <ChevronRight className="w-3 h-3 text-[var(--color-border-strong)]" />
            <span className="text-accent font-semibold">Studio Customizer</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-accent/30 bg-accent/10 text-accent mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Interactive Frame Builder • 100% Solid Hardwoods</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)]">
                The Customizer Studio
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] mt-1.5 max-w-2xl font-sans leading-relaxed">
                Configure handcrafted museum moulding, precision 4-ply rag matting, and conservation glazing. Preview your fine art in photorealistic daylight or in-situ residential context.
              </p>
            </div>

            {/* Quick Guarantees Pill */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-[var(--color-ink-muted)] border-l border-[var(--color-border-subtle)] pl-6">
              <div>
                <span className="block text-[var(--color-ink-primary)] font-bold">5–7 Days</span>
                <span>Atelier Lead Time</span>
              </div>
              <div>
                <span className="block text-[var(--color-ink-primary)] font-bold">99% UV</span>
                <span>Conservation Optics</span>
              </div>
              <div>
                <span className="block text-accent font-bold">Free Insured</span>
                <span>Courier Transit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dual-Stage Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Photorealistic Visual Preview Stage */}
          <div id="customizer-preview-anchor" className="lg:col-span-7 relative lg:sticky lg:top-24 space-y-4 scroll-mt-24">
            <CustomizerPreviewStage
              mouldingId={mouldingId}
              matId={matId}
              matColorId={matColorId}
              glazingId={glazingId}
              sizeId={sizeId}
              customWidth={customWidth}
              customHeight={customHeight}
              artworkType={artworkType}
              presetId={presetId}
              uploadedImageUrl={uploadedImageUrl}
              uploadedImageName={uploadedImageName}
              uploadedImageWidth={uploadedImageWidth}
              uploadedImageHeight={uploadedImageHeight}
              previewMode={previewMode}
              onTogglePreviewMode={setPreviewMode}
            />

            {/* Quality & Craftsmanship Micro-Banner */}
            <div className="hidden sm:flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 text-xs text-[var(--color-ink-muted)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Museum-Grade Rag Matboard • pH Neutral &amp; Lignin-Free</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSpecModalOpen(true)}
                className="text-accent hover:underline font-mono text-[11px] cursor-pointer"
              >
                Inspect Technical Schedule →
              </button>
            </div>
          </div>

          {/* Right Column: Customizer Controls Panel */}
          <div className="lg:col-span-5 relative z-10 space-y-6">
            <CustomizerControls
              mouldingId={mouldingId}
              matId={matId}
              matColorId={matColorId}
              glazingId={glazingId}
              sizeId={sizeId}
              customWidth={customWidth}
              customHeight={customHeight}
              artworkType={artworkType}
              presetId={presetId}
              uploadedImageUrl={uploadedImageUrl}
              uploadedImageName={uploadedImageName}
              uploadedImageWidth={uploadedImageWidth}
              uploadedImageHeight={uploadedImageHeight}
              currentStep={currentStep}
              onSelectMoulding={handleSelectMoulding}
              onSelectMat={handleSelectMat}
              onSelectMatColor={setMatColorId}
              onSelectGlazing={setGlazingId}
              onSelectSize={handleSelectSize}
              onChangeCustomDimensions={(w, h) => {
                setCustomWidth(w);
                setCustomHeight(h);
              }}
              onSelectPresetArtwork={handleSelectPresetArtwork}
              onImageUploaded={handleImageUploaded}
              onClearUploadedImage={handleClearUploadedImage}
              onStepChange={handleStepChange}
              onOpenSpecSheet={() => setIsSpecModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Archival Specification Modal */}
      <CustomizerSpecModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
        mouldingId={mouldingId}
        matId={matId}
        matColorId={matColorId}
        glazingId={glazingId}
        sizeId={sizeId}
        customWidth={customWidth}
        customHeight={customHeight}
        artworkType={artworkType}
        presetId={presetId}
        uploadedImageName={uploadedImageName}
        totalPrice={pricing.total}
      />

      <SiteFooter />
    </div>
  );
}
