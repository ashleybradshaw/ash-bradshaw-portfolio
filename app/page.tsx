import Image from "next/image";
import { AboutSection } from "@/components/AboutSection";
import { OutlinedCta } from "@/components/Buttons";
import { Iridescence } from "@/components/Iridescence";
import { MotionSection } from "@/components/MotionSection";
import { PixelDivider } from "@/components/PixelDivider";
import { ReferralsSection } from "@/components/ReferralsSection";
import { DottedRule, SectionHeader } from "@/components/SectionHeader";
import { SelectedWorksGrid } from "@/components/SelectedWorksGrid";
import { ServicesSection } from "@/components/ServicesSection";
import { projects } from "@/lib/projects";

const heroCardBase =
  "flex h-full min-h-[280px] w-full flex-col items-start gap-2.5 p-5";

const heroCardNavy = `${heroCardBase} bg-[var(--hero-accent)] text-[var(--hero-bg)] transition-[background-color,color] duration-[400ms] ease-in-out`;

const heroCardOutline = `${heroCardBase} border border-solid border-[var(--hero-accent)] bg-transparent text-[var(--hero-text)] transition-[border-color,color] duration-[400ms] ease-in-out`;

const cardTitleClass =
  "font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]";

const cardBodyClass =
  "font-sans text-base font-bold leading-6 tracking-[-0.01em]";

export default function Home() {
  return (
    <>
      <MotionSection
        id="top"
        aria-labelledby="hero-title"
        className="hero-canvas w-full pt-[72px] md:pt-[88px]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-[50px]">
          <SectionHeader
            as="h1"
            size="hero"
            tone="red"
            rule="after"
            titleId="hero-title"
            subtitle="Product Lead & Design Engineer"
            title="ASH BRADSHAW"
          />

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className={heroCardNavy}>
              <h2 className={cardTitleClass}>Who I Am</h2>
              <p className={cardBodyClass}>
                Product Lead &amp; Design Engineer with 11+ years shipping
                enterprise SaaS, fintech, and health tech from zero-to-one
                strategy down to production code.
              </p>
              <OutlinedCta href="#about" className="mt-auto">
                About
              </OutlinedCta>
            </article>

            <article className={heroCardOutline}>
              <h2 className={cardTitleClass}>Where I Am</h2>
              <p className={cardBodyClass}>
                Leading product design with a new team at Lloyds Banking
                Group, modernising stocks, shares, and pension platforms from
                early ideation through to validation.
              </p>
              <OutlinedCta
                href="https://www.linkedin.com/in/ashleyjohnbradshaw/"
                external
                className="mt-auto"
              >
                Linkedin
              </OutlinedCta>
            </article>

            <article className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden bg-[var(--hero-accent)] text-[var(--hero-bg)] transition-[background-color,color] duration-[400ms] ease-in-out">
              <Iridescence className="pointer-events-none absolute inset-0 z-0 opacity-80" />
              <div className="relative z-10 flex h-full min-h-[280px] flex-col items-start gap-2.5 p-5">
                <h2 className={cardTitleClass}>Core Philosophy</h2>
                <p className={cardBodyClass}>
                  Designing in the space where product meets human behaviour. I
                  bypass wireframe overhead, translating green-lit designs
                  straight into production code and PRDs.
                </p>
                <OutlinedCta href="/field-notes" className="mt-auto">
                  Field Notes
                </OutlinedCta>
              </div>
            </article>

            <article className={heroCardNavy}>
              <h2 className={cardTitleClass}>Case Study</h2>
              <p className={cardBodyClass}>
                Founding product designer leading creative for almost four
                years, building the full product ecosystem, brand strategy,
                and scaling the app from 0 to 2.5M users.
              </p>
              <OutlinedCta href="/works/credability" className="mt-auto">
                Open Project
              </OutlinedCta>
            </article>
          </div>

          <DottedRule tone="red" />
        </div>
      </MotionSection>

      <MotionSection
        id="career-arc"
        aria-labelledby="career-arc-title"
        className="hero-canvas m-0 w-full"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-8 md:pb-16 lg:px-[50px]">
          <div className="relative min-h-[609px] overflow-hidden rounded-sm bg-[var(--hero-accent)] shadow-[0_4px_60px_20px_rgb(0_0_85/0.2)] transition-colors duration-[400ms] ease-in-out">
            <Image
              src="/ashley-portrait.png"
              alt="Ashley Bradshaw"
              fill
              priority
              sizes="(min-width: 1440px) 1340px, 100vw"
              className="object-cover object-[50%_68%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(24deg,var(--hero-accent)_30.5%,transparent_69.5%)] mix-blend-multiply"
            />
            <div className="relative z-10 flex min-h-[609px] flex-col justify-end gap-5 px-8 pb-[50px] pt-8 lg:max-w-[660px] lg:px-10">
              <header className="flex flex-col">
                <p className="font-sans text-[28px] font-bold uppercase leading-9 tracking-[-0.01em] text-[var(--hero-bg)]">
                  Career Arc
                </p>
                <h2
                  id="career-arc-title"
                  className="font-display text-[clamp(2.75rem,6vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--hero-bg)]"
                >
                  SCALING THE STACK
                </h2>
              </header>
              <h3 className={`${cardTitleClass} text-[var(--hero-bg)]`}>
                Enterprise & AI Integration
              </h3>
              <p className={`${cardBodyClass} text-[var(--hero-bg)]`}>
                Today, I build for enterprise scale. By integrating advanced
                LLM and agentic workflows (Cursor, Claude, Perplexity), I
                collapse the discovery-to-code pipeline - delivering complete
                frontends and PRDs that allow engineering teams to focus purely
                on backend services.
              </p>
            </div>
          </div>
        </div>
      </MotionSection>

      <PixelDivider />

      <ServicesSection />

      <MotionSection
        id="works"
        aria-labelledby="selected-works-title"
        className="m-0 w-full bg-cream-1 text-text-dark"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-[50px] lg:pb-24">
          <SectionHeader
            titleId="selected-works-title"
            subtitle="Selected Works"
            title="proof & Pudding."
          />

          <SelectedWorksGrid projects={projects} />
        </div>
      </MotionSection>

      <AboutSection />

      <ReferralsSection />

      <PixelDivider direction="cream-to-red" />
    </>
  );
}
