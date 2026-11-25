export type ProfilePreferences = {
  fullName: string;
  school: string;
  division: string;
  gradeLevel: string;
  subject: string;
  autoFill: boolean;
};

export const profileStorageKey = "kalabawi.profile.preferences";

export const defaultPreferences: ProfilePreferences = {
  fullName: "",
  school: "Rizal High School",
  division: "Pasig City, National Capital Region (NCR)",
  gradeLevel: "Grade 6 (Key Stage 2)",
  subject: "English",
  autoFill: true,
};

export const gradeLevelOptions = [
  "Grade 1 (Key Stage 1)",
  "Grade 2 (Key Stage 1)",
  "Grade 3 (Key Stage 1)",
  "Grade 4 (Key Stage 2)",
  "Grade 5 (Key Stage 2)",
  "Grade 6 (Key Stage 2)",
  "Grade 7 (Junior High)",
  "Grade 8 (Junior High)",
  "Grade 9 (Junior High)",
  "Grade 10 (Junior High)",
  "Grade 11 (Senior High)",
  "Grade 12 (Senior High)",
];

export const subjectOptions = [
  "English",
  "Filipino",
  "Mathematics",
  "Science",
  "Araling Panlipunan",
  "MAPEH",
  "EPP/TLE",
  "GMRC/Values Education",
];

export function readStoredPreferences(): Partial<ProfilePreferences> | null {
  try {
    const raw = window.localStorage.getItem(profileStorageKey);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const record = parsed as Record<string, unknown>;
    const patch: Partial<ProfilePreferences> = {};

    if (typeof record.fullName === "string") patch.fullName = record.fullName;
    if (typeof record.school === "string") patch.school = record.school;
    if (typeof record.division === "string") patch.division = record.division;
    if (typeof record.gradeLevel === "string") {
      patch.gradeLevel = record.gradeLevel;
    }
    if (typeof record.subject === "string") patch.subject = record.subject;
    if (typeof record.autoFill === "boolean") patch.autoFill = record.autoFill;

    return patch;
  } catch {
    return null;
  }
}

export function writeStoredPreferences(preferences: ProfilePreferences) {
  try {
    window.localStorage.setItem(
      profileStorageKey,
      JSON.stringify(preferences),
    );
  } catch {
    // Storage can be unavailable (private mode); preferences stay in memory.
  }
}

let currentPreferences: ProfilePreferences = defaultPreferences;
let storageLoaded = false;
const listeners = new Set<() => void>();

function loadStoredPreferences() {
  if (storageLoaded) return;
  storageLoaded = true;

  const stored = readStoredPreferences();
  if (stored) currentPreferences = { ...currentPreferences, ...stored };
}

if (typeof window !== "undefined") loadStoredPreferences();

export function subscribeProfile(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getProfileSnapshot() {
  return currentPreferences;
}

export function getProfileServerSnapshot() {
  return defaultPreferences;
}

export function persistProfilePreferences(patch: Partial<ProfilePreferences>) {
  currentPreferences = { ...currentPreferences, ...patch };
  writeStoredPreferences(currentPreferences);
  listeners.forEach((listener) => listener());
}
