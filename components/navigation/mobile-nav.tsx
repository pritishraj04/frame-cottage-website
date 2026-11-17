"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  Building2,
  FileText,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SERVICE_VERTICALS } from "@/lib/constants/verticals";

export function MobileNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedVertical, setExpandedVertical] = useState<string | null>("bespoke-framing");

  const toggleVertical = (id: string) => {
    setExpandedVertical(expandedVertical === id ? null : id);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeMenu();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open mobile navigation menu"
          className="p-2 text-[var(--color-ink-primary)] hover:text-accent rounded-md transition-colors lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#000000]/75 backdrop-blur-xs z-50 animate-in fade-in duration-200" />
        <Dialog.Content
          aria-describedby="mobile-nav-description"
          className="fixed top-0 left-0 bottom-0 w-[88vw] max-w-sm bg-[var(--background)] z-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-[var(--color-border-subtle)] text-[var(--color-ink-primary)]"
        >
          <div>
            {/* Header row with Theme Toggle and Close */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
              <Dialog.Title className="font-serif tracking-[0.2em] text-lg font-semibold text-[var(--color-ink-primary)]">
                FRAMES COTTAGE
              </Dialog.Title>
              <div className="flex items-center gap-1.5">
                <ThemeToggle testId="mobile-theme-toggle" />
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="p-1.5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] rounded-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>
            </div>
            <p id="mobile-nav-description" className="sr-only">
              Mobile navigation drawer for browsing the 6 studio service verticals, capabilities, and RFQ submission.
            </p>

            {/* Sub-tagline */}
            <div className="mt-3 px-1 text-[11px] text-[var(--color-ink-muted)] leading-tight">
              Design, Fabrication & Framing Studio • B2C, B2B & Public Sector
            </div>

            {/* Quick search input */}
            <form onSubmit={handleSearchSubmit} className="mt-4 relative" data-testid="mobile-search-form">
              <input
                type="search"
                data-testid="mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search verticals, capabilities, specs..."
                className="w-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Search className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* 6 Core Service Verticals Navigation Accordion */}
            <div className="mt-6">
              <div className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2 px-1">
                Core Service Verticals
              </div>
              <nav className="space-y-1.5" aria-label="Mobile Service Verticals">
                {SERVICE_VERTICALS.map((vertical) => {
                  const Icon = vertical.icon;
                  const isExpanded = expandedVertical === vertical.id;
                  return (
                    <div
                      key={vertical.id}
                      className="border-b border-[var(--color-border-subtle)]/60 pb-1.5"
                    >
                      <button
                        type="button"
                        onClick={() => toggleVertical(vertical.id)}
                        className="w-full flex items-center justify-between py-2 text-left text-xs font-semibold text-[var(--color-ink-primary)] hover:text-accent"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-accent" />
                          <span>{vertical.name}</span>
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-[var(--color-ink-muted)] transition-transform duration-200 ${
                            isExpanded ? "rotate-90 text-accent" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="pl-6 py-2 space-y-2 text-xs text-[var(--color-ink-muted)] animate-in fade-in duration-150">
                          <div className="text-[10px] text-accent font-medium pb-1 border-b border-[var(--color-border-subtle)]/40">
                            {vertical.audienceBadge}
                          </div>
                          {vertical.subCapabilities.map((sub) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={closeMenu}
                              className="block py-1 hover:text-accent transition-colors"
                            >
                              <div className="font-medium text-[var(--color-ink-primary)]">
                                {sub.title}
                              </div>
                              <div className="text-[11px] text-[var(--color-ink-muted)] leading-tight">
                                {sub.description}
                              </div>
                            </Link>
                          ))}
                          <Link
                            href={vertical.href}
                            onClick={closeMenu}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent pt-1"
                          >
                            Explore Vertical <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Prominent RFQ & WhatsApp Callouts */}
            <div className="mt-6 p-4 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-primary)]">
                <FileText className="w-4 h-4 text-accent" />
                <span>Request Project RFP / RFQ</span>
              </div>
              <p className="text-[11px] text-[var(--color-ink-muted)] leading-relaxed">
                Direct consultation for spatial signage, bespoke framing, and government tenders.
              </p>
              <div className="pt-1">
                <Link
                  href="/rfq"
                  onClick={closeMenu}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-xs font-semibold tracking-wide transition-colors"
                >
                  <span>Submit RFQ</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom user quick actions */}
          <div className="pt-6 border-t border-[var(--color-border-subtle)] mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] hover:border-accent transition-colors"
              >
                <Heart className="w-4 h-4 text-accent" />
                <span>Saved Items</span>
              </Link>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] hover:border-accent transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-accent" />
                <span>Studio Cart</span>
              </Link>
            </div>

            <div className="text-[10px] text-center text-[var(--color-ink-muted)]">
              © 2026 Frames Cottage • GeM Registered & ISO 9001 Certified
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
