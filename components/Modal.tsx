"use client";

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useHeroTokens } from "@/components/HeroTokensProvider";

type ModalSize = "compact" | "wide";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId?: string;
  describedBy?: string;
  size?: ModalSize;
  children: ReactNode;
};

const compactPanelClassName =
  "relative flex h-dvh w-full flex-col overflow-hidden bg-[linear-gradient(165deg,#13014C_0%,#0A0127_100%)] text-cream-1 md:h-auto md:max-h-[min(640px,calc(100dvh-3rem))] md:w-full md:max-w-[540px] md:rounded-[4px] md:shadow-[0_24px_80px_rgb(10_1_39/0.55)]";

const widePanelClassName =
  "relative flex h-dvh w-full flex-col overflow-hidden border-t border-cream-1/40 bg-[linear-gradient(165deg,#13014C_0%,#0A0127_100%)] text-cream-1 shadow-[0_24px_80px_rgb(10_1_39/0.55)] md:h-[min(920px,calc(100dvh-3rem))] md:max-h-[calc(100dvh-3rem)] md:w-full md:max-w-[min(1080px,calc(100vw-3rem))] md:rounded-[4px] md:border";

const compactBodyClassName =
  "relative z-[1] flex flex-1 flex-col justify-center px-8 py-24 md:px-10 md:py-14";

const wideBodyClassName =
  "relative z-[1] flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-8 pt-20 md:px-8 md:pt-16 md:pb-8";

const subscribeNever = () => () => {};

function useIsClient() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

function CloseGlyph() {
  return (
    <span className="relative block size-6" aria-hidden="true">
      <span className="absolute top-1/2 left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
      <span className="absolute top-1/2 left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  titleId,
  describedBy,
  size = "compact",
  children,
}: ModalProps) {
  const generatedId = useId();
  const headingId = titleId ?? generatedId;
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const mounted = useIsClient();
  const { tokens } = useHeroTokens();

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const { body } = document;
    const scrollbarGap = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-[80] flex items-stretch justify-center md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <button
            type="button"
            aria-label="Dismiss overlay"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={describedBy}
            className={size === "wide" ? widePanelClassName : compactPanelClassName}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 size-[336px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 transition-[background] duration-[400ms] ease-in-out"
              style={{
                background: `radial-gradient(circle, ${tokens.bg} 0%, transparent 70%)`,
              }}
            />

            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              className="absolute top-5 right-5 z-10 inline-flex size-11 items-center justify-center rounded-[4px] text-cream-1 transition-opacity duration-300 ease-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cream-1 focus-visible:ring-offset-2 focus-visible:ring-offset-[#13014C]"
              onClick={onClose}
            >
              <CloseGlyph />
            </button>

            {size === "wide" ? (
              <div
                aria-hidden="true"
                className="absolute top-3 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-cream-1/35 md:hidden"
              />
            ) : null}

            <div
              className={
                size === "wide" ? wideBodyClassName : compactBodyClassName
              }
            >
              {size === "wide" ? (
                children
              ) : (
                <>
                  <h2
                    id={headingId}
                    className="font-display text-base font-bold uppercase leading-6 tracking-[-0.01em]"
                  >
                    {title}
                  </h2>
                  <div className="mt-2 flex flex-col gap-8">{children}</div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
