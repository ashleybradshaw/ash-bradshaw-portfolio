export type RoleBadge = "contract" | "current";

export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  dates: string;
  badges: readonly RoleBadge[];
  bulletPoints: readonly string[];
};

export const experienceRoles: readonly ExperienceRole[] = [
  {
    id: "lloyds",
    title: "Senior Product Designer",
    company: "Lloyds Banking Group",
    dates: "2026 / 27",
    badges: ["contract", "current"],
    bulletPoints: [
      "Working with a new product team to rethink and modernise existing products and services - from early ideation and service design through to production, validation and ongoing support.",
      "Designing digital experiences around specific customer audiences and their financial needs",
      "Working across product, technology, research and wider business teams to turn ideas into real products",
      "Using global market insight, analytics and industry expertise to inform better product decisions",
      "Helping build a more connected, modern digital ecosystem for the next generation of wealth management",
    ],
  },
  {
    id: "latus",
    title: "Senior Product Designer",
    company: "Latus Group",
    dates: "2025 / 26",
    badges: ["contract"],
    bulletPoints: [
      "Led design across two major health tech products - YODHA, a remote health surveillance platform serving 3,800 UK businesses, and a David Lloyd partnership product contributing to a £10M commercial deal.",
      "Designed 400+ screens across B2B portals, clinical tooling and B2C mobile.",
      "Work contributed to £500k in government funding and a projected rollout to 400,000 users.",
    ],
  },
  {
    id: "j3",
    title: "Senior UX Designer",
    company: "J3 Solutions",
    dates: "2023 / 25",
    badges: ["contract"],
    bulletPoints: [
      "Redesigned a broken onboarding and application system in a regulated debt solutions business.",
      "Cut completion time from 4 days to under 24 hours, grew monthly new users from 12,000 to 40–50,000 and improved completion rates from 21% to 43%.",
      "Delivered across two phases - MVP to full release - while supporting the team's transition to in-house design.",
    ],
  },
  {
    id: "credability",
    title: "Lead Product Designer",
    company: "CredAbility",
    dates: "2019 / 22",
    badges: [],
    bulletPoints: [
      "Founding product designer on a fintech platform, present from day one through to 2.5 million registered users and 500k+ weekly active.",
      "Designed across credit tools, open banking, DarkWeb Shield and subscription services - achieving 4–8% year-on-year growth in paid adoption.",
      "Embedded across strategy, growth, compliance and delivery throughout.",
    ],
  },
  {
    id: "desap",
    title: "Design Manager",
    company: "Desap",
    dates: "2018 / 19",
    badges: [],
    bulletPoints: [
      "Design Manager at a digital product studio - leading creative output across native iOS and Android, web, CRM and CMS platforms.",
      "Split between hands-on design and team development: coaching designers, improving UX and testing practices, and acting as the primary client interface at roadmap level.",
    ],
  },
] as const;
