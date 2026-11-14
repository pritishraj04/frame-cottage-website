"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronRight,
  Upload,
  Layers,
  Sparkles,
  LayoutGrid,
  ShoppingBag,
  User,
  Heart,
  Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("custom");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const closeMenu = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open mobile navigation menu"
          className="p-2 text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] rounded-md transition-colors lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#000000]/75 backdrop-blur-xs z-50 animate-in fade-in duration-200" />
        <Dialog.Content
          aria-describedby="mobile-nav-description"
          className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-[var(--background)] z-50 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-[var(--color-border-subtle)] text-[var(--color-ink-primary)]"
        >
          <div>
            {/* Header row with Theme Toggle and Close */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
              <Dialog.Title className="font-serif tracking-[0.2em] text-lg font-semibold text-[var(--color-ink-primary)]">
                FRAME COTTAGE
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
              Mobile navigation drawer for browsing frame styles, gallery wall collections, and account settings.
            </p>

            {/* Quick search input */}
            <div className="mt-5 relative">
              <input
                type="search"
                placeholder="Search frame styles, woods, mats..."
                className="w-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
              <Search className="w-4 h-4 text-[var(--color-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Navigation Accordion Sections */}
            <nav className="mt-6 space-y-2">
              {/* Custom Framing */}
              <div className="border-b border-[var(--color-border-subtle)]/60 pb-2">
                <button
                  type="button"
                  onClick={() => toggleSection("custom")}
                  className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)]"
                >
                  <span>Custom Framing</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[var(--color-ink-muted)] transition-transform duration-200 ${
                      expandedSection === "custom" ? "rotate-90 text-[var(--color-accent-gold)]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "custom" && (
                  <div className="pl-3 py-2 space-y-2.5 text-xs text-[var(--color-ink-muted)] animate-in fade-in duration-150">
                    <Link
                      href="/custom-framing/upload"
                      onClick={closeMenu}
                      className="flex items-center gap-2 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                      Upload & Frame (Digital & Art)
                    </Link>
                    <Link
                      href="/custom-framing/canvas"
                      onClick={closeMenu}
                      className="flex items-center gap-2 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                      Canvas Floating Frames
                    </Link>
                    <Link
                      href="/custom-framing/diploma"
                      onClick={closeMenu}
                      className="flex items-center gap-2 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                      Document & Diploma
                    </Link>
                    <Link
                      href="/custom-framing/shadowbox"
                      onClick={closeMenu}
                      className="flex items-center gap-2 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <LayoutGrid className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                      Deep Shadowboxes
                    </Link>
                  </div>
                )}
              </div>

              {/* Ready-Made Frames */}
              <div className="border-b border-[var(--color-border-subtle)]/60 pb-2">
                <Link
                  href="/ready-made"
                  onClick={closeMenu}
                  className="block py-2 text-sm font-semibold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  Ready-Made Frames
                </Link>
              </div>

              {/* Gallery Walls */}
              <div className="border-b border-[var(--color-border-subtle)]/60 pb-2">
                <button
                  type="button"
                  onClick={() => toggleSection("gallery")}
                  className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)]"
                >
                  <span>Gallery Walls & Sets</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[var(--color-ink-muted)] transition-transform duration-200 ${
                      expandedSection === "gallery" ? "rotate-90 text-[var(--color-accent-gold)]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "gallery" && (
                  <div className="pl-3 py-2 space-y-2.5 text-xs text-[var(--color-ink-muted)] animate-in fade-in duration-150">
                    <Link
                      href="/gallery-walls/triptych"
                      onClick={closeMenu}
                      className="block hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      3-Piece Triptych
                    </Link>
                    <Link
                      href="/gallery-walls/staircase-flow"
                      onClick={closeMenu}
                      className="block hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      Staircase Flow
                    </Link>
                    <Link
                      href="/gallery-walls/9-frame-grid"
                      onClick={closeMenu}
                      className="block hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      9-Frame Botanical Grid
                    </Link>
                    <Link
                      href="/gallery-walls/eclectic-salon"
                      onClick={closeMenu}
                      className="block hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      Eclectic Salon Wall
                    </Link>
                  </div>
                )}
              </div>

              {/* By Wood & Material */}
              <div className="border-b border-[var(--color-border-subtle)]/60 pb-2">
                <button
                  type="button"
                  onClick={() => toggleSection("wood")}
                  className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)]"
                >
                  <span>By Wood & Material</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[var(--color-ink-muted)] transition-transform duration-200 ${
                      expandedSection === "wood" ? "rotate-90 text-[var(--color-accent-gold)]" : ""
                    }`}
                  />
                </button>
                {expandedSection === "wood" && (
                  <div className="pl-3 py-2 space-y-2.5 text-xs text-[var(--color-ink-muted)] animate-in fade-in duration-150">
                    <Link
                      href="/materials/american-walnut"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#4A2E18] border border-[#301D0E] shrink-0" />
                      American Walnut
                    </Link>
                    <Link
                      href="/materials/nordic-white-oak"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#D8C19D] border border-[#B59D77] shrink-0" />
                      Nordic White Oak
                    </Link>
                    <Link
                      href="/materials/gallery-matte-black"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#1A1817] border border-[#2D2A28] shrink-0" />
                      Gallery Matte Black
                    </Link>
                    <Link
                      href="/materials/brushed-brass"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#C5A059] border border-[#9A7D3A] shrink-0" />
                      Brushed Brass
                    </Link>
                    <Link
                      href="/materials/florentine-gold"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 hover:text-[var(--color-ink-primary)] transition-colors"
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border border-[#B38D28] shrink-0" />
                      Florentine Gold
                    </Link>
                  </div>
                )}
              </div>

              {/* The Atelier */}
              <div className="border-b border-[var(--color-border-subtle)]/60 pb-2">
                <Link
                  href="/atelier"
                  onClick={closeMenu}
                  className="block py-2 text-sm font-semibold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  The Atelier
                </Link>
              </div>
            </nav>
          </div>

          {/* Footer CTAs and Account */}
          <div className="pt-6 border-t border-[var(--color-border-subtle)] space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <Link
                href="/account"
                onClick={closeMenu}
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] transition-colors text-xs font-medium"
              >
                <User className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Account
              </Link>
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] transition-colors text-xs font-medium"
              >
                <Heart className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Saved
              </Link>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--color-canvas-surface)] text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] transition-colors text-xs font-medium relative"
              >
                <ShoppingBag className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Cart (0)
              </Link>
            </div>

            <div className="bg-[var(--color-canvas-subtle)] p-3.5 rounded-xl border border-[var(--color-border-subtle)] text-center shadow-2xs">
              <p className="text-[11px] font-semibold text-[var(--color-ink-primary)]">
                Need Framing Advice?
              </p>
              <p className="text-[10px] text-[var(--color-ink-muted)] mt-0.5">
                Our bespoke framing consultants are available 7 days a week.
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
