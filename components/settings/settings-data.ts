import {
  getProfileSnapshot,
  profileStorageKey,
} from "../profile/profile-data";

export type OutputKey = "lessonPlan" | "slideDeck" | "tosExam";
export type InterfaceLanguage = "english" | "filipino";
export type ExportFormat = "docx" | "pdf";
export type NotificationKey =
  | "generationComplete"
  | "quotaRunningLow"
  | "subscriptionRenewal";
export type TimeOfDayPreview = "real-time" | "morning" | "afternoon" | "evening";
export type ImageSource = "unsplash" | "pexafy";

export type DeveloperPreferences = {
  timeOfDay: TimeOfDayPreview;
  lessonPlanImageSource: ImageSource;
  imageSourceProvider: ImageSource;
  simulateGenerationFailure: boolean;
  forceNextGenerationFailure: boolean;
  slowGeneration: boolean;
};

export type SettingsPreferences = {
  outputs: Record<OutputKey, boolean>;
  interfaceLanguage: InterfaceLanguage;
  notifications: Record<NotificationKey, boolean>;
  exportFormat: ExportFormat;
  teacherReviewDeclaration: boolean;
  developer: DeveloperPreferences;
};

export type SettingsPatch = {
  outputs?: Partial<Record<OutputKey, boolean>>;
  interfaceLanguage?: InterfaceLanguage;
  notifications?: Partial<Record<NotificationKey, boolean>>;
  exportFormat?: ExportFormat;
  teacherReviewDeclaration?: boolean;
  developer?: Partial<DeveloperPreferences>;
};

export const settingsStorageKey = "kalabawi.settings.preferences";

export const defaultSettings: SettingsPreferences = {
  outputs: {
    lessonPlan: true,
    slideDeck: true,
    tosExam: true,
  },
  interfaceLanguage: "english",
  notifications: {
    generationComplete: true,
    quotaRunningLow: true,
    subscriptionRenewal: true,
  },
  exportFormat: "docx",
  teacherReviewDeclaration: true,
  developer: {
    timeOfDay: "real-time",
    lessonPlanImageSource: "pexafy",
    imageSourceProvider: "pexafy",
    simulateGenerationFailure: false,
    forceNextGenerationFailure: false,
    slowGeneration: false,
  },
};

const outputKeys: OutputKey[] = ["lessonPlan", "slideDeck", "tosExam"];
const notificationKeys: NotificationKey[] = [
  "generationComplete",
  "quotaRunningLow",
  "subscriptionRenewal",
];
const timeOfDayValues: TimeOfDayPreview[] = [
  "real-time",
  "morning",
  "afternoon",
  "evening",
];
const imageSourceValues: ImageSource[] = ["unsplash", "pexafy"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readStoredSettings(): SettingsPatch | null {
  try {
    const raw = window.localStorage.getItem(settingsStorageKey);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;

    const patch: SettingsPatch = {};

    if (isRecord(parsed.outputs)) {
      const storedOutputs = parsed.outputs;
      const outputs: Partial<Record<OutputKey, boolean>> = {};
      outputKeys.forEach((key) => {
        if (typeof storedOutputs[key] === "boolean") {
          outputs[key] = storedOutputs[key] as boolean;
        }
      });
      patch.outputs = outputs;
    }

    if (
      parsed.interfaceLanguage === "english" ||
      parsed.interfaceLanguage === "filipino"
    ) {
      patch.interfaceLanguage = parsed.interfaceLanguage;
    }

    if (isRecord(parsed.notifications)) {
      const storedNotifications = parsed.notifications;
      const notifications: Partial<Record<NotificationKey, boolean>> = {};
      notificationKeys.forEach((key) => {
        if (typeof storedNotifications[key] === "boolean") {
          notifications[key] = storedNotifications[key] as boolean;
        }
      });
      patch.notifications = notifications;
    }

    if (parsed.exportFormat === "docx" || parsed.exportFormat === "pdf") {
      patch.exportFormat = parsed.exportFormat;
    }

    if (typeof parsed.teacherReviewDeclaration === "boolean") {
      patch.teacherReviewDeclaration = parsed.teacherReviewDeclaration;
    }

    if (isRecord(parsed.developer)) {
      const storedDeveloper = parsed.developer;
      const developer: Partial<DeveloperPreferences> = {};

      if (
        timeOfDayValues.includes(storedDeveloper.timeOfDay as TimeOfDayPreview)
      ) {
        developer.timeOfDay = storedDeveloper.timeOfDay as TimeOfDayPreview;
      }
      if (
        imageSourceValues.includes(
          storedDeveloper.lessonPlanImageSource as ImageSource,
        )
      ) {
        developer.lessonPlanImageSource =
          storedDeveloper.lessonPlanImageSource as ImageSource;
      }
      if (
        imageSourceValues.includes(
          storedDeveloper.imageSourceProvider as ImageSource,
        )
      ) {
        developer.imageSourceProvider =
          storedDeveloper.imageSourceProvider as ImageSource;
      }
      if (typeof storedDeveloper.simulateGenerationFailure === "boolean") {
        developer.simulateGenerationFailure =
          storedDeveloper.simulateGenerationFailure;
      }
      if (typeof storedDeveloper.forceNextGenerationFailure === "boolean") {
        developer.forceNextGenerationFailure =
          storedDeveloper.forceNextGenerationFailure;
      }
      if (typeof storedDeveloper.slowGeneration === "boolean") {
        developer.slowGeneration = storedDeveloper.slowGeneration;
      }

      patch.developer = developer;
    }

    return patch;
  } catch {
    return null;
  }
}

function applyPatch(
  current: SettingsPreferences,
  patch: SettingsPatch,
): SettingsPreferences {
  return {
    ...current,
    ...patch,
    outputs: { ...current.outputs, ...patch.outputs },
    notifications: { ...current.notifications, ...patch.notifications },
    developer: { ...current.developer, ...patch.developer },
  };
}

let currentSettings: SettingsPreferences = defaultSettings;
let storageLoaded = false;
const listeners = new Set<() => void>();

function loadStoredSettings() {
  if (storageLoaded) return;
  storageLoaded = true;

  const stored = readStoredSettings();
  if (stored) currentSettings = applyPatch(currentSettings, stored);
}

if (typeof window !== "undefined") loadStoredSettings();

export function subscribeSettings(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSettingsSnapshot() {
  return currentSettings;
}

export function getSettingsServerSnapshot() {
  return defaultSettings;
}

export function updateSettings(patch: SettingsPatch) {
  currentSettings = applyPatch(currentSettings, patch);

  try {
    window.localStorage.setItem(
      settingsStorageKey,
      JSON.stringify(currentSettings),
    );
  } catch {
    // Storage can be unavailable (private mode); settings stay in memory.
  }

  listeners.forEach((listener) => listener());
}

export function createDataExport() {
  const read = (key: string) => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      profile: { ...getProfileSnapshot(), ...read(profileStorageKey) },
      settings: read(settingsStorageKey) ?? currentSettings,
    },
    null,
    2,
  );
}
