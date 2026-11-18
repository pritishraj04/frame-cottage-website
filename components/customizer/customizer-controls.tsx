"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  MOULDINGS,
  MOULDING_LIST,
  MAT_OPTIONS,
  MAT_OPTION_LIST,
  type MouldingId,
  type MatId,
} from "@/lib/constants/frames";
import {
  GLAZING_OPTIONS,
  GLAZING_OPTION_LIST,
  MAT_COLORS,
  MAT_COLOR_LIST,
  SIZE_OPTIONS,
  SIZE_OPTION_LIST,
  ARTWORK_PRESETS,
  ARTWORK_PRESET_LIST,
  type GlazingId,
  type MatColorId,
  type SizeId,
  type ArtworkPresetId,
  type CustomizerStep,
  calculateCustomizerPrice,
  calculateDpi,
} from "@/lib/constants/customizer";
import { createWhatsAppCustomizerUrl } from "@/lib/constants/whatsapp";
import { useStorefront, CartItem, WishlistItem } from "@/lib/store/storefront-context";
import { PaymentTypeId, PAYMENT_OPTIONS } from "@/lib/email/invoice-template";
import { cn } from "@/lib/utils";
import {
  UploadCloud,
  Check,
  ShieldCheck,
  ShoppingBag,
  Heart,
  FileText,
  Briefcase,
  Maximize2,
  X,
  CheckCircle2,
  Mail,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendOrderEmail } from "@/app/actions/send-order-email";
import { saveGuestOrder } from "@/app/actions/save-guest-order";

interface CustomizerControlsProps {
  mouldingId: MouldingId;
  matId: MatId;
  matColorId: MatColorId;
  glazingId: GlazingId;
  sizeId: SizeId;
  customWidth: number;
  customHeight: number;
  artworkType: "preset" | "upload";
  presetId: ArtworkPresetId;
  uploadedImageUrl: string | null;
  uploadedImageName: string | null;
  uploadedImageWidth: number | null;
  uploadedImageHeight: number | null;
  currentStep: CustomizerStep;
  onSelectMoulding: (id: MouldingId) => void;
  onSelectMat: (id: MatId) => void;
  onSelectMatColor: (id: MatColorId) => void;
  onSelectGlazing: (id: GlazingId) => void;
  onSelectSize: (id: SizeId) => void;
  onChangeCustomDimensions: (w: number, h: number) => void;
  onSelectPresetArtwork: (id: ArtworkPresetId) => void;
  onImageUploaded: (url: string, name: string, w: number, h: number) => void;
  onClearUploadedImage: () => void;
  onStepChange: (step: CustomizerStep) => void;
  onOpenSpecSheet: () => void;
}

