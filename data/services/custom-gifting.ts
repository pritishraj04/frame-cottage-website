import { ServiceVerticalData } from "./types";

export const customGiftingData: ServiceVerticalData = {
  id: "custom-gifting",
  title: "Custom Gifting & Mementos",
  shortName: "Custom Gifting",
  tagline: "Personalized Mementos, Corporate Awards & Institutional Gifts",
  audienceTag: "Corporate & Institutional",
  heroBadge: "Bespoke Corporate Atelier",
  description:
    "Elevating institutional recognition and corporate gratitude into timeless heirlooms. Solid walnut trophies, pure optical crystal sculptures, fiber-etched brass plaques, and bespoke velvet-lined presentation cases crafted for executive milestones and diplomatic ceremonies.",
  heroAssetTag: "4:3 Custom Gifting & Awards Asset",
  keyStats: [
    { label: "Batch Scale", value: "10 to 10,000+" },
    { label: "Crystal Grade", value: "K9 Optical Ultra-Pure" },
    { label: "Laser DPI", value: "1200 DPI MOPA" },
    { label: "Packaging", value: "Velvet Debossed" },
  ],
  keyHighlights: [
    {
      title: "K9 Optical Crystal Sculpting",
      description: "Ultra-pure lead-free optical crystal cut and polished to gemstone brilliance with 3D subsurface laser mapping.",
      badge: "Zero-Blemish Crystal",
    },
    {
      title: "Solid American Walnut Trophies",
      description: "Appalachian walnut, natural teak, and white maple bases hand-rubbed with organic oils and brass inlays.",
      badge: "Heirloom Hardwood",
    },
    {
      title: "MOPA Color Laser Engraving",
      description: "Sub-micron laser annealing producing permanent high-contrast black and spectral oxidation on metals.",
      badge: "High-Res MOPA",
    },
    {
      title: "Bespoke Handcrafted Cases",
      description: "Custom linen and crushed velvet presentation boxes with hot-foil gold stamped institutional seals.",
      badge: "White-Glove Box",
    },
  ],
  technicalCapabilities: [
    {
      id: "mopa-laser",
      title: "MOPA 50W Fiber Color Laser",
      machine: "SPI Laser MOPA Pulse System",
      specs: "Adjustable pulse width 2-500ns; 1200 DPI micro-annealing resolution",
      description:
        "Micro-ablates metal without chemical etching, yielding razor-sharp corporate logos and typography on polished brass.",
      badge: "Laser Marking",
      pngPlaceholderText: "Engraved Brass Plaque Sample PNG",
      hashSlug: "awards",
      aliases: ["mopa-laser", "trophies"],
    },
    {
      id: "subsurface-laser",
      title: "3D Subsurface Crystal Engraver",
      machine: "Green Crystal Laser 532nm DPSS",
      specs: "Sub-surface micro-fracturing creating 3D volumetric floating models",
      description:
        "Creates interior 3D spatial models, architectural structures, and insignia inside solid K9 crystal without touching the surface.",
      badge: "3D Subsurface",
      pngPlaceholderText: "3D Crystal Sculpture Sample PNG",
      hashSlug: "plaques",
      aliases: ["subsurface-laser", "medallions"],
    },
    {
      id: "diamond-drag",
      title: "Rotary Diamond Drag Engraver",
      machine: "Gravotech IS400 High-Precision Rotary",
      specs: "Natural industrial diamond stylus; 0.05mm positional repeatability",
      description:
        "Produces classic bright-cut faceted engraving lines with sparkling jewelry-level light reflection on silver and gold.",
      badge: "Diamond Cut",
      pngPlaceholderText: "Diamond Cut Metal Medal PNG",
      hashSlug: "corporate-programs",
      aliases: ["diamond-drag", "turnkey"],
    },
    {
      id: "case-maker",
      title: "Custom Rigid Box Case-Making",
      machine: "Kolbus Precision Box & Foil Station",
      specs: "1200gsm structural binder board with precision CNC EVA foam routing",
      description:
        "Hand-tailored presentation boxes lined in French velvet, bookbinding cloth, and heavy magnetic closure latches.",
      badge: "Luxury Packaging",
      pngPlaceholderText: "Debossed Velvet Gift Case PNG",
      hashSlug: "presentation-boxes",
      aliases: ["case-maker", "boxes", "velvet-cases"],
    },
  ],
  materialSpecs: [
    {
      category: "Optical Crystals",
      specification: "K9 Borosilicate Optical Grade Crystal & Fused Quartz",
      toleranceGrade: "Refractive index 1.5168 / Zero bubbles, striations, or green tint",
      finishStandard: "Diamond lapidary polished 8000-grit mirror facets",
    },
    {
      category: "Sculptural Timber",
      specification: "Kiln-dried Appalachian Black Walnut, Teakwood, Indian Rosewood",
      toleranceGrade: "FAS 1-Face Clear / Hand-planed and bevel chamfered",
      finishStandard: "Organic beeswax and carnauba paste wax finish",
    },
    {
      category: "Jewelers Metals",
      specification: "C26000 Cartridge Brass, 24K Gold Electroplate, 316 Stainless",
      toleranceGrade: "±0.05 mm mechanical fit with mortised wood bases",
      finishStandard: "Mirror chrome polish, satin hairline brush, antique bronze",
    },
    {
      category: "Luxury Presentation",
      specification: "1200gsm Rigid Board, Italian Linen Cloth, Royal Blue / Midnight Velvet",
      toleranceGrade: "Laser-cut high-density EVA foam custom-molded to trophy silhouette",
      finishStandard: "Hot-stamp matte gold foil seal & magnetic catch closures",
    },
  ],
  workflowStages: [
    {
      step: 1,
      phase: "Concept Ideation & 3D Clay Rendering",
      title: "Industrial Design & 3D Modeling",
      duration: "Day 1–3",
      description: "Exploring symbolic sculptural geometry, volumetric proportions, and photorealistic 3D CAD mockups.",
      deliverable: "Photo-Realistic 3D Design Dossier & Material Samples",
    },
    {
      step: 2,
      phase: "Physical Prototype Approval",
      title: "Golden Sample Machining",
      duration: "Day 4–7",
      description: "Machining the single golden prototype with exact laser markings and presentation box for executive sign-off.",
      deliverable: "Physical Golden Sample & Packaging Prototype",
    },
    {
      step: 3,
      phase: "Batch CNC & Laser Inscription",
      title: "Volume Fabrication & Inscription",
      duration: "Day 8–14",
      description: "Batch lapidary polishing, precision CNC hardwood base milling, laser annealing, and serial numbering.",
      deliverable: "Complete Inscribed Milestone Collection",
    },
    {
      step: 4,
      phase: "White-Glove Assembly & Logistics",
      title: "Inspection, Packaging & Dispatch",
      duration: "Day 15–18",
      description: "Cleanroom lint-free glove inspection, bespoke boxing, and individual multi-destination direct dispatch.",
      deliverable: "Crated Shipment with Milestone Recipient Tracking",
    },
  ],
  quickEstimator: {
    unitLabel: "Award Edition",
    startingPrice: 4500,
    dimensionOptions: [
      { id: "compact", label: "Executive Desk Token (6\" height)", dimensions: "4\" × 6\" (10 × 15 cm)", baseMultiplier: 1.0 },
      { id: "standard", label: "Leadership Obelisk (8\" height)", dimensions: "4\" × 8\" (10 × 20 cm)", baseMultiplier: 1.6 },
      { id: "monolith", label: "Founder's Monolith Trophy (12\" height)", dimensions: "5\" × 12\" (12 × 30 cm)", baseMultiplier: 2.8 },
      { id: "plaque", label: "Heritage Wall Plaque (12\"×16\")", dimensions: "12\" × 16\" (30 × 40 cm)", baseMultiplier: 2.4 },
    ],
    materialTiers: [
      { id: "wood-brass", label: "Solid Walnut & Polished Brass Inlay", sublabel: "Organic warm hardwood with gleaming brass accents", multiplier: 1.0, basePrice: 4500 },
      { id: "crystal", label: "K9 Optical Ultra-Pure Crystal Pillar", sublabel: "Faceted gemstone geometry with 3D subsurface laser", multiplier: 1.35, basePrice: 6075 },
      { id: "marble-bronze", label: "Italian Carrara Marble & Gilded Bronze", sublabel: "Heavy luxury stone base with cast metallic medallion", multiplier: 1.75, basePrice: 7875 },
    ],
    finishingAddons: [
      { id: "box", label: "Handcrafted Velvet Presentation Box with Gold Foil", cost: 950 },
      { id: "subsurface", label: "3D Subsurface Volumetric Laser Inscription", cost: 1200 },
      { id: "serial", label: "Individual Serialized Recipient Personalization", cost: 450 },
    ],
    formulaNote: "Volume tier discounts automatically apply at 50+ and 250+ units during RFQ scoping.",
  },
  caseStudies: [
    {
      id: "fintech-founders",
      title: "Global FinTech Founders Recognition Trophies",
      client: "Venture Capital Summit",
      location: "Hyderabad, TS",
      scope: "80 bespoke K9 crystal and solid walnut monoliths with 3D subsurface laser-mapped corporate architecture.",
      outcome: "Awarded to international keynote honorees in hand-bound midnight blue velvet presentation cases.",
      stats: [
        { label: "Awards Crafted", value: "80 Units" },
        { label: "Crystal Clarity", value: "K9 Pure" },
        { label: "Dispatch", value: "100% White-Glove" },
      ],
      spatialAssetTag: "16:9 Crystal Founder Trophy PNG Canvas",
    },
    {
      id: "iim-jubilee",
      title: "IIM Golden Jubilee Commemorative Plaque Program",
      client: "Premier Management Institute",
      location: "Ahmedabad, GJ",
      scope: "1,200 custom-etched jewelers brass medallions mounted in solid rosewood presentation frames for alumni.",
      outcome: "Delivered on-schedule across 18 international alumni hubs with zero transit defect rate.",
      stats: [
        { label: "Program Quantity", value: "1,200 Units" },
        { label: "Material Spec", value: "Rosewood & Brass" },
        { label: "Defect Rate", value: "0.0%" },
      ],
      spatialAssetTag: "16:9 Commemorative Plaque PNG Scene",
    },
  ],
  faq: [
    {
      question: "What is the minimum order quantity for bespoke corporate trophies?",
      answer:
        "While we frequently craft bespoke one-of-a-kind honors for dignitary events, our standard custom production batches typically start at 10 units, scaling smoothly to thousands with substantial volume economies.",
    },
    {
      question: "Can each trophy be individually personalized with recipient names?",
      answer:
        "Yes, our high-speed MOPA laser and CNC diamond dragging systems allow effortless serialized recipient name, achievement title, and date engraving from a supplied spreadsheet.",
    },
    {
      question: "How are the trophies packaged for domestic and international shipping?",
      answer:
        "Each award is seated in a custom-routed high-density EVA foam bed inside a rigid velvet-lined presentation box, which is then shrink-wrapped and packed into heavy double-wall outer shipping cartons.",
    },
    {
      question: "How long does prototype development and production take?",
      answer:
        "Initial 3D photorealistic renderings are delivered within 48 hours. Physical golden prototypes take 5 to 7 business days, with full batch production completing in 10 to 14 business days.",
    },
  ],
  relatedVerticalIds: ["retail-framing", "industrial-cnc", "bespoke-framing"],
};
