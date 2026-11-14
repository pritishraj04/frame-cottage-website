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
            {/* Left: Mobile Nav Button + Desktop Navigation triggers */}
            <div className="flex items-center gap-1 lg:gap-8 flex-1">
              <MobileNav />

              <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Main Navigation">
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
            </div>

            {/* Center: Editorial Brand Wordmark (Serif) */}
            <div className="flex items-center justify-center shrink-0">
              <Link
                href="/"
                data-testid="brand-wordmark"
                className="font-serif tracking-[0.22em] text-lg sm:text-xl font-semibold text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors whitespace-nowrap text-center"
              >
                FRAME COTTAGE
              </Link>
            </div>

            {/* Right: Theme Toggle, Quick Search, Wishlist, Account, Cart Drawer trigger */}
            <div className="flex items-center justify-end gap-1 sm:gap-2.5 flex-1">
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

              <button
                type="button"
                aria-label={`Cart with ${cartCount} items`}
                data-testid="header-cart-btn"
                className="p-2 text-[var(--color-ink-primary)] hover:text-[var(--color-accent-gold)] transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)] relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  data-testid="cart-badge"
                  className="absolute -top-0.5 -right-0.5 bg-[var(--color-accent-gold)] text-[var(--background)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {cartCount}
                </span>
              </button>
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
