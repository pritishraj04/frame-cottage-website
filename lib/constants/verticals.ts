import {
  Frame,
  Palette,
  Compass,
  Cpu,
  Award,
  Landmark,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";

export type VerticalId =
  | "retail-framing"
  | "bespoke-framing"
  | "spatial-signage"
  | "industrial-cnc"
  | "custom-gifting"
  | "civic-projects";

export type TargetAudience = "B2C" | "B2B" | "Public Sector" | "Corporate" | "Commercial";

export interface ServiceSubCapability {
  title: string;
  description: string;
  href: string;
}

export interface ServiceVertical {
  id: VerticalId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  targetAudience: TargetAudience[];
  audienceBadge: string;
  deliverables: string[];
  technicalSpecs: { label: string; value: string }[];
  icon: LucideIcon;
  href: string;
  badge: string;
  subCapabilities: ServiceSubCapability[];
}

export const SERVICE_VERTICALS: ServiceVertical[] = [
  {
    id: "retail-framing",
    name: "Retail & Standard Framing",
    shortName: "Retail Framing",
    tagline: "Comprehensive Ready-Made & Residential Framing Displays",
    description:
      "A comprehensive inventory of premium photo frames, wall decor, and ready-made display solutions for residential spaces.",
    targetAudience: ["B2C"],
    audienceBadge: "B2C / Residential",
    deliverables: [
      "Precision-milled solid hardwood desk & tabletop frames with easel backs",
      "Ready-made archival gallery wall displays with alignment templates",
      "Standard aperture photo frames with 4-ply acid-free conservation mats",
      "Modular living room wall decor collections and ready-to-hang art pieces",
    ],
    technicalSpecs: [
      { label: "Timber Core", value: "FSC® Appalachian Walnut & White Oak" },
      { label: "Glazing Options", value: "TruVue® Conservation Grade UV Acrylic" },
      { label: "Standard Sizes", value: '5"×7" to 24"×36" (Custom options available)' },
      { label: "Turnaround", value: "Immediate Dispatch / 3–5 Business Days" },
    ],
    icon: Frame,
    href: "/services/retail-framing",
    badge: "Residential & Retail",
    subCapabilities: [
      {
        title: "Ready-Made Wall Decor",
        description: "Curated artisan frames crafted for instant home display",
        href: "/services/retail-framing#ready-made",
      },
      {
        title: "Tabletop & Easel Displays",
        description: "Solid hardwood desk accents with bevel-cut mats",
        href: "/services/retail-framing#tabletop",
      },
      {
        title: "Modular Gallery Kits",
        description: "Pre-measured multi-frame configurations with templates",
        href: "/services/retail-framing#gallery-kits",
      },
      {
        title: "Archival Standard Mats",
        description: "Acid-free cotton rag matting preventing print discoloration",
        href: "/services/retail-framing#archival-mats",
      },
    ],
  },
  {
    id: "bespoke-framing",
    name: "Bespoke Art & Custom Framing",
    shortName: "Bespoke Framing",
    tagline: "Fine Art Printing, Canvas Stretching & Archival Preservation",
    description:
      "A dedicated bespoke section offering gallery-quality fine art printing, canvas stretching, custom artwork curation, and archival-grade framing.",
    targetAudience: ["B2C", "B2B"],
    audienceBadge: "B2C / B2B / Galleries",
    deliverables: [
      "12-color archival giclée fine art printing on 310gsm German etching rag",
      "Custom hand-stretched raw linen and cotton canvas floater frames",
      "Museum-grade conservation framing with 99% UV-protective TruVue® glazing",
      "Custom hardwood spline joinery with hand-rubbed organic linseed wax finish",
    ],
    technicalSpecs: [
      { label: "Printing Tech", value: "12-Color Archival Mineral Giclée (2400 DPI)" },
      { label: "Joinery Method", value: "Mortise-Keyed Hardwood Corner Splines" },
      { label: "Preservation", value: "100% Reversible Archival Mylar Corners" },
      { label: "Conservation", value: "TruVue® 99% UV-Shielding Optical Acrylic" },
    ],
    icon: Palette,
    href: "/services/bespoke-framing",
    badge: "Fine Art Atelier",
    subCapabilities: [
      {
        title: "Archival Giclée Printing",
        description: "Museum-fidelity 12-color pigment prints on Hahnemühle paper",
        href: "/services/bespoke-framing#giclee",
      },
      {
        title: "Canvas Floater Framing",
        description: "Hand-stretched canvas art with architectural floating margins",
        href: "/services/bespoke-framing#canvas-floater",
      },
      {
        title: "Fine Art Conservation",
        description: "99% UV TruVue® glazing with acid-free preservation barrier",
        href: "/services/bespoke-framing#conservation",
      },
      {
        title: "Master Hardwood Joinery",
        description: "Handcrafted corner spline reinforcement in solid Walnut & Oak",
        href: "/services/bespoke-framing#joinery",
      },
    ],
  },
  {
    id: "spatial-signage",
    name: "Spatial Design & Signage",
    shortName: "Spatial & Signage",
    tagline: "Environmental Branding, Architectural Wayfinding & LED Displays",
    description:
      "Complete environmental branding, architectural wayfinding, exterior commercial signage, and custom illuminated LED displays.",
    targetAudience: ["B2B", "Commercial"],
    audienceBadge: "B2B / Commercial",
    deliverables: [
      "Comprehensive multi-building environmental branding & wayfinding strategy",
      "Architectural exterior entrance pylons & monolith directional signage",
      "Custom 3D illuminated LED channel lettering and edge-lit halo signage",
      "Interior spatial acoustic art panels, ADA-compliant tactile room signage",
    ],
    technicalSpecs: [
      { label: "Illumination", value: "High-Efficiency IP67 Commercial LED Modules" },
      { label: "Structural Substrate", value: "Architectural Aluminum (5052-H32) & 316 Stainless" },
      { label: "Standards", value: "ADA Compliant Tactile Braille & Local Municipal Codes" },
      { label: "Weatherproofing", value: "PVDF Fluoropolymer & Marine-Grade Powder Coat" },
    ],
    icon: Compass,
    href: "/services/spatial-signage",
    badge: "Architectural & Commercial",
    subCapabilities: [
      {
        title: "Architectural Wayfinding",
        description: "Campus & multi-floor directional navigation systems",
        href: "/services/spatial-signage#wayfinding",
      },
      {
        title: "3D Illuminated LED Signs",
        description: "Energy-efficient halo-lit channel letters and lightboxes",
        href: "/services/spatial-signage#illuminated-led",
      },
      {
        title: "Environmental Branding",
        description: "Turnkey spatial identity for enterprise HQs and retail flagships",
        href: "/services/spatial-signage#branding",
      },
      {
        title: "Exterior Commercial Pylons",
        description: "Engineered monolithic pylons with wind-load structural specs",
        href: "/services/spatial-signage#pylons",
      },
    ],
  },
  {
    id: "industrial-cnc",
    name: "Industrial Fabrication & CNC Metalworks",
    shortName: "Industrial CNC",
    tagline: "Precision CNC Routing, Fiber Laser Cutting & Architectural Metal",
    description:
      "Precision manufacturing, CNC routing, laser cutting, and custom metal fabrication for architectural and commercial installations.",
    targetAudience: ["Commercial", "B2B"],
    audienceBadge: "Commercial / Architecture",
    deliverables: [
      "High-precision 5-axis CNC routing for architectural timber, composites & acrylics",
      "High-power fiber laser cutting for brass, copper, aluminum & structural steel",
      "Architectural perforated metal screens, decorative facades & custom partitions",
      "Certified TIG/MIG welding, brake forming, and specialized artisanal metal patinas",
    ],
    technicalSpecs: [
      { label: "Tolerances", value: "Micro-Precision CNC within ±0.1 mm" },
      { label: "Laser Capacity", value: "Sheet thickness up to 20mm in Stainless & Brass" },
      { label: "Bed Envelope", value: "Large-format 3000 mm × 1500 mm dual-shuttle bed" },
      { label: "Metal Finishes", value: "Hand-brushed satin, antique bronze patina, anodized" },
    ],
    icon: Cpu,
    href: "/services/industrial-cnc",
    badge: "Precision Engineering",
    subCapabilities: [
      {
        title: "5-Axis CNC Routing",
        description: "Complex 3D milling for architectural timbers and acoustic panels",
        href: "/services/industrial-cnc#cnc-routing",
      },
      {
        title: "Fiber Laser Cutting",
        description: "Ultra-clean laser profiling in solid brass, copper, and stainless",
        href: "/services/industrial-cnc#laser-cutting",
      },
      {
        title: "Perforated Metal Facades",
        description: "Parametric architectural screens and custom sunshade grilles",
        href: "/services/industrial-cnc#facades",
      },
      {
        title: "Custom Metalworks",
        description: "Precision forming, structural welding, and custom chemical patinas",
        href: "/services/industrial-cnc#metalworks",
      },
    ],
  },
  {
    id: "custom-gifting",
    name: "Custom Gifting & Mementos",
    shortName: "Custom Gifting",
    tagline: "Personalized Mementos, Corporate Awards & Institutional Gifts",
    description:
      "Design and production of personalized mementos, corporate awards, commemorative plaques, and high-end institutional gifts.",
    targetAudience: ["Corporate", "B2B"],
    audienceBadge: "Corporate & Institutional",
    deliverables: [
      "Bespoke solid walnut & optical crystal executive recognition trophies",
      "Fiber laser-engraved solid jewelers brass and stainless commemorative plaques",
      "Handcrafted presentation gift boxes with custom velvet inserts and gold debossing",
      "Scalable corporate milestone programs and white-glove individual dispatch",
    ],
    technicalSpecs: [
      { label: "Materials", value: "Solid American Walnut, K9 Optical Crystal & Polished Brass" },
      { label: "Engraving Tech", value: "High-Resolution MOPA Fiber Laser & Deep Rotary Engraving" },
      { label: "Packaging", value: "Archival Linen Presentation Box with Custom Foam Inlay" },
      { label: "Volume Scaling", value: "From bespoke one-offs to 10,000+ unit corporate drops" },
    ],
    icon: Award,
    href: "/services/custom-gifting",
    badge: "Bespoke Corporate",
    subCapabilities: [
      {
        title: "Executive Trophies & Awards",
        description: "Sculpted crystal and Appalachian hardwood leadership honors",
        href: "/services/custom-gifting#awards",
      },
      {
        title: "Commemorative Plaques",
        description: "Precision-etched cast brass & brushed aluminum milestone plaques",
        href: "/services/custom-gifting#plaques",
      },
      {
        title: "Luxury Presentation Boxes",
        description: "Custom-fitted velvet keepsake cases with gold foil seal",
        href: "/services/custom-gifting#presentation-boxes",
      },
      {
        title: "Corporate Milestone Gifting",
        description: "Turnkey enterprise recognition programs with drop-shipping",
        href: "/services/custom-gifting#corporate-programs",
      },
    ],
  },
  {
    id: "civic-projects",
    name: "Government & Civic Projects",
    shortName: "Civic & Government",
    tagline: "Public Sector Contracts, Municipal Signage & Civic Memorials",
    description:
      "Scalable execution of public sector contracts, municipal signage, civic installations, and large-scale government tender projects.",
    targetAudience: ["Public Sector"],
    audienceBadge: "Public Sector / GeM",
    deliverables: [
      "Municipal civic identity installations, public monument wayfinding & memorials",
      "Vandal-resistant urban signage and heavy-gauge civic park infrastructure",
      "Council chambers official portraiture, archival charter preservation framing",
      "Comprehensive GeM (Government e-Marketplace) tender execution & compliance",
    ],
    technicalSpecs: [
      { label: "Compliance", value: "GeM Registered, ISO 9001:2015 & Public Tender Certified" },
      { label: "Materials", value: "Structural Cast Bronze, Anti-Graffiti 316 Marine Stainless" },
      { label: "Durability", value: "Vandal-Resistant 50-Year Outdoor Longevity Rating" },
      { label: "Execution", value: "Full Public Works Engineering & Turnkey Handover Certificates" },
    ],
    icon: Landmark,
    href: "/services/civic-projects",
    badge: "Government & Civic",
    subCapabilities: [
      {
        title: "Municipal Wayfinding",
        description: "Vandal-proof civic park, transit, and historic district monoliths",
        href: "/services/civic-projects#municipal-wayfinding",
      },
      {
        title: "Civic Memorials & Monuments",
        description: "Cast bronze and stone installations honoring municipal heritage",
        href: "/services/civic-projects#memorials",
      },
      {
        title: "Government Tender Execution",
        description: "Fully compliant GeM bidding, public audits, and bonded delivery",
        href: "/services/civic-projects#tenders",
      },
      {
        title: "Official Archival Framing",
        description: "Dignitary portraiture and state charter preservation framing",
        href: "/services/civic-projects#official-framing",
      },
    ],
  },
];
