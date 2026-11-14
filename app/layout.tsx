import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/interactive/whatsapp-button";

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
  title: "Frame Cottage | Multi-Disciplinary Design, Fabrication & Framing Studio",
  description:
    "Multi-disciplinary design, fabrication, and framing studio delivering end-to-end spatial, industrial, and aesthetic solutions for B2C, B2B, and public sector clients across 6 core service verticals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased dark ${playfair.variable} ${geist.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
  try {
    var savedTheme = localStorage.getItem('frame-cottage-theme');
    var theme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-250">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
