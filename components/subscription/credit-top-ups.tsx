import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { topUps } from "./subscription-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

const buyButton =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-[7px] px-4 text-[12.5px] font-semibold transition-colors";

export function CreditTopUps() {
  return (
    <section className="mt-12">
      <h2 className="text-[15px] font-bold tracking-[-0.01em] text-ink">
        Credit Top-Ups
      </h2>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
        In-App Purchases for extra generation quota. Top-up credits never
        expire.
      </p>

      <div className="ds-card mt-6 p-4 sm:p-6">
        <ul className="space-y-2.5">
          {topUps.map((topUp) => (
            <li
              key={topUp.id}
              className={`flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[12px] border bg-white p-4 ${
                topUp.highlighted ? "border-brand" : "border-line"
              }`}
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-wash text-brand"
              >
                <topUp.icon size={20} strokeWidth={1.7} />
              </span>

              <div className="min-w-[170px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[14px] font-semibold text-ink">
                    {topUp.title}
                  </h3>
                  {topUp.badge ? (
                    <span className="inline-flex items-center rounded-full bg-[#eef5ff] px-2 py-1 text-[9.5px] font-semibold leading-none text-brand">
                      {topUp.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
                  {topUp.detail}
                </p>
              </div>

              <div className="ml-auto flex shrink-0 items-center gap-4">
                <p className="text-[13.5px] font-bold text-ink">
                  {topUp.price}
                </p>
                <button
                  type="button"
                  className={`${buyButton} ${focusRing} ${
                    topUp.highlighted
                      ? "bg-brand text-white shadow-sm hover:bg-[#1d4ed8]"
                      : "border border-[#e2e8f0] bg-white text-ink shadow-sm hover:bg-canvas"
                  }`}
                >
                  Buy Credits
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[12.5px] leading-relaxed text-muted">
          Start free, upgrade anytime. No lock-in contracts.{" "}
          <Link
            href="/dashboard"
            className={`inline-flex items-center gap-0.5 rounded-[4px] font-semibold text-brand transition-colors hover:text-[#1d4ed8] ${focusRing}`}
          >
            Explore free features
            <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </p>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11.5px] text-[#94a3b8]">
          <ShieldCheck
            size={13}
            strokeWidth={1.8}
            aria-hidden="true"
            className="shrink-0"
          />
          Philippine payments accepted via GCash, Maya, and major debit cards
        </p>
      </div>
    </section>
  );
}
