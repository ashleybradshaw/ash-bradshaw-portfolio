import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalProjectCta, OpenProjectLink } from "@/components/Buttons";
import { MorphSlider } from "@/components/MorphSlider";
import { PixelDivider } from "@/components/PixelDivider";
import { getProject, projects } from "@/lib/projects";

const sectionShell =
  "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]";

const bodyTitleClass =
  "font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]";

const bodyCopyClass =
  "max-w-[733px] font-sans text-base font-bold leading-6 tracking-[-0.01em]";

const sectionLinks = [
  { href: "#product-challenge", label: "Product Challenge" },
  { href: "#ux-thinking", label: "UX / Product Thinking" },
  { href: "#execution", label: "Execution" },
  { href: "#impact", label: "Impact" },
] as const;

type MetadataMarker = {
  label: "CLIENT" | "ROLE" | "SERVICE";
  value: string;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Work" };
  }

  return {
    title: `${project.title} — Ashley Bradshaw`,
    description: project.hookSummary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const metadataMarkers: readonly MetadataMarker[] = [
    {
      label: "CLIENT",
      value: `${project.client} (${project.year})`,
    },
    { label: "ROLE", value: project.role },
    { label: "SERVICE", value: project.service },
  ];

  const moreWork = projects.filter((item) => item.slug !== project.slug);

  return (
    <article className="bg-cream-1 text-text-dark">
      <header className="hero-canvas w-full pt-[72px] md:pt-[88px]">
        <div className={`${sectionShell} pt-10 lg:pt-12`}>
          <h1 className="max-w-[1320px] font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.01em] text-[var(--hero-text)]">
            {project.title}
          </h1>
          <p className="mt-2.5 max-w-[841px] font-sans text-base font-bold leading-6 tracking-[-0.01em] text-[var(--hero-text)]">
            {project.headerSubtitle}
          </p>
          <dl className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
            {metadataMarkers.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <dt className="inline-flex items-center rounded-sm bg-neutral-400 px-3.5 py-1 font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-white">
                  {item.label}
                </dt>
                <dd className="font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-[var(--hero-text)]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src={project.heroImage}
              alt={`${project.title} hero`}
              fill
              priority
              className="object-cover"
              style={{
                objectPosition: project.objectPosition ?? "center center",
              }}
              sizes="(max-width: 1440px) 100vw, 1340px"
            />
          </div>
        </div>
      </header>

      <PixelDivider />

      <section className="w-full bg-cream-1">
        <div
          className={`${sectionShell} grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24`}
        >
          <aside className="lg:col-span-4">
            <nav
              aria-label="Case study sections"
              className="sticky top-8 hidden flex-col gap-3 lg:flex"
            >
              {sectionLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit font-sans text-xs font-semibold uppercase tracking-wide transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex flex-col gap-16 lg:col-span-8">
            <section id="product-challenge" className="flex flex-col">
              <h3 className={bodyTitleClass}>Product Challenge.</h3>
              <p className={`${bodyCopyClass} mt-5`}>{project.content.challenge}</p>
              {project.websiteUrl ? (
                <div className="mt-4 mb-8">
                  <ExternalProjectCta href={project.websiteUrl}>
                    Website
                  </ExternalProjectCta>
                </div>
              ) : null}
            </section>

            <section id="ux-thinking" className="flex flex-col gap-5">
              <h3 className={bodyTitleClass}>UX / Product Thinking.</h3>
              <p className={bodyCopyClass}>{project.content.uxThinking}</p>
            </section>

            <section id="execution" className="flex flex-col gap-5">
              <h3 className={bodyTitleClass}>Execution.</h3>
              <p className={bodyCopyClass}>{project.content.execution}</p>
            </section>

            <section id="impact" className="flex flex-col gap-5">
              <h3 className={bodyTitleClass}>Impact.</h3>
              <ul className="flex max-w-[733px] flex-col gap-1">
                {project.content.impact.map((item) => (
                  <li key={item} className={bodyCopyClass}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section
        aria-label={`${project.title} gallery`}
        className="w-full bg-cream-1 py-12"
      >
        <div className={sectionShell}>
          <MorphSlider images={project.images} title={project.title} />
        </div>
      </section>

      <section
        aria-labelledby="more-work-title"
        className="w-full bg-cream-1"
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2
            id="more-work-title"
            className="mb-10 font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]"
          >
            More Work
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {moreWork.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col gap-2.5 rounded-sm bg-cream-2 p-6 text-text-dark sm:p-8"
              >
                <div className="relative aspect-[547/271] w-full overflow-hidden rounded-sm bg-neutral-200">
                  <Image
                    src={item.heroImage}
                    alt={`${item.title} thumbnail`}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: item.objectPosition ?? "center center",
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em]">
                  {item.hookSummary}
                </p>
                <OpenProjectLink href={`/works/${item.slug}`} className="mt-1" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <PixelDivider direction="cream-to-red" />
    </article>
  );
}
