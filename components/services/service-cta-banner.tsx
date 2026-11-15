import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { VerticalId } from "@/data/services-data";

interface ServiceCtaBannerProps {
  verticalId: VerticalId;
  verticalTitle: string;
}

export function ServiceCtaBanner({ verticalId, verticalTitle }: ServiceCtaBannerProps) {
  return (
    <section
      data-testid="service-cta-banner"
      aria-label="Studio Conversion Banner"
      className="w-full bg-[var(--background)] py-14 sm:py-20 text-[var(--color-ink-primary)] transition-colors duration-250 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-dashed border-[var(--color-accent-gold)]/60 bg-[var(--color-canvas-subtle)]/70 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle gold glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--color-accent-gold)]/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full border border-dashed border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-base)]/80 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              <span>Initiate Your Specification</span>
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-ink-primary)] max-w-2xl">
              Ready to Commission {verticalTitle}?
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-xl leading-relaxed">
              Submit your spatial blueprints, architectural CAD files, or custom dimensions directly to our engineering team for guaranteed sub-millimeter execution.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href={`/rfq?vertical=${verticalId}`}
                data-testid="banner-rfq-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer group"
              >
                <span>Initiate RFQ Specification</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`/rfq?vertical=${verticalId}&consultation=true`}
                data-testid="banner-consultation-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-dashed border-[var(--color-border-strong)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] text-sm font-medium transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-4 h-4 text-[var(--color-accent-gold)]" />
                <span>Schedule Studio Consultation</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-[var(--color-border-strong)]/40 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-[var(--color-ink-muted)]">
              <span>✓ ISO 9001:2015 Compliant</span>
              <span>✓ GeM Certified Vendor</span>
              <span>✓ White-Glove Handover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
