"use client";

import { useEffect, useRef } from "react";
import { CreditCard, Download, X } from "lucide-react";
import { invoices, paymentMethod } from "./subscription-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

type ManageSubscriptionDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function ManageSubscriptionDrawer({
  open,
  onClose,
}: ManageSubscriptionDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-[#0f172a]/25 backdrop-blur-[4px] transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-subscription-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[461px] flex-col bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 pb-5 pt-6">
          <div className="min-w-0">
            <h2
              id="manage-subscription-title"
              className="text-[14px] font-bold text-ink"
            >
              Manage Subscription
            </h2>
            <p className="mt-1 text-[11.5px] text-muted">
              Billing history, invoices, and payment method
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close manage subscription"
            className={`-mr-1.5 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-[7px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink ${focusRing}`}
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex items-center gap-2.5 border-b border-line px-6 py-4">
          <CreditCard
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            className="shrink-0 text-[#64748b]"
          />
          <p className="min-w-0 flex-1 truncate text-[12.5px] text-ink">
            <span className="text-muted">{paymentMethod.label}</span>{" "}
            <span className="font-semibold">{paymentMethod.value}</span>
          </p>
          <span className="shrink-0 text-[12px] font-medium text-[#059669]">
            {paymentMethod.status}
          </span>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {invoices.map((invoice) => (
            <li
              key={invoice.id}
              className="border-b border-line px-6 py-5"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="min-w-0 text-[13px] font-semibold leading-snug text-ink">
                  {invoice.title}
                </h3>
                <span className="shrink-0 text-[13px] font-bold text-ink">
                  {invoice.amount}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-muted">{invoice.date}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                <p className="flex items-center gap-1.5 text-[11.5px]">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-success"
                  />
                  <span className="font-medium text-[#059669]">Paid</span>
                  <span aria-hidden="true" className="text-[#cbd5e1]">
                    ·
                  </span>
                  <span className="text-muted">Ref: {invoice.reference}</span>
                </p>
                <button
                  type="button"
                  aria-label={`Download receipt for ${invoice.title}, ${invoice.date}`}
                  className={`inline-flex items-center gap-1 rounded-[4px] text-[11.5px] font-medium text-brand transition-colors hover:text-[#1d4ed8] ${focusRing}`}
                >
                  <Download size={13} strokeWidth={2} aria-hidden="true" />
                  Receipt
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-line px-6 py-6">
          <button
            type="button"
            className={`flex h-9 w-full items-center justify-center rounded-[8px] bg-[#eef3f9] text-[12.5px] font-semibold text-ink transition-colors hover:bg-[#e4ebf4] ${focusRing}`}
          >
            Update Payment Method
          </button>
          <p className="mt-3 text-center text-[11.5px] leading-relaxed text-muted">
            Need to pause or cancel? Contact{" "}
            <a
              href="mailto:help@kalabawi.ph"
              className="rounded-[3px] font-medium text-[#475569] underline-offset-2 transition-colors hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
            >
              help@kalabawi.ph
            </a>{" "}
            anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
