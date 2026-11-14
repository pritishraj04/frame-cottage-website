# Product Requirement Document (PRD): Frame Cottage Home Page
**Document Version:** 1.1.0  
**Target Project:** `frame-cottage` (Next.js 16.4.6, React 19, Tailwind CSS v4, Supabase, Cloudflare R2)  
**Design Reference:** [India Circus by Krsnaa Mehta](https://indiacircus.com) (Artisanal luxury, category-deep mega-navigation, lifestyle in-situ merchandising, and curated story blocks)  
**Interactive Feature:** Hero Section Live Frame Customizer Switcher  
**Author:** Antigravity Orchestrator (Lead Architect)  
**Status:** Approved Specification — Ready for Task Generation  

---

## 1. App Overview & Objectives

**Frame Cottage** is a modern, high-craft direct-to-consumer custom picture framing, memory preservation, and curated wall art platform. It merges traditional artisan woodworking with a frictionless, digital-first customizer experience.

Drawing design and architectural inspiration from **India Circus** (`indiacircus.com`), the Home Page functions not merely as a catalogue, but as a rich, design-led lifestyle destination. It delivers:
1. **Interactive Hero Engagement**: An immediate, tactile **Live Frame Switcher** in the hero fold that lets users preview different moulding materials (Natural Walnut, Antique Brass, Matte Black, Gallery White, Gilded Heritage) and mat widths in real time without signing up or leaving the home page.
2. **Artisanal Lifestyle Merchandising**: Rich in-situ lifestyle imagery showing framed art in curated living spaces, inspired by India Circus’s room-centric discovery ("Shop by Style", "Curated Gallery Walls", "Artisan Woodcraft").
3. **Faceted Mega-Menu Navigation**: Deep, accessible category discovery (Custom Framing, Tabletop Frames, Gallery Wall Bundles, Archival Prints, Trade & Hospitality).
4. **Frictionless Conversion Funnels**: Dual pathways for (a) Digital Upload & Print Framing (via Cloudflare R2) and (b) Pre-Framed Collections & Standard Sizes.

---

## 2. Competitive Landscape & Reference Architecture (India Circus Model)

| Dimension | India Circus Paradigm (`indiacircus.com`) | Frame Cottage Home Page Implementation |
|---|---|---|
| **Branding & Visual Atmosphere** | Rich jewel & earth tones, contemporary Indian luxury, artisanal heritage story, tactile motifs. | Warm Parchment (`#FAF7F2`), Espresso Ink (`#191614`), Warm Terracotta/Amber (`#B45309`), Antique Brass (`#C5A059`) cues, solid wood grain textures. |
| **Information Architecture (IA)** | Deep multi-tier mega menus with visual thumbnails, category pills, and dual browsing ("Shop by Category" vs "Shop by Motif"). | Mega navigation with visual previews for frame profiles; dual discovery: "Shop by Size/Function" vs "Shop by Wood & Finish". |
| **Product Presentation** | Dual-state cards (clean product cutout on rest &rarr; styled room in-situ shot on hover). | Interactive product cards: frame cutout on rest &rarr; hung in modern styled interior on hover, with quick-customize drawer trigger. |
| **Hero Merchandising** | Dynamic lifestyle showcase with direct category hooks. | **Interactive Live Frame Switcher**: A live client island allowing real-time switching of 5 frame mouldings, 3 mat margins, and 2 room context backdrops (Studio vs. Warm Interior). |
| **Brand Storytelling** | Dedicated artisanal craft block, designer lineage, and Godrej heritage trust badge. | "The Framer’s Atelier": Workshop story detailing corner splines, FSC-certified hardwoods, TruVue UV conservation acrylic, and lifetime craftsmanship guarantee. |

---

## 3. Relevant Skills Mapping

This project coordinates local repository skills and Antigravity platform skills to achieve senior-designer grade execution:

| Skill | Origin | Purpose in Execution |
|---|---|---|
| **`prd-creator`** | Local (`.agent/skills/prd-creator`) | Enforces structured requirement breakdown, prerequisite gates, and serialized `TASK-${ID}` specs. |
| **`frontend`** | Platform (`oh-my-antigravity`) | Governs `DESIGN.md` design system architecture, spatial hierarchy, typography scales, micro-interactions, and Lighthouse 100 performance. |
| **`web-design-guidelines`** | Local (`.agent/skills/web-design-guidelines`) | Vercel's accessibility, contrast, focus rings, responsive viewport containment, and keyboard navigation rules. |
| **`shadcn`** | Local (`.agent/skills/shadcn`) | Accessible, unstyled Radix UI primitives with Tailwind v4 styling (dialogs, tooltips, carousels, accordions). |
| **`vercel-react-best-practices`** | Local (`.agent/skills/vercel-react-best-practices`) | Server Components by default, zero hydration mismatch, optimized bundle splitting, and non-blocking streaming. |
| **`frontend-testing` & `e2e-tester`** | Local (`.agent/skills/`) | Vitest component unit tests and Playwright happy-path visual smoke tests with automated screenshot verification. |
| **`supabase` & Postgres Best Practices** | Platform (`supabase`) | Schema modeling for mouldings, mat styles, pricing calculation, and anonymous cart/session management. |

---

## 4. UI/UX Design System Contract (`DESIGN.md` Specifications)

### 4.1 Aesthetic Tokens
```css
/* Color System: Warm Artisanal Canvas */
--color-canvas-base: #FAF7F2;          /* Parchment background */
--color-canvas-subtle: #F3ECE2;        /* Secondary panel / card fill */
--color-canvas-surface: #FFFFFF;       /* Pure white frame mat / modal */
--color-ink-primary: #191614;          /* Deep espresso typography */
--color-ink-secondary: #5C554E;        /* Supporting copy */
--color-ink-muted: #8F877E;            /* Hairline borders & metadata */
--color-border-subtle: #E8E1D5;        /* Refined luxury dividers */
--color-terracotta-accent: #B45309;    /* Primary CTA & warm highlight */
--color-terracotta-hover: #92400E;     /* CTA active/hover */
--color-brass-accent: #C5A059;         /* Antique brass accents & badges */

/* Moulding Realism Shadow Tokens */
--shadow-frame-resting: 0 12px 32px -8px rgba(25, 22, 20, 0.12), 0 4px 12px -2px rgba(25, 22, 20, 0.06);
--shadow-frame-elevated: 0 24px 48px -12px rgba(25, 22, 20, 0.2), 0 8px 20px -4px rgba(25, 22, 20, 0.08);
--shadow-frame-inner-mat: inset 0 2px 5px rgba(0, 0, 0, 0.18), inset 0 0 1px rgba(0, 0, 0, 0.25);
```

### 4.2 Typography
- **Editorial Display**: `Playfair Display` or `Instrument Serif` (600/700 weight, -0.02em letter spacing) for headlines, category banners, and craft narratives.
- **Modern UI Sans**: `Geist Sans` or `Inter` (400/500/600 weight) for navigation, micro-interactions, price tags, and customizer controls.

---

## 5. Home Page Spatial Structure & Information Architecture

The homepage is organized as a seamless, high-converting journey:

```mermaid
flowchart TD
    TopBanner[1. Announcement Bar\nFree White-Glove Shipping on Orders $150+ | Handcrafted in 5-7 Days]
    Nav[2. Sticky Header with Mega-Menu\nCustom Framing, Ready-Made, Gallery Walls, Art Prints, Trade, Search, Cart Drawer]
    Hero[3. Hero Section with Interactive Live Frame Switcher\nHeadline, Dual CTAs, Real-Time Moulding & Mat Customizer Island]
    PillFilter[4. Category Discovery Pills & Visual Carousel\nSolid Oak, Dark Walnut, Antique Brass, Matte Black, Gilded Heritage, Miniatures]
    TrustBar[5. Craftsmanship & Trust Badges\nSolid Hardwood, 4-Ply Archival Cotton, Conservation Acrylic, All Hardware Included]
    CuratedGrid[6. Curated Collections & Dual-State Cards\nRest: Clean Studio Frame Cutout | Hover: Styled Living Room In-Situ Shot]
    FramingJourney[7. How Custom Framing Works\n3-Step India Circus-Style Visual Story: Upload/Send, Customise, Delivered Ready-to-Hang]
    ArtisanStory[8. The Atelier & Material Transparency\nCorner Splines, FSC Certified Hardwoods, TruVue Glass vs Standard Glass Slider]
    Lookbook[9. Customer Homes & Gallery Wall Lookbook\nInteractive UGC Wall with 'Shop This Look' Pins]
    FAQ[10. Framing FAQ Accordion\nTurnaround time, print quality, shipping safety, guarantee]
    Footer[11. Luxury Archival Footer\nBrand story, Newsletter 10% off, Sustainability pledge, Trust seals]

    TopBanner --> Nav --> Hero --> PillFilter --> TrustBar --> CuratedGrid --> FramingJourney --> ArtisanStory --> Lookbook --> FAQ --> Footer
```

### 5.1 Hero Section: Interactive Live Frame Switcher (Deep Dive)
- **Headline**: *"Museum-Grade Framing, Handcrafted for Life’s Masterpieces."*
- **Subheadline**: *"Experience bespoke craftsmanship from your screen. Select your moulding, customize your mat, and preview your art with millimeter precision."*
- **The Interactive Frame Island**:
  - **Live Canvas Display**: Shows a high-definition sample piece with realistic frame depth, inner bevel mat bevel shadow (`--shadow-frame-inner-mat`), and dynamic lighting.
  - **Frame Finish Controls**: Quick-toggle pill buttons with real timber/metal textures:
    1. *American Natural Walnut* (Warm, rich grain)
    2. *Gallery Matte Black* (Clean contemporary shadowbox)
    3. *Brushed Antique Brass* (Luxury metallic edge)
    4. *Nordic Natural White Oak* (Airy Scandinavian warmth)
    5. *Vintage Florentine Gold* (Subtle classic bevel)
  - **Mat Reveal Selector**: `No Mat`, `2-inch Classic Rag Mat`, `3-inch Dramatic Gallery Mat`.
  - **Context Toggle**: `Studio Neutral Canvas` &harr; `Living Room Interior` (toggles background wall tone and scale).
  - **Interactive Action**: "Frame This Size Now" (passes selections into the builder flow) and "Upload My Own Photo" (triggers instant image replacement in the live frame).

### 5.2 India Circus-Style Merchandising Modules
- **Mega-Menu Navigation**:
  - Four distinct columns: *By Moulding Type* (Hardwood, Metal, Ornate), *By Space* (Living Room, Nursery, Hallway Gallery), *Popular Sizes* (8x10, 11x14, 16x20, 24x36), and *Featured Collaboration*.
- **Visual Category Pills (Carousel)**:
  - Circular avatar-style thumbnails representing core wood finishes and styles for fast tactile filtering.
- **Dual-State Product Cards**:
  - Default view: Crisp studio photograph on parchment background with dimensions and starting price.
  - Hover state: Smooth cross-fade to a styled room shot (e.g., hanging above an artisanal sideboard with indoor plants and warm lighting), showing a "Quick Preview" drawer button.
- **The Atelier & Material Showcase**:
  - Highlighting FSC-certified solid timber, hand-stained edges, and an interactive slider comparing *Standard Reflection-Prone Glass* vs. *TruVue Museum Conservation Acrylic*.

---

## 6. Technical Stack & Component Architecture

### Stack Specifications
- **Framework**: Next.js 16.4.6 (App Router, Server Components + React 19 Client Islands)
- **Styling**: Tailwind CSS v4 with design-token variables in `globals.css`
- **Component Primitives**: Radix UI / `shadcn` for dialogs, accordions, and dropdown menus
- **Icons**: `lucide-react`
- **Database & Auth**: Supabase Postgres (moulding specs, pricing matrices, user saved frames)
- **Storage**: Cloudflare R2 (`frames-cottage-images` bucket via Presigned URLs)
- **Testing**: Vitest (unit/component) and Playwright (E2E smoke & visual screenshot tests)

### Directory Breakdown
```
frame-cottage/
├── app/
│   ├── layout.tsx                     # Global typography, metadata, CartProvider
│   ├── page.tsx                       # Home Page (Server Component composition)
│   ├── globals.css                    # Design tokens & realistic frame drop-shadows
│   └── api/
│       └── upload/route.ts            # Cloudflare R2 presigned URL endpoint
├── components/
│   ├── navigation/
│   │   ├── site-header.tsx            # Sticky header with announcement bar
│   │   ├── mega-menu.tsx              # India Circus-style multi-column menu
│   │   └── mobile-nav.tsx             # Responsive slide-over drawer
│   ├── hero/
│   │   ├── hero-container.tsx         # Hero layout, copy & CTAs
│   │   └── live-frame-switcher.tsx    # Interactive Client Island (Moulding & Mat preview)
│   ├── home/
│   │   ├── category-pills.tsx         # Visual finish filter carousel
│   │   ├── trust-bar.tsx              # Solid timber & museum-grade badges
│   │   ├── curated-collections.tsx    # Dual-state product cards (studio/in-situ)
│   │   ├── framing-journey.tsx        # 3-step illustrated explainer
│   │   ├── atelier-materials.tsx      # Craft comparison & conservation glass slider
│   │   ├── customer-lookbook.tsx      # UGC gallery wall with interactive hotspot tags
│   │   └── faq-section.tsx            # Accessible accordion FAQ
│   ├── layout/
│   │   └── site-footer.tsx            # Archival luxury footer
│   └── ui/                            # Accessible shadcn primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── accordion.tsx
│       └── tabs.tsx
└── lib/
    ├── constants/frames.ts            # Moulding profiles, mat dimensions, pricing data
    ├── supabase/client.ts             # Supabase client wrapper
    └── storage/r2.ts                  # Cloudflare R2 client
```

---

## 7. Verifiable Development Tasks (`TASK-1` to `TASK-8`)

These tasks are structured for the Ralph agent loop and Antigravity subagents:

- **`TASK-1`**: **Prerequisites & Tooling Verification**  
  Verify Node 22, Next.js 16 build, Tailwind v4 setup, `.env.local` Supabase & Cloudflare R2 configurations, and install `lucide-react` + `@radix-ui` primitives.
- **`TASK-2`**: **Artisanal Design Tokens & Typography**  
  Implement CSS variables for the Parchment/Ink palette in `globals.css`, configure Google Fonts (`Playfair Display` + `Geist Sans`) in `layout.tsx`.
- **`TASK-3`**: **Header, Mega-Menu & Announcement Bar**  
  Build responsive sticky navigation with India Circus-inspired multi-column mega menu, mobile navigation drawer, and top announcement bar.
- **`TASK-4`**: **Hero Section & Interactive Live Frame Switcher**  
  Implement the Hero layout and the Client Component live frame visualizer with real-time moulding toggle, mat margins, and lighting realism.
- **`TASK-5`**: **Category Filter Pills & Craftsmanship Trust Bar**  
  Implement circular wood/material filter carousel and 4-column trust badges.
- **`TASK-6`**: **Curated Collections with Dual-State In-Situ Hover Cards**  
  Build product grid with cross-fade hover states revealing styled room interiors, starting price labels, and quick-view drawer.
- **`TASK-7`**: **The Atelier Material Story & 3-Step Framing Journey**  
  Build the illustrated 3-step workflow and the split conservation glass comparison showcase.
- **`TASK-8`**: **UGC Customer Lookbook, FAQ Accordion, Footer & E2E Verification**  
  Implement social proof lookbook with tagged hotspots, `shadcn` FAQ accordion, luxury footer, and complete Playwright visual smoke tests.
