import { ArrowRight, Download, Eye, FileText, MoreHorizontal } from "lucide-react";

type RecentFile = {
  name: string;
  date: string;
  size: string;
  grade: string;
};

const files: RecentFile[] = [
  {
    name: "English 6 - Subject-Verb Agreement in Coherent Sentences.docx",
    date: "Nov 24, 2026",
    size: "28 KB",
    grade: "Grade 6 English",
  },
  {
    name: "English 6 - Subject-Verb Agreement in Coherent Sentences.docx",
    date: "Nov 24, 2026",
    size: "28 KB",
    grade: "Grade 6 English",
  },
  {
    name: "GMRC/Values Education 6 - Pagpapakita ng Katapatan at Malasakit sa Kapwa.docx",
    date: "Nov 23, 2026",
    size: "28 KB",
    grade: "Grade 6 GMRC/Values Education",
  },
  {
    name: "English 6 - Subject-Verb Agreement in Coherent Sentences.docx",
    date: "Nov 23, 2026",
    size: "28 KB",
    grade: "Grade 6 English",
  },
  {
    name: "English 6 - Subject-Verb Agreement in Coherent Sentences.docx",
    date: "Nov 23, 2026",
    size: "28 KB",
    grade: "Grade 6 English",
  },
];

export function RecentFiles() {
  return (
    <section className="ds-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <h2 className="text-[14px] font-bold text-ink">Recent Files</h2>
        <button type="button" className="app-link text-[12.5px]">
          View all
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </div>

      <ul className="divide-y divide-[#eef2f6] border-t border-line">
        {files.map((file, index) => (
          <li
            key={`${file.name}-${index}`}
            className="flex items-center gap-3.5 px-5 py-4 sm:gap-4 sm:px-6"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-wash text-brand">
              <FileText size={19} strokeWidth={1.8} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="max-w-full shrink-0 truncate text-[13px] font-semibold text-ink sm:text-[14px]">
                  {file.name}
                </h3>
                <span className="inline-flex shrink-0 items-center rounded-[6px] bg-wash px-2 py-1 text-[10px] font-semibold leading-none text-brand">
                  Lesson Plan
                </span>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11.5px] text-[#94a3b8] sm:text-[12px]">
                <span>{file.date}</span>
                <span aria-hidden="true">·</span>
                <span>{file.size}</span>
                <span aria-hidden="true">·</span>
                <span>{file.grade}</span>
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 text-[#94a3b8]">
              <button
                type="button"
                aria-label={`View ${file.name}`}
                className="grid h-8 w-8 place-items-center rounded-[7px] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <Eye size={17} strokeWidth={1.7} />
              </button>
              <button
                type="button"
                aria-label={`Download ${file.name}`}
                className="grid h-8 w-8 place-items-center rounded-[7px] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <Download size={17} strokeWidth={1.7} />
              </button>
              <button
                type="button"
                aria-label={`More actions for ${file.name}`}
                className="grid h-8 w-8 place-items-center rounded-[7px] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <MoreHorizontal size={17} strokeWidth={1.7} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
