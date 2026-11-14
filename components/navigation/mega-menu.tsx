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
      className="absolute top-full left-0 w-full bg-[#242424] border-b border-[#333333] shadow-2xl transition-all duration-300 ease-out z-40 animate-in fade-in slide-in-from-top-2 text-[#F4F1EA]"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Custom Framing */}
          <div className="space-y-4">
            <div className="border-b border-[#333333] pb-2">
              <h3 className="font-serif text-sm font-semibold text-[#F4F1EA] tracking-wide flex items-center gap-2">
                Custom Framing
              </h3>
              <p className="text-xs text-[#9E9E9E] mt-0.5">Precision cut to the millimeter</p>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/custom-framing/upload"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] flex items-center gap-1.5 transition-colors">
                      Upload & Frame
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.2 bg-[#6B1C23] text-[#F4F1EA] rounded">
                        Popular
                      </span>
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Upload digital art, photos, or prints with museum glass
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-framing/canvas"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] transition-colors">
                      Canvas Floating
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Stretched canvases with floating depth reveal
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-framing/diploma"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] transition-colors">
                      Document & Diploma
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Archival 99% UV-protective acrylic preservation
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-framing/shadowbox"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] transition-colors">
                      Shadowboxes
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Deep moulding for jerseys, memorabilia & textiles
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: By Wood & Material */}
          <div className="space-y-4">
            <div className="border-b border-[#333333] pb-2">
              <h3 className="font-serif text-sm font-semibold text-[#F4F1EA] tracking-wide">
                By Wood & Material
              </h3>
              <p className="text-xs text-[#9E9E9E] mt-0.5">Sustainably harvested solid hardwood</p>
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/materials/american-walnut"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
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
                      <p className="text-sm font-medium text-[#F4F1EA] transition-colors">
                        American Walnut
                      </p>
                      <p className="text-[11px] text-[#9E9E9E]">Deep espresso chocolate grain</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#9E9E9E] opacity-0 group-hover:opacity-100 group-hover:text-[#C5A059] transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/nordic-white-oak"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#B59D77] shadow-sm bg-[#D8C19D]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#F4F1EA] transition-colors">
                        Nordic White Oak
                      </p>
                      <p className="text-[11px] text-[#9E9E9E]">Warm Scandinavian natural grain</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#9E9E9E] opacity-0 group-hover:opacity-100 group-hover:text-[#C5A059] transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/gallery-matte-black"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#2D2A28] shadow-sm bg-[#1A1817]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#F4F1EA] transition-colors">
                        Gallery Matte Black
                      </p>
                      <p className="text-[11px] text-[#9E9E9E]">Architectural velvet matte finish</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#9E9E9E] opacity-0 group-hover:opacity-100 group-hover:text-[#C5A059] transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/brushed-brass"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#9A7D3A] shadow-sm bg-gradient-to-tr from-[#A6833E] via-[#C5A059] to-[#E3C886]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#F4F1EA] transition-colors">
                        Brushed Brass
                      </p>
                      <p className="text-[11px] text-[#9E9E9E]">Solid extruded metallic satin</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#9E9E9E] opacity-0 group-hover:opacity-100 group-hover:text-[#C5A059] transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materials/florentine-gold"
                  className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-[#B38D28] shadow-sm bg-gradient-to-tr from-[#BA8E23] via-[#D4AF37] to-[#F7DE8B]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#F4F1EA] transition-colors">
                        Florentine Gold
                      </p>
                      <p className="text-[11px] text-[#9E9E9E]">Hand-gilded artisanal leaf</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#9E9E9E] opacity-0 group-hover:opacity-100 group-hover:text-[#C5A059] transition-all">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Gallery Walls & Sets */}
          <div className="space-y-4">
            <div className="border-b border-[#333333] pb-2">
              <h3 className="font-serif text-sm font-semibold text-[#F4F1EA] tracking-wide">
                Gallery Walls & Sets
              </h3>
              <p className="text-xs text-[#9E9E9E] mt-0.5">Pre-measured templates with hanging kits</p>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/gallery-walls/triptych"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <Columns3 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] transition-colors">
                      3-Piece Triptych
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Balanced focal trio designed for credenzas & sofas
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery-walls/staircase-flow"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] transition-colors">
                      Staircase Flow
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Graduated elevation spacing templates
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery-walls/9-frame-grid"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] transition-colors">
                      9-Frame Grid
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Symmetrical archival botanical & travel grid
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery-walls/eclectic-salon"
                  className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-[#6B1C23]/25 hover:border-[#6B1C23]/40 border border-transparent transition-all"
                >
                  <div className="p-2 rounded-md bg-[#2A2A2A] border border-[#333333] text-[#F4F1EA] group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors shrink-0">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F4F1EA] transition-colors">
                      Eclectic Salon Wall
                    </span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed mt-0.5">
                      Mixed moulding profiles and curated asymmetrical rhythm
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Featured Collection */}
          <div className="bg-[#1F1F1F] rounded-2xl p-5 border border-[#333333] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-[#6B1C23] text-[#F4F1EA] border border-[#6B1C23] rounded-full">
                  Curator&apos;s Edition
                </span>
                <span className="text-xs text-[#C5A059] font-medium">New Arrival</span>
              </div>

              {/* Visual Frame Thumbnail Preview */}
              <div className="relative aspect-4/3 w-full bg-[#242424] rounded-xl border border-[#333333] shadow-sm p-3 flex items-center justify-center mb-4 overflow-hidden group-hover:border-[#C5A059] transition-colors">
                <div className="w-full h-full bg-[#1A1A1A] border border-[#333333] p-2 flex flex-col items-center justify-center text-center rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#242424] flex items-center justify-center text-[#C5A059] mb-1 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-xs font-semibold text-[#F4F1EA] tracking-wide">
                    Heritage Oak
                  </span>
                  <span className="text-[10px] text-[#9E9E9E]">Solid Timber & Archival Mat</span>
                </div>
              </div>

              <h4 className="font-serif text-sm font-semibold text-[#F4F1EA] mb-1.5 leading-snug">
                The Heritage Oak Collection
              </h4>
              <p className="text-xs text-[#9E9E9E] leading-relaxed">
                Hand-stained solid timber harvested from sustainable European forests. Built with archival acid-free matting.
              </p>
            </div>

            <Link
              href="/collections/heritage-oak"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A059] hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all"
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
