"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useHeroTokens } from "@/components/HeroTokensProvider";

const PALETTES = {
  "red-to-cream": { from: "#FF0E00", to: "#FFF9E6" },
  "cream-to-red": { from: "#FFF9E6", to: "#FF0E00" },
} as const;

export type PixelDividerDirection = keyof typeof PALETTES;

type PixelCell = {
  row: number;
  col: number;
  threshold: number;
};

type PixelGrid = {
  width: number;
  height: number;
  cols: number;
  rows: number;
  dpr: number;
  pixels: PixelCell[];
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function createRng(seed: number) {
  let state = seed >>> 0;

  return () => {
    const mixed = Math.imul(
      (state += 0x6d2b79f5) ^ (state >>> 15),
      1 | state,
    );
    const next =
      mixed ^
      (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed));
    return ((next ^ (next >>> 14)) >>> 0) / 0x100000000;
  };
}

function buildPixels(cols: number, rows: number) {
  const random = createRng((13 + 13 * cols + 29 * rows) >>> 0);
  const pixels: PixelCell[] = [];

  for (let row = 0; row < rows; row += 1) {
    const rowProgress = rows <= 1 ? 0.5 : row / (rows - 1);

    for (let col = 0; col < cols; col += 1) {
      const threshold = clamp(
        0.02 +
          0.8 * (1 - rowProgress) +
          (random() - 0.5) * 0.34 +
          (random() - 0.5) * 0.08 +
          0.03 * Math.sin(0.72 * col + 1.13 * row),
        0.02,
        0.94,
      );
      pixels.push({ row, col, threshold });
    }
  }

  return pixels;
}

function paint(
  canvas: HTMLCanvasElement,
  grid: PixelGrid,
  progress: number,
  fromColor: string,
  toColor: string,
  invert: boolean,
) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    return;
  }

  context.setTransform(grid.dpr, 0, 0, grid.dpr, 0, 0);
  context.fillStyle = invert ? toColor : fromColor;
  context.fillRect(0, 0, grid.width, grid.height);

  const cellWidth = grid.width / grid.cols;
  const cellHeight = grid.height / grid.rows;

  context.fillStyle = invert ? fromColor : toColor;
  for (const pixel of grid.pixels) {
    const shouldPaint = invert
      ? progress < pixel.threshold
      : progress >= pixel.threshold;
    if (!shouldPaint) {
      continue;
    }

    context.fillRect(
      Math.floor(pixel.col * cellWidth),
      Math.floor(pixel.row * cellHeight),
      Math.ceil(cellWidth) + 1,
      Math.ceil(cellHeight) + 1,
    );
  }
}

function measureProgress(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const travel = 0.38 * windowHeight + rect.height;
  const raw = clamp((windowHeight - rect.top) / travel);
  const start = window.innerWidth < 1024 ? 0.18 : 0.4;
  return clamp((raw - start) / (0.99 - start), 0, 0.7);
}

export function PixelDivider({
  direction = "red-to-cream",
}: {
  direction?: PixelDividerDirection;
}) {
  const { tokens } = useHeroTokens();
  const cream = PALETTES["red-to-cream"].to;
  const from = direction === "red-to-cream" ? tokens.bg : cream;
  const to = direction === "red-to-cream" ? cream : tokens.bg;
  const invert = direction === "cream-to-red";
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<PixelGrid | null>(null);
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const rebuild = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cell = clamp((width / 1512) * 42, 18, 42);
      const cols = Math.max(1, Math.round(width / cell));
      const rows = Math.max(1, Math.round(height / cell));
      const grid: PixelGrid = {
        width,
        height,
        cols,
        rows,
        dpr,
        pixels: buildPixels(cols, rows),
      };

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gridRef.current = grid;
      paint(canvas, grid, progressRef.current, from, to, invert);
    };

    rebuild();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", rebuild);
      return () => window.removeEventListener("resize", rebuild);
    }

    const observer = new ResizeObserver(rebuild);
    observer.observe(container);
    return () => observer.disconnect();
  }, [from, invert, to]);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      frame = 0;
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const grid = gridRef.current;
      if (!container || !canvas || !grid) {
        return;
      }

      const next = measureProgress(container);
      if (Math.abs(progressRef.current - next) <= 0.006) {
        return;
      }

      progressRef.current = next;
      paint(canvas, grid, next, from, to, invert);
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [from, invert, to]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative m-0 w-full overflow-hidden p-0 aspect-[48/14] transition-[background-color] duration-[400ms] ease-in-out lg:aspect-[48/8] ${
        direction === "cream-to-red" ? "-mb-px" : ""
      }`}
      style={{
        backgroundColor:
          direction === "cream-to-red" ? "var(--hero-bg)" : from,
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full align-top" />
    </div>
  );
}
