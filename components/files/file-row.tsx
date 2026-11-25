"use client";

import {
  Download,
  Ellipsis,
  Eye,
  FileCheck,
  FileText,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { kindStyles, type FileKind, type LibraryFile } from "./files-data";

const kindIcons: Record<FileKind, LucideIcon> = {
  "lesson-plan": FileText,
  ppt: Presentation,
  tos: FileCheck,
};

type FileRowProps = {
  file: LibraryFile;
  showKind?: boolean;
  selectionMode?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
};

const actionButton =
  "grid h-8 w-8 place-items-center rounded-[7px] transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

export function FileRow({
  file,
  showKind = true,
  selectionMode = false,
  selected = false,
  onToggleSelect,
}: FileRowProps) {
  const style = kindStyles[file.kind];
  const KindIcon = kindIcons[file.kind];

  return (
    <li className="group flex items-start gap-3 px-4 py-4 transition-colors hover:bg-[#f7f9fc] sm:gap-3.5 sm:px-7 sm:py-[15px] lg:px-12">
      {selectionMode ? (
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggleSelect}
          aria-label={`Select ${file.name}`}
          className="mt-3 h-4 w-4 shrink-0 cursor-pointer rounded-[4px] accent-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        />
      ) : null}

      <span
        aria-hidden="true"
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-[10px] ${style.tile} ${style.icon}`}
      >
        <KindIcon size={19} strokeWidth={1.7} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="min-w-0 max-w-full break-words text-[13.5px] font-semibold leading-snug text-ink">
            {file.name}
          </h3>
          {showKind ? (
            <span
              className={`inline-flex shrink-0 items-center rounded-[6px] px-2 py-[3px] text-[10px] font-semibold leading-none ${style.badge}`}
            >
              {style.label}
            </span>
          ) : null}
        </div>

        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] leading-relaxed text-[#94a3b8] sm:text-[12px]">
          <span>{file.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{file.size}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{file.grade}</span>
        </p>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-0.5 self-start pt-0.5 text-[#94a3b8] sm:gap-1 sm:self-center sm:pt-0">
        <button
          type="button"
          aria-label={`View ${file.name}`}
          className={actionButton}
        >
          <Eye size={17} strokeWidth={1.7} />
        </button>
        <button
          type="button"
          aria-label={`Download ${file.name}`}
          className={actionButton}
        >
          <Download size={17} strokeWidth={1.7} />
        </button>
        <button
          type="button"
          aria-label={`More actions for ${file.name}`}
          className={`${actionButton} hidden sm:grid`}
        >
          <Ellipsis size={17} strokeWidth={1.7} />
        </button>
      </div>
    </li>
  );
}
