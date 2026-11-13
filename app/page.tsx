import { SiteHeader } from "@/components/navigation/site-header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191614]">
      <SiteHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B45309] font-medium">
            Artisanal Framing & Fine Art
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#191614] leading-[1.15]">
            Custom framing, crafted by master artisans.
          </h1>
          <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
            Handcrafted with sustainably harvested solid hardwoods, museum-grade UV acrylic, and acid-free archival matting.
          </p>
        </div>
      </main>
    </div>
  );
}
