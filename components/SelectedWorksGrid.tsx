import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/content/types";

type SelectedWorksGridProps = {
  projects: Project[];
};

export function SelectedWorksGrid({ projects }: SelectedWorksGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
