# Frame Cottage: Project Executive Summary

**Project:** Frame Cottage (Custom Picture Framing & Archival Wall Art E-Commerce)  
**Primary Deliverable:** High-Craft Home Page Experience  
**Design Reference:** [India Circus by Krsnaa Mehta](https://indiacircus.com)  
**Key Interactive Feature:** Hero Section Live Frame Customizer Switcher  

## 1. Overview & Vision
Frame Cottage is a direct-to-consumer luxury custom picture framing platform. It merges traditional artisanal framing methods (solid hardwoods, acid-free mats, UV-protective acrylic glazing) with an intuitive, tactile digital customizer. 

Inspired by **India Circus** (`indiacircus.com`), the design language embraces curated lifestyle storytelling, category-deep mega-menu navigation, and dual-state product presentation (studio frame cutout on rest &rarr; styled room in-situ photograph on hover).

## 2. Key Home Page Features
1. **Interactive Live Frame Switcher (Hero Island):** Immediate real-time preview of 5 frame mouldings (American Natural Walnut, Brushed Antique Brass, Gallery Matte Black, Nordic White Oak, Vintage Florentine Gold), 3 mat reveal widths, and Studio vs. Living Room context toggles.
2. **Category Discovery Pills Carousel:** Visual circular timber/style filters for fast tactile navigation.
3. **Museum-Grade Trust Bar:** Highlighting 100% Solid Hardwood, 4-Ply Archival Cotton Mats, UV Conservation Acrylic, and Free Hanging Hardware.
4. **Curated Collections with Dual-State In-Situ Cards:** Product grid featuring clean studio cutouts transitioning smoothly on hover to styled living room interiors with quick-view drawers.
5. **3-Step Framing Journey:** Illustrated workflow (Upload or Send &rarr; Customise with millimeter precision &rarr; Delivered ready to hang).
6. **The Atelier & Material Showcase:** Hand-cut corner spline joinery details, FSC-certified woods, and an interactive before/after slider comparing standard glass vs. TruVue museum conservation acrylic.
7. **Customer Interior Lookbook & UGC Wall:** Real customer interior photography with interactive 'Shop This Look' pins.
8. **Accessible FAQ Accordion & Archival Footer:** Radix UI accessible accordion, sustainability pledges, and newsletter discount capture.

## 3. Technology Stack & Quality Standards
- **Framework:** Next.js 16.4.6 (App Router), React 19, Tailwind CSS v4.
- **Components:** Radix UI / shadcn primitives, Lucide React icons.
- **Backend & Storage:** Supabase Postgres and Cloudflare R2 (`frames-cottage-images`).
- **Testing:** Playwright visual smoke tests and Vitest component suites.
- **Verification:** Each feature task is defined in `.agent/tasks/TASK-${ID}.json` and verified with Playwright screenshots saved in `.agent/screenshots/`.
