import { FileCheck, Shield, Award, Check } from "lucide-react";
import { MaterialSpecItem } from "@/data/services-data";

interface MaterialSpecsMatrixProps {
  materialSpecs: MaterialSpecItem[];
  verticalTitle: string;
}

export function MaterialSpecsMatrix({ materialSpecs, verticalTitle }: MaterialSpecsMatrixProps) {
  return (
    <section
      id="specs"
      data-testid="service-material-specs"
      aria-label={`${verticalTitle} Material Specifications Matrix`}
      className="w-full bg-[var(--background)] py-12 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)] mb-2 font-mono">
            <Shield className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span>Engineering Tolerances & Grades</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
            Material Specifications Matrix
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-xl">
            Certified material grades, fabrication tolerances, and archival standards verified across production.
          </p>
        </div>

        {/* Desktop Specifications Table / Responsive Matrix */}
        <div className="rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/30 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-base)]/80 text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-muted)]">
            <div className="col-span-3">Substrate Category</div>
            <div className="col-span-4">Grade & Composition</div>
            <div className="col-span-2">Tolerance / Cert</div>
            <div className="col-span-3">Finish & Protection</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-dashed divide-[var(--color-border-strong)]/40">
            {materialSpecs.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-5 sm:px-6 hover:bg-[var(--color-canvas-subtle)]/70 transition-colors"
              >
                {/* Mobile Category Tag & Title */}
                <div className="md:col-span-3 flex flex-col justify-center">
                  <span className="font-serif text-sm sm:text-base font-semibold text-[var(--color-ink-primary)]">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-accent-gold)] md:hidden mt-0.5">
                    Category Spec
                  </span>
                </div>

                {/* Specification Details */}
                <div className="md:col-span-4 flex items-center text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {item.specification}
                </div>

                {/* Tolerance / Grade */}
                <div className="md:col-span-2 flex items-center">
                  <span className="inline-block text-[11px] font-mono text-[var(--color-ink-primary)] px-2.5 py-1 rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/60">
                    {item.toleranceGrade}
                  </span>
                </div>

                {/* Finish & Preservation Standard */}
                <div className="md:col-span-3 flex items-center text-xs text-[var(--color-ink-muted)] font-mono">
                  <Check className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0 mr-1.5" />
                  <span>{item.finishStandard}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer Banner */}
          <div className="px-6 py-3.5 border-t border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-base)]/50 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--color-ink-muted)]">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              <span>All substrates 100% trace-inspected at Frame Cottage Atelier</span>
            </span>
            <span className="text-[var(--color-accent-gold)]">ISO 9001:2015 & Archival Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
