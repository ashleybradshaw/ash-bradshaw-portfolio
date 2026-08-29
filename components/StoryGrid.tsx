import {
  Apple,
  AudioLines,
  Camera,
  Crosshair,
  Eye,
  Gamepad2,
  Globe,
  Pencil,
  Scissors,
  Star,
  Type,
  Video,
  type LucideIcon,
} from "lucide-react";

const stories = [
  {
    title: "How It Started",
    subtitle: "The Curious Catalyst",
    body: "It began with taking hardware apart and never quite getting it back together. That early fixation on mechanisms turned into a habit of asking uncomfortable questions - digging past surface assumptions until the underlying logic revealed itself.",
  },
  {
    title: "Where It Went",
    subtitle: "The Explosion",
    body: "College and university turned curiosity into execution. Hands-on production with radio gear, TV editing, web builds, and animation gave a restless mind actual tools to feed on.",
  },
  {
    title: "How It Works",
    subtitle: "The Anchor",
    body: "Graduating with first-class honours in Marketing & Brand Management at Leeds anchored my focus in the space where product meets human behaviour. Understanding that intersection is how you build systems that scale.",
  },
  {
    title: "Why It Matters",
    subtitle: "The System",
    body: "Four pillars govern every build: empathy, accessibility, value exchange, and aftercare. These are not abstract ideals—they are the operational foundation of every system I ship.",
  },
] as const;

const rails: readonly {
  left: LucideIcon;
  right: LucideIcon;
}[] = [
  { left: Eye, right: AudioLines },
  { left: Scissors, right: Pencil },
  { left: Globe, right: Star },
  { left: Type, right: Crosshair },
  { left: Video, right: Apple },
  { left: Gamepad2, right: Camera },
];

function IconRail({
  left: LeftIcon,
  right: RightIcon,
}: {
  left: LucideIcon;
  right: LucideIcon;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex h-11 items-center justify-between gap-2.5 py-2.5"
    >
      <LeftIcon
        size={24}
        strokeWidth={1.75}
        className="shrink-0 text-brand-blue"
      />
      <span className="h-px min-w-0 flex-1 border-t-2 border-dashed border-brand-blue" />
      <RightIcon
        size={24}
        strokeWidth={1.75}
        className="shrink-0 text-brand-blue"
      />
    </div>
  );
}

function StoryCard({
  story,
  showLeftRule,
}: {
  story: (typeof stories)[number];
  showLeftRule: boolean;
}) {
  return (
    <article
      className={`flex min-h-[300px] flex-col justify-center p-5 ${
        showLeftRule
          ? "md:border-l md:border-dashed md:border-brand-blue"
          : ""
      }`}
    >
      <h2 className="font-display text-[28px] font-bold uppercase leading-9 tracking-[-0.01em] text-brand-blue">
        {story.title}
      </h2>
      <p className="font-sans text-[28px] font-bold leading-9 tracking-[-0.01em] text-brand-blue">
        {story.subtitle}
      </p>
      <p className="mt-1 font-sans text-base font-bold leading-6 tracking-[-0.01em] text-brand-blue">
        {story.body}
      </p>
    </article>
  );
}

export function StoryGrid() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="hidden h-11 items-center md:flex"
      >
        <span className="h-px w-full border-t-2 border-dashed border-brand-blue" />
      </div>

      <div className="hidden md:grid md:grid-cols-2">
        <IconRail {...rails[0]} />
        <IconRail {...rails[1]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <StoryCard story={stories[0]} showLeftRule={false} />
        <StoryCard story={stories[1]} showLeftRule />
      </div>

      <div className="hidden md:grid md:grid-cols-2">
        <IconRail {...rails[2]} />
        <IconRail {...rails[3]} />
      </div>

      <div className="grid grid-cols-1 border-t border-dashed border-brand-blue md:border-t-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <StoryCard story={stories[2]} showLeftRule={false} />
          <StoryCard story={stories[3]} showLeftRule />
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2">
        <IconRail {...rails[4]} />
        <IconRail {...rails[5]} />
      </div>
    </div>
  );
}
