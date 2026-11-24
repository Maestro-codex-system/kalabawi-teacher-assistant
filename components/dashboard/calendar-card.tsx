"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const SELECTED = { year: 2026, month: 10, day: 25 };

export function CalendarCard() {
  const [cursor, setCursor] = useState({ year: 2026, month: 10 });

  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const leadingBlanks = new Date(cursor.year, cursor.month, 1).getDay();
  const cells: (number | null)[] = [
    ...Array<number | null>(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const shiftMonth = (delta: number) => {
    setCursor(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  return (
    <section className="ds-card p-5 lg:min-h-[272px]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[14px] font-bold text-ink" aria-live="polite">
          {MONTHS[cursor.month]} {cursor.year}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label="Previous month"
            className="grid h-7 w-7 place-items-center rounded-[6px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            <ChevronLeft size={15} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
            className="grid h-7 w-7 place-items-center rounded-[6px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            <ChevronRight size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-y-0.5 text-center">
        {WEEKDAYS.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="text-[10.5px] font-semibold text-[#94a3b8]"
          >
            {day}
          </span>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return <span key={`blank-${index}`} aria-hidden="true" />;
          }

          const isSelected =
            cursor.year === SELECTED.year &&
            cursor.month === SELECTED.month &&
            day === SELECTED.day;

          return (
            <span key={day} className="grid place-items-center">
              <span
                aria-current={isSelected ? "date" : undefined}
                className={`grid h-7 w-7 place-items-center rounded-full text-[12px] leading-none ${
                  isSelected
                    ? "bg-brand font-semibold text-white shadow-sm"
                    : "font-medium text-[#334155]"
                }`}
              >
                {day}
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
