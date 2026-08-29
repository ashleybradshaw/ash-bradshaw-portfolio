"use client";

import Link from "next/link";
import { LiveClock } from "@/components/LiveClock";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/ashleyjohnbradshaw/",
    label: "Linkedin",
  },
  { href: "https://github.com/ashleybradshaw", label: "Github" },
  { href: "https://x.com/ashjonbradshaw", label: "X" },
] as const;

const metaClass =
  "shrink-0 font-sans text-[12px] font-bold uppercase leading-6 tracking-[-0.01em] text-[var(--hero-text)] transition-[color] duration-[400ms] ease-in-out";

const logoClass =
  "shrink-0 font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-[var(--hero-text)] transition-[color] duration-[400ms] ease-in-out";

const linkClass = `${metaClass} hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hero-bg)]`;

const spacerClass =
  "hidden h-6 min-w-8 flex-1 bg-[var(--hero-accent)] transition-colors duration-[400ms] ease-in-out xl:block";

export function Footer() {
  return (
    <footer className="hero-canvas relative -mt-px w-full shadow-[0_-1px_0_0_var(--hero-bg)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:gap-5 lg:px-[50px] lg:py-12">
        <p className={logoClass}>ASHLEYBRADSHAW</p>

        <div aria-hidden="true" className={spacerClass} />

        <p className={metaClass}>© 2026 ASHLEYBRADSHAW LIMITED</p>

        <div aria-hidden="true" className={spacerClass} />

        <p className={metaClass}>
          <LiveClock />
        </p>

        <div aria-hidden="true" className={spacerClass} />

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
