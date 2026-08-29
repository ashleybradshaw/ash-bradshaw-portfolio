import Link from "next/link";
import { PixelDivider } from "@/components/PixelDivider";
import { SectionHeader } from "@/components/SectionHeader";

export default function FieldNotesPage() {
  return (
    <>
      <section className="hero-canvas w-full pt-[72px] md:pt-[88px]">
        <div className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-[50px]">
          <SectionHeader
            as="h1"
            size="hero"
            tone="red"
            rule="after"
            titleId="field-notes-title"
            subtitle="Field Notes"
            title="Dispatch incoming"
          />
        </div>
      </section>

      <PixelDivider />

      <section className="flex flex-1 flex-col bg-cream-1 px-5 pb-24 pt-8 text-text-dark md:px-[50px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <p className="max-w-2xl font-sans text-base font-bold leading-6 tracking-[-0.01em]">
            Essays, process notes, and build logs will land here. In the
            meantime, the selected works remain the primary record.
          </p>
          <Link
            href="/#works"
            className="mt-10 inline-flex font-sans text-base font-bold uppercase tracking-[-0.01em] text-[var(--hero-bg)] underline decoration-wavy underline-offset-4 transition-colors duration-[400ms] ease-in-out focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-cream-1"
          >
            Back to works
          </Link>
        </div>
      </section>

      <PixelDivider direction="cream-to-red" />
    </>
  );
}
