# Project Build Log

`Current Status`
=================
**Last Updated:** 2026-11-14 19:18
**Tasks Completed:** 18 / 18
**Current Task:** TASK-18 Complete (Implement Framer Motion Animated Storefront with Full-Image Carousel, Staggered Category Grid, and Designer Canvas Containers)

----------------------------------------------

## Session Log

### 2026-11-14 - TASK-18: Implement Framer Motion Animated Storefront with Full-Image Carousel, Staggered Category Grid, and Designer Canvas Containers
- Context & Objective: Per user explicit instruction: "To give it that fluid, high-end feel without over-engineering the text, we will drop in Framer Motion for elegant entry animations and smooth carousel transitions. The structure below strips out the heavy text blocks and leaves dedicated, empty spatial containers (dashed borders) where your designer can drop in the final PNG assets, typography, and visual flourishes. The Animated Storefront Structure (Next.js + Tailwind + Framer Motion)".
- Deliverables Implemented:
  1. `app/page.tsx`:
     - Refactored as `"use client"` with Framer Motion (`motion`, `AnimatePresence`).
     - Engineered `fadeUp` and `staggerContainer` animation variants.
     - Preserved `<SiteHeader />` at top and `<SiteFooter />` at bottom for complete navigation, theme toggle, and footer verification.
     - **Section 1: Full-Image PNG Hero Carousel**:
       - Powered by `AnimatePresence mode="wait"`.
       - Crossfade & subtle scale: `initial={{ opacity: 0, scale: 1.05 }}`, `animate={{ opacity: 1, scale: 1 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 1.0, ease: "easeInOut" }}`.
       - Auto-plays every 5s with pause on hover (`onMouseEnter`/`onMouseLeave`).
       - Slide indicator dots (`data-testid="carousel-dot-[index]"`), previous/next controls (`carousel-prev-btn`, `carousel-next-btn`).
       - Dedicated spatial container with dashed border (`border-2 border-dashed border-[var(--color-border-strong)]/60 rounded-2xl bg-[var(--color-canvas-subtle)]/50`) for designer PNG full-bleed assets.
     - **Section 2: 6 Core Service Verticals Staggered Grid**:
       - Animated with `variants={staggerContainer}`, `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: "-80px" }}`.
       - Section Title Graphic spatial container (`border-2 border-dashed border-[var(--color-border-strong)]/60 rounded-2xl bg-[var(--color-canvas-subtle)]/50`).
       - 6 responsive cards (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`) for:
         1. Retail & Standard Framing (`B2C`)
         2. Bespoke Art & Custom Framing (`B2C / B2B`)
         3. Spatial Design & Signage (`B2B`)
         4. Industrial Fabrication & CNC Metalworks (`Commercial`)
         5. Custom Gifting & Mementos (`Corporate`)
         6. Government & Civic Projects (`Public Sector`)
       - Each card is `aspect-[4/5]` with spatial dashed container for designer PNG asset, hover scale (`group-hover:scale-105 transition-transform duration-700`), crisp vertical title, audience badge, and `data-testid="service-vertical-card-[id]"`.
     - **Section 3: Featured Product & Capability Highlight**:
       - Animated with `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}`.
       - 2-column layout:
         - Left: `aspect-square w-full rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/50 flex flex-col items-center justify-center p-8 text-center` (Floating/Shadow frame & CNC design drop zone).
         - Right: Clean spatial containers with dashed borders for Title graphic container (`h-12 border-2 border-dashed`), Description container (`h-32 border-2 border-dashed`), and CTA Button (`h-12 w-44 border-2 border-dashed rounded-full flex items-center justify-center bg-[var(--color-accent-gold)] text-[#1A1A1A] font-semibold cursor-pointer`).
       - `data-testid="featured-product-highlight"`.
  2. Theming & Zero Agentic Clutter:
     - Stripped out dense, heavy text blocks and replaced them with elegant designer canvas spatial containers.
     - Seamless compatibility with Museum Dark Mode (`#1A1A1A`) and Warm Museum Light Mode (`#FAF8F5`).
     - Zero horizontal page overflow (`scrollWidth <= clientWidth`).
  3. Quality & Verification:
     - Updated Playwright test suite (`tests/full-home-e2e.spec.ts`, `tests/hero-switcher.spec.ts`, `tests/curated-collections.spec.ts`, `tests/merchandising.spec.ts`, `tests/storytelling.spec.ts`, `tests/mobile-responsiveness.spec.ts`, `tests/theme-toggle.spec.ts`, `tests/task-18-screenshots.spec.ts`).
     - Verified all 35/35 tests pass with 0 failures in 15.3s.
     - Verified Next.js production build (`npm run build`) passes with exit code 0.
     - Captured visual verification screenshots: `task-18-animated-dark.png`, `task-18-animated-light.png`, `task-18-animated-mobile.png`.
- Context & Objective: Per user explicit instruction: "this is the bussinsses it works on: A multi-disciplinary design, fabrication, and framing studio delivering end-to-end spatial, industrial, and aesthetic solutions for B2C, B2B, and public sector clients. Core Service Verticals: 1. Retail & Standard Framing, 2. Bespoke Art & Custom Framing, 3. Spatial Design & Signage, 4. Industrial Fabrication & CNC Metalworks, 5. Custom Gifting & Mementos, 6. Government & Civic Projects. Remove any other sectors we have and make our website on this."
- Deliverables Implemented:
  1. `lib/constants/verticals.ts`: Defined data structures, deliverables, technical specs, icons, audience badges, and sub-capabilities for all 6 exact service verticals.
  2. `components/navigation/announcement-bar.tsx`: Positioned "Multi-Disciplinary Design, Fabrication & Framing Studio • Delivering End-to-End Solutions for B2C, B2B & Public Sector • Request Project RFP".
  3. `components/navigation/site-header.tsx`: Desktop navigation triggers for "Service Verticals", "Bespoke Framing", "Spatial & Signage", "Industrial CNC", "Government & Civic".
  4. `components/navigation/mega-menu.tsx`: 4-column mega menu organizing all 6 verticals with sub-capabilities and prominent RFQ CTA box ("Request a Project Quote (RFQ)").
  5. `components/navigation/mobile-nav.tsx`: Expandable vertical accordions for all 6 core service verticals with audience badges, sub-capabilities, and RFQ callout.
  6. `components/hero/hero-carousel.tsx`: 3 curated studio slides reflecting Bespoke Framing & Fine Art, Spatial Design & Signage, and Industrial CNC & Civic Projects.
  7. `components/home/category-swatches.tsx` & `components/home/category-pills.tsx`: Discovery pills for the exact 6 core verticals with audience badges, subtitles, active indicators.
  8. `components/home/trust-bar.tsx`: 4 studio pillars: In-House Precision Fabrication, Museum Archival & Industrial Standards, End-to-End Turnkey Execution, Public Sector & Enterprise Scale.
  9. `lib/constants/collections.ts` & `components/home/curated-collections.tsx`: 6 vertical filter tabs and project catalog including architectural wayfinding, CNC perforated facade, executive crystal memento, and civic dedication plaque.
  10. `components/home/featured-products-carousel.tsx`: 8 multi-disciplinary capability cards including Architectural Wayfinding & Illuminated LED Pylon, Mendocino Archival American Walnut Frame, Precision CNC Laser-Cut Brass Monument Civic Plaque, Architectural Perforated Metal Facade & CNC Screen, Highline Shadowbox Stretched Canvas Art, Executive Crystal & Solid Walnut Memento Award, Ready-Made Archival Gallery Wall Set, and Gilded Atelier Brass Architectural Frame.
  11. `components/home/framing-journey.tsx`: 4-stage turnkey studio execution workflow: Spatial Consultation & 3D Spec, Engineering & Precision Fabrication, Museum Archival Curation & Quality Control, White-Glove Installation & Turnkey Handover.
  12. `components/home/customer-lookbook.tsx`: 3 client case studies: Tech Enterprise Headquarters (Silicon Valley, CA), Contemporary Collector Residence (Tribeca, NY), and Municipal City Hall & Civic Plaza (Metro Civic Center).
  13. `components/home/faq-section.tsx`: 6 comprehensive FAQs addressing B2C framing, B2B commercial spatial design, CNC fabrication tolerances, public sector tender execution / GeM compliance, corporate gifting lead times, and on-site turnkey installation.
  14. `components/layout/site-footer.tsx`: Reorganized 4 navigation columns (Framing & Fine Art, Spatial & Signage, Industrial Fabrication, Enterprise & Civic), company description, and FSC® + ISO 9001:2015 + GeM Registered accreditations.
  15. `app/layout.tsx`: Root metadata title updated to "Frame Cottage | Multi-Disciplinary Design, Fabrication & Framing Studio".
  16. Quality & Verification:
    - Updated Playwright test suite (`tests/navigation.spec.ts`, `tests/curated-collections.spec.ts`, `tests/merchandising.spec.ts`, `tests/storytelling.spec.ts`, `tests/theme-toggle.spec.ts`, `tests/mobile-responsiveness.spec.ts`, `tests/full-home-e2e.spec.ts`, `tests/design-tokens.spec.ts`, `tests/hero-switcher.spec.ts`).
    - Verified all 40/40 tests pass with 0 failures in 17.8s.
    - Verified Next.js production build (`npm run build`) passes with exit code 0.
    - Captured visual verification screenshots: `task-17-desktop-dark.png`, `task-17-desktop-light.png`, `task-17-mobile.png`.

### 2026-11-14 - TASK-16: Replace The Atelier Material Section with Pure Image-Based Featured Products Carousel
- Context & Objective: Per user explicit instruction: "we have to remove this section The Atelier: Material Transparency & Sustainability and in place of it make a featured section for products with carousel. This will be pure image based section we will show case some of our products in carousel form."
- Implementation in `components/home/featured-products-carousel.tsx`:
  - Engineered an editorial, luxury, pure image-based Featured Products Carousel showcasing 8 handcrafted frames:
    1. The Mendocino Walnut (Solid Appalachian Black Walnut, Organic Linseed Oil, 16" × 20", $64, Ginkgo biloba botanical art)
    2. Gilded Atelier Brass (Solid Spun Brass & Birch Core, Hand-Brushed Satin Patina, 11" × 14", $78, Study in Form abstract art)
    3. The Kyoto White Oak Slim (100% Quarter-Sawn White Oak, Botanical Matte Wax, 16" × 20", $62, Sumi-e bamboo art)
    4. The Highline Matte Black (Solid Maple, Velvet Satin Shadowbox, 24" × 36", $54, Bauhaus geometric art)
    5. The Florentine Antiqued Gold (Hand-Applied 22k Gold Leaf Bole, 16" × 20", $82, Portico d'Ottavia etching)
    6. The Montmartre Gallery Triptych (Appalachian Walnut Suite, 3 × 8" × 10", $168, Salon Triptych Studies)
    7. The Versailles Ogee Gilt (Sculpted Hardwood Profile, Champagne Leaf, 11" × 14", $88, Galleria Farnese classical art)
    8. The Chelsea Gallery Duo (Solid Brass Spun Profiles, 2 × 11" × 14", $142, Silenzio minimalist art)
  - Pure Image-First Visual Presentation:
    - Prominent handcrafted frame taking up majority of card height with realistic multi-layer drop shadows (`0 22px 45px -10px rgba(0,0,0,0.45), 0 8px 18px -4px rgba(0,0,0,0.25)`).
    - Mitered corner splines joinery indicators at frame corners.
    - 4-ply bevel-cut cotton rag mats (#F4F1EA) with 45° bevel cut shadow (`inset 0 2px 4px rgba(0,0,0,0.25)`).
    - TruVue® conservation optical glare line across the glazing.
    - Archival SVG museum artworks from `FrameArtwork` (botanical, abstract, sumi-e, geometric, architectural, triptych, classical, minimalist).
  - Interactive Carousel Controls:
    - Apple-style circular previous/next navigation buttons (`data-testid="carousel-prev-btn"`, `data-testid="carousel-next-btn"`) with backdrop blur and hover elevation.
    - 8 dot pagination indicators (`data-testid="carousel-dot-[index]"`) with active slide pill animation.
    - Multi-card responsive layout: Desktop (3-4 cards), Tablet (2 cards), Mobile (1 card).
    - Full mobile touch-swipe support (`onTouchStart`, `onTouchMove`, `onTouchEnd`) with threshold detection.
    - Automatic slide advancement (every 5 seconds) with hover and touch pause.
    - Direct "Studio" anchor link and "Customise" button opening `QuickCustomiseDialog`.
  - Theming: Full compatibility with Museum Dark Mode (`#1A1A1A`) and Warm Museum Light Mode (`#FAF8F5`).
- Updated `app/page.tsx`:
  - Removed `<AtelierMaterials />` and replaced it with `<FeaturedProductsCarousel />` between `FramingJourney` and `CustomerLookbook`.
- Automated Test Verification:
  - Updated `tests/storytelling.spec.ts` with comprehensive tests verifying carousel rendering, all 8 frame cards, navigation button controls, dot indicator updates, touch swipe interaction, and Quick Customise modal.
  - Updated `tests/full-home-e2e.spec.ts` replacing atelier materials with `featured-products-carousel` in the 11-section page sequence test.
  - Updated `tests/theme-toggle.spec.ts` verifying that `featured-products-carousel` adapts cleanly to Light Mode.
  - Updated `tests/mobile-responsiveness.spec.ts` verifying that `featured-products-carousel` has zero horizontal overflow, scales within 390px viewport, and touch-swipes smoothly.
  - Ran full test suite: 40/40 Playwright tests passing with 0 failures.
  - Production build: `npm run build` completed with exit code 0 and 0 errors.
- Visual Proof Screenshots:
  - Desktop Dark Mode: `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-16-featured-carousel-dark.png`
  - Desktop Light Mode: `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-16-featured-carousel-light.png`
  - Mobile Viewport (390px): `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-16-featured-carousel-mobile.png`
  - Also mirrored to `.agent/screenshots/`.


### 2026-11-14 - TASK-15: Refine Mobile Layout, Touch Ergonomics, and Card Positioning for Atelier Glass Slider and Customer Lookbook
- Root Causes Identified:
  1. Atelier Materials Glass Comparison Slider (`components/home/atelier-materials.tsx`):
     - Inside-stage floating labels (`standard-glass-label` and `truvue-acrylic-label`) each had `max-w-[210px]`. On mobile viewports (375px - 390px), their combined width of 420px exceeded the container width (~340px), causing horizontal collision, overlapping text, and obscuring the central artwork.
     - Preset buttons wrapped unpredictably and lacked mobile touch target sizing.
     - Touch dragging lacked `touch-none` / proper pointer capture on `containerRef.current`, resulting in scroll jitter during swipe gestures.
  2. Customer Lookbook (`components/home/customer-lookbook.tsx`):
     - The 3 room tab names ("Living Room Salon Wall", "Dining Credenza", "Minimalist Bedside") wrapped awkwardly into 3 rows on mobile viewports.
     - Framed wall artworks and room silhouettes did not scale down sufficiently for narrow mobile screens.
     - Active hotspot popover card was positioned with absolute percentages (`left: activeHotspot.x%`) and fixed `w-[280px]`, causing it to overflow the screen edge, clip outside the stage container, and cover hotspot pins.
- Refactored `components/home/atelier-materials.tsx`:
  - Transformed inside-stage floating labels on mobile (`< sm`) into compact pill badges (`text-[10px] sm:text-xs`) with concise text ("Standard Glass" and "TruVue® Acrylic") and responsive icons, hiding the bulky 3-bullet lists from the stage overlay (`hidden sm:block`).
  - Added a dedicated mobile-only side-by-side comparison summary card below the slider stage (`block sm:hidden mt-3 p-3.5 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)]`) displaying the complete educational points (Uncoated specular glare, ~45% UV fading, fragile/heavy vs. anti-reflective coating, 99% UV defense, lightweight/shatter-safe).
  - Styled preset buttons into a clean 3-column mobile grid (`grid grid-cols-3 sm:flex w-full sm:w-auto gap-1.5 sm:gap-2`) with comfortable touch targets (`min-h-[36px]`).
  - Applied `touch-none` and pointer capture on `containerRef.current` to guarantee smooth, jitter-free dragging on mobile touch pointers.
  - Scaled mobile stage height to `h-[340px] sm:h-[420px] md:h-[480px]` and inner artwork frame to `max-w-[220px] sm:max-w-md` with appropriately scaled SVG illustration (`w-28 h-28 sm:w-52 sm:h-52`).
- Refactored `components/home/customer-lookbook.tsx`:
  - Converted room tab switcher into a horizontally scrollable container with smooth swipe, snap scrolling, and pill buttons (`flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8`) with `shrink-0 snap-center`.
  - Scaled room stage height to `h-[420px] sm:h-[560px] md:h-[620px]` and wall artworks to `w-24 h-32`, `w-20 h-28`, and `w-18 h-22` on mobile, scaling furniture silhouettes appropriately.
  - Re-anchored active hotspot popover card to dock at the bottom of the room stage on mobile (`className="absolute z-40 inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-auto sm:left-[var(--pin-x)] sm:top-[var(--pin-y)] sm:-translate-x-1/2 w-auto sm:w-[320px] max-w-none sm:max-w-[90vw] ..."`), eliminating clipping and screen overflow while allowing full visibility of the artwork and pins above.
- Automated Verification:
  - Created dedicated Playwright test suite `tests/mobile-responsiveness.spec.ts` (390x844 viewport):
    - Verified zero horizontal overflow across entire document (`scrollWidth <= clientWidth === 390`).
    - Verified floating badges are visible without colliding (`boxStandard.x + boxStandard.width < boxTruvue.x`).
    - Verified mobile comparison summary card renders with full comparison details.
    - Verified all 3 preset buttons switch `aria-valuenow` correctly to 100, 0, and 50.
    - Verified touch dragging updates `aria-valuenow` smoothly.
    - Verified room tabs horizontal scrolling and switching.
    - Verified active hotspot card stays strictly within viewport bounds (`box.x >= 0` and `box.x + box.width <= 390`) with verified collector badge, review quote, customer name, and clickable "Shop Frame" button.
    - Verified mobile layout fidelity in both Dark Mode and Light Mode.
  - Executed full test suite: all 40 Playwright tests passing (40/40) with zero regressions.
  - Verified production build: `npm run build` completed with 0 errors.
- Verification Screenshots:
  - `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-15-glass-slider-mobile.png`
  - `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-15-customer-lookbook-mobile.png`
  - `.agent/screenshots/task-15-glass-slider-mobile.png`
  - `.agent/screenshots/task-15-customer-lookbook-mobile.png`

### 2026-11-14 - TASK-14: Fix Sticky Navigation Bar on Scroll by Eliminating Parent Containment Wrapper
- Root Cause Identified: In CSS specification, an element with `position: sticky` is bound strictly to the height and boundaries of its containing block (its direct parent element). In `components/navigation/site-header.tsx`, `<header className="sticky top-0 ...">` was wrapped inside `<div className="w-full relative z-50">`. That wrapper `div` had a height equal only to the announcement bar + header (~100px total) and ended right above `<main>`. When the user scrolled past that `div` (~100px down), the entire wrapper scrolled out of view and took the header with it, causing the navigation bar to completely disappear.
- Refactored `components/navigation/site-header.tsx`:
  - Removed restricting wrapper `<div className="w-full relative z-50">` and replaced with React Fragment `<> ... </>`.
  - Added `w-full relative` directly to `<header>` (`<header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--color-border-subtle)] transition-colors duration-200 relative">`), ensuring `MegaMenu` (`absolute top-full left-0`) stays positioned directly beneath the header.
  - The containing block of `<header>` is now the full-page container `<div className="min-h-screen flex flex-col">`, allowing the header to remain pinned to `top: 0` throughout the entire scroll depth of the page.
- Automated Verification:
  - Added dedicated Playwright tests in `tests/navigation.spec.ts` asserting:
    - Sticky header remains visible and pinned at `box.y === 0` when scrolled 800px down.
    - Wordmark, search button, and cart button are visible and interactable while scrolled.
    - Hovering over "Custom Framing" while scrolled properly reveals the India Circus-inspired MegaMenu directly beneath the sticky header.
    - Theme switching while scrolled toggles cleanly between Dark Mode and Light Mode with sticky header maintaining `top: 0`.
    - Mobile viewport (390x844) maintains sticky header at `box.y === 0` when scrolled 600px down, and mobile navigation drawer opens and closes cleanly.
  - All 36 Playwright tests passed (36/36).
- Production Build: `npm run build` completed with 0 errors.
  - TypeScript compilation and Turbopack static page generation passed with 0 errors.
- Verification Screenshots:
  - `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-14-sticky-header-scrolled-dark.png`
  - `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-14-sticky-header-scrolled-light.png`
  - `.agent/screenshots/task-14-sticky-header-scrolled-dark.png`
  - `.agent/screenshots/task-14-sticky-header-scrolled-light.png`

### 2026-11-14 - TASK-13: Resolve Light Mode Theme Styling and Contrast in Site Footer
- Root Cause Identified: In Tailwind CSS v4, `dark:` modifier defaults to the OS media query (`prefers-color-scheme: dark`) rather than ancestor `.dark` class unless `@custom-variant dark` is configured. As a result, users with dark mode enabled in macOS experienced `dark:bg-[#141414]` overriding light mode styles even when `.light` was present on `<html>`.
- Fixed `app/globals.css`: Added `@custom-variant dark (&:where(.dark, .dark *));` to bind all `dark:` utility variants to `.dark` class selector.
- Refactored `components/layout/site-footer.tsx`:
  - Main container: Changed background to `bg-[#FAF8F5] dark:bg-[#141414]` for clean, museum gallery warm ivory in Light Mode and charcoal in Dark Mode.
  - Newsletter section: Changed submit button text from `text-[var(--background)]` to high-contrast `text-[#1A1A1A]`, ensuring legible dark charcoal typography on gold `#C5A059` / `#B38F48`. White input field (`bg-[var(--color-canvas-surface)]`) with clear placeholder and border.
  - Navigation links: Upgraded text color from `text-[var(--color-ink-muted)]` to `text-[var(--color-ink-secondary)]` (`#5C554E` in light mode, `#E0E0E0` in dark mode) with smooth gold hover transitions.
  - Bottom Trust Bar: Set to `bg-[var(--color-canvas-subtle)]` (`#F0ECE1` in light mode, `#2A2A2A` in dark mode) with `data-testid="footer-bottom-bar"` and high-contrast badges and legal links (`text-[var(--color-ink-secondary)]`).
- Automated Verification: Added explicit test case in `tests/theme-toggle.spec.ts` asserting footer background `#FAF8F5`, ink colors, input styling, and bottom bar colors in both modes. All 34 Playwright tests passing (34/34).
- Production Build: `npm run build` completed with 0 errors.
- Screenshots Captured:
  - `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-13-footer-light-mode.png`
  - `/Users/pritish/.gemini/antigravity/brain/91fc1fed-fc5f-495e-88c1-129ef76052af/task-13-footer-dark-mode.png`
  - `.agent/screenshots/task-13-footer-light-mode.png`
  - `.agent/screenshots/task-13-footer-dark-mode.png`

### 2026-11-14 - TASK-12: Fix Light Theme Adaptations for Atelier 50/50 Glass Slider, Lookbook Cards, and Hardcoded Surfaces
- Fixed AtelierMaterials Glass Comparison Slider (50/50 view): replaced hardcoded dark gradient with adaptive museum gallery wall gradient (`dark:from-[#2D2218] dark:to-[#0F0C08] from-[#F4EFE6] via-[#EAE2D2] to-[#DFD5C2]`), and replaced `#333333` with `--color-border-subtle`.
- Fixed CustomerLookbook "Featured in this Room" cards: replaced hardcoded `bg-[#242424]`, `text-[#F4F1EA]`, and `border-[#333333]` with `--color-canvas-surface` (#FFFFFF in light mode), `--color-ink-primary` (#1A1A1A in light mode), and `--color-border-subtle`.
- Harmonized FrameCard artwork stage, CuratedCollections value dividers, FramingJourney step illustrations, and SiteFooter container for light theme.
- Playwright verified: 33/33 tests passing. Captured screenshot: `task-12-light-mode-fixed.png`.

### 2026-11-14 - TASK-11: Implement Light Mode and Theme Toggle Switcher with State Persistence
- Defined dual-mode museum theme system (Dark Museum Wall `.dark` and Warm Museum Gallery Light `.light`).
- Built accessible `ThemeToggle` with Sun/Moon icons in header and mobile drawer.
- 32/32 tests passing.

### 2026-11-14 - TASK-10: Implement Museum Dark Charcoal, Rich Burgundy & Muted Gold Design System with Serif/Sans Typography
- Inverted visual weight: Foundation in Deep Charcoal (`#1A1A1A` to `#2A2A2A`), Rich Burgundy (`#6B1C23`), Muted Gold (`#C5A059`), Soft Cream (`#F4F1EA`).
- 30/30 Playwright tests passing.

### 2026-11-14 - TASK-9: Redesign with Apple Ecosystem Typography, Premium Palette, Responsive Hero Carousel, and Frame Studio Reordering
- Responsive HeroCarousel and repositioned CustomFrameStudio.
- 30/30 Playwright tests passing.

### 2026-11-14 - TASK-8: Customer UGC Lookbook, Accessible FAQ Accordion, Footer and E2E Smoke Test
- Built customer lookbook with hotspot pins, Radix FAQ accordion, luxury archival footer.
- 29/29 tests passing.

### 2026-11-14 - TASK-7: 3-Step Framing Journey and The Atelier Material Story
- Built 3-step illustrated workflow and interactive glass comparison slider.
- 24/24 tests passing.

### 2026-11-14 - TASK-6: Curated Collections with Dual-State In-Situ Product Cards
- Built dual-state product cards with quick-customise drawer and 5 category filter tabs.
- 21/21 tests passing.

### 2026-11-14 - TASK-5: Visual Category Discovery Pills and Craftsmanship Trust Bar
- Built circular discovery pills carousel and 4-column craftsmanship trust bar.
- 15/15 tests passing.

### 2026-11-14 - TASK-4: Hero Section with Interactive Live Frame Switcher Island
- Built live customizer island with 5 mouldings, 3 mats, and room context toggle.
- 10/10 tests passing.

### 2026-11-14 - TASK-3: Sticky Header with India Circus-Inspired Mega-Menu and Announcement Bar
- Built sticky navigation with 4-column mega-menu and mobile drawer.
- 5/5 tests passing.

### 2026-11-14 - TASK-2: Artisanal Design Tokens and Typography Hierarchy
- Initialized typography and shadow variables.

### 2026-11-14 - TASK-1: Verify project prerequisites and setup dependencies
- Confirmed .env.local, installed Radix UI, Lucide, and Playwright.
