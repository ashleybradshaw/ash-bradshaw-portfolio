import Link from "next/link";

export default function FieldNotesPage() {
  return (
    <section className="flex min-h-[70vh] flex-col bg-cream-1 px-5 pb-24 pt-[120px] text-text-dark md:px-[50px]">
      <div className="mx-auto w-full max-w-[1440px]">
        <p className="mb-4 font-sans text-sm font-bold uppercase tracking-wide">
          Field Notes
        </p>
        <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
          Dispatch incoming
        </h1>
        <p className="mt-8 max-w-2xl font-sans text-base font-bold leading-6 tracking-[-0.01em]">
          Essays, process notes, and build logs will land here. In the
          meantime, the selected works remain the primary record.
        </p>
        <Link
          href="/#works"
          className="mt-10 inline-flex font-sans text-base font-bold uppercase tracking-[-0.01em] text-brand-red underline decoration-wavy underline-offset-4 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red"
        >
          Back to works
        </Link>
      </div>
    </section>
  );
}
