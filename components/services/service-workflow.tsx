import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { WorkflowStage } from "@/data/services-data";

interface ServiceWorkflowProps {
  stages: WorkflowStage[];
  verticalTitle: string;
}

export function ServiceWorkflow({ stages, verticalTitle }: ServiceWorkflowProps) {
  return (
    <section
      id="workflow"
      data-testid="service-workflow"
      aria-label={`${verticalTitle} 4-Stage Execution Workflow`}
      className="w-full bg-[var(--background)] py-12 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)] mb-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              <span>Studio Methodology</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
              4-Stage Studio Execution Workflow
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)] max-w-xl">
              From audit and parametric CAD through fabrication, cleanroom fitting, and white-glove site commissioning.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-3 py-1 rounded-full bg-[var(--color-canvas-subtle)] self-start sm:self-auto">
            Phased Turnkey Delivery
          </span>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.step}
              data-testid={`workflow-step-${stage.step}`}
              className="p-5 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 hover:border-[var(--color-accent-gold)]/60 transition-all duration-300 flex flex-col justify-between group shadow-2xs"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-full border border-dashed border-[var(--color-accent-gold)] bg-[var(--color-canvas-base)] flex items-center justify-center text-xs font-mono font-bold text-[var(--color-accent-gold)]">
                    0{stage.step}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-2 py-0.5 rounded-full bg-[var(--color-canvas-base)]/60">
                    {stage.duration}
                  </span>
                </div>

                {/* Dedicated Dashed Spatial Dropzone for Stage Diagram */}
                <div className="w-full h-28 rounded-xl border border-dashed border-[var(--color-border-strong)]/50 bg-[var(--color-canvas-base)]/50 my-3 flex flex-col items-center justify-center p-3 relative overflow-hidden group-hover:border-[var(--color-accent-gold)]/50 transition-colors">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-accent-gold)] font-bold">
                    Stage 0{stage.step} Schematic
                  </span>
                  <span className="mt-1 text-[8px] font-mono text-[var(--color-ink-muted)]">
                    Process Diagram PNG Dropzone
                  </span>
                </div>

                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-accent-gold)] font-bold">
                  {stage.phase}
                </span>

                <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors mt-1">
                  {stage.title}
                </h3>

                <p className="mt-2 text-xs text-[var(--color-ink-secondary)] leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Deliverable Tag */}
              <div className="mt-4 pt-3 border-t border-dashed border-[var(--color-border-strong)]/40 flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-ink-muted)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)] shrink-0" />
                <span className="line-clamp-1">{stage.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
