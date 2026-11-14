import { SiteHeader } from "@/components/navigation/site-header";
import { HeroCarousel } from "@/components/hero/hero-carousel";
import { CustomFrameStudio } from "@/components/home/custom-frame-studio";
import { CategoryPills } from "@/components/home/category-pills";
import { TrustBar } from "@/components/home/trust-bar";
import { CuratedCollections } from "@/components/home/curated-collections";
import { FramingJourney } from "@/components/home/framing-journey";
import { FeaturedProductsCarousel } from "@/components/home/featured-products-carousel";
import { CustomerLookbook } from "@/components/home/customer-lookbook";
import { FAQSection } from "@/components/home/faq-section";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col">
        <HeroCarousel />
        <CustomFrameStudio />
        <CategoryPills />
        <TrustBar />
        <CuratedCollections />
        <FramingJourney />
        <FeaturedProductsCarousel />
        <CustomerLookbook />
        <FAQSection />
      </main>
      <SiteFooter />
    </div>
  );
}
