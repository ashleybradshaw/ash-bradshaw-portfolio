"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Atom, Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: readonly NavLink[] = [
  { href: "/works", label: "Works" },
  { href: "/story", label: "Story" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/field-notes", label: "Field Notes" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" as const },
  },
};

const linkClassName =
  "font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-brand-blue focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const media = window.matchMedia("(min-width: 768px)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onViewportChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onViewportChange);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="relative z-50 w-full">
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-5 px-5 py-6 md:flex-wrap md:justify-center md:px-[50px] md:py-[50px]"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2 font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-brand-blue focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light"
          >
            <Atom size={24} strokeWidth={2} aria-hidden="true" />
            ashleybradshaw
          </Link>

          <span aria-hidden="true" className="hidden h-6 w-[99px] shrink-0 bg-brand-blue lg:block" />

          <div className="flex items-center gap-5">
            <ThemeToggle />

            <ul className="hidden items-center gap-5 md:flex">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <span aria-hidden="true" className="hidden h-6 w-[72px] shrink-0 bg-brand-blue lg:block" />

            <div className="hidden md:block">
              <Button href="/availability">Check Availability</Button>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center text-brand-blue focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light md:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? (
                <X size={24} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Menu size={24} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="mobile-navigation"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 flex flex-col bg-calm-light text-dark md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.ul
              className="flex h-full flex-col gap-6 px-5 pb-10 pt-28"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((item) => (
                <motion.li key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="font-display text-3xl font-bold uppercase tracking-[-0.02em] text-dark focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-calm-light"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li className="mt-auto" variants={itemVariants} onClick={closeMenu}>
                <Button href="/availability">Check Availability</Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
