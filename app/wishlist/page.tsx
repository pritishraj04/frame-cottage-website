"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Sliders,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Maximize2,
  RefreshCw,
  Compass,
  Layers,
  Info,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useStorefront } from "@/lib/store/storefront-context";

// Vector illustrations for the 4:3 spatial drop zones
function SpatialDropZoneArt({
  type,
  aspectGuide,
}: {
  type: "frame" | "signage" | "lattice" | "shadowbox";
  aspectGuide: string;
}) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/50 p-4 sm:p-6 flex flex-col justify-between overflow-hidden group hover:border-[var(--color-accent-gold)]/70 transition-all duration-300">
      {/* Corner Registration Crosshairs */}
      <span className="absolute top-2 left-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>
      <span className="absolute top-2 right-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--color-accent-gold)]/60 select-none">
        +
      </span>

      {/* Top spec banner */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-muted)] relative z-10">
        <span className="px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/80 text-[var(--color-accent-gold)]">
          4:3 SPATIAL DROP ZONE
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/60">
          TRANSPARENT PNG CANVAS
        </span>
      </div>

      {/* Central Interactive Line Art Render */}
      <div className="relative flex-1 flex items-center justify-center py-2 sm:py-4">
        {type === "frame" && (
          <div className="relative w-36 sm:w-44 h-28 sm:h-34 border-4 border-[#6B4931] shadow-xl rounded-sm p-2 bg-[#2A2A2A]/40 flex flex-col items-center justify-center">
            {/* Japanese Corner Splines */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-accent" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-accent" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-accent" />
            {/* Inner Mat */}
            <div className="w-full h-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)]/80 flex flex-col items-center justify-center text-center p-2">
              <span className="text-[10px] font-serif text-[var(--color-accent-gold)] italic">
                Appalachian Walnut
              </span>
              <span className="text-[9px] font-mono text-[var(--color-ink-muted)] mt-0.5">
                Optium 99% UV
              </span>
            </div>
          </div>
        )}

        {type === "signage" && (
          <div className="relative w-48 sm:w-56 h-20 sm:h-24 rounded-lg bg-gradient-to-r from-[#222] via-[#2D281E] to-[#222] border border-accent/70 shadow-lg flex flex-col items-center justify-center p-2 overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
            <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-accent font-bold">
              ✦ LEVEL 4 • ATELIER GALLERY ✦
            </div>
            <div className="text-[8px] font-mono text-[var(--color-ink-muted)] mt-1">
              IP67 EDGE-LIT BRASS RETURN (2700K)
            </div>
            {/* LED Beam Glow */}
            <div className="absolute -bottom-2 inset-x-4 h-1.5 bg-accent blur-xs opacity-60" />
          </div>
        )}

        {type === "lattice" && (
          <div className="relative w-32 sm:w-40 h-28 sm:h-36 border-2 border-accent/60 rounded-sm p-1.5 bg-[var(--color-canvas-base)]/50 overflow-hidden flex items-center justify-center">
            {/* Geometric Lattice Grid */}
            <svg
              className="w-full h-full opacity-70 text-accent"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <pattern id="jaali-pat" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="7" stroke="currentColor" fill="none" />
                <path d="M0,10 L20,10 M10,0 L10,20" stroke="currentColor" />
                <polygon points="10,3 17,10 10,17 3,10" stroke="currentColor" fill="none" />
              </pattern>
              <rect width="100" height="100" fill="url(#jaali-pat)" />
            </svg>
            <div className="absolute px-2 py-0.5 bg-[var(--color-canvas-surface)]/90 border border-accent/40 rounded text-[9px] font-mono text-accent">
              3mm Laser Jaali
            </div>
          </div>
        )}

        {type === "shadowbox" && (
          <div className="relative w-32 sm:w-36 h-28 sm:h-32 border-4 border-[var(--color-border-strong)] rounded shadow-2xl p-2.5 bg-[#141414] flex flex-col items-center justify-center">
            <div className="w-full h-full border border-dashed border-accent/40 bg-[var(--color-canvas-subtle)]/70 flex flex-col items-center justify-center relative">
              <span className="text-[10px] font-mono text-accent">
                3.0&quot; Deep Box
              </span>
              <span className="text-[8px] font-mono text-[var(--color-ink-muted)]">
                Linen Mount Spacers
              </span>
              <div className="w-8 h-8 rounded-full border border-accent/50 mt-1 flex items-center justify-center text-[9px] font-serif text-[var(--color-ink-primary)]">
                FC
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom dimensions guide */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-muted)] border-t border-dashed border-[var(--color-border-strong)]/40 pt-2 relative z-10">
        <span className="truncate pr-2">{aspectGuide}</span>
        <span className="shrink-0 text-[var(--color-accent-gold)] flex items-center gap-1">
          <Maximize2 className="w-3 h-3" />
          In-Situ
        </span>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    restoreWishlist,
    moveWishlistItemToCart,
    moveAllWishlistToCart,
    wishlistCount,
  } = useStorefront();

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const handleMoveToCart = (id: string, title: string) => {
    moveWishlistItemToCart(id);
    showToast(`Added "${title}" to your active studio cart.`);
  };

  const handleMoveAllToCart = () => {
    moveAllWishlistToCart();
    showToast("Moved all wishlist commissions to your active cart.");
  };

  const handleClearAll = () => {
    clearWishlist();
    showToast("Cleared all items from your studio wishlist.");
  };

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 sm:py-14 transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--color-ink-muted)]">
            <Link href="/" className="hover:text-[var(--color-accent-gold)] transition-colors">
              Studio Home
            </Link>
            <span>/</span>
            <span className="text-[var(--color-accent-gold)]">Wishlist & Saved Specs</span>
          </nav>

          {/* Editorial Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-subtle)]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)]/70 text-[var(--color-accent-gold)] text-xs font-mono tracking-widest uppercase">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Atelier Saved Commissions</span>
                <span
                  data-testid="wishlist-counter-badge"
                  className="ml-1 px-2 py-0.2 rounded-full bg-accent text-[var(--color-accent-contrast)] text-[10px] font-bold"
                >
                  {wishlistCount} {wishlistCount === 1 ? "Item" : "Items"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)]">
                Studio Wishlist & Saved Commissions
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed">
                Curated bespoke framing specifications, spatial signage blueprints, and architectural CNC designs
                reserved for your private collection or client tender.
              </p>
            </div>

            {/* Batch Controls */}
            {wishlist.length > 0 && (
              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <button
                  type="button"
                  data-testid="wishlist-move-all-btn"
                  onClick={handleMoveAllToCart}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move All to Cart</span>
                </button>

                <button
                  type="button"
                  data-testid="wishlist-clear-all-btn"
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-red-500/60 hover:text-red-400 text-xs font-mono text-[var(--color-ink-muted)] transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Wishlist</span>
                </button>
              </div>
            )}
          </div>

          {/* Toast Notification Banner */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="my-4 p-4 rounded-xl bg-[var(--color-canvas-card-elevated)] border border-[var(--color-accent-gold)]/60 text-xs font-mono text-[var(--color-ink-primary)] flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-gold)] shrink-0" />
                  <span>{notification}</span>
                </div>
                <Link
                  href="/cart"
                  className="text-[var(--color-accent-gold)] underline hover:opacity-80 shrink-0 font-semibold"
                >
                  View Cart →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wishlist Items Grid or Empty State */}
          {wishlist.length === 0 ? (
            <div
              data-testid="wishlist-empty-state"
              className="my-16 p-8 sm:p-14 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 text-center flex flex-col items-center justify-center max-w-2xl mx-auto space-y-5"
            >
              <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-xs">
                <Heart className="w-8 h-8 opacity-40" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)]">
                  Your Studio Wishlist is Empty
                </h2>
                <p className="text-sm text-[var(--color-ink-muted)] max-w-md mx-auto leading-relaxed">
                  You currently have no bespoke items saved. Explore our 6 studio fabrication verticals to curate
                  custom framing, spatial signage, or architectural CNC elements.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/"
                  data-testid="wishlist-discover-btn"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Discover Studio Verticals</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  data-testid="wishlist-restore-btn"
                  onClick={restoreWishlist}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Sample Items</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <AnimatePresence>
                {wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    data-testid={`wishlist-item-${item.id}`}
                    className="p-6 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-surface)] flex flex-col justify-between hover:border-[var(--color-accent-gold)]/60 transition-all duration-300 shadow-xs"
                  >
                    <div>
                      {/* 4:3 Spatial Canvas Drop Zone */}
                      <div data-testid={`wishlist-dropzone-${item.id}`} className="mb-5">
                        <SpatialDropZoneArt type={item.svgType} aspectGuide={item.aspectGuide} />
                      </div>

                      {/* Header Specs Row */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)]/70">
                            {item.category}
                          </span>
                          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink-primary)] mt-2">
                            {item.title}
                          </h2>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-mono text-[var(--color-ink-muted)] block">
                            Starting Spec
                          </span>
                          <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--color-accent-gold)]">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Technical Blueprint Specifications */}
                      <div className="my-4 p-4 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[var(--color-ink-secondary)]">
                          <span className="font-mono text-[11px] text-[var(--color-ink-muted)]">Dimensions:</span>
                          <span className="font-mono text-[11px] font-semibold text-[var(--color-ink-primary)]">
                            {item.dimensions}
                          </span>
                        </div>

                        <div className="pt-1.5 border-t border-dashed border-[var(--color-border-subtle)] flex flex-col gap-0.5 text-[var(--color-ink-secondary)]">
                          <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">Material & Joinery:</span>
                          <span className="text-[11px] text-[var(--color-ink-primary)]">{item.material}</span>
                        </div>

                        <div className="pt-1.5 border-t border-dashed border-[var(--color-border-subtle)] flex flex-col gap-0.5 text-[var(--color-ink-secondary)]">
                          <span className="font-mono text-[10px] text-[var(--color-ink-muted)]">Glazing / Subframe:</span>
                          <span className="text-[11px] text-[var(--color-accent-gold)] font-medium">
                            {item.glazing}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-dashed border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          data-testid={`move-to-cart-${item.id}`}
                          onClick={() => handleMoveToCart(item.id, item.title)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Cart</span>
                        </button>

                        <Link
                          href={`/rfq?vertical=${item.vertical}`}
                          data-testid={`rfq-config-${item.id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] hover:border-[var(--color-accent-gold)] text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] transition-colors"
                        >
                          <Sliders className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                          <span>Configure in RFQ</span>
                        </Link>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${item.title} from wishlist`}
                        data-testid={`remove-wishlist-${item.id}`}
                        onClick={() => {
                          removeFromWishlist(item.id);
                          showToast(`Removed "${item.title}" from wishlist.`);
                        }}
                        className="p-2 text-[var(--color-ink-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Atelier Material & Trust Assurance */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--color-ink-muted)]">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[var(--color-accent-gold)] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)] mb-1">
                  Guaranteed Atelier Turnaround
                </h4>
                <p className="leading-relaxed">
                  Saved commissions retain their specified material lot and precision tolerances for 90 days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-[var(--color-accent-gold)] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)] mb-1">
                  Conservation & CAD Integration
                </h4>
                <p className="leading-relaxed">
                  Direct transfer from wishlist to formal RFQ portal retains all dimensions and substrate choices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[var(--color-accent-gold)] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)] mb-1">
                  White-Glove In-Situ Delivery
                </h4>
                <p className="leading-relaxed">
                  Nationwide transit insurance and climate-controlled delivery available on all commissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
