"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import {
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Maximize,
  HelpCircle,
  Truck,
  Wrench,
  Headphones,
  Compass,
  Cpu,
  Landmark,
  Award,
} from "lucide-react";

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  specs: { label: string; value: string }[];
  icon: typeof Sparkles;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-resolution",
    category: "B2C Custom Framing",
    question: "What image resolution (DPI) do I need for digital uploads?",
    shortAnswer:
      "We recommend at least 300 DPI at your target print size, with a 150 DPI minimum accepted by our inspection tool.",
    fullAnswer:
      "Our automated studio customizer evaluates your image upon upload. If your file is below 150 DPI for your desired frame size, the system triggers a resolution advisory to prevent pixelation. Every print is rendered using 12-color archival giclée pigment inks on 310gsm 100% cotton rag paper, sealed behind TruVue® conservation UV acrylic.",
    specs: [
      { label: "Optimal Resolution", value: "300 DPI" },
      { label: "Supported Formats", value: "JPEG, TIFF, PNG, RAW" },
      { label: "Color Space", value: "sRGB & Adobe RGB (1998)" },
    ],
    icon: Maximize,
  },
  {
    id: "faq-acrylic",
    category: "B2B Spatial Design & Signage",
    question: "Why does Frame Cottage use TruVue® Conservation Acrylic for commercial spatial design and bespoke framing?",
    shortAnswer:
      "TruVue® Conservation Acrylic provides 99% UV protection, is optically transparent, shatter-proof in transit, and half the weight of traditional float glass.",
    fullAnswer:
      "Traditional picture glass contains iron impurities that cast a greenish haze, provides less than 45% UV protection, and shatters easily during shipping. TruVue® Conservation-grade optical acrylic filters out 99% of harmful UV radiation, ensuring artwork colors stay true for over 100 years without degradation.",
    specs: [
      { label: "UV Radiation Block", value: "99% (300nm–380nm)" },
      { label: "Safety Rating", value: "Shatter-Resistant" },
      { label: "Commercial Glazing", value: "ADA Title III & Exterior Wayfinding Compatible" },
    ],
    icon: Compass,
  },
  {
    id: "faq-cnc",
    category: "Industrial CNC & Metalworks",
    question: "What tolerances, materials, and envelope sizes are supported by your precision CNC & laser facility?",
    shortAnswer:
      "Our 5-axis CNC routing and high-power fiber laser cutting achieve micro-tolerances within ±0.1mm on solid brass, stainless steel, aluminum, and timber.",
    fullAnswer:
      "We operate dual-shuttle 3000 mm × 1500 mm bed envelopes capable of cutting structural sheet metals up to 20mm in stainless steel and brass, and heavy 5-axis routing for architectural timber screens. Finishes include architectural brushed satin, hand-rubbed antique bronze patinas, bead-blasting, and marine-grade PVDF powder coating.",
    specs: [
      { label: "Machining Tolerance", value: "Micro-Precision within ±0.1 mm" },
      { label: "Laser Envelope", value: "Large-Format 3000 mm × 1500 mm Bed" },
      { label: "Materials", value: "Solid Brass C260, 316 Stainless, 5052 Aluminum & FSC Hardwoods" },
    ],
    icon: Cpu,
  },
  {
    id: "faq-guarantee",
    category: "Warranty & Public Sector",
    question: "What is your Transit & Lifetime Craftsmanship Guarantee and GeM compliance?",
    shortAnswer:
      "If your frame arrives damaged or ever loosens, warps, or separates over its lifetime, we rebuild and replace it 100% free of charge.",
    fullAnswer:
      "Every Frame Cottage piece travels in custom crush-proof wooden-reinforced packaging with edge-shock absorption bumpers. In the rare event of transit damage, notify our concierge within 48 hours for an immediate priority workshop rebuild. Furthermore, our joinery and hardwood frames are warranted for life against structural warping or spline separation.",
    specs: [
      { label: "Transit Coverage", value: "100% Insured Priority Dispatch" },
      { label: "Damage Response", value: "Priority Rebuild within 48 hours" },
      { label: "Tender Standards", value: "GeM Registered & ISO 9001:2015" },
    ],
    icon: Landmark,
  },
  {
    id: "faq-memorabilia",
    category: "Custom Gifting & Corporate Mementos",
    question: "What are the minimum volume quantities and lead times for corporate gifting and custom awards?",
    shortAnswer:
      "We produce bespoke one-off executive awards up to 10,000+ unit corporate milestone drops, typically dispatched within 7–14 business days.",
    fullAnswer:
      "From solid American walnut and K9 optical crystal leadership trophies to fiber-engraved solid brass milestone plaques, our gifting studio offers full end-to-end personalization. Each order includes custom-molded velvet-lined presentation keepsake boxes with gold foil debossing and white-glove drop-shipping to individual recipient addresses.",
    specs: [
      { label: "Volume Scaling", value: "From 1 bespoke trophy to 10,000+ corporate gifts" },
      { label: "Production Window", value: "7–14 Business Days (Expedited Available)" },
      { label: "Packaging Included", value: "Custom Velvet-Lined Archival Presentation Case" },
    ],
    icon: Award,
  },
  {
    id: "faq-hardware",
    category: "Turnkey Installation & Hardware",
    question: "What turnkey on-site installation and hardware services are provided with your architectural projects?",
    shortAnswer:
      "Every project includes pre-engineered hanging hardware, and commercial/civic installations feature certified on-site rigging teams.",
    fullAnswer:
      "Residential framing orders include pre-installed poly-coated stainless steel wire, antiqued brass brackets, tempered nails, and a pocket bubble level. For large commercial spatial installations and public sector civic monuments, our licensed nationwide white-glove rigging teams handle on-site structural anchoring, French cleats, and electrical tie-ins.",
    specs: [
      { label: "Residential Hardware", value: "Poly-Coated Wire, Brass Brackets & Bubble Level" },
      { label: "Commercial Installation", value: "Licensed Nationwide Rigging & Structural Anchoring" },
      { label: "Warranty", value: "Generational Lifetime Craftsmanship Guarantee" },
    ],
    icon: Wrench,
  },
];

