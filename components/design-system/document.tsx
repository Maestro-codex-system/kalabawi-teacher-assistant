import { Icon } from "./icons";
import { SectionCard } from "./section";

const columns = [
  "A. Objectives",
  "B. Content",
  "C. Learning Activities",
  "D. Assessment",
];

export function DocumentViewerSection() {
  return (
    <SectionCard number={10} title="Document Viewer" bodyClassName="pb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[9px] border border-line bg-white px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon name="file" size={14} className="shrink-0 text-navy" />
          <span className="truncate text-[11.5px] font-semibold text-ink">
            Kalabawi_Lesson_Plan.docx
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-muted">
          <button
            type="button"
            aria-label="Previous page"
            className="grid h-7 w-7 place-items-center rounded-md hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <Icon name="chevron-left" size={14} />
          </button>
          <span className="text-[11px] font-medium text-ink">1 / 1</span>
          <button
            type="button"
            aria-label="Next page"
            className="grid h-7 w-7 place-items-center rounded-md hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <Icon name="chevron-right" size={14} />
          </button>

          <span className="hidden h-5 w-px bg-line sm:block" />

          <button
            type="button"
            className="hidden h-7 items-center gap-1 rounded-md px-2 text-[11px] text-ink hover:bg-canvas sm:flex"
            aria-label="Zoom level"
          >
            100%
            <Icon name="chevron-right" size={11} className="rotate-90" />
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            className="hidden h-7 w-7 place-items-center rounded-md hover:bg-canvas sm:grid"
          >
            <Icon name="zoom-in" size={15} />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            className="hidden h-7 w-7 place-items-center rounded-md hover:bg-canvas sm:grid"
          >
            <Icon name="zoom-out" size={15} />
          </button>
          <button
            type="button"
            aria-label="Download document"
            className="grid h-7 w-7 place-items-center rounded-md hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <Icon name="download" size={15} />
          </button>
        </div>
      </div>

      <div className="mt-4 w-full min-w-0 overflow-x-auto">
        <div className="mx-auto w-full min-w-0 max-w-[880px] border border-[#8B95A3] bg-white">
          <div className="border-b border-black bg-[#B4C6E7] py-2 text-center font-serif text-[14px] font-bold text-black">
            IV. LEARNING PLAN
          </div>

          <div className="grid grid-cols-4 border-b border-black">
            {columns.map((column) => (
              <div
                key={column}
                className="grid min-h-[46px] place-items-center border-r border-black px-1.5 py-2 text-center text-[10px] font-semibold leading-tight text-black last:border-r-0 sm:px-2 sm:text-[11px]"
              >
                {column}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4">
            {columns.map((column) => (
              <div
                key={`cell-${column}`}
                className="h-16 border-r border-black last:border-r-0"
              />
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export function ProgressBarSection() {
  return (
    <SectionCard number={11} title="Progress Bar">
      <div className="flex items-center gap-4">
        <div
          className="h-3.5 flex-1 overflow-hidden rounded-full bg-[#DEE7F2]"
          role="progressbar"
          aria-valuenow={35}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Generation progress"
        >
          <div className="h-full w-[35%] rounded-full bg-brand" />
        </div>
        <span className="w-11 text-right text-[13px] font-semibold text-ink">
          35%
        </span>
      </div>
    </SectionCard>
  );
}
