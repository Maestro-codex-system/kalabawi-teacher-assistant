import { ArrowRight, Clock } from "lucide-react";

export function DraftCard() {
  return (
    <section className="ds-card flex flex-wrap items-center gap-x-3.5 gap-y-3 px-5 py-4">
      <Clock size={19} strokeWidth={1.7} className="shrink-0 text-[#64748b]" />

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-[13px] font-semibold text-ink">
          Unsaved Lesson Bundle Draft
        </h2>
        <p className="mt-0.5 truncate text-[11.5px] text-muted">
          English Grade 5 · Quarter 2 Week 3
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="h-9 rounded-[9px] px-2.5 text-[12px] font-medium text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          Discard
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-[#e2e8f0] bg-white px-4 text-[12.5px] font-semibold text-ink shadow-sm transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        >
          Resume draft
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
