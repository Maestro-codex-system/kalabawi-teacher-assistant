export type FileKind = "lesson-plan" | "ppt" | "tos";

export type FolderId = "all" | "lesson-plans" | "ppt-decks" | "tos-exams";

export type FolderTone = "slate" | "brand" | "orange" | "emerald";

export type LibraryFile = {
  id: string;
  name: string;
  kind: FileKind;
  folder: Exclude<FolderId, "all">;
  date: string;
  timestamp: number;
  size: string;
  grade: string;
};

export type LibraryFolder = {
  id: FolderId;
  label: string;
  count: number;
  tone: FolderTone;
};

export const folders: LibraryFolder[] = [
  { id: "all", label: "All Files", count: 104, tone: "slate" },
  { id: "lesson-plans", label: "Lesson Plans", count: 96, tone: "brand" },
  { id: "ppt-decks", label: "PPT Decks", count: 7, tone: "orange" },
  { id: "tos-exams", label: "TOS & Exams", count: 2, tone: "emerald" },
];

export const kindStyles: Record<
  FileKind,
  { label: string; tile: string; icon: string; badge: string }
> = {
  "lesson-plan": {
    label: "Lesson Plan",
    tile: "bg-[#eef4fc]",
    icon: "text-[#2563eb]",
    badge: "bg-[#dbeafe] text-[#2563eb]",
  },
  ppt: {
    label: "PPT",
    tile: "bg-[#fff3e9]",
    icon: "text-[#f97316]",
    badge: "bg-[#ffedd5] text-[#c2410c]",
  },
  tos: {
    label: "TOS",
    tile: "bg-[#e9fbf1]",
    icon: "text-[#059669]",
    badge: "bg-[#d1fae5] text-[#047857]",
  },
};

const englishSix = "English 6 - Subject-Verb Agreement in Coherent Sentences.docx";
const gmrcSix =
  "GMRC/Values Education 6 - Pagpapakita ng Katapatan at Malasakit sa Kapwa.docx";
const mapehSeven =
  "MAPEH (Music, Arts, PE, Health) 7 - MAPEH (Music, Arts, PE, Health) Lesson.docx";

function stamp(year: number, month: number, day: number, hour = 9) {
  return Date.UTC(year, month, day, hour);
}

