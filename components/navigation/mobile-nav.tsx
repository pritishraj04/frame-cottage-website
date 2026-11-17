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
  User,
  Heart,
  Search,
  Building2,
  FileText,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SERVICE_VERTICALS } from "@/lib/constants/verticals";
import { SignedIn, SignedOut, UserButton } from "@/components/auth/clerk-auth";
import { createWhatsAppChatUrl } from "@/lib/constants/whatsapp";

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
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={createWhatsAppChatUrl("Hello Frames Cottage Studio, I would like to order or consult on a custom project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="mobile-whatsapp-btn"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-[#0A2612] text-xs font-semibold uppercase tracking-wider font-mono shadow-xs transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
                  </svg>
                  <span>Order via WhatsApp</span>
                </a>
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
                href="/account"
                onClick={closeMenu}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] hover:border-accent transition-colors"
              >
                <SignedIn>
                  <UserButton appearance={{ elements: { avatarBox: "w-4 h-4" } }} />
                  <span>Account</span>
                </SignedIn>
                <SignedOut>
                  <User className="w-4 h-4 text-accent" />
                  <span>Account</span>
                </SignedOut>
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
