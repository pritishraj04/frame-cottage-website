"use client";

import React from "react";

export function CustomizerSkeleton() {
  return (
    <div
      data-testid="customizer-skeleton"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse space-y-8"
    >
      {/* Title Breadcrumb Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-36 bg-[var(--color-border-subtle)] rounded-md" />
        <div className="h-9 w-72 sm:w-96 bg-[var(--color-border-strong)]/40 rounded-lg" />
        <div className="h-4 w-64 sm:w-80 bg-[var(--color-border-subtle)] rounded-md" />
      </div>

      {/* Main Dual Stage Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visualizer Stage Skeleton */}
        <div className="lg:col-span-7 h-[540px] rounded-2xl border-2 border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/60 flex items-center justify-center p-8">
          <div className="w-64 h-80 rounded-sm border-4 border-[var(--color-border-strong)]/50 bg-[var(--color-canvas-surface)] shadow-lg" />
        </div>

        {/* Controls Deck Skeleton */}
        <div className="lg:col-span-5 space-y-4">
          <div className="h-10 w-full rounded-full bg-[var(--color-border-subtle)]/70" />
          <div className="h-72 w-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-surface)]" />
          <div className="h-28 w-full rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]" />
        </div>
      </div>
    </div>
  );
}
