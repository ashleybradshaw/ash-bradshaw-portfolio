import Image from "next/image";
import { AboutSection } from "@/components/AboutSection";
import { OpenProjectLink } from "@/components/Buttons";
import { MotionSection } from "@/components/MotionSection";
import { PixelDivider } from "@/components/PixelDivider";
import { ReferralsSection } from "@/components/ReferralsSection";
import { SelectedWorksGrid } from "@/components/SelectedWorksGrid";
import { ServicesSection } from "@/components/ServicesSection";
import { StoryGrid } from "@/components/StoryGrid";
import { projects } from "@/lib/projects";

const heroCardBase =
  "flex min-h-[320px] w-full flex-col items-start gap-2.5 p-5";

const heroCardNavy = `${heroCardBase} bg-brand-blue`;

const heroCardOutline = `${heroCardBase} border border-solid border-brand-blue bg-brand-red`;

const cardTitleClass =
  "font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]";

const cardBodyClass =
  "font-sans text-base font-bold leading-6 tracking-[-0.01em]";

export default function Home() {
  return (
    <>
      <MotionSection
        aria-labelledby="hero-title"
        className="w-full bg-brand-red pt-[72px] text-brand-blue md:pt-[88px]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 lg:px-[50px] lg:pb-20">
          <header className="flex flex-col items-center text-center">
            <p className="w-full font-sans text-[clamp(1.125rem,2.2vw,1.75rem)] font-bold uppercase leading-9 tracking-[-0.01em] text-brand-blue">
              Product Lead & Design Engineer
            </p>
            <h1
              id="hero-title"
              className="w-full font-display text-[clamp(4rem,11vw,10rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-brand-blue"
            >
              ASH BRADSHAW
            </h1>
          </header>

          <div
            aria-hidden="true"
            className="my-10 h-px w-full border-t-2 border-dashed border-brand-blue lg:my-12"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className={heroCardNavy}>
              <h2 className={`${cardTitleClass} text-brand-red`}>Who I Am</h2>
              <p className={`${cardBodyClass} text-brand-red`}>
                Product Lead with 11+ years shipping complex digital platforms
                across fintech, health tech, and enterprise SaaS. Expert in
                taking zero-to-one strategy from discovery to production code.
              </p>
            </article>

            <article className={heroCardOutline}>
              <h2 className={`${cardTitleClass} text-brand-blue`}>Where I Am</h2>
              <p className={`${cardBodyClass} text-brand-blue`}>
                Product Design at Lloyd’s Banking Group, architecting the next
                generation of wealth management platforms.
              </p>
            </article>

            <article className={heroCardNavy}>
              <h2 className={`${cardTitleClass} text-brand-red`}>
                Core Philosophy
              </h2>
              <p className="font-sans text-[28px] font-bold leading-9 tracking-[-0.01em] text-brand-red">
                Design to code.
              </p>
              <p className={`${cardBodyClass} text-brand-red`}>
                Designing in the space between product and user. I bypass
                traditional wireframe overhead, translating green-lit designs
                straight into code and PRDs.
              </p>
            </article>

            <article className={heroCardNavy}>
              <h2 className={`${cardTitleClass} text-brand-red`}>Case Study</h2>
              <p className="font-sans text-[28px] font-bold leading-9 tracking-[-0.01em] text-brand-red">
                0 to 2.5 Million
              </p>
              <p className={`${cardBodyClass} text-brand-red`}>
                Founding product designer for CredAbility. Designed the full
                ecosystem, brand, and service strategy.
              </p>
              <OpenProjectLink
                href="/works/credability"
                className="mt-auto text-cream-1 underline decoration-cream-1 decoration-wavy underline-offset-4 hover:text-cream-1"
              >
                Quick Read
              </OpenProjectLink>
            </article>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="story"
        aria-label="The narrative"
        className="relative z-0 m-0 bg-brand-red text-brand-blue"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-[50px]">
          <StoryGrid />
        </div>
      </MotionSection>

      <MotionSection
        aria-labelledby="career-arc-title"
        className="m-0 w-full bg-brand-red text-brand-blue"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-0 sm:px-8 lg:px-[50px]">
          <div className="relative min-h-[609px] overflow-hidden rounded-sm bg-brand-blue shadow-[0_4px_60px_20px_rgb(0_0_85/0.2)]">
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
              className="absolute inset-0 bg-[linear-gradient(24deg,#13014C_30.5%,transparent_69.5%)] mix-blend-multiply"
            />
            <div className="relative z-10 flex min-h-[609px] flex-col justify-end gap-5 px-8 pb-[50px] pt-8 lg:max-w-[660px] lg:px-10">
              <header className="flex flex-col">
                <p className="font-sans text-[28px] font-bold uppercase leading-9 tracking-[-0.01em] text-brand-red">
                  Career Arc
                </p>
                <h2
                  id="career-arc-title"
                  className="font-display text-[clamp(2.75rem,6vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-brand-red"
                >
                  SCALING THE STACK
                </h2>
              </header>
              <h3 className={`${cardTitleClass} text-brand-red`}>
                Enterprise & AI Integration
              </h3>
              <p className={`${cardBodyClass} text-brand-red`}>
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
          <header className="flex flex-col items-center py-[50px] text-center">
            <p className="w-full font-sans text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]">
              Selected Works
            </p>
            <h2
              id="selected-works-title"
              className="w-full font-display text-[clamp(2.75rem,7vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.04em]"
            >
              proof & Pudding.
            </h2>
          </header>

          <SelectedWorksGrid projects={projects} />
        </div>
      </MotionSection>

      <AboutSection />

      <ReferralsSection />

      <PixelDivider direction="cream-to-red" />
    </>
  );
}
