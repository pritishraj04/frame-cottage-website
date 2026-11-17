"use client";

import React from "react";
import { ArtworkPresetId } from "@/lib/constants/customizer";

interface ArtworkRendererProps {
  artworkType: "preset" | "upload";
  presetId: ArtworkPresetId;
  uploadedImageUrl: string | null;
  uploadedImageName?: string | null;
}

export function CustomizerArtworkRenderer({
  artworkType,
  presetId,
  uploadedImageUrl,
  uploadedImageName,
}: ArtworkRendererProps) {
  if (artworkType === "upload" && uploadedImageUrl) {
    return (
      <div
        data-testid="customizer-artwork-display"
        className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={uploadedImageUrl}
          alt={uploadedImageName || "Uploaded fine art"}
          className="w-full h-full object-contain select-none shadow-xs"
        />
      </div>
    );
  }

  // Preset Artwork SVGs
  switch (presetId) {
    case "colonnade":
      return (
        <div
          data-testid="customizer-artwork-display"
          className="relative w-full h-full flex items-center justify-center p-6 bg-[#F6F1EA] select-none text-[#332A24]"
        >
          <svg
            viewBox="0 0 500 650"
            className="w-full h-full max-h-full max-w-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Archival Grid */}
            <rect width="500" height="650" fill="#FAF6EE" />
            <rect
              x="25"
              y="25"
              width="450"
              height="600"
              stroke="#D8CEBF"
              strokeWidth="0.75"
              strokeDasharray="2 2"
            />
            <rect
              x="35"
              y="35"
              width="430"
              height="580"
              stroke="#8C7A65"
              strokeWidth="1.5"
            />

            {/* Classical Pediment & Entablature */}
            <path
              d="M70 160 L250 100 L430 160 Z"
              stroke="#4A3D31"
              strokeWidth="2.5"
              fill="#F2ECE0"
            />
            <line x1="60" y1="165" x2="440" y2="165" stroke="#4A3D31" strokeWidth="3" />
            <line x1="65" y1="175" x2="435" y2="175" stroke="#4A3D31" strokeWidth="1.5" />

            {/* Frieze & Triglyphs */}
            {Array.from({ length: 9 }).map((_, i) => (
              <rect
                key={i}
                x={80 + i * 40}
                y="180"
                width="20"
                height="22"
                stroke="#6E5D4B"
                strokeWidth="1"
                fill="#ECE4D6"
              />
            ))}
            <line x1="60" y1="205" x2="440" y2="205" stroke="#4A3D31" strokeWidth="2.5" />

            {/* Ionic Columns */}
            {[90, 170, 250, 330, 410].map((x, i) => (
              <g key={i}>
                {/* Capital */}
                <ellipse cx={x - 8} cy="216" rx="6" ry="4" stroke="#4A3D31" strokeWidth="1.5" fill="#FAF6EE" />
                <ellipse cx={x + 8} cy="216" rx="6" ry="4" stroke="#4A3D31" strokeWidth="1.5" fill="#FAF6EE" />
                <line x1={x - 14} y1="218" x2={x + 14} y2="218" stroke="#4A3D31" strokeWidth="2" />
                {/* Shaft Fluting */}
                <line x1={x - 10} y1="220" x2={x - 10} y2="480" stroke="#4A3D31" strokeWidth="1.5" />
                <line x1={x - 4} y1="220" x2={x - 4} y2="480" stroke="#8C7A65" strokeWidth="0.75" />
                <line x1={x} y1="220" x2={x} y2="480" stroke="#8C7A65" strokeWidth="0.75" />
                <line x1={x + 4} y1="220" x2={x + 4} y2="480" stroke="#8C7A65" strokeWidth="0.75" />
                <line x1={x + 10} y1="220" x2={x + 10} y2="480" stroke="#4A3D31" strokeWidth="1.5" />
                {/* Base Plinth */}
                <rect x={x - 14} y="480" width="28" height="12" stroke="#4A3D31" strokeWidth="1.5" fill="#F2ECE0" />
              </g>
            ))}

            {/* Neoclassical Arches behind columns */}
            <path
              d="M100 320 Q130 250 160 320"
              stroke="#B3A28F"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M180 320 Q210 250 240 320"
              stroke="#B3A28F"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M260 320 Q290 250 320 320"
              stroke="#B3A28F"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M340 320 Q370 250 400 320"
              stroke="#B3A28F"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Stylobate Steps */}
            <line x1="50" y1="492" x2="450" y2="492" stroke="#4A3D31" strokeWidth="2.5" />
            <line x1="45" y1="500" x2="455" y2="500" stroke="#4A3D31" strokeWidth="2" />
            <line x1="40" y1="508" x2="460" y2="508" stroke="#4A3D31" strokeWidth="3" />

            {/* Typography & Archival Stamp */}
            <text x="250" y="545" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="bold" letterSpacing="4" fill="#3D3227">
              PALAZZO COLONNADE • ROME IV
            </text>
            <text x="250" y="565" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="#756453">
              TAVOLA ARCHITETTONICA XXIV • ATELIER ARCHITETTURA 1923
            </text>
            <text x="250" y="580" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="8" fill="#9C8974">
              Sepia Ink Drawing on 100% Cotton Rag
            </text>
          </svg>
        </div>
      );

    case "geometric":
      return (
        <div
          data-testid="customizer-artwork-display"
          className="relative w-full h-full flex items-center justify-center p-6 bg-[#ECE8DF] select-none"
        >
          <svg
            viewBox="0 0 500 650"
            className="w-full h-full max-h-full max-w-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="500" height="650" fill="#EFECE5" />
            
            {/* Minimalist framing border */}
            <rect x="30" y="30" width="440" height="590" stroke="#C2B7A3" strokeWidth="1" />

            {/* Deep Charcoal Arch */}
            <path
              d="M120 440 L120 250 Q120 150 220 150 Q320 150 320 250 L320 440 Z"
              fill="#222326"
            />

            {/* Terracotta Ochre Sphere */}
            <circle cx="340" cy="220" r="85" fill="#B56D3B" />

            {/* Warm Raw Umber Strip */}
            <rect x="80" y="360" width="340" height="42" fill="#C5A059" />

            {/* Diagonal Slate Line */}
            <line x1="90" y1="120" x2="390" y2="480" stroke="#F4EDE1" strokeWidth="2.5" />
            <line x1="85" y1="125" x2="385" y2="485" stroke="#33383F" strokeWidth="1.5" />

            {/* Muted Sage Accent Pill */}
            <rect x="180" y="320" width="160" height="24" rx="12" fill="#5E6B5D" />

            {/* Minimal Grid & Coordinates */}
            <line x1="50" y1="500" x2="450" y2="500" stroke="#222326" strokeWidth="2" />
            <text x="60" y="535" fontFamily="monospace" fontSize="14" fontWeight="bold" letterSpacing="3" fill="#222326">
              BAUHAUS COMPOSITION NO. 7
            </text>
            <text x="60" y="555" fontFamily="monospace" fontSize="9" letterSpacing="1.5" fill="#665F55">
              WEIMAR DESSAU • 1926 • SERIGRAPH ARCHIVE
            </text>
            <text x="440" y="535" textAnchor="end" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#B56D3B">
              FIG. 07
            </text>
          </svg>
        </div>
      );

    case "sumie":
      return (
        <div
          data-testid="customizer-artwork-display"
          className="relative w-full h-full flex items-center justify-center p-6 bg-[#FAF7F2] select-none"
        >
          <svg
            viewBox="0 0 500 650"
            className="w-full h-full max-h-full max-w-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="500" height="650" fill="#FAF7F2" />

            {/* Distant Misty Mountain Gradients */}
            <path
              d="M40 380 Q140 280 260 340 T480 320 L480 440 L40 440 Z"
              fill="#E3DDD3"
              opacity="0.6"
            />
            <path
              d="M20 410 Q160 330 300 370 T480 360 L480 470 L20 470 Z"
              fill="#D1C8BC"
              opacity="0.7"
            />

            {/* Sweeping Ancient Pine Trunk */}
            <path
              d="M140 520 C180 480 150 420 210 380 C260 350 280 300 310 260 C320 245 310 230 330 210"
              stroke="#2B2825"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M150 515 C185 475 160 415 218 375 C268 345 285 295 315 255"
              stroke="#403C37"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Pine Needles Clusters (Sumi-e Brushstrokes) */}
            {[
              { cx: 330, cy: 200, r: 40 },
              { cx: 280, cy: 240, r: 35 },
              { cx: 370, cy: 230, r: 38 },
              { cx: 240, cy: 300, r: 32 },
              { cx: 320, cy: 290, r: 36 },
              { cx: 190, cy: 360, r: 28 },
            ].map((cl, i) => (
              <g key={i}>
                <ellipse cx={cl.cx} cy={cl.cy} rx={cl.r} ry={cl.r * 0.45} fill="#1E2620" opacity="0.85" />
                <ellipse cx={cl.cx + 5} cy={cl.cy - 3} rx={cl.r * 0.7} ry={cl.r * 0.35} fill="#3A483D" opacity="0.9" />
              </g>
            ))}

            {/* Red Vermilion Artist Seal (Hanko) */}
            <rect x="400" y="470" width="30" height="30" fill="#9E3024" rx="2" />
            <rect x="403" y="473" width="24" height="24" stroke="#FAF7F2" strokeWidth="1" fill="none" />
            <text x="415" y="490" textAnchor="middle" fill="#FAF7F2" fontSize="12" fontWeight="bold">
              松
            </text>

            {/* Calligraphy Kanji & Inscription */}
            <text x="80" y="160" fontFamily="serif" fontSize="18" fill="#2B2825" letterSpacing="4">
              松 雲
            </text>
            <text x="80" y="190" fontFamily="serif" fontSize="11" fill="#6A6258" letterSpacing="2">
              MISTY PINE • KYOTO
            </text>
            <text x="80" y="210" fontFamily="monospace" fontSize="8" fill="#998F82">
              NATURAL PINE SOOT INK • 1888
            </text>
          </svg>
        </div>
      );

    case "classical":
      return (
        <div
          data-testid="customizer-artwork-display"
          className="relative w-full h-full flex items-center justify-center p-6 bg-[#F3EDE6] select-none"
        >
          <svg
            viewBox="0 0 500 650"
            className="w-full h-full max-h-full max-w-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="500" height="650" fill="#F4EEE8" />
            
            {/* Archival border */}
            <rect x="30" y="30" width="440" height="590" stroke="#D1C3B2" strokeWidth="1" />
            <rect x="36" y="36" width="428" height="578" stroke="#D1C3B2" strokeWidth="0.5" strokeDasharray="3 3" />

            {/* Classical Sanguine Chalk Drapery Folds */}
            <g stroke="#7C4636" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M170 140 C190 200 150 280 180 340 C210 400 160 460 200 500"
                strokeWidth="3.5"
              />
              <path
                d="M200 145 C230 210 190 290 220 350 C250 410 200 470 240 505"
                strokeWidth="2.5"
              />
              <path
                d="M230 150 C270 220 220 300 260 360 C290 420 240 480 280 510"
                strokeWidth="3"
              />
              <path
                d="M270 160 C310 230 260 310 300 370 C330 430 280 490 320 512"
                strokeWidth="2"
              />

              {/* Chiaroscuro Cross Hatching */}
              {Array.from({ length: 18 }).map((_, i) => (
                <line
                  key={i}
                  x1={170 + i * 8}
                  y1={240 + i * 5}
                  x2={210 + i * 8}
                  y2={270 + i * 5}
                  stroke="#A86A58"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={i}
                  x1={220 + i * 7}
                  y1={330 + i * 6}
                  x2={260 + i * 7}
                  y2={360 + i * 6}
                  stroke="#A86A58"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              ))}
            </g>

            {/* Classical Italian Inscription */}
            <text x="250" y="550" textAnchor="middle" fontFamily="serif" fontSize="13" fontStyle="italic" letterSpacing="3" fill="#583126">
              Studio del Panneggio Classico
            </text>
            <text x="250" y="570" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1.5" fill="#8C5C4E">
              ACCADEMIA DI BELLE ARTI FIRENZE • 1782
            </text>
            <text x="250" y="585" textAnchor="middle" fontFamily="serif" fontSize="8" fill="#B38679">
              Sanguigna e Gesso Bianco su Carta Tinta
            </text>
          </svg>
        </div>
      );

    case "ginkgo":
    default:
      return (
        <div
          data-testid="customizer-artwork-display"
          className="relative w-full h-full flex items-center justify-center p-6 bg-[#FAF6EE] select-none text-[#2A2621]"
        >
          <svg
            viewBox="0 0 500 650"
            className="w-full h-full max-h-full max-w-full drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Parchment */}
            <rect width="500" height="650" fill="#FAF6EE" />
            
            {/* Fine Double Outer Border */}
            <rect x="25" y="25" width="450" height="600" stroke="#DCD3C1" strokeWidth="0.75" />
            <rect x="33" y="33" width="434" height="584" stroke="#8A7A65" strokeWidth="1.5" />

            {/* Header Inscription */}
            <text x="250" y="75" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" letterSpacing="4" fill="#3D362C">
              ATELIER HERBARIUM • TAB. XXIV
            </text>
            <line x1="160" y1="88" x2="340" y2="88" stroke="#8A7A65" strokeWidth="1" />

            {/* Botanical Ginkgo Branch & Fan Leaves */}
            {/* Central Woody Stem */}
            <path
              d="M250 500 C245 420 260 350 240 280 C230 240 255 190 250 150"
              stroke="#544738"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Branch 1 Left */}
            <path
              d="M246 380 C210 360 170 340 150 310"
              stroke="#544738"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Leaf 1 Left */}
            <path
              d="M150 310 C120 280 90 270 80 240 C110 230 140 240 160 270 Z"
              fill="#A38F56"
              stroke="#4F442F"
              strokeWidth="1.5"
            />
            {/* Veins 1 */}
            <line x1="150" y1="310" x2="110" y2="250" stroke="#D1C390" strokeWidth="0.75" />
            <line x1="150" y1="310" x2="135" y2="255" stroke="#D1C390" strokeWidth="0.75" />

            {/* Branch 2 Right */}
            <path
              d="M245 330 C280 310 320 300 350 270"
              stroke="#544738"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Leaf 2 Right */}
            <path
              d="M350 270 C380 240 410 235 420 205 C390 195 360 205 340 235 Z"
              fill="#B09D62"
              stroke="#4F442F"
              strokeWidth="1.5"
            />
            {/* Veins 2 */}
            <line x1="350" y1="270" x2="390" y2="215" stroke="#E2D6A5" strokeWidth="0.75" />
            <line x1="350" y1="270" x2="370" y2="220" stroke="#E2D6A5" strokeWidth="0.75" />

            {/* Main Center Fan Leaf */}
            <path
              d="M250 220 C220 180 180 160 190 120 C230 115 250 135 250 160 C250 135 270 115 310 120 C320 160 280 180 250 220 Z"
              fill="#8F7E49"
              stroke="#443926"
              strokeWidth="2"
            />
            {/* Delicate Radial Veins */}
            {[-25, -15, -5, 5, 15, 25].map((angle, i) => (
              <line
                key={i}
                x1="250"
                y1="220"
                x2={250 + angle * 2.2}
                y2="135"
                stroke="#D6CA9E"
                strokeWidth="0.75"
              />
            ))}

            {/* Lower Twin Small Leaves */}
            <path
              d="M248 430 C210 420 190 440 170 420 C185 400 215 405 248 420 Z"
              fill="#A38F56"
              stroke="#4F442F"
              strokeWidth="1.2"
            />

            {/* Botanical Scientific Latin Notation */}
            <text x="250" y="540" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="18" fontWeight="bold" letterSpacing="1.5" fill="#2E2820">
              Ginkgo biloba L.
            </text>
            <text x="250" y="560" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="#756752">
              ORDO GINKGOALES • FAMILIA GINKGOACEAE
            </text>
            <text x="250" y="578" textAnchor="middle" fontFamily="serif" fontSize="8" letterSpacing="1" fill="#99876E">
              Hand-pressed Botanical Specimen • 310gsm German Etching
            </text>

            {/* Seal / Emblem */}
            <circle cx="410" cy="565" r="14" stroke="#8A7A65" strokeWidth="1" fill="none" />
            <circle cx="410" cy="565" r="11" stroke="#8A7A65" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
            <text x="410" y="569" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#8A7A65">
              FC
            </text>
          </svg>
        </div>
      );
  }
}
