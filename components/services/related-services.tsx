import Link from "next/link";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { ServiceVerticalData } from "@/data/services-data";
import { CategorySwatch } from "@/components/home/category-swatches";

interface RelatedServicesProps {
  relatedServices: ServiceVerticalData[];
  currentVerticalTitle: string;
}

export function RelatedServices({ relatedServices, currentVerticalTitle }: RelatedServicesProps) {
  if (relatedServices.length === 0) return null;

  return (
    <section
      data-testid="related-services-grid"
      aria-label="Related Service Verticals"
      className="w-full bg-[var(--background)] py-12 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)] mb-2 font-mono">
              <Layers className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              <span>Cross-Disciplinary Studio Capabilities</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
              Complementary Studio Verticals
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-xl">
              Clients often combine {currentVerticalTitle} with our adjacent fabrication and fine art capabilities.
            </p>
          </div>
          <Link
            href="/#services"
            className="text-xs font-mono text-[var(--color-accent-gold)] hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All 6 Verticals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid of Related Verticals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              data-testid={`related-service-${service.id}`}
              className="group p-6 rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/70 hover:bg-[var(--color-canvas-subtle)] transition-all duration-300 flex flex-col justify-between shadow-2xs"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-base)]/80">
                    {service.audienceTag}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-2 py-0.5 rounded-full bg-[var(--color-canvas-base)]/40">
                    Spatial Dropzone
                  </span>
                </div>

                {/* Spatial Centerpiece Drop Zone */}
                <div className="w-full aspect-[4/3] rounded-2xl border border-dashed border-[var(--color-border-strong)]/50 bg-[var(--color-canvas-base)]/50 my-2 flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:border-[var(--color-accent-gold)]/50 transition-colors">
                  <div className="w-20 h-20 rounded-xl overflow-hidden p-1 bg-[var(--color-canvas-surface)] shadow-inner transition-transform duration-500 group-hover:scale-105">
                    <CategorySwatch id={service.id} />
                  </div>
                  <span className="mt-2 text-[9px] font-mono text-[var(--color-ink-muted)]">
                    4:3 Spatial Asset
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors mt-3">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-ink-secondary)] line-clamp-2">
                  {service.tagline}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-5 pt-3 border-t border-dashed border-[var(--color-border-strong)]/40 flex items-center justify-between text-xs font-mono text-[var(--color-accent-gold)]">
                <span>View Full Vertical Spec</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
