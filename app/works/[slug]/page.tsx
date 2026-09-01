import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalProjectCta } from "@/components/Buttons";
import { MorphSlider } from "@/components/MorphSlider";
import { PixelDivider } from "@/components/PixelDivider";
import { ProjectCard } from "@/components/ProjectCard";
import { DottedRule } from "@/components/SectionHeader";
import { getProject, getProjects } from "@/lib/content";
import { typeBody, typeDeck } from "@/lib/typography";

const sectionShell =
  "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]";

type MetadataMarker = {
  label: "CLIENT" | "ROLE" | "SERVICE";
  value: string;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
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
      value: project.year
        ? `${project.client} (${project.year})`
        : project.client,
    },
    { label: "ROLE", value: project.role },
    { label: "SERVICE", value: project.service },
  ];

  const moreWork = getProjects()
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <article className="min-w-0 overflow-x-hidden bg-cream-1 text-text-dark">
      <header className="hero-canvas w-full pt-[72px] md:pt-[88px]">
        <div className={`${sectionShell} pb-12 pt-10 md:pb-16 lg:pt-12`}>
          <h1 className="max-w-[1320px] font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.01em] text-[var(--hero-text)] transition-colors duration-[400ms] ease-in-out">
            {project.title}
          </h1>
          <p
            className={`mt-4 ${typeBody} text-[var(--hero-text)] transition-colors duration-[400ms] ease-in-out`}
          >
            {project.headerSubtitle}
          </p>
          <dl className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            {metadataMarkers.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <dt className="inline-flex items-center rounded-sm bg-[var(--hero-accent)] px-3.5 py-1 font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-[var(--hero-bg)] transition-[background-color,color] duration-[400ms] ease-in-out">
                  {item.label}
                </dt>
                <dd className="font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-[var(--hero-text)] transition-colors duration-[400ms] ease-in-out">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg">
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

      <div className="relative -mt-px w-full bg-cream-1">
        <div
          className={`${sectionShell} flex flex-col gap-20 py-20 lg:gap-28 lg:py-28`}
        >
          {project.sections.map((section, sectionIndex) => (
            <section
              key={section.id}
              id={section.id}
              className="flex flex-col gap-6"
              aria-labelledby={`${section.id}-title`}
            >
              <h2 id={`${section.id}-title`} className={typeDeck}>
                {section.title}
              </h2>
              {section.kind === "list" ? (
                <ul className={`flex flex-col gap-8 ${typeBody}`}>
                  {section.blocks.map((item, index) => (
                    <li key={`${section.id}-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col gap-8">
                  {section.blocks.map((paragraph, index) => (
                    <p key={`${section.id}-${index}`} className={typeBody}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {sectionIndex === 0 && project.links.length > 0 ? (
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {project.links.map((link) => (
                    <ExternalProjectCta key={link.href} href={link.href}>
                      {link.label}
                    </ExternalProjectCta>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <section
        aria-label={`${project.title} gallery`}
        className="w-full overflow-x-hidden bg-cream-1 py-12"
      >
        <MorphSlider images={project.images} title={project.title} />
      </section>

      <section aria-labelledby="more-work-title" className="w-full bg-cream-1">
        <div className={`${sectionShell} pb-16 lg:pb-24`}>
          <h2 id="more-work-title" className="sr-only">
            More work
          </h2>
          <DottedRule />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {moreWork.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </div>
      </section>

      <PixelDivider direction="cream-to-red" />
    </article>
  );
}
