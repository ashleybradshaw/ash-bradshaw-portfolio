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
import { getCareerArc, getHero, getProjects, getSelectedWorks } from "@/lib/content";
import type { HeroCard } from "@/lib/content";

const heroCardBase =
  "flex h-full min-h-[280px] w-full flex-col items-start gap-2.5 p-5";

const heroCardNavy = `${heroCardBase} bg-[var(--hero-accent)] text-[var(--hero-bg)] transition-[background-color,color] duration-[400ms] ease-in-out`;

const heroCardOutline = `${heroCardBase} border border-solid border-[var(--hero-accent)] bg-transparent text-[var(--hero-text)] transition-[border-color,color] duration-[400ms] ease-in-out`;

const cardTitleClass =
  "font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]";

const cardBodyClass =
  "font-sans text-base font-bold leading-6 tracking-[-0.01em]";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function HeroCardArticle({ card }: { card: HeroCard }) {
  const external = isExternalHref(card.href);
  const cta = (
    <OutlinedCta href={card.href} external={external} className="mt-auto">
      {card.cta}
    </OutlinedCta>
  );

  if (card.id === "core-philosophy") {
    return (
      <article className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden bg-[var(--hero-accent)] text-[var(--hero-bg)] transition-[background-color,color] duration-[400ms] ease-in-out">
        <Iridescence className="pointer-events-none absolute inset-0 z-0 opacity-80" />
        <div className="relative z-10 flex h-full min-h-[280px] flex-col items-start gap-2.5 p-5">
          <h2 className={cardTitleClass}>{card.title}</h2>
          <p className={cardBodyClass}>{card.body}</p>
          {cta}
        </div>
      </article>
    );
  }

  const surface =
    card.id === "where-i-am" ? heroCardOutline : heroCardNavy;

  return (
    <article className={surface}>
      <h2 className={cardTitleClass}>{card.title}</h2>
      <p className={cardBodyClass}>{card.body}</p>
      {cta}
    </article>
  );
}

export default function Home() {
  const hero = getHero();
  const careerArc = getCareerArc();
  const selectedWorks = getSelectedWorks();
  const projects = getProjects();

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
            subtitle={hero.subtitle}
            title={hero.title}
          />

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {hero.cards.map((card) => (
              <HeroCardArticle key={card.id} card={card} />
            ))}
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
                {careerArc.kicker ? (
                  <p className="font-sans text-[28px] font-bold uppercase leading-9 tracking-[-0.01em] text-[var(--hero-bg)]">
                    {careerArc.kicker}
                  </p>
                ) : null}
                <h2
                  id="career-arc-title"
                  className="font-display text-[clamp(2.75rem,6vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-[var(--hero-bg)]"
                >
                  {careerArc.title}
                </h2>
              </header>
              {careerArc.heading ? (
                <h3 className={`${cardTitleClass} text-[var(--hero-bg)]`}>
                  {careerArc.heading}
                </h3>
              ) : null}
              <div className="flex flex-col gap-6">
                {careerArc.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className={`${cardBodyClass} text-[var(--hero-bg)]`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
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
            subtitle={selectedWorks.subtitle}
            title={selectedWorks.title}
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
