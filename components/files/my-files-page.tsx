"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, Info, ListFilter, Search, X } from "lucide-react";
import { FileRow } from "./file-row";
import { FolderGlyph } from "./folder-glyph";
import {
  files,
  filesInFolder,
  folders,
  matchesQuery,
  type FolderId,
} from "./files-data";

type SortKey = "newest" | "oldest" | "name";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "name", label: "Name (A–Z)" },
];

const sectionLabel =
  "text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

export function MyFilesPage() {
  const [folderId, setFolderId] = useState<FolderId | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSortOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sortOpen]);

  const activeFolder = folderId
    ? folders.find((folder) => folder.id === folderId) ?? null
    : null;

  const visibleFiles = useMemo(() => {
    const scoped = folderId ? filesInFolder(folderId) : files;
    const matched = scoped.filter((file) => matchesQuery(file, query));

    const ordered =
      sort === "name"
        ? [...matched].sort((a, b) => a.name.localeCompare(b.name, "en"))
        : [...matched].sort((a, b) =>
            sort === "oldest" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp,
          );

    return folderId === null ? ordered.slice(0, 6) : ordered;
  }, [folderId, query, sort]);

  const currentSortLabel =
    sortOptions.find((option) => option.key === sort)?.label ?? "Newest";

  const placeholder = activeFolder
    ? `Search in ${activeFolder.label}...`
    : "Search all files by title or subject...";

  function openFolder(id: FolderId) {
    setFolderId(id);
    setQuery("");
    setSelectionMode(false);
    setSelected([]);
  }

  function goBack() {
    setFolderId(null);
    setQuery("");
    setSelectionMode(false);
    setSelected([]);
  }

  function toggleSelected(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id],
    );
  }

  function exitSelection() {
    setSelectionMode(false);
    setSelected([]);
  }

  const showKindColumn = folderId === null || folderId === "all";

  return (
    <main className="mx-auto w-full max-w-[896px] px-5 pb-16 pt-6 sm:px-6 lg:pt-7">
      <header className="border-b border-line pb-4">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]">
          My Files
        </h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          All your generated lesson plans, PPTs, and TOS.
        </p>
      </header>

      {bannerVisible ? (
        <section
          aria-label="File retention notice"
          className="relative mt-9 flex items-start gap-3.5 rounded-[16px] border border-line bg-white px-5 py-6 shadow-soft sm:px-6"
        >
          <Info
            size={20}
            strokeWidth={1.7}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#6d8dae]"
          />
          <p className="max-w-[980px] pr-2 text-[13px] leading-[1.75] text-[#475569] sm:text-[13.5px]">
            <strong className="font-bold text-ink">Heads up:</strong> Files older
            than 14 days are automatically cleared to save space. Please download
            and save your important files to your device.
          </p>
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            aria-label="Dismiss retention notice"
            className={`-mr-1 -mt-1 ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-[7px] text-[#94a3b8] transition-colors hover:bg-canvas hover:text-ink ${focusRing}`}
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </section>
      ) : null}

      <div className="mt-8 flex items-center gap-3">
        <label className="flex h-[42px] min-w-0 flex-1 max-w-[442px] items-center gap-2.5 rounded-[10px] border border-line bg-white px-3.5 shadow-soft transition focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/15">
          <Search
            size={16}
            strokeWidth={1.9}
            aria-hidden="true"
            className="shrink-0 text-[#94a3b8]"
          />
          <span className="sr-only">
            {activeFolder ? `Search ${activeFolder.label}` : "Search all files"}
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-[#94a3b8]"
          />
        </label>

        <div ref={sortRef} className="relative ml-auto shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={sortOpen}
            aria-label={`Sort files: ${currentSortLabel}`}
            className={`flex h-9 items-center gap-2 rounded-[8px] px-2 text-[13px] font-medium text-[#334155] transition-colors hover:bg-white/70 ${focusRing}`}
          >
            <ListFilter
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
              className="text-[#64748b]"
            />
            <span className="hidden sm:inline">{currentSortLabel}</span>
          </button>

          {sortOpen ? (
            <div
              role="menu"
              aria-label="Sort files"
              className="absolute right-0 top-full z-20 mt-2 w-[168px] rounded-[12px] border border-line bg-white p-1 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.5)]"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  role="menuitemradio"
                  aria-checked={sort === option.key}
                  onClick={() => {
                    setSort(option.key);
                    setSortOpen(false);
                  }}
                  className={`flex h-9 w-full items-center gap-2 rounded-[8px] px-2.5 text-left text-[12.5px] transition-colors hover:bg-canvas ${focusRing} ${
                    sort === option.key
                      ? "font-semibold text-ink"
                      : "font-medium text-[#475569]"
                  }`}
                >
                  <Check
                    size={14}
                    strokeWidth={2.4}
                    aria-hidden="true"
                    className={`shrink-0 ${
                      sort === option.key ? "text-brand" : "text-transparent"
                    }`}
                  />
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {visibleFiles.length} files shown
      </p>

      {activeFolder ? (
        <section className="mt-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <button
              type="button"
              onClick={goBack}
              className={`inline-flex items-center gap-0.5 rounded-[6px] text-[13px] font-semibold text-brand transition-colors hover:text-[#1d4ed8] ${focusRing}`}
            >
              <ChevronLeft size={15} strokeWidth={2.4} aria-hidden="true" />
              Back to Folders
            </button>

            <span aria-hidden="true" className="text-[13px] text-[#cbd5e1]">
              /
            </span>

            <span className="inline-flex min-w-0 items-center gap-2">
              <FolderGlyph
                tone={activeFolder.tone}
                className="w-[22px] shrink-0"
              />
              <span className="truncate text-[13.5px] font-semibold text-ink">
                {activeFolder.label}
              </span>
              <span className="shrink-0 text-[12.5px] text-muted">
                ({activeFolder.count})
              </span>
            </span>

            <div className="ml-auto flex shrink-0 items-center gap-3">
              {selectionMode ? (
                <span className="text-[12px] text-muted">
                  {selected.length} selected
                </span>
              ) : null}
              <button
                type="button"
                onClick={() =>
                  selectionMode ? exitSelection() : setSelectionMode(true)
                }
                className={`rounded-[6px] text-[13px] font-semibold text-brand transition-colors hover:text-[#1d4ed8] ${focusRing}`}
              >
                {selectionMode ? "Done" : "Select"}
              </button>
            </div>
          </div>

          {visibleFiles.length > 0 ? (
            <div className="ds-card mt-3 overflow-hidden">
              <ul className="divide-y divide-[#eef2f6]">
                {visibleFiles.map((file) => (
                  <FileRow
                    key={file.id}
                    file={file}
                    showKind={showKindColumn}
                    selectionMode={selectionMode}
                    selected={selected.includes(file.id)}
                    onToggleSelect={() => toggleSelected(file.id)}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <EmptyState subject={activeFolder.label} />
          )}
        </section>
      ) : (
        <>
          <section className="mt-7">
            <h2 className={sectionLabel}>Folders</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => openFolder(folder.id)}
                  aria-label={`Open ${folder.label}, ${folder.count} files`}
                  className={`group flex flex-col items-center gap-4 rounded-[14px] px-2 py-2 transition-colors hover:bg-white/70 ${focusRing}`}
                >
                  <FolderGlyph
                    tone={folder.tone}
                    className="w-[82px] transition-transform duration-200 group-hover:-translate-y-0.5 sm:w-[86px]"
                  />
                  <span className="text-center">
                    <span className="block text-[13px] font-semibold leading-tight text-ink">
                      {folder.label}
                    </span>
                    <span className="mt-1 block text-[11.5px] leading-tight text-muted">
                      {folder.count} {folder.count === 1 ? "file" : "files"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className={sectionLabel}>
                {query.trim() ? "Search Results" : "Recent Files"}
              </h2>
              {query.trim() ? null : (
                <button
                  type="button"
                  onClick={() => openFolder("all")}
                  className={`app-link text-[12.5px] ${focusRing}`}
                >
                  View All ({folders[0].count})
                </button>
              )}
            </div>

            {visibleFiles.length > 0 ? (
              <div className="ds-card mt-3 overflow-hidden">
                <ul className="divide-y divide-[#eef2f6]">
                  {visibleFiles.map((file) => (
                    <FileRow key={file.id} file={file} />
                  ))}
                </ul>
              </div>
            ) : (
              <EmptyState subject="your library" />
            )}
          </section>
        </>
      )}
    </main>
  );
}

function EmptyState({ subject }: { subject: string }) {
  return (
    <div className="ds-card mt-3 flex flex-col items-center px-6 py-12 text-center">
      <Image
        src="/mascot-empty.png"
        alt=""
        width={144}
        height={132}
        className="h-24 w-auto"
      />
      <p className="mt-4 text-[14px] font-semibold text-ink">No files found</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
        Nothing in {subject} matches your search. Try another title or subject.
      </p>
    </div>
  );
}
