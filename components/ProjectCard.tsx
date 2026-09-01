import Image from "next/image";
import type { Project } from "@/lib/content/types";
import { OpenProjectLink } from "@/components/Buttons";
import { typeBodyFlush, typeDeck } from "@/lib/typography";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col items-start gap-2.5 rounded-sm bg-cream-2 p-7 text-text-dark lg:px-14 lg:py-7">
      <div className="relative aspect-[547/271] w-full overflow-hidden rounded-sm">
        <Image
          src={project.heroImage}
          alt={`${project.title} thumbnail`}
          fill
          className="object-cover object-center"
          style={{
            objectPosition: project.objectPosition ?? "center center",
          }}
          sizes="(min-width: 1024px) 547px, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-3">
        <h3 className={typeDeck}>{project.title}</h3>
        <p className={typeBodyFlush}>{project.hookSummary}</p>
      </div>
      <OpenProjectLink href={`/works/${project.slug}`} className="mt-1" />
    </article>
  );
}
