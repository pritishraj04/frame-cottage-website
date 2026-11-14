import { TreePine, ShieldCheck, SunDim, PackageCheck } from "lucide-react";

export interface TrustPillar {
  id: string;
  testId: string;
  title: string;
  description: string;
  icon: typeof TreePine;
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    id: "solid-hardwoods",
    testId: "trust-bar-hardwoods",
    title: "100% Solid Hardwoods",
    description:
      "Responsibly harvested North American timber. Zero MDF or plastics",
    icon: TreePine,
  },
  {
    id: "cotton-mats",
    testId: "trust-bar-cotton-mats",
    title: "Archival 4-Ply Cotton Mats",
    description:
      "Acid-free core prevents yellowing and preserves prints for generations",
    icon: ShieldCheck,
  },
  {
    id: "conservation-acrylic",
    testId: "trust-bar-acrylic",
    title: "TruVue® Conservation Acrylic",
    description:
      "Shatter-safe optical acrylic blocking 99% of fading UV light",
    icon: SunDim,
  },
  {
    id: "ready-to-hang",
    testId: "trust-bar-hardware",
    title: "Ready-to-Hang Hardware",
    description:
      "Custom coated wire, brass hangers, and wall bumpers included in every box",
    icon: PackageCheck,
  },
];

export function TrustBar() {
  return (
    <section
      aria-label="Museum-Grade Craftsmanship Commitments"
      data-testid="trust-bar"
      className="w-full bg-[var(--color-canvas-subtle)] border-b border-[var(--color-border-subtle)] py-8 lg:py-10 text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {TRUST_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            // Precise hairline border styling for 1-col (mobile), 2-col (tablet), and 4-col (desktop)
            const borderClasses = [
              "border-b md:border-b lg:border-b-0 md:border-r border-[var(--color-border-subtle)]",
              "border-b md:border-b lg:border-b-0 md:border-r-0 lg:border-r border-[var(--color-border-subtle)]",
              "border-b md:border-b-0 lg:border-b-0 md:border-r border-[var(--color-border-subtle)]",
              "border-b-0 md:border-b-0 lg:border-b-0 md:border-r-0 lg:border-r-0",
            ][index];

            return (
              <div
                key={pillar.id}
                data-testid={pillar.testId}
                className={`flex flex-col sm:flex-row lg:flex-col items-start gap-4 p-5 sm:p-6 lg:p-6 transition-colors hover:bg-[var(--color-canvas-surface)] group ${borderClasses}`}
              >
                {/* Refined Muted Gold Icon Badge */}
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-canvas-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-accent-gold)] shadow-2xs group-hover:scale-105 group-hover:border-[var(--color-accent-gold)] group-hover:bg-[var(--color-canvas-card-elevated)] transition-all duration-200">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                </div>

                {/* Pillar Copy */}
                <div className="space-y-1 text-left">
                  <h3
                    data-testid={`trust-title-${pillar.id}`}
                    className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)] tracking-tight leading-snug"
                  >
                    {pillar.title}
                  </h3>
                  <p
                    data-testid={`trust-desc-${pillar.id}`}
                    className="text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed"
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
