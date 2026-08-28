"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
    y: 10,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const,
    },
  },
};

type HeadingTag = "h1" | "h2" | "h3" | "p" | "span";

type PixelRevealProps = {
  text: string;
  className?: string;
  id?: string;
  as?: HeadingTag;
};

export function PixelReveal({
  text,
  className,
  id,
  as = "span",
}: PixelRevealProps) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.trim().split(/\s+/);

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="mr-[0.28em] last:mr-0"
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
