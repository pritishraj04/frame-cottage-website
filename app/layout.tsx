import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
