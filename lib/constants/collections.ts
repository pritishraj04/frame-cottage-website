import { MouldingId, MatId } from "./frames";

export type CollectionFilterId =
  | "all"
  | "natural-timber"
  | "heritage-gilded"
  | "modern-metal"
  | "gallery-sets";

export interface CollectionFilterTab {
  id: CollectionFilterId;
  label: string;
  count: number;
}

export interface CuratedFrameProduct {
  id: string;
  name: string;
  category: "natural-timber" | "heritage-gilded" | "modern-metal" | "gallery-sets";
  subtitle: string;
  material: string;
  description: string;
  startingPrice: number;
  sizeRange: string;
  mouldingId: MouldingId;
  defaultMatId: MatId;
  artworkType:
    | "botanical"
    | "architectural"
    | "abstract"
    | "geometric"
    | "sumie"
    | "triptych"
    | "classical"
    | "minimalist";
  roomContext: {
    title: string;
    description: string;
    wallColor: string;
    settingType: "credenza" | "mantle" | "console" | "gallery-shelf" | "salon-wall";
    furnitureColor: string;
  };
}

export interface SizeOption {
  id: "8x10" | "11x14" | "16x20" | "24x36";
  label: string;
  dimensions: string;
  priceDelta: number;
  aspectClass: string;
}

export const FRAME_SIZE_OPTIONS: SizeOption[] = [
  {
    id: "8x10",
    label: "8 × 10 in",
    dimensions: '8" × 10" (20 × 25 cm)',
    priceDelta: 0,
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "11x14",
    label: "11 × 14 in",
    dimensions: '11" × 14" (28 × 35 cm)',
    priceDelta: 16,
    aspectClass: "aspect-[11/14]",
  },
  {
    id: "16x20",
    label: "16 × 20 in",
    dimensions: '16" × 20" (40 × 50 cm)',
    priceDelta: 34,
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "24x36",
    label: "24 × 36 in",
    dimensions: '24" × 36" (60 × 90 cm)',
    priceDelta: 68,
    aspectClass: "aspect-[2/3]",
  },
];

