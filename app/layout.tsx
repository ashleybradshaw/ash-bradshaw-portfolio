import type { Metadata } from "next";
import { Palanquin_Dark, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { HeroTokensProvider } from "@/components/HeroTokensProvider";
import { Nav } from "@/components/Nav";
import "./globals.css";

const palanquinDark = Palanquin_Dark({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-palanquin-dark",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashley Bradshaw",
  description: "Product designer and builder. Selected works, services, and field notes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${palanquinDark.variable} ${plusJakartaSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-cream-1 font-sans text-text-dark">
        <HeroTokensProvider>
          <Nav />
          <main className="flex min-w-0 flex-1 flex-col bg-inherit">{children}</main>
          <Footer />
        </HeroTokensProvider>
      </body>
    </html>
  );
}
