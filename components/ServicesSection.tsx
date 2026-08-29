import Image from "next/image";
import { CrosshairRail } from "@/components/CrosshairRail";
import { SectionHeader } from "@/components/SectionHeader";

type Capability = {
  number: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imageAlt: string;
};

const capabilities: readonly Capability[] = [
  {
    number: "1.",
    title: "End-to-End Production",
    subtitle: "Strategy to shipped code.",
    body: "From raw discovery and UI architecture to shipped code. Eliminating handoff friction by maintaining complete fluency in both Figma and production environments.",
    image: "/services/end-to-end.png",
    imageAlt: "Mobile product screens from an end-to-end production system",
  },
  {
    number: "2.",
    title: "Discovery & AI Workflows",
    subtitle: "Flat design to PRD execution.",
    body: "Using content-driven prompt engineering to transform flat designs directly into production components, tokens, and comprehensive PRDs.",
    image: "/services/discovery-ai.png",
    imageAlt: "Node-based AI discovery workflow",
  },
  {
    number: "3.",
    title: "Complex Systems & Portals",
    subtitle: "Architecting enterprise-scale data.",
    body: "Architecting data-dense ecosystems. Experience across 400+ screen clinical tools, multi-tier admin portals, and fintech compliance flows.",
    image: "/services/complex-systems.png",
    imageAlt: "Enterprise portal dashboard",
  },
  {
    number: "4.",
    title: "Growth & Scale Engineering",
    subtitle: "Designing for commercial outcomes.",
    body: "Designing for measurable outcomes. Proven track record crashing application drop-off, increasing onboarding completion rates from 21% to 43%, and driving millions in commercial value.",
    image: "/services/growth-scale.png",
    imageAlt: "Growth and scale product flow map",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="capabilities-title"
      className="m-0 bg-cream-1 text-text-dark"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        <SectionHeader
          titleId="capabilities-title"
          subtitle="Core Capabilities"
          title="End-to-end"
        />

        {capabilities.map((item) => (
          <div key={item.number}>
            <CrosshairRail />
            <article className="grid grid-cols-1 items-center gap-8 py-6 lg:grid-cols-[minmax(0,463px)_minmax(0,322px)_minmax(0,428px)] lg:gap-[46px] lg:py-0 lg:min-h-[209px]">
              <div className="flex flex-col justify-center">
                <p className="font-sans text-base font-bold leading-5 tracking-[-0.01em]">
                  {item.number}
                </p>
                <h3 className="font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="font-sans text-base font-bold leading-5 tracking-[-0.01em]">
                  {item.subtitle}
                </p>
              </div>
              <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em]">
                {item.body}
              </p>
              <div className="relative h-[209px] w-full overflow-hidden rounded-sm">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 428px, 100vw"
                />
              </div>
            </article>
          </div>
        ))}
        <CrosshairRail />
      </div>
    </section>
  );
}
