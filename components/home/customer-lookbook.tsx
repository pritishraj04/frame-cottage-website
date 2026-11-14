"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
  X,
  Eye,
  MapPin,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HotspotPin {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  frameTitle: string;
  frameStyle: string;
  specs: string;
  artTitle: string;
  price: string;
  rating: number;
  review: string;
  customerName: string;
  location: string;
  verified: boolean;
  shopUrl: string;
}

export interface RoomSetting {
  id: string;
  testId: string;
  name: string;
  subtitle: string;
  description: string;
  wallColor: string;
  wallTexture: string;
  hotspots: HotspotPin[];
}

export const ROOM_SETTINGS: RoomSetting[] = [
  {
    id: "living-room",
    testId: "lookbook-room-tab-living-room",
    name: "Living Room Salon Wall",
    subtitle: "Eclectic Collector Salon • SoHo Loft, New York",
    description:
      "A grand, floor-to-ceiling salon hang combining American Black Walnut, antiqued brass leaf, and raw white oak profiles over a deep sage gallery wall.",
    wallColor: "#2F3C33", // Deep sage green
    wallTexture: "from-[#2A372E] via-[#2F3C33] to-[#253028]",
    hotspots: [
      {
        id: "salon-walnut-large",
        x: 32,
        y: 30,
        frameTitle: "The Heritage Black Walnut (16×20″)",
        frameStyle: "heritage-walnut",
        specs: "Solid Appalachian Walnut • 4-Ply Cotton Mat",
        artTitle: "Vintage Botanical Lithograph",
        price: "$185",
        rating: 5,
        review:
          "The mortise corner splines and museum TruVue glass make my vintage lithograph look like an auction piece. Absolutely zero reflections.",
        customerName: "Camilla V.",
        location: "SoHo, NY",
        verified: true,
        shopUrl: "/custom-framing?style=heritage-walnut",
      },
      {
        id: "salon-brass-portrait",
        x: 68,
        y: 26,
        frameTitle: "Atelier Gilded Brass Leaf (11×14″)",
        frameStyle: "gilded-brass",
        specs: "Hand-Applied Antiqued Brass Leaf • Maple Core",
        artTitle: "Architectural Charcoal Study",
        price: "$145",
        rating: 5,
        review:
          "The hand-burnished brass has an exquisite warm gleam without looking glossy or artificial. It pairs magnificently with darker artwork.",
        customerName: "Marcus T.",
        location: "Tribeca, NY",
        verified: true,
        shopUrl: "/custom-framing?style=gilded-brass",
      },
      {
        id: "salon-oak-mini",
        x: 50,
        y: 56,
        frameTitle: "Gallery White Oak Slim (8×10″)",
        frameStyle: "gallery-white-oak",
        specs: "Natural Appalachian Oak • 3″ Archival Mat",
        artTitle: "Monochrome 35mm Silver Gelatin",
        price: "$98",
        rating: 5,
        review:
          "The generous 3-inch cotton rag border gives this tiny film photo massive presence. Arrived ready to hang with brass wire and level.",
        customerName: "Elena S.",
        location: "Boston, MA",
        verified: true,
        shopUrl: "/custom-framing?style=gallery-white-oak",
      },
    ],
  },
  {
    id: "dining-credenza",
    testId: "lookbook-room-tab-dining-credenza",
    name: "Dining Credenza",
    subtitle: "Artisan Credenza Alcove • Lincoln Park, Chicago",
    description:
      "A layered arrangement of leaned and hung architectural pieces over mid-century teak woodwork, accented with handmade ceramic vessels.",
    wallColor: "#DDD3C1", // Warm oatmeal plaster
    wallTexture: "from-[#E6DC source] via-[#DDD3C1] to-[#D4C8B5]",
    hotspots: [
      {
        id: "credenza-matte-black",
        x: 36,
        y: 38,
        frameTitle: "Studio Matte Black Float (18×24″)",
        frameStyle: "studio-matte-black",
        specs: "Hard Rock Maple • Archival Float Mount",
        artTitle: "Abstract Ochre & Indigo Gouache",
        price: "$210",
        rating: 5,
        review:
          "Floating the original gouache painting leaves the deckled edges visible in 3D relief. The construction quality is superior to custom brick-and-mortar shops.",
        customerName: "Julian D.",
        location: "Lincoln Park, IL",
        verified: true,
        shopUrl: "/custom-framing?style=studio-matte-black",
      },
      {
        id: "credenza-natural-oak",
        x: 65,
        y: 46,
        frameTitle: "Natural White Oak Gallery (12×16″)",
        frameStyle: "natural-white-oak",
        specs: "FSC® Appalachian Oak • Warm Off-White Mat",
        artTitle: "Modernist Minimalist Line Drawing",
        price: "$135",
        rating: 5,
        review:
          "Leaning frames on the dining sideboard brings relaxed warmth to the dining space. Clean grain patterns and solid weight.",
        customerName: "Sophia M.",
        location: "Oak Park, IL",
        verified: true,
        shopUrl: "/custom-framing?style=natural-white-oak",
      },
    ],
  },
  {
    id: "minimalist-bedside",
    testId: "lookbook-room-tab-minimalist-bedside",
    name: "Minimalist Bedside",
    subtitle: "Serene Japandi Sanctuary • San Francisco, California",
    description:
      "A meditative master bedroom alcove featuring bleached hardwoods, raw linen drapery, and museum-grade glare-free optical acrylic.",
    wallColor: "#EAE3D5", // Serene warm limestone
    wallTexture: "from-[#F2ECE0] via-[#EAE3D5] to-[#DFD6C5]",
    hotspots: [
      {
        id: "bedside-bleached-maple",
        x: 44,
        y: 34,
        frameTitle: "Atelier Bleached Maple (14×18″)",
        frameStyle: "bleached-maple",
        specs: "Sugar Maple • TruVue® 99% UV Conservation Acrylic",
        artTitle: "Minimalist Horizon Ink Wash",
        price: "$155",
        rating: 5,
        review:
          "Positioned directly opposite our sun-drenched bedroom windows. The TruVue acrylic stops all window glare without muting colors.",
        customerName: "Kenji T.",
        location: "Presidio Heights, CA",
        verified: true,
        shopUrl: "/custom-framing?style=bleached-maple",
      },
      {
        id: "bedside-deep-walnut",
        x: 74,
        y: 52,
        frameTitle: "Mid-Century Walnut Shadowbox (8×10″)",
        frameStyle: "heritage-walnut",
        specs: "Solid Black Walnut • 1.5″ Deep Shadowbox",
        artTitle: "Pressed Japanese Maple Foliage",
        price: "$115",
        rating: 5,
        review:
          "They encapsulated my pressed foliage using conservation-grade archival tabs—no destructive glue. Exquisite depth and craftsmanship.",
        customerName: "Chloe W.",
        location: "Pacific Heights, CA",
        verified: true,
        shopUrl: "/custom-framing?style=heritage-walnut",
      },
    ],
  },
];

