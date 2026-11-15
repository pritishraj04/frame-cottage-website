import { ServiceVerticalData } from "./types";

export const spatialSignageData: ServiceVerticalData = {
  id: "spatial-signage",
  title: "Spatial Design & Signage",
  shortName: "Spatial & Signage",
  tagline: "Environmental Branding, Architectural Wayfinding & LED Displays",
  audienceTag: "B2B Architecture & Commercial",
  heroBadge: "Architectural & Commercial Grade",
  description:
    "Transforming built environments into clear, navigable brand experiences. Turnkey spatial signage systems, illuminated architectural monoliths, and tactile ADA directories engineered for enterprise campuses, retail flagships, and hospitality landmarks.",
  heroAssetTag: "4:3 Spatial Signage Asset",
  keyStats: [
    { label: "LED Longevity", value: "50,000 hrs IP67" },
    { label: "Alloy Spec", value: "5052-H32 Aero" },
    { label: "Compliance", value: "ADA & Municipal" },
    { label: "Wind Rating", value: "140 km/h Structural" },
  ],
  keyHighlights: [
    {
      title: "Campus Environmental Wayfinding",
      description: "Cohesive multi-tier navigation systems guiding visitors across complex commercial and university campuses.",
      badge: "Master Planning",
    },
    {
      title: "3D Illuminated LED Channels",
      description: "Energy-efficient halo-lit and forward-illuminated dimensional lettering with IP67 commercial drivers.",
      badge: "Halo & Face-Lit",
    },
    {
      title: "Architectural Pylons & Totems",
      description: "Monolithic exterior pylons with internal structural steel frames engineered for hurricane wind loads.",
      badge: "Wind-Load Certified",
    },
    {
      title: "ADA Compliant Tactile Signs",
      description: "Photopolymer and raster bead Braille interior room identification compliant with international codes.",
      badge: "Accessibility",
    },
  ],
  technicalCapabilities: [
    {
      id: "accu-bend",
      title: "Accu-Bend Automated Letter Bender",
      machine: "Accu-Bend 410 Commercial Flange Bender",
      specs: "Shapes 0.040\" to 0.063\" aluminum strip with zero tooling deformation",
      description:
        "Computer-guided precision bending of channel letter returns with integrated clinching and notch points.",
      badge: "Channel Bending",
      pngPlaceholderText: "3D Channel Letterform PNG",
      hashSlug: "wayfinding",
      aliases: ["accu-bend", "branding", "acoustic"],
    },
    {
      id: "flatbed-uv",
      title: "Direct UV Flatbed Printing",
      machine: "Océ Arizona 6170 High-Definition Flatbed",
      specs: "2.5m × 3.0m print envelope; white ink, spot varnish & textured Braille",
      description:
        "Direct-to-substrate printing on acrylic, dibond, brushed aluminum, and glass with industrial outdoor adhesion.",
      badge: "UV Flatbed",
      pngPlaceholderText: "Direct UV Spatial Panel PNG",
      hashSlug: "illuminated-led",
      aliases: ["flatbed-uv", "led", "ada"],
    },
    {
      id: "vacuum-former",
      title: "Industrial Acrylic Vacuum Former",
      machine: "Formech 2440 Industrial Thermoformer",
      specs: "Deep-draw vacuum molding up to 600mm draw depth",
      description:
        "Seamless curved 3D acrylic faces and light diffusers engineered for high-impact commercial outdoor signs.",
      badge: "Thermoforming",
      pngPlaceholderText: "Molded Acrylic Face PNG",
      hashSlug: "pylons",
      aliases: ["vacuum-former", "totems"],
    },
    {
      id: "tig-mig",
      title: "Architectural Tig/Mig Welding Station",
      machine: "Miller Dynasty 400 Multiprocess TIG",
      specs: "AWS D1.2 certified aluminum and stainless structural welding",
      description:
        "Seamless grind-and-polish corners for high-end hotel lobby totems and architectural entrance canopies.",
      badge: "Structural Welding",
      pngPlaceholderText: "Welded Monolith Totem PNG",
      hashSlug: "metalworks",
      aliases: ["tig-mig", "welding", "structural"],
    },
  ],
  materialSpecs: [
    {
      category: "Architectural Aluminum",
      specification: "5052-H32 Marine Sheet & 6063-T5 Structural Extrusions",
      toleranceGrade: "ASTM B209 / ±0.2 mm precision sheared and CNC routed",
      finishStandard: "AkzoNobel Interpon D2525 architectural powder coat (20-yr warranty)",
    },
    {
      category: "Commercial LED Modules",
      specification: "Samsung & OSRAM SMD 2835 IP67 Waterproof Modules",
      toleranceGrade: "L70 > 50,000 operating hours / 6500K / 4000K / 3000K CCT",
      finishStandard: "MeanWell HLG Class 2 power supply with thermal overload protection",
    },
    {
      category: "Signage Polymers",
      specification: "Cast Plexiglas® Satinice, Polycast® UV-Shield Acrylic, Makrolon® Polycarbonate",
      toleranceGrade: "Impact resistance 250× glass / UV stabilized against yellowing",
      finishStandard: "Matte velvet anti-glare face, CNC polished crystal clear edge",
    },
    {
      category: "Tactile Components",
      specification: "Grade 2 Raster Braille spheres & solid brass / acrylic tactile text",
      toleranceGrade: "ADA Title III / ANSI A117.1 compliant height & spacing",
      finishStandard: "Embedded mechanical interference fit; tamper-proof bond",
    },
  ],
  workflowStages: [
    {
      step: 1,
      phase: "Wayfinding Audit & Spatial Strategy",
      title: "Pedestrian Flow & Site Analysis",
      duration: "Week 1",
      description: "Sightline modeling, building code review, circulation mapping, and signage location planning.",
      deliverable: "Comprehensive Wayfinding Sign Schedule & Master Plan",
    },
    {
      step: 2,
      phase: "Parametric CAD & Structural Design",
      title: "Structural Engineering & PE Stamping",
      duration: "Week 2–3",
      description: "Wind load calculations, electrical schematics, foundation anchor bolt layouts, and 3D renderings.",
      deliverable: "Stamped Engineering Drawings & Material Submittals",
    },
    {
      step: 3,
      phase: "Precision CNC Fabrication",
      title: "Laser Cutting, Welding & Powder Coating",
      duration: "Week 4–6",
      description: "5-axis laser cutting, brake forming, TIG welding, electrostatic coating, and LED burn-in testing.",
      deliverable: "Factory-Tested Architectural Signage Assemblies",
    },
    {
      step: 4,
      phase: "Turnkey Installation & Handover",
      title: "On-Site Rigging & Power Commissioning",
      duration: "Week 7",
      description: "Boom truck rigging, epoxy concrete anchoring, electrical tie-in, and municipal sign-off.",
      deliverable: "Turnkey Signage System & As-Built Documentation",
    },
  ],
  quickEstimator: {
    unitLabel: "Signage Package",
    startingPrice: 8500,
    dimensionOptions: [
      { id: "plaque", label: "Tactile ADA Plaque (8\"×8\")", dimensions: "8\" × 8\" (20 × 20 cm)", baseMultiplier: 1.0 },
      { id: "blade", label: "Projecting Blade Sign (16\"×24\")", dimensions: "16\" × 24\" (40 × 60 cm)", baseMultiplier: 2.8 },
      { id: "halo", label: "Halo-Lit Dimensional Logo (4ft span)", dimensions: "48\" × 24\" (120 × 60 cm)", baseMultiplier: 6.2 },
      { id: "monolith", label: "Exterior Monolith Totem (8ft height)", dimensions: "36\" × 96\" (90 × 240 cm)", baseMultiplier: 14.5 },
    ],
    materialTiers: [
      { id: "aluminum", label: "Architectural Powder-Coated Aluminum", sublabel: "Durable marine alloy in custom RAL palette", multiplier: 1.0, basePrice: 8500 },
      { id: "steel", label: "Brushed 316 Stainless Steel", sublabel: "Horizontal satin hairline with titanium gold PVD", multiplier: 1.45, basePrice: 12300 },
      { id: "brass", label: "Solid C360 Brass & Bronze Patina", sublabel: "Hand-patinated antique statuary bronze finish", multiplier: 1.9, basePrice: 16150 },
    ],
    finishingAddons: [
      { id: "led", label: "Samsung IP67 LED Modules & MeanWell Driver", cost: 3500 },
      { id: "braille", label: "ADA Grade 2 Tactile Braille Inlay", cost: 1200 },
      { id: "rigging", label: "Heavy Structural Mounting Brackets & Cleats", cost: 2200 },
    ],
    formulaNote: "Estimates exclude on-site crane rigging and local municipal permit fees.",
  },
  caseStudies: [
    {
      id: "cybercity-campus",
      title: "Cybercity Tech Park Campus Identity",
      client: "Global Commercial Real Estate REIT",
      location: "Bengaluru, KA",
      scope: "Turnkey spatial identity across 3 towers including entrance totems, 180 room signs, and cafeteria branding.",
      outcome: "Delivered unified architectural wayfinding with IP67 halo illumination and 100% ADA compliance.",
      stats: [
        { label: "Signs Fabricated", value: "240 Units" },
        { label: "Campus Footprint", value: "1.2M sq.ft." },
        { label: "LED Warranty", value: "5 Years" },
      ],
      spatialAssetTag: "16:9 Campus Wayfinding Monolith PNG",
    },
    {
      id: "grand-hyatt",
      title: "Grand Hyatt Resort Atrium Wayfinding",
      client: "Hospitality Development Group",
      location: "Goa",
      scope: "Coastal-resistant wayfinding totems fabricated in 316 marine stainless and cast acrylic.",
      outcome: "Withstood heavy coastal monsoon humidity without corrosion using PVDF architectural clear coatings.",
      stats: [
        { label: "Marine Rating", value: "316 Stainless" },
        { label: "Totem Height", value: "2.8 Meters" },
        { label: "Salt-Spray Tested", value: "2,000 Hours" },
      ],
      spatialAssetTag: "16:9 Resort Atrium Signage PNG Canvas",
    },
  ],
  faq: [
    {
      question: "Do you handle complete on-site installation and municipal permits?",
      answer:
        "Yes. We offer turnkey services including structural engineering calculations, municipal permit coordination, foundation concrete anchor engineering, crane rigging, and licensed electrical tie-in.",
    },
    {
      question: "What warranties do you provide on exterior LED signs?",
      answer:
        "Our exterior LED signage features an industry-leading 5-year warranty on commercial IP67 Samsung/OSRAM LED modules and MeanWell power supplies, alongside a 10-year warranty on architectural powder-coated finishes.",
    },
    {
      question: "Can you match exact architectural brand colors and finishes?",
      answer:
        "Yes, we formulate coatings to exact Pantone, RAL, and custom architect swatch matches, utilizing AkzoNobel Interpon architectural powders and fluoropolymer PVDF systems.",
    },
    {
      question: "What is your typical lead time for a corporate campus sign system?",
      answer:
        "Standard multi-building wayfinding programs typically require 2 to 3 weeks for spatial audit and shop drawings, followed by 3 to 5 weeks for manufacturing, with phased on-site installation.",
    },
  ],
  relatedVerticalIds: ["industrial-cnc", "civic-projects", "bespoke-framing"],
};
