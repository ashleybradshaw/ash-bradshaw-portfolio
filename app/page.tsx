import Link from "next/link";
import { Quote } from "lucide-react";
import { AmbientGrid } from "@/components/AmbientGrid";
import { MotionSection } from "@/components/MotionSection";
import { PixelReveal } from "@/components/PixelReveal";
import { StaggeredItem } from "@/components/StaggeredItem";
import { projects } from "@/lib/projects";

const heroCardBase = "flex h-full flex-col gap-4 border-2 p-6 lg:p-8";

const heroCardRed = `${heroCardBase} border-brand-blue bg-brand-red text-brand-blue`;

const heroCardBlue = `${heroCardBase} border-dark bg-brand-blue text-accent-cream`;

const cardTitleClass =
  "font-display text-lg font-bold uppercase leading-tight tracking-wide lg:text-xl";

const cardBodyClass = "font-sans text-base font-medium leading-relaxed";

const narrativeCardClass =
  "flex h-full flex-col gap-4 border-2 border-brand-blue bg-calm-light p-6 text-dark lg:p-8";

const sectionShell =
  "mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-[50px] lg:py-24";

const eyebrowClass = "mb-4 font-sans text-sm font-semibold uppercase tracking-wide";

const displayTitleClass =
  "font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em]";

const textLinkClass =
  "inline-flex w-fit font-display text-sm font-bold uppercase tracking-wide transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2";

const capabilities = [
  {
    title: "1. End-to-End Production",
    subtitle: "Strategy to shipped code.",
    body: "From raw discovery and UI architecture to shipped code. Eliminating handoff friction by maintaining complete fluency in both Figma and production environments.",
  },
  {
    title: "2. Discovery & AI Workflows",
    subtitle: "Flat design to PRD execution.",
    body: "Using content-driven prompt engineering to transform flat designs directly into production components, tokens, and comprehensive PRDs.",
  },
  {
    title: "3. Complex Systems & Portals",
    subtitle: "Architecting enterprise-scale data.",
    body: "Architecting data-dense ecosystems. Experience across 400+ screen clinical tools, multi-tier admin portals, and fintech compliance flows.",
  },
  {
    title: "4. Growth & Scale Engineering",
    subtitle: "Designing for commercial outcomes.",
    body: "Designing for measurable outcomes. Proven track record crashing application drop-off, increasing onboarding completion rates from 21% to 43%, and driving millions in commercial value.",
  },
] as const;

const workHistory = [
  {
    company: "Lloyds Banking Group",
    year: "2026/27",
    role: "Senior Product Designer (Contract)",
  },
  {
    company: "Latus Group",
    year: "2025/26",
    role: "Senior Product Designer (Contract)",
  },
  {
    company: "J3 Solutions",
    year: "2023/25",
    role: "Senior UX Designer (Contract)",
  },
  {
    company: "CredAbility",
    year: "2019/22",
    role: "Lead Product Designer",
  },
  {
    company: "Desap",
    year: "2018/19",
    role: "Design Manager",
  },
] as const;

const testimonials = [
  {
    quote:
      "Ash cuts through complexity without losing the human in the system. Discovery, architecture, and shipped UI arrived as one piece of work.",
    name: "Alex Chen",
    role: "Product Director",
  },
  {
    quote:
      "The fastest designer-to-code loop I have worked with. Engineering could trust the specs and move straight to services.",
    name: "Priya Shah",
    role: "Engineering Lead",
  },
  {
    quote:
      "He treated onboarding like a product, not a form. Completion times collapsed and the commercial case wrote itself.",
    name: "Jordan Hale",
    role: "Chief Operating Officer",
  },
] as const;

