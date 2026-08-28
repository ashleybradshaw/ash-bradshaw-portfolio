"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StaggeredItemProps = {
  index: number;
  children: ReactNode;
  className?: string;
};

export function StaggeredItem({ index, children, className }: StaggeredItemProps) {
  return (
    <motion.article
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.07, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  );
}
