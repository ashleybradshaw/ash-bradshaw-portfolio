import {
  Apple,
  AudioLines,
  Camera,
  Eye,
  Gamepad2,
  Globe,
  Pencil,
  Scissors,
  Star,
  Target,
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
  centerLeft: LucideIcon;
  centerRight: LucideIcon;
  right: LucideIcon;
}[] = [
  {
    left: Eye,
    centerLeft: AudioLines,
    centerRight: Scissors,
    right: Pencil,
  },
  {
    left: Globe,
    centerLeft: Star,
    centerRight: Type,
    right: Target,
  },
  {
    left: Video,
    centerLeft: Apple,
    centerRight: Gamepad2,
    right: Camera,
  },
];

const iconClass = "size-5 shrink-0 text-brand-blue md:size-6";

function IconRail({
  left: LeftIcon,
  centerLeft: CenterLeftIcon,
  centerRight: CenterRightIcon,
  right: RightIcon,
}: (typeof rails)[number]) {
  return (
    <div
      aria-hidden="true"
      className="flex h-11 min-w-0 items-center gap-1.5 py-2.5 sm:gap-2 md:gap-2.5"
    >
      <LeftIcon strokeWidth={1.75} className={iconClass} />
      <span className="h-px min-w-3 flex-1 border-t-2 border-dashed border-brand-blue" />
      <span className="relative z-10 flex shrink-0 items-center gap-1.5 bg-brand-red sm:gap-2 md:gap-2.5">
        <CenterLeftIcon strokeWidth={1.75} className={iconClass} />
        <CenterRightIcon strokeWidth={1.75} className={iconClass} />
      </span>
      <span className="h-px min-w-3 flex-1 border-t-2 border-dashed border-brand-blue" />
      <RightIcon strokeWidth={1.75} className={iconClass} />
    </div>
  );
}

function StackDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex h-6 min-w-0 items-center md:hidden"
    >
      <span className="h-px w-full border-t-2 border-dashed border-brand-blue" />
    </div>
  );
}

function StoryCell({ story }: { story: (typeof stories)[number] }) {
  return (
    <article className="flex min-h-0 flex-col justify-center bg-transparent px-0 py-6 sm:px-4 md:min-h-[300px] md:p-5">
      <h2 className="font-display text-[clamp(1.375rem,5vw,1.75rem)] font-bold uppercase leading-tight tracking-[-0.01em] text-brand-blue md:leading-9">
        {story.title}
      </h2>
      <p className="font-sans text-[clamp(1.125rem,4.5vw,1.75rem)] font-bold leading-tight tracking-[-0.01em] text-brand-blue md:leading-9">
        {story.subtitle}
      </p>
      <p className="mt-2 font-sans text-base font-bold leading-6 tracking-[-0.01em] text-brand-blue">
        {story.body}
      </p>
    </article>
  );
}

export function StoryGrid() {
  return (
    <div className="relative min-w-0">
      <IconRail {...rails[0]} />

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-0 -translate-x-px border-l-2 border-dashed border-brand-blue md:block"
        />

        <div className="grid grid-cols-1 md:grid-cols-2">
          <StoryCell story={stories[0]} />
          <StackDivider />
          <StoryCell story={stories[1]} />
        </div>

        <IconRail {...rails[1]} />

        <div className="grid grid-cols-1 md:grid-cols-2">
          <StoryCell story={stories[2]} />
          <StackDivider />
          <StoryCell story={stories[3]} />
        </div>
      </div>

      <IconRail {...rails[2]} />
    </div>
  );
}
