/**
 * Visual SVG category swatches for India Circus-inspired discovery pills.
 * Accurately represents solid woodgrain, metallic brushing, gilded gold leaf,
 * gallery wall triptych, easel desk frames, and deep dimensional shadowboxes.
 */

export function CategorySwatch({ id }: { id: string }) {
  switch (id) {
    case "solid-hardwoods":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="walnutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C5338" />
              <stop offset="40%" stopColor="#5E3D27" />
              <stop offset="75%" stopColor="#462C1B" />
              <stop offset="100%" stopColor="#2E1B0E" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#walnutGrad)" />
          {/* Natural woodgrain curvature */}
          <path
            d="M-10,25 Q40,40 110,20"
            fill="none"
            stroke="rgba(235,200,165,0.22)"
            strokeWidth="2.5"
          />
          <path
            d="M-10,45 Q45,60 110,38"
            fill="none"
            stroke="rgba(30,15,5,0.45)"
            strokeWidth="3"
          />
          <path
            d="M-10,65 Q50,75 110,55"
            fill="none"
            stroke="rgba(235,200,165,0.18)"
            strokeWidth="2"
          />
          <path
            d="M-10,82 Q45,95 110,75"
            fill="none"
            stroke="rgba(30,15,5,0.4)"
            strokeWidth="2.5"
          />
          {/* Miniature timber frame profile */}
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            rx="3"
            fill="none"
            stroke="#FAF7F2"
            strokeWidth="2.5"
          />
          <rect
            x="32"
            y="32"
            width="36"
            height="36"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />
        </svg>
      );
    case "brushed-metals":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DE9F" />
              <stop offset="30%" stopColor="#D6B26A" />
              <stop offset="65%" stopColor="#AD8739" />
              <stop offset="100%" stopColor="#6E5018" />
            </linearGradient>
            <linearGradient id="sheenGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="40%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.7)" />
              <stop offset="60%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#brassGrad)" />
          {/* Subtle horizontal brushing texture */}
          <path
            d="M10,25 H90 M15,35 H85 M5,45 H95 M8,55 H92 M12,65 H88 M18,75 H82"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <circle cx="50" cy="50" r="50" fill="url(#sheenGrad)" />
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            rx="3"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <rect
            x="32"
            y="32"
            width="36"
            height="36"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
          />
        </svg>
      );
    case "vintage-gilded":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1C5" />
              <stop offset="30%" stopColor="#E3C36A" />
              <stop offset="65%" stopColor="#C29B35" />
              <stop offset="100%" stopColor="#755410" />
            </linearGradient>
            <radialGradient id="goldCenter" cx="35%" cy="35%" r="60%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.75)" />
              <stop offset="40%" stopColor="rgba(255, 235, 170, 0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#goldGrad)" />
          <circle cx="50" cy="50" r="50" fill="url(#goldCenter)" />
          {/* Gold leaf bevel flourishes */}
          <rect
            x="22"
            y="22"
            width="56"
            height="56"
            rx="3"
            fill="none"
            stroke="#FDECB2"
            strokeWidth="3"
          />
          <rect
            x="28"
            y="28"
            width="44"
            height="44"
            rx="2"
            fill="none"
            stroke="#5E4311"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="50" r="9" fill="none" stroke="#FFF1C5" strokeWidth="1" />
        </svg>
      );
    case "gallery-wall-sets":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="50" fill="#EAE3D6" />
          {/* Miniature triptych layout */}
          <g transform="translate(18, 27)">
            <rect x="0" y="0" width="18" height="46" rx="2" fill="#3A3734" />
            <rect x="2" y="2" width="14" height="42" rx="1" fill="#FAF7F2" />
            <rect x="4" y="8" width="10" height="28" fill="#B45309" opacity="0.7" />
          </g>
          <g transform="translate(41, 22)">
            <rect x="0" y="0" width="18" height="56" rx="2" fill="#7C5338" />
            <rect x="2" y="2" width="14" height="52" rx="1" fill="#FAF7F2" />
            <rect x="4" y="9" width="10" height="36" fill="#C5A059" opacity="0.85" />
          </g>
          <g transform="translate(64, 27)">
            <rect x="0" y="0" width="18" height="46" rx="2" fill="#3A3734" />
            <rect x="2" y="2" width="14" height="42" rx="1" fill="#FAF7F2" />
            <rect x="4" y="8" width="10" height="28" fill="#B45309" opacity="0.7" />
          </g>
        </svg>
      );
    case "tabletop-minis":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="50" fill="#F4EDE2" />
          <ellipse cx="50" cy="74" rx="30" ry="4" fill="rgba(60, 40, 20, 0.16)" />
          {/* Easel stand back */}
          <polygon points="56,36 68,69 61,70 51,36" fill="#462C1B" opacity="0.65" />
          {/* Desk frame */}
          <g transform="translate(26, 21)">
            <rect x="0" y="0" width="44" height="52" rx="3" fill="#6B4931" />
            <rect x="3" y="3" width="38" height="46" rx="2" fill="#FFFFFF" />
            <rect x="7" y="7" width="30" height="36" fill="#F3ECE2" />
            <circle cx="22" cy="22" r="7" fill="#C5A059" opacity="0.7" />
            <path d="M11,38 C16,29 28,29 33,38 Z" fill="#B45309" opacity="0.5" />
          </g>
        </svg>
      );
    case "archival-shadowboxes":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover select-none"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="50" fill="#24211E" />
          {/* Deep dimensional shadowbox walls */}
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="3"
            fill="#1A1816"
            stroke="#48433E"
            strokeWidth="2"
          />
          <polygon points="20,20 80,20 72,28 28,28" fill="#12100E" />
          <polygon points="20,80 80,80 72,72 28,72" fill="#3D3833" />
          <polygon points="20,20 20,80 28,72 28,28" fill="#1A1715" />
          <polygon points="80,20 80,80 72,72 72,28" fill="#2E2A26" />
          <rect x="28" y="28" width="44" height="44" fill="#FAF7F2" />
          <rect x="38" y="38" width="24" height="24" rx="2" fill="#B45309" opacity="0.9" />
          <rect x="40" y="40" width="24" height="24" rx="2" fill="#000000" opacity="0.25" />
        </svg>
      );
    default:
      return null;
  }
}
