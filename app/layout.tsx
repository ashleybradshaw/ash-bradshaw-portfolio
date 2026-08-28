import type { Metadata } from "next";
import { Palanquin_Dark, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "./globals.css";

const palanquinDark = Palanquin_Dark({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-palanquin-dark",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    >
      <body className="flex min-h-full flex-col bg-calm-light font-sans text-dark">
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
