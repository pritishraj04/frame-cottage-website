import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/interactive/whatsapp-button";
import { StorefrontProvider } from "@/lib/store/storefront-context";
import { HashScrollHandler } from "@/components/navigation/hash-scroll-handler";
import { ClerkProvider } from "@clerk/nextjs";

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
  title: "Frames Cottage | Multi-Disciplinary Design, Fabrication & Framing Studio",
  description:
    "Multi-disciplinary design, fabrication, and framing studio delivering end-to-end spatial, industrial, and aesthetic solutions for B2C, B2B, and public sector clients across 6 core service verticals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      // @ts-ignore - for local mock resilience
      __internal_clerkJSUrl="/mock-clerk.js"
      prefetchUI={false}
      appearance={{
        variables: {
          colorPrimary: "#C5A059",
          colorPrimaryForeground: "#171D26",
          colorBackground: "#171D26",
          colorForeground: "#F7F8F9",
          colorInput: "#0F1319",
          colorInputForeground: "#F7F8F9",
          colorBorder: "#2A3441",
        },
        elements: {
          card: "bg-[#171D26] border border-[#2A3441] shadow-2xl",
          formButtonPrimary: "bg-[#C5A059] hover:bg-[#B08B46] text-[#171D26] font-semibold",
          footerActionLink: "text-[#C5A059] hover:text-[#D4B069]",
        },
      }}
    >
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
          <StorefrontProvider>
            <HashScrollHandler />
            {children}
            <WhatsAppButton />
          </StorefrontProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
