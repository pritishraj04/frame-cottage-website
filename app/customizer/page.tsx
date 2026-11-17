import { Suspense } from "react";
import type { Metadata } from "next";
import { CustomizerView } from "@/components/customizer/customizer-view";
import { CustomizerSkeleton } from "@/components/customizer/customizer-skeleton";

export const metadata: Metadata = {
  title: "Interactive Studio Customizer | Frames Cottage",
  description:
    "Design and configure your bespoke museum frame in real time. Choose from 6 handcrafted hardwood profiles, 4-ply cotton rag mats, and conservation optical glazing.",
};

export default function CustomizerPage() {
  return (
    <Suspense fallback={<CustomizerSkeleton />}>
      <CustomizerView />
    </Suspense>
  );
}