export const CURATED_PRODUCTS: CuratedFrameProduct[] = [
  {
    id: "highline-matte-black",
    name: "The Highline Matte Black",
    category: "modern-metal",
    subtitle: "Velvet Satin Hardwood Shadowbox",
    material: "Solid Maple with Museum Black Matte Lacquer",
    description:
      "Engineered with a 1.5-inch architectural depth and zero-glare velvet finish for contemporary gallery impact.",
    startingPrice: 54,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "black",
    defaultMatId: "classic",
    artworkType: "geometric",
    roomContext: {
      title: "In Situ • Gallery Track Wall",
      description: "Hung above minimalist concrete gallery bench",
      wallColor: "#2F2B28",
      settingType: "gallery-shelf",
      furnitureColor: "#3D3833",
    },
  },
  {
    id: "kyoto-white-oak",
    name: "The Kyoto White Oak",
    category: "natural-timber",
    subtitle: "Quarter-Sawn American White Oak",
    material: "100% Solid White Oak with Botanical Matte Coat",
    description:
      "Hand-planed Scandinavian silhouette preserving raw radial timber flecks with non-yellowing wax protection.",
    startingPrice: 62,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "oak",
    defaultMatId: "classic",
    artworkType: "sumie",
    roomContext: {
      title: "In Situ • Japandi Living Room",
      description: "Suspended above natural oak floating bench",
      wallColor: "#383E38",
      settingType: "credenza",
      furnitureColor: "#C9B69B",
    },
  },
  {
    id: "mendocino-walnut",
    name: "The Mendocino Walnut",
    category: "natural-timber",
    subtitle: "Sustainably Harvested American Black Walnut",
    material: "100% Solid American Walnut & Organic Linseed Oil",
    description:
      "Deep, rich espresso grain hand-rubbed with botanical oils to highlight natural heirloom mitered joinery.",
    startingPrice: 64,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "walnut",
    defaultMatId: "gallery",
    artworkType: "botanical",
    roomContext: {
      title: "In Situ • Mid-Century Credenza",
      description: "Centered over vintage Danish teak sideboard",
      wallColor: "#27332A",
      settingType: "credenza",
      furnitureColor: "#57361E",
    },
  },
  {
    id: "tribeca-brass",
    name: "The Tribeca Brushed Brass",
    category: "modern-metal",
    subtitle: "Solid Spun Brass with Warm Patina",
    material: "Solid Brass Casing over Hardwood Birch Core",
    description:
      "Narrow front face profile with museum shadow depth, hand-brushed for soft ambient light reflection.",
    startingPrice: 78,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "brass",
    defaultMatId: "classic",
    artworkType: "abstract",
    roomContext: {
      title: "In Situ • Sunlit Loft Console",
      description: "Resting above espresso oak console table",
      wallColor: "#2D343B",
      settingType: "console",
      furnitureColor: "#262220",
    },
  },
  {
    id: "florentine-gilded",
    name: "The Florentine Gilded Heirloom",
    category: "heritage-gilded",
    subtitle: "Hand-Applied 22-Karat Gold Leaf Foil",
    material: "Gilded Hardwood with Red Clay Bole Reveal",
    description:
      "Traditional Renaissance ogee profile gilded by hand with genuine metal leaf and soft burnished distressing.",
    startingPrice: 82,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "gold",
    defaultMatId: "gallery",
    artworkType: "architectural",
    roomContext: {
      title: "In Situ • Heritage Salon Mantle",
      description: "Hung above French limestone fireplace mantle",
      wallColor: "#322728",
      settingType: "mantle",
      furnitureColor: "#E2DDD6",
    },
  },
  {
    id: "versailles-ogee-gilt",
    name: "The Versailles Ogee Gilt",
    category: "heritage-gilded",
    subtitle: "Baroque Sweep with Beaded Inner Lip",
    material: "Sculpted Hardwood with Antiqued Champagne Leaf",
    description:
      "Architectural profile featuring historic bead-and-reel filigree and warm museum patina.",
    startingPrice: 88,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "gold",
    defaultMatId: "classic",
    artworkType: "classical",
    roomContext: {
      title: "In Situ • Grand Library Nook",
      description: "Accenting an antiqued walnut library desk",
      wallColor: "#2E2428",
      settingType: "mantle",
      furnitureColor: "#4E3224",
    },
  },
  {
    id: "chelsea-gallery-duo",
    name: "The Chelsea Gallery Wall Duo",
    category: "gallery-sets",
    subtitle: "Harmonized Diptych in Brushed Brass",
    material: "Solid Brass Spun Profiles & Museum Cotton Rag",
    description:
      "A balanced pair of contemporary frames calibrated for symmetrical gallery grouping with archival spacing.",
    startingPrice: 142,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "brass",
    defaultMatId: "classic",
    artworkType: "minimalist",
    roomContext: {
      title: "In Situ • Architectural Study",
      description: "Hung above low travertine credenza ledge",
      wallColor: "#34393E",
      settingType: "console",
      furnitureColor: "#D0C7B8",
    },
  },
  {
    id: "montmartre-gallery-set",
    name: "The Montmartre Gallery Wall Set",
    category: "gallery-sets",
    subtitle: "Curated 3-Piece Atelier Salon Wall",
    material: "American Walnut & Nordic Oak Mitered Splines",
    description:
      "Complete 3-frame salon arrangement designed by our master curators for an instant living room focal statement.",
    startingPrice: 168,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "walnut",
    defaultMatId: "gallery",
    artworkType: "triptych",
    roomContext: {
      title: "In Situ • Velvet Settee Salon",
      description: "Arranged over olive velvet Parisian settee",
      wallColor: "#2A332B",
      settingType: "salon-wall",
      furnitureColor: "#465948",
    },
  },
];

export const COLLECTION_FILTER_TABS: CollectionFilterTab[] = [
  { id: "all", label: "All Collections", count: CURATED_PRODUCTS.length },
  {
    id: "natural-timber",
    label: "Natural Timber",
    count: CURATED_PRODUCTS.filter((p) => p.category === "natural-timber").length,
  },
  {
    id: "heritage-gilded",
    label: "Heritage Gilded",
    count: CURATED_PRODUCTS.filter((p) => p.category === "heritage-gilded").length,
  },
  {
    id: "modern-metal",
    label: "Modern Metal",
    count: CURATED_PRODUCTS.filter((p) => p.category === "modern-metal").length,
  },
  {
    id: "gallery-sets",
    label: "Gallery Sets",
    count: CURATED_PRODUCTS.filter((p) => p.category === "gallery-sets").length,
  },
];
