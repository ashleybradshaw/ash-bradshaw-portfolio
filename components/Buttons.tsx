import type { ReactNode } from "react";
import Link from "next/link";

export const outlinedControlClass =
  "inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-[4px] border border-current px-3 py-1.5 font-sans text-xs font-bold uppercase leading-4 tracking-wider transition-colors duration-[400ms] ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-current";

const sprayedFillClass =
  "cursor-pointer bg-[var(--hero-accent)] text-[var(--hero-bg)] shadow-[0_4px_30px_color-mix(in_srgb,var(--hero-accent)_20%,transparent)] transition-[background-color,color,box-shadow,transform,opacity] duration-[400ms] ease-in-out hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-cream-1";

export function CheckAvailabilityButton({
  children = "Check Availability",
}: {
  children?: ReactNode;
}) {
  return (
    <a
      href="#availability"
      data-availability-modal=""
      aria-haspopup="dialog"
      className={`inline-flex items-center justify-center rounded-[4px] px-5 py-2.5 font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] ${sprayedFillClass}`}
    >
      {children}
    </a>
  );
}

type OutlinedCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function OutlinedCta({
  href,
  children,
  className = "",
  external = false,
}: OutlinedCtaProps) {
  const classNameFull = `${outlinedControlClass} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNameFull}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classNameFull}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNameFull}>
      {children}
    </Link>
  );
}

type OpenProjectLinkProps = {
  href: string;
  children?: ReactNode;
  className?: string;
};

export function OpenProjectLink({
  href,
  children = "Open Project",
  className = "",
}: OpenProjectLinkProps) {
  return (
    <Link
      href={href}
      className={`${outlinedControlClass} ${className}`}
    >
      {children}
    </Link>
  );
}

type ExternalProjectCtaProps = {
  href: string;
  children: ReactNode;
};

export function ExternalProjectCta({
  href,
  children,
}: ExternalProjectCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${typeof children === "string" ? children : "Open website"} (opens in a new tab)`}
      className={`inline-flex w-fit items-center justify-center rounded-[4px] px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider ${sprayedFillClass}`}
    >
      {children}
    </a>
  );
}
