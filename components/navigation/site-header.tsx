"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag, ChevronDown } from "lucide-react";
import { AnnouncementBar } from "./announcement-bar";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";

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
    <div className="w-full relative z-50">
      {showAnnouncement && <AnnouncementBar />}

      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF7F2]/90 border-b border-[#E8E1D5] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Nav Button + Desktop Navigation triggers */}
            <div className="flex items-center gap-1 lg:gap-8 flex-1">
              <MobileNav />

              <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
                {/* Mega-menu trigger: Custom Framing */}
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={isMegaMenuOpen}
                    aria-haspopup="true"
                    data-testid="nav-custom-framing"
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                    className={`inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-medium py-2 transition-colors ${
                      isMegaMenuOpen ? "text-[#B45309]" : "text-[#191614] hover:text-[#B45309]"
                    }`}
                  >
                    Custom Framing
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isMegaMenuOpen ? "rotate-180 text-[#B45309]" : "text-[#8F877E]"
                      }`}
                    />
                  </button>
                </div>

                <Link
                  href="/ready-made"
                  data-testid="nav-ready-made"
                  className="text-xs uppercase tracking-[0.15em] font-medium text-[#191614] hover:text-[#B45309] transition-colors py-2"
                >
                  Ready-Made
                </Link>

                <Link
                  href="/gallery-walls"
                  data-testid="nav-gallery-walls"
                  className="text-xs uppercase tracking-[0.15em] font-medium text-[#191614] hover:text-[#B45309] transition-colors py-2"
                >
                  Gallery Walls
                </Link>

                <Link
                  href="/atelier"
                  data-testid="nav-atelier"
                  className="text-xs uppercase tracking-[0.15em] font-medium text-[#191614] hover:text-[#B45309] transition-colors py-2"
                >
                  The Atelier
                </Link>
              </nav>
            </div>

            {/* Center: Editorial Brand Wordmark */}
            <div className="flex items-center justify-center shrink-0">
              <Link
                href="/"
                data-testid="brand-wordmark"
                className="font-serif tracking-[0.2em] text-xl font-medium text-[#191614] hover:opacity-90 transition-opacity whitespace-nowrap text-center"
              >
                FRAME COTTAGE
              </Link>
            </div>

            {/* Right: Quick Search, Wishlist, Account, Cart Drawer trigger */}
            <div className="flex items-center justify-end gap-1 sm:gap-4 flex-1">
              <button
                type="button"
                aria-label="Quick Search"
                data-testid="header-search-btn"
                className="p-2 text-[#191614] hover:text-[#B45309] transition-colors rounded-full hover:bg-[#F3ECE2]"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                data-testid="header-wishlist-link"
                className="hidden sm:inline-flex p-2 text-[#191614] hover:text-[#B45309] transition-colors rounded-full hover:bg-[#F3ECE2]"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                href="/account"
                aria-label="Account"
                data-testid="header-account-link"
                className="hidden sm:inline-flex p-2 text-[#191614] hover:text-[#B45309] transition-colors rounded-full hover:bg-[#F3ECE2]"
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                type="button"
                aria-label={`Cart with ${cartCount} items`}
                data-testid="header-cart-btn"
                className="p-2 text-[#191614] hover:text-[#B45309] transition-colors rounded-full hover:bg-[#F3ECE2] relative"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  data-testid="cart-badge"
                  className="absolute -top-0.5 -right-0.5 bg-[#B45309] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* India Circus Mega-Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </header>
    </div>
  );
}
