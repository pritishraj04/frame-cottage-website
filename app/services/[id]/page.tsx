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
      title: "Service Not Found | Frame Cottage Studio",
      description: "The requested service vertical could not be found.",
    };
  }

  return {
    title: `${service.title} | Frame Cottage Multi-Disciplinary Studio`,
    description: service.description,
    openGraph: {
      title: `${service.title} - ${service.tagline} | Frame Cottage`,
      description: service.description,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedVerticalIds);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--color-ink-primary)] flex flex-col transition-colors duration-250">
      {/* Sticky Global Studio Header */}
      <SiteHeader />

      <main className="flex-1">
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
      </main>

      {/* Global Studio Footer */}
      <SiteFooter />
    </div>
  );
}
