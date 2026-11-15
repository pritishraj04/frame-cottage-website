"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Check, Sparkles, Layers, Sliders } from "lucide-react";
import { QuickEstimatorConfig, VerticalId } from "@/data/services-data";

interface ServiceEstimatorProps {
  config: QuickEstimatorConfig;
  verticalId: VerticalId;
  verticalTitle: string;
}

export function ServiceEstimator({ config, verticalId, verticalTitle }: ServiceEstimatorProps) {
  const [selectedDimId, setSelectedDimId] = useState(config.dimensionOptions[0]?.id || "");
  const [selectedTierId, setSelectedTierId] = useState(config.materialTiers[0]?.id || "");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const selectedDim =
    config.dimensionOptions.find((d) => d.id === selectedDimId) || config.dimensionOptions[0];
  const selectedTier =
    config.materialTiers.find((t) => t.id === selectedTierId) || config.materialTiers[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Dynamic price calculation
  const basePrice = selectedTier ? selectedTier.basePrice : config.startingPrice;
  const dimensionMultiplier = selectedDim ? selectedDim.baseMultiplier : 1.0;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = config.finishingAddons.find((a) => a.id === addonId);
    return sum + (addon ? addon.cost : 0);
  }, 0);

  const calculatedTotal = Math.round(basePrice * dimensionMultiplier + addonsTotal);

  return (
    <section
      id="estimator"
      data-testid="service-quick-estimator"
      aria-label="Interactive Quick Estimator Island"
      className="w-full bg-[var(--background)] py-12 sm:py-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-gold)] mb-2 font-mono">
            <Calculator className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span>Interactive Studio Calculator</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-primary)] tracking-tight">
            Quick Specification & Cost Estimator
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[var(--color-ink-secondary)]">
            Configure dimensions, material grades, and treatment options to generate an immediate budgetary estimate.
          </p>
        </div>

        {/* Estimator Island Container */}
        <div className="max-w-4xl mx-auto rounded-3xl border-2 border-dashed border-[var(--color-border-strong)]/70 bg-[var(--color-canvas-subtle)]/40 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Dimension Selection */}
              <div>
                <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent-gold)] mb-3">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>1. Select Scale & Dimensions</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {config.dimensionOptions.map((dim) => {
                    const isSelected = selectedDimId === dim.id;
                    return (
                      <button
                        key={dim.id}
                        type="button"
                        data-testid={`estimator-dim-${dim.id}`}
                        onClick={() => setSelectedDimId(dim.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] ring-1 ring-[var(--color-accent-gold)]"
                            : "border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/60 hover:border-[var(--color-accent-gold)]/50"
                        }`}
                      >
                        <span className="block text-xs font-semibold text-[var(--color-ink-primary)]">
                          {dim.label}
                        </span>
                        <span className="block text-[10px] font-mono text-[var(--color-ink-muted)] mt-0.5">
                          {dim.dimensions}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Material Tier Selection */}
              <div>
                <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent-gold)] mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  <span>2. Substrate & Material Grade</span>
                </label>
                <div className="space-y-2">
                  {config.materialTiers.map((tier) => {
                    const isSelected = selectedTierId === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        data-testid={`estimator-tier-${tier.id}`}
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)] ring-1 ring-[var(--color-accent-gold)]"
                            : "border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/60 hover:border-[var(--color-accent-gold)]/50"
                        }`}
                      >
                        <div>
                          <span className="block text-xs font-semibold text-[var(--color-ink-primary)]">
                            {tier.label}
                          </span>
                          <span className="block text-[10px] font-mono text-[var(--color-ink-muted)] mt-0.5">
                            {tier.sublabel}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[var(--color-accent-gold)] font-bold">
                          ₹{tier.basePrice.toLocaleString("en-IN")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Finishing & Addons */}
              <div>
                <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent-gold)] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3. Archival Treatments & Options</span>
                </label>
                <div className="space-y-2">
                  {config.finishingAddons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        data-testid={`estimator-addon-${addon.id}`}
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? "border-[var(--color-accent-gold)] bg-[var(--color-canvas-surface)]"
                            : "border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)]/40 hover:border-[var(--color-accent-gold)]/40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? "bg-accent border-accent text-[var(--color-accent-contrast)]"
                                : "border-[var(--color-border-strong)]"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span className="text-xs font-medium text-[var(--color-ink-primary)]">
                            {addon.label}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[var(--color-ink-secondary)]">
                          +₹{addon.cost.toLocaleString("en-IN")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Result Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-base)] flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-dashed border-[var(--color-accent-gold)] text-[var(--color-accent-gold)]">
                      Budgetary Estimate
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-ink-muted)]">
                      Instant Pricing
                    </span>
                  </div>

                  <span className="block text-xs font-mono text-[var(--color-ink-muted)] uppercase">
                    Estimated Production Total
                  </span>

                  <div className="my-3 flex items-baseline gap-2">
                    <span
                      data-testid="estimator-total-price"
                      className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-accent-gold)]"
                    >
                      ₹{calculatedTotal.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-mono text-[var(--color-ink-muted)]">
                      / {config.unitLabel}
                    </span>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="my-4 py-3 border-y border-dashed border-[var(--color-border-strong)]/50 space-y-1.5 text-xs font-mono text-[var(--color-ink-secondary)]">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-ink-muted)]">Scale:</span>
                      <span>{selectedDim?.label.split("(")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-ink-muted)]">Substrate:</span>
                      <span>{selectedTier?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-ink-muted)]">Treatments:</span>
                      <span>{selectedAddons.length} Applied</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--color-ink-muted)] leading-relaxed italic">
                    {config.formulaNote}
                  </p>
                </div>

                {/* Transfer to RFQ Button */}
                <div className="mt-6 pt-2">
                  <Link
                    href={`/rfq?vertical=${verticalId}&tier=${selectedTier?.id}&dim=${selectedDim?.id}`}
                    data-testid="estimator-transfer-rfq"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-[var(--color-accent-contrast)] font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md group"
                  >
                    <span>Lock In Specs & Transfer to RFQ</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <span className="block text-center text-[10px] font-mono text-[var(--color-ink-muted)] mt-2">
                    Pre-populates formal RFP builder with these parameters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