export default function Home() {
  return (
    <>
      <MotionSection
        aria-labelledby="hero-title"
        className="w-full bg-brand-red"
      >
        <div className={sectionShell}>
          <header className="mb-12 max-w-5xl lg:mb-16">
            <p className={`${eyebrowClass} text-brand-blue`}>
              Product Lead & Design Engineer
            </p>
            <PixelReveal
              as="h1"
              id="hero-title"
              text="ASH BRADSHAW"
              className="font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-brand-blue"
            />
          </header>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-4">
            <StaggeredItem index={0} className={heroCardRed}>
              <h2 className={cardTitleClass}>Who I Am</h2>
              <p className={cardBodyClass}>
                Product Lead with 11+ years shipping complex digital platforms
                across fintech, health tech, and enterprise SaaS. Expert in
                taking zero-to-one strategy from discovery to production code.
              </p>
            </StaggeredItem>

            <StaggeredItem index={1} className={heroCardBlue}>
              <h2 className={cardTitleClass}>Where I Am</h2>
              <p className={cardBodyClass}>
                Incoming Lead at Lloyd’s Banking Group, architecting the next
                generation of wealth management platforms.
              </p>
            </StaggeredItem>

            <StaggeredItem index={2} className={heroCardRed}>
              <h2 className={cardTitleClass}>Core Philosophy</h2>
              <p className={cardBodyClass}>
                Designing in the space between product and user. I bypass
                traditional wireframe overhead, translating green-lit designs
                straight into code and PRDs.
              </p>
            </StaggeredItem>

            <StaggeredItem index={3} className={heroCardBlue}>
              <h2 className={cardTitleClass}>Case Study</h2>
              <p className={cardBodyClass}>
                0 to 2.5 Million. Founding product designer for CredAbility.
                Designed the full ecosystem, brand, and service strategy.
              </p>
              <Link
                href="/works/credability"
                className={`${textLinkClass} mt-auto text-accent-cream focus-visible:ring-offset-brand-blue`}
              >
                Quick Read
              </Link>
            </StaggeredItem>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        aria-label="The narrative"
        className="relative z-0 overflow-hidden border-t-4 border-brand-blue bg-calm-light"
      >
        <AmbientGrid />
        <div className={`${sectionShell} relative`}>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4">
            <StaggeredItem index={0} className={narrativeCardClass}>
              <h2 className={cardTitleClass}>
                How It Started / The Curious Catalyst
              </h2>
              <p className={cardBodyClass}>
                It began with taking hardware apart and never quite getting it
                back together. That early fixation on mechanisms turned into a
                habit of asking uncomfortable questions—digging past surface
                assumptions until the underlying logic revealed itself.
              </p>
            </StaggeredItem>

            <StaggeredItem index={1} className={narrativeCardClass}>
              <h2 className={cardTitleClass}>
                Where It Went / The Explosion
              </h2>
              <p className={cardBodyClass}>
                College and university turned curiosity into execution.
                Hands-on production with radio gear, TV editing, web builds,
                and animation gave a restless mind actual tools to feed on.
              </p>
            </StaggeredItem>

            <StaggeredItem index={2} className={narrativeCardClass}>
              <h2 className={cardTitleClass}>How It Works / The Anchor</h2>
              <p className={cardBodyClass}>
                Graduating with first-class honours in Marketing & Brand
                Management at Leeds anchored my focus in the space where
                product meets human behaviour. Understanding that intersection
                is how you build systems that scale.
              </p>
            </StaggeredItem>

            <StaggeredItem index={3} className={narrativeCardClass}>
              <h2 className={cardTitleClass}>Why It Matters / The System</h2>
              <p className={cardBodyClass}>
                Four pillars govern every build: empathy, accessibility, value
                exchange, and aftercare. These are not abstract ideals—they are
                the operational foundation of every system I ship.
              </p>
            </StaggeredItem>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        aria-labelledby="career-arc-title"
        className="w-full bg-brand-red text-brand-blue"
      >
        <div className={sectionShell}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <header className="mb-10 lg:mb-12">
                <p className={eyebrowClass}>Career Arc</p>
                <h2 id="career-arc-title" className={displayTitleClass}>
                  SCALING COMPLEXITY
                </h2>
              </header>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                <div className="flex flex-col gap-4">
                  <h3 className={cardTitleClass}>Early Career</h3>
                  <p className={cardBodyClass}>
                    From early creative direction across global brands to
                    managing multidisciplinary product studios, my focus has
                    always been full-stack problem solving. Design was never
                    just visual presentation—it was system architecture.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className={cardTitleClass}>
                    Enterprise & AI Integration
                  </h3>
                  <p className={cardBodyClass}>
                    Today, I build for enterprise scale. By integrating
                    advanced LLM and agentic workflows (Cursor, Claude,
                    Perplexity), I collapse the discovery-to-code
                    pipeline—delivering complete frontends and PRDs that allow
                    engineering teams to focus purely on backend services.
                  </p>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="aspect-[3/4] w-full bg-brand-blue/10 lg:aspect-auto lg:min-h-[640px]"
            />
          </div>
        </div>
      </MotionSection>

      <MotionSection
        aria-labelledby="capabilities-title"
        className="relative z-0 overflow-hidden border-t-4 border-brand-blue bg-calm-light text-dark"
      >
        <AmbientGrid />
        <div className={`${sectionShell} relative`}>
          <header className="mb-12 text-center lg:mb-16">
            <p className={eyebrowClass}>Core Capabilities</p>
            <PixelReveal
              as="h2"
              id="capabilities-title"
              text="END-TO-END"
              className={displayTitleClass}
            />
          </header>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-3 border-2 border-brand-blue bg-calm-light p-6 lg:p-8"
              >
                <h3 className={cardTitleClass}>{item.title}</h3>
                <p className="font-sans text-base font-semibold leading-snug">
                  {item.subtitle}
                </p>
                <p className={cardBodyClass}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        aria-labelledby="selected-works-title"
        className="w-full bg-calm-light text-dark"
      >
        <div className={sectionShell}>
          <header className="mb-12 lg:mb-16">
            <p className={eyebrowClass}>Selected Works</p>
            <h2 id="selected-works-title" className={displayTitleClass}>
              PROOF & PUDDING
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
            {projects.map((project) => (
              <article key={project.slug} className="flex flex-col gap-4">
                <div
                  aria-hidden="true"
                  className="aspect-video w-full bg-neutral-200"
                />
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] lg:text-3xl">
                  {project.title}
                </h3>
                <p className="font-sans text-base font-medium leading-relaxed">
                  {project.hookSummary}
                </p>
                <Link
                  href={`/works/${project.slug}`}
                  className={`${textLinkClass} text-brand-red focus-visible:ring-offset-calm-light`}
                >
                  Full Read
                </Link>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        aria-labelledby="about-title"
        className="relative z-0 overflow-hidden bg-calm-light text-dark"
      >
        <AmbientGrid />
        <div className={`${sectionShell} relative`}>
          <header className="mb-12 lg:mb-16">
            <p className={eyebrowClass}>About</p>
            <h2 id="about-title" className={displayTitleClass}>
              WALKING THE LINE
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <p className="font-sans text-base font-medium leading-relaxed lg:text-lg">
              Product & UX Design Lead based in Manchester. I own the
              end-to-end design lifecycle—from discovery and system architecture
              to production code. My focus is enterprise scale. Most recently, I
              led design across two major product streams at Latus Group,
              including a health and longevity platform built in partnership
              with David Lloyd. Before that, I redesigned regulated onboarding
              at J3 Solutions, crashing completion times from four days to under
              24 hours. Earlier, I was the founding product designer at
              CredAbility, scaling the platform from zero to 2.5 million
              registered users. I am currently open to senior contract and Head
              of Design opportunities.
            </p>

            <ol className="flex flex-col">
              {workHistory.map((item) => (
                <li
                  key={item.company}
                  className="flex flex-col gap-1 border-b border-brand-blue/20 py-5 first:pt-0 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-base font-bold uppercase leading-6 tracking-wide">
                      {item.company}
                    </h3>
                    <p className="font-sans text-sm font-semibold uppercase tracking-wide text-brand-blue">
                      {item.year}
                    </p>
                  </div>
                  <p className="font-sans text-base font-medium leading-relaxed">
                    {item.role}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        aria-labelledby="social-proof-title"
        className="w-full bg-calm-light text-dark"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-32 pt-16 sm:px-8 sm:pb-36 lg:px-[50px] lg:pb-40 lg:pt-24">
          <header className="mb-12 text-center lg:mb-16">
            <p className={eyebrowClass}>
              A few words from people I&apos;ve worked with.
            </p>
            <h2 id="social-proof-title" className={displayTitleClass}>
              WHAT THEY SAY
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="flex h-full flex-col gap-6 border border-brand-blue/10 bg-white p-6 lg:p-8"
              >
                <Quote
                  size={28}
                  strokeWidth={2}
                  className="shrink-0 text-brand-blue"
                  aria-hidden="true"
                />
                <blockquote className="font-sans text-base font-medium leading-relaxed">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-auto font-display text-sm font-bold uppercase leading-6 tracking-wide">
                  {item.name}
                  <span className="mt-1 block font-sans text-sm font-medium normal-case tracking-normal text-brand-blue">
                    {item.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}
