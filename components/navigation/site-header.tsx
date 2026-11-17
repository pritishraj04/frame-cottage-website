"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Heart, User, ShoppingBag, ChevronDown } from "lucide-react";
import { AnnouncementBar } from "./announcement-bar";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SearchModal } from "@/components/search/search-modal";
import { SignedIn, SignedOut, UserButton } from "@/components/auth/clerk-auth";
import { createWhatsAppChatUrl } from "@/lib/constants/whatsapp";

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
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Anchor & Mobile Trigger */}
            <div className="flex items-center gap-1 sm:gap-4 shrink-0">
              <MobileNav />

              <div className="flex flex-col">
                <Link
                  href="/"
                  data-testid="brand-wordmark"
                  className="font-serif tracking-[0.12em] sm:tracking-[0.22em] text-sm sm:text-xl font-bold text-[var(--color-ink-primary)] hover:text-accent transition-colors whitespace-nowrap leading-none"
                >
                  FRAMES COTTAGE
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
              <a
                href={createWhatsAppChatUrl("Hello Frames Cottage Studio, I would like to place an order or consult on a bespoke framing project.")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="header-whatsapp-btn"
                aria-label="Order or Consult on WhatsApp"
                title="Order via WhatsApp"
                className="hidden sm:inline-flex p-2 text-[#25D366] hover:text-[#20ba59] transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)] cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.84 7.42 8.52 7.5 8.25 7.79C7.97 8.09 7.21 8.81 7.21 10.27C7.21 11.73 8.27 13.13 8.41 13.33C8.56 13.53 10.5 16.69 13.56 17.89C16.1 18.88 16.62 18.69 17.17 18.64C17.72 18.59 18.94 17.91 19.19 17.21C19.44 16.51 19.44 15.91 19.37 15.79C19.3 15.66 19.1 15.59 18.8 15.44C18.5 15.29 17.03 14.57 16.76 14.47C16.48 14.37 16.29 14.32 16.09 14.62C15.89 14.91 15.33 15.59 15.16 15.79C14.99 15.98 14.81 16.01 14.52 15.86C14.22 15.71 13.27 15.4 12.14 14.39C11.26 13.6 10.66 12.63 10.5 12.33C10.33 12.04 10.48 11.88 10.63 11.73C10.77 11.59 10.94 11.37 11.09 11.19C11.24 11.02 11.29 10.89 11.39 10.69C11.49 10.5 11.44 10.33 11.37 10.18C11.29 10.04 10.69 8.58 10.44 7.98C10.2 7.4 9.96 7.48 9.77 7.47C9.6 7.47 9.4 7.42 9.04 7.42Z" />
                </svg>
                <span className="sr-only">Order on WhatsApp</span>
              </a>

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
                className="inline-flex items-center p-1.5 sm:p-2 text-[var(--color-ink-primary)] hover:text-accent transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)]"
              >
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-5 h-5",
                      },
                    }}
                  />
                </SignedIn>
                <SignedOut>
                  <User className="w-5 h-5" />
                </SignedOut>
              </Link>

              <Link
                href="/cart"
                aria-label={`Cart with ${cartCount} items`}
                data-testid="header-cart-btn"
                className="p-2 text-[var(--color-ink-primary)] hover:text-accent transition-colors rounded-full hover:bg-[var(--color-canvas-subtle)] relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <motion.span
                  key={cartCount}
                  data-testid="cart-badge"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -top-0.5 right-0 sm:-right-0.5 bg-accent text-[var(--color-accent-contrast)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {cartCount}
                </motion.span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mega-Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClose={() => setIsMegaMenuOpen(false)}
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