export function CustomizerControls({
  mouldingId,
  matId,
  matColorId,
  glazingId,
  sizeId,
  customWidth,
  customHeight,
  artworkType,
  presetId,
  uploadedImageUrl,
  uploadedImageName,
  uploadedImageWidth,
  uploadedImageHeight,
  currentStep,
  onSelectMoulding,
  onSelectMat,
  onSelectMatColor,
  onSelectGlazing,
  onSelectSize,
  onChangeCustomDimensions,
  onSelectPresetArtwork,
  onImageUploaded,
  onClearUploadedImage,
  onStepChange,
  onOpenSpecSheet,
}: CustomizerControlsProps) {
  const { addToCart, addToWishlist } = useStorefront();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailPaymentType, setEmailPaymentType] = useState<PaymentTypeId>("upi");
  const [emailCustomerName, setEmailCustomerName] = useState("");
  const [emailCustomerEmail, setEmailCustomerEmail] = useState("");
  const [emailCustomerPhone, setEmailCustomerPhone] = useState("");
  const [emailCustomerNotes, setEmailCustomerNotes] = useState("");
  const [emailOrderRef, setEmailOrderRef] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [activeScrollStep, setActiveScrollStep] = useState<CustomizerStep>(currentStep);
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setActiveScrollStep(currentStep);
  }, [currentStep]);

  const handleStepClick = (step: CustomizerStep, sectionId: string) => {
    setActiveScrollStep(step);
    onStepChange(step);
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1000);
    scrollToSection(sectionId);
  };

  useEffect(() => {
    const steps: CustomizerStep[] = ["moulding", "mat", "size", "glazing", "artwork"];

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const offset = 220;
      let matched: CustomizerStep = "moulding";

      for (const step of steps) {
        const el = document.getElementById(`section-${step}`);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            matched = step;
          }
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        matched = "artwork";
      }

      setActiveScrollStep((prev) => (prev !== matched ? matched : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Pricing calculation
  const pricing = calculateCustomizerPrice({
    mouldingId,
    matId,
    glazingId,
    sizeId,
    customWidth,
    customHeight,
  });

  const currentMoulding = MOULDINGS[mouldingId] || MOULDINGS.walnut;
  const currentMat = MAT_OPTIONS[matId] || MAT_OPTIONS.classic;
  const currentMatColor = MAT_COLORS[matColorId] || MAT_COLORS["off-white"];
  const currentGlazing = GLAZING_OPTIONS[glazingId] || GLAZING_OPTIONS["conservation-clear"];
  const currentSize = SIZE_OPTIONS[sizeId] || SIZE_OPTIONS["8x10"];

  const effectiveWidth = sizeId === "custom" ? customWidth : currentSize.widthInches;
  const effectiveHeight = sizeId === "custom" ? customHeight : currentSize.heightInches;

  const dpiInfo = calculateDpi(
    uploadedImageWidth,
    uploadedImageHeight,
    effectiveWidth,
    effectiveHeight
  );

  const activeArtworkName =
    artworkType === "upload"
      ? uploadedImageName || "Client Uploaded Fine Art"
      : ARTWORK_PRESETS[presetId]?.title || "Curated Atelier Artwork";

  const whatsAppCustomizerUrl = createWhatsAppCustomizerUrl({
    mouldingName: currentMoulding.name,
    matName: currentMat.name,
    matColor: currentMatColor.name,
    glazingName: currentGlazing.name,
    size: `${currentSize.label} (${effectiveWidth}″ × ${effectiveHeight}″)`,
    artworkName: activeArtworkName,
    price: pricing.total,
  });

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onImageUploaded(result, file.name, img.naturalWidth, img.naturalHeight);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onImageUploaded(result, file.name, img.naturalWidth, img.naturalHeight);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const cartPayload: Omit<CartItem, "id"> = {
      title: `${currentMoulding.name} Bespoke Frame`,
      category: "Bespoke Framing",
      dimensions: `${currentSize.label} (${effectiveWidth}″ × ${effectiveHeight}″)`,
      specs: `${currentMoulding.material} • ${currentMat.name}${
        currentMat.id !== "none" ? ` (${currentMatColor.name})` : ""
      } • ${currentGlazing.name}`,
      unitPrice: pricing.total,
      quantity: 1,
      vertical: "bespoke-framing",
    };

    addToCart(cartPayload);
    setToastMessage(`Added "${currentMoulding.name} Bespoke Frame" to cart (₹${pricing.total})`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Add to wishlist handler
  const handleAddToWishlist = () => {
    const wishPayload: WishlistItem = {
      id: `fc-custom-${Date.now()}`,
      title: `${currentMoulding.name} Bespoke Frame`,
      category: "Bespoke Framing",
      vertical: "bespoke-framing",
      dimensions: `${currentSize.label} (${effectiveWidth}″ × ${effectiveHeight}″)`,
      material: `${currentMoulding.material} • ${currentMat.name} (${currentMatColor.name})`,
      glazing: currentGlazing.name,
      price: pricing.total,
      aspectGuide: `${currentSize.label} • Bespoke Atelier Custom Frame`,
      svgType: "frame",
    };

    addToWishlist(wishPayload);
    setIsWishlisted(true);
    setToastMessage(`Saved "${currentMoulding.name} Bespoke Frame" to Wishlist`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCustomizerWhatsAppClick = () => {
    const bespokeRef = `FC-BESPOKE-${Math.floor(1000 + Math.random() * 9000)}`;
    const specSummary = `${currentMoulding.name} Moulding (${currentMoulding.dimensions}), ${currentMat.name} Mat (${currentMatColor.name}), ${currentGlazing.name}`;
    saveGuestOrder({
      orderRef: bespokeRef,
      customerName: "Guest Collector",
      customerEmail: "guest@framescottage.com",
      customerPhone: null,
      items: [
        {
          name: `Bespoke Studio Frame - ${currentMoulding.name}`,
          dimensions: `${effectiveWidth}″ × ${effectiveHeight}″`,
          specs: specSummary,
          quantity: 1,
          price: pricing.total,
        },
      ],
      total: pricing.total,
      deliveryMethod: "white-glove",
      status: "confirmed",
      shippingAddress: "",
      specialInstructions: "Customizer Bespoke WhatsApp Order",
    }).catch((err) =>
      console.warn("[Customizer] Failed to save WhatsApp guest order to Supabase:", err)
    );
  };

  const handleOpenEmailModal = () => {
    const ref = `FC-BESPOKE-${Math.floor(1000 + Math.random() * 9000)}`;
    setEmailOrderRef(ref);
    setEmailSuccess(false);
    setEmailError("");
    setIsEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
    setEmailSuccess(false);
    setEmailError("");
  };

  useEffect(() => {
    return () => {
      setIsEmailModalOpen(false);
      setEmailSuccess(false);
      setEmailError("");
    };
  }, []);

  const handleSendCustomizerEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailCustomerEmail || !emailCustomerEmail.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setIsSendingEmail(true);
    setEmailError("");
    try {
      const selectedPaymentOption =
        PAYMENT_OPTIONS.find((p) => p.id === emailPaymentType) || PAYMENT_OPTIONS[0];
      const specSummary = `${currentMoulding.name} Moulding (${currentMoulding.dimensions}), ${currentMat.name} Mat (${currentMatColor.name}), ${currentGlazing.name}`;
      const res = await sendOrderEmail({
        orderRef: emailOrderRef,
        customer: {
          name: emailCustomerName || "Bespoke Framing Client",
          email: emailCustomerEmail,
          phone: emailCustomerPhone,
          address: emailCustomerNotes,
        },
        items: [
          {
            name: `Bespoke Studio Frame - ${currentMoulding.name}`,
            dimensions: `${effectiveWidth}″ × ${effectiveHeight}″`,
            specifications: specSummary,
            quantity: 1,
            price: pricing.total,
          },
        ],
        total: pricing.total,
        subtotal: pricing.total,
        shipping: 0,
        tax: 0,
        discount: 0,
        paymentType: emailPaymentType,
        deliveryMethod: "Insured White-Glove Transit",
        specialNotes: emailCustomerNotes,
        source: "customizer",
      });

      // Persist guest order directly into Supabase table public.orders in background
      saveGuestOrder({
        orderRef: emailOrderRef,
        customerName: emailCustomerName || "Bespoke Framing Client",
        customerEmail: emailCustomerEmail,
        customerPhone: emailCustomerPhone || null,
        items: [
          {
            name: `Bespoke Studio Frame - ${currentMoulding.name}`,
            dimensions: `${effectiveWidth}″ × ${effectiveHeight}″`,
            specs: specSummary,
            quantity: 1,
            price: pricing.total,
          },
        ],
        total: pricing.total,
        subtotal: pricing.total,
        shipping: 0,
        tax: 0,
        discount: 0,
        deliveryMethod: "white-glove",
        status: "confirmed",
        shippingAddress: {
          address: emailCustomerNotes || "",
          paymentType: emailPaymentType,
          paymentLabel: selectedPaymentOption.label,
        },
        specialInstructions: emailCustomerNotes
          ? `${emailCustomerNotes} [Payment: ${selectedPaymentOption.label}]`
          : `Payment: ${selectedPaymentOption.label}`,
      }).catch((err) =>
        console.warn("[Customizer] Failed to save email guest order to Supabase:", err)
      );

      if (res.success) {
        try {
          const existing = JSON.parse(localStorage.getItem("fc_saved_orders_v1") || "[]");
          const newOrder = {
            id: emailOrderRef,
            title: `Bespoke ${currentMoulding.name} Frame (${effectiveWidth}″ × ${effectiveHeight}″)`,
            date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            total: `₹${pricing.total.toLocaleString("en-IN")}`,
            status: "In Joinery" as const,
            tracking: `DISPATCH-${emailOrderRef}`,
            specs: `${specSummary} • Requisition via Resend Email`,
            stage: "Spec Sheet Transmitted",
          };
          localStorage.setItem("fc_saved_orders_v1", JSON.stringify([newOrder, ...existing]));
        } catch {}
        setEmailSuccess(true);
      } else {
        setEmailError(res.error || "Failed to dispatch email.");
      }
    } catch (err: any) {
      setEmailError(err.message || "Failed to dispatch email.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const rfqUrl = `/rfq?source=customizer&specs=${encodeURIComponent(
    `${currentMoulding.id}-${currentMat.id}-${currentSize.id}-${currentGlazing.id}`
  )}`;

  return (
    <div
      data-testid="customizer-controls-panel"
      className="flex flex-col w-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-xl overflow-x-clip"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          data-testid="customizer-cart-toast"
          role="status"
          aria-live="polite"
          className="flex items-center justify-between px-5 py-3 bg-accent text-[var(--color-accent-contrast)] font-medium text-xs sm:text-sm animate-in fade-in slide-in-from-top duration-300 z-30"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 rounded hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Quick Jump Ribbon */}
      <div className="sticky top-16 sm:top-20 z-30 bg-[var(--color-canvas-surface)] border-b border-[var(--color-border-subtle)] shadow-sm rounded-none lg:rounded-t-2xl flex items-center">
        {/* Left/Middle: Scrollable steps */}
        <div className="flex-1 min-w-0 overflow-x-auto scrollbar-none flex items-center gap-1.5 py-2.5 pl-3 pr-2 text-xs">
          {/* Mobile-only Preview Anchor button */}
          <button
            type="button"
            data-testid="mobile-scroll-preview-btn"
            onClick={() => {
              const el = document.getElementById("customizer-preview-anchor");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="lg:hidden px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer bg-[var(--color-canvas-subtle)] text-accent border border-accent/30 hover:bg-accent/10 flex items-center gap-1 shrink-0"
          >
            <span data-testid="customizer-quick-preview-btn">↑ Preview</span>
          </button>
          <span className="lg:hidden text-[var(--color-border-strong)] shrink-0">•</span>

          <button
            type="button"
            data-testid="customizer-step-moulding"
            onClick={() => handleStepClick("moulding", "section-moulding")}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0",
              activeScrollStep === "moulding"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            1. Moulding
          </button>
          <span className="text-[var(--color-border-strong)] shrink-0">•</span>
          <button
            type="button"
            data-testid="customizer-step-mat"
            onClick={() => handleStepClick("mat", "section-mat")}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0",
              activeScrollStep === "mat"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            2. Matting
          </button>
          <span className="text-[var(--color-border-strong)] shrink-0">•</span>
          <button
            type="button"
            data-testid="customizer-step-size"
            onClick={() => handleStepClick("size", "section-size")}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0",
              activeScrollStep === "size"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            3. Size
          </button>
          <span className="text-[var(--color-border-strong)] shrink-0">•</span>
          <button
            type="button"
            data-testid="customizer-step-glazing"
            onClick={() => handleStepClick("glazing", "section-glazing")}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0",
              activeScrollStep === "glazing"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            4. Glazing
          </button>
          <span className="text-[var(--color-border-strong)] shrink-0">•</span>
          <button
            type="button"
            data-testid="customizer-step-artwork"
            onClick={() => handleStepClick("artwork", "section-artwork")}
            className={cn(
              "px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0",
              activeScrollStep === "artwork"
                ? "bg-accent text-[var(--color-accent-contrast)] font-semibold"
                : "hover:bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)]"
            )}
          >
            5. Artwork
          </button>
        </div>

        {/* Right: Always-visible pinned live price chip on mobile */}
        <div
          data-testid="mobile-live-price"
          className="shrink-0 flex items-center pl-2 pr-3 py-2.5 border-l border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)] lg:hidden"
        >
          <span
            data-testid="customizer-ribbon-mobile-price"
            className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-serif font-bold text-xs"
          >
            ₹{pricing.total}
          </span>
        </div>
      </div>

      {/* Stacked Interactive Configuration Panels */}
      <div className="p-5 sm:p-7 space-y-8 divide-y divide-[var(--color-border-subtle)]">
        {/* Section 1: Solid Hardwood Moulding Profile */}
        <section id="section-moulding" className="space-y-3.5 pt-0 scroll-mt-32 sm:scroll-mt-36">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                1. Solid Hardwood Moulding Profile
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Precision-milled sustainable American hardwoods with hand-finished oil &amp; leaf.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--color-ink-muted)]">
              {currentMoulding.dimensions}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label="Moulding profiles"
            data-testid="moulding-picker"
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
          >
            {MOULDING_LIST.map((m) => {
              const isSelected = m.id === mouldingId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`moulding-option-${m.id}`}
                  onClick={() => onSelectMoulding(m.id)}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative group",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-md ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ background: m.swatchGradient }}
                      className={cn(
                        "block w-8 h-8 rounded-full shadow-xs border border-black/20 shrink-0 transition-transform group-hover:scale-105",
                        isSelected && "ring-2 ring-offset-2 ring-accent"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[var(--color-ink-primary)] leading-tight">
                          {m.shortName}
                        </h4>
                        {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                      </div>
                      <span className="text-[11px] font-serif font-bold text-accent">
                        ₹{m.basePrice}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[var(--color-ink-muted)] mt-1.5 line-clamp-1">
                    {m.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Archival Matting Margin & Tone */}
        <section id="section-mat" className="space-y-4 pt-6 scroll-mt-32 sm:scroll-mt-36">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                2. Archival Matting Margin &amp; Museum Tone
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                100% Alpha-cellulose 4-ply cotton rag with 45-degree beveled cut line.
              </p>
            </div>
          </div>

          {/* Margins */}
          <div
            role="radiogroup"
            aria-label="Mat margin width"
            data-testid="mat-picker"
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
          >
            {MAT_OPTION_LIST.map((mat) => {
              const isSelected = mat.id === matId;
              return (
                <button
                  key={mat.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`mat-option-${mat.id}`}
                  onClick={() => onSelectMat(mat.id)}
                  className={cn(
                    "flex flex-row sm:flex-col items-center sm:items-start justify-between p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer gap-2",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-xs ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-ink-primary)]">
                        {mat.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0 hidden sm:block" />}
                    </div>
                    <span className="text-[11px] text-[var(--color-ink-muted)] mt-0.5 block">
                      {mat.widthInches}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 sm:w-full sm:justify-between sm:mt-2">
                    <span className="font-serif text-xs font-bold text-accent">
                      {mat.price === 0 ? "Included" : `+₹${mat.price}`}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0 sm:hidden" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mat Color Options (Active if Mat is not 'none') */}
          {matId !== "none" && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]">
                Archival Mat Tone:
              </span>
              <div
                role="radiogroup"
                aria-label="Matboard colors"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
              >
                {MAT_COLOR_LIST.map((c) => {
                  const isSelected = c.id === matColorId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      data-testid={`mat-color-${c.id}`}
                      onClick={() => onSelectMatColor(c.id)}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border text-left transition-all duration-200 cursor-pointer",
                        isSelected
                          ? "border-accent bg-accent-light/30 ring-1 ring-accent"
                          : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40"
                      )}
                    >
                      <span
                        style={{ backgroundColor: c.hex, borderColor: c.borderColor }}
                        className="w-5 h-5 rounded-full border shadow-2xs shrink-0"
                      />
                      <span className="text-[11px] font-medium text-[var(--color-ink-primary)] truncate">
                        {c.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Frame Dimensions & Aperture */}
        <section id="section-size" className="space-y-4 pt-6 scroll-mt-32 sm:scroll-mt-36">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                3. Frame Dimensions &amp; Geometry
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Standard gallery formats or millimeter-cut custom sizes.
              </p>
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Frame dimensions"
            data-testid="size-picker"
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
          >
            {SIZE_OPTION_LIST.map((s) => {
              const isSelected = s.id === sizeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`size-option-${s.id}`}
                  onClick={() => onSelectSize(s.id)}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer relative",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-xs ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  <div className="flex items-center justify-between gap-1.5 w-full">
                    <span className="text-xs font-bold text-[var(--color-ink-primary)]">
                      {s.label}
                    </span>
                    {s.popular && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase bg-accent text-[var(--color-accent-contrast)] font-bold shrink-0">
                        Standard
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--color-ink-muted)] font-mono mt-0.5">
                    {s.dimensions}
                  </span>
                  <div className="pt-1.5 mt-1.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--color-ink-muted)]">{s.aspectRatio}</span>
                    <span className="font-serif font-bold text-accent">
                      {s.id === "custom"
                        ? "Scale"
                        : s.priceDelta === 0
                        ? "Base"
                        : `+₹${s.priceDelta}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Dimension Box */}
          {sizeId === "custom" && (
            <div className="p-3.5 rounded-xl border border-dashed border-accent/80 bg-accent-light/10 space-y-2.5">
              <div className="flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-wider">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Custom Aperture Builder (Inches)</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[var(--color-ink-secondary)] mb-1">
                    Width (in):
                  </label>
                  <input
                    type="number"
                    min={6}
                    max={60}
                    step={0.5}
                    value={customWidth}
                    onChange={(e) =>
                      onChangeCustomDimensions(
                        Math.max(6, Math.min(60, parseFloat(e.target.value) || 6)),
                        customHeight
                      )
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[var(--color-ink-secondary)] mb-1">
                    Height (in):
                  </label>
                  <input
                    type="number"
                    min={6}
                    max={72}
                    step={0.5}
                    value={customHeight}
                    onChange={(e) =>
                      onChangeCustomDimensions(
                        customWidth,
                        Math.max(6, Math.min(72, parseFloat(e.target.value) || 6))
                      )
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-primary)]"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-ink-muted)] font-mono">
                Metric: {Math.round(customWidth * 25.4)} × {Math.round(customHeight * 25.4)} mm • Proportional scale: +₹{pricing.sizePrice}
              </p>
            </div>
          )}
        </section>

        {/* Section 4: Conservation Glazing */}
        <section id="section-glazing" className="space-y-3.5 pt-6 scroll-mt-32 sm:scroll-mt-36">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                4. Conservation Glazing Selection
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Every frame includes 99% UV-protective museum optics.
              </p>
            </div>
          </div>

          <div
            role="radiogroup"
            aria-label="Conservation glazing"
            data-testid="glazing-picker"
            className="space-y-2.5"
          >
            {GLAZING_OPTION_LIST.map((g) => {
              const isSelected = g.id === glazingId;
              return (
                <button
                  key={g.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  data-testid={`glazing-option-${g.id}`}
                  onClick={() => onSelectGlazing(g.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer gap-3",
                    isSelected
                      ? "border-accent bg-accent-light/30 shadow-xs ring-1 ring-accent"
                      : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40 hover:bg-[var(--color-canvas-subtle)]"
                  )}
                >
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--color-ink-primary)]">
                        {g.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                    </div>
                    <p className="text-[11px] text-[var(--color-ink-secondary)]">
                      {g.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-mono text-accent pt-1">
                      <span>{g.uvProtection}</span>
                      <span>•</span>
                      <span>{g.reflection}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-sm font-bold text-accent">
                      {g.price === 0 ? "Included" : `+₹${g.price}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 5: Fine Art & Archival Upload Dropzone */}
        <section id="section-artwork" className="space-y-4 pt-6 scroll-mt-32 sm:scroll-mt-36">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[var(--color-ink-primary)]">
                5. Artwork &amp; Fine Art Upload Dropzone
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Drag and drop your fine art file or select a museum archival specimen.
              </p>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            data-testid="customizer-upload-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer group",
              uploadedImageUrl
                ? "border-accent bg-accent-light/20"
                : "border-[var(--color-border-strong)] hover:border-accent bg-[var(--color-canvas-subtle)]/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              data-testid="customizer-file-input"
              accept="image/*,.png,.jpg,.jpeg,.webp,.tiff"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploadedImageUrl ? (
              <div className="flex items-center gap-3 w-full text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded thumbnail"
                  className="w-12 h-12 object-contain rounded border border-[var(--color-border-subtle)] bg-black/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-xs truncate">
                      {uploadedImageName || "Client Fine Art Upload"}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-ink-muted)] mt-0.5">
                    {uploadedImageWidth}×{uploadedImageHeight} px • <span className="text-accent font-semibold">{dpiInfo.badgeText}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearUploadedImage();
                  }}
                  className="p-1 rounded text-[var(--color-ink-muted)] hover:text-rose-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-accent mb-1.5 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-[var(--color-ink-primary)]">
                  Click or Drag &amp; Drop Fine Art File Here
                </span>
                <span className="text-[10px] text-[var(--color-ink-muted)] mt-0.5">
                  High-res PNG, JPG, WebP, or TIFF up to 50MB
                </span>
              </>
            )}
          </div>

          {/* Curated Presets */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-secondary)]">
              Or Choose Curated Atelier Preset:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {ARTWORK_PRESET_LIST.map((p) => {
                const isSelected = artworkType === "preset" && presetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    data-testid={`artwork-preset-${p.id}`}
                    onClick={() => onSelectPresetArtwork(p.id)}
                    className={cn(
                      "flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-accent bg-accent-light/30 ring-1 ring-accent"
                        : "border-[var(--color-border-subtle)] hover:border-accent/60 bg-[var(--color-canvas-subtle)]/40"
                    )}
                  >
                    <div
                      style={{ backgroundColor: p.accentColor }}
                      className="w-7 h-7 rounded text-white text-[11px] font-serif font-bold flex items-center justify-center shrink-0"
                    >
                      {p.title.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-[var(--color-ink-primary)] truncate">
                        {p.title}
                      </span>
                      <span className="block text-[10px] text-[var(--color-ink-muted)] truncate">
                        {p.artist}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Action & Pricing Deck */}
      <div className="p-5 sm:p-6 bg-[var(--color-canvas-subtle)] border-t border-[var(--color-border-subtle)] space-y-4">
        {/* Itemized Price Summary */}
        <div
          data-testid="customizer-price-breakdown"
          className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
        >
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)] font-mono">
              Itemized Atelier Total:
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <span
                data-testid="customizer-total-price"
                className="font-serif text-2xl sm:text-3xl font-bold text-accent"
              >
                ₹{pricing.total}
              </span>
              <span data-testid="frame-price-amount" className="sr-only">
                ₹{pricing.total}
              </span>
              <span className="text-xs text-[var(--color-ink-muted)] font-mono">
                (Moulding ₹{pricing.mouldingPrice} + Mat ₹{pricing.matPrice} + Glazing ₹{pricing.glazingPrice} + Size ₹{pricing.sizePrice})
              </span>
            </div>
          </div>

          <button
            type="button"
            data-testid="customizer-spec-sheet"
            onClick={onOpenSpecSheet}
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold cursor-pointer shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Archival Spec Sheet</span>
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={whatsAppCustomizerUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="customizer-order-whatsapp"
              onClick={handleCustomizerWhatsAppClick}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-[#0A2612] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md cursor-pointer group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
              </svg>
              <span>Order via WhatsApp (₹{pricing.total})</span>
            </a>

            <button
              type="button"
              data-testid="customizer-email-order"
              onClick={handleOpenEmailModal}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-accent hover:bg-accent-hover active:scale-[0.99] text-[var(--color-accent-contrast)] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md cursor-pointer group"
            >
              <Mail className="w-4 h-4" />
              <span>Email Spec Sheet / Order (₹{pricing.total})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              data-testid="customizer-add-to-cart"
              onClick={handleAddToCart}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md shadow-accent/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Frame to Cart (₹{pricing.total})</span>
            </button>

            <button
              type="button"
              data-testid="customizer-add-to-wishlist"
              onClick={handleAddToWishlist}
              className={cn(
                "w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs sm:text-sm font-medium transition-colors cursor-pointer",
                isWishlisted
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                  : "border-[var(--color-border-strong)] hover:border-accent bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)]"
              )}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-rose-500 text-rose-500")} />
              <span>{isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}</span>
            </button>
          </div>
        </div>

        {/* B2B / RFP Link */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[var(--color-ink-muted)]">
          <Link
            href={rfqUrl}
            data-testid="customizer-rfp-link"
            className="inline-flex items-center gap-1 text-accent hover:underline font-mono"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Request Enterprise / Tender RFQ for Multiple Frames →</span>
          </Link>
          <div className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Archival Framing Guarantee</span>
          </div>
        </div>
      </div>

      {/* Email Spec Sheet & Order Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
        {isEmailModalOpen && (
          <div
            data-testid="customizer-email-modal"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseEmailModal();
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full rounded-3xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-card-elevated)] p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={handleCloseEmailModal}
                className="absolute top-4 right-4 p-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-accent bg-accent/10 flex items-center justify-center text-accent mx-auto shadow-sm">
                <Mail className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                  Resend HTML Email Dispatch
                </span>
                <h3 className="font-serif text-2xl font-bold text-[var(--color-ink-primary)]">
                  Email Spec Sheet / Order
                </h3>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Transmit an archival framing specification sheet and order requisition directly to Frames Cottage Studio and your email address.
                </p>
              </div>

              {/* Bespoke Frame Spec Summary */}
              <div className="p-4 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)]/70 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Requisition Ref:</span>
                  <span className="font-bold text-accent">{emailOrderRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Moulding:</span>
                  <span className="font-bold text-[var(--color-ink-primary)]">{currentMoulding.name} ({currentMoulding.dimensions})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Mat & Color:</span>
                  <span className="text-[var(--color-ink-primary)]">{currentMat.name} ({currentMatColor.name})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Glazing:</span>
                  <span className="text-[var(--color-ink-primary)]">{currentGlazing.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Dimensions:</span>
                  <span className="text-[var(--color-ink-primary)]">{effectiveWidth}″ × {effectiveHeight}″</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[var(--color-border-subtle)]">
                  <span className="font-semibold text-[var(--color-ink-primary)]">Total Price:</span>
                  <span className="font-bold text-base text-[var(--color-ink-primary)]">₹{pricing.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {emailSuccess ? (
                <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-lg text-[var(--color-ink-primary)]">
                      Spec Sheet Dispatched!
                    </h4>
                    <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent-gold)]/15 border border-[var(--color-accent-gold)]/40 text-[var(--color-accent-gold)] text-[11px] font-mono font-semibold">
                      Official Atelier HTML Invoice &amp; Archival Assurance Sent
                    </div>
                    <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed">
                      Requisition <strong className="font-mono text-accent">{emailOrderRef}</strong> was transmitted via Resend. An archival copy was emailed to{" "}
                      <strong className="text-[var(--color-ink-primary)]">{emailCustomerEmail}</strong>.
                    </p>
                    <p className="text-[11px] text-[var(--color-ink-muted)] font-mono">
                      Payment Type: <strong className="text-[var(--color-accent-gold)]">{PAYMENT_OPTIONS.find((p) => p.id === emailPaymentType)?.label}</strong> • 4-Point Archival Guarantee Included.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                      href="/"
                      onClick={handleCloseEmailModal}
                      data-testid="customizer-continue-browsing"
                      className="px-4 py-2.5 rounded-full bg-accent text-[var(--color-accent-contrast)] text-xs font-mono font-bold tracking-wide"
                    >
                      Continue Browsing
                    </Link>
                    <button
                      type="button"
                      onClick={handleCloseEmailModal}
                      className="px-4 py-2.5 rounded-full border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
                    >
                      Return to Studio
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendCustomizerEmail} className="space-y-4 pt-1 text-left">
                  {/* Payment Method / Payment Type Selector */}
                  <div className="space-y-2" data-testid="payment-type-selector">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-muted)] block font-semibold">
                        Payment Method &amp; Settlement
                      </span>
                      <span className="text-[10px] font-mono text-[var(--color-accent-gold)]">
                        Zero Advance Risk
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PAYMENT_OPTIONS.map((opt) => {
                        const isSelected = emailPaymentType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            data-testid={`payment-option-${opt.id}`}
                            onClick={() => setEmailPaymentType(opt.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10 ring-1 ring-[var(--color-accent-gold)]"
                                : "border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] hover:border-[var(--color-accent-gold)]/50"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span
                                className={`text-xs font-semibold ${
                                  isSelected
                                    ? "text-[var(--color-accent-gold)]"
                                    : "text-[var(--color-ink-primary)]"
                                }`}
                              >
                                {opt.label}
                              </span>
                              {isSelected && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0" />
                              )}
                            </div>
                            <span className="text-[10px] text-[var(--color-ink-muted)] line-clamp-2 leading-tight">
                              {opt.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-[10px] text-[var(--color-ink-muted)] font-mono flex items-center gap-1.5 px-2.5 py-1.5 bg-[var(--color-canvas-subtle)] rounded-lg border border-dashed border-[var(--color-border-subtle)]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0" />
                      <span>
                        {PAYMENT_OPTIONS.find((p) => p.id === emailPaymentType)?.settlementNote}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-muted)] block font-semibold">
                      Client &amp; Delivery Coordinates
                    </span>
                    <input
                      type="text"
                      data-testid="customizer-email-name"
                      value={emailCustomerName}
                      onChange={(e) => setEmailCustomerName(e.target.value)}
                      placeholder="Your Name (e.g. Ar. Priya Sen)"
                      className="w-full px-3 py-2 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-accent"
                    />

                    <input
                      type="email"
                      required
                      data-testid="customizer-email-input"
                      value={emailCustomerEmail}
                      onChange={(e) => setEmailCustomerEmail(e.target.value)}
                      placeholder="Your Email Address * (for HTML spec sheet)"
                      className="w-full px-3 py-2 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-accent"
                    />

                    <input
                      type="tel"
                      data-testid="customizer-email-phone"
                      value={emailCustomerPhone}
                      onChange={(e) => setEmailCustomerPhone(e.target.value)}
                      placeholder="Contact Phone (e.g. +91 98100 XXXXX)"
                      className="w-full px-3 py-2 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-accent"
                    />

                    <textarea
                      rows={2}
                      data-testid="customizer-email-notes"
                      value={emailCustomerNotes}
                      onChange={(e) => setEmailCustomerNotes(e.target.value)}
                      placeholder="Special Instructions / Mounting Notes / Jobsite Location"
                      className="w-full px-3 py-2 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                    />
                  </div>

                  {emailError && (
                    <p className="text-xs font-mono text-red-400 bg-red-400/10 p-2 rounded-lg border border-red-400/20">
                      {emailError}
                    </p>
                  )}

                  <div className="flex flex-col gap-2.5 pt-2">
                    <button
                      type="submit"
                      data-testid="customizer-submit-email"
                      disabled={isSendingEmail}
                      className="w-full py-3.5 px-4 rounded-full bg-accent hover:bg-accent-hover active:scale-[0.99] text-[var(--color-accent-contrast)] text-xs font-mono font-bold tracking-wider text-center uppercase transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Spec Sheet...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Send Requisition Email via Resend</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCloseEmailModal}
                      className="w-full py-2.5 px-4 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] text-center transition-colors cursor-pointer"
                    >
                      Return to Studio Customizer
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
