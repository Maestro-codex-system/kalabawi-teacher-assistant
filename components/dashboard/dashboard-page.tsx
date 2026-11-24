import {
  Boxes,
  ChevronDown,
  Upload,
} from "lucide-react";
import { CalendarCard } from "./calendar-card";
import { DepedResources } from "./deped-resources";
import { DraftCard } from "./draft-card";
import { ProPlanCard } from "./pro-plan-card";
import { QuoteCard } from "./quote-card";
import { RecentFiles } from "./recent-files";

const primaryButton =
  "inline-flex h-9 items-center justify-center gap-2 rounded-[9px] bg-brand px-4 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2";

const secondaryButton =
  "inline-flex h-9 items-center justify-center gap-2 rounded-[9px] border border-line bg-white px-4 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2";

export function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-[800px] px-5 pb-16 pt-6 sm:px-6 lg:pt-7">
      <header className="border-b border-line pb-2.5">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]">
          Dashboard
        </h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          Quick overview of your weekly lesson plans, remaining quotas, and
          recent teaching materials.
        </p>
      </header>

      <section className="mt-9">
        <h2 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[26px] font-bold leading-tight tracking-[-0.025em] text-ink sm:text-[30px]">
          Good morning, Juan.
          <span role="img" aria-label="Coffee" className="text-[25px] leading-none">
            ☕️
          </span>
        </h2>
        <p className="mt-1.5 text-[13.5px] text-muted sm:text-[14px]">
          Rizal High School · Grade 6 English
        </p>

        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <button type="button" className={`${primaryButton} w-full sm:w-auto`}>
            <Boxes size={16} strokeWidth={2} />
            Create Lesson Bundle
          </button>
          <button type="button" className={`${secondaryButton} w-full sm:w-auto`}>
            <Upload size={16} strokeWidth={2} />
            Upload ILAW Lesson Plan
          </button>
          <button type="button" className={`${secondaryButton} w-full sm:w-auto`}>
            Generate Individual Tool
            <ChevronDown size={15} strokeWidth={2} />
          </button>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_236px] lg:gap-6">
        <div className="flex min-w-0 flex-col gap-5">
          <ProPlanCard />
          <DraftCard />
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <CalendarCard />
          <QuoteCard />
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <RecentFiles />
        <DepedResources />
      </div>
    </main>
  );
}
