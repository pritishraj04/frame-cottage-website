import {
  Frame,
  Palette,
  Compass,
  Cpu,
  Award,
  Landmark,
  ShieldCheck,
  Building2,
  TreePine,
  Layers,
  Sparkles,
  Box,
  Wrench,
  Printer,
  Truck,
  Archive,
  LucideIcon,
} from "lucide-react";
import { VerticalId } from "./verticals";

export type ClientTierId = "b2c" | "b2b" | "public";

export interface ClientTierOption {
  id: ClientTierId;
  title: string;
  shortTitle: string;
  badge: string;
  subtitle: string;
  highlights: string[];
  recommendedFor: string;
  icon: LucideIcon;
  accentColor: string;
}

export const CLIENT_TIER_OPTIONS: ClientTierOption[] = [
  {
    id: "b2c",
    title: "B2C Residential & Art Collectors",
    shortTitle: "B2C Residential",
    badge: "Residential & Private Art",
    subtitle:
      "Private commissions, fine art preservation, heirloom framing, and personal collection curation.",
    highlights: [
      "White-Glove Delivery",
      "Museum Archival Conservation",
      "Private Atelier Consultation",
    ],
    recommendedFor: "Homeowners, Art Collectors, Interior Designers & Curators",
    icon: Palette,
    accentColor: "#C5A059",
  },
  {
    id: "b2b",
    title: "B2B Enterprise, Commercial & Architecture",
    shortTitle: "B2B Enterprise",
    badge: "Commercial & Architecture",
    subtitle:
      "Corporate headquarters, hotel suites, multi-building wayfinding, retail displays, and executive gifts.",
    highlights: [
      "Volume Scalability",
      "CAD / BIM Coordination",
      "Dedicated Senior Studio Lead",
    ],
    recommendedFor: "Architects, Commercial Developers, Hospitality Groups, Tech HQs",
    icon: Building2,
    accentColor: "#6B1C23",
  },
  {
    id: "public",
    title: "Public Sector, Municipal & Government Tenders",
    shortTitle: "Public Sector & GeM",
    badge: "Public Sector & GeM",
    subtitle:
      "Civic installations, state memorials, council chambers, tender execution, and institutional display.",
    highlights: [
      "GeM Portal Registered",
      "ISO 9001:2015 & FSC Certified",
      "EMD & Milestone Invoicing",
    ],
    recommendedFor: "Municipal Corporations, Ministries, Defence, Public Universities",
    icon: Landmark,
    accentColor: "#C5A059",
  },
];

export interface RFQVerticalOption {
  id: VerticalId;
  name: string;
  subtitle: string;
  audienceBadge: string;
  icon: LucideIcon;
  deliverables: string[];
}

export const RFQ_VERTICAL_OPTIONS: RFQVerticalOption[] = [
  {
    id: "retail-framing",
    name: "Retail & Standard Framing",
    subtitle:
      "Precision pre-cut archival mouldings, museum mats, and standard display solutions.",
    audienceBadge: "B2C / Residential",
    icon: Frame,
    deliverables: ["Tabletop Easels", "Gallery Wall Kits", "Ready-Made Wall Decor"],
  },
  {
    id: "bespoke-framing",
    name: "Bespoke Art & Custom Framing",
    subtitle:
      "Hand-gilded solid Appalachian hardwoods, TruVue® UV99 museum glazing, reversible archival hinges.",
    audienceBadge: "B2C & B2B",
    icon: Palette,
    deliverables: ["12-Color Giclée", "Hand-Rubbed Wax", "Canvas Floater"],
  },
  {
    id: "spatial-signage",
    name: "Spatial Design & Signage",
    subtitle:
      "Architectural wayfinding, illuminated monoliths, 3D metal letters, and immersive wall systems.",
    audienceBadge: "B2B / Commercial",
    icon: Compass,
    deliverables: ["3D LED Letters", "Architectural Pylons", "Wayfinding Systems"],
  },
  {
    id: "industrial-cnc",
    name: "Industrial Fabrication & CNC Metalworks",
    subtitle:
      "Sub-millimeter CNC routing (±0.1mm), laser profiling, waterjet brass, precision weldments.",
    audienceBadge: "Industrial / Architecture",
    icon: Cpu,
    deliverables: ["5-Axis CNC", "Fiber Laser (±0.1mm)", "Architectural Facades"],
  },
  {
    id: "custom-gifting",
    name: "Custom Gifting & Mementos",
    subtitle:
      "Corporate executive awards, K9 optical crystal, hardwood mementos, institutional presentation cases.",
    audienceBadge: "Corporate / Enterprise",
    icon: Award,
    deliverables: ["K9 Optical Crystal", "Hardwood Awards", "Bespoke Presentation Box"],
  },
  {
    id: "civic-projects",
    name: "Government & Civic Projects",
    subtitle:
      "GeM compliant civic installations, state insignia framing, museum heritage display, tender execution.",
    audienceBadge: "Public Sector / GeM",
    icon: Landmark,
    deliverables: ["GeM Tender Execution", "Vandal-Resistant Signage", "Civic Monuments"],
  },
];

