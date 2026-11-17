"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface WishlistItem {
  id: string;
  title: string;
  category: string;
  vertical: string;
  dimensions: string;
  material: string;
  glazing: string;
  price: number;
  aspectGuide: string;
  svgType: "frame" | "signage" | "lattice" | "shadowbox";
}

export interface CartItem {
  id: string;
  title: string;
  category: string;
  dimensions: string;
  specs: string;
  unitPrice: number;
  quantity: number;
  vertical: string;
}

export interface UserProfile {
  name: string;
  email: string;
  tier: string;
  role: "collector" | "enterprise";
  company?: string;
  memberSince: string;
}

export interface OrderItem {
  id: string;
  title: string;
  date: string;
  total: string;
  status: "In Milling" | "In Joinery" | "Shipped with White-Glove Courier" | "Delivered & Inspected";
  tracking: string;
  specs: string;
  stage: string;
}

export interface RfqItem {
  id: string;
  title: string;
  tenderId: string;
  vertical: string;
  date: string;
  status: "Under Review by Master Framer" | "Approved • Proposal Ready" | "Completed & Commissioned";
  scope: string;
  estimatedValue?: string;
}

export interface SavedAddress {
  id: string;
  title: string;
  type: "Residential" | "Commercial Jobsite";
  isDefault: boolean;
  recipient: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string;
}

export const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "fc-wish-1",
    title: "Appalachian Walnut Bespoke Frame",
    category: "Bespoke Framing",
    vertical: "bespoke-framing",
    dimensions: '24" × 36" (609 × 914 mm)',
    material: "Solid North American Black Walnut • Exposed Japanese Splines • Danish Oil",
    glazing: "TruVue Optium Museum Acrylic (99% UV, Anti-Reflective)",
    price: 480,
    aspectGuide: '24" × 36" • 4:3 Spatial Drop Zone • Transparent PNG Spec',
    svgType: "frame",
  },
  {
    id: "fc-wish-2",
    title: "3D Illuminated Architectural Wayfinding Signage",
    category: "Spatial & Signage",
    vertical: "spatial-signage",
    dimensions: '48" × 18" (1219 × 457 mm)',
    material: "Solid C260 Brushed Brass Face • IP67 2700K Warm Edge-Lit Return • Satin Polycarbonate",
    glazing: "Satin Anti-Glare Acrylic Lens",
    price: 1250,
    aspectGuide: '48" × 18" • Architectural Wayfinding • Transparent PNG Spec',
    svgType: "signage",
  },
  {
    id: "fc-wish-3",
    title: "CNC Laser-Cut Brass Lattice Screen",
    category: "Industrial CNC",
    vertical: "industrial-cnc",
    dimensions: '36" × 72" (914 × 1828 mm)',
    material: "3mm Solid Cartridge Brass • Laser-Cut Geometric Jaali • Hand-Antiqued Patina",
    glazing: "Structural Anodized Subframe",
    price: 1890,
    aspectGuide: '36" × 72" • Laser CNC Screen • Transparent PNG Spec',
    svgType: "lattice",
  },
  {
    id: "fc-wish-4",
    title: "Museum Conservation Artifact Shadowbox",
    category: "Bespoke Framing",
    vertical: "bespoke-framing",
    dimensions: '20" × 20" × 3" (508 × 508 × 76 mm)',
    material: "Rift-Sawn White Oak • 100% Cotton Rag Matboard • Unbuffered Archival Spacers",
    glazing: "TruVue UltraVue 92% Anti-Reflective UV Glass",
    price: 620,
    aspectGuide: '20" × 20" • 3D Deep Shadowbox • Transparent PNG Spec',
    svgType: "shadowbox",
  },
];

export const INITIAL_CART: CartItem[] = [
  {
    id: "fc-cart-1",
    title: "Appalachian Walnut Bespoke Frame",
    category: "Bespoke Framing",
    dimensions: '24" × 36" (609 × 914 mm)',
    specs: "Solid Black Walnut • Hand-Rubbed Danish Oil • TruVue Optium Museum Acrylic",
    unitPrice: 480,
    quantity: 1,
    vertical: "bespoke-framing",
  },
  {
    id: "fc-cart-2",
    title: "3D Illuminated Architectural Wayfinding Signage",
    category: "Spatial & Signage",
    dimensions: '48" × 18" (1219 × 457 mm)',
    specs: "Solid Brushed C260 Brass • IP67 2700K Edge-Lit • Satin Anti-Glare Diffuser",
    unitPrice: 1250,
    quantity: 1,
    vertical: "spatial-signage",
  },
];

