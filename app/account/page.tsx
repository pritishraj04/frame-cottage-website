"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  FileText,
  Clock,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  ExternalLink,
  Trash2,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useStorefront, OrderItem, RfqItem } from "@/lib/store/storefront-context";
import { INITIAL_ORDERS, INITIAL_RFQS } from "@/lib/store/storefront-store";
import { createWhatsAppChatUrl } from "@/lib/constants/whatsapp";

export default function AccountPage() {
  const { cartCount } = useStorefront();
  const [activeTab, setActiveTab] = useState<"orders" | "rfqs">("orders");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [rfqs, setRfqs] = useState<RfqItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("fc_saved_orders_v1");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(INITIAL_ORDERS);
      }

      const savedRfqs = localStorage.getItem("fc_saved_rfqs_v1");
      if (savedRfqs) {
        setRfqs(JSON.parse(savedRfqs));
      } else {
        setRfqs(INITIAL_RFQS);
      }
    } catch {
      setOrders(INITIAL_ORDERS);
      setRfqs(INITIAL_RFQS);
    }
    setIsLoaded(true);
  }, []);

  const handleClearHistory = () => {
    if (confirm("Clear local order and inquiry history on this device?")) {
      try {
        localStorage.removeItem("fc_saved_orders_v1");
        localStorage.removeItem("fc_saved_rfqs_v1");
      } catch {}
      setOrders([]);
      setRfqs([]);
    }
  };

  return (
    <>
      <SiteHeader cartCount={cartCount} />

      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-8 sm:py-14 transition-colors duration-250">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-mono text-[var(--color-ink-muted)]"
          >
            <Link href="/" className="hover:text-[var(--color-accent-gold)] transition-colors">
              Studio Home
            </Link>
            <span>/</span>
            <span className="text-[var(--color-accent-gold)]">Saved Orders & Inquiries</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-subtle)]">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-accent font-semibold px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                <Sparkles className="w-3 h-3" />
                <span>Client Device Archive • No Login Required</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink-primary)]">
                Saved Orders & Inquiries
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-ink-muted)] leading-relaxed">
                Review your studio custom requisitions, WhatsApp order dispatches, and turnkey RFQ inquiries stored locally on this device.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/customizer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] shadow-md transition-colors"
              >
                <span>New Commission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {orders.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Clear Local History"
                  className="p-2 text-[var(--color-ink-muted)] hover:text-red-400 rounded-full border border-[var(--color-border-subtle)] hover:border-red-400/40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-4 mt-8 border-b border-[var(--color-border-subtle)] pb-2 text-xs font-mono">
            <button
              type="button"
              data-testid="account-tab-orders"
              onClick={() => setActiveTab("orders")}
              className={`pb-2 font-semibold tracking-wider transition-colors cursor-pointer border-b-2 -mb-2.5 ${
                activeTab === "orders"
                  ? "border-accent text-accent"
                  : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
              }`}
            >
              Atelier Orders & Requisitions ({orders.length})
            </button>
            <button
              type="button"
              data-testid="account-tab-rfqs"
              onClick={() => setActiveTab("rfqs")}
              className={`pb-2 font-semibold tracking-wider transition-colors cursor-pointer border-b-2 -mb-2.5 ${
                activeTab === "rfqs"
                  ? "border-accent text-accent"
                  : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)]"
              }`}
            >
              Project RFQ Inquiries ({rfqs.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "orders" ? (
              <div className="space-y-4" data-testid="orders-list">
                {orders.length === 0 ? (
                  <div className="py-16 text-center border-2 border-dashed border-[var(--color-border-subtle)] rounded-2xl p-8 space-y-4">
                    <Package className="w-10 h-10 text-[var(--color-ink-muted)] mx-auto opacity-60" />
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)]">
                        No orders recorded yet
                      </h3>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        When you dispatch an order via WhatsApp or HTML email, your requisition reference will appear here.
                      </p>
                    </div>
                    <Link
                      href="/customizer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-[var(--color-accent-contrast)] text-xs font-semibold"
                    >
                      <span>Open Customizer Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      data-testid={`order-item-${order.id}`}
                      className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-card)] hover:border-accent/40 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dashed border-[var(--color-border-subtle)] pb-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-accent">
                              {order.id}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                              {order.status}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-[var(--color-ink-primary)]">
                            {order.title}
                          </h4>
                        </div>
                        <div className="text-left sm:text-right font-mono">
                          <div className="text-sm font-bold text-[var(--color-ink-primary)]">
                            {order.total}
                          </div>
                          <div className="text-[11px] text-[var(--color-ink-muted)] flex items-center gap-1 sm:justify-end">
                            <Clock className="w-3 h-3" />
                            <span>{order.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                        <p className="text-[var(--color-ink-secondary)] font-mono text-[11px]">
                          <span className="text-[var(--color-ink-muted)]">Specs: </span>
                          {order.specs}
                        </p>
                        <a
                          href={createWhatsAppChatUrl(
                            `Hello Studio, inquiring regarding my order reference ${order.id} (${order.title}).`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#25D366] hover:underline shrink-0"
                        >
                          <span>Consult Framer on WhatsApp</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4" data-testid="rfqs-list">
                {rfqs.length === 0 ? (
                  <div className="py-16 text-center border-2 border-dashed border-[var(--color-border-subtle)] rounded-2xl p-8 space-y-4">
                    <FileText className="w-10 h-10 text-[var(--color-ink-muted)] mx-auto opacity-60" />
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)]">
                        No RFQ tenders submitted yet
                      </h3>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        Institutional, hospitality, and civic procurement requests will be recorded here.
                      </p>
                    </div>
                    <Link
                      href="/rfq"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-[var(--color-accent-contrast)] text-xs font-semibold"
                    >
                      <span>Submit Project RFQ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  rfqs.map((rfq) => (
                    <div
                      key={rfq.id}
                      data-testid={`rfq-item-${rfq.id}`}
                      className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-card)] hover:border-accent/40 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dashed border-[var(--color-border-subtle)] pb-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-accent">
                              {rfq.id}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">
                              {rfq.status}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-[var(--color-ink-primary)]">
                            {rfq.title}
                          </h4>
                        </div>
                        <div className="text-left sm:text-right font-mono">
                          <div className="text-xs text-[var(--color-ink-muted)]">
                            Tender: {rfq.tenderId}
                          </div>
                          <div className="text-[11px] text-[var(--color-ink-muted)]">
                            {rfq.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                        <p className="text-[var(--color-ink-secondary)] text-xs">
                          <span className="font-mono text-[var(--color-ink-muted)]">Scope: </span>
                          {rfq.scope}
                        </p>
                        <Link
                          href="/rfq"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline shrink-0"
                        >
                          <span>Review RFQ Terms</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
