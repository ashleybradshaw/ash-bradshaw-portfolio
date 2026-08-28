import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MorphSlider } from "@/components/MorphSlider";
import { getProject, projects } from "@/lib/projects";

const sectionShell =
  "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]";

const bodyTitleClass =
  "font-display text-lg font-bold uppercase tracking-wide lg:text-xl";

const bodyCopyClass = "font-sans text-base font-medium leading-relaxed";

const sectionLinks = [
  { href: "#product-challenge", label: "Product Challenge" },
  { href: "#ux-thinking", label: "UX / Product Thinking" },
  { href: "#execution", label: "Execution" },
  { href: "#impact", label: "Impact" },
] as const;

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

  const metadataPills = [
    project.client,
    project.year,
    project.role,
    project.service,
  ];

  return (
    <article className="bg-calm-light text-dark">
      <header className="w-full">
        <div className={`${sectionShell} py-16 lg:py-24`}>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg font-medium leading-relaxed">
            {project.headerSubtitle}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {metadataPills.map((item) => (
              <li
                key={item}
                className="rounded-full border border-dark px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          aria-hidden="true"
          className="aspect-video w-full bg-neutral-200"
        />
      </header>

      <section className="w-full">
        <div className={`${sectionShell} grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24`}>
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

          <div className="flex flex-col gap-16 lg:col-span-9">
            <section id="product-challenge" className="flex flex-col gap-4">
              <h3 className={bodyTitleClass}>Product Challenge</h3>
              <p className={bodyCopyClass}>{project.content.challenge}</p>
            </section>

            <section id="ux-thinking" className="flex flex-col gap-4">
              <h3 className={bodyTitleClass}>UX / Product Thinking</h3>
              <p className={bodyCopyClass}>{project.content.uxThinking}</p>
            </section>

            <section id="execution" className="flex flex-col gap-4">
              <h3 className={bodyTitleClass}>Execution</h3>
              <p className={bodyCopyClass}>{project.content.execution}</p>
            </section>

            <section id="impact" className="flex flex-col gap-4">
              <h3 className={bodyTitleClass}>Impact</h3>
              <ul className="flex flex-col gap-3">
                {project.content.impact.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 font-sans text-base font-medium leading-relaxed before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-brand-red"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <MorphSlider images={project.images} title={project.title} />
          </div>
        </div>
      </section>
    </article>
  );
}
