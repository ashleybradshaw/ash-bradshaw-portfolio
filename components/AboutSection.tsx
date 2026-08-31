import { CheckAvailabilityButton } from "@/components/Buttons";
import { MotionSection } from "@/components/MotionSection";
import { RoleBreakdown } from "@/components/RoleBreakdown";
import { SectionHeader } from "@/components/SectionHeader";

type AboutSectionProps = {
  hideHeader?: boolean;
};

export function AboutSection({ hideHeader = false }: AboutSectionProps) {
  return (
    <MotionSection
      id="about"
      aria-labelledby={hideHeader ? "about-page-title" : "about-title"}
      className="relative z-0 -mt-px bg-cream-1 text-text-dark"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        {hideHeader ? null : (
          <SectionHeader titleId="about-title" subtitle="About" title="Walking the line" />
        )}

        <div
          className={`flex flex-col items-start gap-12 pb-16 lg:flex-row lg:justify-between lg:gap-10 lg:pb-24 ${
            hideHeader ? "pt-12 lg:pt-16" : ""
          }`}
        >
          <div className="flex max-w-[660px] flex-col items-start gap-[30px] p-5">
            <h3 className="font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-text-dark">
              Ash jon Bradshaw ‘The Hard Sell’
            </h3>
            <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
              Product & UX Design Lead based in Manchester. I own the end-to-end
              design lifecycle - from discovery and system architecture to
              production code.
            </p>
            <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
              My focus is enterprise scale. Most recently, I led design across
              two major product streams at Latus Group, including a health and
              longevity platform built in partnership with David Lloyd,
              contributing to a £10M commercial deal. Before that, I redesigned
              regulated onboarding at J3 Solutions, crashing completion times
              from four days to under 24 hours.
            </p>
            <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
              Earlier, I was the founding product designer at CredAbility,
              scaling the platform from zero to 2.5 million registered users. I
              am currently open to senior contract and Head of Design
              opportunities.
            </p>
            <div id="availability">
              <CheckAvailabilityButton />
            </div>
            <h3 className="font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-text-dark">
              Foundations &amp; Origins
            </h3>
            <div className="flex w-full flex-col space-y-6">
              <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
                It started by taking hardware apart and never quite getting it
                back together, a fixation on mechanisms that quickly turned
                into asking uncomfortable questions until the underlying logic
                revealed itself.
              </p>
              <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
                Hands-on production across radio, TV, web, and animation gave
                that curiosity real tools, while a First-Class degree in
                Marketing &amp; Brand Management at Leeds anchored it in human
                behavior.
              </p>
              <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
                From early creative direction for global brands to running
                multidisciplinary product studios, design was never just visual
                presentation, it was full-stack problem solving and system
                architecture. Every build I ship today is governed by four core
                operational pillars: empathy, accessibility, value exchange, and
                long-term aftercare.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[620px] shrink-0 lg:pt-5">
            <RoleBreakdown />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