export const files: LibraryFile[] = [
  {
    id: "f01",
    name: englishSix,
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 24, 2026",
    timestamp: stamp(2026, 10, 24, 10),
    size: "28 KB",
    grade: "Grade 6 English",
  },
  {
    id: "f02",
    name: englishSix,
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 24, 2026",
    timestamp: stamp(2026, 10, 24, 9),
    size: "28 KB",
    grade: "Grade 6 English",
  },
  {
    id: "f03",
    name: gmrcSix,
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 23, 2026",
    timestamp: stamp(2026, 10, 23, 15),
    size: "28 KB",
    grade: "Grade 6 GMRC/Values Education",
  },
  {
    id: "f04",
    name: englishSix,
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 23, 2026",
    timestamp: stamp(2026, 10, 23, 14),
    size: "28 KB",
    grade: "Grade 6 English",
  },
  {
    id: "f05",
    name: englishSix,
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 23, 2026",
    timestamp: stamp(2026, 10, 23, 13),
    size: "28 KB",
    grade: "Grade 6 English",
  },
  {
    id: "f06",
    name: "GMRC 1 - Pagpapakita ng Katapatan at Malasakit sa Kapwa.docx",
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 23, 2026",
    timestamp: stamp(2026, 10, 23, 11),
    size: "28 KB",
    grade: "Grade 1 GMRC",
  },
  {
    id: "f07",
    name: "English 5 - Q2 Week 3 - PPT.pptx",
    kind: "ppt",
    folder: "ppt-decks",
    date: "Nov 17, 2026",
    timestamp: stamp(2026, 10, 17, 16),
    size: "1.6 MB",
    grade: "Grade 5 English",
  },
  {
    id: "f08",
    name: "English 5 - Q2 Week 3 - PPT.pptx",
    kind: "ppt",
    folder: "ppt-decks",
    date: "Nov 17, 2026",
    timestamp: stamp(2026, 10, 17, 15),
    size: "1.5 MB",
    grade: "Grade 5 English",
  },
  {
    id: "f09",
    name: "English 5 - Q2 Week 3 - PPT.pptx",
    kind: "ppt",
    folder: "ppt-decks",
    date: "Nov 17, 2026",
    timestamp: stamp(2026, 10, 17, 14),
    size: "1.6 MB",
    grade: "Grade 5 English",
  },
  {
    id: "f10",
    name: "English 5 - Q2 Week 3 - PPT.pptx",
    kind: "ppt",
    folder: "ppt-decks",
    date: "Nov 17, 2026",
    timestamp: stamp(2026, 10, 17, 13),
    size: "1.5 MB",
    grade: "Grade 5 English",
  },
  {
    id: "f11",
    name: "English 5 - Q2 Week 3 - PPT.pptx",
    kind: "ppt",
    folder: "ppt-decks",
    date: "Nov 17, 2026",
    timestamp: stamp(2026, 10, 17, 12),
    size: "1.6 MB",
    grade: "Grade 5 English",
  },
  {
    id: "f12",
    name: "Araling Panlipunan 7 - Araling Panlipunan Lesson.docx",
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 10, 2026",
    timestamp: stamp(2026, 10, 10, 14),
    size: "28 KB",
    grade: "Grade 7 Araling Panlipunan",
  },
  {
    id: "f13",
    name: mapehSeven,
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 10, 2026",
    timestamp: stamp(2026, 10, 10, 13),
    size: "28 KB",
    grade: "Grade 7 MAPEH (Music, Arts, PE, Health)",
  },
  {
    id: "f14",
    name: mapehSeven,
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Nov 10, 2026",
    timestamp: stamp(2026, 10, 10, 12),
    size: "28 KB",
    grade: "Grade 7 MAPEH (Music, Arts, PE, Health)",
  },
  {
    id: "f15",
    name: gmrcSix,
    kind: "tos",
    folder: "tos-exams",
    date: "Oct 24, 2026",
    timestamp: stamp(2026, 9, 24, 18),
    size: "42 KB",
    grade: "Grade 5 English",
  },
  {
    id: "f16",
    name: "English 5 - Q2 Week 1 - ILAW Lesson Plan.docx",
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Oct 24, 2026",
    timestamp: stamp(2026, 9, 24, 17),
    size: "25 KB",
    grade: "Grade 5 English",
  },
  {
    id: "f17",
    name: "English 5 - Q2 Week 2 - PPT.pptx",
    kind: "ppt",
    folder: "ppt-decks",
    date: "Oct 24, 2026",
    timestamp: stamp(2026, 9, 24, 16),
    size: "1.4 MB",
    grade: "Grade 5 English",
  },
  {
    id: "f18",
    name: "English 5 - Q2 Week 2 - ILAW Lesson Plan.docx",
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Oct 24, 2026",
    timestamp: stamp(2026, 9, 24, 15),
    size: "22 KB",
    grade: "Grade 5 English",
  },
  {
    id: "f19",
    name: "English 5 - Q2 Week 3 - TOS and Summative Exam.docx",
    kind: "tos",
    folder: "tos-exams",
    date: "Oct 24, 2026",
    timestamp: stamp(2026, 9, 24, 14),
    size: "42 KB",
    grade: "Grade 5 English",
  },
  {
    id: "f20",
    name: "English 5 - Q2 Week 3 - PPT.pptx",
    kind: "ppt",
    folder: "ppt-decks",
    date: "Oct 24, 2026",
    timestamp: stamp(2026, 9, 24, 13),
    size: "1.8 MB",
    grade: "Grade 5 English",
  },
  {
    id: "f21",
    name: "English 5 - Q2 Week 3 - ILAW Lesson Plan.docx",
    kind: "lesson-plan",
    folder: "lesson-plans",
    date: "Oct 24, 2026",
    timestamp: stamp(2026, 9, 24, 12),
    size: "24 KB",
    grade: "Grade 5 English",
  },
];

export function filesInFolder(folder: FolderId): LibraryFile[] {
  if (folder === "all") return files;
  return files.filter((file) => file.folder === folder);
}

export function matchesQuery(file: LibraryFile, query: string): boolean {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  return `${file.name} ${file.grade}`.toLowerCase().includes(term);
}
