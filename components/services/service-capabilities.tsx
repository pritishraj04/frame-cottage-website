import { Cpu, Wrench, Layers, CheckCircle2 } from "lucide-react";
import { TechnicalCapability } from "@/data/services-data";

interface ServiceCapabilitiesProps {
  capabilities: TechnicalCapability[];
  verticalTitle: string;
}

export function ServiceCapabilities({ capabilities, verticalTitle }: ServiceCapabilitiesProps) {
  return (
    <section
      id="capabilities"
      data-testid="service-capabilities"
      aria-label={`${verticalTitle} Technical Capabilities and Machinery`}
      className="w-full bg-[var(--background)] py-12 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)] mb-2 font-mono">
              <Cpu className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              <span>Studio Engineering & Machinery</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
              Technical Capabilities & Tooling Canvas
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-xl">
              Equipped with industrial computer-controlled cutters, cleanroom assembly benches, and high-precision CNC routers.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-3 py-1 rounded-full bg-[var(--color-canvas-subtle)] self-start sm:self-auto">
            {capabilities.length} Active Workstations
          </span>
        </div>

        {/* 4-6 Capability Cards with Dashed PNG Drop Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              data-testid={`capability-card-${cap.id}`}
              className="p-5 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-all duration-300 flex flex-col justify-between group shadow-2xs"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-base)]/80">
                    {cap.badge}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                    Machine Spec
                  </span>
                </div>

                {/* Spatial Dashed Dropzone for Machine / Sample PNG */}
                <div className="w-full aspect-[4/3] rounded-xl border border-dashed border-[var(--color-border-strong)]/50 bg-[var(--color-canvas-base)]/50 my-3 flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:border-[var(--color-accent-gold)]/50 transition-colors">
                  <div className="w-14 h-14 rounded-full border border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-surface)] flex items-center justify-center text-[var(--color-accent-gold)] group-hover:scale-110 transition-transform duration-300">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <span className="mt-2.5 text-[9px] font-mono text-[var(--color-ink-muted)] text-center px-2 line-clamp-1">
                    {cap.pngPlaceholderText}
                  </span>
                  <span className="mt-1 text-[8px] font-mono text-[var(--color-accent-gold)]/80 uppercase">
                    Spatial Dropzone
                  </span>
                </div>

                {/* Machine Name & Title */}
                <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors mt-2">
                  {cap.title}
                </h3>
                <p className="text-xs font-mono text-[var(--color-accent-gold)] mt-0.5">
                  {cap.machine}
                </p>

                {/* Operational Details */}
                <p className="mt-2.5 text-xs text-[var(--color-ink-secondary)] leading-relaxed">
                  {cap.description}
                </p>
              </div>

              {/* Technical Parameter Pill */}
              <div className="mt-4 pt-3 border-t border-dashed border-[var(--color-border-strong)]/40">
                <div className="flex items-start gap-1.5 text-[11px] font-mono text-[var(--color-ink-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{cap.specs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
