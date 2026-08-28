"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

type MorphSliderProps = {
  images: string[];
  title: string;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 0.95,
    opacity: 0.85,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-32%" : "32%",
    scale: 0.95,
    opacity: 0.85,
  }),
};

const overlayButtonClassName =
  "absolute top-1/2 z-10 inline-flex -translate-y-1/2 items-center gap-2 rounded-full bg-calm-light px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-dark transition-colors duration-200 ease-out hover:bg-brand-red hover:text-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light";

export function MorphSlider({ images, title }: MorphSliderProps) {
  const slides = images.filter((src) => src.length > 0);
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);

  if (slides.length === 0) {
    return (
      <div
        aria-hidden="true"
        className="relative aspect-video w-full bg-neutral-200"
      />
    );
  }

  const paginate = (delta: number) => {
    const nextIndex = (index + delta + slides.length) % slides.length;
    setSlide([nextIndex, delta]);
  };

  const currentSrc = slides[index];

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-neutral-200">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSrc}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={currentSrc}
            alt={`${title} — slide ${index + 1} of ${slides.length}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous image"
            className={`${overlayButtonClassName} left-4`}
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            Prev
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next image"
            className={`${overlayButtonClassName} right-4`}
          >
            Next
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </div>
  );
}