export function CustomerLookbook() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("living-room");
  const [activePinId, setActivePinId] = useState<string | null>("salon-walnut-large");

  const currentRoom =
    ROOM_SETTINGS.find((room) => room.id === selectedRoomId) || ROOM_SETTINGS[0];

  const activeHotspot =
    currentRoom.hotspots.find((pin) => pin.id === activePinId) ||
    currentRoom.hotspots[0] ||
    null;

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
    const newRoom = ROOM_SETTINGS.find((r) => r.id === roomId);
    if (newRoom && newRoom.hotspots.length > 0) {
      setActivePinId(newRoom.hotspots[0].id);
    } else {
      setActivePinId(null);
    }
  };

  return (
    <section
      id="customer-lookbook"
      data-testid="customer-lookbook"
      aria-label="Customer Homes & Gallery Wall Lookbook"
      className="w-full bg-[var(--background)] py-16 sm:py-24 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            EDITORIAL SECTION HEADER
           ===================================================================== */}
        <div
          data-testid="lookbook-header"
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Living with Craft • Real Homes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            Customer Homes & Gallery Wall Lookbook
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed font-normal max-w-2xl mx-auto">
            Step inside real collector spaces and curated sanctuaries. Tap the interactive brass pins to discover the frame profiles, archival mats, and customer reviews.
          </p>
        </div>

        {/* =====================================================================
            ROOM TABS SWITCHER
           ===================================================================== */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
          {ROOM_SETTINGS.map((room) => {
            const isSelected = room.id === currentRoom.id;
            return (
              <button
                key={room.id}
                type="button"
                data-testid={room.testId}
                onClick={() => handleRoomSelect(room.id)}
                aria-pressed={isSelected}
                className={cn(
                  "shrink-0 snap-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer flex items-center gap-2 whitespace-nowrap",
                  isSelected
                    ? "bg-[#6B1C23] text-[#F4F1EA] border-[#6B1C23] shadow-md"
                    : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] border-[var(--color-border-subtle)] hover:bg-[var(--color-canvas-subtle)] hover:text-[var(--color-ink-primary)]"
                )}
              >
                <span>{room.name}</span>
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isSelected ? "bg-[#C5A059]" : "bg-[#9E9E9E]/50"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Room Description Strip */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)]">
            {currentRoom.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] mt-1 font-normal">
            {currentRoom.description}
          </p>
        </div>

        {/* =====================================================================
            THE LOOKBOOK ROOM STAGE WITH INTERACTIVE HOTSPOT PINS
           ===================================================================== */}
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)] shadow-xl">
          {/* Room Ambient Background */}
          <div
            className={cn(
              "relative w-full h-[420px] sm:h-[560px] md:h-[620px] overflow-hidden select-none flex items-center justify-center transition-colors duration-500",
              `bg-gradient-to-b ${currentRoom.wallTexture}`
            )}
          >
            {/* Architectural Room Perspective Elements (SVG Interior Scene) */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Ceiling Crown Molding Shadow */}
              <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/40 to-transparent" />

              {/* Hardwood Flooring & Baseboard */}
              <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#4A3222] via-[#3D281A] to-[#2D1B11] border-t-8 border-[#2A180E] shadow-2xl">
                {/* Wood floor plank lines */}
                <div className="w-full h-full opacity-30 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_1px,transparent_2px)] [background-size:60px_100%]" />
              </div>

              {/* Room Lighting Overhead Cast */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-radial from-white/15 via-white/5 to-transparent blur-2xl" />

              {/* Render Room Specific Furniture Silhouettes */}
              {currentRoom.id === "living-room" && (
                <div className="absolute bottom-12 inset-x-6 sm:inset-x-28 h-24 sm:h-36 bg-gradient-to-t from-[#1F2922] to-[#2B3B30] rounded-t-3xl border-t border-[#3D5244] shadow-2xl flex items-center justify-around px-4 sm:px-8">
                  {/* Velvet sofa cushions accent */}
                  <div className="w-16 sm:w-28 h-10 sm:h-12 rounded-xl bg-[#233128] border border-[#3D5244]/50 shadow-inner" />
                  <div className="w-20 sm:w-36 h-12 sm:h-14 rounded-xl bg-[#26352C] border border-[#3D5244]/50 shadow-inner" />
                  <div className="w-16 sm:w-28 h-10 sm:h-12 rounded-xl bg-[#233128] border border-[#3D5244]/50 shadow-inner" />
                </div>
              )}

              {currentRoom.id === "dining-credenza" && (
                <div className="absolute bottom-10 inset-x-8 sm:inset-x-32 h-20 sm:h-28 bg-[#5A3825] rounded-t-lg border-t-4 border-[#7A4D33] shadow-2xl flex items-end justify-between px-6 sm:px-10 pb-2">
                  <div className="w-8 sm:w-10 h-12 sm:h-16 rounded-t-full bg-[#E5D7C3] opacity-90 shadow-md" />
                  <div className="w-10 sm:w-14 h-10 sm:h-12 rounded-lg bg-[#3C2418] shadow-inner" />
                  <div className="w-7 sm:w-8 h-16 sm:h-20 rounded-t-lg bg-[#B39B82] opacity-80 shadow-md" />
                </div>
              )}

              {currentRoom.id === "minimalist-bedside" && (
                <div className="absolute bottom-8 left-6 sm:left-24 w-28 sm:w-48 h-20 sm:h-28 bg-[#C8BCAB] rounded-t-md border-t-2 border-[#DFD6C7] shadow-xl flex items-center justify-center">
                  <div className="w-8 sm:w-10 h-10 sm:h-14 rounded-t-sm bg-[#5C4D3C] shadow-sm" />
                </div>
              )}
            </div>

            {/* =================================================================
                FRAMED ARTWORKS IN-SITU ON THE WALL
               ================================================================= */}
            {/* Artwork 1 */}
            <div
              style={{
                left: `${currentRoom.hotspots[0]?.x ?? 30}%`,
                top: `${currentRoom.hotspots[0]?.y ?? 30}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="w-24 h-32 sm:w-44 sm:h-56 bg-[#FAF7F2] rounded-xs border-4 sm:border-8 border-[#3A2417] shadow-[0_20px_40px_rgba(0,0,0,0.55)] p-2 sm:p-4 flex flex-col items-center justify-between">
                <div className="w-full h-full bg-[#EDE5D8] rounded-xs p-1.5 sm:p-3 flex items-center justify-center border border-[#D5C8B5]">
                  <div className="w-12 h-16 sm:w-24 sm:h-32 bg-[#2D3F33] rounded-xs flex items-center justify-center text-[8px] sm:text-[10px] text-white/80 font-serif italic text-center p-0.5 sm:p-1">
                    {currentRoom.hotspots[0]?.artTitle || "Art Piece"}
                  </div>
                </div>
              </div>
            </div>

            {/* Artwork 2 */}
            {currentRoom.hotspots[1] && (
              <div
                style={{
                  left: `${currentRoom.hotspots[1].x}%`,
                  top: `${currentRoom.hotspots[1].y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="w-20 h-28 sm:w-36 sm:h-48 bg-[#FAF7F2] rounded-xs border-4 sm:border-6 border-[#C5A059] shadow-[0_18px_36px_rgba(0,0,0,0.5)] p-1.5 sm:p-3 flex flex-col items-center justify-between">
                  <div className="w-full h-full bg-[#FAF5EE] rounded-xs p-1 sm:p-2 flex items-center justify-center border border-[#D5C8B5]">
                    <div className="w-10 h-14 sm:w-20 sm:h-26 bg-[#7C3F2A] rounded-xs flex items-center justify-center text-[8px] sm:text-[9px] text-white/90 font-serif italic text-center p-0.5 sm:p-1">
                      {currentRoom.hotspots[1].artTitle}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Artwork 3 (if present in room) */}
            {currentRoom.hotspots[2] && (
              <div
                style={{
                  left: `${currentRoom.hotspots[2].x}%`,
                  top: `${currentRoom.hotspots[2].y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="w-18 h-22 sm:w-32 sm:h-40 bg-[#FAF7F2] rounded-xs border-2 sm:border-4 border-[#D9C4A6] shadow-[0_16px_32px_rgba(0,0,0,0.45)] p-1 sm:p-2.5 flex flex-col items-center justify-between">
                  <div className="w-full h-full bg-[#FFFFFF] rounded-xs p-1 sm:p-1.5 flex items-center justify-center border border-[#E5DACB]">
                    <div className="w-9 h-11 sm:w-16 sm:h-20 bg-[#1E293B] rounded-xs flex items-center justify-center text-[7px] sm:text-[8px] text-white/80 font-serif italic text-center p-0.5 sm:p-1">
                      {currentRoom.hotspots[2].artTitle}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================
                INTERACTIVE HOTSPOT PINS
               ================================================================= */}
            {currentRoom.hotspots.map((pin) => {
              const isActive = activePinId === pin.id;

              return (
                <div
                  key={pin.id}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Pulsing Outer Ring */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute -inset-2 rounded-full transition-all duration-300 pointer-events-none",
                      isActive
                        ? "bg-[#C5A059]/40 animate-ping"
                        : "bg-white/20 group-hover:bg-[#C5A059]/30"
                    )}
                  />

                  {/* Hotspot Button */}
                  <button
                    type="button"
                    data-testid={`lookbook-hotspot-pin-${pin.id}`}
                    aria-label={`View details for ${pin.frameTitle}`}
                    aria-expanded={isActive}
                    onClick={() => setActivePinId(isActive ? null : pin.id)}
                    className={cn(
                      "relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A059]",
                      isActive
                        ? "bg-[#C5A059] text-[#1A1A1A] scale-110 border-2 border-white ring-4 ring-[#C5A059]/50"
                        : "bg-[#1A1A1A]/90 text-[#F4F1EA] hover:bg-[#C5A059] border border-[#C5A059] hover:scale-105"
                    )}
                  >
                    <Eye className="w-4 h-4 text-current" />
                    <span className="sr-only">Toggle {pin.frameTitle} card</span>
                  </button>
                </div>
              );
            })}

            {/* =================================================================
                FLOATING CARD (ANCHORED POPOVER OVER ACTIVE HOTSPOT)
               ================================================================= */}
            {activeHotspot && (
              <div
                data-testid={`lookbook-card-${activeHotspot.id}`}
                style={
                  {
                    "--pin-x": `${Math.min(78, Math.max(22, activeHotspot.x))}%`,
                    "--pin-y": `${Math.min(65, Math.max(25, activeHotspot.y + 14))}%`,
                  } as React.CSSProperties
                }
                className="absolute z-40 inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-auto sm:left-[var(--pin-x)] sm:top-[var(--pin-y)] sm:-translate-x-1/2 w-auto sm:w-[320px] max-w-none sm:max-w-[90vw] bg-[var(--color-canvas-surface)] rounded-2xl p-3.5 sm:p-5 shadow-2xl border border-[var(--color-border-subtle)] transition-all duration-300 animate-in fade-in zoom-in-95 text-[var(--color-ink-primary)]"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActivePinId(null)}
                  className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] transition-colors cursor-pointer"
                  aria-label="Close card"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Customer & Verified Badge Row */}
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 pr-6">
                  <div
                    data-testid={`lookbook-buyer-badge-${activeHotspot.id}`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-canvas-subtle)] text-[#10B981] text-[10px] font-semibold tracking-wide border border-[#10B981]/30"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                    <span>Verified Collector</span>
                  </div>
                  <div className="flex items-center text-[#C5A059]">
                    {Array.from({ length: activeHotspot.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-[#C5A059]" />
                    ))}
                  </div>
                </div>

                {/* Customer Review Quote */}
                <p className="text-xs italic text-[var(--color-ink-primary)] leading-relaxed mb-2 sm:mb-3 font-serif line-clamp-2 sm:line-clamp-none">
                  {activeHotspot.review}
                </p>

                {/* Reviewer Name and Location */}
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--color-ink-secondary)] mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-[var(--color-border-subtle)]">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  <span className="font-semibold text-[var(--color-ink-primary)]">{activeHotspot.customerName}</span>
                  <span className="text-[var(--color-ink-muted)]">•</span>
                  <span>{activeHotspot.location}</span>
                </div>

                {/* Frame Title & Specs */}
                <div className="mb-2 sm:mb-3">
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-[var(--color-ink-primary)]">
                    {activeHotspot.frameTitle}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[var(--color-ink-muted)] mt-0.5 truncate sm:whitespace-normal">{activeHotspot.specs}</p>
                </div>

                {/* Price and Action Button */}
                <div className="flex items-center justify-between gap-3 pt-0.5 sm:pt-1">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[var(--color-ink-muted)] uppercase tracking-wider block">
                      From
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-[var(--color-accent-gold)]">
                      {activeHotspot.price}
                    </span>
                  </div>

                  <Link
                    href={activeHotspot.shopUrl}
                    data-testid={`lookbook-shop-link-${activeHotspot.id}`}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[var(--color-accent-gold)] hover:bg-[#B38F48] text-[var(--background)] text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Shop Frame</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Lookbook Stage Footer Toolbar */}
          <div className="bg-[var(--color-canvas-subtle)] px-4 sm:px-6 py-3 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--color-ink-secondary)]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-medium text-[var(--color-ink-primary)]">
                Interactive Hotspots Active:
              </span>
              <span>
                {currentRoom.hotspots.length} custom frame profiles tagged in this setting
              </span>
            </div>
            <div className="text-[11px] text-[#C5A059] flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Tap pins on the artwork to inspect joinery & finishes</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            FEATURED IN THIS ROOM (DIRECT ACCESS CARDS)
           ===================================================================== */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRoom.hotspots.map((pin) => {
            const isCardActive = activePinId === pin.id;

            return (
              <div
                key={pin.id}
                onClick={() => setActivePinId(pin.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between",
                  isCardActive
                    ? "bg-[var(--color-canvas-surface)] border-[var(--color-accent-gold)] shadow-md ring-1 ring-[var(--color-accent-gold)]"
                    : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-[var(--color-accent-gold)]/60 text-[var(--color-ink-primary)]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-accent-gold)]">
                      {pin.frameStyle.replace("-", " ")}
                    </span>
                    <span className="font-serif font-bold text-sm text-[var(--color-accent-gold)]">
                      {pin.price}
                    </span>
                  </div>
                  <h5 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)] mb-1">
                    {pin.frameTitle}
                  </h5>
                  <p className="text-xs text-[var(--color-ink-secondary)] line-clamp-2 italic font-normal">
                    {pin.review}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
                  <span className="text-[var(--color-ink-muted)] text-[11px]">
                    {pin.customerName} • {pin.location}
                  </span>
                  <Link
                    href={pin.shopUrl}
                    className="text-[var(--color-accent-gold)] font-semibold hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    Shop <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}