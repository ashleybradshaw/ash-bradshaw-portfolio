import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type {
  AboutContent,
  CareerArcContent,
  ExperienceContent,
  ExperienceRole,
  FooterContent,
  HeroCard,
  HeroContent,
  NavContent,
  NavLink,
  Project,
  ProjectLink,
  ProjectSlug,
  ProjectSection,
  Referral,
  ReferralsContent,
  RoleBadge,
  SectionHeading,
  ServiceItem,
  ServicesContent,
} from "@/lib/content/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const PROJECT_FILES = [
  "credability.md",
  "repdaily.md",
  "readygo.md",
  "gamer-wager.md",
  "emma-finance.md",
  "reebok.md",
] as const;

const PROJECT_SLUGS: readonly ProjectSlug[] = [
  "credability",
  "repdaily",
  "readygo",
  "gamer-wager",
  "emma-finance",
  "reebok-zoku-runner",
];

function readMarkdown(relativePath: string) {
  const filePath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  return {
    data: parsed.data as Record<string, unknown>,
    body: parsed.content.trim(),
  };
}

function asString(value: unknown, fallback = "") {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function asOptionalString(value: unknown) {
  const next = asString(value);
  return next || undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => asString(item)).filter(Boolean);
}

function stripComments(value: string) {
  return value.replace(/<!--[\s\S]*?-->/g, "").trim();
}

function splitParagraphs(value: string): string[] {
  return stripComments(value)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

function splitBullets(value: string): string[] {
  return stripComments(value)
    .split("\n")
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter((line) => Boolean(line) && line !== "-");
}

function slugifyHeading(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isBulletBody(value: string) {
  const lines = stripComments(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return false;
  }

  const bullets = lines.filter((line) => /^[-*]/.test(line));
  return bullets.length >= Math.ceil(lines.length / 2);
}

function parseProjectSections(markdown: string): ProjectSection[] {
  return stripComments(markdown)
    .split(/^##\s+/m)
    .slice(1)
    .map((part) => {
      const newlineIndex = part.indexOf("\n");
      const title =
        newlineIndex === -1 ? part.trim() : part.slice(0, newlineIndex).trim();
      const body = newlineIndex === -1 ? "" : part.slice(newlineIndex + 1);
      const kind = isBulletBody(body) ? "list" : "prose";

      return {
        id: slugifyHeading(title),
        title,
        kind,
        blocks: kind === "list" ? splitBullets(body) : splitParagraphs(body),
      } satisfies ProjectSection;
    })
    .filter((section) => section.title.length > 0);
}

function asProjectLinks(value: unknown): ProjectLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const record = (item ?? {}) as Record<string, unknown>;
      return {
        label: asString(record.label),
        href: asString(record.href),
      } satisfies ProjectLink;
    })
    .filter((link) => Boolean(link.label) && Boolean(link.href));
}

function asLinks(value: unknown): NavLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    const record = (item ?? {}) as Record<string, unknown>;
    return {
      href: asString(record.href),
      label: asString(record.label),
      ...(record.external === true ? { external: true } : {}),
    };
  });
}

function asBadges(value: unknown): RoleBadge[] {
  return asStringArray(value).filter(
    (badge): badge is RoleBadge => badge === "contract" || badge === "current",
  );
}

function isProjectSlug(value: string): value is ProjectSlug {
  return PROJECT_SLUGS.includes(value as ProjectSlug);
}

export const getNav = cache((): NavContent => {
  const { data } = readMarkdown("nav.md");

  return {
    sprayLabel: asString(data.sprayLabel, "Spray"),
    primary: asLinks(data.primary),
    secondary: asLinks(data.secondary),
  };
});

export const getHero = cache((): HeroContent => {
  const { data } = readMarkdown("homepage/hero.md");
  const cards = Array.isArray(data.cards) ? data.cards : [];

  return {
    subtitle: asString(data.subtitle),
    title: asString(data.title),
    cards: cards.map((item) => {
      const record = (item ?? {}) as Record<string, unknown>;
      return {
        id: asString(record.id),
        title: asString(record.title),
        cta: asString(record.cta),
        href: asString(record.href),
        body: asString(record.body),
      } satisfies HeroCard;
    }),
  };
});

