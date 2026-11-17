import Link from "next/link";
import { ArrowRight, Download, Sparkles, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { ServiceVerticalData } from "@/data/services-data";
import { CategorySwatch } from "@/components/home/category-swatches";

interface ServiceHeroProps {
  service: ServiceVerticalData;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section
      data-testid="service-hero"
      aria-label={`${service.title} Spatial Hero`}
      className="relative w-full bg-[var(--background)] pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] overflow-hidden transition-colors duration-250"
    >
      {/* Subtle ambient museum background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[var(--color-accent-gold)]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          data-testid="service-breadcrumb"
          className="flex items-center gap-2 text-xs font-mono text-[var(--color-ink-muted)] mb-6 sm:mb-8"
        >
          <Link
            href="/"
            className="hover:text-[var(--color-accent-gold)] transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--color-ink-muted)]" />
          <Link
            href="/#services"
            className="hover:text-[var(--color-accent-gold)] transition-colors"
          >
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--color-ink-muted)]" />
          <span className="text-[var(--color-accent-gold)] font-medium">
            {service.shortName}
          </span>
        </nav>

        {/* Hero Grid: Editorial Typography + Spatial Canvas Drop Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Editorial Meta & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Audience Badge & Hero Chip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span
                data-testid="service-audience-badge"
                className="inline-flex items-center gap-1.5 text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full border border-dashed border-[var(--color-accent-gold)]/70 text-[var(--color-accent-gold)] bg-[var(--color-canvas-subtle)]/70"
              >
                <Sparkles className="w-3 h-3 text-[var(--color-accent-gold)]" />
                {service.audienceTag}
              </span>
              <span className="text-xs font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-2.5 py-1 rounded-full bg-[var(--color-canvas-base)]/60">
                {service.heroBadge}
              </span>
            </div>

            {/* Main Service Title */}
            <h1
              data-testid="service-title"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] leading-[1.12]"
            >
              {service.title}
            </h1>

            {/* Tagline */}
            <p
              data-testid="service-tagline"
              className="mt-3 font-serif italic text-lg sm:text-xl text-[var(--color-accent-gold)]"
            >
              {service.tagline}
            </p>

            {/* Editorial Description */}
            <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed max-w-2xl">
              {service.description}
            </p>

            {/* Technical Key Stats Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 w-full max-w-2xl">
              {service.keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/40 flex flex-col"
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-ink-muted)]">
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold text-[var(--color-ink-primary)] mt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href={`/rfq?vertical=${service.id}`}
                data-testid="service-rfq-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Initiate RFQ Specification</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#specs"
                data-testid="service-pdf-spec-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-dashed border-[var(--color-border-strong)] hover:border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] hover:bg-[var(--color-canvas-subtle)] text-[var(--color-ink-primary)] text-sm font-medium transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <Download className="w-4 h-4 text-[var(--color-accent-gold)]" />
                <span>Technical Spec Sheet</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): PNG-Styled Spatial Canvas Drop Zone */}
          <div className="lg:col-span-5">
            <div
              data-testid="service-hero-spatial-canvas"
              className="relative aspect-[4/3] sm:aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-[var(--color-border-strong)]/60 bg-[var(--color-canvas-subtle)]/50 hover:border-[var(--color-accent-gold)]/60 transition-all duration-500 p-5 sm:p-7 flex flex-col justify-between shadow-2xl group"
            >
              {/* Top Banner inside Spatial Canvas */}
              <div className="flex items-center justify-between gap-2 z-10">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-dashed border-[var(--color-border-strong)] text-[var(--color-accent-gold)] bg-[var(--color-canvas-base)]/80">
                  {service.heroAssetTag}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-ink-muted)] border border-dashed border-[var(--color-border-strong)] px-2 py-0.5 rounded-full bg-[var(--color-canvas-base)]/60">
                  PNG Spatial Dropzone
                </span>
              </div>

              {/* Center Floating Spatial Render Container */}
              <div className="relative flex-1 my-3 rounded-xl border border-dashed border-[var(--color-border-strong)]/40 bg-[var(--color-canvas-base)]/40 flex flex-col items-center justify-center p-4 overflow-hidden group-hover:border-[var(--color-accent-gold)]/50 transition-colors">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-2 transition-transform duration-700 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]">
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-inner bg-[var(--color-canvas-surface)]">
                    <CategorySwatch id={service.id} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-ink-muted)]">
                  <CheckCircle2 className="w-3 h-3 text-[var(--color-accent-gold)]" />
                  <span>Transparent 4K Render Ready</span>
                </div>
              </div>

              {/* Bottom Spec Footer inside Spatial Canvas */}
              <div className="pt-2 border-t border-dashed border-[var(--color-border-strong)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--color-ink-secondary)]">
                <span>Atelier Architecture Spec</span>
                <span className="text-[var(--color-accent-gold)]">Frames Cottage Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
