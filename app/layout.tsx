import type { Metadata } from "next";
import { Palanquin_Dark, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AvailabilityProvider } from "@/components/AvailabilityModal";
import { FieldNotesProvider } from "@/components/FieldNotesModal";
import { Footer } from "@/components/Footer";
import { HeroTokensProvider } from "@/components/HeroTokensProvider";
import { Nav } from "@/components/Nav";
import { getNav } from "@/lib/content";
import "./globals.css";

const palanquinDark = Palanquin_Dark({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-palanquin-dark",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashley Bradshaw",
  description: "Product designer and builder. Selected works, services, and field notes.",
  verification: {
    google: "8txJZflvvG6xWCBHpgXBkijL1y6mxRtya5mCB16swTg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const nav = getNav();

  return (
    <html
      lang="en"
      className={`${palanquinDark.variable} ${plusJakartaSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-cream-1 font-sans text-text-dark">
        <HeroTokensProvider>
          <FieldNotesProvider>
            <AvailabilityProvider>
              <Nav
                primary={nav.primary}
                secondary={nav.secondary}
                sprayLabel={nav.sprayLabel}
              />
              <main className="flex min-w-0 flex-1 flex-col bg-inherit">
                {children}
              </main>
              <Footer />
            </AvailabilityProvider>
          </FieldNotesProvider>
        </HeroTokensProvider>
        <Analytics />
      </body>
    </html>
  );
}
