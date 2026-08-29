"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiveClock } from "@/components/LiveClock";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/ashleyjohnbradshaw/",
    label: "Linkedin",
  },
  { href: "https://github.com/ashleybradshaw", label: "Github" },
  { href: "https://x.com/ashjonbradshaw", label: "X" },
] as const;

type FooterVariant = "red" | "blue";

type FooterProps = {
  variant?: FooterVariant;
};

export function Footer({ variant }: FooterProps) {
  const pathname = usePathname();
  const resolvedVariant: FooterVariant =
    variant ?? (pathname === "/" ? "red" : "blue");
  const isRed = resolvedVariant === "red";

  const textClass = isRed
    ? "shrink-0 font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-brand-blue"
    : "shrink-0 font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-cream-1";

  const logoClass = isRed
    ? "shrink-0 font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-brand-blue"
    : "shrink-0 font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-cream-1";

  const linkClass = isRed
    ? `${textClass} transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cream-1 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-red`
    : `${textClass} transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FF0E00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13014C]`;

  return (
    <footer
      className={
        isRed
          ? "relative -mt-px w-full bg-brand-red text-brand-blue shadow-[0_-4px_0_0_#FF0E00]"
          : "w-full bg-brand-blue text-cream-1"
      }
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:gap-8 lg:px-[50px] lg:py-12">
        <p className={logoClass}>ASHLEYBRADSHAW</p>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 lg:justify-center">
          <p className={textClass}>© 2026 ASHLEYBRADSHAW LIMITED</p>
          <p className={textClass}>
            <LiveClock />
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 lg:shrink-0">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} (opens in a new tab)`}
              className={linkClass}
            >
              {item.label}
            </a>
          ))}
          <Link href="/#availability" className={linkClass}>
            Check Availability
          </Link>
        </div>
      </div>
    </footer>
  );
}
