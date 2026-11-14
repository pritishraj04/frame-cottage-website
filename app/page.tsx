import { SiteHeader } from "@/components/navigation/site-header";
import { HeroContainer } from "@/components/hero/hero-container";
import { CategoryPills } from "@/components/home/category-pills";
import { TrustBar } from "@/components/home/trust-bar";
import { CuratedCollections } from "@/components/home/curated-collections";
import { FramingJourney } from "@/components/home/framing-journey";
import { AtelierMaterials } from "@/components/home/atelier-materials";
import { CustomerLookbook } from "@/components/home/customer-lookbook";
import { FAQSection } from "@/components/home/faq-section";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191614]">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col">
        <HeroContainer />
        <CategoryPills />
        <TrustBar />
        <CuratedCollections />
        <FramingJourney />
        <AtelierMaterials />
        <CustomerLookbook />
        <FAQSection />
      </main>
      <SiteFooter />
    </div>
  );
}
