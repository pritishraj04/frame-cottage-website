import { ServiceVerticalData } from "./types";

export const civicProjectsData: ServiceVerticalData = {
  id: "civic-projects",
  title: "Government & Civic Projects",
  shortName: "Civic & Government",
  tagline: "Public Sector Contracts, Municipal Signage & Civic Memorials",
  audienceTag: "Public Sector & GeM Tenders",
  heroBadge: "Public Sector & Tender Certified",
  description:
    "Executing public sector mandates with unwavering integrity, compliance, and industrial durability. GeM-certified tender fulfillment, vandal-resistant civic monuments, public infrastructure signage, and dignitary portraiture crafted to withstand generations of civic life.",
  heroAssetTag: "4:3 Civic Projects & Memorials Asset",
  keyStats: [
    { label: "GeM Status", value: "Verified Vendor" },
    { label: "Outdoor Rating", value: "50-Year Longevity" },
    { label: "Standards", value: "ISO 9001:2015" },
    { label: "Vandal Grade", value: "Anti-Graffiti IK10" },
  ],
  keyHighlights: [
    {
      title: "GeM Tender Qualified Execution",
      description: "Full compliance with Government e-Marketplace procurement, earnest money deposit guarantees, and e-bidding.",
      badge: "GeM Certified",
    },
    {
      title: "50-Year Outdoor Longevity",
      description: "Structural 316 marine stainless steel, cast silicon bronze, and anti-graffiti ceramic clearcoats.",
      badge: "Heavy Duty",
    },
    {
      title: "Vandal-Resistant Urban Infrastructure",
      description: "Tamper-proof security pin-torx hardware, IK10 impact-rated polycarbonate, and non-porous coatings.",
      badge: "IK10 Impact",
    },
    {
      title: "Dignitary & Constitutional Framing",
      description: "Hermetically sealed, nitrogen-purged microclimate preservation frames for public charters and state portraits.",
      badge: "State Archives",
    },
  ],
  technicalCapabilities: [
    {
      id: "submerged-welding",
      title: "Heavy Submerged Arc & Structural Rigging",
      machine: "Lincoln Electric Submerged Arc System",
      specs: "AWS D1.1 structural welding for 10-meter outdoor public pylons & memorial arches",
      description:
        "Full-penetration welds inspected via ultrasonic and radiography testing for high-traffic public installations.",
      badge: "Structural Fab",
      pngPlaceholderText: "Heavy Structural Welding Joint PNG",
    },
    {
      id: "anti-graffiti",
      title: "Vandal-Resistant Ceramic Clear Coating",
      machine: "Cross-Linked Fluoropolymer Enamel Booth",
      specs: "ASTM D6578 graffiti resistance; withstands harsh solvent washdowns 500+ times",
      description:
        "Permanent chemical shield preventing aerosol spray paints, permanent markers, and stickers from bonding to surfaces.",
      badge: "Anti-Graffiti",
      pngPlaceholderText: "Anti-Graffiti Coated Monolith PNG",
    },
    {
      id: "hydraulic-stamping",
      title: "Heavy Hydraulic Stamping & Forming",
      machine: "500-Ton Hydraulic Coining Press",
      specs: "Deep relief dimensional state emblems and municipal seal coining",
      description:
        "High-definition cold coining of solid bronze and brass national emblems for judicial and civic facades.",
      badge: "Civic Coining",
      pngPlaceholderText: "Cast Bronze Civic Emblem PNG",
    },
    {
      id: "microclimate-casework",
      title: "Hermetic Microclimate Display Enclosures",
      machine: "Inert Gas Purged Sealed Conservation Vitrines",
      specs: "Leak rate < 0.05 air changes per day; internal silica gel relative humidity buffering",
      description:
        "Preserves original constitution copies, treaties, and historical civic declarations in sealed nitrogen atmospheres.",
      badge: "State Archives",
      pngPlaceholderText: "Hermetic Archive Vitrine PNG",
    },
  ],
  materialSpecs: [
    {
      category: "Heavy Structural Steels",
      specification: "IS 2062 Grade E250 / IS 1239 Heavy Tube / 316 Marine Stainless Steel",
      toleranceGrade: "Ultrasonic tested plates; hot-dip galvanized to ASTM A123 (>85 microns)",
      finishStandard: "Marine polyurethane epoxy enamel or bead-blasted satin stainless",
    },
    {
      category: "Cast Bronze Alloys",
      specification: "UNS C83600 Leaded Gunmetal Bronze & Silicon Bronze",
      toleranceGrade: "Sand cast and investment cast with zero shrinkage porosity",
      finishStandard: "Traditional statuary brown chemical patina with microcrystalline wax",
    },
    {
      category: "Retroreflective Sheetings",
      specification: "3M™ Diamond Grade™ DG3 Series 4000 Retroreflective Sheeting",
      toleranceGrade: "ASTM D4956 Type XI / Extreme wide-angle reflectivity for municipal roads",
      finishStandard: "Digitally matched overlay film with 12-year outdoor field warranty",
    },
    {
      category: "Security Fasteners",
      specification: "A4-80 (316 Marine) Tamper-Proof Pin-Torx & Kinmar Security Nuts",
      toleranceGrade: "Torque-breakaway shear nuts preventing unauthorized municipal removal",
      finishStandard: "Passivated anti-galling thread treatment",
    },
  ],
  workflowStages: [
    {
      step: 1,
      phase: "Tender Bid Qualification & Audit",
      title: "GeM E-Tender Specification Verification",
      duration: "Week 1–2",
      description: "Public tender compliance review, EMD submission, BoQ itemization, and municipal site inspection.",
      deliverable: "Qualified Technical Bid Dossier & E-Bidding Approval",
    },
    {
      step: 2,
      phase: "Structural Engineering & PE Certification",
      title: "Civil Foundation & Wind Load Analysis",
      duration: "Week 3–4",
      description: "Structural PE stamp, foundation soil depth calculations, seismic compliance, and prototype sample review.",
      deliverable: "Stamped Civil Engineering & Foundation Drawings",
    },
    {
      step: 3,
      phase: "Heavy Industrial Fabrication & Testing",
      title: "Structural Welding & Anti-Graffiti Coating",
      duration: "Week 5–8",
      description: "Certified welding, hot-dip galvanizing, NDT weld inspections, coining of municipal seals, and factory audit.",
      deliverable: "Factory Inspection Clearance & NDT Test Reports",
    },
    {
      step: 4,
      phase: "Civil Rigging, Installation & Handover",
      title: "On-Site Civil Erection & Certification",
      duration: "Week 9–10",
      description: "Foundation casting, crane hoisting, torque verification, electrical solar tie-in, and municipal handover sign-off.",
      deliverable: "Final Completion Handover Certificate & As-Built Records",
    },
  ],
  quickEstimator: {
    unitLabel: "Civic Scope",
    startingPrice: 25000,
    dimensionOptions: [
      { id: "plaque", label: "Official Civic Dedication Plaque (18\"×24\")", dimensions: "18\" × 24\" (45 × 60 cm)", baseMultiplier: 1.0 },
      { id: "portrait", label: "State Chamber Dignitary Portrait Frame", dimensions: "36\" × 48\" (90 × 120 cm)", baseMultiplier: 1.8 },
      { id: "totem", label: "Municipal Urban Wayfinding Monolith (10ft)", dimensions: "36\" × 120\" (90 × 300 cm)", baseMultiplier: 4.8 },
      { id: "memorial", label: "Civic Memorial & Public Monument Assembly", dimensions: "Multi-Node Installation", baseMultiplier: 9.5 },
    ],
    materialTiers: [
      { id: "marine-steel", label: "316 Marine Stainless Steel (Anti-Graffiti)", sublabel: "Corrosion-proof with IK10 impact polycarbonate", multiplier: 1.0, basePrice: 25000 },
      { id: "cast-bronze", label: "Cast Architectural Silicon Bronze & Granite", sublabel: "Classic statuary patina with flamed granite pedestal", multiplier: 1.4, basePrice: 35000 },
      { id: "hermetic", label: "Hermetic Inert Gas Microclimate Enclosure", sublabel: "Nitrogen-purged archival vitrine with optical laminated glass", multiplier: 1.85, basePrice: 46250 },
    ],
    finishingAddons: [
      { id: "security", label: "Tamper-Proof Kinmar A4-80 Fastener Hardware", cost: 3500 },
      { id: "solar", label: "Integrated Solar Photovoltaic Night Illumination", cost: 12500 },
      { id: "pe-stamp", label: "Structural Civil PE Stamped Calculation Dossier", cost: 8500 },
    ],
    formulaNote: "Tender prices are subject to formal BoQ itemization and GeM statutory price benchmarks.",
  },
  caseStudies: [
    {
      id: "state-high-court",
      title: "State High Court Heritage Charter Preservation",
      client: "State Judicial Department",
      location: "Patna, BR",
      scope: "Hermetically sealed nitrogen-inert microclimate vitrines for century-old judicial charter documents.",
      outcome: "Installed within the Chief Justice Chambers with digital relative humidity logging and zero UV exposure.",
      stats: [
        { label: "Document Age", value: "110 Years" },
        { label: "Atmosphere", value: "99.8% Nitrogen" },
        { label: "Glazing Spec", value: "Optium Acrylic" },
      ],
      spatialAssetTag: "16:9 State Judicial Preservation Canvas",
    },
    {
      id: "smart-city-wayfinding",
      title: "Smart City Urban Wayfinding Monoliths",
      client: "Smart City Development Corporation",
      location: "Indore, MP",
      scope: "64 solar-assisted, anti-graffiti stainless steel wayfinding totems deployed across the municipal corridor.",
      outcome: "Zero graffiti vandalism damage recorded over 3 years of continuous round-the-clock public deployment.",
      stats: [
        { label: "Totems Deployed", value: "64 Monoliths" },
        { label: "Graffiti Removal", value: "<5 min wipe" },
        { label: "Solar Autonomy", value: "72 Hours" },
      ],
      spatialAssetTag: "16:9 Smart City Urban Monolith PNG",
    },
  ],
  faq: [
    {
      question: "Is Frame Cottage registered on the Government e-Marketplace (GeM)?",
      answer:
        "Yes, we are a verified vendor on GeM with active product and service category listings, valid GST compliance, MSME registration, and Class 1 Local Supplier (Make in India) standing.",
    },
    {
      question: "Can you provide certified structural calculations for public tenders?",
      answer:
        "Yes, our engineering team supplies complete structural PE (Professional Engineer) stamped calculation packages covering wind-load pressures up to 150 km/h, seismic loads, and civil concrete footing requirements.",
    },
    {
      question: "How do your anti-graffiti coatings function?",
      answer:
        "Our specialized fluoropolymer and cross-linked polyurethane clearcoats create an extremely low surface energy barrier. Spray paints, lacquers, and adhesive stickers cannot bond chemically and wipe clean with mild citrus cleaners.",
    },
    {
      question: "Do you participate in state and central government tender bidding?",
      answer:
        "Yes, we routinely participate in e-tenders, providing Earnest Money Deposits (EMD), bank guarantees, ISO 9001:2015 quality certificates, and past performance milestone audits.",
    },
  ],
  relatedVerticalIds: ["spatial-signage", "industrial-cnc", "bespoke-framing"],
};
