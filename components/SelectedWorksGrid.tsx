import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type SelectedWorksGridProps = {
  projects: Project[];
};

export function SelectedWorksGrid({ projects }: SelectedWorksGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.slug}
          className="rounded-sm bg-cream-2 p-7 transition-opacity duration-200 hover:opacity-95 lg:px-14 lg:py-7"
        >
          <Link
            href={`/works/${project.slug}`}
            className="flex flex-col items-start gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-cream-2"
          >
            <div className="relative aspect-[547/271] w-full overflow-hidden rounded-sm">
              <Image
                src={project.heroImage}
                alt={`${project.title} thumbnail`}
                fill
                className="object-cover"
                style={{
                  objectPosition: project.objectPosition ?? "center center",
                }}
                sizes="(min-width: 1024px) 547px, 100vw"
              />
            </div>
            <div className="flex w-full flex-col">
              <h3 className="font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em]">
                {project.title}
              </h3>
              <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em]">
                {project.hookSummary}
              </p>
            </div>
            <span className="font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-brand-red underline decoration-brand-red decoration-wavy underline-offset-4">
              Full Read
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
