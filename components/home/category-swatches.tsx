/**
 * Visual SVG category swatches for the 6 Core Service Verticals:
 * 1. Retail & Standard Framing
 * 2. Bespoke Art & Custom Framing
 * 3. Spatial Design & Signage
 * 4. Industrial Fabrication & CNC Metalworks
 * 5. Custom Gifting & Mementos
 * 6. Government & Civic Projects
 */

export function CategorySwatch({ id }: { id: string }) {
  switch (id) {
    case "retail-framing":
    case "solid-hardwoods":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="retailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C5338" />
              <stop offset="40%" stopColor="#5E3D27" />
              <stop offset="75%" stopColor="#462C1B" />
              <stop offset="100%" stopColor="#2E1B0E" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#retailGrad)" />
          {/* Woodgrain curvature */}
          <path
            d="M-10,25 Q40,40 110,20"
            fill="none"
            stroke="rgba(235,200,165,0.25)"
            strokeWidth="2.5"
          />
          <path
            d="M-10,50 Q45,65 110,42"
            fill="none"
            stroke="rgba(30,15,5,0.45)"
            strokeWidth="3"
          />
          <path
            d="M-10,75 Q50,85 110,65"
            fill="none"
            stroke="rgba(235,200,165,0.2)"
            strokeWidth="2"
          />
          {/* Ready-made dual frame silhouette */}
          <rect
            x="24"
            y="24"
            width="52"
            height="52"
            rx="4"
            fill="none"
            stroke="#FAF7F2"
            strokeWidth="3"
          />
          <rect
            x="32"
            y="32"
            width="36"
            height="36"
            rx="2"
            fill="#FAF8F5"
            stroke="#C5A059"
            strokeWidth="1"
          />
          <circle cx="50" cy="50" r="8" fill="#C5A059" fillOpacity="0.4" />
        </svg>
      );

    case "bespoke-framing":
    case "brushed-metals":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bespokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B1C23" />
              <stop offset="50%" stopColor="#481217" />
              <stop offset="100%" stopColor="#22070A" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DE9F" />
              <stop offset="50%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#8A6A2A" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#bespokeGrad)" />
          {/* Fine Art Canvas Spline Corner Motif */}
          <rect
            x="22"
            y="22"
            width="56"
            height="56"
            rx="3"
            fill="none"
            stroke="url(#goldAccent)"
            strokeWidth="3.5"
          />
          {/* 45-degree Bevel & Corner Spline Keys */}
          <line x1="22" y1="22" x2="36" y2="36" stroke="#FAF7F2" strokeWidth="1.5" />
          <line x1="78" y1="22" x2="64" y2="36" stroke="#FAF7F2" strokeWidth="1.5" />
          <line x1="22" y1="78" x2="36" y2="64" stroke="#FAF7F2" strokeWidth="1.5" />
          <line x1="78" y1="78" x2="64" y2="64" stroke="#FAF7F2" strokeWidth="1.5" />
          {/* Corner Key Splines */}
          <rect x="25" y="19" width="3" height="8" rx="1" fill="#C5A059" transform="rotate(45 25 19)" />
          {/* Art Giclée Centerpiece */}
          <rect x="36" y="36" width="28" height="28" rx="2" fill="#FAF8F5" />
          <circle cx="50" cy="50" r="7" fill="#6B1C23" fillOpacity="0.8" />
        </svg>
      );

    case "spatial-signage":
    case "vintage-gilded":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="spatialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A384A" />
              <stop offset="50%" stopColor="#1A2433" />
              <stop offset="100%" stopColor="#0F1722" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#spatialGrad)" />
          {/* 3D Wayfinding Directional Grid */}
          <path d="M15,50 H85 M50,15 V85" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
          {/* Architectural Totem Silhouette with LED Halo */}
          <rect
            x="36"
            y="20"
            width="28"
            height="60"
            rx="4"
            fill="#1E2838"
            stroke="#C5A059"
            strokeWidth="2"
          />
          {/* Top Illuminated Bar */}
          <rect x="40" y="25" width="20" height="3" rx="1" fill="#10B981" />
          {/* Arrow Glyph */}
          <path
            d="M50,38 L50,54 M45,43 L50,38 L55,43"
            stroke="#FAF7F2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Level Markers */}
          <rect x="42" y="62" width="16" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
          <rect x="42" y="67" width="12" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
        </svg>
      );

    case "industrial-cnc":
    case "gallery-wall-sets":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cncGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#cncGrad)" />
          {/* Precision Crosshair CNC Coordinate Grid */}
          <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="#C5A059" strokeWidth="1.5" />
          <path d="M50,12 V88 M12,50 H88" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4" />
          {/* CNC Router Toolhead & Perforated Matrix */}
          <circle cx="36" cy="36" r="3" fill="#FAF7F2" />
          <circle cx="64" cy="36" r="3" fill="#FAF7F2" />
          <circle cx="36" cy="64" r="3" fill="#FAF7F2" />
          <circle cx="64" cy="64" r="3" fill="#FAF7F2" />
          <circle cx="50" cy="50" r="4" fill="#EF4444" />
        </svg>
      );

    case "custom-gifting":
    case "tabletop-minis":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="giftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="40%" stopColor="#AA8222" />
              <stop offset="80%" stopColor="#6C4E0B" />
              <stop offset="100%" stopColor="#3D2B03" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#giftGrad)" />
          {/* Executive Crystal & Walnut Award Silhouette */}
          {/* Solid Walnut Plinth */}
          <rect x="25" y="70" width="50" height="12" rx="2" fill="#2E1B0E" stroke="#5E3D27" strokeWidth="1.5" />
          {/* K9 Optical Crystal Trophy Column */}
          <polygon
            points="34,70 42,22 58,22 66,70"
            fill="rgba(255,255,255,0.3)"
            stroke="#FAF7F2"
            strokeWidth="2"
          />
          {/* Facet Refraction Angle */}
          <polygon points="42,22 50,70 58,22" fill="rgba(255,255,255,0.45)" />
          {/* Gilded Star / Seal Emblem */}
          <circle cx="50" cy="42" r="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
        </svg>
      );

    case "civic-projects":
    case "archival-shadowboxes":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="civicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D3748" />
              <stop offset="50%" stopColor="#1A202C" />
              <stop offset="100%" stopColor="#171923" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#civicGrad)" />
          {/* Municipal Archway & Civic Monument Pillars */}
          {/* Monument Plinth Pedestal */}
          <rect x="20" y="72" width="60" height="8" rx="2" fill="#C5A059" />
          {/* Classical / Municipal Columns */}
          <rect x="26" y="38" width="8" height="34" fill="#E2E8F0" />
          <rect x="46" y="38" width="8" height="34" fill="#E2E8F0" />
          <rect x="66" y="38" width="8" height="34" fill="#E2E8F0" />
          {/* Pediment Archway */}
          <polygon points="18,38 50,18 82,38" fill="#C5A059" stroke="#EBD79B" strokeWidth="1" />
          {/* Municipal Seal Roundel */}
          <circle cx="50" cy="30" r="4" fill="#1A202C" stroke="#FAF7F2" strokeWidth="1" />
        </svg>
      );

    default:
      return (
        <div className="w-full h-full bg-[#2A2A2A] rounded-full flex items-center justify-center text-[#C5A059]">
          <span className="font-serif text-sm">FC</span>
        </div>
      );
  }
}
