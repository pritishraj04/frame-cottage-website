"use client";

import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronDown,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Camera,
  SunDim,
  Layers,
  Wrench,
  Headphones,
} from "lucide-react";
import Link from "next/link";

export interface FAQItem {
  id: string;
  category: string;
  icon: typeof HelpCircle;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  specs: { label: string; value: string }[];
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-resolution",
    category: "Printing & Digital Files",
    icon: Camera,
    question: "What photo resolution or file quality do I need for digital uploads?",
    shortAnswer:
      "We recommend 300 DPI at your target print size. Our optical pre-flight engine flags an automatic alert if file density falls below 150 DPI.",
    fullAnswer:
      "To produce museum-grade prints, we recommend uploading JPEG, PNG, HEIC, or TIFF images with a native resolution of 300 DPI at your intended dimensions (for instance, 2400×3000 pixels for an 8×10″ print). When you upload into our Atelier Customiser, our optical pre-flight engine calculates your image's exact output pixel density. If the file falls below 150 DPI, we immediately flag a resolution advisory before checkout. Every piece is printed with 12-color archival pigment giclée inks on 310gsm 100% cotton rag paper guaranteed colorfast for over 100 years.",
    specs: [
      { label: "Optimal Resolution", value: "300 DPI Native" },
      { label: "Minimum Threshold", value: "150 DPI Pre-Flight Checked" },
      { label: "Paper Core", value: "310gsm 100% Cotton Rag Alpha-Cellulose" },
    ],
  },
  {
    id: "faq-acrylic",
    category: "Glazing & Conservation",
    icon: SunDim,
    question: "How does TruVue® UV-shielding acrylic compare to standard glass?",
    shortAnswer:
      "TruVue® blocks 99% of harmful UV radiation, eliminates greenish iron distortion, is shatterproof, and weighs 50% less than picture glass.",
    fullAnswer:
      "Standard picture glass is brittle, heavy, creates milky specular glare, carries a faint greenish iron tint, and permits over 60% of damaging UV spectrum light to degrade your art. We exclusively glaze all bespoke frames with TruVue® Conservation-Grade Optical Acrylic. It blocks 99% of ultraviolet rays (300nm–380nm), delivers over 97% pure visible light transmission without tint, is completely shatter-resistant during shipping, and is 50% lighter for effortless and secure wall hanging.",
    specs: [
      { label: "UV Blockade", value: "99% (300nm–380nm Spectrum)" },
      { label: "Clarity Rating", value: ">97% Pure Optical Transparency" },
      { label: "Impact Safety", value: "Shatterproof Conservation Grade" },
    ],
  },
  {
    id: "faq-guarantee",
    category: "Shipping & Protection",
    icon: ShieldCheck,
    question: "What happens if my frame or glass arrives damaged in transit?",
    shortAnswer:
      "Our 100% White-Glove Guarantee covers immediate expedited remake and dispatch within 48 hours at zero cost—no returns necessary.",
    fullAnswer:
      "Every frame is encased in our custom-molded shock-absorbing pulp corners and reinforced dual-wall corrugated crating. In the rare circumstance that a parcel suffers courier impact or damage in transit, our White-Glove Guarantee ensures you are 100% protected. Simply take a quick smartphone photo of the damage and email our concierge. We will rebuild your exact custom frame on high-priority rush and dispatch a brand-new replacement within 48 hours at zero charge to you—no return shipment required.",
    specs: [
      { label: "Replacement Cost", value: "$0.00 Covered by Guarantee" },
      { label: "Remake Speed", value: "Expedited Dispatch in 48 Hours" },
      { label: "Return Friction", value: "No return shipping necessary" },
    ],
  },
  {
    id: "faq-memorabilia",
    category: "Specialty Framing",
    icon: Layers,
    question: "Can I frame three-dimensional memorabilia, textiles, or canvas art?",
    shortAnswer:
      "Yes. Our atelier creates deep shadowbox profiles with 1.5″ to 2.5″ working depths, using reversible archival stitches and acid-free mounting.",
    fullAnswer:
      "Our master guild framers specialize in three-dimensional object framing, including sports jerseys, heirloom textiles, vintage medals, baby booties, and stretched oil canvases. We build deep shadowbox hardwood profiles with working interior depths ranging from 1.5″ to 2.5″. All textile items are mounted using conservation cotton-linen stitching or reversible acid-free mounting tabs. We strictly forbid hot glues, duct tapes, or acidic sprays to safeguard the lifelong integrity and resale value of your heirlooms.",
    specs: [
      { label: "Shadowbox Depths", value: "1.5″ to 2.5″ Interior Clearance" },
      { label: "Mounting Standards", value: "Reversible Cotton Stitching & Tabs" },
      { label: "Adhesive Rule", value: "Zero Acidic Glues or Tapes" },
    ],
  },
  {
    id: "faq-hardware",
    category: "Hardware & Hanging",
    icon: Wrench,
    question: "What hanging hardware is included with my custom frame?",
    shortAnswer:
      "Every frame arrives 100% ready to hang with vinyl-coated braided wire, brass D-rings, protective wall bumpers, heavy drywall hooks, and a mini level.",
    fullAnswer:
      "Every Frame Cottage piece arrives straight out of the box ready to install on your wall in under three minutes. We pre-install heavy-duty vinyl-coated stainless steel hanging wire, counter-sunk brass D-rings, and silicone wall bumpers to preserve your interior paint. Your unboxing kit also includes heavy-duty brass drywall hooks, hardened steel nails, and a complimentary pocket bubble level. For oversized gallery pieces exceeding 36 inches, we include precision aircraft-grade aluminum French cleats.",
    specs: [
      { label: "Pre-Installed Wire", value: "Vinyl-Coated Braided Stainless Steel" },
      { label: "Included Kit", value: "Brass Wall Hooks, Nails, Pocket Bubble Level" },
      { label: "Oversized Framing", value: "Interlocking Aircraft Aluminum Cleats" },
    ],
  },
];

