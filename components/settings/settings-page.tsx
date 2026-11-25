"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useUser } from "@clerk/nextjs";
import { ChevronRight, SquareTerminal, Trash } from "lucide-react";
import { OptionPickerDialog } from "../profile/profile-dialogs";
import {
  getProfileServerSnapshot,
  getProfileSnapshot,
  persistProfilePreferences,
  subscribeProfile,
} from "../profile/profile-data";
import {
  CheckIndicator,
  GroupBand,
  RowList,
  SectionHeading,
  SegmentedControl,
  SettingRow,
  SettingsCard,
  TextAction,
  Toggle,
  ValueChevron,
  type SegmentOption,
} from "./settings-controls";
import { DeleteAccountDialog } from "./settings-dialogs";
import {
  createDataExport,
  getSettingsServerSnapshot,
  getSettingsSnapshot,
  subscribeSettings,
  updateSettings,
  type ExportFormat,
  type ImageSource,
  type InterfaceLanguage,
  type NotificationKey,
  type OutputKey,
  type TimeOfDayPreview,
} from "./settings-data";

type DialogId = "grade" | "subject" | "delete" | null;

type StatusSection = "data" | "developer";

type StatusMessage = {
  section: StatusSection;
  message: string;
};

const outputOptions: {
  key: OutputKey;
  title: string;
  description: string;
}[] = [
  {
    key: "lessonPlan",
    title: "ILAW Lesson Plan",
    description:
      "DepEd compliant 5E daily lesson plan and target competencies",
  },
  {
    key: "slideDeck",
    title: "Slide Deck (PPT)",
    description:
      "PowerPoint classroom presentation slides with visual prompts",
  },
  {
    key: "tosExam",
    title: "TOS & Exam",
    description: "Table of Specifications and summative assessment items",
  },
];

const languageOptions: {
  key: InterfaceLanguage;
  title: string;
  description: string;
}[] = [
  {
    key: "english",
    title: "English",
    description: "Standard DepEd English interface and curriculum terminology",
  },
  {
    key: "filipino",
    title: "Filipino",
    description: "Wikang Filipino para sa mga aralin at kagamitan sa pagtuturo",
  },
];

const notificationOptions: {
  key: NotificationKey;
  title: string;
  description: string;
}[] = [
  {
    key: "generationComplete",
    title: "Generation Complete",
    description:
      "Notify when ILAW batch files or individual PPTs finish generating",
  },
  {
    key: "quotaRunningLow",
    title: "Quota Running Low",
    description: "Alert when fewer than 2 batch generations remain this month",
  },
  {
    key: "subscriptionRenewal",
    title: "Subscription Renewal",
    description: "Reminder 3 days before monthly GCash billing renewal",
  },
];

const exportOptions: {
  key: ExportFormat;
  title: string;
  description: string;
}[] = [
  {
    key: "docx",
    title: "Microsoft Word (.docx)",
    description:
      "Fully editable document formatted for standard DepEd printing",
  },
  {
    key: "pdf",
    title: "PDF Document (.pdf)",
    description:
      "Locked document layout optimized for immediate printing or sharing",
  },
];

