"use client";

import { useEffect, useRef } from "react";
import {
  SprayCanIcon,
  type SprayCanIconHandle,
} from "@animateicons/react/lucide";
import { outlinedControlClass } from "@/components/Buttons";
import { useHeroTokens } from "@/components/HeroTokensProvider";

const SPRAY_DURATION = 1.15;

export function HeroColorControls({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { randomize } = useHeroTokens();
  const iconRef = useRef<SprayCanIconHandle>(null);

  useEffect(() => {
    const play = () => iconRef.current?.startAnimation();
    play();
    const timer = window.setInterval(play, SPRAY_DURATION * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <button
      type="button"
      aria-label="Spray a new accessible colour palette"
      className={`${outlinedControlClass} ${compact ? "px-2" : ""}`}
      onClick={randomize}
    >
      <SprayCanIcon
        ref={iconRef}
        size={16}
        color="currentColor"
        duration={SPRAY_DURATION}
        isAnimated
        className="pointer-events-none shrink-0"
      />
      Spray
    </button>
  );
}
