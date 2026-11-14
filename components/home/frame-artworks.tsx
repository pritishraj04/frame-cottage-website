import { CuratedFrameProduct } from "@/lib/constants/collections";

interface FrameArtworkProps {
  type: CuratedFrameProduct["artworkType"];
  className?: string;
}

export function FrameArtwork({ type, className = "w-full h-full" }: FrameArtworkProps) {
  switch (type) {
    case "botanical":
      return (
        <div className={`relative flex flex-col justify-between items-center p-3 text-center bg-[#FAF6EE] select-none ${className}`}>
          {/* Subtle archival paper texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#9B836A_0.75px,transparent_0.75px)] [background-size:10px_10px]"
          />
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Atelier Herbarium • No. 04
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#C5A059]/50" />
          </div>
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-20 h-24 text-[#3C4A3E]" fill="none">
              <path d="M50 120 C 50 95, 52 65, 48 30" stroke="#6F563B" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M49 60 C 58 52, 66 44, 74 34" stroke="#6F563B" strokeWidth="1" strokeLinecap="round" />
              <path d="M50 80 C 38 72, 32 64, 24 54" stroke="#6F563B" strokeWidth="1" strokeLinecap="round" />
              <path d="M48 30 C 35 24, 24 14, 30 5 C 38 -3, 49 5, 49 16 C 50 5, 62 -3, 68 5 C 74 14, 62 24, 48 30 Z" fill="#4E6050" stroke="#374539" strokeWidth="0.8" />
              <path d="M24 54 C 14 50, 6 42, 10 33 C 16 24, 24 31, 25 39 C 26 31, 35 24, 40 32 C 45 41, 34 50, 24 54 Z" fill="#6A806C" stroke="#48584A" strokeWidth="0.8" />
              <path d="M74 34 C 84 30, 92 22, 88 13 C 82 4, 73 11, 72 20 C 71 11, 62 4, 57 13 C 53 22, 63 30, 74 34 Z" fill="#586C5A" stroke="#3E4E40" strokeWidth="0.8" />
              <circle cx="48" cy="28" r="2" fill="#B45309" />
              <circle cx="74" cy="32" r="1.5" fill="#C5A059" />
              <circle cx="24" cy="52" r="1.5" fill="#B45309" />
            </svg>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Ginkgo biloba L.</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">310gsm Cotton Rag</p>
          </div>
        </div>
      );

    case "architectural":
      return (
        <div className={`relative flex flex-col justify-between items-center p-3 text-center bg-[#FAF7F0] select-none ${className}`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#8E7F70_0.75px,transparent_0.75px)] [background-size:10px_10px]"
          />
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Roma Antiqua • Colonnade
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#C5A059]/50" />
          </div>
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-20 h-24" fill="none">
              {/* Classical Archway Engraving */}
              <rect x="25" y="45" width="50" height="70" stroke="#3D352E" strokeWidth="1.2" />
              <path d="M25 45 C 25 25, 75 25, 75 45" stroke="#3D352E" strokeWidth="1.2" fill="none" />
              <rect x="33" y="52" width="34" height="63" stroke="#5C5046" strokeWidth="0.8" strokeDasharray="2 1" />
              <path d="M33 52 C 33 35, 67 35, 67 52" stroke="#5C5046" strokeWidth="0.8" fill="rgba(197,160,89,0.08)" />
              {/* Columns */}
              <line x1="20" y1="115" x2="80" y2="115" stroke="#3D352E" strokeWidth="1.8" />
              <line x1="28" y1="45" x2="28" y2="115" stroke="#7A6C5F" strokeWidth="0.6" />
              <line x1="72" y1="45" x2="72" y2="115" stroke="#7A6C5F" strokeWidth="0.6" />
              {/* Sunbeam */}
              <path d="M50 35 L 75 115 L 45 115 Z" fill="rgba(245,222,159,0.18)" />
            </svg>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Portico d&apos;Ottavia</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">Burin Etching • 1756</p>
          </div>
        </div>
      );

    case "abstract":
      return (
        <div className={`relative flex flex-col justify-between items-center p-3 text-center bg-[#F8F5EE] select-none ${className}`}>
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Study in Form & Ochre
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#B45309]/40" />
          </div>
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-20 h-24" fill="none">
              {/* Terracotta Organic Arch */}
              <path d="M20 110 V 55 C 20 25, 65 25, 65 55 V 110 Z" fill="#C96E4B" opacity="0.85" />
              {/* Brass Disc */}
              <circle cx="65" cy="45" r="22" fill="#DDB76B" opacity="0.9" />
              {/* Midnight Balance Oval */}
              <ellipse cx="45" cy="90" rx="25" ry="14" fill="#24211E" />
              {/* Fine Balance Line */}
              <line x1="15" y1="95" x2="85" y2="95" stroke="#FAF7F2" strokeWidth="1" strokeDasharray="3 2" />
            </svg>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Equilibrium No. 8</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">Giclée Mineral Pigment</p>
          </div>
        </div>
      );

    case "geometric":
      return (
        <div className={`relative flex flex-col justify-between items-center p-3 text-center bg-[#F5F2EB] select-none ${className}`}>
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Bauhaus Typo-Grafik
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#191614]/30" />
          </div>
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-20 h-24" fill="none">
              <rect x="22" y="25" width="56" height="80" stroke="#191614" strokeWidth="1" />
              <circle cx="50" cy="55" r="22" fill="#191614" />
              <path d="M30 85 C 30 70, 70 70, 70 85 Z" fill="#B45309" />
              <line x1="22" y1="65" x2="78" y2="65" stroke="#FAF7F2" strokeWidth="1" />
              <circle cx="50" cy="55" r="6" fill="#FAF7F2" />
            </svg>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Komposition Dessau</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">Screenprint on Vellum</p>
          </div>
        </div>
      );

    case "sumie":
      return (
        <div className={`relative flex flex-col justify-between items-center p-3 text-center bg-[#FAF8F2] select-none ${className}`}>
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Sumi-e • Kyoto Stalks
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#8F877E]/40" />
          </div>
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-20 h-24" fill="none">
              {/* Bamboo Culm */}
              <path d="M42 120 L 44 85" stroke="#2D332B" strokeWidth="3" strokeLinecap="round" />
              <path d="M45 80 L 47 45" stroke="#2D332B" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M48 40 L 50 15" stroke="#2D332B" strokeWidth="2" strokeLinecap="round" />
              {/* Leaves */}
              <path d="M47 80 C 58 75, 72 78, 80 88 C 72 84, 58 84, 47 80 Z" fill="#3E4A3E" />
              <path d="M46 78 C 35 72, 22 75, 14 85 C 23 80, 36 80, 46 78 Z" fill="#343E34" />
              <path d="M49 42 C 60 36, 75 38, 82 48 C 74 44, 60 44, 49 42 Z" fill="#4B5B4B" />
              {/* Red Artist Seal Stamp */}
              <rect x="74" y="98" width="10" height="10" fill="#B91C1C" rx="1" />
              <text x="76" y="106" fill="#FFFFFF" fontSize="7" fontWeight="bold">和</text>
            </svg>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Take (Bamboo Breeze)</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">Natural Mulberry Paper</p>
          </div>
        </div>
      );

    case "triptych":
      return (
        <div className={`relative flex flex-col justify-between items-center p-2.5 text-center bg-[#FAF6EE] select-none ${className}`}>
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Salon Triptych Studies
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#C5A059]/40" />
          </div>
          {/* 3 mini panels */}
          <div className="relative z-10 my-auto grid grid-cols-3 gap-1.5 w-full px-1">
            <div className="border border-[#D9D1C3] bg-[#FAF8F5] p-1 flex flex-col items-center shadow-2xs">
              <svg viewBox="0 0 30 40" className="w-full h-8" fill="none">
                <circle cx="15" cy="12" r="5" fill="#C5A059" opacity="0.8" />
                <path d="M3 35 L 15 20 L 27 35 Z" fill="#586C5A" />
              </svg>
            </div>
            <div className="border border-[#D9D1C3] bg-[#FAF8F5] p-1 flex flex-col items-center shadow-2xs">
              <svg viewBox="0 0 30 40" className="w-full h-8" fill="none">
                <path d="M5 35 Q 15 15 25 35 Z" fill="#7C5338" />
                <circle cx="15" cy="10" r="3" fill="#B45309" />
              </svg>
            </div>
            <div className="border border-[#D9D1C3] bg-[#FAF8F5] p-1 flex flex-col items-center shadow-2xs">
              <svg viewBox="0 0 30 40" className="w-full h-8" fill="none">
                <line x1="5" y1="35" x2="25" y2="35" stroke="#191614" strokeWidth="1" />
                <path d="M5 30 Q 15 22 25 30" stroke="#3D503F" strokeWidth="1" />
                <circle cx="20" cy="14" r="4" fill="#D6B26A" />
              </svg>
            </div>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Montmartre Suite</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">Three Hand-Numbered Plates</p>
          </div>
        </div>
      );

    case "classical":
      return (
        <div className={`relative flex flex-col justify-between items-center p-3 text-center bg-[#F7F3EA] select-none ${className}`}>
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Galleria Farnese • Vol. II
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#C5A059]/50" />
          </div>
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-20 h-24" fill="none">
              {/* Classical Urn / Amphora */}
              <path
                d="M50 25 C 44 25, 42 30, 42 34 C 35 45, 32 60, 42 80 L 45 95 L 38 98 L 38 102 L 62 102 L 62 98 L 55 95 L 58 80 C 68 60, 65 45, 58 34 C 58 30, 56 25, 50 25 Z"
                fill="#C5A059"
                opacity="0.25"
                stroke="#6B5424"
                strokeWidth="1.2"
              />
              {/* Urn Handles */}
              <path d="M40 45 C 28 50, 30 65, 42 68" stroke="#6B5424" strokeWidth="1" fill="none" />
              <path d="M60 45 C 72 50, 70 65, 58 68" stroke="#6B5424" strokeWidth="1" fill="none" />
              {/* Greek Key Motif Band */}
              <line x1="42" y1="56" x2="58" y2="56" stroke="#6B5424" strokeWidth="0.8" strokeDasharray="2 1" />
            </svg>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Vaso Antico Scanalato</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">Aquatint Copper Engraving</p>
          </div>
        </div>
      );

    case "minimalist":
    default:
      return (
        <div className={`relative flex flex-col justify-between items-center p-3 text-center bg-[#F9F7F2] select-none ${className}`}>
          <div className="relative z-10 w-full pt-0.5">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#8F877E] font-medium">
              Linear Contour • Atelier
            </p>
            <div className="mx-auto my-0.5 w-6 h-[1px] bg-[#C5A059]/40" />
          </div>
          <div className="relative z-10 my-auto flex items-center justify-center">
            <svg viewBox="0 0 100 130" className="w-20 h-24" fill="none">
              {/* Graceful Continuous Line Portrait */}
              <path
                d="M48 25 C 55 24, 62 30, 60 40 C 58 48, 52 50, 52 55 C 52 62, 57 65, 54 75 C 50 85, 42 90, 40 105"
                stroke="#2B2724"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M60 40 C 68 45, 70 55, 66 65 C 64 70, 60 72, 60 80 C 60 92, 68 98, 70 105"
                stroke="#2B2724"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="48" cy="42" r="2.5" fill="#B45309" />
              <path d="M30 65 Q 40 70 48 65" stroke="#C5A059" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="relative z-10 w-full pb-0.5">
            <p className="font-serif italic text-[9px] text-[#191614]">Silenzio (Quiet Study)</p>
            <p className="text-[6.5px] uppercase tracking-[0.15em] text-[#8F877E]">Somerset Velvet 300gsm</p>
          </div>
        </div>
      );
  }
}
