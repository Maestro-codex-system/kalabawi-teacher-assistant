import { Icon, type IconName } from "./icons";
import { ProgressRing, SectionCard } from "./section";

const lineIcons: IconName[] = [
  "home",
  "file",
  "calendar",
  "settings",
  "search",
  "bell",
  "help",
  "logout",
];

const badges = [
  { label: "New", className: "bg-[#DBEAFE] text-brand" },
  { label: "Draft", className: "bg-[#EEF2F6] text-muted" },
  { label: "Published", className: "bg-[#D1FAE5] text-[#047857]" },
  { label: "Archived", className: "bg-[#EEF2F6] text-muted" },
];

type ToastTone = "success" | "error" | "warning" | "info" | "loading";

const toastToneStyles: Record<ToastTone, string> = {
  success: "bg-success",
  error: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  loading: "bg-brand",
};

const toasts: { tone: ToastTone; title: string; copy: string }[] = [
  {
    tone: "success",
    title: "Download Complete",
    copy: "Your file has been downloaded.",
  },
  {
    tone: "error",
    title: "Generation Failed",
    copy: "Please try again later.",
  },
  {
    tone: "warning",
    title: "Competency Mismatch",
    copy: "Please check the selected MELC.",
  },
  {
    tone: "info",
    title: "Auto-Fill Applied",
    copy: "Your inputs have been auto-filled.",
  },
  {
    tone: "loading",
    title: "Generating Lesson Plan...",
    copy: "This may take a few seconds.",
  },
];

function ToastGlyph({ tone }: { tone: ToastTone }) {
  if (tone === "success") {
    return <Icon name="check" size={13} strokeWidth={2.6} />;
  }
  if (tone === "error") {
    return <Icon name="close" size={12} strokeWidth={2.6} />;
  }
  if (tone === "loading") {
    return (
      <span
        className="block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white [animation-duration:1.4s]"
        aria-hidden="true"
      />
    );
  }
  return (
    <span className="font-serif text-[12px] font-bold leading-none">
      {tone === "warning" ? "!" : "i"}
    </span>
  );
}

export function IconographySection() {
  return (
    <SectionCard number={5} title="Iconography" className="lg:min-h-[168px]">
      <div className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-4">
        <div className="flex flex-1 items-center justify-between gap-2 text-[#3F4B5A]">
          {lineIcons.map((name) => (
            <Icon key={name} name={name} size={23} strokeWidth={1.6} />
          ))}
        </div>
        <span className="hidden h-9 w-px bg-line sm:block" />
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-success text-white shadow-sm">
            <Icon name="check" size={17} strokeWidth={2.6} />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-warning text-white shadow-sm">
            <span className="font-serif text-[17px] font-bold leading-none">!</span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-danger text-white shadow-sm">
            <Icon name="close" size={16} strokeWidth={2.6} />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-info text-white shadow-sm">
            <span className="font-serif text-[16px] font-bold leading-none">i</span>
          </span>
        </div>
      </div>
    </SectionCard>
  );
}

export function ButtonsSection() {
  return (
    <SectionCard number={6} title="Buttons & Badges" className="lg:min-h-[168px]">
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          className="h-10 rounded-[10px] bg-brand px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
        >
          Primary Button
        </button>
        <button
          type="button"
          className="h-10 rounded-[10px] border border-brand bg-white px-5 text-[12.5px] font-semibold text-navy transition-colors hover:bg-brand-soft/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
        >
          Secondary Button
        </button>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`inline-flex h-7 items-center rounded-[7px] px-3 text-[11px] font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}

export function ToastsSection() {
  return (
    <SectionCard number={7} title="Toast Notifications" className="lg:min-h-[364px]">
      <ul className="flex flex-1 flex-col justify-between gap-2.5">
        {toasts.map((toast) => (
          <li
            key={toast.title}
            className="flex items-center gap-3 rounded-[10px] border border-line bg-white px-3 py-2.5 shadow-[0_2px_8px_-4px_rgba(15,23,42,0.18)]"
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-white ${toastToneStyles[toast.tone]}`}
            >
              <ToastGlyph tone={toast.tone} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-ink">
                {toast.title}
              </p>
              <p className="truncate text-[10.5px] text-muted">{toast.copy}</p>
            </div>
            <button
              type="button"
              aria-label={`Dismiss ${toast.title}`}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <Icon name="close" size={11} strokeWidth={2} />
            </button>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export function ComponentsSection() {
  return (
    <SectionCard
      number={8}
      title="UI Components (Cards & Inputs)"
      className="lg:min-h-[364px]"
    >
      <div className="grid flex-1 grid-cols-1 items-stretch gap-3 min-[420px]:grid-cols-2">
        <div className="relative flex min-w-0 flex-col rounded-[12px] border border-line bg-white p-3.5">
          <span className="absolute -top-2.5 right-3 rounded-[6px] bg-brand px-2 py-0.5 text-[9.5px] font-semibold text-white">
            Most Popular
          </span>
          <h3 className="text-[14px] font-bold text-ink">Pro Plan</h3>
          <p className="mt-0.5 text-[10.5px] text-muted">For dedicated teachers</p>
          <p className="mt-2 text-[19px] font-extrabold tracking-[-0.02em] text-ink">
            ₱299{" "}
            <span className="text-[10.5px] font-medium text-muted">/ month</span>
          </p>

          <div className="mt-3 flex items-center gap-2">
            <ProgressRing value={87} size={50} />
            <ul className="min-w-0 space-y-1 text-[9px] text-ink">
              {["Unlimited Lesson Plans", "Premium Templates", "Priority Support"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-1 leading-snug">
                    <span className="mt-[2px] grid h-[10px] w-[10px] shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Icon name="check" size={6} strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <button
            type="button"
            className="mt-auto h-9 w-full rounded-[8px] bg-brand text-[11.5px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Upgrade to Pro
          </button>
        </div>

        <div className="flex h-full min-w-0 flex-col gap-2.5">
          <label className="flex h-11 items-center gap-2 rounded-[10px] border border-line bg-white px-3 text-muted focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <span className="sr-only">Search resources</span>
            <input
              type="search"
              placeholder="Search resources..."
              className="h-full min-w-0 flex-1 bg-transparent text-[11.5px] text-ink outline-none placeholder:text-muted"
            />
            <Icon name="search" size={15} className="shrink-0 text-brand" />
          </label>
          <label className="flex flex-1 flex-col rounded-[10px] border border-line bg-white px-3 py-2.5 text-muted focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <span className="sr-only">Notes</span>
            <textarea
              placeholder="Add your notes here..."
              className="min-h-[104px] w-full flex-1 resize-none bg-transparent text-[11.5px] text-ink outline-none placeholder:text-muted"
            />
          </label>
        </div>
      </div>
    </SectionCard>
  );
}
