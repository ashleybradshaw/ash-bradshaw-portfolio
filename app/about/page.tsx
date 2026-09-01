import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { PixelDivider } from "@/components/PixelDivider";
import { SectionHeader } from "@/components/SectionHeader";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Ashley Bradshaw",
  description:
    "Product Lead and Design Engineer. About Ashley Bradshaw, services, and availability.",
};

export default function AboutPage() {
  const about = getAbout();

  return (
    <>
      <section className="hero-canvas w-full pt-[72px] md:pt-[88px]">
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-8 sm:px-8 md:pb-16 lg:px-[50px]">
          <SectionHeader
            as="h1"
            size="hero"
            tone="red"
            rule="after"
            titleId="about-page-title"
            subtitle={about.subtitle}
            title={about.title}
          />
        </div>
      </section>

      <PixelDivider />

      <AboutSection hideHeader />

      <PixelDivider direction="cream-to-red" />
    </>
  );
}
