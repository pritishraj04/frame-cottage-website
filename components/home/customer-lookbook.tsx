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
  UploadCloud,
  ImageIcon,
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
    name: "Tech Enterprise Headquarters",
    subtitle: "Spatial Signage & Architectural Wayfinding • Silicon Valley, CA",
    description:
      "Complete environmental branding and multi-floor wayfinding system featuring brushed aluminum directional pylons, illuminated 3D LED signage, and custom CNC perforated partition screens.",
    wallColor: "#1E2530", // Sleek architectural slate
    wallTexture: "from-[#171D26] via-[#1E2530] to-[#141921]",
    hotspots: [
      {
        id: "salon-walnut-large",
        x: 32,
        y: 30,
        frameTitle: "The Heritage Black Walnut (16×20″)",
        frameStyle: "heritage-walnut",
        specs: "Solid Appalachian Walnut • 4-Ply Cotton Mat",
        artTitle: "Executive Boardroom Archival Art Suite",
        price: "₹185",
        rating: 5,
        review:
          "The mortise corner splines and museum TruVue glass make our board suite art collection look like an auction showcase. Absolutely zero glare.",
        customerName: "Camilla V., VP Enterprise Spaces",
        location: "Silicon Valley, CA",
        verified: true,
        shopUrl: "/services/bespoke-framing",
      },
      {
        id: "salon-brass-portrait",
        x: 68,
        y: 26,
        frameTitle: "Atelier Gilded Brass Leaf (11×14″)",
        frameStyle: "gilded-brass",
        specs: "Architectural Aluminum & 3D Illuminated LED",
        artTitle: "Illuminated Spatial Signage & Monolith Pylon",
        price: "Turnkey RFP",
        rating: 5,
        review:
          "The illuminated directional totems and perforated metal screens transformed our 400,000 sq. ft. campus into an intuitive, branded architectural environment.",
        customerName: "Marcus T., Design Director",
        location: "San Jose, CA",
        verified: true,
        shopUrl: "/services/spatial-signage",
      },
      {
        id: "salon-oak-mini",
        x: 50,
        y: 56,
        frameTitle: "Gallery White Oak Slim (8×10″)",
        frameStyle: "gallery-white-oak",
        specs: "Precision CNC Routing & Tactile Braille • ADA Compliant",
        artTitle: "Architectural Room Identification System",
        price: "₹98",
        rating: 5,
        review:
          "Delivered 250+ custom ADA compliant door markers on time and under budget. The wood-and-metal craftsmanship is unmatched.",
        customerName: "Elena S., Lead Architect",
        location: "Palo Alto, CA",
        verified: true,
        shopUrl: "/services/industrial-cnc",
      },
    ],
  },
  {
    id: "dining-credenza",
    testId: "lookbook-room-tab-dining-credenza",
    name: "Contemporary Collector Residence",
    subtitle: "Bespoke Fine Art & Archival Framing • Tribeca, New York",
    description:
      "Museum-grade framing curation for an expansive private collection, featuring American Black Walnut shadowboxes, 22k gilded leaf profiles, and TruVue® conservation acrylic.",
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
        price: "₹210",
        rating: 5,
        review:
          "Floating the original gouache painting leaves the deckled edges visible in 3D relief. The construction quality is superior to custom brick-and-mortar shops.",
        customerName: "Julian D., Art Collector",
        location: "Tribeca, NY",
        verified: true,
        shopUrl: "/services/bespoke-framing",
      },
      {
        id: "credenza-natural-oak",
        x: 65,
        y: 46,
        frameTitle: "Natural White Oak Gallery (12×16″)",
        frameStyle: "natural-white-oak",
        specs: "FSC® Appalachian Oak • Warm Off-White Mat",
        artTitle: "Modernist Minimalist Line Drawing",
        price: "₹135",
        rating: 5,
        review:
          "Leaning frames on the dining sideboard brings relaxed warmth to the dining space. Clean grain patterns and solid weight.",
        customerName: "Sophia M.",
        location: "Tribeca, NY",
        verified: true,
        shopUrl: "/services/bespoke-framing",
      },
    ],
  },
  {
    id: "minimalist-bedside",
    testId: "lookbook-room-tab-minimalist-bedside",
    name: "Municipal City Hall & Civic Plaza",
    subtitle: "Civic Monument & Government Installation • Metro Civic Center",
    description:
      "Public sector tender execution including heavy cast-brass commemorative plaques, vandal-resistant civic wayfinding monoliths, and archival council chamber portraits.",
    wallColor: "#2A313A", // Dignified municipal limestone slate
    wallTexture: "from-[#222830] via-[#2A313A] to-[#1C2128]",
    hotspots: [
      {
        id: "bedside-bleached-maple",
        x: 44,
        y: 34,
        frameTitle: "Atelier Bleached Maple (14×18″)",
        frameStyle: "bleached-maple",
        specs: "Heavy Cast C260 Brass • GeM Registered & Tender Compliant",
        artTitle: "Centennial Municipal Dedication Plaque",
        price: "Tender Contract",
        rating: 5,
        review:
          "A monumental installation executed under strict municipal tender deadlines. The deep chemical relief etch and vandal-resistant clear coat have held up impeccably.",
        customerName: "Kenji T., Civic Project Director",
        location: "Metro Civic Plaza",
        verified: true,
        shopUrl: "/services/civic-projects",
      },
      {
        id: "bedside-deep-walnut",
        x: 74,
        y: 52,
        frameTitle: "Mid-Century Walnut Shadowbox (8×10″)",
        frameStyle: "heritage-walnut",
        specs: "Solid Black Walnut • 1.5″ Deep Shadowbox",
        artTitle: "Council Chamber Archival Mayoral Portrait",
        price: "₹115",
        rating: 5,
        review:
          "Every historic charter and official mayoral portrait was preserved using 100% reversible museum encapsulation and TruVue optical acrylic.",
        customerName: "Archivist Chloe W.",
        location: "City Hall Archives",
        verified: true,
        shopUrl: "/services/civic-projects",
      },
    ],
  },
];

