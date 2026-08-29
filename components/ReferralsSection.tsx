import Image from "next/image";
import { CrosshairRail } from "@/components/CrosshairRail";
import { MotionSection } from "@/components/MotionSection";

const referrals = [
  {
    quote:
      "Ashley was key to CredAbility’s growth, expertly turning complex data and research into intuitive designs.",
    name: "David Selby",
    role: "Senior Growth & Product Manager",
    avatar: "/referrals/david-selby.png",
  },
  {
    quote:
      "Ashley instrumentally launched Gamer Wager, bringing sharp product thinking and clarity from sketch to final UI.",
    name: "Rodrigo Blanc",
    role: "Product Owner",
    avatar: "/referrals/rodrigo-blanc.png",
  },
  {
    quote:
      "Ashley delivered two high-impact projects with incredible detail, always putting the user first with brilliant solutions.",
    name: "Jack Latues",
    role: "Latus Group CEO",
    avatar: "/referrals/jack-latues.png",
  },
] as const;

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      className="shrink-0 text-text-dark"
    >
      <path
        d="M16 8v4c0 .53.21 1.04.59 1.41.37.38.88.59 1.41.59V8h-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 5c0-.53.21-1.04.59-1.41C2.96 3.21 3.47 3 4 3h16c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41v12c0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59H6.83L3.21 21.79a1 1 0 0 1-1.21-.09 1 1 0 0 1-.32-.7V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8v4c0 .53.21 1.04.59 1.41.37.38.88.59 1.41.59V8H8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReferralsSection() {
  return (
    <MotionSection
      aria-labelledby="referrals-title"
      className="m-0 w-full bg-cream-1 text-text-dark"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        <header className="flex flex-col items-center pb-[50px] pt-[100px] text-center">
          <p className="w-full font-sans text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]">
            A few words from people I&apos;ve worked with.
          </p>
          <h2
            id="referrals-title"
            className="w-full font-display text-[clamp(2.75rem,7vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.04em]"
          >
            What they say
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-5">
          {referrals.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col items-start justify-center px-5"
            >
              <div className="flex items-center py-5">
                <QuoteMark />
              </div>
              <blockquote className="font-sans text-base font-bold uppercase leading-5 tracking-[-0.01em] text-text-dark">
                {item.quote}
              </blockquote>
              <figcaption className="flex items-center gap-2.5 py-5">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.avatar}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover object-center"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-text-dark/10"
                  />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
                    {item.name}
                  </span>
                  <span className="font-sans text-base font-bold leading-6 tracking-[-0.01em] text-text-dark">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <CrosshairRail />
      </div>
    </MotionSection>
  );
}
