import Link from "next/link";
import { Button } from "@/components/Button";
import { LiveClock } from "@/components/LiveClock";

const socialLinks = [
  { href: "https://www.linkedin.com/", label: "Linkedin" },
  { href: "https://github.com/", label: "Github" },
  { href: "https://x.com/", label: "X" },
] as const;

const footerTextClass =
  "font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-calm-light";

export function Footer() {
  return (
    <footer className="w-full border-t-8 border-brand-red bg-brand-blue text-calm-light">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:flex-wrap lg:items-center lg:gap-6 lg:px-[50px] lg:py-12">
        <p className="font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-calm-light">
          ashleybradshaw.co.uk
        </p>

        <p className={footerTextClass}>© 2026 AshleyBradshaw Limited</p>

        <p className={footerTextClass}>
          <LiveClock />
        </p>

        <div className="flex flex-wrap items-center gap-5">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerTextClass} transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue`}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/availability" variant="accent">
            Check Availability
          </Button>
        </div>
      </div>
    </footer>
  );
}
