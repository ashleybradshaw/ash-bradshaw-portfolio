"use client";

import { useHeroTokens } from "@/components/HeroTokensProvider";

export function HeroColorControls({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { randomize } = useHeroTokens();

  const buttonClassName = compact
    ? "shrink-0 border border-current px-2 py-1 font-sans text-[11px] font-bold uppercase leading-none tracking-[-0.01em] transition-[opacity,color,background-color] duration-[400ms] ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-current"
    : "shrink-0 border border-current px-2.5 py-1.5 font-sans text-xs font-bold uppercase leading-none tracking-[-0.01em] transition-[opacity,color,background-color] duration-[400ms] ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-current";

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button type="button" className={buttonClassName} onClick={randomize}>
        New Colours
      </button>
    </div>
  );
}
