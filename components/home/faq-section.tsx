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
    category: "Image & Resolution",
    question: "What image resolution (DPI) do I need for digital uploads?",
    shortAnswer:
      "We recommend at least 300 DPI at your target print size, with a 150 DPI minimum accepted by our atelier inspection tool.",
    fullAnswer:
      "Our automated studio customizer evaluates your image upon upload. If your file is below 150 DPI for your desired frame size, the system triggers a resolution advisory to prevent pixelation. Every print is rendered using 12-color archival giclée pigment inks on 310gsm 100% cotton rag paper.",
    specs: [
      { label: "Optimal Resolution", value: "300 DPI" },
      { label: "Supported Formats", value: "JPEG, TIFF, PNG, RAW" },
      { label: "Color Space", value: "sRGB & Adobe RGB (1998)" },
    ],
    icon: Maximize,
  },
  {
    id: "faq-acrylic",
    category: "Preservation & Glazing",
    question: "Why does Frame Cottage use TruVue® Conservation Acrylic instead of regular glass?",
    shortAnswer:
      "TruVue® Conservation Acrylic provides 99% UV protection, is optically transparent, shatter-proof in transit, and half the weight of traditional float glass.",
    fullAnswer:
      "Traditional picture glass contains iron impurities that cast a greenish haze, provides less than 45% UV protection, and shatters easily during shipping. TruVue® Conservation-grade optical acrylic filters out 99% of harmful UV radiation, ensuring artwork colors stay true for over 100 years without degradation.",
    specs: [
      { label: "UV Radiation Block", value: "99% (300nm–380nm)" },
      { label: "Safety Rating", value: "Shatter-Resistant" },
      { label: "Weight Savings", value: "50% Lighter than Float Glass" },
    ],
    icon: ShieldCheck,
  },
  {
    id: "faq-guarantee",
    category: "Warranty & Shipping",
    question: "What is your Transit & Lifetime Craftsmanship Guarantee?",
    shortAnswer:
      "If your frame arrives damaged or ever loosens, warps, or separates over its lifetime, we rebuild and replace it 100% free of charge.",
    fullAnswer:
      "Every Frame Cottage piece travels in custom crush-proof wooden-reinforced packaging with edge-shock absorption bumpers. In the rare event of transit damage, notify our concierge within 48 hours for an immediate priority workshop rebuild. Furthermore, our joinery and hardwood frames are warranted for life against structural warping or spline separation.",
    specs: [
      { label: "Transit Coverage", value: "100% Insured Priority Dispatch" },
      { label: "Damage Response", value: "Priority Rebuild within 48 hours" },
      { label: "Craft Warranty", value: "Generational Lifetime Guarantee" },
    ],
    icon: Truck,
  },
  {
    id: "faq-memorabilia",
    category: "Atelier Services",
    question: "Can I mail in original fine art, diplomas, or memorabilia?",
    shortAnswer:
      "Yes. We offer prepaid insured art mailer kits with white-glove archival handling by Master Guild picture framers.",
    fullAnswer:
      "When you choose our Mail-In Atelier service, we ship you a reinforced archival mailer complete with acid-free glassine sleeves, rigid foam backing, and prepaid trackable return shipping insured up to $5,000. Once received at our studio, our framers photograph and inspect your piece under controlled gallery lighting before mounting with reversible archival corners.",
    specs: [
      { label: "Mailer Insurance", value: "Up to $5,000 Included" },
      { label: "Mounting Method", value: "100% Reversible Archival Mylar Corners" },
      { label: "Handling Protocol", value: "White-Glove Cleanroom Atelier" },
    ],
    icon: HelpCircle,
  },
  {
    id: "faq-hardware",
    category: "Installation & Hardware",
    question: "What hanging hardware is included with my bespoke frame?",
    shortAnswer:
      "Every frame arrives completely ready to hang with stainless steel coated wire, solid brass hooks, nails, and a pocket bubble level.",
    fullAnswer:
      "We believe framing is incomplete if you have to visit a hardware store. Every order includes pre-installed coated hanging wire, solid brass wall brackets, tempered steel nails suitable for drywall and plaster, silicone wall-protecting bumpers, and a mini bubble level. For large or heavy gallery pieces, we provide recessed aluminum French cleats.",
    specs: [
      { label: "Wire Specification", value: "Poly-Coated Braided Stainless Steel" },
      { label: "Wall Brackets", value: "Heavy-Duty Solid Antiqued Brass" },
      { label: "Tool Included", value: "Atelier Pocket Level & Wall Bumpers" },
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
      className="w-full bg-[#1A1A1A] py-16 sm:py-24 border-b border-[#333333] text-[#F4F1EA]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            EDITORIAL SECTION HEADER
           ===================================================================== */}
        <div
          data-testid="faq-header"
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#242424] border border-[#333333] text-[#F4F1EA] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Atelier Knowledge Base</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F4F1EA] tracking-tight leading-[1.12]">
            Curating, Crafting & Caring for Your Frames
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#E0E0E0] leading-relaxed font-normal">
            Clear, transparent answers on digital resolution, museum-grade TruVue® acrylic, damage replacement guarantees, and included hanging suites.
          </p>
        </div>

        {/* =====================================================================
            RADIX UI ACCORDION ROOT
           ===================================================================== */}
        <Accordion.Root
          type="single"
          collapsible
          defaultValue="faq-resolution"
          data-testid="faq-accordion"
          className="w-full space-y-4"
        >
          {FAQ_DATA.map((item) => {
            const ItemIcon = item.icon;

            return (
              <Accordion.Item
                key={item.id}
                value={item.id}
                data-testid={`faq-item-${item.id}`}
                className="bg-[#222222] border border-[#333333] rounded-2xl overflow-hidden shadow-xs hover:border-[#C5A059]/50 transition-colors group data-[state=open]:border-[#C5A059]/70 data-[state=open]:shadow-md"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    data-testid={`faq-trigger-${item.id}`}
                    className="flex flex-1 items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] group transition-all"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 pr-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2A2A2A] border border-[#333333] text-[#C5A059] flex items-center justify-center shrink-0 group-data-[state=open]:bg-[#6B1C23] group-data-[state=open]:text-[#F4F1EA] transition-colors">
                        <ItemIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div>
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-0.5">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-[#F4F1EA] font-semibold leading-snug group-hover:text-[#C5A059] transition-colors">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-[#333333] flex items-center justify-center shrink-0 text-[#C5A059] group-data-[state=open]:bg-[#6B1C23] group-data-[state=open]:text-[#F4F1EA] group-data-[state=open]:border-[#6B1C23] transition-colors">
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content
                  data-testid={`faq-content-${item.id}`}
                  className="accordion-content overflow-hidden text-sm px-5 sm:px-6 pb-6 pt-1 text-[#E0E0E0]"
                >
                  <div className="border-t border-[#333333] pt-4">
                    {/* Short Summary Highlight */}
                    <p className="font-semibold text-xs sm:text-sm text-[#F4F1EA] mb-3 leading-relaxed">
                      {item.shortAnswer}
                    </p>

                    {/* Extended Technical Explanation */}
                    <p className="text-xs sm:text-sm text-[#E0E0E0] leading-relaxed mb-4">
                      {item.fullAnswer}
                    </p>

                    {/* Technical Specs Grid */}
                    <div className="bg-[#1A1A1A] rounded-xl border border-[#333333] p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#9E9E9E] font-medium">
                            {spec.label}
                          </span>
                          <span className="font-semibold text-[#F4F1EA] mt-0.5">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>

        {/* =====================================================================
            CONCIERGE HELP FOOTNOTE CARD
           ===================================================================== */}
        <div className="mt-10 sm:mt-12 bg-[#222222] rounded-2xl border border-[#333333] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#2A2A2A] border border-[#333333] text-[#C5A059] flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-semibold text-[#F4F1EA]">
                Have a bespoke framing inquiry or oversized installation?
              </h4>
              <p className="text-xs sm:text-sm text-[#E0E0E0] mt-0.5">
                Our Master Guild framing advisors provide complimentary layout styling consultations.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-full bg-[#C5A059] text-[#1A1A1A] hover:bg-[#B38F48] text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs"
          >
            Speak with an Advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
