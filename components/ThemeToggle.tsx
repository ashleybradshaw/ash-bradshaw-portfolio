"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { cycleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label="Cycle colour theme"
      className="inline-flex items-center justify-center bg-brand-blue px-3.5 py-1 font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-accent-cream transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light"
    >
      New Colours
    </button>
  );
}
