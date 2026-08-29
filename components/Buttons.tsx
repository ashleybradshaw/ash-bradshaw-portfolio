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
      className={`inline-flex items-center justify-center rounded-[4px] bg-cream-2 px-5 py-2.5 font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-brand-red shadow-[0_4px_30px_#FF0E0033] transition-all hover:-translate-y-0.5 hover:opacity-90 ${focusRing} ${className}`}
    >
      Check Availability
    </a>
  );
}

export function OpenProjectLink({
  href,
  children = "Open Project",
  className = "",
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex w-fit text-xs font-bold uppercase tracking-wider text-[#FF0E00] transition-all hover:-translate-y-0.5 hover:underline hover:underline-offset-4 hover:opacity-90 ${focusRing} ${className}`}
    >
      {children}
    </Link>
  );
}

export function ExternalProjectCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border border-[#13014C]/10 bg-white px-5 py-2.5 text-xs font-bold uppercase text-[#0A0127] transition-all hover:-translate-y-0.5 hover:bg-[#13014C] hover:text-white hover:opacity-90 ${focusRing} focus-visible:ring-offset-[#F7F6F9]`}
    >
      {children}
    </a>
  );
}
