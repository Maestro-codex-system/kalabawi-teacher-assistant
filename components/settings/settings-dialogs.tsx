"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Trash, X } from "lucide-react";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

type DeleteAccountDialogProps = {
  email: string;
  onClose: () => void;
};

export function DeleteAccountDialog({
  email,
  onClose,
}: DeleteAccountDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (requested) closeButtonRef.current?.focus();
  }, [requested]);

  useEffect(() => {
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
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#0f172a]/25 backdrop-blur-[3px]"
      />

      <div className="absolute inset-0 grid place-items-center overflow-y-auto p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
          className="relative w-full max-w-[446px] overflow-hidden rounded-[16px] bg-white shadow-[0_32px_64px_-24px_rgba(15,23,42,0.45)]"
        >
          <div className="flex items-start justify-between gap-4 px-6 py-[22px]">
            <h2
              id="delete-account-title"
              className="text-[14px] font-bold text-ink"
            >
              Delete Account
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close delete account"
              className={`-mr-1.5 -mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[7px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink ${focusRing}`}
            >
              <X size={17} strokeWidth={1.8} />
            </button>
          </div>

          <div className="border-t border-line px-6 py-6">
            {requested ? (
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ecfdf5] text-success"
                >
                  <Check size={17} strokeWidth={2.4} />
                </span>
                <div className="min-w-0">
                  <p
                    role="status"
                    className="text-[13px] font-semibold text-ink"
                  >
                    Deletion request received
                  </p>
                  <p className="mt-1.5 text-[12px] leading-[1.7] text-[#475569]">
                    We sent a secure confirmation link to{" "}
                    <span className="font-medium text-ink">{email}</span>. Your
                    account stays active until you confirm from that email.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fef2f2] text-danger"
                  >
                    <Trash size={16} strokeWidth={1.9} />
                  </span>
                  <p className="text-[12.5px] leading-[1.7] text-[#475569]">
                    This permanently deletes your Kalabawi account,
                    subscriptions, and generated lesson assets. This action
                    cannot be undone.
                  </p>
                </div>

                <div className="mt-5 rounded-[10px] border border-line bg-panel px-3.5 py-3 text-[11.5px] leading-[1.7] text-muted">
                  Signed in as{" "}
                  <span className="font-medium text-[#475569]">{email}</span>.
                  Download your lesson files before deleting your account.
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-line bg-panel px-6 py-3.5">
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex h-9 items-center justify-center rounded-[8px] border border-line bg-white px-4 text-[12.5px] font-semibold text-ink shadow-sm transition-colors hover:bg-canvas ${focusRing}`}
            >
              {requested ? "Close" : "Cancel"}
            </button>
            {requested ? null : (
              <button
                type="button"
                onClick={() => setRequested(true)}
                className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-[8px] bg-[#dc2626] px-4 text-[12.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#b91c1c] ${focusRing}`}
              >
                <Trash size={14} strokeWidth={2} aria-hidden="true" />
                Delete Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
