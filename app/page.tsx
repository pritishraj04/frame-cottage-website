import { SiteHeader } from "@/components/navigation/site-header";
import { HeroContainer } from "@/components/hero/hero-container";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191614]">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col">
        <HeroContainer />
      </main>
    </div>
  );
}
