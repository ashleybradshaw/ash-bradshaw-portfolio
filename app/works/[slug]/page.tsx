import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MorphSlider } from "@/components/MorphSlider";
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

  const heroImage = project.images[0];
  const galleryImages = project.images.slice(1);

  return (
    <article className="bg-calm-light text-dark">
      <header className="w-full bg-calm-light">
        <div className={`${sectionShell} pt-10 lg:pt-12`}>
          <h1 className="max-w-[1320px] font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.01em]">
            {project.title}
          </h1>
          <p className="mt-2.5 max-w-[841px] font-sans text-base font-bold leading-6 tracking-[-0.01em]">
            {project.headerSubtitle}
          </p>
          <dl className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
            {metadataMarkers.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <dt className="inline-flex items-center rounded-sm bg-neutral-400 px-3.5 py-1 font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-white">
                  {item.label}
                </dt>
                <dd className="font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-12 aspect-[1340/609] w-full overflow-hidden rounded-sm bg-brand-blue shadow-[0_4px_60px_20px_rgba(0,0,85,0.2)]">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={`${project.title} hero`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1440px) 100vw, 1340px"
              />
            ) : null}
          </div>
        </div>
      </header>

      <section className="w-full bg-calm-light">
        <div
          className={`${sectionShell} grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24`}
        >
          <aside className="lg:col-span-3">
            <nav
              aria-label="Case study sections"
              className="sticky top-8 hidden flex-col gap-3 lg:flex"
            >
              {sectionLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit font-sans text-xs font-semibold uppercase tracking-wide transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex max-w-[733px] flex-col gap-16 lg:col-span-9">
            <section id="product-challenge" className="flex flex-col gap-5">
              <h2 className={bodyTitleClass}>Product Challenge.</h2>
              <p className={bodyCopyClass}>{project.content.challenge}</p>
            </section>

            <section id="ux-thinking" className="flex flex-col gap-5">
              <h2 className={bodyTitleClass}>UX / Product Thinking.</h2>
              <p className={bodyCopyClass}>{project.content.uxThinking}</p>
            </section>

            <section id="execution" className="flex flex-col gap-5">
              <h2 className={bodyTitleClass}>Execution & Collaboration.</h2>
              <p className={bodyCopyClass}>{project.content.execution}</p>
            </section>

            <section id="impact" className="flex flex-col gap-5">
              <h2 className={bodyTitleClass}>Impact.</h2>
              <ul className="flex max-w-[733px] flex-col gap-1">
                {project.content.impact.map((item) => (
                  <li key={item} className={bodyCopyClass}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <MorphSlider images={galleryImages} title={project.title} />
          </div>
        </div>
      </section>
    </article>
  );
}
