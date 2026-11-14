import { Sparkles, ShieldCheck } from "lucide-react";
import { KeyHighlight } from "@/data/services-data";

interface ServiceHighlightsProps {
  highlights: KeyHighlight[];
}

export function ServiceHighlights({ highlights }: ServiceHighlightsProps) {
  return (
    <section
      data-testid="service-highlights"
      aria-label="Key Service Highlights"
      className="w-full bg-[var(--background)] py-10 sm:py-14 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-all duration-300 flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)] flex items-center justify-center text-[var(--color-accent-gold)] group-hover:border-[var(--color-accent-gold)] transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-base)]/70">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-[var(--color-border-strong)]/40 flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-ink-muted)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                <span>Verified Studio Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
