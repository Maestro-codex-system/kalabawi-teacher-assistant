import { Check, ShieldCheck } from "lucide-react";
import type { PlanCtaVariant, SubscriptionPlan } from "./subscription-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

const ctaStyles: Record<PlanCtaVariant, string> = {
  current: "cursor-default border border-[#eef2f6] bg-[#f8fafc] text-[#9aa8bb]",
  outline: "border border-[#e2e8f0] bg-white text-ink shadow-sm hover:bg-canvas",
  primary: "bg-brand text-white shadow-sm hover:bg-[#1d4ed8]",
};

const badgeStyles = {
  popular: "bg-[#eef5ff] text-brand",
  neutral: "bg-[#f1f5f9] text-[#475569]",
} as const;

export function PlanCard({ plan }: { plan: SubscriptionPlan }) {
  return (
    <article
      className={`flex h-full flex-col rounded-[16px] border bg-white p-6 shadow-soft ${
        plan.highlighted ? "border-brand" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink">
          {plan.name}
        </h3>
        {plan.badge ? (
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10.5px] font-semibold leading-none ${
              badgeStyles[plan.badgeTone ?? "neutral"]
            }`}
          >
            {plan.badge}
          </span>
        ) : null}
      </div>

      <p className="mt-5 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        <span className="text-[32px] font-bold leading-none tracking-[-0.03em] text-ink">
          {plan.price}
        </span>
        <span className="text-[12.5px] font-medium text-muted">
          {plan.period}
        </span>
      </p>

      <p className="mt-2 text-[12.5px] text-muted">{plan.description}</p>

      <div className="mt-5 border-t border-line pt-5">
        <ul className="space-y-[11px]">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-[#334155]"
            >
              <Check
                size={14}
                strokeWidth={2.4}
                aria-hidden="true"
                className={`mt-0.5 shrink-0 ${
                  plan.accentChecks ? "text-brand" : "text-[#94a3b8]"
                }`}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-7">
        <button
          type="button"
          disabled={plan.ctaVariant === "current"}
          className={`inline-flex h-9 w-full items-center justify-center rounded-[7px] text-[12.5px] font-semibold transition-colors ${focusRing} ${ctaStyles[plan.ctaVariant]}`}
        >
          {plan.cta}
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11.5px] text-[#94a3b8]">
          <ShieldCheck
            size={13}
            strokeWidth={1.8}
            aria-hidden="true"
            className="shrink-0"
          />
          <span>{plan.note}</span>
        </p>
      </div>
    </article>
  );
}
