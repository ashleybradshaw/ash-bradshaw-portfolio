type HeaderTone = "cream" | "red";

type SectionHeaderProps = {
  subtitle: string;
  title: string;
  titleId: string;
  as?: "h1" | "h2";
  size?: "section" | "hero";
  tone?: HeaderTone;
  rule?: "before" | "after" | "none";
};

export function DottedRule({
  tone = "cream",
}: {
  tone?: HeaderTone;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex w-full min-w-0 items-center py-[50px]"
    >
      <svg
        viewBox="0 0 1340 2"
        preserveAspectRatio="none"
        className="h-0.5 w-full overflow-visible"
      >
        <path
          d="M0 1H1340"
          fill="none"
          stroke={tone === "red" ? "var(--hero-accent)" : "#E1DBC8"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function SectionHeader({
  subtitle,
  title,
  titleId,
  as = "h2",
  size = "section",
  tone = "cream",
  rule = "before",
}: SectionHeaderProps) {
  const Heading = as;
  const inkClass = tone === "red" ? "text-[var(--hero-text)]" : "text-text-dark";
  const titleClass =
    size === "hero"
      ? "w-full font-display text-[clamp(4rem,11vw,10rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]"
      : "w-full font-display text-[clamp(2.75rem,7vw,4.25rem)] font-bold uppercase leading-[1.2] tracking-[-0.04em]";

  return (
    <div className={`min-w-0 ${inkClass}`}>
      {rule === "before" ? <DottedRule tone={tone} /> : null}
      <header
        className={`flex flex-col items-center text-center ${
          rule === "before" ? "pb-[50px]" : ""
        }`}
      >
        <p className="w-full font-sans text-[clamp(1.125rem,2.2vw,1.75rem)] font-bold uppercase leading-9 tracking-[-0.01em]">
          {subtitle}
        </p>
        <Heading id={titleId} className={titleClass}>
          {title}
        </Heading>
      </header>
      {rule === "after" ? <DottedRule tone={tone} /> : null}
    </div>
  );
}
