import { CheckAvailabilityButton } from "@/components/Buttons";
import { MotionSection } from "@/components/MotionSection";
import { RoleBreakdown } from "@/components/RoleBreakdown";
import { SectionHeader } from "@/components/SectionHeader";
import { getAbout, getExperience } from "@/lib/content";
import { typeBody, typeDeck, typeKicker } from "@/lib/typography";

type AboutSectionProps = {
  hideHeader?: boolean;
};

export function AboutSection({ hideHeader = false }: AboutSectionProps) {
  const about = getAbout();
  const experience = getExperience();
  const Subheading = hideHeader ? "h2" : "h3";

  return (
    <MotionSection
      id="about"
      aria-labelledby={hideHeader ? "about-page-title" : "about-title"}
      className="relative z-0 -mt-px bg-cream-1 text-text-dark"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        {hideHeader ? null : (
          <SectionHeader
            titleId="about-title"
            subtitle={about.subtitle}
            title={about.title}
          />
        )}

        <div
          className={`flex flex-col items-start gap-12 pb-16 lg:flex-row lg:justify-between lg:gap-10 lg:pb-24 ${
            hideHeader ? "pt-12 lg:pt-16" : ""
          }`}
        >
          <div className="flex max-w-[65ch] flex-col items-start gap-8 p-5">
            <Subheading className={`${typeKicker} text-text-dark`}>
              {about.headline}
            </Subheading>
            {about.sell.map((paragraph, index) => (
              <p key={`sell-${index}`} className={`${typeBody} text-text-dark`}>
                {paragraph}
              </p>
            ))}
            <div id="availability">
              <CheckAvailabilityButton>{about.availabilityCta}</CheckAvailabilityButton>
            </div>
            <Subheading className={`${typeKicker} text-text-dark`}>
              {about.originsTitle}
            </Subheading>
            <div className="flex w-full flex-col gap-8">
              {about.origins.map((paragraph, index) => (
                <p key={`origins-${index}`} className={`${typeBody} text-text-dark`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex w-full max-w-[620px] shrink-0 flex-col lg:pt-5">
            <header className="flex flex-col pb-8">
              <p className={`${typeKicker} text-taupe`}>{experience.subtitle}</p>
              <Subheading className={`${typeDeck} text-taupe`}>
                {experience.title}
              </Subheading>
            </header>
            <RoleBreakdown roles={experience.roles} />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
