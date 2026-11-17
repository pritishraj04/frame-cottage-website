import {
  MOULDINGS,
  MAT_OPTIONS,
  type MouldingId,
  type MatId,
} from "./frames";

export type GlazingId = "conservation-clear" | "museum-glass" | "acrylic";

export interface GlazingOption {
  id: GlazingId;
  name: string;
  tagline: string;
  price: number;
  spec: string;
  uvProtection: string;
  reflection: string;
  description: string;
}

export const GLAZING_OPTIONS: Record<GlazingId, GlazingOption> = {
  "conservation-clear": {
    id: "conservation-clear",
    name: "TruVue® Conservation Clear UV99",
    tagline: "Standard Museum Archival Float Glass",
    price: 0,
    spec: "2.5mm Water-Clear Float Glass",
    uvProtection: "99% UV Shield",
    reflection: "Standard ~8%",
    description: "Industry-standard conservation float glass formulated to block 99% of harmful ultraviolet wavelengths and protect pigments from irreversible fading.",
  },
  "museum-glass": {
    id: "museum-glass",
    name: "Museum Glass® Anti-Reflective Water-White",
    tagline: "<1% Light Reflection • True Optical Purity",
    price: 24,
    spec: "Magnetron Sputtered Multi-Coating",
    uvProtection: "99% UV Shield",
    reflection: "< 1% (Virtually Invisible)",
    description: "The pinnacle of fine art glazing. Patented anti-reflective coating reduces light reflection to under 1% while allowing 99% UV radiation protection with unparalleled color fidelity.",
  },
  acrylic: {
    id: "acrylic",
    name: "Conservation Shatterproof Acrylic",
    tagline: "Optical-Grade Cast Acrylic • Seismic Safe",
    price: 18,
    spec: "3.0mm Cast Optical-Grade Acrylic",
    uvProtection: "99% UV Shield",
    reflection: "Low Diffusion",
    description: "Lightweight, shatter-resistant archival cast acrylic engineered for oversized works, high-traffic corridors, children's spaces, and seismic safety.",
  },
};

export const GLAZING_OPTION_LIST: GlazingOption[] = Object.values(GLAZING_OPTIONS);

export type MatColorId = "off-white" | "warm-cream" | "charcoal" | "french-mist" | "sand";

export interface MatColorOption {
  id: MatColorId;
  name: string;
  hex: string;
  borderColor: string;
  bevelHighlight: string;
  description: string;
}

export const MAT_COLORS: Record<MatColorId, MatColorOption> = {
  "off-white": {
    id: "off-white",
    name: "Off-White Silk",
    hex: "#F7F5EE",
    borderColor: "#E5DFD4",
    bevelHighlight: "#FFFFFF",
    description: "Unbleached natural cotton rag with whisper-soft warmth; universally complements fine art prints.",
  },
  "warm-cream": {
    id: "warm-cream",
    name: "Archival Warm Cream",
    hex: "#F2ECE0",
    borderColor: "#DCD2C1",
    bevelHighlight: "#FFFDF8",
    description: "Traditional European museum rag tone enhancing vintage etchings and antique drawings.",
  },
  charcoal: {
    id: "charcoal",
    name: "Charcoal Onyx",
    hex: "#222120",
    borderColor: "#171615",
    bevelHighlight: "#FFFFFF",
    description: "Deep obsidian black with contrasting crisp 4-ply white bevel core for bold contrast.",
  },
  "french-mist": {
    id: "french-mist",
    name: "French Mist",
    hex: "#DCE3E6",
    borderColor: "#C5D0D4",
    bevelHighlight: "#FFFFFF",
    description: "Gentle cool slate tint tailored for silver gelatin prints, architectural elevations, and monochrome works.",
  },
  sand: {
    id: "sand",
    name: "Sand Dune",
    hex: "#E7DFD1",
    borderColor: "#D2C5B2",
    bevelHighlight: "#FFFBF3",
    description: "Warm mineral sand hue inspired by raw unrefined washi paper and botanical fiber.",
  },
};

export const MAT_COLOR_LIST: MatColorOption[] = Object.values(MAT_COLORS);

export type SizeId = "8x10" | "11x14" | "16x20" | "18x24" | "24x36" | "30x40" | "custom";

export interface SizeOption {
  id: SizeId;
  label: string;
  dimensions: string;
  widthInches: number;
  heightInches: number;
  aspectRatio: string;
  priceDelta: number;
  popular?: boolean;
}

