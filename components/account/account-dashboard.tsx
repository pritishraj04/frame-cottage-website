"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShoppingBag,
  FileText,
  MapPin,
  Settings,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  X,
  Check,
  Eye,
  Download,
  Building2,
  Sparkles,
  Layers,
  ArrowRight,
  Sun,
  Moon,
  ChevronRight,
  Printer,
  Compass,
} from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useStorefront, SavedAddress, OrderItem, RfqItem } from "@/lib/store/storefront-context";

type AccountTab = "orders" | "rfqs" | "addresses" | "settings";

export function AccountDashboard() {
  const router = useRouter();
  const {
    user,
    orders,
    rfqs,
    addresses,
    addAddress,
    logoutUser,
    loginAsCollector,
    loginAsEnterprise,
  } = useStorefront();

  const [activeTab, setActiveTab] = useState<AccountTab>("orders");

  // Selected Order for Spec Sheet Modal
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  // Selected RFQ for Detail Modal
  const [selectedRfq, setSelectedRfq] = useState<RfqItem | null>(null);

  // New Address Modal State
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newStateVal, setNewStateVal] = useState("");
  const [newPostal, setNewPostal] = useState("");
  const [newType, setNewType] = useState<"Residential" | "Commercial Jobsite">("Commercial Jobsite");
  const [newNotes, setNewNotes] = useState("");

  // Settings State
  const [themeMode, setThemeMode] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("light") ? "light" : "dark";
    }
    return "dark";
  });
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [dispatchAlerts, setDispatchAlerts] = useState(true);
  const [quarterlyJournal, setQuarterlyJournal] = useState(true);

  // Fallback profile if user is null
  const currentProfile = user || {
    name: "Camilla Vance",
    email: "collector@vanceart.com",
    tier: "Atelier Collector • Tier II",
    role: "collector" as const,
    memberSince: "April 2023",
  };

  const getMonogram = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleSignOut = () => {
    logoutUser();
    router.push("/login");
  };

  const handleToggleTheme = () => {
    const nextTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextTheme);
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(nextTheme);
      document.documentElement.style.colorScheme = nextTheme;
      try {
        localStorage.setItem("frame-cottage-theme", nextTheme);
      } catch {}
    }
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    addAddress({
      title: newTitle || `${newCity} Jobsite Location`,
      type: newType,
      isDefault: false,
      recipient: newRecipient || currentProfile.name,
      street: newStreet,
      city: newCity,
      state: newStateVal || "NY",
      postalCode: newPostal || "10001",
      notes: newNotes || "Deliver during standard business hours.",
    });
    setIsAddAddressOpen(false);
    // Reset form
    setNewTitle("");
    setNewRecipient("");
    setNewStreet("");
    setNewCity("");
    setNewStateVal("");
    setNewPostal("");
    setNewNotes("");
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
            <span className="text-[var(--color-accent-gold)]">Client Account Dashboard</span>
          </nav>

          {/* Header Profile Monogram & Tier Section */}
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/80 bg-[var(--color-canvas-card)] mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left: Avatar & Identity */}
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Monogram circle with gold border */}
                <div
                  data-testid="account-avatar"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] flex items-center justify-center font-serif font-bold text-xl sm:text-2xl text-[var(--color-accent-gold)] shadow-md shrink-0"
                >
                  {getMonogram(currentProfile.name)}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1
                      data-testid="account-name"
                      className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)]"
                    >
                      {currentProfile.name}
                    </h1>

                    <span
                      data-testid="account-tier-badge"
                      className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold border border-[var(--color-accent-gold)]/60 bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"
                    >
                      {currentProfile.tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-ink-muted)] flex-wrap">
                    <span>{currentProfile.email}</span>
                    {currentProfile.company && (
                      <>
                        <span>•</span>
                        <span className="text-[var(--color-ink-secondary)] font-medium">
                          {currentProfile.company}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span>Member since {currentProfile.memberSince}</span>
                  </div>
                </div>
              </div>

              {/* Right: Quick Persona Switcher & Logout */}
              <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
                <button
                  type="button"
                  onClick={currentProfile.role === "collector" ? loginAsEnterprise : loginAsCollector}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] text-[11px] font-mono text-[var(--color-ink-secondary)] hover:border-[var(--color-accent-gold)] hover:text-[var(--color-ink-primary)] transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                  <span>
                    Switch to {currentProfile.role === "collector" ? "Enterprise Partner" : "Collector"}
                  </span>
                </button>

                <button
                  type="button"
                  data-testid="sign-out-btn"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] text-[11px] font-mono text-[var(--color-ink-muted)] hover:text-red-400 hover:border-red-500/60 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4-Tab Navigation Bar */}
          <div
            role="tablist"
            className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--color-border-subtle)] mb-8 scrollbar-none"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "orders"}
              data-testid="tab-orders"
              onClick={() => setActiveTab("orders")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[var(--color-canvas-surface)] border-2 border-dashed border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] font-bold shadow-xs"
                  : "border border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)]"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders & Active Projects ({orders.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "rfqs"}
              data-testid="tab-rfqs"
              onClick={() => setActiveTab("rfqs")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "rfqs"
                  ? "bg-[var(--color-canvas-surface)] border-2 border-dashed border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] font-bold shadow-xs"
                  : "border border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>RFQ & Tender Submissions ({rfqs.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "addresses"}
              data-testid="tab-addresses"
              onClick={() => setActiveTab("addresses")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "addresses"
                  ? "bg-[var(--color-canvas-surface)] border-2 border-dashed border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] font-bold shadow-xs"
                  : "border border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)]"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Studio & Shipping Addresses ({addresses.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "settings"}
              data-testid="tab-settings"
              onClick={() => setActiveTab("settings")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-[var(--color-canvas-surface)] border-2 border-dashed border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] font-bold shadow-xs"
                  : "border border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)]"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Studio Preferences & Security</span>
            </button>
          </div>

          {/* TAB 1: Orders & Active Projects */}
          {activeTab === "orders" && (
            <div data-testid="content-orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink-primary)]">
                    Active Commissions & Fabrication Logs
                  </h2>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                    Live production telemetry from joinery milling, UV acrylic mounting, and white-glove courier.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {orders.map((order) => {
                  const isInProgress = order.status === "In Joinery" || order.status === "In Milling";
                  const isShipped = order.status === "Shipped with White-Glove Courier";

                  return (
                    <div
                      key={order.id}
                      className="p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--color-accent-gold)]/60 transition-colors shadow-xs"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[var(--color-accent-gold)]">
                            #{order.id}
                          </span>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                              isInProgress
                                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                                : isShipped
                                ? "bg-blue-500/10 border-blue-500/40 text-blue-400"
                                : "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                            }`}
                          >
                            {order.status}
                          </span>

                          <span className="text-[11px] font-mono text-[var(--color-ink-muted)]">
                            Ordered: {order.date}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[var(--color-ink-primary)]">
                          {order.title}
                        </h3>

                        <p className="text-xs text-[var(--color-ink-secondary)]">
                          {order.specs}
                        </p>

                        <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--color-ink-muted)] pt-1 flex-wrap">
                          <span>Current Stage: <strong className="text-[var(--color-ink-primary)]">{order.stage}</strong></span>
                          <span>•</span>
                          <span>Courier Track: <strong className="text-[var(--color-accent-gold)]">{order.tracking}</strong></span>
                        </div>
                      </div>

                      {/* Right: Total & Action */}
                      <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-dashed border-[var(--color-border-subtle)] shrink-0">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--color-accent-gold)]">
                          {order.total}
                        </span>

                        <button
                          type="button"
                          data-testid={`spec-sheet-btn-${order.id}`}
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] hover:border-[var(--color-accent-gold)] text-xs font-mono text-[var(--color-ink-primary)] transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                          <span>View In-Situ Spec Sheet (PDF)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: RFQ & Tender Submissions */}
          {activeTab === "rfqs" && (
            <div data-testid="content-rfqs" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink-primary)]">
                    RFQ Submissions & GeM Tenders
                  </h2>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                    Formal architectural proposals, precision bill of materials, and engineering reviews.
                  </p>
                </div>

                <Link
                  href="/rfq"
                  data-testid="new-rfq-btn"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent-gold)] text-black text-xs font-mono font-semibold tracking-wider hover:opacity-90 transition-opacity self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit New RFQ</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {rfqs.map((rfq) => (
                  <div
                    key={rfq.id}
                    className="p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--color-accent-gold)]/60 transition-colors shadow-xs"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[var(--color-accent-gold)]">
                          {rfq.id}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border border-[var(--color-accent-gold)]/50 bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]">
                          {rfq.status}
                        </span>

                        <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                          Tender Ref: {rfq.tenderId}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[var(--color-ink-primary)]">
                        {rfq.title}
                      </h3>

                      <p className="text-xs text-[var(--color-ink-secondary)]">
                        {rfq.scope}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--color-ink-muted)] pt-1 flex-wrap">
                        <span>Vertical: <strong className="text-[var(--color-ink-primary)]">{rfq.vertical}</strong></span>
                        <span>•</span>
                        <span>Logged Date: {rfq.date}</span>
                        {rfq.estimatedValue && (
                          <>
                            <span>•</span>
                            <span>Estimate: <strong className="text-emerald-400">{rfq.estimatedValue}</strong></span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 md:pt-0 border-t md:border-t-0 border-dashed border-[var(--color-border-subtle)] shrink-0">
                      <button
                        type="button"
                        data-testid={`rfq-details-btn-${rfq.id}`}
                        onClick={() => setSelectedRfq(rfq)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] hover:border-[var(--color-accent-gold)] text-xs font-mono text-[var(--color-ink-primary)] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                        <span>Review Full RFQ Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Studio & Shipping Addresses */}
          {activeTab === "addresses" && (
            <div data-testid="content-addresses" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink-primary)]">
                    Saved Studio & Jobsite Addresses
                  </h2>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                    Authorized white-glove courier unloading zones, corporate receiving docks, and residential addresses.
                  </p>
                </div>

                <button
                  type="button"
                  data-testid="add-address-btn"
                  onClick={() => setIsAddAddressOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent-gold)] text-black text-xs font-mono font-semibold tracking-wider hover:opacity-90 transition-opacity self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] flex flex-col justify-between hover:border-[var(--color-accent-gold)]/60 transition-colors shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[var(--color-accent-gold)]" />
                          <h3 className="font-serif text-base font-bold text-[var(--color-ink-primary)]">
                            {addr.title}
                          </h3>
                        </div>

                        {addr.isDefault && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold">
                            Default Address
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-mono text-[var(--color-ink-secondary)] space-y-1">
                        <div className="text-[var(--color-ink-primary)] font-semibold">{addr.recipient}</div>
                        <div>{addr.street}</div>
                        <div>
                          {addr.city}, {addr.state} {addr.postalCode}
                        </div>
                        <div className="text-[11px] text-[var(--color-ink-muted)] pt-2 border-t border-dashed border-[var(--color-border-subtle)]">
                          <strong>Access Notes:</strong> {addr.notes}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-dashed border-[var(--color-border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--color-ink-muted)]">
                      <span className="px-2 py-0.5 rounded bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)]">
                        {addr.type}
                      </span>
                      <span className="text-emerald-400">Insured Unloading Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Studio Preferences & Security */}
          {activeTab === "settings" && (
            <div data-testid="content-settings" className="space-y-6 max-w-3xl">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink-primary)]">
                  Studio Preferences & Account Security
                </h2>
                <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                  Manage display theme, atelier communications, and hardware key authentication.
                </p>
              </div>

              {/* Theme Preference Toggle Card */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] flex items-center justify-between gap-4 shadow-xs">
                <div>
                  <div className="font-serif text-base font-bold text-[var(--color-ink-primary)] flex items-center gap-2">
                    {themeMode === "dark" ? <Moon className="w-4 h-4 text-[var(--color-accent-gold)]" /> : <Sun className="w-4 h-4 text-[var(--color-accent-gold)]" />}
                    <span>Studio Canvas Theme</span>
                  </div>
                  <p className="text-xs text-[var(--color-ink-muted)] mt-1">
                    Toggle between Museum Dark Mode (#1A1A1A) and Warm Museum Light Mode (#FAF8F5).
                  </p>
                </div>

                <button
                  type="button"
                  data-testid="account-theme-toggle"
                  onClick={handleToggleTheme}
                  className="px-4 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] hover:border-[var(--color-accent-gold)] text-xs font-mono font-medium text-[var(--color-ink-primary)] transition-colors cursor-pointer"
                >
                  Switch to {themeMode === "dark" ? "Warm Light" : "Museum Dark"} Mode
                </button>
              </div>

              {/* Communication Preferences */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] space-y-4 shadow-xs">
                <h3 className="font-serif text-base font-bold text-[var(--color-ink-primary)]">
                  Atelier Project Notifications
                </h3>

                <div className="space-y-3 text-xs font-mono">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-[var(--color-ink-secondary)]">
                      SMS joinery milling & milestone alerts
                    </span>
                    <input
                      type="checkbox"
                      checked={smsNotifications}
                      onChange={(e) => setSmsNotifications(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C5A059] focus:ring-[#C5A059] cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-dashed border-[var(--color-border-subtle)]">
                    <span className="text-[var(--color-ink-secondary)]">
                      White-glove climate-controlled courier dispatch tracking
                    </span>
                    <input
                      type="checkbox"
                      checked={dispatchAlerts}
                      onChange={(e) => setDispatchAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C5A059] focus:ring-[#C5A059] cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-dashed border-[var(--color-border-subtle)]">
                    <span className="text-[var(--color-ink-secondary)]">
                      Quarterly Frame Cottage Printed Atelier Journal
                    </span>
                    <input
                      type="checkbox"
                      checked={quarterlyJournal}
                      onChange={(e) => setQuarterlyJournal(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C5A059] focus:ring-[#C5A059] cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Security & Access */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-accent-gold)]" />
                    <h3 className="font-serif text-base font-bold text-[var(--color-ink-primary)]">
                      Security & Two-Factor Authentication
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold">
                    Active (FIDO2 / TOTP)
                  </span>
                </div>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  Hardware token and biometric client portal authentication enabled. Last login from New York, US.
                </p>
              </div>

              {/* Sign Out Action Card */}
              <div className="p-6 rounded-2xl border border-red-500/30 bg-red-500/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-red-400">
                    End Active Session
                  </div>
                  <p className="text-[11px] text-[var(--color-ink-muted)] mt-0.5">
                    Signs out of the current collector or corporate portal device.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-full border border-red-500/50 bg-red-500/10 text-xs font-mono text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  Sign Out Now
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* In-Situ Spec Sheet Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-lg w-full rounded-3xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-card-elevated)] p-6 sm:p-8 space-y-5 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 p-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-accent-gold)]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--color-accent-gold)] uppercase tracking-wider block">
                    In-Situ Architectural Spec Sheet
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[var(--color-ink-primary)]">
                    Commission #{selectedOrder.id}
                  </h3>
                </div>
              </div>

              {/* Blueprint details */}
              <div className="p-4 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Project Title:</span>
                  <span className="font-bold text-[var(--color-ink-primary)]">{selectedOrder.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Commission Date:</span>
                  <span>{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Total Valuation:</span>
                  <span className="font-bold text-[var(--color-accent-gold)]">{selectedOrder.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Courier Waybill:</span>
                  <span>{selectedOrder.tracking}</span>
                </div>
                <div className="pt-2 border-t border-dashed border-[var(--color-border-subtle)] text-[11px] text-[var(--color-ink-secondary)]">
                  <strong>Specifications:</strong> {selectedOrder.specs}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Simulated Download of Spec Sheet ${selectedOrder.id}.pdf`)}
                  className="px-4 py-2 rounded-full bg-[var(--color-accent-gold)] text-black text-xs font-mono font-semibold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Spec (PDF)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RFQ Proposal Details Modal */}
      <AnimatePresence>
        {selectedRfq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-lg w-full rounded-3xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-card-elevated)] p-6 sm:p-8 space-y-5 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setSelectedRfq(null)}
                className="absolute top-4 right-4 p-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-accent-gold)]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--color-accent-gold)] uppercase tracking-wider block">
                    RFQ Architectural Dossier
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[var(--color-ink-primary)]">
                    {selectedRfq.id} • {selectedRfq.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Tender ID:</span>
                  <span className="font-bold text-[var(--color-accent-gold)]">{selectedRfq.tenderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Vertical:</span>
                  <span>{selectedRfq.vertical}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-ink-muted)]">Status:</span>
                  <span className="text-emerald-400 font-semibold">{selectedRfq.status}</span>
                </div>
                <div className="pt-2 border-t border-dashed border-[var(--color-border-subtle)] text-[11px] text-[var(--color-ink-secondary)]">
                  <strong>Scope Summary:</strong> {selectedRfq.scope}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedRfq(null)}
                  className="px-4 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href={`/rfq?tender=${selectedRfq.tenderId}`}
                  className="px-4 py-2 rounded-full bg-[var(--color-accent-gold)] text-black text-xs font-mono font-semibold hover:opacity-90 transition-opacity"
                >
                  Open in RFQ Studio →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Address Modal */}
      <AnimatePresence>
        {isAddAddressOpen && (
          <div
            data-testid="address-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full rounded-3xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-card-elevated)] p-6 sm:p-8 space-y-4 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setIsAddAddressOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[var(--color-accent-gold)] uppercase tracking-wider block">
                  Studio Unloading Zone
                </span>
                <h3 className="font-serif text-xl font-bold text-[var(--color-ink-primary)]">
                  Add New Delivery Address
                </h3>
              </div>

              <form onSubmit={handleCreateAddress} className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono text-[var(--color-ink-muted)] block mb-1">
                    Address Label / Jobsite Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Tribeca Penthouse Gallery"
                    className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--color-ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--color-ink-muted)] block mb-1">
                    Street Address & Loading Bay
                  </label>
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="e.g. 110 Franklin St, Ste 4B"
                    className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--color-ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-[11px] font-mono text-[var(--color-ink-muted)] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="New York"
                      className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--color-ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[var(--color-ink-muted)] block mb-1">State</label>
                    <input
                      type="text"
                      value={newStateVal}
                      onChange={(e) => setNewStateVal(e.target.value)}
                      placeholder="NY"
                      className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--color-ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[var(--color-ink-muted)] block mb-1">
                    Courier Access Notes
                  </label>
                  <input
                    type="text"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g. Freight elevator key with doorman"
                    className="w-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-strong)] rounded-xl px-3 py-2 text-xs text-[var(--color-ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsAddAddressOpen(false)}
                    className="px-4 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] text-xs font-mono text-[var(--color-ink-muted)] hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[var(--color-accent-gold)] text-black text-xs font-mono font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </>
  );
}
