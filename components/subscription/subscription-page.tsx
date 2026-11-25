"use client";

import { useCallback, useState } from "react";
import { CalendarDays } from "lucide-react";
import { CreditTopUps } from "./credit-top-ups";
import { ManageSubscriptionDrawer } from "./manage-subscription-drawer";
import { PlanCard } from "./plan-card";
import { QuotaRing } from "./quota-ring";
import { plans, quotas } from "./subscription-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

export function SubscriptionPage() {
  const [manageOpen, setManageOpen] = useState(false);
  const closeManage = useCallback(() => setManageOpen(false), []);

  return (
    <main className="mx-auto w-full max-w-[896px] px-5 pb-16 pt-6 sm:px-6 lg:pt-7">
      <header className="border-b border-line pb-4">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]">
          Subscription &amp; Plan
        </h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          Review your monthly plan usage, top up credits, and manage billing
          settings.
        </p>
      </header>

      <section
        aria-labelledby="current-plan-heading"
        className="ds-card mt-12 p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2
                id="current-plan-heading"
                className="text-[20px] font-bold tracking-[-0.02em] text-ink"
              >
                Free Plan
              </h2>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#ecfdf5] px-2.5 py-1 text-[10.5px] font-semibold leading-none text-[#059669]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-success"
                />
                Active
              </span>
            </div>
            <p className="mt-1.5 text-[12.5px] text-muted">
              Free tier account · Cancel anytime on paid upgrades
            </p>
          </div>

          <button
            type="button"
            onClick={() => setManageOpen(true)}
            aria-haspopup="dialog"
            className={`inline-flex h-8 shrink-0 items-center justify-center rounded-[7px] border border-[#e2e8f0] bg-white px-3.5 text-[12.5px] font-semibold text-ink shadow-sm transition-colors hover:bg-canvas ${focusRing}`}
          >
            Manage Subscription
          </button>
        </div>

        <div className="mt-5 border-t border-line" />

        <div className="mt-7 rounded-[12px] border border-line bg-panel">
          <div className="mx-auto grid max-w-[370px] grid-cols-2 gap-4 pb-7 pt-6 sm:gap-6">
            {quotas.map((quota) => (
              <div
                key={quota.id}
                className="flex min-w-0 flex-col items-center text-center"
              >
                <QuotaRing value={quota.value} label={quota.label} />
                <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <quota.icon
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="shrink-0 text-[#64748b]"
                  />
                  <span className="truncate">{quota.label}</span>
                </div>
                <p className="mt-1 text-[11.5px] text-muted">{quota.detail}</p>
              </div>
            ))}
          </div>

          <div className="mx-5 flex items-center justify-center gap-2 border-t border-line py-3.5 text-[11.5px] text-muted sm:mx-8">
            <CalendarDays
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
              className="shrink-0 text-[#94a3b8]"
            />
            <span>Quotas reset on Nov 28, 2026</span>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-[15px] font-bold tracking-[-0.01em] text-ink">
          Available Plans
        </h2>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
          Choose a plan that fits your classroom prep schedule. Cancel anytime
          with 100% MATATAG compliance.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <CreditTopUps />

      <ManageSubscriptionDrawer open={manageOpen} onClose={closeManage} />
    </main>
  );
}
