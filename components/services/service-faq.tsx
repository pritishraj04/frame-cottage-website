"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { ServiceFAQ } from "@/data/services-data";

interface ServiceFAQProps {
  faq: ServiceFAQ[];
  verticalTitle: string;
}

export function ServiceFAQSection({ faq, verticalTitle }: ServiceFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      data-testid="service-faq"
      aria-label={`${verticalTitle} Technical FAQ`}
      className="w-full bg-[var(--background)] py-12 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)] mb-2 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span>Technical Advisory & FAQ</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)]">
            Essential specifications, lead times, materials, and engineering guidance for {verticalTitle}.
          </p>
        </div>

        {/* Accordion / Cards List */}
        <div className="space-y-4">
          {faq.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                data-testid={`faq-item-${idx}`}
                className={`rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)]/70 shadow-md"
                    : "border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/30 hover:border-[var(--color-accent-gold)]/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)]">
                    {item.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full border border-dashed border-[var(--color-border-strong)] flex items-center justify-center shrink-0 text-[var(--color-accent-gold)] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[var(--color-canvas-base)]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed border-t border-dashed border-[var(--color-border-strong)]/40 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
