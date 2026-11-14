import { MouldingId, MatId } from "./frames";

export type CollectionFilterId =
  | "all"
  | "bespoke-framing"
  | "spatial-signage"
  | "industrial-cnc"
  | "custom-gifting"
  | "civic-projects";

export interface CollectionFilterTab {
  id: CollectionFilterId;
  label: string;
  count: number;
}

export interface CuratedFrameProduct {
  id: string;
  name: string;
  category:
    | "bespoke-framing"
    | "spatial-signage"
    | "industrial-cnc"
    | "custom-gifting"
    | "civic-projects"
    | "retail-framing";
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
    category: "bespoke-framing",
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
    category: "bespoke-framing",
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
    category: "bespoke-framing",
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
    category: "bespoke-framing",
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
    category: "bespoke-framing",
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
    id: "architectural-wayfinding",
    name: "Architectural Wayfinding & Illuminated LED Pylon",
    category: "spatial-signage",
    subtitle: "Environmental Branding Monolith",
    material: "Architectural 5052-H32 Aluminum & Commercial IP67 LED",
    description:
      "Engineered exterior and campus navigation monolith with high-output energy-efficient halo LED illumination.",
    startingPrice: 850,
    sizeRange: '48"×18" to 96"×36"',
    mouldingId: "black",
    defaultMatId: "classic",
    artworkType: "architectural",
    roomContext: {
      title: "In Situ • Corporate Campus Entrance",
      description: "Installed on concrete foundation with concealed anchors",
      wallColor: "#1A202C",
      settingType: "console",
      furnitureColor: "#2D3748",
    },
  },
  {
    id: "perforated-metal-facade",
    name: "Architectural Perforated Metal Facade & CNC Screen",
    category: "industrial-cnc",
    subtitle: "5-Axis Precision CNC Laser Metalworks",
    material: "Marine-Grade 316 Stainless Steel & Architectural Brass",
    description:
      "Parametric acoustic lattice and exterior facade screen manufactured with ±0.1mm micro-tolerances.",
    startingPrice: 680,
    sizeRange: '36"×72" to 48"×96"',
    mouldingId: "brass",
    defaultMatId: "classic",
    artworkType: "geometric",
    roomContext: {
      title: "In Situ • Executive Atrium Partition",
      description: "Suspended in double-height atrium with architectural tension cables",
      wallColor: "#262626",
      settingType: "gallery-shelf",
      furnitureColor: "#404040",
    },
  },
  {
    id: "executive-crystal-walnut",
    name: "Executive Crystal & Solid Walnut Memento Award",
    category: "custom-gifting",
    subtitle: "Optical K9 Crystal & Appalachian Hardwood Plinth",
    material: "FSC® American Walnut & K9 Beveled Optical Crystal",
    description:
      "Sub-surface 3D fiber laser engraved commemorative milestone award housed in custom velvet keepsake case.",
    startingPrice: 145,
    sizeRange: '8" to 14" Height',
    mouldingId: "walnut",
    defaultMatId: "classic",
    artworkType: "minimalist",
    roomContext: {
      title: "In Situ • Boardroom Trophy Cabinet",
      description: "Display on illuminated floating glass shelf in executive suite",
      wallColor: "#1E2530",
      settingType: "credenza",
      furnitureColor: "#3B4252",
    },
  },
  {
    id: "laser-cut-brass-monument",
    name: "Precision CNC Laser-Cut Brass Monument Civic Plaque",
    category: "civic-projects",
    subtitle: "Public Sector Tender & Municipal Dedication",
    material: "Solid Jewelers C260 Heavy Brass with Anti-Oxidation Seal",
    description:
      "Vandal-resistant civic monument dedication plaque with deep relief etching and GeM tender certification.",
    startingPrice: 420,
    sizeRange: '18"×24" to 36"×48"',
    mouldingId: "brass",
    defaultMatId: "gallery",
    artworkType: "classical",
    roomContext: {
      title: "In Situ • Municipal City Hall Plaza",
      description: "Mounted on fluted granite wall with tamper-resistant blind studs",
      wallColor: "#333A42",
      settingType: "mantle",
      furnitureColor: "#4C566A",
    },
  },
  {
    id: "montmartre-gallery-set",
    name: "The Montmartre Gallery Wall Set",
    category: "civic-projects",
    subtitle: "Curated 3-Piece Atelier Salon Wall",
    material: "American Walnut & Nordic Oak Mitered Splines",
    description:
      "Complete 3-frame salon arrangement designed by our master curators for an instant focal statement.",
    startingPrice: 168,
    sizeRange: "8×10 to 24×36 in",
    mouldingId: "walnut",
    defaultMatId: "gallery",
    artworkType: "triptych",
    roomContext: {
      title: "In Situ • Velvet Settee Salon",
      description: "Arranged over olive velvet settee with laser spacing",
      wallColor: "#2A332B",
      settingType: "salon-wall",
      furnitureColor: "#465948",
    },
  },
];

export const COLLECTION_FILTER_TABS: CollectionFilterTab[] = [
  { id: "all", label: "All Verticals", count: CURATED_PRODUCTS.length },
  {
    id: "bespoke-framing",
    label: "Bespoke Framing & Art",
    count: CURATED_PRODUCTS.filter((p) => p.category === "bespoke-framing").length,
  },
  {
    id: "spatial-signage",
    label: "Spatial & Signage",
    count: CURATED_PRODUCTS.filter((p) => p.category === "spatial-signage").length,
  },
  {
    id: "industrial-cnc",
    label: "Industrial CNC",
    count: CURATED_PRODUCTS.filter((p) => p.category === "industrial-cnc").length,
  },
  {
    id: "custom-gifting",
    label: "Custom Gifting",
    count: CURATED_PRODUCTS.filter((p) => p.category === "custom-gifting").length,
  },
  {
    id: "civic-projects",
    label: "Civic & Government",
    count: CURATED_PRODUCTS.filter((p) => p.category === "civic-projects").length,
  },
];