export function FAQSection() {
  return (
    <section
      id="faq-section"
      data-testid="faq-section"
      aria-label="Frequently Asked Questions & Care"
      className="w-full bg-[var(--background)] py-16 sm:py-24 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 scroll-mt-28 sm:scroll-mt-32 relative"
    >
      <span id="faq" className="absolute -top-28 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            SECTION HEADER WITH PNG TECHNICAL BADGES
           ========================================================================= */}
        <div data-testid="faq-header" className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-canvas-surface)] border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] text-xs font-mono font-medium uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span>Enterprise, Studio & Client Guidance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--color-ink-primary)] tracking-tight leading-[1.12]">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed font-normal max-w-xl mx-auto">
            Technical guidance across our 6 service verticals—from bespoke residential framing to commercial spatial signage and public sector contracts.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-[var(--color-border-strong)] text-[11px] font-mono text-[var(--color-ink-muted)] bg-[var(--color-canvas-base)]/40">
            Enterprise Technical FAQ & Engineering Matrix
          </div>
        </div>

        {/* =========================================================================
            RADIX UI ACCORDION WITH DASHED SPATIAL CARDS
           ========================================================================= */}
        <Accordion.Root
          type="single"
          collapsible
          defaultValue="faq-resolution"
          data-testid="faq-accordion"
          className="space-y-4"
        >
          {FAQ_DATA.map((item) => {
            const ItemIcon = item.icon;

            return (
              <Accordion.Item
                key={item.id}
                value={item.id}
                data-testid={`faq-item-${item.id}`}
                className="bg-[var(--color-canvas-surface)] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 overflow-hidden transition-all duration-200 hover:border-[var(--color-accent-gold)] shadow-xs"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    data-testid={`faq-trigger-${item.id}`}
                    className="flex-1 flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group hover:bg-[var(--color-canvas-subtle)] transition-colors focus:outline-none"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4 pr-4">
                      {/* Category Badge Icon */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-canvas-subtle)] border border-dashed border-[var(--color-border-strong)] flex items-center justify-center text-[var(--color-accent-gold)] shrink-0 group-hover:scale-105 transition-transform">
                        <ItemIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-[0.16em] font-semibold text-[var(--color-accent-gold)]">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)] tracking-tight group-hover:text-[var(--color-accent-gold)] transition-colors">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[var(--color-canvas-subtle)] border border-dashed border-[var(--color-border-strong)] flex items-center justify-center text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent-gold)] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content
                  data-testid={`faq-content-${item.id}`}
                  className="px-5 sm:px-6 pb-6 pt-2 text-sm text-[var(--color-ink-secondary)] leading-relaxed border-t border-dashed border-[var(--color-border-strong)]/40 animate-in fade-in duration-200"
                >
                  <p className="font-medium text-[var(--color-ink-primary)] mb-3">
                    {item.shortAnswer}
                  </p>

                  <p className="mb-4 text-xs sm:text-sm text-[var(--color-ink-secondary)]">
                    {item.fullAnswer}
                  </p>

                  {/* Technical Specs Strip with Dashed Container */}
                  <div className="bg-[var(--color-canvas-subtle)]/70 rounded-xl p-3.5 sm:p-4 border-2 border-dashed border-[var(--color-border-strong)]/50 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center justify-between col-span-1 sm:col-span-3 pb-2 mb-1 border-b border-dashed border-[var(--color-border-strong)]/40 text-[10px] font-mono text-[var(--color-accent-gold)]">
                      <span>Technical Documentation & Reference Spec</span>
                      <span className="text-[var(--color-ink-muted)]">Verified ISO Standard</span>
                    </div>
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <span className="text-[10px] uppercase font-semibold text-[var(--color-ink-muted)] tracking-wider">
                          {spec.label}
                        </span>
                        <p className="font-medium text-[var(--color-ink-primary)]">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>

        {/* Studio Concierge Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-[var(--color-canvas-surface)] border-2 border-dashed border-[var(--color-border-strong)]/60 hover:border-[var(--color-accent-gold)]/60 transition-colors flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-[var(--color-ink-primary)]">
                Have a Complex Spatial or Tender Specification?
              </h4>
              <p className="text-xs text-[var(--color-ink-secondary)]">
                Our structural engineers and framing curators review CAD drawings and tender documents within 24 hours.
              </p>
            </div>
          </div>

          <Link
            href="/rfq"
            data-testid="faq-submit-rfq-cta"
            className="px-5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] font-semibold transition-colors shrink-0"
          >
            Submit Project RFQ
          </Link>
        </div>
      </div>
    </section>
  );
}
