import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightFromLine } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page or resource you are looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col bg-brand-red px-5 pb-16 pt-[120px] text-brand-blue md:px-[50px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center text-center">
        <p className="mb-4 font-display text-base font-bold uppercase tracking-[-0.01em]">
          Lost in the system
        </p>
        <h1 className="font-display text-[clamp(6rem,22vw,10rem)] font-bold uppercase leading-none tracking-[-0.04em]">
          404
        </h1>
        <p className="mt-4 font-display text-base font-bold uppercase tracking-[-0.01em]">
          ashleybradshaw.co.uk
        </p>
        <p className="mt-8 max-w-xl font-sans text-base font-bold leading-6 tracking-[-0.01em]">
          The page or resource you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-cream-1 transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cream-1 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-red"
        >
          Back Home
          <ArrowRightFromLine size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
