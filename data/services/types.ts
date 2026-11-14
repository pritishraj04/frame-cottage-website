import { LucideIcon } from "lucide-react";
import { VerticalId } from "@/lib/constants/verticals";

export type { VerticalId };

export type ServiceAudienceTag =
  | "B2C Residential"
  | "B2C / B2B Curation"
  | "B2B Architecture & Commercial"
  | "Commercial & Industrial"
  | "Corporate & Institutional"
  | "Public Sector & GeM Tenders";

export interface KeyHighlight {
  title: string;
  description: string;
  badge?: string;
}

export interface TechnicalCapability {
  id: string;
  title: string;
  machine: string;
  specs: string;
  description: string;
  badge: string;
  pngPlaceholderText: string;
}

export interface MaterialSpecItem {
  category: string;
  specification: string;
  toleranceGrade: string;
  finishStandard: string;
}

export interface WorkflowStage {
  step: number;
  title: string;
  phase: string;
  duration: string;
  description: string;
  deliverable: string;
}

export interface EstimatorTier {
  id: string;
  label: string;
  sublabel: string;
  multiplier: number;
  basePrice: number;
}

export interface EstimatorOption {
  id: string;
  label: string;
  cost: number;
}

export interface QuickEstimatorConfig {
  unitLabel: string;
  dimensionOptions: { id: string; label: string; dimensions: string; baseMultiplier: number }[];
  materialTiers: EstimatorTier[];
  finishingAddons: EstimatorOption[];
  startingPrice: number;
  formulaNote: string;
}

export interface ServiceCaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  scope: string;
  outcome: string;
  stats: { label: string; value: string }[];
  spatialAssetTag: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface RelatedVertical {
  id: VerticalId;
  name: string;
  tagline: string;
  badge: string;
  href: string;
}

export interface ServiceVerticalData {
  id: VerticalId;
  title: string;
  shortName: string;
  tagline: string;
  audienceTag: ServiceAudienceTag;
  heroBadge: string;
  description: string;
  heroAssetTag: string;
  keyStats: { label: string; value: string }[];
  keyHighlights: KeyHighlight[];
  technicalCapabilities: TechnicalCapability[];
  materialSpecs: MaterialSpecItem[];
  workflowStages: WorkflowStage[];
  quickEstimator: QuickEstimatorConfig;
  caseStudies: ServiceCaseStudy[];
  faq: ServiceFAQ[];
  relatedVerticalIds: VerticalId[];
}