export const DEFAULT_COLLECTOR_USER: UserProfile = {
  name: "Camilla Vance",
  email: "collector@vanceart.com",
  tier: "Atelier Collector • Tier II",
  role: "collector",
  memberSince: "April 2023",
};

export const DEFAULT_ENTERPRISE_USER: UserProfile = {
  name: "Marcus Sterling",
  email: "procurement@som-architects.com",
  company: "SOM Architects & Partners",
  tier: "Corporate Enterprise Partner • GeM L1",
  role: "enterprise",
  memberSince: "November 2022",
};

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "FC-2026-8841",
    title: "Appalachian Walnut Bespoke Frame (Set of 2)",
    date: "Feb 12, 2026",
    total: "₹960",
    status: "In Joinery",
    tracking: "WG-7782-9901",
    specs: '24" × 36" • American Black Walnut • TruVue Optium Museum Acrylic',
    stage: "Woodworking & Spline Joinery",
  },
  {
    id: "FC-2026-7203",
    title: "Architectural Illuminated Wayfinding Suite",
    date: "Jan 28, 2026",
    total: "₹3,750",
    status: "Shipped with White-Glove Courier",
    tracking: "WG-4412-0034",
    specs: "Multi-plate C260 Brass • IP67 LED • Site Bay 4 Delivery",
    stage: "En Route with Climate-Controlled Van",
  },
  {
    id: "FC-2025-6119",
    title: 'CNC Brass Jaali Screen 36" × 72"',
    date: "Dec 14, 2025",
    total: "₹1,890",
    status: "Delivered & Inspected",
    tracking: "WG-1192-3389",
    specs: "3mm Solid Brass • Antiqued Patina • Structural Subframe",
    stage: "In-Situ Client Acceptance Complete",
  },
];

export const INITIAL_RFQS: RfqItem[] = [
  {
    id: "RFQ-2026-041",
    title: "Civic Heritage Gallery Framing & Shadowboxes",
    tenderId: "GeM/2026/B/882190",
    vertical: "Civic Projects",
    date: "Feb 8, 2026",
    status: "Under Review by Master Framer",
    scope: "36 custom conservation shadowboxes for State Archive textile artifacts",
    estimatedValue: "₹18,500",
  },
  {
    id: "RFQ-2026-039",
    title: "Boutique Hotel Wayfinding & Brass Totems",
    tenderId: "PRJ-SOM-WAY-2026",
    vertical: "Spatial & Signage",
    date: "Jan 19, 2026",
    status: "Approved • Proposal Ready",
    scope: "Exterior entrance monument + 42 floor level illuminated directional plaques",
    estimatedValue: "₹14,200",
  },
  {
    id: "RFQ-2025-112",
    title: "Corporate HQ Acoustic CNC Felt Panels",
    tenderId: "CORP-CNC-441",
    vertical: "Industrial CNC",
    date: "Nov 04, 2025",
    status: "Completed & Commissioned",
    scope: "Parametric wall cladding with NRC 0.85 sound dampening core",
    estimatedValue: "₹9,800",
  },
];

export const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    title: "Vance Private Residence",
    type: "Residential",
    isDefault: true,
    recipient: "Camilla Vance",
    street: "742 Evergreen Terrace, Apt 12B",
    city: "New York",
    state: "NY",
    postalCode: "10021",
    notes: "Concierge accepts deliveries. Temperature-controlled elevator.",
  },
  {
    id: "addr-2",
    title: "SOM Architects / Project Horizon Jobsite",
    type: "Commercial Jobsite",
    isDefault: false,
    recipient: "Marcus Sterling (Lead Architect)",
    street: "250 Greenwich Street, 34th Floor",
    city: "New York",
    state: "NY",
    postalCode: "10007",
    notes: "Loading Dock Bay 4 entrance on Barclay St. Requires 48h COI notice.",
  },
];