export function CustomerLookbook() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("living-room");
  const [activePinId, setActivePinId] = useState<string | null>("salon-walnut-large");

  const currentRoom =
    ROOM_SETTINGS.find((room) => room.id === selectedRoomId) || ROOM_SETTINGS[0];

  const activeHotspot = activePinId
    ? currentRoom.hotspots.find((pin) => pin.id === activePinId) || null
    : null;

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
      className="w-full bg-[var(--background)] py-16 sm:py-24 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            EDITORIAL SECTION HEADER WITH PNG SPATIAL BADGES
           ===================================================================== */}
        <div
          data-testid="lookbook-header"
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] text-xs font-mono font-medium uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span>Living with Craft • Real Homes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            Customer Homes & Gallery Wall Lookbook
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed font-normal max-w-2xl mx-auto">
            Step inside real collector spaces and curated sanctuaries. Tap the interactive brass pins to discover the frame profiles, archival mats, and customer reviews.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)] text-[11px] font-mono text-[var(--color-ink-muted)] bg-[var(--color-canvas-base)]/40">
            16:9 Full-Bleed Spatial Scene • PNG Asset Zone
          </div>
        </div>

        {/* =====================================================================
            ROOM TABS SWITCHER
           ===================================================================== */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
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
                  "shrink-0 snap-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border-2 cursor-pointer flex items-center gap-2 whitespace-nowrap",
                  isSelected
                    ? "bg-accent text-[var(--color-accent-contrast)] border-accent shadow-md"
                    : "bg-[var(--color-canvas-surface)] text-[var(--color-ink-muted)] border-dashed border-[var(--color-border-strong)]/60 hover:bg-[var(--color-canvas-subtle)] hover:text-accent hover:border-accent/60"
                )}
              >
                <span>{room.name}</span>
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isSelected ? "bg-[var(--color-accent-contrast)]" : "bg-[#9E9E9E]/50"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Room Description Strip */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {currentRoom.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] mt-1 font-normal">
            {currentRoom.description}
          </p>
        </div>

        {/* =====================================================================
            THE LOOKBOOK ROOM STAGE: FULL-BLEED ARCHITECTURAL SCENE PNG DROP ZONE
           ===================================================================== */}
        <div className="relative w-full rounded-3xl overflow-hidden border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)] shadow-xl hover:border-[var(--color-accent-gold)]/60 transition-colors">
          <div
            data-testid="lookbook-scene-dropzone"
            onClick={(e) => {
              // Only close if clicking the dropzone container itself, not pins or card
              if (e.target === e.currentTarget) {
                setActivePinId(null);
              }
            }}
            className="relative w-full aspect-[16/9] min-h-[460px] sm:min-h-[520px] border-4 border-dashed border-[var(--color-border-strong)]/70 rounded-2xl bg-[var(--color-canvas-subtle)]/60 flex flex-col items-center justify-center text-center p-6 sm:p-10 overflow-hidden hover:border-[var(--color-accent-gold)] transition-colors duration-300 shadow-inner"
          >
            {/* Architectural Grid Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(var(--color-ink-primary)_1px,transparent_1px)] [background-size:24px_24px]"
            />

            {/* Spatial Canvas Top Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-[var(--color-canvas-surface)]/90 text-[var(--color-accent-gold)] border border-dashed border-[var(--color-border-strong)] shadow-xs backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                {currentRoom.name}
              </span>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)]/90 text-[var(--color-ink-muted)] backdrop-blur-md">
              16:9 • 1920×1080 Archival Scene
            </div>

            {/* Center Drop Zone Focus */}
            <div className="flex flex-col items-center justify-center my-auto z-10 space-y-3 max-w-lg pointer-events-none">
              <div className="w-18 h-18 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-md group-hover:scale-105 group-hover:border-[var(--color-accent-gold)] transition-all duration-300">
                <UploadCloud className="w-9 h-9 stroke-[1.5]" />
              </div>

              <h3 className="font-mono text-base sm:text-xl font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">
                Architectural Interior Scene PNG Drop Zone (16:9 • 1920×1080)
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed max-w-md font-sans">
                Designer to place full-bleed interior / gallery installation PNG render here ({currentRoom.subtitle}).
              </p>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/80 text-[11px] font-mono text-[var(--color-ink-secondary)] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
                <span>Dimensions: 1920×1080 • Aspect Ratio: 16:9 • Ultra HD Archival Scene</span>
              </div>
            </div>

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
                        ? "bg-accent/40 animate-ping"
                        : "bg-white/20 group-hover:bg-accent/30"
                    )}
                  />

                  {/* Hotspot Button */}
                  <button
                    type="button"
                    data-testid={`lookbook-hotspot-pin-${pin.id}`}
                    aria-label={`View details for ${pin.frameTitle}`}
                    aria-expanded={isActive}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePinId(isActive ? null : pin.id);
                    }}
                    className={cn(
                      "relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent",
                      isActive
                        ? "bg-accent text-[var(--color-accent-contrast)] scale-110 border-2 border-[var(--color-accent-contrast)] ring-4 ring-accent/50"
                        : "bg-[#1A1A1A]/90 text-[#F4F1EA] hover:bg-accent hover:text-[var(--color-accent-contrast)] border border-accent hover:scale-105"
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
            {activeHotspot && (() => {
              const isLowerHalf = activeHotspot.y > 42;
              const clampedX = Math.min(74, Math.max(26, activeHotspot.x));

              return (
                <div
                  data-testid={`lookbook-card-${activeHotspot.id}`}
                  onClick={(e) => e.stopPropagation()}
                  style={
                    {
                      "--pin-x": `${clampedX}%`,
                      "--pin-y": isLowerHalf ? "auto" : `calc(${activeHotspot.y}% + 16px)`,
                      "--pin-bottom": isLowerHalf ? `calc(${100 - activeHotspot.y}% + 16px)` : "auto",
                    } as React.CSSProperties
                  }
                  className="absolute z-40 inset-x-2.5 bottom-2.5 sm:inset-x-auto sm:-translate-x-1/2 sm:left-[var(--pin-x)] sm:top-[var(--pin-y)] sm:bottom-[var(--pin-bottom)] w-auto sm:w-[320px] max-w-none sm:max-w-[90vw] max-h-[170px] sm:max-h-[calc(100%-24px)] overflow-y-auto bg-[var(--color-canvas-surface)] rounded-2xl p-3.5 sm:p-5 shadow-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 hover:border-accent/60 transition-all duration-300 animate-in fade-in zoom-in-95 text-[var(--color-ink-primary)]"
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePinId(null);
                    }}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-canvas-subtle)] transition-colors cursor-pointer"
                    aria-label="Close card"
                    data-testid={`lookbook-card-close-${activeHotspot.id}`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Customer & Verified Badge Row */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 pr-6 flex-wrap">
                    <div
                      data-testid={`lookbook-buyer-badge-${activeHotspot.id}`}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-canvas-subtle)] text-[#10B981] text-[10px] font-semibold tracking-wide border border-[#10B981]/30 shrink-0"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      <span>Verified Collector</span>
                    </div>
                    <div className="flex items-center text-[#C5A059] shrink-0">
                      {Array.from({ length: activeHotspot.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current text-[#C5A059]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[var(--color-ink-secondary)] font-medium truncate sm:hidden">
                      • {activeHotspot.customerName}
                    </span>
                  </div>

                  {/* Customer Review Quote */}
                  <p className="text-xs italic text-[var(--color-ink-primary)] leading-snug mb-1.5 sm:mb-3 font-serif line-clamp-1 sm:line-clamp-none">
                    {activeHotspot.review}
                  </p>

                  {/* Reviewer Name and Location (Desktop) */}
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--color-ink-secondary)] mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-[var(--color-border-subtle)]">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    <span className="font-semibold text-[var(--color-ink-primary)]">{activeHotspot.customerName}</span>
                    <span className="text-[var(--color-ink-muted)]">•</span>
                    <span>{activeHotspot.location}</span>
                  </div>

                  {/* Frame Title & Specs */}
                  <div className="mb-2 sm:mb-3">
                    <h4 className="font-serif text-xs sm:text-sm font-semibold text-[var(--color-ink-primary)] truncate sm:whitespace-normal">
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
                      <span className="font-sans text-sm sm:text-base font-bold text-accent">
                        {activeHotspot.price}
                      </span>
                    </div>

                    <Link
                      href={activeHotspot.shopUrl}
                      data-testid={`lookbook-shop-link-${activeHotspot.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] text-[11px] sm:text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Shop Frame</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })()}
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
            <div className="text-[11px] text-accent flex items-center gap-1">
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
                    ? "bg-[var(--color-canvas-surface)] border-accent shadow-md ring-1 ring-accent"
                    : "bg-[var(--color-canvas-surface)] border-[var(--color-border-subtle)] hover:border-accent/60 text-[var(--color-ink-primary)]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
                      {pin.frameStyle.replace("-", " ")}
                    </span>
                    <span className="font-sans font-bold text-sm text-accent">
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
                    className="text-accent font-semibold hover:underline inline-flex items-center gap-1 text-[11px]"
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