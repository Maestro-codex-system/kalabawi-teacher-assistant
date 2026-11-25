"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useRef } from "react";
import { Check, ChevronRight, type LucideIcon } from "lucide-react";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: string;
}) {
  return (
    <h2
      id={id}
      className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]"
    >
      {children}
    </h2>
  );
}

export function SettingsCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ds-card mt-3.5 overflow-hidden py-5 ${className}`}>
      {children}
    </div>
  );
}

export function GroupBand({ children }: { children: string }) {
  return (
    <div className="mx-4 rounded-[6px] bg-panel px-4 py-[15px] sm:mx-6 sm:px-5">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#94a3b8]">
        {children}
      </h3>
    </div>
  );
}

type SettingRowProps = {
  title: string;
  description: string;
  trailing?: ReactNode;
  mobileValue?: string;
  leadingIcon?: LucideIcon;
  onClick?: () => void;
  stacked?: boolean;
  titleClassName?: string;
  ariaPressed?: boolean;
};

export function SettingRow({
  title,
  description,
  trailing,
  mobileValue,
  leadingIcon: LeadingIcon,
  onClick,
  stacked = false,
  titleClassName = "text-ink",
  ariaPressed,
}: SettingRowProps) {
  const className = `group flex w-full gap-4 px-4 py-4 text-left transition-colors sm:px-5 ${
    stacked
      ? "flex-col sm:flex-row sm:items-center sm:justify-between"
      : "items-center justify-between"
  } ${onClick ? `cursor-pointer hover:bg-[#fbfdff] ${focusRing}` : ""}`;

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <p
          className={`flex items-start gap-2 text-[13px] font-semibold leading-[1.35] ${titleClassName}`}
        >
          {LeadingIcon ? (
            <LeadingIcon
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-[1px] shrink-0 text-[#94a3b8]"
            />
          ) : null}
          <span className="min-w-0">{title}</span>
        </p>
        <p className="mt-0.5 text-[11.5px] leading-[1.55] text-muted">
          {description}
        </p>
        {mobileValue ? (
          <p className="mt-1 text-[11.5px] font-semibold text-[#475569] sm:hidden">
            {mobileValue}
          </p>
        ) : null}
      </div>

      {trailing ? (
        <div
          className={`flex shrink-0 items-center ${
            stacked ? "self-stretch sm:self-auto" : ""
          }`}
        >
          {trailing}
        </div>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={ariaPressed}
        className={className}
      >
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

export function RowList({ children }: { children: ReactNode }) {
  return (
    <div className="divide-y divide-line px-4 sm:px-6">{children}</div>
  );
}

export function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[22px] w-10 shrink-0 items-center rounded-full transition-colors ${focusRing} ${
        checked ? "bg-brand" : "bg-[#cbd5e1]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.25)] transition-transform ${
          checked ? "translate-x-[20px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

export function CheckIndicator() {
  return (
    <Check
      size={17}
      strokeWidth={2.4}
      aria-hidden="true"
      className="text-brand"
    />
  );
}

export function ValueChevron({ value }: { value: string }) {
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <span className="hidden max-w-[150px] truncate text-[12.5px] text-muted sm:inline sm:max-w-[220px]">
        {value}
      </span>
      <ChevronRight
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0 text-[#94a3b8] transition-transform group-hover:translate-x-0.5"
      />
    </span>
  );
}

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
};

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (step === 0) return;

    event.preventDefault();
    const index = options.findIndex((option) => option.value === value);
    const nextIndex = (index + step + options.length) % options.length;

    onChange(options[nextIndex].value);
    buttons.current[nextIndex]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="inline-flex max-w-full items-center rounded-[10px] bg-[#f1f5f9] p-[3px]"
    >
      {options.map((option, index) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={`inline-flex h-7 items-center justify-center whitespace-nowrap rounded-[8px] border px-2.5 text-[11.5px] leading-none transition-colors sm:px-3 ${focusRing} ${
              active
                ? "border-[#e2e8f0] bg-white font-semibold text-brand shadow-[0_1px_3px_rgba(15,23,42,0.08)]"
                : "border-transparent font-medium text-[#475569] hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function TextAction({
  children,
  onClick,
  label,
}: {
  children: string;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`rounded-[6px] py-0.5 text-[12px] font-semibold text-brand transition-colors hover:text-[#1d4ed8] ${focusRing}`}
    >
      {children}
    </button>
  );
}
