"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
  Building2,
  Clock,
  Tag,
  Check,
  X,
  FileText,
  Lock,
  Layers,
  RotateCcw,
  RefreshCw,
  Home,
  Briefcase,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useStorefront } from "@/lib/store/storefront-context";
import { createWhatsAppCartOrderUrl } from "@/lib/constants/whatsapp";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartShipping,
    cartTax,
    cartDiscount,
    cartTotal,
    deliveryMethod,
    isTaxExempt,
    promoCode,
    promoDiscountPct,
    promoError,
    specialInstructions,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    restoreCart,
    applyPromo,
    removePromo,
    setDeliveryMethod,
    toggleTaxExempt,
    setSpecialInstructions,
  } = useStorefront();

  const [promoInput, setPromoInput] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderReferenceId, setOrderReferenceId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    if (ok) {
      setPromoInput("");
    }
  };

  const handleCheckoutOpen = () => {
    const randomRef = `FC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderReferenceId(randomRef);
    setIsCheckoutModalOpen(true);
  };

  const handleSendWhatsAppOrder = () => {
    const url = createWhatsAppCartOrderUrl(
      cart,
      cartTotal,
      deliveryMethod,
      specialInstructions,
      {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
      }
    );
    window.open(url, "_blank", "noopener,noreferrer");
    setIsCheckoutModalOpen(false);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    clearCart();
  };

  return (
    <>
      <SiteHeader cartCount={cartCount} />

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 sm:py-14 transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--color-ink-muted)]">
            <Link href="/" className="hover:text-[var(--color-accent-gold)] transition-colors">
              Studio Home
            </Link>
            <span>/</span>
            <span className="text-[var(--color-accent-gold)]">Studio Cart & Requisition</span>
          </nav>

          {/* Editorial Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-subtle)]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)]/70 text-[var(--color-accent-gold)] text-xs font-mono tracking-widest uppercase">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Active Requisition</span>
                <span
                  data-testid="cart-counter-badge"
                  className="ml-1 px-2 py-0.2 rounded-full bg-accent text-[var(--color-accent-contrast)] text-[10px] font-bold"
                >
                  {cartCount} {cartCount === 1 ? "Item" : "Items"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)]">
                Studio Cart & Project Requisition
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed">
                Review bespoke commissions, white-glove logistics, custom engraving notes, and architectural trade specifications.
              </p>
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-red-500/60 hover:text-red-400 text-xs font-mono text-[var(--color-ink-muted)] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cart</span>
              </button>
            )}
          </div>

          {/* Main 2-Column Responsive Cart Layout or Empty State */}
          {cart.length === 0 ? (
            <div
              data-testid="cart-empty-state"
              className="my-16 p-8 sm:p-14 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 text-center flex flex-col items-center justify-center max-w-2xl mx-auto space-y-5"
            >
              <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-accent shadow-xs">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-ink-primary)]">
                  Your Studio Cart is Empty
                </h2>
                <p className="text-sm text-[var(--color-ink-muted)] max-w-md mx-auto leading-relaxed">
                  You currently have no commissions in your active project cart. Explore our atelier collections or
                  restore sample items to simulate logistics and checkout.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/"
                  data-testid="cart-explore-btn"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  data-testid="cart-restore-btn"
                  onClick={restoreCart}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Sample Cart Items</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Cart Line Items & Delivery (8 Cols) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                {/* Cart Line Items List */}
                <div data-testid="cart-items-list" className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        data-testid={`cart-item-${item.id}`}
                        className="p-5 sm:p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-[var(--color-accent-gold)]/50 transition-colors shadow-xs"
                      >
                        {/* Item Info */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Mini Spatial Blueprint Icon */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] flex flex-col items-center justify-center p-1.5 shrink-0 relative overflow-hidden">
                            <span className="text-[8px] font-mono text-[var(--color-accent-gold)] absolute top-1 left-1">
                              FC
                            </span>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-accent/60 rounded-xs flex items-center justify-center">
                              <span className="text-[8px] font-mono text-[var(--color-ink-muted)] text-center leading-none">
                                4:3
                              </span>
                            </div>
                            <span className="text-[7.5px] font-mono text-[var(--color-ink-muted)] mt-1 truncate max-w-full">
                              {item.category}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9.5px] font-mono uppercase tracking-widest text-[var(--color-accent-gold)] font-medium">
                              {item.category}
                            </span>
                            <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--color-ink-primary)]">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed">
                              {item.specs}
                            </p>
                            <div className="pt-1 flex items-center gap-3 text-[11px] font-mono text-[var(--color-ink-muted)]">
                              <span>Dims: {item.dimensions}</span>
                              <span>•</span>
                              <span>₹{item.unitPrice.toLocaleString("en-IN")} unit</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity & Price Controls */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-dashed border-[var(--color-border-subtle)]">
                          {/* Quantity Selector */}
                          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)]">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              data-testid={`qty-decrease-${item.id}`}
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="p-1 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-surface)] transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span
                              data-testid={`qty-value-${item.id}`}
                              className="w-6 text-center text-xs font-mono font-bold text-[var(--color-ink-primary)]"
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              data-testid={`qty-increase-${item.id}`}
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="p-1 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-surface)] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total & Remove */}
                          <div className="flex items-center gap-3">
                            <span
                              data-testid={`line-total-${item.id}`}
                              className="font-mono text-base sm:text-lg font-bold text-[var(--color-accent-gold)]"
                            >
                              ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                            </span>

                            <button
                              type="button"
                              aria-label={`Remove ${item.title}`}
                              data-testid={`cart-remove-${item.id}`}
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-[var(--color-ink-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Custom Engraving & Special Instructions Card */}
                <div className="p-5 sm:p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-surface)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-[var(--color-accent-gold)]">
                    <Sparkles className="w-4 h-4 text-[var(--color-accent-gold)]" />
                    <span>Custom Engraving & Master Framer Instructions</span>
                  </div>
                  <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                    Provide archival inscription text for commemorative brass plaques, jobsite clearance notes, or
                    specific GeM tender project codes.
                  </p>
                  <textarea
                    rows={3}
                    data-testid="cart-engraving-notes"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Inscribe brushed brass plaque with: 'Presented to Dr. Vance, 2026'. Loading dock bay 4 clearance needed on delivery day."
                    className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] p-3 text-xs text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)] font-mono resize-none"
                  />
                </div>

                {/* Delivery Method Selector */}
                <div
                  data-testid="cart-delivery-selector"
                  className="p-5 sm:p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-surface)] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-[var(--color-accent-gold)]">
                      <Truck className="w-4 h-4" />
                      <span>Studio Logistics & Transit Protocol</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                      Insured Freight
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* White Glove Option */}
                    <button
                      type="button"
                      data-testid="delivery-white-glove"
                      onClick={() => setDeliveryMethod("white-glove")}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        deliveryMethod === "white-glove"
                          ? "border-accent bg-accent/10 shadow-xs"
                          : "border-dashed border-[var(--color-border-strong)] hover:border-accent/60 bg-[var(--color-canvas-base)]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-serif font-bold text-[var(--color-ink-primary)]">
                          Insured White-Glove Courier
                        </span>
                        <span className="font-mono text-xs font-bold text-accent">
                          {cartSubtotal >= 2500 ? "FREE" : "₹120"}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--color-ink-muted)] leading-relaxed">
                        Climate-controlled van, shock-sensor logging, uncrating and inspection in-situ.
                      </p>
                    </button>

                    {/* Atelier Pickup Option */}
                    <button
                      type="button"
                      data-testid="delivery-atelier"
                      onClick={() => setDeliveryMethod("atelier")}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        deliveryMethod === "atelier"
                          ? "border-accent bg-accent/10 shadow-xs"
                          : "border-dashed border-[var(--color-border-strong)] hover:border-accent/60 bg-[var(--color-canvas-base)]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-serif font-bold text-[var(--color-ink-primary)]">
                          Atelier Pick-Up / Direct Studio Delivery
                        </span>
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          Complimentary (₹0)
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--color-ink-muted)] leading-relaxed">
                        Pick up directly at Frames Cottage Main Workshop with master framer consultation.
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary Card (4 Cols - Sticky) */}
              <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
                <div
                  data-testid="cart-summary-card"
                  className="p-6 sm:p-7 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/80 bg-[var(--color-canvas-card)] shadow-lg space-y-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-dashed border-[var(--color-border-subtle)]">
                    <h2 className="font-serif text-xl font-bold text-[var(--color-ink-primary)]">
                      Commission Summary
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] text-[var(--color-accent-gold)]">
                      Verified Quote
                    </span>
                  </div>

                  {/* Summary Rows */}
                  <div className="space-y-3 text-xs font-mono text-[var(--color-ink-secondary)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-ink-muted)]">Subtotal ({cartCount} items):</span>
                      <span data-testid="cart-subtotal" className="font-bold text-[var(--color-ink-primary)]">
                        ₹{cartSubtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-ink-muted)]">White-Glove Logistics:</span>
                      <span data-testid="cart-shipping" className="font-bold text-[var(--color-ink-primary)]">
                        {cartShipping === 0 ? "Complimentary (₹0)" : `₹${cartShipping.toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    {/* B2B GSTIN / Tax ID Exemption Toggle */}
                    <div className="pt-2 pb-1 border-t border-dashed border-[var(--color-border-subtle)]">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="b2b-tax-toggle"
                          className="flex items-center gap-1.5 text-[11px] text-[var(--color-ink-secondary)] cursor-pointer select-none"
                        >
                          <Building2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                          <span>B2B GSTIN / Tax Exempt</span>
                        </label>
                        <input
                          id="b2b-tax-toggle"
                          type="checkbox"
                          data-testid="cart-tax-toggle"
                          checked={isTaxExempt}
                          onChange={toggleTaxExempt}
                          className="w-4 h-4 rounded text-accent focus:ring-accent cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-[var(--color-ink-muted)]">
                          {isTaxExempt ? "Estimated Tax (Reverse Charge 0%):" : "Estimated Tax (Standard 8.25%):"}
                        </span>
                        <span data-testid="cart-tax" className="font-bold text-[var(--color-ink-primary)]">
                          {isTaxExempt ? "₹0" : `₹${cartTax.toLocaleString("en-IN")}`}
                        </span>
                      </div>
                    </div>

                    {/* Applied Promo Code Row */}
                    {promoDiscountPct > 0 && (
                      <div
                        data-testid="cart-discount"
                        className="flex items-center justify-between text-emerald-400 font-semibold pt-1 border-t border-dashed border-[var(--color-border-subtle)]"
                      >
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>Trade Discount ({promoCode} -{promoDiscountPct}%):</span>
                        </span>
                        <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    {/* Total Row */}
                    <div className="pt-3 border-t-2 border-[var(--color-border-strong)] flex items-baseline justify-between">
                      <span className="font-serif text-base font-bold text-[var(--color-ink-primary)]">
                        Total Amount:
                      </span>
                      <span
                        data-testid="cart-total"
                        className="font-mono text-2xl font-bold text-[var(--color-accent-gold)]"
                      >
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code Input Form */}
                  <form onSubmit={handleApplyPromo} className="pt-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        data-testid="promo-input"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Trade / Promo Code (e.g. TRADE15)"
                        className="flex-1 bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl px-3 py-2 text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)] uppercase"
                      />
                      <button
                        type="submit"
                        data-testid="promo-apply-btn"
                        className="px-3.5 py-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-[var(--color-accent-gold)] text-xs font-mono font-medium text-[var(--color-ink-primary)] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {promoError && (
                      <p className="mt-1.5 text-[10px] font-mono text-red-400 leading-tight">
                        {promoError}
                      </p>
                    )}

                    {promoDiscountPct > 0 && (
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                        <span>Trade code active: {promoCode}</span>
                        <button
                          type="button"
                          onClick={removePromo}
                          className="text-[var(--color-ink-muted)] hover:text-red-400 underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </form>

                  {/* Action CTAs */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      data-testid="checkout-btn"
                      onClick={handleCheckoutOpen}
                      className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-[#0A2612] font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 group"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
                      </svg>
                      <span>Order via WhatsApp</span>
                    </button>

                    <Link
                      href="/rfq?proforma=true"
                      data-testid="proforma-btn"
                      className="w-full py-2.5 px-4 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] hover:border-accent text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] font-mono text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span>Request Proforma Invoice (B2B / GeM Tender)</span>
                    </Link>
                  </div>

                  {/* Atelier Guarantees */}
                  <div className="pt-4 border-t border-dashed border-[var(--color-border-subtle)] space-y-2 text-[11px] text-[var(--color-ink-muted)]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0" />
                      <span>FSC Hardwoods & TruVue 99% UV Protection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0" />
                      <span>Lifetime Spline & Structural Warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0" />
                      <span>Insured Transit & White-Glove In-Situ Setup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Interactive WhatsApp Checkout Modal */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div
            data-testid="checkout-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full rounded-3xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-card-elevated)] p-6 sm:p-8 space-y-5 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={handleCloseCheckoutModal}
                className="absolute top-4 right-4 p-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-[#25D366] bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mx-auto shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
                </svg>
              </div>

              <div className="text-center space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#25D366] font-bold">
                  Instant Studio Confirmation
                </span>
                <h3 className="font-serif text-2xl font-bold text-[var(--color-ink-primary)]">
                  Order via WhatsApp
                </h3>
                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  Your custom requisition will be sent directly to our master framers on WhatsApp for instant confirmation.
                </p>
              </div>

              {/* Order Specs Preview */}
              <div className="p-4 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)]/70 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Order Reference:</span>
                  <span className="font-bold text-[var(--color-accent-gold)]">{orderReferenceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Items Count:</span>
                  <span className="font-bold text-[var(--color-ink-primary)]">{cartCount} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Total Amount:</span>
                  <span className="font-bold text-[var(--color-ink-primary)]">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Fulfillment:</span>
                  <span className="text-[var(--color-ink-primary)]">
                    {deliveryMethod === "white-glove" ? "Insured White-Glove" : "Atelier Pick-Up"}
                  </span>
                </div>
              </div>

              {/* Optional Customer Details Form */}
              <div className="space-y-3 pt-1 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-muted)] block font-semibold">
                  Customer & Delivery Details (Optional)
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    data-testid="checkout-customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name (e.g. Ar. Rajesh Mehra)"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                  />
                  <input
                    type="tel"
                    data-testid="checkout-customer-phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contact Number (e.g. +91 98100 XXXXX)"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                  />
                  <textarea
                    rows={2}
                    data-testid="checkout-customer-address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Delivery Address / City (optional)"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] text-xs font-mono text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[#25D366] resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  data-testid="send-whatsapp-order-btn"
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-[#0A2612] text-xs font-mono font-bold tracking-wider text-center uppercase transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
                  </svg>
                  <span>Send Order via WhatsApp →</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseCheckoutModal}
                  className="w-full py-2.5 px-4 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] text-center transition-colors cursor-pointer"
                >
                  Return to Studio Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </>
  );
}
