import { retailFramingData } from "./retail-framing";
import { bespokeFramingData } from "./bespoke-framing";
import { spatialSignageData } from "./spatial-signage";
import { industrialCncData } from "./industrial-cnc";
import { customGiftingData } from "./custom-gifting";
import { civicProjectsData } from "./civic-projects";
import { ServiceVerticalData, VerticalId } from "./types";

export * from "./types";
export {
  retailFramingData,
  bespokeFramingData,
  spatialSignageData,
  industrialCncData,
  customGiftingData,
  civicProjectsData,
};

export const ALL_SERVICES: ServiceVerticalData[] = [
  retailFramingData,
  bespokeFramingData,
  spatialSignageData,
  industrialCncData,
  customGiftingData,
  civicProjectsData,
];

export const SERVICES_BY_ID: Record<VerticalId, ServiceVerticalData> = {
  "retail-framing": retailFramingData,
  "bespoke-framing": bespokeFramingData,
  "spatial-signage": spatialSignageData,
  "industrial-cnc": industrialCncData,
  "custom-gifting": customGiftingData,
  "civic-projects": civicProjectsData,
};

export const SERVICE_SLUGS: VerticalId[] = [
  "retail-framing",
  "bespoke-framing",
  "spatial-signage",
  "industrial-cnc",
  "custom-gifting",
  "civic-projects",
];

export function getAllServices(): ServiceVerticalData[] {
  return ALL_SERVICES;
}

export function getAllServiceIds(): VerticalId[] {
  return SERVICE_SLUGS;
}

export function getServiceById(id: string): ServiceVerticalData | undefined {
  if (id in SERVICES_BY_ID) {
    return SERVICES_BY_ID[id as VerticalId];
  }
  return undefined;
}

export function getRelatedServices(ids: VerticalId[]): ServiceVerticalData[] {
  return ids
    .map((id) => SERVICES_BY_ID[id])
    .filter((s): s is ServiceVerticalData => Boolean(s));
}