export function FAQSection() {
  return (
    <section
      id="faq-section"
      data-testid="faq-section"
      aria-label="Frequently Asked Questions & Care"
      className="w-full bg-[#FAF7F2] py-16 sm:py-24 border-b border-[#E8E1D5]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================================
            EDITORIAL SECTION HEADER
           ===================================================================== */}
        <div
          data-testid="faq-header"
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE2] border border-[#E8E1D5] text-[#B45309] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>The Atelier Knowledge Base</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#191614] tracking-tight leading-[1.18]">
            Curating, Crafting & Caring for Your Frames
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#5C554E] leading-relaxed font-sans">
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
                className="bg-[#FFFFFF] border border-[#E8E1D5] rounded-2xl overflow-hidden shadow-xs hover:border-[#C5A059]/60 transition-colors group data-[state=open]:border-[#B45309] data-[state=open]:shadow-md"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    data-testid={`faq-trigger-${item.id}`}
                    className="flex flex-1 items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309] group transition-all"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 pr-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-[#B45309] flex items-center justify-center shrink-0 group-data-[state=open]:bg-[#B45309] group-data-[state=open]:text-white transition-colors">
                        <ItemIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div>
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#8F877E] block mb-0.5">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-[#191614] font-medium leading-snug group-hover:text-[#B45309] group-data-[state=open]:text-[#B45309] transition-colors">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 text-[#8F877E] group-data-[state=open]:bg-[#191614] group-data-[state=open]:text-white group-data-[state=open]:border-[#191614] transition-colors">
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content
                  data-testid={`faq-content-${item.id}`}
                  className="accordion-content overflow-hidden text-sm px-5 sm:px-6 pb-6 pt-1 text-[#5C554E]"
                >
                  <div className="border-t border-[#E8E1D5]/60 pt-4">
                    {/* Short Summary Highlight */}
                    <p className="font-semibold text-xs sm:text-sm text-[#191614] mb-3 leading-relaxed">
                      {item.shortAnswer}
                    </p>

                    {/* Extended Technical Explanation */}
                    <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed mb-4">
                      {item.fullAnswer}
                    </p>

                    {/* Technical Specs Grid */}
                    <div className="bg-[#FAF7F2] rounded-xl border border-[#E8E1D5] p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#8F877E] font-medium">
                            {spec.label}
                          </span>
                          <span className="font-semibold text-[#191614] mt-0.5">
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
        <div className="mt-10 sm:mt-12 bg-[#FFFFFF] rounded-2xl border border-[#E8E1D5] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECE2] border border-[#E8E1D5] text-[#B45309] flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#191614]">
                Have a bespoke framing inquiry or oversized installation?
              </h4>
              <p className="text-xs sm:text-sm text-[#5C554E] mt-0.5">
                Our Master Guild framing advisors provide complimentary layout styling consultations.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#191614] text-white hover:bg-[#B45309] text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs"
          >
            Speak with an Advisor
          </Link>
        </div>
      </div>
    </section>
  );
}