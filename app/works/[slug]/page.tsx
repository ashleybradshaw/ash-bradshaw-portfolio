import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalProjectCta } from "@/components/Buttons";
import { MorphSlider } from "@/components/MorphSlider";
import { PixelDivider } from "@/components/PixelDivider";
import { ProjectCard } from "@/components/ProjectCard";
import { DottedRule } from "@/components/SectionHeader";
import { getProject, projects } from "@/lib/projects";

const sectionShell =
  "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]";

const bodyTitleClass =
  "font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]";

const bodyCopyClass =
  "max-w-[733px] font-sans text-base font-bold leading-6 tracking-[-0.01em]";

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

  const moreWork = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <article className="bg-cream-1 text-text-dark">
      <header className="hero-canvas w-full pt-[72px] md:pt-[88px]">
        <div className={`${sectionShell} pb-12 pt-10 md:pb-16 lg:pt-12`}>
          <h1 className="max-w-[1320px] font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.01em] text-[var(--hero-text)] transition-colors duration-[400ms] ease-in-out">
            {project.title}
          </h1>
          <p className="mt-2.5 max-w-[841px] font-sans text-base font-bold leading-6 tracking-[-0.01em] text-[var(--hero-text)] transition-colors duration-[400ms] ease-in-out">
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

      <section className="relative -mt-px w-full bg-cream-1">
        <div className={`${sectionShell} flex flex-col gap-16 py-16 lg:py-24`}>
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
      </section>

      <section
        aria-label={`${project.title} gallery`}
        className="w-full bg-cream-1 py-12"
      >
        <div className={sectionShell}>
          <MorphSlider images={project.images} title={project.title} />
        </div>
      </section>

      <section aria-label="More work" className="w-full bg-cream-1">
        <div className={`${sectionShell} pb-16 lg:pb-24`}>
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
