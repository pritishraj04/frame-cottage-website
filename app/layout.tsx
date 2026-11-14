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
      </body>
    </html>
  );
}
