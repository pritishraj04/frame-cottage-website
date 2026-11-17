import { Building2, MapPin, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { ServiceCaseStudy } from "@/data/services-data";

interface ServiceCaseStudiesProps {
  caseStudies: ServiceCaseStudy[];
  verticalTitle: string;
}

export function ServiceCaseStudies({ caseStudies, verticalTitle }: ServiceCaseStudiesProps) {
  return (
    <section
      id="case-studies"
      data-testid="service-case-studies"
      aria-label={`${verticalTitle} Case Studies & Client Showcase`}
      className="w-full bg-[var(--background)] py-12 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)] mb-2 font-mono">
              <Building2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              <span>Project Provenance & Impact</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
              Client Showcase & Case Studies
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-xl">
              Realized spatial installations, institutional archives, and commercial commissions executed to rigorous standards.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-3 py-1 rounded-full bg-[var(--color-canvas-subtle)] self-start sm:self-auto">
            {caseStudies.length} Featured Case Studies
          </span>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              data-testid={`case-study-${study.id}`}
              className="rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* 16:9 Spatial Canvas Drop Zone */}
                <div className="w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-base)]/60 flex flex-col justify-between p-4 relative overflow-hidden group-hover:border-[var(--color-accent-gold)]/50 transition-colors">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-base)]/80">
                      {study.spatialAssetTag}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                      In-Situ Photography
                    </span>
                  </div>

                  {/* Center Architectural / In-Situ Placeholder */}
                  <div className="flex flex-col items-center justify-center my-auto">
                    <div className="w-16 h-16 rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] group-hover:scale-105 transition-transform duration-500">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <span className="mt-2 text-[10px] font-mono text-[var(--color-ink-muted)]">
                      High-Resolution Spatial Scene Drop Zone
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-muted)] pt-1 border-t border-dashed border-[var(--color-border-strong)]/40">
                    <span>Frames Cottage Provenance</span>
                    <span className="text-[var(--color-accent-gold)]">Verified Installation</span>
                  </div>
                </div>

                {/* Case Study Meta */}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--color-ink-muted)]">
                  <span className="text-[var(--color-accent-gold)] font-bold">{study.client}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {study.location}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors mt-2">
                  {study.title}
                </h3>

                {/* Scope & Outcome */}
                <div className="mt-3 space-y-2 text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  <p>
                    <strong className="text-[var(--color-ink-primary)] font-medium">Scope: </strong>
                    {study.scope}
                  </p>
                  <p>
                    <strong className="text-[var(--color-accent-gold)] font-medium">Outcome: </strong>
                    {study.outcome}
                  </p>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="mt-6 pt-4 border-t border-dashed border-[var(--color-border-strong)]/50 grid grid-cols-3 gap-2">
                {study.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase text-[var(--color-ink-muted)]">
                      {stat.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[var(--color-ink-primary)] mt-0.5">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
