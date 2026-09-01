import Image from "next/image";
import { CrosshairRail } from "@/components/CrosshairRail";
import { MotionSection } from "@/components/MotionSection";
import { SectionHeader } from "@/components/SectionHeader";
import { getReferrals } from "@/lib/content";
import { typeBody, typeBodyFlush } from "@/lib/typography";

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
  const referrals = getReferrals();

  return (
    <MotionSection
      aria-labelledby="referrals-title"
      className="m-0 w-full bg-cream-1 text-text-dark"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        <SectionHeader
          titleId="referrals-title"
          subtitle={referrals.subtitle}
          title={referrals.title}
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-5">
          {referrals.items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col items-start justify-center px-5"
            >
              <div className="flex items-center py-5">
                <QuoteMark />
              </div>
              <blockquote className={`${typeBody} uppercase text-text-dark`}>
                {item.quote}
              </blockquote>
              <figcaption className="flex items-center gap-2.5 py-5">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.avatar}
                    alt={`${item.name} portrait`}
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
                  <span className={typeBodyFlush}>{item.name}</span>
                  <span className={typeBodyFlush}>{item.role}</span>
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
