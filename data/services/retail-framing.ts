import { ServiceVerticalData } from "./types";

export const retailFramingData: ServiceVerticalData = {
  id: "retail-framing",
  title: "Retail & Standard Framing",
  shortName: "Retail Framing",
  tagline: "Comprehensive Ready-Made & Residential Framing Displays",
  audienceTag: "B2C Residential",
  heroBadge: "Residential & Retail Collection",
  description:
    "Archival craftsmanship meets ready-made ease. Precision-milled solid hardwood frames, gallery wall alignments, and conservation mats engineered to elevate residential spaces with lifelong clarity and effortless installation.",
  heroAssetTag: "4:3 Spatial Frame Asset",
  keyStats: [
    { label: "Turnaround", value: "3–5 Days" },
    { label: "UV Protection", value: "99% TruVue®" },
    { label: "Mat Core", value: "100% Acid-Free" },
    { label: "Wood Grading", value: "FSC® Hardwood" },
  ],
  keyHighlights: [
    {
      title: "Precision Mitred Hardwoods",
      description: "Appalachian Walnut, White Oak, and Ash milled to sub-millimeter tolerances.",
      badge: "Solid Core",
    },
    {
      title: "Museum Conservation Mats",
      description: "Alpha-cellulose and 100% cotton rag 4-ply matboards that will never yellow art.",
      badge: "pH 8.5 Buffered",
    },
    {
      title: "TruVue® Conservation Glazing",
      description: "Optical-grade acrylic shielding against 99% of harmful ambient UV wavelengths.",
      badge: "Anti-Fade",
    },
    {
      title: "Instant Hang Rigging",
      description: "Pre-installed stainless braided wire and heavy-duty brass French cleats.",
      badge: "Ready-To-Hang",
    },
  ],
  technicalCapabilities: [
    {
      id: "underpinner",
      title: "Cassese Pneumatic Underpinner",
      machine: "Cassese CS-299M XL Joining System",
      specs: "Pneumatic 8-Bar V-nail indexing; mitre gap tolerance < 0.1mm",
      description:
        "High-pressure V-nail insertion ensuring unbreakable mechanical corners without surface staple marring.",
      badge: "Joining Station",
      pngPlaceholderText: "Underpinner / Corner Spline PNG",
      hashSlug: "ready-made",
      aliases: ["underpinner", "joinery"],
    },
    {
      id: "mat-cutter",
      title: "Computerized Mat Cutter (CMC)",
      machine: "Valiani Ultra-V Multi-Head CNC",
      specs: "45° & 90° bevel cuts; 0.05mm step resolution up to 40\"×60\"",
      description:
        "Micro-stepper controlled cutter producing museum-grade multi-aperture gallery mats with sharp, clean corners.",
      badge: "Precision Cutting",
      pngPlaceholderText: "Valiani CMC Mat Sample PNG",
      hashSlug: "archival-mats",
      aliases: ["mat-cutter", "mats"],
    },
    {
      id: "glazing-cutter",
      title: "Multi-Material Glazing Shear",
      machine: "Fletcher-Terry 3100 Wall System",
      specs: "Diamond scoring wheel & acrylic scoring blade up to 6mm thick",
      description:
        "Clean, chip-free scoring of TruVue conservation glass and Optium acrylic with zero optical distortion.",
      badge: "Optics Processing",
      pngPlaceholderText: "TruVue Glazing Sample PNG",
      hashSlug: "tabletop",
      aliases: ["glazing-cutter", "easel"],
    },
    {
      id: "cleanroom-assembly",
      title: "Hermetic Cleanroom Assembly",
      machine: "Static-Free HEPA Laminar Station",
      specs: "Class 10,000 particulate filtration with de-ionizing air blowers",
      description:
        "Hermetic sealing with acid-free Tyvek dust covers prevents environmental particulate ingress for decades.",
      badge: "Preservation",
      pngPlaceholderText: "Cleanroom Assembly Bench PNG",
      hashSlug: "gallery-kits",
      aliases: ["cleanroom-assembly", "modular-kits"],
    },
  ],
  materialSpecs: [
    {
      category: "Moulding Hardwoods",
      specification: "Appalachian Black Walnut, Quartersawn White Oak, European Beech",
      toleranceGrade: "FSC® 100% Certified / Kiln-Dried MC 6-8%",
      finishStandard: "Organic Danish oil, natural beeswax, low-VOC satin lacquer",
    },
    {
      category: "Conservation Glazing",
      specification: "TruVue® Conservation Clear UV99 & Museum Glass® Anti-Reflective",
      toleranceGrade: "99% UV Block (300-380nm) / <1% Light Reflection",
      finishStandard: "Optically clear scratch-resistant pyrolytic coating",
    },
    {
      category: "Museum Matboards",
      specification: "Crescent RagMat® 100% Cotton & Bainbridge Artcare™ MicroChamber®",
      toleranceGrade: "4-ply (1.4mm) & 8-ply (2.8mm) / pH 8.5 Alkaline Reserve",
      finishStandard: "Solid color core, non-bleeding archival pigments",
    },
    {
      category: "Rigging Hardware",
      specification: "Zinc-plated D-rings, coated braided stainless steel aircraft wire",
      toleranceGrade: "Rated to 50 kg static load capacity per anchor point",
      finishStandard: "Anti-corrosion passivated brass and stainless steel",
    },
  ],
  workflowStages: [
    {
      step: 1,
      phase: "Artwork & Sizing Audit",
      title: "Dimension & Conservation Check",
      duration: "Day 1",
      description: "Digital scanning, paper weight assessment, and optimal border margin calculation.",
      deliverable: "Digital Frame Mockup & Specification Ticket",
    },
    {
      step: 2,
      phase: "Precision Milling & Mitre",
      title: "Hardwood Milling & V-Nailing",
      duration: "Day 2",
      description: "Dual-blade 45° mitre sawing, pneumatic V-nail corner indexing, and hand sanding.",
      deliverable: "True-Square Milled Hardwood Chassis",
    },
    {
      step: 3,
      phase: "Cleanroom Mounting & Fitting",
      title: "Archival Matting & Glazing",
      duration: "Day 3–4",
      description: "Computerized mat bevel cutting, reversible photo hinging, and de-ionized assembly.",
      deliverable: "Sealed Dust-Proof Display Unit",
    },
    {
      step: 4,
      phase: "Packaging & Delivery",
      title: "White-Glove Doorstep Delivery",
      duration: "Day 5",
      description: "Edge-protected rigid boxing with included installation hardware and hanging level.",
      deliverable: "Ready-to-Hang Studio Presentation Box",
    },
  ],
  quickEstimator: {
    unitLabel: "Frame Display",
    startingPrice: 1800,
    dimensionOptions: [
      { id: "a4", label: "Small (A4 / 8\"×10\")", dimensions: "8\" × 10\" (20 × 25 cm)", baseMultiplier: 1.0 },
      { id: "a3", label: "Medium (A3 / 12\"×18\")", dimensions: "12\" × 18\" (30 × 45 cm)", baseMultiplier: 1.6 },
      { id: "a2", label: "Large (A2 / 18\"×24\")", dimensions: "18\" × 24\" (45 × 60 cm)", baseMultiplier: 2.5 },
      { id: "a1", label: "Gallery Oversize (24\"×36\")", dimensions: "24\" × 36\" (60 × 90 cm)", baseMultiplier: 3.8 },
    ],
    materialTiers: [
      { id: "ash", label: "Natural Appalachian Ash", sublabel: "Minimalist Scandinavian matte grain", multiplier: 1.0, basePrice: 1800 },
      { id: "oak", label: "Quartersawn White Oak", sublabel: "Classic architectural flaked grain", multiplier: 1.3, basePrice: 2350 },
      { id: "walnut", label: "Select American Walnut", sublabel: "Deep rich natural chocolate tones", multiplier: 1.6, basePrice: 2900 },
    ],
    finishingAddons: [
      { id: "uv99", label: "TruVue® UV99 Conservation Acrylic", cost: 650 },
      { id: "8ply", label: "Upgrade to 8-Ply Museum Bevel Mat", cost: 500 },
      { id: "cleat", label: "Heavy-Duty Brass French Cleat Rigging", cost: 400 },
    ],
    formulaNote: "Estimates calculated with 100% solid hardwood and acid-free backing. Excludes local shipping.",
  },
  caseStudies: [
    {
      id: "malabar-gallery",
      title: "The Malabar Hill Private Salon Gallery",
      client: "Private Residential Client",
      location: "Mumbai, MH",
      scope: "32-piece salon collection featuring family historical prints and botanical art.",
      outcome: "Harmonized diverse print sizes into unified Appalachian Walnut frames with 8-ply cotton mats.",
      stats: [
        { label: "Frames Produced", value: "32 Units" },
        { label: "Completion Time", value: "7 Days" },
        { label: "UV Protection", value: "99% TruVue" },
      ],
      spatialAssetTag: "16:9 Salon Gallery PNG Canvas",
    },
    {
      id: "koregaon-living",
      title: "Koregaon Park Residence Monolith",
      client: "Architectural Interior Project",
      location: "Pune, MH",
      scope: "Single oversized 60\"×40\" centerpiece photograph in an ultra-slim white oak profile.",
      outcome: "Installed with zero optical glare using Optium Museum Acrylic and concealed French cleat.",
      stats: [
        { label: "Dimensions", value: "60\" × 40\"" },
        { label: "Glazing Spec", value: "TruVue Optium" },
        { label: "Frame Profile", value: "15mm Slimline" },
      ],
      spatialAssetTag: "16:9 Living Room Canvas Scene",
    },
  ],
  faq: [
    {
      question: "What is the difference between standard glass and TruVue® UV99 acrylic?",
      answer:
        "Standard glass blocks less than 45% of UV rays and is prone to shatter. TruVue® Conservation Acrylic blocks 99% of harmful UV wavelengths, is 50% lighter, and is virtually shatterproof, ensuring total safety for residential walls.",
    },
    {
      question: "Are your mats truly acid-free and museum-safe?",
      answer:
        "Yes. We exclusively use alpha-cellulose and 100% cotton rag matboards with a 3-5% calcium carbonate alkaline buffer (pH 8.5). They never leach acid, preventing print yellowing and edge discoloration permanently.",
    },
    {
      question: "Can I bring my own art or digital photos?",
      answer:
        "Absolutely. You can drop off physical artworks at our studio atelier or upload high-resolution digital files for our fine art giclée printing service prior to framing.",
    },
    {
      question: "How long does standard retail framing take?",
      answer:
        "Ready-made inventory frames ship within 48 hours. Custom-sized retail frames are typically handcrafted, assembled, and dispatched within 3 to 5 business days.",
    },
  ],
  relatedVerticalIds: ["bespoke-framing", "custom-gifting", "spatial-signage"],
};
