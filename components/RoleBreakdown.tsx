"use client";

import { useState } from "react";
import {
  experienceRoles,
  type ExperienceRole,
  type RoleBadge,
} from "@/lib/experience";

const DEFAULT_OPEN_ID = experienceRoles[0].id;

function Badge({ type }: { type: RoleBadge }) {
  if (type === "current") {
    return (
      <span className="inline-flex shrink-0 items-center justify-center rounded-[4px] bg-badge-current px-3.5 font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-badge-current-ink">
        Current
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[4px] bg-taupe px-3.5 font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] text-cream-1">
      Contract
    </span>
  );
}

function ToggleIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M3 2H21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M5 6H19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3 22H21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M2 3H22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="7"
        y="3"
        width="10"
        height="6"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="5"
        y="15"
        width="14"
        height="6"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M2 21H22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RoleItem({
  role,
  open,
  onToggle,
}: {
  role: ExperienceRole;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `role-panel-${role.id}`;
  const buttonId = `role-trigger-${role.id}`;

  return (
    <article className="flex w-full flex-col">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex w-full flex-col text-left text-taupe transition-[gap] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-cream-1 ${
          open ? "gap-[30px]" : "gap-2.5"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold uppercase leading-6 tracking-[-0.01em]">
              {role.title}
            </h3>
            {role.badges.map((badge) => (
              <Badge key={badge} type={badge} />
            ))}
          </div>
          <p className="w-[72px] shrink-0 text-right font-sans text-base font-bold leading-6 tracking-[-0.01em]">
            {role.dates}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="font-sans text-base font-bold leading-6 tracking-[-0.01em]">
            {role.company}
          </p>
          <span className="flex w-[72px] shrink-0 justify-end">
            <ToggleIcon open={open} />
          </span>
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="w-full max-w-[580px] space-y-4 pt-[30px] font-sans text-base font-normal leading-6 tracking-[-0.01em] text-taupe">
            {role.bulletPoints.map((item) => (
              <li key={item} className="grid grid-cols-[1.25em_minmax(0,1fr)]">
                <span className="shrink-0" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="py-5">
        <div className="h-px w-full border-t border-dotted border-taupe" />
      </div>
    </article>
  );
}

export function RoleBreakdown() {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set([DEFAULT_OPEN_ID]),
  );

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex w-full max-w-[620px] flex-col">
      {experienceRoles.map((role) => (
        <RoleItem
          key={role.id}
          role={role}
          open={openIds.has(role.id)}
          onToggle={() => toggle(role.id)}
        />
      ))}
    </div>
  );
}
