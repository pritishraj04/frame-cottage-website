import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  getAllServiceIds,
  getServiceById,
  getRelatedServices,
} from "@/data/services-data";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceHighlights } from "@/components/services/service-highlights";
import { ServiceCapabilities } from "@/components/services/service-capabilities";
import { MaterialSpecsMatrix } from "@/components/services/material-specs-matrix";
import { ServiceEstimator } from "@/components/services/service-estimator";
import { ServiceCaseStudies } from "@/components/services/service-case-studies";
import { ServiceWorkflow } from "@/components/services/service-workflow";
import { ServiceFAQSection } from "@/components/services/service-faq";
import { RelatedServices } from "@/components/services/related-services";
import { ServiceCtaBanner } from "@/components/services/service-cta-banner";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Prerender all 6 service verticals at build time
 */
export async function generateStaticParams() {
  const ids = getAllServiceIds();
  return ids.map((id) => ({ id }));
}

/**
 * Dynamic SEO metadata for each core service vertical
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return {
      title: "Service Not Found | Frames Cottage Studio",
      description: "The requested service vertical could not be found.",
    };
  }

  return {
    title: `${service.title} | Frames Cottage Multi-Disciplinary Studio`,
    description: service.description,
    openGraph: {
      title: `${service.title} - ${service.tagline} | Frames Cottage`,
      description: service.description,
      type: "website",
    },
  };
}

/**
 * Studio-aesthetic skeleton fallback during partial prerender streaming
 */
function ServiceDetailSkeleton() {
  return (
    <div
      aria-label="Loading service vertical"
      role="status"
      className="w-full animate-pulse transition-opacity duration-300"
    >
      {/* Hero Skeleton */}
      <section className="relative w-full bg-[var(--background)] pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-[var(--color-border-subtle)] text-[var(--color-ink-primary)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <div className="h-3 w-12 rounded bg-[var(--color-canvas-subtle)]" />
            <div className="h-3 w-3 rounded bg-[var(--color-canvas-subtle)]" />
            <div className="h-3 w-16 rounded bg-[var(--color-canvas-subtle)]" />
            <div className="h-3 w-3 rounded bg-[var(--color-canvas-subtle)]" />
            <div className="h-3 w-24 rounded bg-[var(--color-canvas-subtle)]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start w-full">
              {/* Badges */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-6 w-36 rounded-full border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]" />
                <div className="h-6 w-28 rounded-full border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]" />
              </div>

              {/* Title */}
              <div className="h-10 sm:h-12 w-4/5 rounded-lg bg-[var(--color-canvas-subtle)] mb-3" />

              {/* Tagline */}
              <div className="h-6 w-3/5 rounded bg-[var(--color-canvas-subtle)] mb-4" />

              {/* Description */}
              <div className="space-y-2 w-full max-w-2xl mb-6">
                <div className="h-4 w-full rounded bg-[var(--color-canvas-subtle)]" />
                <div className="h-4 w-5/6 rounded bg-[var(--color-canvas-subtle)]" />
                <div className="h-4 w-4/6 rounded bg-[var(--color-canvas-subtle)]" />
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 w-full max-w-2xl">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 h-16 flex flex-col justify-center gap-1.5"
                  >
                    <div className="h-2.5 w-14 rounded bg-[var(--color-canvas-subtle)]" />
                    <div className="h-4 w-20 rounded bg-[var(--color-canvas-subtle)]" />
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <div className="h-11 w-44 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)]" />
                <div className="h-11 w-40 rounded-xl bg-[var(--color-canvas-subtle)] border border-[var(--color-border-subtle)]" />
              </div>
            </div>

            {/* Right Column Canvas Drop Zone */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/40 flex items-center justify-center p-6">
                <div className="w-24 h-24 rounded-full border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Strip Skeleton */}
      <section className="w-full py-6 bg-[var(--color-canvas-subtle)]/30 border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/50 p-4 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--color-canvas-subtle)] shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-3/4 rounded bg-[var(--color-canvas-subtle)]" />
                  <div className="h-2.5 w-1/2 rounded bg-[var(--color-canvas-subtle)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section Skeleton */}
      <section className="w-full py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12 space-y-2">
            <div className="h-4 w-32 rounded-full bg-[var(--color-canvas-subtle)]" />
            <div className="h-8 w-64 rounded-lg bg-[var(--color-canvas-subtle)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl border border-dashed border-[var(--color-border-subtle)] bg-[var(--color-canvas-subtle)]/30 p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded bg-[var(--color-canvas-subtle)]" />
                  <div className="h-4 w-2/3 rounded bg-[var(--color-canvas-subtle)]" />
                  <div className="h-3 w-5/6 rounded bg-[var(--color-canvas-subtle)]" />
                </div>
                <div className="h-3 w-1/3 rounded bg-[var(--color-canvas-subtle)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Dynamic content that consumes URL params wrapped safely inside Suspense
 */
async function ServiceDetailContent({ params }: PageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedVerticalIds);

  return (
    <>
      {/* 1. Spatial Hero with Breadcrumbs, Tagline, Stats, and Dashed Hero PNG Canvas */}
      <ServiceHero service={service} />

      {/* 2. Key Highlights Strip */}
      <ServiceHighlights highlights={service.keyHighlights} />

      {/* 3. Technical Capabilities & Tooling Canvas (4-6 dashed cards) */}
      <ServiceCapabilities
        capabilities={service.technicalCapabilities}
        verticalTitle={service.title}
      />

      {/* 4. Material Specifications Matrix Table */}
      <MaterialSpecsMatrix
        materialSpecs={service.materialSpecs}
        verticalTitle={service.title}
      />

      {/* 5. Interactive Quick Estimator Island with RFQ Deep-Linking */}
      <ServiceEstimator
        config={service.quickEstimator}
        verticalId={service.id}
        verticalTitle={service.title}
      />

      {/* 6. Project Case Studies & Client Showcase Canvas */}
      <ServiceCaseStudies
        caseStudies={service.caseStudies}
        verticalTitle={service.title}
      />

      {/* 7. 4-Stage Studio Execution Workflow */}
      <ServiceWorkflow
        stages={service.workflowStages}
        verticalTitle={service.title}
      />

      {/* 8. Technical FAQ Section */}
      <ServiceFAQSection
        faq={service.faq}
        verticalTitle={service.title}
      />

      {/* 9. Related Service Verticals Grid */}
      <RelatedServices
        relatedServices={relatedServices}
        currentVerticalTitle={service.title}
      />

      {/* 10. Atelier Conversion Banner */}
      <ServiceCtaBanner
        verticalId={service.id}
        verticalTitle={service.title}
      />
    </>
  );
}

export default function ServiceDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--color-ink-primary)] flex flex-col transition-colors duration-250">
      {/* Sticky Global Studio Header */}
      <SiteHeader />

      <main className="flex-1">
        <Suspense fallback={<ServiceDetailSkeleton />}>
          <ServiceDetailContent params={params} />
        </Suspense>
      </main>

      {/* Global Studio Footer */}
      <SiteFooter />
    </div>
  );
}
