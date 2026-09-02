"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Modal } from "@/components/Modal";
import {
  AVAILABILITY_HASH,
  CAL_BOOKING_URL,
  isAvailabilityHref,
} from "@/lib/site";

const TITLE_ID = "availability-modal-title";
const DESC_ID = "availability-modal-desc";

function AvailabilityEmbedFallback() {
  return (
    <div className="flex min-h-[640px] w-full flex-1 items-center justify-center bg-[#0A0127]">
      <p className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-cream-1/70">
        Loading calendar
      </p>
    </div>
  );
}

const AvailabilityEmbed = dynamic(
  () =>
    import("@/components/AvailabilityEmbed").then(
      (mod) => mod.AvailabilityEmbed,
    ),
  { ssr: false, loading: () => <AvailabilityEmbedFallback /> },
);

function isAvailabilityAnchor(
  node: EventTarget | null,
): HTMLAnchorElement | null {
  if (!(node instanceof Element)) {
    return null;
  }

  const anchor = node.closest("a");
  if (!anchor) {
    return null;
  }

  if (anchor.hasAttribute("data-availability-modal")) {
    return anchor;
  }

  const href = anchor.getAttribute("href");
  if (href && isAvailabilityHref(href)) {
    return anchor;
  }

  try {
    if (new URL(anchor.href).hash === `#${AVAILABILITY_HASH}`) {
      return anchor;
    }
  } catch {
    return null;
  }

  return null;
}

function clearAvailabilityHash() {
  if (window.location.hash !== `#${AVAILABILITY_HASH}`) {
    return;
  }

  const nextUrl = `${window.location.pathname}${window.location.search}` || "/";
  window.history.replaceState(null, "", nextUrl);
}

export function AvailabilityProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openAvailability = useCallback(() => setOpen(true), []);
  const closeAvailability = useCallback(() => {
    setOpen(false);
    clearAvailabilityHash();
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === `#${AVAILABILITY_HASH}`) {
        setOpen(true);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = isAvailabilityAnchor(event.target);
      if (!anchor) {
        return;
      }

      event.preventDefault();
      openAvailability();
    };

    const preload = (event: Event) => {
      if (!isAvailabilityAnchor(event.target)) {
        return;
      }

      void import("@/components/AvailabilityEmbed");
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", preload, true);
    document.addEventListener("focusin", preload, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", preload, true);
      document.removeEventListener("focusin", preload, true);
    };
  }, [openAvailability]);

  return (
    <>
      {children}
      <Modal
        open={open}
        onClose={closeAvailability}
        title="Book a Discovery Chat"
        titleId={TITLE_ID}
        describedBy={DESC_ID}
        size="wide"
      >
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <header className="flex max-w-[40rem] flex-col gap-3 pr-12">
            <p className="font-sans text-xs font-bold uppercase leading-4 tracking-[0.16em] text-cream-1/70">
              Let&apos;s talk product
            </p>
            <h2
              id={TITLE_ID}
              className="font-display text-[28px] font-bold leading-9 tracking-[-0.02em] text-cream-1 md:text-[32px]"
            >
              Book a Discovery Chat
            </h2>
            <p
              id={DESC_ID}
              className="font-sans text-base font-normal leading-6 tracking-[-0.01em] text-cream-1/85"
            >
              Grab 30 minutes to discuss your roadmap, bottlenecks, or how
              bridging design to production code can accelerate your solution.
            </p>
          </header>

          <div className="relative min-h-[640px] min-w-0 flex-1 overflow-hidden rounded-[4px] border border-cream-1/35 bg-[#0A0127]">
            {open ? <AvailabilityEmbed /> : <AvailabilityEmbedFallback />}
          </div>

          <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-cream-1/45">
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream-1/30 underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cream-1 focus-visible:ring-offset-2 focus-visible:ring-offset-[#13014C]"
            >
              Open in a new tab
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
}
