export type MouldingId = "walnut" | "brass" | "black" | "oak" | "gold" | "ash";

export interface Moulding {
  id: MouldingId;
  name: string;
  subtitle: string;
  description: string;
  material: string;
  dimensions: string;
  basePrice: number;
  swatchGradient: string;
  frameGradient: string;
  borderColor: string;
  innerLipColor: string;
  bevelHighlight: string;
}

export type MatId = "none" | "classic" | "gallery";

export interface MatOption {
  id: MatId;
  name: string;
  label: string;
  widthPx: number;
  widthInches: string;
  price: number;
  description: string;
}

export type ContextViewId = "studio" | "room";

export interface ContextView {
  id: ContextViewId;
  label: string;
  tagline: string;
  description: string;
}

export const MOULDINGS: Record<MouldingId, Moulding> = {
  walnut: {
    id: "walnut",
    name: "American Natural Walnut",
    subtitle: "Warm Timber Grain",
    description: "Sustainably harvested North American walnut with hand-rubbed natural oil finish.",
    material: "100% Solid Black Walnut",
    dimensions: '1.25" width × 1.0" depth',
    basePrice: 64,
    swatchGradient: "linear-gradient(135deg, #6B4931 0%, #4D321F 50%, #2E1B0E 100%)",
    frameGradient: "linear-gradient(135deg, #7C5338 0%, #5E3D27 25%, #462C1B 65%, #352013 100%)",
    borderColor: "#4A301D",
    innerLipColor: "#2E1B0E",
    bevelHighlight: "rgba(255, 235, 210, 0.15)",
  },
  brass: {
    id: "brass",
    name: "Brushed Antique Brass",
    subtitle: "Rich Metallic Satin",
    description: "Solid brass casing with hand-applied horizontal brushing and a soft vintage patina.",
    material: "Solid Spun Brass & Birch Core",
    dimensions: '0.85" width × 1.25" depth',
    basePrice: 78,
    swatchGradient: "linear-gradient(135deg, #F0D796 0%, #C5A059 45%, #91712F 100%)",
    frameGradient: "linear-gradient(135deg, #F5DE9F 0%, #D6B26A 25%, #AD8739 60%, #826322 100%)",
    borderColor: "#B89345",
    innerLipColor: "#6F5117",
    bevelHighlight: "rgba(255, 250, 220, 0.4)",
  },
  black: {
    id: "black",
    name: "Gallery Matte Black",
    subtitle: "Deep Satin Shadowbox",
    description: "Minimalist modern shadowbox finished with museum-grade velvet matte black lacquer.",
    material: "Solid Maple Hardwood",
    dimensions: '1.0" width × 1.5" depth',
    basePrice: 58,
    swatchGradient: "linear-gradient(135deg, #3A3734 0%, #201D1A 60%, #11100F 100%)",
    frameGradient: "linear-gradient(135deg, #383430 0%, #262320 30%, #1A1816 70%, #0F0E0D 100%)",
    borderColor: "#221F1D",
    innerLipColor: "#0D0C0B",
    bevelHighlight: "rgba(255, 255, 255, 0.08)",
  },
  oak: {
    id: "oak",
    name: "Nordic Natural White Oak",
    subtitle: "Scandinavian Grain",
    description: "Quarter-sawn American white oak sealed with an invisible low-VOC matte botanical coat.",
    material: "100% Solid White Oak",
    dimensions: '1.1" width × 0.9" depth',
    basePrice: 62,
    swatchGradient: "linear-gradient(135deg, #EAD7BA 0%, #D1BA94 50%, #B2976D 100%)",
    frameGradient: "linear-gradient(135deg, #F0DFCA 0%, #DCC3A1 30%, #C4A77D 70%, #A88A5E 100%)",
    borderColor: "#BA9F78",
    innerLipColor: "#8D734E",
    bevelHighlight: "rgba(255, 255, 255, 0.28)",
  },
  gold: {
    id: "gold",
    name: "Vintage Florentine Gold",
    subtitle: "Warm Leaf Foil Bevel",
    description: "Traditional Italian-inspired profile hand-gilded with genuine 22-karat warm metal leaf.",
    material: "Gilded Hardwood Moulding",
    dimensions: '1.35" width × 1.1" depth',
    basePrice: 82,
    swatchGradient: "linear-gradient(135deg, #FDECB2 0%, #D8B759 40%, #B89230 75%, #7D5B13 100%)",
    frameGradient: "linear-gradient(135deg, #FFF1C5 0%, #E3C36A 25%, #C29B35 60%, #8C6617 100%)",
    borderColor: "#CFA744",
    innerLipColor: "#755410",
    bevelHighlight: "rgba(255, 248, 210, 0.45)",
  },
  ash: {
    id: "ash",
    name: "Bleached Heritage Ash",
    subtitle: "Parchment Woodgrain",
    description: "Kiln-dried American white ash bleached to a soft parchment tone with ultra-matte architectural wax.",
    material: "100% Solid Heritage Ash",
    dimensions: '1.2" width × 1.0" depth',
    basePrice: 68,
    swatchGradient: "linear-gradient(135deg, #E6E1DA 0%, #D8D1C7 50%, #BEB7AA 100%)",
    frameGradient: "linear-gradient(135deg, #ECE8E1 0%, #DDD7CD 30%, #C8C0B2 70%, #AFA799 100%)",
    borderColor: "#C5BEB2",
    innerLipColor: "#9D9587",
    bevelHighlight: "rgba(255, 255, 255, 0.4)",
  },
};

export const MOULDING_LIST: Moulding[] = Object.values(MOULDINGS);

export const MAT_OPTIONS: Record<MatId, MatOption> = {
  none: {
    id: "none",
    name: "No Mat",
    label: "No Mat",
    widthPx: 0,
    widthInches: "0 in",
    price: 0,
    description: "Art expands edge-to-edge for an immersive, uninterrupted visual statement.",
  },
  classic: {
    id: "classic",
    name: "2\" Classic Rag",
    label: '2" Classic Rag',
    widthPx: 24,
    widthInches: "2 in",
    price: 12,
    description: "Standard museum 4-ply cotton rag border with a precision 45° beveled cut edge.",
  },
  gallery: {
    id: "gallery",
    name: "3\" Dramatic Gallery",
    label: '3" Dramatic Gallery',
    widthPx: 36,
    widthInches: "3 in",
    price: 18,
    description: "Expansive archival border providing optimal visual breathing room for fine art.",
  },
};

export const MAT_OPTION_LIST: MatOption[] = Object.values(MAT_OPTIONS);

export const CONTEXT_VIEWS: Record<ContextViewId, ContextView> = {
  studio: {
    id: "studio",
    label: "Studio Neutral",
    tagline: "Crisp Architectural Daylight",
    description: "Clean warm gallery studio setting showcasing natural color fidelity and pure silhouettes.",
  },
  room: {
    id: "room",
    label: "Curated Living Room",
    tagline: "Salon Wall with Warm Evening Glow",
    description: "Atmospheric sage-tinted residential parlor with ambient wall sconces and gentle cast shadows.",
  },
};

export const CONTEXT_VIEW_LIST: ContextView[] = Object.values(CONTEXT_VIEWS);

export function calculateFramePrice(mouldingId: MouldingId, matId: MatId): number {
  const moulding = MOULDINGS[mouldingId] || MOULDINGS.walnut;
  const mat = MAT_OPTIONS[matId] || MAT_OPTIONS.classic;
  return moulding.basePrice + mat.price;
}
