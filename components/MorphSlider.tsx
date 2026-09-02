"use client";

import Image from "next/image";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type MorphSliderProps = {
  images: string[];
  title: string;
};

const MAX_SLIDES = 10;
const AUTO_MS = 6000;
const PLACEHOLDER_TONES = [
  "#d6d6d6",
  "#c9c9c9",
  "#bcbcbc",
  "#b0b0b0",
  "#a4a4a4",
  "#989898",
  "#8c8c8c",
  "#808080",
  "#747474",
  "#686868",
] as const;

export function MorphSlider({ images, title }: MorphSliderProps) {
  const labelId = useId();
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const programmaticScroll = useRef(false);
  const slideSrcs = images.filter((src) => src.length > 0).slice(0, MAX_SLIDES);
  const slideCount = Math.min(MAX_SLIDES, slideSrcs.length || MAX_SLIDES);
  const slides = Array.from({ length: slideCount }, (_, index) => index);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [fitsAll, setFitsAll] = useState(false);
  const autoplayAllowed = !reduceMotion && !fitsAll;
  const playing = isPlaying && autoplayAllowed;

  const measureOverflow = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    setFitsAll(viewport.scrollWidth <= viewport.clientWidth + 1);
  }, []);

  const syncIndexFromScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const first = viewport?.querySelector("li");
    if (!viewport || !(first instanceof HTMLElement)) {
      return;
    }

    const styles = window.getComputedStyle(viewport.querySelector("ul") ?? viewport);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const stride = first.offsetWidth + gap;
    if (stride <= 0) {
      return;
    }

    const nextIndex = Math.min(
      slideCount - 1,
      Math.max(0, Math.round(viewport.scrollLeft / stride)),
    );
    setActiveIndex(nextIndex);
  }, [slideCount]);

  const goTo = useCallback(
    (index: number, { userInitiated = false } = {}) => {
      const viewport = viewportRef.current;
      const target = viewport?.querySelectorAll("li")[index];
      if (!viewport || !(target instanceof HTMLElement)) {
        return;
      }

      const nextIndex = Math.min(slideCount - 1, Math.max(0, index));
      programmaticScroll.current = true;
      setActiveIndex(nextIndex);
      setHasEnded(false);
      if (userInitiated) {
        setIsPlaying(false);
      }

      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const viewportLeft = viewport.getBoundingClientRect().left;
      const targetLeft =
        target.getBoundingClientRect().left - viewportLeft + viewport.scrollLeft;
      const nextLeft = Math.min(maxScroll, Math.max(0, targetLeft));

      viewport.scrollTo({
        left: nextLeft,
        behavior: reduceMotion || fitsAll ? "auto" : "smooth",
      });

      window.setTimeout(() => {
        programmaticScroll.current = false;
      }, reduceMotion ? 50 : 450);
    },
    [fitsAll, reduceMotion, slideCount],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    measureOverflow();
    const observer = new ResizeObserver(measureOverflow);
    observer.observe(viewport);
    window.addEventListener("resize", measureOverflow);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureOverflow);
    };
  }, [measureOverflow, slideCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const onScroll = () => {
      if (programmaticScroll.current) {
        syncIndexFromScroll();
        return;
      }

      setIsPlaying(false);
      setHasEnded(false);
      syncIndexFromScroll();
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [syncIndexFromScroll]);

  useEffect(() => {
    if (!playing || hasEnded) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (activeIndex >= slideCount - 1) {
        setIsPlaying(false);
        setHasEnded(true);
        return;
      }

      goTo(activeIndex + 1);
    }, AUTO_MS);

    return () => window.clearTimeout(timer);
  }, [
    activeIndex,
    goTo,
    hasEnded,
    playing,
    slideCount,
  ]);

  const togglePlayback = () => {
    if (hasEnded || activeIndex >= slideCount - 1) {
      goTo(0);
      setHasEnded(false);
      if (!reduceMotion && !fitsAll) {
        setIsPlaying(true);
      }
      return;
    }

    setIsPlaying((current) => !current);
  };

  const playbackLabel =
    hasEnded || (!playing && activeIndex >= slideCount - 1)
      ? "Replay gallery"
      : playing
        ? "Pause gallery"
        : "Play gallery";

  return (
    <section
      className="flex w-full min-w-0 max-w-full flex-col gap-8 overflow-x-hidden"
      aria-labelledby={labelId}
      aria-roledescription="carousel"
    >
      <h2 id={labelId} className="sr-only">
        {title} gallery
      </h2>
      <p className="sr-only" aria-live="polite">
        Slide {activeIndex + 1} of {slideCount}
      </p>

      <div
        ref={viewportRef}
        className="w-full min-w-0 max-w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [contain:inline-size] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(Math.min(slideCount - 1, activeIndex + 1), {
              userInitiated: true,
            });
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(Math.max(0, activeIndex - 1), { userInitiated: true });
          }
        }}
      >
        <ul
          className={`flex w-max min-w-full gap-5 px-5 sm:px-8 lg:px-[50px] ${
            fitsAll ? "justify-center" : "justify-start"
          }`}
        >
          {slides.map((index) => {
            const src = slideSrcs[index];

            return (
              <li
                key={src ?? index}
                data-index={index}
                className="size-[min(600px,calc(100vw-2.5rem))] shrink-0 snap-start sm:size-[min(600px,calc(100vw-4rem))] lg:size-[600px]"
              >
                <article
                  className="relative size-full overflow-hidden rounded-[28px]"
                  style={
                    src
                      ? undefined
                      : { backgroundColor: PLACEHOLDER_TONES[index] }
                  }
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={`${title} — slide ${index + 1} of ${slideCount}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 85vw, 600px"
                    />
                  ) : (
                    <span className="sr-only">
                      {title} — placeholder {index + 1} of {slideCount}
                    </span>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {fitsAll ? null : (
        <div className="flex items-center justify-center gap-3 px-5">
          <div
            className="flex h-14 items-center rounded-full bg-taupe/20 px-4"
            role="group"
            aria-label="Gallery slides"
          >
            {slides.map((index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={index}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Show gallery image ${index + 1}`}
                  onClick={() => goTo(index, { userInitiated: true })}
                  className="flex h-8 items-center justify-center px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-taupe focus-visible:ring-offset-2 focus-visible:ring-offset-cream-1"
                >
                  {isActive ? (
                    <span className="relative block h-[6px] w-7 overflow-hidden rounded-full bg-taupe">
                      <span
                        className={`gallery-progress-fill absolute inset-y-0 left-0 w-full rounded-full bg-[color-mix(in_srgb,var(--color-taupe),var(--color-text-dark)_40%)] ${
                          playing && !hasEnded
                            ? ""
                            : "is-paused"
                        } ${hasEnded ? "is-complete" : ""}`}
                      />
                    </span>
                  ) : (
                    <span className="block h-[6px] w-[6px] rounded-full bg-taupe/45" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={playbackLabel}
            onClick={togglePlayback}
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-taupe/20 text-taupe transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-cream-1"
          >
            {hasEnded || (!playing && activeIndex >= slideCount - 1) ? (
              <RotateCcw size={22} strokeWidth={2} aria-hidden="true" />
            ) : playing ? (
              <Pause size={22} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Play
                size={22}
                strokeWidth={2}
                aria-hidden="true"
                className="translate-x-px"
              />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
