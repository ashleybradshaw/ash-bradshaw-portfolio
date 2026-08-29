import type { ReactNode } from "react";
import Link from "next/link";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FF0E00] focus-visible:ring-offset-2";

type CheckAvailabilityButtonProps = {
  href?: string;
  className?: string;
  onClick?: () => void;
};

export function CheckAvailabilityButton({
  href = "#availability",
  className = "",
  onClick,
}: CheckAvailabilityButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-[4px] bg-cream-2 px-5 py-2.5 font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-brand-red shadow-[0_4px_30px_#FF0E0033] transition-all hover:-translate-y-0.5 hover:opacity-90 ${focusRing} focus-visible:ring-offset-cream-1 ${className}`}
    >
      Check Availability
    </a>
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
      className={`inline-flex w-fit text-xs font-bold uppercase tracking-wider text-brand-red transition-all hover:-translate-y-0.5 hover:underline hover:underline-offset-4 hover:opacity-90 ${focusRing} ${className}`}
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
      className={`inline-flex items-center justify-center rounded-full border border-brand-blue/10 bg-white px-5 py-2.5 text-xs font-bold uppercase text-text-dark transition-all hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white hover:opacity-90 ${focusRing} focus-visible:ring-offset-[#F7F6F9]`}
    >
      {children}
    </a>
  );
}