export const getCareerArc = cache((): CareerArcContent => {
  const { data, body } = readMarkdown("homepage/career-arc.md");
  const kicker = asOptionalString(data.kicker);
  const heading = asOptionalString(data.heading);

  return {
    title: asString(data.title),
    paragraphs: splitParagraphs(asString(data.body) || body),
    ...(kicker ? { kicker } : {}),
    ...(heading ? { heading } : {}),
  };
});

export const getServices = cache((): ServicesContent => {
  const { data } = readMarkdown("homepage/services.md");
  const items = Array.isArray(data.items) ? data.items : [];

  return {
    subtitle: asString(data.subtitle),
    title: asString(data.title),
    items: items.map((item) => {
      const record = (item ?? {}) as Record<string, unknown>;
      return {
        number: asString(record.number),
        title: asString(record.title),
        subtitle: asString(record.subtitle),
        body: asString(record.body),
        image: asString(record.image),
        imageAlt: asString(record.imageAlt),
      } satisfies ServiceItem;
    }),
  };
});

export const getSelectedWorks = cache((): SectionHeading => {
  const { data } = readMarkdown("homepage/selected-works.md");

  return {
    subtitle: asString(data.subtitle),
    title: asString(data.title),
  };
});

export const getReferrals = cache((): ReferralsContent => {
  const { data } = readMarkdown("homepage/referrals.md");
  const items = Array.isArray(data.items) ? data.items : [];

  return {
    subtitle: asString(data.subtitle),
    title: asString(data.title),
    items: items.map((item) => {
      const record = (item ?? {}) as Record<string, unknown>;
      return {
        quote: asString(record.quote),
        name: asString(record.name),
        role: asString(record.role),
        avatar: asString(record.avatar),
      } satisfies Referral;
    }),
  };
});

export const getAbout = cache((): AboutContent => {
  const { data, body } = readMarkdown("about/about.md");
  const stripped = stripComments(body);
  const originSection = parseProjectSections(body)[0];

  return {
    subtitle: asString(data.subtitle),
    title: asString(data.title),
    headline: asString(data.headline),
    availabilityCta: asString(data.availabilityCta, "Check Availability"),
    sell: splitParagraphs(stripped.split(/^##\s+/m)[0] ?? ""),
    originsTitle:
      originSection?.title ??
      asString(data.originsTitle, "Foundations & Origins"),
    origins: originSection?.blocks ?? [],
  };
});

export const getExperience = cache((): ExperienceContent => {
  const { data } = readMarkdown("about/experience.md");
  const roles = Array.isArray(data.roles) ? data.roles : [];

  return {
    subtitle: asString(data.subtitle),
    title: asString(data.title),
    roles: roles.map((item) => {
      const record = (item ?? {}) as Record<string, unknown>;
      return {
        id: asString(record.id),
        title: asString(record.title),
        company: asString(record.company),
        dates: asString(record.dates),
        badges: asBadges(record.badges),
        bulletPoints: asStringArray(record.bullets),
      } satisfies ExperienceRole;
    }),
  };
});

export const getFooter = cache((): FooterContent => {
  const { data } = readMarkdown("footer.md");

  return {
    brand: asString(data.brand),
    copyright: asString(data.copyright),
    location: asString(data.location),
    timezone: asString(data.timezone, "GMT"),
    availabilityCta: asString(data.availabilityCta, "Check Availability"),
    social: asLinks(data.social),
  };
});

function loadProject(filename: string): Project {
  const { data, body } = readMarkdown(`projects/${filename}`);
  const slugValue = asString(data.slug);

  if (!isProjectSlug(slugValue)) {
    throw new Error(`Unknown project slug in ${filename}: ${slugValue}`);
  }

  const headerSubtitle =
    asOptionalString(data.headerSubtitle) ?? asString(data.hookSummary);
  const links = asProjectLinks(data.links);

  return {
    slug: slugValue,
    client: asString(data.client),
    year: asString(data.year),
    role: asString(data.role),
    service: asString(data.service),
    title: asString(data.title),
    hookSummary: asString(data.hookSummary),
    headerSubtitle,
    heroImage: asString(data.heroImage),
    objectPosition: asOptionalString(data.objectPosition),
    images: asStringArray(data.images),
    links,
    sections: parseProjectSections(body),
  };
}

export const getProjects = cache((): Project[] => {
  return PROJECT_FILES.map((filename) => loadProject(filename));
});

export const getProject = cache((slug: string): Project | undefined => {
  return getProjects().find((project) => project.slug === slug);
});