export interface RFQMaterialOption {
  id: string;
  name: string;
  spec: string;
  badge: string;
  icon: LucideIcon;
}

export const RFQ_MATERIAL_OPTIONS: RFQMaterialOption[] = [
  {
    id: "appalachian-hardwoods",
    name: "Solid Appalachian Hardwoods",
    spec: "American Black Walnut, White Oak, Hard Maple (FSC® 100% Certified)",
    badge: "Sustainable Timber",
    icon: TreePine,
  },
  {
    id: "architectural-metals",
    name: "Architectural Metals",
    spec: "Jewelers Brass C260, 316 Marine Stainless, 6061-T6 Aircraft Aluminum",
    badge: "Sub-Millimeter CNC",
    icon: Layers,
  },
  {
    id: "museum-glazing",
    name: "Museum Glazing (TruVue® UV99)",
    spec: "TruVue® Optium Museum Acrylic - 99% UV Blocking, Anti-Reflective, Shatterproof",
    badge: "Conservation Grade",
    icon: ShieldCheck,
  },
  {
    id: "optical-crystal",
    name: "K9 Optical Crystal & Prismatic Glass",
    spec: "Flawless optical purity, beveled chamfers, sub-surface 3D laser engraving",
    badge: "Flawless Clarity",
    icon: Sparkles,
  },
  {
    id: "engineered-acrylics",
    name: "Engineered Acrylics & Vitrines",
    spec: "Optically clear cast acrylic, satin frosted diffuser, fluted architectural panels",
    badge: "Architectural Grade",
    icon: Box,
  },
];

export interface RFQCapabilityOption {
  id: string;
  name: string;
  spec: string;
  badge: string;
  icon: LucideIcon;
}

export const RFQ_CAPABILITY_OPTIONS: RFQCapabilityOption[] = [
  {
    id: "spatial-modeling",
    name: "3D Spatial Modeling & BIM Coordination",
    spec: "Revit / Rhino / SolidWorks 3D coordination for architects and general contractors",
    badge: "CAD / BIM Ready",
    icon: Compass,
  },
  {
    id: "cnc-cutting",
    name: "CNC Routing & Laser Cutting (±0.1mm)",
    spec: "High-precision 5-axis routing and fiber laser cutting with ±0.1mm tolerance",
    badge: "±0.1mm Precision",
    icon: Wrench,
  },
  {
    id: "fine-art-printing",
    name: "Archival Fine Art Printing",
    spec: "12-color mineral pigment giclée printing on 310gsm German 100% cotton rag",
    badge: "Museum Fidelity",
    icon: Printer,
  },
  {
    id: "site-installation",
    name: "On-Site Installation & Structural Rigging",
    spec: "Certified rigging technicians, seismic anchoring, and white-glove site delivery",
    badge: "Turnkey Rigging",
    icon: Truck,
  },
  {
    id: "institutional-packaging",
    name: "Institutional Packaging & Crating",
    spec: "Plywood flight crates, moisture barrier desiccant seals, export certified (ISPM-15)",
    badge: "Export Crated",
    icon: Archive,
  },
];

export interface RFQVolumeOption {
  id: string;
  label: string;
  range: string;
  description: string;
}

export const RFQ_VOLUME_OPTIONS: RFQVolumeOption[] = [
  {
    id: "prototype",
    label: "Prototype / Sample",
    range: "1 – 10 Units",
    description: "One-off commissions, boardroom prototypes, or sample benchmark for review.",
  },
  {
    id: "batch",
    label: "Limited Batch",
    range: "10 – 100 Units",
    description: "Boutique residential projects, gallery editions, or executive team recognition.",
  },
  {
    id: "commercial",
    label: "Commercial Scale",
    range: "100 – 1,000 Units",
    description: "Multi-floor corporate rollouts, hotel hospitality suites, nationwide stores.",
  },
  {
    id: "enterprise",
    label: "Enterprise / Tender",
    range: "1,000 – 10,000+ Units",
    description: "Civic infrastructure, municipal contracts, nationwide government tenders.",
  },
];

export interface RFQTimelineOption {
  id: string;
  label: string;
  duration: string;
  badge: string;
  description: string;
}

export const RFQ_TIMELINE_OPTIONS: RFQTimelineOption[] = [
  {
    id: "urgent",
    label: "Urgent Expedition",
    duration: "< 2 Weeks",
    badge: "Priority Fabrication",
    description: "Fast-track studio scheduling with dedicated 2-shift fabrication queue.",
  },
  {
    id: "standard",
    label: "Standard Studio Cadence",
    duration: "3 – 4 Weeks",
    badge: "Standard Schedule",
    description: "Optimal production cadence allowing full archival curing and craftsmanship.",
  },
  {
    id: "phased",
    label: "Phased Milestone Delivery",
    duration: "Milestone-Based",
    badge: "Multi-Stage Deployment",
    description: "Staggered consignments aligned with construction or tender fiscal milestones.",
  },
];
