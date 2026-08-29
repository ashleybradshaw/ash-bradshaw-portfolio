import { CheckAvailabilityButton } from "@/components/Buttons";
import { MotionSection } from "@/components/MotionSection";
import { RoleBreakdown } from "@/components/RoleBreakdown";

export function AboutSection() {
  return (
    <MotionSection
      id="about"
      aria-labelledby="about-title"
      className="relative z-0 bg-cream-1 text-text-dark"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        <div
          aria-hidden="true"
          className="flex items-center justify-center py-[75px]"
        >
          <span className="h-px w-full border-t-2 border-dashed border-cream-3" />
        </div>

        <header className="flex flex-col items-center py-[50px] text-center">
          <p className="w-full font-sans text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]">
            About
          </p>
          <h2
            id="about-title"
            className="w-full font-display text-[clamp(2.75rem,7vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.04em]"
          >
            Walking the line
          </h2>
        </header>

        <div className="flex flex-col items-start gap-12 pb-16 lg:flex-row lg:justify-between lg:gap-10 lg:pb-24">
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
              <CheckAvailabilityButton href="#availability" />
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
