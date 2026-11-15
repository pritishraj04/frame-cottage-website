import { ServiceVerticalData } from "./types";

export const industrialCncData: ServiceVerticalData = {
  id: "industrial-cnc",
  title: "Industrial Fabrication & CNC Metalworks",
  shortName: "Industrial CNC",
  tagline: "Precision CNC Routing, Fiber Laser Cutting & Architectural Metal",
  audienceTag: "Commercial & Industrial",
  heroBadge: "Precision Engineering & Metalworks",
  description:
    "Industrial manufacturing power paired with artisanal design sensibilities. Sub-millimeter laser profiling, 5-axis timber milling, parametric perforated metal facades, and certified structural welding engineered for architects, industrial designers, and facade fabricators.",
  heroAssetTag: "4:3 Industrial CNC Asset",
  keyStats: [
    { label: "Tolerance", value: "±0.1 mm" },
    { label: "Laser Bed", value: "3000 × 1500 mm" },
    { label: "Laser Power", value: "3000W Fiber" },
    { label: "Max Thickness", value: "20 mm Steel" },
  ],
  keyHighlights: [
    {
      title: "3000W High-Power Fiber Laser",
      description: "Ultra-clean laser profiling in solid brass, copper, architectural aluminum, and stainless steel.",
      badge: "Sub-0.1mm Kerf",
    },
    {
      title: "5-Axis Heavy CNC Routing",
      description: "Large-format 3D surface machining for hardwoods, Corian®, acoustic felt panels, and composites.",
      badge: "Compound 3D",
    },
    {
      title: "Parametric Perforated Facades",
      description: "Custom daylight-diffusing decorative exterior screens, balcony grilles, and acoustic ceiling baffles.",
      badge: "Architectural Screen",
    },
    {
      title: "Artisanal Chemical Patinas",
      description: "Hand-applied statuary bronze, verdigris, blackened steel, and antique brass patination.",
      badge: "Living Finishes",
    },
  ],
  technicalCapabilities: [
    {
      id: "fiber-laser",
      title: "Raycus 3000W Fiber Laser Cutter",
      machine: "Raycus 3000W Dual-Shuttle Table",
      specs: "Sheet envelope 3000mm × 1500mm; cuts up to 20mm mild steel & 12mm brass",
      description:
        "High-velocity nitrogen and oxygen assist gas cutting creating mirror-clean edges with zero dross formation.",
      badge: "Laser Profiling",
      pngPlaceholderText: "Laser Cut Metal Sample PNG",
      hashSlug: "laser-cutting",
      aliases: ["fiber-laser", "laser"],
    },
    {
      id: "cnc-router-5axis",
      title: "5-Axis Heavy Timber & Polymer CNC",
      machine: "Multicam 5000 Series 5-Axis Router",
      specs: "Z-travel 600mm; Hiteco 16HP automatic tool changer spindle (24,000 RPM)",
      description:
        "Full simultaneous 5-axis contouring for organic sculptural wood columns, acoustic parametric grilles, and complex tooling.",
      badge: "5-Axis CNC",
      pngPlaceholderText: "5-Axis Milled Hardwood Part PNG",
      hashSlug: "cnc-routing",
      aliases: ["cnc-router-5axis", "timber-cnc"],
    },
    {
      id: "press-brake",
      title: "160-Ton CNC Hydraulic Press Brake",
      machine: "Amada HFE 3D Multi-Axis Press Brake",
      specs: "3100mm bending length; dynamic hydraulic crowning & laser angle check",
      description:
        "Consistent acute and hem bending across heavy gauge aluminum and stainless architectural facade cassettes.",
      badge: "Brake Forming",
      pngPlaceholderText: "Formed Metal Cassette PNG",
      hashSlug: "metalworks",
      aliases: ["press-brake", "facades", "screens"],
    },
    {
      id: "powder-booth",
      title: "Automated Powder Coating Line",
      machine: "Nordson Encore HD & 6-Stage Pretreatment",
      specs: "Baking oven handles components up to 6.5m length × 2.4m height",
      description:
        "Zinc-rich primer and architectural polyester topcoats yielding 2,000+ hour salt-spray corrosion resistance.",
      badge: "Surface Finishing",
      pngPlaceholderText: "Architectural Powder Finish PNG",
      hashSlug: "finishes",
      aliases: ["powder-booth", "coating"],
    },
  ],
  materialSpecs: [
    {
      category: "Architectural Metals",
      specification: "C36000 Solid Brass, C51000 Bronze, 5052-H32 Aluminum, 316L Stainless",
      toleranceGrade: "Laser cut kerf width ±0.08 mm / ISO 9013 Class 1 tolerance",
      finishStandard: "Non-directional orbital grain, satin brush #4, antique chemical oxidation",
    },
    {
      category: "Structural Steels",
      specification: "IS 2062 Grade E250 / ASTM A36 Cold-Rolled Carbon Steel & Cor-Ten A/B",
      toleranceGrade: "AWS D1.1 certified fillet and complete joint penetration welds",
      finishStandard: "Zinc phosphated primer, heavy matte black poly or natural rust stabilization",
    },
    {
      category: "Engineered Substrates",
      specification: "DuPont Corian® solid surface, Fundermax HPL compact laminate, HDU Foam",
      toleranceGrade: "Density 300 to 1400 kg/m³ / Zero porosity moisture barrier",
      finishStandard: "Bevel chamfered edge, matte silk buffed finish",
    },
    {
      category: "Acoustic Composites",
      specification: "100% Recycled PET Felt (9mm & 12mm) & Birch Multi-Plex Plywood",
      toleranceGrade: "NRC rating up to 0.85 / CNC V-groove folded architectural tiles",
      finishStandard: "Flame-retardant Class B / Class A ASTM E84 certified",
    },
  ],
  workflowStages: [
    {
      step: 1,
      phase: "DFM Review & Toolpath Optimization",
      title: "CAD Sanitization & Nesting",
      duration: "Day 1–2",
      description: "Reviewing STEP/DXF files, calculating bend allowances, tool clearances, and sheet yield optimization.",
      deliverable: "DFM Optimization Report & CAM Toolpaths",
    },
    {
      step: 2,
      phase: "CNC Machining & Laser Profiling",
      title: "Primary Cut & 5-Axis Milling",
      duration: "Day 3–5",
      description: "High-speed laser profiling, CNC pocketing, 3D contour surfacing, and automated deburring.",
      deliverable: "Raw Precision-Machined Components",
    },
    {
      step: 3,
      phase: "Forming, Welding & Hand Patina",
      title: "Hydraulic Brake & Surface Treatment",
      duration: "Day 6–8",
      description: "Brake forming, structural TIG welding, seam blending, and hand-rubbed chemical patination.",
      deliverable: "Hand-Finished Architectural Assembly",
    },
    {
      step: 4,
      phase: "CMM Quality Inspection & Packing",
      title: "Tolerance Verification & Crating",
      duration: "Day 9–10",
      description: "Laser scanning CMM dimensional inspection, protective film application, and heavy pallet crating.",
      deliverable: "QC Dimensional Certificate & Palletized Cargo",
    },
  ],
  quickEstimator: {
    unitLabel: "Fabrication Lot",
    startingPrice: 12000,
    dimensionOptions: [
      { id: "component", label: "Precision Prototype Part (up to 18\")", dimensions: "18\" × 18\" (45 × 45 cm)", baseMultiplier: 1.0 },
      { id: "screen", label: "Perforated Screen Panel (4ft × 8ft)", dimensions: "48\" × 96\" (120 × 240 cm)", baseMultiplier: 3.2 },
      { id: "facade", label: "Architectural Facade Module (5ft × 10ft)", dimensions: "60\" × 120\" (150 × 300 cm)", baseMultiplier: 5.8 },
      { id: "monumental", label: "Structural Metalwork Assembly", dimensions: "Custom Envelope", baseMultiplier: 10.5 },
    ],
    materialTiers: [
      { id: "aluminum", label: "5052-H32 Architectural Aluminum (3mm)", sublabel: "Lightweight, corrosion-resistant, powder-coated", multiplier: 1.0, basePrice: 12000 },
      { id: "stainless", label: "316 Marine Grade Stainless Steel (4mm)", sublabel: "Hairline brush with clear anti-fingerprint seal", multiplier: 1.6, basePrice: 19200 },
      { id: "brass", label: "Solid C360 Brass / Statuary Bronze (5mm)", sublabel: "Luxury hand-patinated antique satin finish", multiplier: 2.3, basePrice: 27600 },
    ],
    finishingAddons: [
      { id: "patina", label: "Hand-Applied Chemical Bronze/Verdigris Patina", cost: 4500 },
      { id: "powder", label: "AkzoNobel Interpon D2525 Powder Coating", cost: 2800 },
      { id: "forming", label: "CNC Press Brake Perimeter Return Flanges", cost: 3200 },
    ],
    formulaNote: "Estimates include laser programming and deburring. Excludes specialized installation cranes.",
  },
  caseStudies: [
    {
      id: "one-horizon-screen",
      title: "Parametric Sunshade Screens at One Horizon",
      client: "Commercial Architecture Firm",
      location: "Gurugram, HR",
      scope: "120 custom perforated brass-toned aluminum facade panels with generative parametric solar apertures.",
      outcome: "Reduced internal thermal solar heat gain by 38% while creating an iconic kinetic exterior elevation.",
      stats: [
        { label: "Panels Milled", value: "120 Modules" },
        { label: "Surface Area", value: "480 sq. meters" },
        { label: "Tolerance", value: "±0.1 mm" },
      ],
      spatialAssetTag: "16:9 Parametric Facade Panel PNG",
    },
    {
      id: "luxury-portal",
      title: "Curved Brass Display Portal for Luxury Flagship",
      client: "High-End Retail Brand",
      location: "Mumbai, MH",
      scope: "Compound curved entrance portal fabricated from 5-axis CNC wood armature and hand-patinated brass.",
      outcome: "Delivered flawless seamless mirror-finish mitres and hand-rubbed organic statuary patina.",
      stats: [
        { label: "Portal Span", value: "4.2 Meters" },
        { label: "Brass Weight", value: "850 kg" },
        { label: "Finish", value: "Hand Bronze Patina" },
      ],
      spatialAssetTag: "16:9 Curved Brass Portal PNG Canvas",
    },
  ],
  faq: [
    {
      question: "What file formats do you accept for CNC and laser machining?",
      answer:
        "We accept DXF, DWG, STEP, IGES, Parasolid, and Adobe Illustrator vector files. Our engineering team conducts full DFM (Design for Manufacturability) audits on every incoming file before toolpath generation.",
    },
    {
      question: "What is your maximum laser cutting sheet size and thickness?",
      answer:
        "Our high-power fiber laser accommodates sheets up to 3000 mm × 1500 mm. We cleanly cut up to 20 mm mild steel, 15 mm stainless steel, 12 mm aluminum, and 10 mm brass/copper.",
    },
    {
      question: "Can you produce custom chemical patinas on brass and bronze?",
      answer:
        "Yes, our master finishers hand-apply historical liver of sulfur, ferric chloride, and ammonium formulas to achieve antique statuary bronze, oil-rubbed bronze, deep blackened metal, and verdigris finishes with protective ceramic lacquers.",
    },
    {
      question: "Do you offer prototypes before full production runs?",
      answer:
        "Yes, we provide rapid prototype turnarounds within 48 to 72 hours, allowing architects and industrial designers to evaluate edge quality, fit, and finish before committing to large volumes.",
    },
  ],
  relatedVerticalIds: ["spatial-signage", "civic-projects", "custom-gifting"],
};
