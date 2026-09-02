import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getProjects().map((project) => ({
    url: `${SITE_URL}/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudies,
  ];
}
