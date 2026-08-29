"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const MARK = "ASHLEYBRADSHAW";

type BrandMarkProps = {
  className: string;
  onClick?: () => void;
};

export function BrandMark({ className, onClick }: BrandMarkProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const letters = MARK.split("");

  return (
    <Link
      href="/#top"
      onClick={(event) => {
        onClick?.();
        if (pathname === "/") {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      aria-label="Ashley Bradshaw home"
      className={`${className} group`}
    >
      <span aria-hidden="true" className="inline-flex">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block will-change-transform"
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -1.5, 0], opacity: [1, 0.72, 1] }
            }
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -3, transition: { duration: 0.18 } }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </Link>
  );
}
