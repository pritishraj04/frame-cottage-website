import { Cpu, ShieldCheck, Compass, Landmark } from "lucide-react";

export interface TrustPillar {
  id: string;
  testId: string;
  title: string;
  description: string;
  icon: typeof Cpu;
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    id: "precision-fabrication",
    testId: "trust-bar-hardwoods",
    title: "In-House Precision Fabrication",
    description:
      "CNC routing, fiber laser cutting, and master artisanal joinery under one roof.",
    icon: Cpu,
  },
  {
    id: "archival-industrial",
    testId: "trust-bar-cotton-mats",
    title: "Museum Archival & Industrial Standards",
    description:
      "ISO certified, FSC® timber stewardship, and TruVue® UV conservation glazing.",
    icon: ShieldCheck,
  },
  {
    id: "turnkey-execution",
    testId: "trust-bar-acrylic",
    title: "End-to-End Turnkey Execution",
    description:
      "3D spatial design, engineering, precision fabrication & white-glove installation.",
    icon: Compass,
  },
  {
    id: "enterprise-scale",
    testId: "trust-bar-hardware",
    title: "Public Sector & Enterprise Scale",
    description:
      "GeM registered and tender compliant with high-volume institutional capacity.",
    icon: Landmark,
  },
];

export function TrustBar() {
  return (
    <section
      aria-label="Multi-Disciplinary Studio Capabilities"
      data-testid="trust-bar"
      className="w-full bg-[var(--color-canvas-subtle)]/60 border-b border-[var(--color-border-subtle)] py-12 lg:py-16 text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Spatial Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-dashed border-[var(--color-border-strong)]/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-gold)] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent-gold)] font-semibold">
              Studio Capabilities & Trust Specifications
            </span>
          </div>
          <div className="text-[11px] font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-3 py-1 rounded-full bg-[var(--color-canvas-base)]/50">
            4-Pillar PNG Graphic Zone Matrix
          </div>
        </div>

        {/* 4 PNG-Styled Studio Capability Spatial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TRUST_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                data-testid={pillar.testId}
                data-test-item={`trust-item-${index}`}
                className="flex flex-col justify-between p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-surface)]/80 hover:border-[var(--color-accent-gold)]/60 hover:bg-[var(--color-canvas-surface)] transition-all duration-300 group relative overflow-hidden shadow-2xs"
              >
                {/* Top: Capability Badge Graphic Drop Zone */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-13 h-13 rounded-xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] group-hover:scale-105 group-hover:border-[var(--color-accent-gold)] transition-transform duration-300 shadow-2xs">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-2 py-0.5 rounded-full bg-[var(--color-canvas-base)]/40">
                      1:1 Graphic Zone
                    </span>
                  </div>

                  {/* Pillar Copy */}
                  <div className="space-y-1.5 text-left">
                    <h3
                      data-testid={`trust-title-${pillar.id}`}
                      className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)] tracking-tight leading-snug group-hover:text-[var(--color-accent-gold)] transition-colors"
                    >
                      {pillar.title}
                    </h3>
                    <p
                      data-testid={`trust-desc-${pillar.id}`}
                      className="text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed font-sans"
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Spec Footer Pill */}
                <div className="mt-5 pt-3 border-t border-dashed border-[var(--color-border-strong)]/40 flex items-center justify-between text-[10px] font-mono text-[var(--color-ink-muted)]">
                  <span>Pillar 0{index + 1} Spec</span>
                  <span className="text-[var(--color-accent-gold)]">Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