const timeOfDayOptions: SegmentOption<TimeOfDayPreview>[] = [
  { value: "real-time", label: "Real Time" },
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

const imageSourceOptions: SegmentOption<ImageSource>[] = [
  { value: "unsplash", label: "Unsplash" },
  { value: "pexafy", label: "Pexafy" },
];

export function SettingsPage() {
  const { user } = useUser();

  const [dialog, setDialog] = useState<DialogId>(null);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const profile = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getProfileServerSnapshot,
  );

  const settings = useSyncExternalStore(
    subscribeSettings,
    getSettingsSnapshot,
    getSettingsServerSnapshot,
  );

  const closeDialog = useCallback(() => setDialog(null), []);

  const flash = useCallback((section: StatusSection, message: string) => {
    if (statusTimer.current) clearTimeout(statusTimer.current);

    setStatus({ section, message });
    statusTimer.current = setTimeout(() => setStatus(null), 4000);
  }, []);

  useEffect(
    () => () => {
      if (statusTimer.current) clearTimeout(statusTimer.current);
    },
    [],
  );

  const email =
    user?.primaryEmailAddress?.emailAddress ?? "juan.delacruz@gmail.com";

  function toggleOutput(key: OutputKey) {
    const outputs: Partial<Record<OutputKey, boolean>> = {};
    outputs[key] = !settings.outputs[key];
    updateSettings({ outputs });
  }

  function toggleNotification(key: NotificationKey) {
    const notifications: Partial<Record<NotificationKey, boolean>> = {};
    notifications[key] = !settings.notifications[key];
    updateSettings({ notifications });
  }

  function handleDownloadData() {
    const blob = new Blob([createDataExport()], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `kalabawi-export-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    flash("data", "Your data export has been downloaded.");
  }

  return (
    <main className="mx-auto w-full max-w-[896px] px-5 pb-16 pt-6 sm:px-6 lg:pt-7">
      <header className="border-b border-line pb-6">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]">
          Settings &amp; Preferences
        </h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          Configure your classroom defaults, output formats, notification
          alerts, and data privacy options.
        </p>
      </header>

      <section aria-labelledby="teaching-preferences-heading" className="mt-9">
        <SectionHeading id="teaching-preferences-heading">
          Teaching Preferences
        </SectionHeading>

        <SettingsCard>
          <RowList>
            <SettingRow
              title="Default Grade Level"
              description="Primary grade level applied when generating lesson bundles"
              mobileValue={profile.gradeLevel}
              trailing={<ValueChevron value={profile.gradeLevel} />}
              onClick={() => setDialog("grade")}
            />
            <SettingRow
              title="Default Subject"
              description="Learning area automatically selected for new curriculum content"
              mobileValue={profile.subject}
              trailing={<ValueChevron value={profile.subject} />}
              onClick={() => setDialog("subject")}
            />
          </RowList>

          <GroupBand>Default Output Selection</GroupBand>
          <RowList>
            {outputOptions.map((option) => (
              <SettingRow
                key={option.key}
                title={option.title}
                description={option.description}
                ariaPressed={settings.outputs[option.key]}
                onClick={() => toggleOutput(option.key)}
                trailing={
                  settings.outputs[option.key] ? <CheckIndicator /> : undefined
                }
              />
            ))}
          </RowList>

          <GroupBand>Interface Language</GroupBand>
          <RowList>
            {languageOptions.map((option) => (
              <SettingRow
                key={option.key}
                title={option.title}
                description={option.description}
                ariaPressed={settings.interfaceLanguage === option.key}
                onClick={() =>
                  updateSettings({ interfaceLanguage: option.key })
                }
                trailing={
                  settings.interfaceLanguage === option.key ? (
                    <CheckIndicator />
                  ) : undefined
                }
              />
            ))}
          </RowList>
        </SettingsCard>
      </section>

      <section aria-labelledby="notifications-heading" className="mt-8">
        <SectionHeading id="notifications-heading">Notifications</SectionHeading>

        <SettingsCard>
          <RowList>
            {notificationOptions.map((option) => (
              <SettingRow
                key={option.key}
                title={option.title}
                description={option.description}
                trailing={
                  <Toggle
                    checked={settings.notifications[option.key]}
                    label={option.title}
                    onChange={() => toggleNotification(option.key)}
                  />
                }
              />
            ))}
          </RowList>
        </SettingsCard>
      </section>

      <section aria-labelledby="export-preferences-heading" className="mt-8">
        <SectionHeading id="export-preferences-heading">
          Export Preferences
        </SectionHeading>

        <SettingsCard>
          <GroupBand>Default Format</GroupBand>
          <RowList>
            {exportOptions.map((option) => (
              <SettingRow
                key={option.key}
                title={option.title}
                description={option.description}
                ariaPressed={settings.exportFormat === option.key}
                onClick={() => updateSettings({ exportFormat: option.key })}
                trailing={
                  settings.exportFormat === option.key ? (
                    <CheckIndicator />
                  ) : undefined
                }
              />
            ))}
          </RowList>

          <GroupBand>Compliance &amp; Footnotes</GroupBand>
          <RowList>
            <SettingRow
              title="Teacher Review Declaration"
              description="Adds standard DepEd footnote: Prepared with pedagogical assistance from Kalabawi."
              trailing={
                <Toggle
                  checked={settings.teacherReviewDeclaration}
                  label="Teacher Review Declaration"
                  onChange={(checked) =>
                    updateSettings({ teacherReviewDeclaration: checked })
                  }
                />
              }
            />
          </RowList>
        </SettingsCard>
      </section>

      <section aria-labelledby="data-privacy-heading" className="mt-8">
        <SectionHeading id="data-privacy-heading">Data &amp; Privacy</SectionHeading>

        <SettingsCard>
          <RowList>
            <SettingRow
              title="Download My Data"
              description="Export an archive containing your profile, generation history, and saved plans"
              trailing={
                <ChevronRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="text-[#94a3b8] transition-transform group-hover:translate-x-0.5"
                />
              }
              onClick={handleDownloadData}
            />
            <SettingRow
              title="Delete Account"
              description="Permanently delete your Kalabawi account, subscriptions, and generated lesson assets"
              titleClassName="text-danger"
              trailing={
                <Trash
                  size={16}
                  strokeWidth={1.9}
                  aria-hidden="true"
                  className="text-danger"
                />
              }
              onClick={() => setDialog("delete")}
            />
          </RowList>

          {status?.section === "data" ? (
            <p
              role="status"
              className="border-t border-line bg-panel px-5 py-3 text-[11.5px] leading-relaxed text-[#475569] sm:px-6"
            >
              {status.message}
            </p>
          ) : null}
        </SettingsCard>
      </section>

      <section aria-labelledby="developer-tools-heading" className="mt-8">
        <SectionHeading id="developer-tools-heading">
          Developer &amp; Testing Tools
        </SectionHeading>

        <SettingsCard>
          <RowList>
            <SettingRow
              title="Time of Day Preview"
              description="Override system time to test morning, afternoon, or evening 3D icons"
              stacked
              trailing={
                <SegmentedControl
                  label="Time of Day Preview"
                  value={settings.developer.timeOfDay}
                  options={timeOfDayOptions}
                  onChange={(timeOfDay) =>
                    updateSettings({ developer: { timeOfDay } })
                  }
                />
              }
            />
            <SettingRow
              title="Lesson Plan Image Source"
              description="Choose between Unsplash and Pexafy for Smart Visual Aid images in ILAW Lesson Plans"
              stacked
              trailing={
                <SegmentedControl
                  label="Lesson Plan Image Source"
                  value={settings.developer.lessonPlanImageSource}
                  options={imageSourceOptions}
                  onChange={(lessonPlanImageSource) =>
                    updateSettings({ developer: { lessonPlanImageSource } })
                  }
                />
              }
            />
            <SettingRow
              title="Image Source Provider"
              description="Choose between Unsplash and Pexafy for slide background and graphic image fetching"
              stacked
              trailing={
                <SegmentedControl
                  label="Image Source Provider"
                  value={settings.developer.imageSourceProvider}
                  options={imageSourceOptions}
                  onChange={(imageSourceProvider) =>
                    updateSettings({ developer: { imageSourceProvider } })
                  }
                />
              }
            />
            <SettingRow
              title="Simulate Generation Failure (10%)"
              description="Randomly fails 10% of generations to test client-side error handling"
              trailing={
                <Toggle
                  checked={settings.developer.simulateGenerationFailure}
                  label="Simulate Generation Failure (10%)"
                  onChange={(simulateGenerationFailure) =>
                    updateSettings({ developer: { simulateGenerationFailure } })
                  }
                />
              }
            />
            <SettingRow
              title="Force Next Generation to Fail"
              description="One-shot toggle that triggers a simulated error on the very next generation"
              trailing={
                <Toggle
                  checked={settings.developer.forceNextGenerationFailure}
                  label="Force Next Generation to Fail"
                  onChange={(forceNextGenerationFailure) =>
                    updateSettings({ developer: { forceNextGenerationFailure } })
                  }
                />
              }
            />
            <SettingRow
              title="Slow Generation (10s)"
              description="Extends generation delay to 10 seconds for thorough loading animation QA"
              trailing={
                <Toggle
                  checked={settings.developer.slowGeneration}
                  label="Slow Generation (10s)"
                  onChange={(slowGeneration) =>
                    updateSettings({ developer: { slowGeneration } })
                  }
                />
              }
            />
          </RowList>

          <GroupBand>Reset Account State</GroupBand>
          <RowList>
            <SettingRow
              title="Reset Credits to 0"
              description="Simulates depleted quota state for paywall tests"
              leadingIcon={SquareTerminal}
              trailing={
                <TextAction
                  label="Execute reset credits"
                  onClick={() =>
                    flash(
                      "developer",
                      "Credits reset to 0 for paywall testing.",
                    )
                  }
                >
                  Execute
                </TextAction>
              }
            />
            <SettingRow
              title="Reset Plan to Free"
              description="Downgrades active subscription to standard free tier"
              leadingIcon={SquareTerminal}
              trailing={
                <TextAction
                  label="Execute reset plan"
                  onClick={() =>
                    flash(
                      "developer",
                      "Plan downgraded to the free tier for testing.",
                    )
                  }
                >
                  Execute
                </TextAction>
              }
            />
            <SettingRow
              title="Refill & Reset Quotas"
              description="Restores 30 lesson bundles and 50 credits"
              leadingIcon={SquareTerminal}
              trailing={
                <TextAction
                  label="Refill and reset quotas"
                  onClick={() =>
                    flash(
                      "developer",
                      "30 lesson bundles and 50 credits restored.",
                    )
                  }
                >
                  Refill
                </TextAction>
              }
            />
          </RowList>

          {status?.section === "developer" ? (
            <p
              role="status"
              className="border-t border-line bg-panel px-5 py-3 text-[11.5px] leading-relaxed text-[#475569] sm:px-6"
            >
              {status.message}
            </p>
          ) : null}
        </SettingsCard>
      </section>

      {dialog === "grade" ? (
        <OptionPickerDialog
          onClose={closeDialog}
          mode="grade"
          value={profile.gradeLevel}
          onSelect={(gradeLevel) => persistProfilePreferences({ gradeLevel })}
        />
      ) : null}

      {dialog === "subject" ? (
        <OptionPickerDialog
          onClose={closeDialog}
          mode="subject"
          value={profile.subject}
          onSelect={(subject) => persistProfilePreferences({ subject })}
        />
      ) : null}

      {dialog === "delete" ? (
        <DeleteAccountDialog email={email} onClose={closeDialog} />
      ) : null}
    </main>
  );
}
