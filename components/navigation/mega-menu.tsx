"use client";

import Link from "next/link";
import {
  Upload,
  Layers,
  Award,
  Box,
  LayoutGrid,
  TrendingUp,
  Columns3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MegaMenu({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Custom Framing Mega Menu"
      data-testid="mega-menu-dropdown"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 w-full bg-[#F5F5F7] border-b border-[#D2D2D7] shadow-xl transition-all duration-300 ease-out z-40 animate-in fade-in slide-in-from-top-2"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Custom Framing */}
          <div className="space-y-4">
            <div className="border-b border-[#D2D2D7] pb-2">
              <h3 className="font-sans text-sm font-semibold text-[#1D1D1F] tracking-tight flex items-center gap-2">
                Custom Framing
              </h3>
              <p className="text-xs text-[#86868B] mt-0.5">Precision cut to the millimeter</p>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/custom-framing/upload"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] flex items-center gap-1.5 transition-colors">
                      Upload & Frame
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.2 bg-[#1D1D1F]/10 text-[#1D1D1F] rounded">
                        Popular
                      </span>
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Upload digital art, photos, or prints with museum glass
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-framing/canvas"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] transition-colors">
                      Canvas Floating
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Stretched canvases with floating depth reveal
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-framing/diploma"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] transition-colors">
                      Document & Diploma
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Archival 99% UV-protective acrylic preservation
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-framing/shadowbox"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] transition-colors">
                      Shadowboxes
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Deep moulding for jerseys, memorabilia & textiles
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: By Wood & Material */}
          <div className="space-y-4">
            <div className="border-b border-[#D2D2D7] pb-2">
              <h3 className="font-sans text-sm font-semibold text-[#1D1D1F] tracking-tight">
                By Wood & Material
              </h3>
              <p className="text-xs text-[#86868B] mt-0.5">Sustainably harvested solid hardwood</p>
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/materials/american-walnut"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#301D0E] shadow-sm bg-[#4A2E18]"
                      style={{
                        backgroundImage: "radial-gradient(#5C3A1F 15%, transparent 16%)",
                        backgroundSize: "4px 4px",
                      }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#1D1D1F] transition-colors">
                        American Walnut
                      </p>
                      <p className="text-[11px] text-[#86868B]">Deep espresso chocolate grain</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/nordic-white-oak"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#B59D77] shadow-sm bg-[#D8C19D]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#1D1D1F] transition-colors">
                        Nordic White Oak
                      </p>
                      <p className="text-[11px] text-[#86868B]">Warm Scandinavian natural grain</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/gallery-matte-black"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#2D2A28] shadow-sm bg-[#1A1817]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#1D1D1F] transition-colors">
                        Gallery Matte Black
                      </p>
                      <p className="text-[11px] text-[#86868B]">Architectural velvet matte finish</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/brushed-brass"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#9A7D3A] shadow-sm bg-gradient-to-tr from-[#A6833E] via-[#C5A059] to-[#E3C886]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#1D1D1F] transition-colors">
                        Brushed Brass
                      </p>
                      <p className="text-[11px] text-[#86868B]">Solid extruded metallic satin</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/florentine-gold"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#B38D28] shadow-sm bg-gradient-to-tr from-[#BA8E23] via-[#D4AF37] to-[#F7DE8B]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#1D1D1F] transition-colors">
                        Florentine Gold
                      </p>
                      <p className="text-[11px] text-[#86868B]">Hand-gilded artisanal leaf</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Gallery Walls & Sets */}
          <div className="space-y-4">
            <div className="border-b border-[#D2D2D7] pb-2">
              <h3 className="font-sans text-sm font-semibold text-[#1D1D1F] tracking-tight">
                Gallery Walls & Sets
              </h3>
              <p className="text-xs text-[#86868B] mt-0.5">Pre-measured templates with hanging kits</p>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/gallery-walls/triptych"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <Columns3 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] transition-colors">
                      3-Piece Triptych
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Balanced focal trio designed for credenzas & sofas
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery-walls/staircase-flow"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] transition-colors">
                      Staircase Flow
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Graduated elevation spacing templates
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery-walls/9-frame-grid"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] transition-colors">
                      9-Frame Grid
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Symmetrical archival botanical & travel grid
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery-walls/eclectic-salon"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#E8E8ED] transition-colors"
                >
                  <div className="p-2 rounded-md bg-white border border-[#D2D2D7] text-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors shrink-0">
                    <Sparkles className="w-4 h-4 text-[#B88E56]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1D1D1F] transition-colors">
                      Eclectic Salon Wall
                    </span>
                    <p className="text-xs text-[#86868B] leading-relaxed mt-0.5">
                      Mixed moulding profiles and curated asymmetrical rhythm
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Featured Collection */}
          <div className="bg-[#E8E8ED] rounded-2xl p-5 border border-[#D2D2D7] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-white text-[#1D1D1F] border border-[#D2D2D7] rounded-full">
                  Curator&apos;s Edition
                </span>
                <span className="text-xs text-[#86868B] font-medium">New Arrival</span>
              </div>

              {/* Visual Frame Thumbnail Preview */}
              <div className="relative aspect-4/3 w-full bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-3 flex items-center justify-center mb-4 overflow-hidden group-hover:border-[#1D1D1F] transition-colors">
                <div className="w-full h-full bg-[#F5F5F7] border border-[#D2D2D7] p-2 flex flex-col items-center justify-center text-center rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#B88E56] mb-1 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-xs font-semibold text-[#1D1D1F] tracking-tight">
                    Heritage Oak
                  </span>
                  <span className="text-[10px] text-[#86868B]">Solid Timber & Archival Mat</span>
                </div>
              </div>

              <h4 className="font-sans text-sm font-semibold text-[#1D1D1F] mb-1.5 leading-snug">
                The Heritage Oak Collection
              </h4>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Hand-stained solid timber harvested from sustainable European forests. Built with archival acid-free matting.
              </p>
            </div>

            <Link
              href="/collections/heritage-oak"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D1D1F] hover:text-[#86868B] group-hover:translate-x-0.5 transition-all"
            >
              Explore Collection
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
