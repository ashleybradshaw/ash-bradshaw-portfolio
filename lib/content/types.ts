export type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type NavContent = {
  sprayLabel: string;
  primary: NavLink[];
  secondary: NavLink[];
};

export type HeroCard = {
  id: string;
  title: string;
  cta: string;
  href: string;
  body: string;
};

export type HeroContent = {
  subtitle: string;
  title: string;
  cards: HeroCard[];
};

export type CareerArcContent = {
  title: string;
  kicker?: string;
  heading?: string;
  paragraphs: string[];
};

export type ServiceItem = {
  number: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type ServicesContent = {
  subtitle: string;
  title: string;
  items: ServiceItem[];
};

export type SectionHeading = {
  subtitle: string;
  title: string;
};

export type AboutContent = {
  subtitle: string;
  title: string;
  headline: string;
  availabilityCta: string;
  sell: string[];
  originsTitle: string;
  origins: string[];
};

export type RoleBadge = "contract" | "current";

export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  dates: string;
  badges: RoleBadge[];
  bulletPoints: string[];
};

export type ExperienceContent = {
  subtitle: string;
  title: string;
  roles: ExperienceRole[];
};

export type Referral = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type ReferralsContent = {
  subtitle: string;
  title: string;
  items: Referral[];
};

export type FooterContent = {
  brand: string;
  copyright: string;
  location: string;
  timezone: string;
  availabilityCta: string;
  fieldNotes?: NavLink;
  social: NavLink[];
};

export type ProjectSlug =
  | "credability"
  | "repdaily"
  | "readygo"
  | "gamer-wager"
  | "emma-finance"
  | "reebok-zoku-runner";

export type ProjectSection = {
  id: string;
  title: string;
  kind: "prose" | "list";
  blocks: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: ProjectSlug;
  client: string;
  year: string;
  role: string;
  service: string;
  title: string;
  hookSummary: string;
  headerSubtitle: string;
  sections: ProjectSection[];
  heroImage: string;
  objectPosition?: string;
  images: string[];
  links: ProjectLink[];
};
