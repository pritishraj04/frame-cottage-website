"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag, ChevronDown } from "lucide-react";
import { AnnouncementBar } from "./announcement-bar";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface SiteHeaderProps {
  showAnnouncement?: boolean;
  cartCount?: number;
}

export function SiteHeader({ showAnnouncement = true, cartCount = 0 }: SiteHeaderProps) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

  return (
    <>
      {showAnnouncement && <AnnouncementBar />}

      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--color-border-subtle)] transition-colors duration-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Left: Brand Anchor & Mobile Trigger */}
            <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
              <MobileNav />

              <div className="flex flex-col">
                <Link
                  href="/"
                  data-testid="brand-wordmark"
                  className="font-serif tracking-[0.18em] sm:tracking-[0.22em] text-base sm:text-xl font-bold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors whitespace-nowrap leading-none"
                >
                  FRAME COTTAGE
                </Link>
                <span className="text-[8.5px] uppercase tracking-[0.26em] font-mono text-[var(--color-accent-gold)] mt-1 hidden sm:block">
                  Design & Fabrication Studio
                </span>
              </div>
            </div>

            {/* Center: Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-1 px-4"
              aria-label="Main Navigation"
            >
              {/* Mega-menu trigger: Service Verticals */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={isMegaMenuOpen}
                  aria-haspopup="true"
                  data-testid="nav-service-verticals"
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium py-2 transition-colors cursor-pointer ${
                    isMegaMenuOpen
                      ? "text-[var(--color-accent-gold)]"
                      : "text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)]"
                  }`}
                >
                  Service Verticals
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMegaMenuOpen ? "rotate-180 text-[var(--color-accent-gold)]" : "text-[var(--color-ink-muted)]"
                    }`}
                  />
                </button>
              </div>

              <Link
                href="/services/bespoke-framing"
                data-testid="nav-bespoke-framing"
                className="text-xs uppercase tracking-[0.14em] font-medium text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors py-2 whitespace-nowrap"
              >
                Bespoke Framing
              </Link>

              <Link
                href="/services/spatial-signage"
                data-testid="nav-spatial-signage"
                className="text-xs uppercase tracking-[0.14em] font-medium text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors py-2 whitespace-nowrap"
              >
                Spatial & Signage
              </Link>

              <Link
                href="/services/industrial-cnc"
                data-testid="nav-industrial-cnc"
                className="text-xs uppercase tracking-[0.14em] font-medium text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors py-2 whitespace-nowrap"
              >
                Industrial CNC
              </Link>

              <Link
                href="/services/civic-projects"
                data-testid="nav-civic-projects"
                className="text-xs uppercase tracking-[0.14em] font-medium text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors py-2 whitespace-nowrap"
              >
                Government & Civic
              </Link>
            </nav>

            {/* Right: Actions & Utility */}
            <div className="flex items-center justify-end gap-1 sm:gap-2.5 shrink-0">
              <Link
                href="/rfq"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider bg-[var(--color-accent-gold)] text-black hover:opacity-90 transition-opacity"
              >
                Request RFQ
              </Link>

              <ThemeToggle testId="header-theme-toggle" />

              <button
                type="button"
                aria-label="Quick Search"
                data-testid="header-search-btn"
                className="p-2 text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)]"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                data-testid="header-wishlist-link"
                className="hidden sm:inline-flex p-2 text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)]"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                href="/account"
                aria-label="Account"
                data-testid="header-account-link"
                className="hidden sm:inline-flex p-2 text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)]"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/cart"
                aria-label={`Cart with ${cartCount} items`}
                data-testid="header-cart-btn"
                className="p-2 text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)] relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  data-testid="cart-badge"
                  className="absolute -top-0.5 right-0 sm:-right-0.5 bg-[var(--color-accent-gold)] text-[var(--background)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mega-Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </header>
    </>
  );
}
