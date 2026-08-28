"use client";

import { useCallback } from "react";

export type ThemePair = {
  wildBg: string;
  wildText: string;
  calmBg: string;
  calmText: string;
};

export const themePairs: ThemePair[] = [
  {
    wildBg: "#FF0E00",
    wildText: "#13014C",
    calmBg: "#F7F6F9",
    calmText: "#0A0127",
  },
  {
    wildBg: "#13014C",
    wildText: "#FFF9E6",
    calmBg: "#E8E6F0",
    calmText: "#13014C",
  },
  {
    wildBg: "#0A0127",
    wildText: "#FFFFFF",
    calmBg: "#F7F6F9",
    calmText: "#FF0E00",
  },
  {
    wildBg: "#20086B",
    wildText: "#FFFFFF",
    calmBg: "#FFF9E6",
    calmText: "#0A0127",
  },
];

let activeIndex = 0;

function applyTheme(pair: ThemePair) {
  const root = document.documentElement.style;
  root.setProperty("--wild-bg", pair.wildBg);
  root.setProperty("--wild-text", pair.wildText);
  root.setProperty("--calm-bg", pair.calmBg);
  root.setProperty("--calm-text", pair.calmText);
}

export function useTheme() {
  const cycleTheme = useCallback(() => {
    activeIndex = (activeIndex + 1) % themePairs.length;
    applyTheme(themePairs[activeIndex]);
  }, []);

  return { cycleTheme };
}
