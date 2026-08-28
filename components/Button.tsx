import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightFromLine } from "lucide-react";

const buttonBaseClassName =
  "inline-flex items-center justify-center gap-2 px-3.5 py-2 font-display text-[13px] font-bold uppercase leading-4 tracking-[-0.01em] transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-red focus-visible:ring-offset-2";

const buttonVariants = {
  primary:
    "bg-brand-blue text-white focus-visible:ring-offset-calm-light",
  accent:
    "bg-brand-red text-white hover:bg-calm-light hover:text-brand-blue focus-visible:ring-offset-brand-blue",
} as const;

type ButtonProps = {
  href: string;
  children: ReactNode;
  showIcon?: boolean;
  variant?: keyof typeof buttonVariants;
};

export function Button({
  href,
  children,
  showIcon = true,
  variant = "primary",
}: ButtonProps) {
  return (
    <Link href={href} className={`${buttonBaseClassName} ${buttonVariants[variant]}`}>
      {children}
      {showIcon ? (
        <ArrowRightFromLine size={16} strokeWidth={2} aria-hidden="true" />
      ) : null}
    </Link>
  );
}
