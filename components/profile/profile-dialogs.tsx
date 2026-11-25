"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Check, X } from "lucide-react";
import { gradeLevelOptions, subjectOptions } from "./profile-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

const fieldBase =
  "h-[38px] w-full rounded-[8px] border border-[#e2e8f0] bg-white px-3 text-[13px] text-ink shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-colors placeholder:text-[#94a3b8] focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/15";

const scrollArea =
  "overflow-y-auto [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#cbd5e1]";

type ProfileDialogProps = {
  onClose: () => void;
  title: string;
  titleId: string;
  children: ReactNode;
  footer: ReactNode;
};

function ProfileDialog({
  onClose,
  title,
  titleId,
  children,
  footer,
}: ProfileDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
          aria-labelledby={titleId}
          className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-[446px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_32px_64px_-24px_rgba(15,23,42,0.45)]"
        >
          <div className="flex items-start justify-between gap-4 px-6 py-[22px]">
            <h2 id={titleId} className="text-[14px] font-bold text-ink">
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={`Close ${title}`}
              className={`-mr-1.5 -mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[7px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink ${focusRing}`}
            >
              <X size={17} strokeWidth={1.8} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden border-t border-line">
            {children}
          </div>

          {footer}
        </div>
      </div>
    </div>
  );
}

type EditProfileValues = {
  fullName: string;
  school: string;
  division: string;
};

type EditProfileDialogProps = {
  onClose: () => void;
  email: string;
  initialFullName: string;
  initialSchool: string;
  initialDivision: string;
  onSave: (values: EditProfileValues) => void;
};

type EditProfileErrors = { fullName?: string; school?: string };

export function EditProfileDialog({
  onClose,
  email,
  initialFullName,
  initialSchool,
  initialDivision,
  onSave,
}: EditProfileDialogProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [school, setSchool] = useState(initialSchool);
  const [division, setDivision] = useState(initialDivision);
  const [errors, setErrors] = useState<EditProfileErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: EditProfileErrors = {};
    if (!fullName.trim()) {
      nextErrors.fullName =
        "Add your full name so exported materials are credited.";
    }
    if (!school.trim()) {
      nextErrors.school = "Add your school name for the DepEd header.";
    }

    setErrors(nextErrors);
    if (nextErrors.fullName || nextErrors.school) return;

    onSave({
      fullName: fullName.trim(),
      school: school.trim(),
      division: division.trim(),
    });
  }

  return (
    <ProfileDialog
      onClose={onClose}
      title="Edit Profile"
      titleId="edit-profile-title"
      footer={
        <div className="flex items-center justify-end gap-2.5 border-t border-line bg-panel px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className={`inline-flex h-9 items-center justify-center rounded-[8px] border border-line bg-white px-4 text-[12.5px] font-semibold text-ink shadow-sm transition-colors hover:bg-canvas ${focusRing}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            className={`inline-flex h-9 items-center justify-center rounded-[8px] bg-brand px-4 text-[12.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8] ${focusRing}`}
          >
            Save Changes
          </button>
        </div>
      }
    >
      <div className={`max-h-[calc(100dvh-12rem)] px-6 py-6 ${scrollArea}`}>
        <p className="text-[12.5px] leading-[1.7] text-[#475569]">
          Update your identity and school affiliation for exported materials.
        </p>

        <form
          id="edit-profile-form"
          onSubmit={handleSubmit}
          noValidate
          className="mt-5 space-y-4"
        >
          <div>
            <label
              htmlFor="profile-full-name"
              className="mb-1.5 block text-[12.5px] font-semibold text-ink"
            >
              Full Name
            </label>
            <input
              id="profile-full-name"
              type="text"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                setErrors((current) => ({ ...current, fullName: undefined }));
              }}
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? "profile-full-name-error" : undefined
              }
              className={`${fieldBase} ${
                errors.fullName ? "border-danger" : ""
              }`}
            />
            {errors.fullName ? (
              <p
                id="profile-full-name-error"
                className="mt-1.5 text-[11.5px] leading-snug text-danger"
              >
                {errors.fullName}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="profile-school"
              className="mb-1.5 block text-[12.5px] font-semibold text-ink"
            >
              School Name
            </label>
            <input
              id="profile-school"
              type="text"
              value={school}
              onChange={(event) => {
                setSchool(event.target.value);
                setErrors((current) => ({ ...current, school: undefined }));
              }}
              autoComplete="organization"
              aria-invalid={Boolean(errors.school)}
              aria-describedby={
                errors.school ? "profile-school-error" : undefined
              }
              className={`${fieldBase} ${errors.school ? "border-danger" : ""}`}
            />
            {errors.school ? (
              <p
                id="profile-school-error"
                className="mt-1.5 text-[11.5px] leading-snug text-danger"
              >
                {errors.school}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="profile-division"
              className="mb-1.5 block text-[12.5px] font-semibold text-ink"
            >
              Division &amp; Region
            </label>
            <input
              id="profile-division"
              type="text"
              value={division}
              onChange={(event) => setDivision(event.target.value)}
              className={fieldBase}
            />
          </div>

          <p className="pt-1 text-[11.5px] leading-[1.7] text-muted">
            Your Google email address (
            <span className="font-medium text-[#475569]">{email}</span>) is
            managed by your account provider and cannot be changed here.
          </p>
        </form>
      </div>
    </ProfileDialog>
  );
}

type OptionPickerDialogProps = {
  onClose: () => void;
  mode: "grade" | "subject";
  value: string;
  onSelect: (value: string) => void;
};

const pickerCopy = {
  grade: {
    title: "Default Grade Level",
    titleId: "profile-grade-title",
    description: "Choose your primary teaching level.",
    options: gradeLevelOptions,
  },
  subject: {
    title: "Default Subject",
    titleId: "profile-subject-title",
    description: "Choose the primary subject you teach.",
    options: subjectOptions,
  },
} as const;

export function OptionPickerDialog({
  onClose,
  mode,
  value,
  onSelect,
}: OptionPickerDialogProps) {
  const copy = pickerCopy[mode];

  return (
    <ProfileDialog
      onClose={onClose}
      title={copy.title}
      titleId={copy.titleId}
      footer={
        <div className="flex items-center justify-end border-t border-line bg-panel px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className={`inline-flex h-9 items-center justify-center rounded-[8px] bg-[#eef3f9] px-4 text-[12.5px] font-semibold text-ink transition-colors hover:bg-[#e4ebf4] ${focusRing}`}
          >
            Close
          </button>
        </div>
      }
    >
      <div className="px-6 pb-5 pt-6">
        <p className="text-[12.5px] leading-[1.7] text-[#475569]">
          {copy.description}
        </p>

        <ul
          className={`mt-5 max-h-[min(292px,calc(100dvh-20rem))] space-y-[9px] pr-1 ${scrollArea}`}
        >
          {copy.options.map((option) => {
            const selected = option === value;
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => onSelect(option)}
                  aria-pressed={selected}
                  className={`flex h-[38px] w-full items-center justify-between gap-3 rounded-[7px] px-3 text-left text-[12.5px] transition-colors ${focusRing} ${
                    selected
                      ? "bg-[#eff6ff] font-semibold text-brand"
                      : "font-medium text-[#334155] hover:bg-canvas"
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {selected ? (
                    <Check
                      size={16}
                      strokeWidth={2.4}
                      aria-hidden="true"
                      className="shrink-0 text-brand"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </ProfileDialog>
  );
}
