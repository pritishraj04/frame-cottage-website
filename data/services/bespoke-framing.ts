import { ServiceVerticalData } from "./types";

export const bespokeFramingData: ServiceVerticalData = {
  id: "bespoke-framing",
  title: "Bespoke Art & Custom Framing",
  shortName: "Bespoke Framing",
  tagline: "Fine Art Printing, Canvas Stretching & Archival Preservation",
  audienceTag: "B2C / B2B Curation",
  heroBadge: "Fine Art & Gallery Atelier",
  description:
    "Gallery-standard conservation framing for irreplaceable originals, heritage heirlooms, and fine art giclées. Hand-planed splines, reversible archival mounts, and museum glass engineered for museum exhibitions and discerning collectors.",
  heroAssetTag: "4:3 Bespoke Art Atelier Asset",
  keyStats: [
    { label: "Color Gamut", value: "12-Color Giclée" },
    { label: "Reversibility", value: "100% Archival" },
    { label: "UV Cutoff", value: "99.2% Barrier" },
    { label: "Joinery", value: "Hand-Keyed Splines" },
  ],
  keyHighlights: [
    {
      title: "12-Color Archival Giclée",
      description: "Pigment mineral inks on Hahnemühle 310gsm German Etching paper with 200-year colorfastness.",
      badge: "2400 DPI",
    },
    {
      title: "Contrasting Wood Splines",
      description: "Hand-cut mortise corner keys in American walnut and maple for superior mechanical shear strength.",
      badge: "Artisan Joinery",
    },
    {
      title: "100% Reversible Preservation",
      description: "Pure Japanese mulberry paper hinges and wheat starch paste compliant with museum standards.",
      badge: "Non-Invasive",
    },
    {
      title: "Canvas Floater Profiles",
      description: "Custom deep-rabbet floater frames giving stretched canvases an architectural floating margin.",
      badge: "Deep Cavity",
    },
  ],
  technicalCapabilities: [
    {
      id: "epson-giclee",
      title: "Epson SureColor P20000 64\" Printer",
      machine: "Epson UltraChrome PRO 12-Color System",
      specs: "2.64-inch PrecisionCore MicroTFP printheads; 2400 × 1200 DPI",
      description:
        "Archival mineral pigment printing rendering ultra-wide gamut and subtle tonal gradations for fine art reproductions.",
      badge: "Master Printing",
      pngPlaceholderText: "Epson P20000 Giclée Print PNG",
      hashSlug: "giclee",
      aliases: ["epson-giclee", "prints"],
    },
    {
      id: "spline-joiner",
      title: "Custom Spline Milling Jig",
      machine: "Festool Domino & Custom CNC Mortiser",
      specs: "Sub-millimeter routing of dual hardwood corner keys",
      description:
        "Corner splines lock oversized gallery frames against torsional bowing and deflection under heavy glass weights.",
      badge: "Master Joinery",
      pngPlaceholderText: "Hardwood Corner Spline PNG",
      hashSlug: "joinery",
      aliases: ["spline-joiner", "hardwood-splines"],
    },
    {
      id: "canvas-tensioner",
      title: "Pneumatic Canvas Stretching Bench",
      machine: "MasterClamp Air-Assisted Bench",
      specs: "Controlled 25-50 PSI perimeter pull across 3m x 2m frames",
      description:
        "Uniform warp-and-weft tensioning on kiln-dried Baltic birch stretcher bars prevents canvas sagging over decades.",
      badge: "Canvas Atelier",
      pngPlaceholderText: "Canvas Floater Profile PNG",
      hashSlug: "canvas-floater",
      aliases: ["canvas-tensioner", "canvas", "floater"],
    },
    {
      id: "conservation-table",
      title: "Museum Conservation Hinging Table",
      machine: "Controlled RH Light Table",
      specs: "Japanese Mulberry paper (Kozo) & refined wheat starch adhesive",
      description:
        "All mounting attachments can be safely dissolved and reversed with de-ionized water without contacting the art.",
      badge: "Conservation",
      pngPlaceholderText: "Japanese Paper Hinge PNG",
      hashSlug: "conservation",
      aliases: ["conservation-table", "museum-mounting"],
    },
  ],
  materialSpecs: [
    {
      category: "Fine Art Papers",
      specification: "Hahnemühle German Etching 310gsm & Photo Rag 308gsm",
      toleranceGrade: "100% Cotton Rag / Zero OBA / Acid-Free ISO 9706",
      finishStandard: "Matte textured surface with natural warm white tone",
    },
    {
      category: "Museum Glazing",
      specification: "TruVue® Museum Glass® & Optium Museum Acrylic®",
      toleranceGrade: "99% UV Light Absorption / <0.5% Surface Reflection",
      finishStandard: "Magnetron-sputtered anti-reflective optical coatings",
    },
    {
      category: "Wood Species",
      specification: "Select Black Walnut, Hard Maple, Cherry, White Oak",
      toleranceGrade: "Hand-selected FAS furniture-grade timber",
      finishStandard: "Hand-rubbed organic beeswax, ebonized wash, or raw oil",
    },
    {
      category: "Stretcher Bars",
      specification: "Kiln-dried Nordic Baltic Birch with expansion bevels",
      toleranceGrade: "45mm & 60mm deep gallery profiles with corner wedges",
      finishStandard: "Sanded smooth, splinter-free rounded edge profile",
    },
  ],
  workflowStages: [
    {
      step: 1,
      phase: "Curatorial Consultation",
      title: "Artwork Assessment & Treatment Plan",
      duration: "Day 1–2",
      description: "Medium examination, depth assessment, paper cockling check, and glazing selection.",
      deliverable: "Curatorial Conservation Dossier",
    },
    {
      step: 2,
      phase: "Artisan Joinery & Milling",
      title: "Custom Splined Hardwood Milling",
      duration: "Day 3–4",
      description: "Dimensioning profile stock, routing corner splines, and hand applying artisanal finishes.",
      deliverable: "Hand-Finished Bespoke Timber Frame",
    },
    {
      step: 3,
      phase: "Archival Mounting & Glazing",
      title: "Reversible Japanese Paper Hinging",
      duration: "Day 5–6",
      description: "Adhering archival hinges, cutting spacers, and installing TruVue Museum Glass.",
      deliverable: "Fully Preserved, Sealed Archival Package",
    },
    {
      step: 4,
      phase: "Exhibition Preparation",
      title: "Crated Packaging & Handover",
      duration: "Day 7",
      description: "Custom foam-lined archival crate with hanging hardware and authenticity certificate.",
      deliverable: "Museum-Ready Artwork Package",
    },
  ],
  quickEstimator: {
    unitLabel: "Bespoke Commission",
    startingPrice: 3200,
    dimensionOptions: [
      { id: "medium", label: "Studio (16\"×24\")", dimensions: "16\" × 24\" (40 × 60 cm)", baseMultiplier: 1.0 },
      { id: "large", label: "Gallery (24\"×36\")", dimensions: "24\" × 36\" (60 × 90 cm)", baseMultiplier: 1.8 },
      { id: "monumental", label: "Exhibition (36\"×48\")", dimensions: "36\" × 48\" (90 × 120 cm)", baseMultiplier: 2.9 },
      { id: "museum", label: "Museum Scale (48\"×72\")", dimensions: "48\" × 72\" (120 × 180 cm)", baseMultiplier: 4.5 },
    ],
    materialTiers: [
      { id: "maple", label: "Solid Canadian Hard Maple", sublabel: "Creamy white close grain with satin wax", multiplier: 1.0, basePrice: 3200 },
      { id: "oak", label: "Fumed Quartersawn White Oak", sublabel: "Hand-fumed antique architectural grain", multiplier: 1.25, basePrice: 4000 },
      { id: "walnut", label: "Exhibition Grade Black Walnut", sublabel: "Contrasting maple splines & beeswax finish", multiplier: 1.5, basePrice: 4800 },
    ],
    finishingAddons: [
      { id: "museum-glass", label: "TruVue® Museum Glass® (<0.5% Reflection)", cost: 1400 },
      { id: "floater", label: "Deep-Cavity Canvas Floater Spacing", cost: 950 },
      { id: "splines", label: "Contrasting Handcrafted Hardwood Splines", cost: 800 },
    ],
    formulaNote: "Estimates include reversible archival mounting and conservation barrier backing.",
  },
  caseStudies: [
    {
      id: "national-gallery",
      title: "Modern Masters Retrospective Exhibition",
      client: "Contemporary Art Foundation",
      location: "New Delhi",
      scope: "48 modernist oil on canvas works requiring bespoke floating frames and conservation protection.",
      outcome: "Fabricated custom deep-cavity Walnut floaters with TruVue Optium acrylic for loan exhibition.",
      stats: [
        { label: "Artworks Framed", value: "48 Originals" },
        { label: "Turnaround", value: "14 Days" },
        { label: "Preservation", value: "100% Reversible" },
      ],
      spatialAssetTag: "16:9 Gallery Exhibition PNG Scene",
    },
    {
      id: "heritage-miniature",
      title: "18th-Century Rajasthani Miniatures",
      client: "Private Heritage Trust",
      location: "Jaipur, RJ",
      scope: "Rare gouache on wasli paper folios requiring complete hermetic sealing and microclimate buffering.",
      outcome: "Encapsulated in 8-ply cotton rag mats with Japanese kozo hinges and Museum Glass.",
      stats: [
        { label: "Artifact Age", value: "240+ Years" },
        { label: "Glazing Spec", value: "Museum Glass" },
        { label: "Invasive Contact", value: "0% Direct" },
      ],
      spatialAssetTag: "16:9 Archival Miniature PNG Canvas",
    },
  ],
  faq: [
    {
      question: "What makes bespoke framing different from standard retail framing?",
      answer:
        "Bespoke framing is completely custom-engineered for individual artworks. It incorporates hand-cut corner splines, custom-planed wood profiles, 100% reversible Japanese paper hinging, and specialized glazing like TruVue Museum Glass.",
    },
    {
      question: "Will the mounting process damage my original artwork?",
      answer:
        "Never. We follow strict museum conservation ethics. Only acid-free, non-invasive hinging using Japanese mulberry paper and pure wheat starch paste is used, which can be effortlessly reversed decades later without leaving a trace.",
    },
    {
      question: "Can you stretch and frame oversized rolled canvases?",
      answer:
        "Yes, we build custom heavy-duty Baltic birch stretcher bars up to 12 feet long with cross-bracing and corner expansion wedges, finished with bespoke hardwood floater frames.",
    },
    {
      question: "How does Museum Glass® eliminate reflections?",
      answer:
        "TruVue Museum Glass uses multi-layer magnetron sputtering to deposit micro-thin metal oxides on both surfaces, reducing light reflection to less than 0.5% while filtering 99% of damaging UV rays.",
    },
  ],
  relatedVerticalIds: ["retail-framing", "spatial-signage", "custom-gifting"],
};