export const SIZE_OPTIONS: Record<SizeId, SizeOption> = {
  "8x10": {
    id: "8x10",
    label: '8" × 10"',
    dimensions: "20.3 × 25.4 cm",
    widthInches: 8,
    heightInches: 10,
    aspectRatio: "4:5",
    priceDelta: 0,
    popular: true,
  },
  "11x14": {
    id: "11x14",
    label: '11" × 14"',
    dimensions: "27.9 × 35.6 cm",
    widthInches: 11,
    heightInches: 14,
    aspectRatio: "11:14",
    priceDelta: 15,
  },
  "16x20": {
    id: "16x20",
    label: '16" × 20"',
    dimensions: "40.6 × 50.8 cm",
    widthInches: 16,
    heightInches: 20,
    aspectRatio: "4:5",
    priceDelta: 30,
    popular: true,
  },
  "18x24": {
    id: "18x24",
    label: '18" × 24"',
    dimensions: "45.7 × 61.0 cm",
    widthInches: 18,
    heightInches: 24,
    aspectRatio: "3:4",
    priceDelta: 45,
  },
  "24x36": {
    id: "24x36",
    label: '24" × 36"',
    dimensions: "61.0 × 91.4 cm",
    widthInches: 24,
    heightInches: 36,
    aspectRatio: "2:3",
    priceDelta: 65,
    popular: true,
  },
  "30x40": {
    id: "30x40",
    label: '30" × 40"',
    dimensions: "76.2 × 101.6 cm",
    widthInches: 30,
    heightInches: 40,
    aspectRatio: "3:4",
    priceDelta: 95,
  },
  custom: {
    id: "custom",
    label: "Custom Dimensions",
    dimensions: "Millimeter precision",
    widthInches: 16,
    heightInches: 20,
    aspectRatio: "Custom",
    priceDelta: 0,
  },
};

export const SIZE_OPTION_LIST: SizeOption[] = Object.values(SIZE_OPTIONS);

export type ArtworkPresetId = "ginkgo" | "colonnade" | "geometric" | "sumie" | "classical";

export interface ArtworkPreset {
  id: ArtworkPresetId;
  title: string;
  artist: string;
  year: string;
  category: string;
  medium: string;
  description: string;
  accentColor: string;
}

export const ARTWORK_PRESETS: Record<ArtworkPresetId, ArtworkPreset> = {
  ginkgo: {
    id: "ginkgo",
    title: "Botanical Ginkgo",
    artist: "Atelier Herbarium",
    year: "1894",
    category: "Botanical Specimen",
    medium: "310gsm German Etching Paper • Archival Pigment",
    description: "Detailed botanical leaf study of Ginkgo biloba L. with intricate vein architecture and French atelier notation.",
    accentColor: "#A38F56",
  },
  colonnade: {
    id: "colonnade",
    title: "Architectural Colonnade",
    artist: "Palazzo Colonnade • Rome IV",
    year: "1923",
    category: "Architectural Drawing",
    medium: "Bespoke Sepia Ink on Cotton Vellum",
    description: "Rigorous neoclassical elevation study of fluted Ionic columns, coffered portico ceilings, and rhythmic shadow play.",
    accentColor: "#8C7A65",
  },
  geometric: {
    id: "geometric",
    title: "Bauhaus Composition No. 7",
    artist: "Bauhaus Studio Dessau",
    year: "1926",
    category: "Constructivist Abstract",
    medium: "Serigraph Print on Warm French Rag",
    description: "Purity of form featuring balanced geometric spheres, intersect lines, raw umber, and Venetian ochre planes.",
    accentColor: "#B56D3B",
  },
  sumie: {
    id: "sumie",
    title: "Sumi-e Mountain Pine",
    artist: "Kyoto Ink Atelier",
    year: "1888",
    category: "Japanese Ink Wash",
    medium: "Mineral Pine Soot Ink on Unbleached Washi",
    description: "Evocative atmospheric ink wash depiction of a centuries-old twisted pine clinging to a misty granite summit.",
    accentColor: "#4A524D",
  },
  classical: {
    id: "classical",
    title: "Florentine Drapery Study",
    artist: "Accademia di Belle Arti",
    year: "1782",
    category: "Renaissance Academy",
    medium: "Sanguine & White Chalk on Tinted Paper",
    description: "Masterwork chiaroscuro study exploring the complex tactile folds and weight of classical Roman drapery.",
    accentColor: "#8E5E4A",
  },
};

