import { Plus } from "lucide-react";

export function CrosshairRail({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-11 items-center justify-center gap-[11px] ${className}`}
    >
      <Plus size={24} strokeWidth={1} className="shrink-0 text-cream-3" />
      <span className="h-px min-w-0 flex-1 border-t border-dotted border-cream-3" />
      <Plus size={24} strokeWidth={1} className="shrink-0 text-cream-3" />
      <span className="h-px w-[min(100%,322px)] max-w-[322px] border-t border-dotted border-cream-3" />
      <Plus size={24} strokeWidth={1} className="shrink-0 text-cream-3" />
      <span className="h-px min-w-0 flex-1 border-t border-dotted border-cream-3" />
      <Plus size={24} strokeWidth={1} className="shrink-0 text-cream-3" />
    </div>
  );
}
