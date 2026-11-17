import React, { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SearchPageContent } from "@/components/search/search-page-content";

export const metadata: Metadata = {
  title: "Studio Archive Search | Frames Cottage",
  description:
    "Comprehensive technical search index across Frames Cottage's 6 service verticals, handcrafted framing models, precision CNC capabilities, and archival materials.",
};

function SearchFallback() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20 text-[var(--color-ink-muted)]">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent-gold)] border-t-transparent animate-spin mb-4" />
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-gold)]">
        Loading Studio Archive...
      </p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <Suspense fallback={<SearchFallback />}>
        <SearchPageContent />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
