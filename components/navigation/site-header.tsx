"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, ShoppingBag, ChevronDown } from "lucide-react";
import { AnnouncementBar } from "./announcement-bar";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SearchModal } from "@/components/search/search-modal";

interface SiteHeaderProps {
  showAnnouncement?: boolean;
  cartCount?: number;
}

export function SiteHeader({ showAnnouncement = true, cartCount = 0 }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Global keyboard shortcut for Command+K or Control+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

      <header
        data-testid="site-header"
        className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--color-border-subtle)] transition-colors duration-200 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Left: Brand Anchor & Mobile Trigger */}
            <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
              <MobileNav />

              <div className="flex flex-col">
                <Link
                  href="/"
                  data-testid="brand-wordmark"
                  className="font-serif tracking-[0.18em] sm:tracking-[0.22em] text-base sm:text-xl font-bold text-[var(--color-ink-primary)] hover:text-accent transition-colors whitespace-nowrap leading-none"
                >
                  FRAME COTTAGE
                </Link>
                <span className="text-[8.5px] uppercase tracking-[0.26em] font-mono text-accent mt-1 hidden sm:block">
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
                  data-test-alias="nav-item-services"
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium py-2 transition-colors cursor-pointer ${
                    isMegaMenuOpen || pathname === "/services"
                      ? "text-accent font-semibold border-b-2 border-accent"
                      : "text-[var(--color-ink-primary)] hover:text-accent"
                  }`}
                >
                  Service Verticals
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMegaMenuOpen ? "rotate-180 text-accent" : "text-[var(--color-ink-muted)]"
                    }`}
                  />
                </button>
              </div>

              {[
                {
                  href: "/services/bespoke-framing",
                  testId: "nav-bespoke-framing",
                  label: "Bespoke Framing",
                },
                {
                  href: "/services/spatial-signage",
                  testId: "nav-spatial-signage",
                  label: "Spatial & Signage",
                },
                {
                  href: "/services/industrial-cnc",
                  testId: "nav-industrial-cnc",
                  label: "Industrial CNC",
                },
                {
                  href: "/services/civic-projects",
                  testId: "nav-civic-projects",
                  label: "Government & Civic",
                },
              ].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={link.testId}
                    className={`text-xs uppercase tracking-[0.14em] font-medium transition-colors py-2 whitespace-nowrap ${
                      isActive
                        ? "text-accent font-semibold border-b-2 border-accent"
                        : "text-[var(--color-ink-primary)] hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions & Utility */}
            <div className="flex items-center justify-end gap-1 sm:gap-2.5 shrink-0">
              <Link
                href="/rfq"
                data-testid="header-request-rfq"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] shadow-md shadow-accent/25 border border-accent hover:border-accent-hover transition-all duration-200 font-semibold"
              >
                Request RFQ
              </Link>

              <ThemeToggle testId="header-theme-toggle" />

              <button
                type="button"
                aria-label="Quick Search"
                data-testid="header-search-btn"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[var(--color-ink-primary)] hover:text-accent transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)] cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                data-testid="header-wishlist-link"
                className="hidden sm:inline-flex p-2 text-[var(--color-ink-primary)] hover:text-accent transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)]"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                href="/account"
                aria-label="Account"
                data-testid="header-account-link"
                className="hidden sm:inline-flex p-2 text-[var(--color-ink-primary)] hover:text-accent transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)]"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/cart"
                aria-label={`Cart with ${cartCount} items`}
                data-testid="header-cart-btn"
                className="p-2 text-[var(--color-ink-primary)] hover:text-accent transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)] relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  data-testid="cart-badge"
                  className="absolute -top-0.5 right-0 sm:-right-0.5 bg-accent text-[var(--color-accent-contrast)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
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

      {/* Global Command Palette / Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
