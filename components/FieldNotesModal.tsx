"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Modal } from "@/components/Modal";

const FIELD_NOTES_HREF = "/field-notes";

function isFieldNotesAnchor(node: EventTarget | null): HTMLAnchorElement | null {
  if (!(node instanceof Element)) {
    return null;
  }

  const anchor = node.closest("a");
  if (!anchor) {
    return null;
  }

  const href = anchor.getAttribute("href");
  if (href === FIELD_NOTES_HREF || href === `${FIELD_NOTES_HREF}/`) {
    return anchor;
  }

  try {
    const url = new URL(anchor.href, window.location.origin);
    if (
      url.origin === window.location.origin &&
      url.pathname.replace(/\/$/, "") === FIELD_NOTES_HREF
    ) {
      return anchor;
    }
  } catch {
    return null;
  }

  return null;
}

export function FieldNotesProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openFieldNotes = useCallback(() => setOpen(true), []);
  const closeFieldNotes = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = isFieldNotesAnchor(event.target);
      if (!anchor) {
        return;
      }

      event.preventDefault();
      openFieldNotes();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [openFieldNotes]);

  return (
    <>
      {children}
      <Modal
        open={open}
        onClose={closeFieldNotes}
        title="FIELD NOTES"
        titleId="field-notes-modal-title"
      >
        <p className="max-w-[28rem] font-sans text-base font-normal leading-6 tracking-[-0.01em] text-cream-1">
          Extended case studies, system architecture breakdowns, and personal
          project journeys will be here soon.
        </p>
        <button
          type="button"
          className="inline-flex w-fit cursor-pointer items-center justify-center rounded-[4px] bg-cream-1 px-5 py-2 font-sans text-sm font-bold leading-5 tracking-[-0.01em] text-[#0A0127] transition-[transform,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cream-1 focus-visible:ring-offset-2 focus-visible:ring-offset-[#13014C]"
          onClick={closeFieldNotes}
        >
          Got it, I’ll check back
        </button>
      </Modal>
    </>
  );
}
