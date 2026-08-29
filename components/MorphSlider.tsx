"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type MorphSliderProps = {
  images: string[];
  title: string;
};

const pairVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
  }),
};

function useGalleryPerPage(): 1 | 2 {
  const [perPage, setPerPage] = useState<1 | 2>(1);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      setPerPage(media.matches ? 2 : 1);
    };

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return perPage;
}

export function MorphSlider({ images, title }: MorphSliderProps) {
  const slides = images.filter((src) => src.length > 0);
  const perPage = useGalleryPerPage();
  const pageCount = Math.max(1, Math.ceil(slides.length / perPage));
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const currentPage = ((page % pageCount) + pageCount) % pageCount;
  const visibleSlides = slides.slice(
    currentPage * perPage,
    currentPage * perPage + perPage,
  );

  const paginate = (delta: number) => {
    setPage([currentPage + delta, delta]);
  };

  const goToPage = (nextPage: number) => {
    if (nextPage === currentPage) {
      return;
    }

    setPage([nextPage, nextPage > currentPage ? 1 : -1]);
  };

  if (slides.length === 0) {
    return (
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
      >
        <div className="aspect-square rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]" />
        <div className="hidden aspect-square rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:block" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`${currentPage}-${perPage}`}
            custom={direction}
            variants={pairVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.7 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          >
            {visibleSlides.map((src, offset) => {
              const slideNumber = currentPage * perPage + offset + 1;

              return (
                <article
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <Image
                    src={src}
                    alt={`${title} — slide ${slideNumber} of ${slides.length}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {pageCount > 1 ? (
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full bg-[#F7F6F9] px-6 py-3 shadow-sm">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous images"
              className="text-[#0A0127] transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FF0E00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F9]"
            >
              <ArrowLeft size={24} strokeWidth={2} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2.5" aria-label="Gallery pages">
              {Array.from({ length: pageCount }, (_, index) => {
                const isActive = index === currentPage;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Go to gallery page ${index + 1}`}
                    onClick={() => goToPage(index)}
                    className="flex items-center justify-center focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FF0E00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F9]"
                  >
                    <span
                      className={
                        isActive
                          ? "h-2 w-6 rounded-full bg-[#0A0127] transition-all"
                          : "h-2 w-2 rounded-full bg-[#0A0127]/20 transition-all"
                      }
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next images"
              className="text-[#0A0127] transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FF0E00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F9]"
            >
              <ArrowRight size={24} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