export const ARTWORK_PRESET_LIST: ArtworkPreset[] = Object.values(ARTWORK_PRESETS);

export type CustomizerStep = "artwork" | "moulding" | "mat" | "size" | "glazing" | "review";

export interface CustomizerStepItem {
  id: CustomizerStep;
  label: string;
  stepNumber: number;
}

export const CUSTOMIZER_STEPS: CustomizerStepItem[] = [
  { id: "artwork", label: "Artwork & Upload", stepNumber: 1 },
  { id: "moulding", label: "Moulding Profile", stepNumber: 2 },
  { id: "mat", label: "Archival Matting", stepNumber: 3 },
  { id: "size", label: "Frame Dimensions", stepNumber: 4 },
  { id: "glazing", label: "Conservation Glazing", stepNumber: 5 },
  { id: "review", label: "Review & Order", stepNumber: 6 },
];

export interface CustomizerState {
  mouldingId: MouldingId;
  matId: MatId;
  matColorId: MatColorId;
  glazingId: GlazingId;
  sizeId: SizeId;
  customWidth: number;
  customHeight: number;
  artworkType: "preset" | "upload";
  presetId: ArtworkPresetId;
  uploadedImageUrl: string | null;
  uploadedImageName: string | null;
  uploadedImageWidth: number | null;
  uploadedImageHeight: number | null;
  previewMode: "studio" | "room";
  currentStep: CustomizerStep;
}

export function calculateCustomizerPrice(params: {
  mouldingId: MouldingId;
  matId: MatId;
  glazingId: GlazingId;
  sizeId: SizeId;
  customWidth?: number;
  customHeight?: number;
}): {
  mouldingPrice: number;
  matPrice: number;
  glazingPrice: number;
  sizePrice: number;
  total: number;
} {
  const moulding = MOULDINGS[params.mouldingId] || MOULDINGS.walnut;
  const mat = MAT_OPTIONS[params.matId] || MAT_OPTIONS.classic;
  const glazing = GLAZING_OPTIONS[params.glazingId] || GLAZING_OPTIONS["conservation-clear"];
  const size = SIZE_OPTIONS[params.sizeId] || SIZE_OPTIONS["8x10"];

  let sizePrice = size.priceDelta;
  if (params.sizeId === "custom") {
    const width = params.customWidth || 16;
    const height = params.customHeight || 20;
    const unitedInches = width + height;
    // Base 8x10 has united inches = 18. Each additional united inch is ₹2.5
    sizePrice = Math.max(0, Math.round((unitedInches - 18) * 2.5));
  }

  const mouldingPrice = moulding.basePrice;
  const matPrice = mat.price;
  const glazingPrice = glazing.price;
  const total = mouldingPrice + matPrice + glazingPrice + sizePrice;

  return {
    mouldingPrice,
    matPrice,
    glazingPrice,
    sizePrice,
    total,
  };
}

export function calculateDpi(
  imageWidthPx: number | null,
  imageHeightPx: number | null,
  targetWidthInches: number,
  targetHeightInches: number
): {
  dpi: number;
  level: "optimal" | "acceptable" | "advisory";
  badgeText: string;
  description: string;
} {
  if (!imageWidthPx || !imageHeightPx) {
    return {
      dpi: 300,
      level: "optimal",
      badgeText: "300+ DPI • Museum Master Quality",
      description: "Razor sharp fine art reproduction on archival rag paper.",
    };
  }

  const dpiX = imageWidthPx / targetWidthInches;
  const dpiY = imageHeightPx / targetHeightInches;
  const effectiveDpi = Math.round(Math.min(dpiX, dpiY));

  if (effectiveDpi >= 300) {
    return {
      dpi: effectiveDpi,
      level: "optimal",
      badgeText: `${effectiveDpi} DPI • Gallery Master Quality`,
      description: "Exceeds museum standard 300 DPI for ultra-sharp reproduction.",
    };
  } else if (effectiveDpi >= 150) {
    return {
      dpi: effectiveDpi,
      level: "acceptable",
      badgeText: `${effectiveDpi} DPI • High Fidelity Print`,
      description: "Great visual sharpness for standard salon viewing distances.",
    };
  } else {
    return {
      dpi: effectiveDpi,
      level: "advisory",
      badgeText: `${effectiveDpi} DPI • Advisory: Soft Grain Possible`,
      description: "Resolution is below 150 DPI. Consider selecting a smaller frame size or uploading a higher resolution image.",
    };
  }
}
