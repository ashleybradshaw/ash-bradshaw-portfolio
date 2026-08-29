"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { HeroColorControls } from "@/components/HeroColorControls";

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const primaryLinks: readonly NavItem[] = [
  { href: "#works", label: "Works" },
  { href: "#story", label: "Story" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "/field-notes", label: "Field Notes" },
];

const secondaryLinks: readonly NavItem[] = [
  {
    href: "https://www.linkedin.com/in/ashleyjohnbradshaw/",
    label: "Linkedin",
    external: true,
  },
  {
    href: "https://github.com/ashleybradshaw",
    label: "Github",
    external: true,
  },
  {
    href: "https://x.com/ashjonbradshaw",
    label: "X",
    external: true,
  },
  { href: "#availability", label: "Availability" },
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

const pillSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.45,
};

function resolveHref(item: NavItem) {
  return item.href.startsWith("#") ? `/${item.href}` : item.href;
}

function NavAnchor({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  const href = resolveHref(item);

  if (item.external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }

  if (!href.includes("#")) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

function NavCluster({
  items,
  hovered,
  onHover,
  pillClassName,
  linkClassName,
}: {
  items: readonly NavItem[];
  hovered: string | null;
  onHover: (href: string | null) => void;
  pillClassName: string;
  linkClassName: string;
}) {
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => (
        <li
          key={item.href}
          className="relative"
          onMouseEnter={() => onHover(item.href)}
          onFocusCapture={() => onHover(item.href)}
        >
          {hovered === item.href ? (
            <motion.span
              layoutId="nav-hover-pill"
              className={`${pillClassName} pointer-events-none`}
              transition={pillSpring}
            />
          ) : null}
          <NavAnchor item={item} className={linkClassName} />
        </li>
      ))}
    </ul>
  );
}

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClassName = [
    "fixed top-0 left-0 z-50 w-full transition-[background-color,color,backdrop-filter,border-color,box-shadow] duration-[400ms] ease-in-out",
    isHome
      ? "text-[var(--hero-text)]"
      : "text-text-dark",
    !isHome
      ? "border-b border-brand-blue/10 bg-cream-1/75 shadow-[0_8px_30px_rgb(10_1_39/0.06)] backdrop-blur-xl"
      : scrolled
        ? "border-b border-[color-mix(in_srgb,var(--hero-accent)_22%,transparent)] bg-[color-mix(in_srgb,var(--hero-bg)_82%,transparent)] shadow-[0_8px_30px_rgb(10_1_39/0.12)] backdrop-blur-xl"
        : "border-b border-transparent bg-transparent",
  ].join(" ");

  const logoClassName = isHome
    ? "flex shrink-0 items-center font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] text-[var(--hero-text)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hero-bg)]"
    : "flex shrink-0 items-center font-display text-base font-bold uppercase leading-6 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-cream-1";

  const linkClassName = isHome
    ? "relative z-10 inline-flex px-3 py-1.5 font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] text-[var(--hero-text)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2"
    : "relative z-10 inline-flex px-3 py-1.5 font-sans text-base font-bold uppercase leading-6 tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2";

  const pillClassName = isHome
    ? "absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--hero-text)_18%,transparent)]"
    : scrolled
      ? "absolute inset-0 rounded-full bg-brand-blue/10"
      : "absolute inset-0 rounded-full bg-cream-1/60";

  const menuButtonClassName = isHome
    ? "inline-flex items-center justify-center text-[var(--hero-text)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 lg:hidden"
    : "inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 lg:hidden";

  const overlayClassName = isHome
    ? "fixed inset-0 z-40 flex flex-col bg-[var(--hero-bg)] text-[var(--hero-text)] transition-[background-color,color] duration-[400ms] ease-in-out lg:hidden"
    : "fixed inset-0 z-40 flex flex-col bg-cream-1 text-text-dark lg:hidden";

  const mobileLinkClassName = isHome
    ? "font-display text-3xl font-bold uppercase tracking-[-0.02em] text-[var(--hero-text)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hero-bg)]"
    : "font-display text-3xl font-bold uppercase tracking-[-0.02em] text-text-dark focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-cream-1";

  const spacerClassName = isHome
    ? "hidden h-6 shrink-0 bg-[var(--hero-accent)] transition-colors duration-[400ms] ease-in-out xl:block"
    : "hidden h-6 shrink-0 bg-brand-blue xl:block";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const media = window.matchMedia("(min-width: 1024px)");
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
  const allLinks = [...primaryLinks, ...secondaryLinks];

  return (
    <>
      <header className={headerClassName}>
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[1440px] items-center gap-5 px-5 py-4 md:px-[50px] md:py-5"
          onMouseLeave={() => setHovered(null)}
        >
          <BrandMark className={logoClassName} onClick={closeMenu} />

          <div
            aria-hidden="true"
            className={`${spacerClassName} min-w-8 flex-1`}
          />

          <LayoutGroup>
            <div className="ml-auto hidden items-center gap-5 lg:flex xl:ml-0">
              <NavCluster
                items={primaryLinks}
                hovered={hovered}
                onHover={setHovered}
                pillClassName={pillClassName}
                linkClassName={linkClassName}
              />

              <div
                aria-hidden="true"
                className={`${spacerClassName} w-[72px]`}
              />

              <NavCluster
                items={secondaryLinks}
                hovered={hovered}
                onHover={setHovered}
                pillClassName={pillClassName}
                linkClassName={linkClassName}
              />

              {isHome ? <HeroColorControls /> : null}
            </div>
          </LayoutGroup>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            {isHome ? <HeroColorControls compact /> : null}
            <button
              type="button"
              className={menuButtonClassName}
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
            className={overlayClassName}
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
              {allLinks.map((item) => (
                <motion.li key={item.href} variants={itemVariants}>
                  <NavAnchor
                    item={item}
                    onClick={closeMenu}
                    className={mobileLinkClassName}
                  />
                </motion.li>
              ))}
              {isHome ? (
                <motion.li variants={itemVariants} className="pt-4">
                  <HeroColorControls />
                </motion.li>
              ) : null}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
