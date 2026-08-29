"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { getRandomAccessiblePair } from "@/lib/accessibleColorPair";

export const MASTER_HERO_TOKENS = {
  bg: "#FF0E00",
  text: "#13014C",
  accent: "#13014C",
} as const;

export type HeroTokens = {
  bg: string;
  text: string;
  accent: string;
};

type HeroTokensContextValue = {
  tokens: HeroTokens;
  randomize: () => void;
};

const HeroTokensContext = createContext<HeroTokensContextValue | null>(null);

export function HeroTokensProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<HeroTokens>(MASTER_HERO_TOKENS);

  const randomize = useCallback(() => {
    const pair = getRandomAccessiblePair();
    setTokens({ bg: pair.bg, text: pair.text, accent: pair.text });
  }, []);

  const value = useMemo(
    () => ({ tokens, randomize }),
    [randomize, tokens],
  );

  const style = {
    "--hero-bg": tokens.bg,
    "--hero-text": tokens.text,
    "--hero-accent": tokens.accent,
  } as CSSProperties;

  return (
    <HeroTokensContext.Provider value={value}>
      <div className="flex min-h-full flex-1 flex-col" style={style}>
        {children}
      </div>
    </HeroTokensContext.Provider>
  );
}

export function useHeroTokens() {
  const context = useContext(HeroTokensContext);
  if (!context) {
    throw new Error("useHeroTokens must be used within HeroTokensProvider");
  }
  return context;
}
