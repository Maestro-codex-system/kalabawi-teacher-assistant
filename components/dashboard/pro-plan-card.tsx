import { ArrowRight, CalendarDays, FileText, Folder } from "lucide-react";
import { UsageRing } from "./usage-ring";

const quotas = [
  {
    value: 0,
    label: "Lesson Bundles",
    detail: "0 used · 30 remaining",
    icon: Folder,
  },
  {
    value: 99,
    label: "Individual Tools",
    detail: "79 used · 1 remaining",
    icon: FileText,
  },
];

export function ProPlanCard() {
  return (
    <section className="ds-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <div className="flex shrink-0 items-center gap-2.5">
          <h2 className="text-[19px] font-bold tracking-[-0.01em] text-ink">
            Pro Plan
          </h2>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#ecfdf5] px-2.5 py-1 text-[10.5px] font-semibold leading-none text-[#059669]">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Active
          </span>
        </div>

        <button
          type="button"
          className="app-link order-3 ml-auto shrink-0 text-[12.5px] sm:order-2"
        >
          Manage Subscription
          <ArrowRight size={14} strokeWidth={2} />
        </button>

        <p className="order-2 w-full text-[12.5px] text-muted sm:order-3">
          DepEd compliant teaching materials subscription
        </p>
      </div>

      <div className="mt-4 border-t border-line" />

      <div className="mt-4 rounded-[12px] border border-line bg-panel">
        <div className="grid grid-cols-2 gap-3 px-3 pb-6 pt-7 sm:px-7">
          {quotas.map((quota) => (
            <div key={quota.label} className="flex min-w-0 flex-col items-center text-center">
              <UsageRing value={quota.value} />
              <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ink">
                <quota.icon
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#64748b]"
                />
                <span className="truncate">{quota.label}</span>
              </div>
              <p className="mt-1 text-[11.5px] text-muted">{quota.detail}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-line px-4 py-3 text-[11.5px] text-muted">
          <CalendarDays size={14} strokeWidth={1.8} className="text-[#94a3b8]" />
          <span>Quotas reset on Nov 28, 2026</span>
        </div>
      </div>
    </section>
  );
}
