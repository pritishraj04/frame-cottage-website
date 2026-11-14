import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frame Cottage | Bespoke Handcrafted Framing & Archival Art",
  description: "Bespoke handcrafted custom framing, archival prints, and museum-grade wall art collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${geist.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-[#1A1A1A] text-[#F4F1EA]">{children}</body>
    </html>
  );
}
