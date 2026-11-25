"use client";

import Image from "next/image";
import { useCallback, useState, useSyncExternalStore } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  BookOpen,
  Camera,
  ChevronRight,
  Cog,
  GraduationCap,
  LogOut,
  Pencil,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { EditProfileDialog, OptionPickerDialog } from "./profile-dialogs";
import {
  getProfileServerSnapshot,
  getProfileSnapshot,
  persistProfilePreferences,
  subscribeProfile,
  type ProfilePreferences,
} from "./profile-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2";

const iconTile =
  "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf2ff] text-brand";

type DialogId = "edit" | "grade" | "subject" | null;

type PreferenceRowProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  onClick: () => void;
};

function PreferenceRow({
  icon: Icon,
  label,
  value,
  onClick,
}: PreferenceRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className={`group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-[#f8fafc] sm:px-6 sm:py-[18px] ${focusRing}`}
    >
      <span aria-hidden="true" className={iconTile}>
        <Icon size={17} strokeWidth={1.9} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-ink">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[12px] text-muted sm:hidden">
          {value}
        </span>
      </span>
      <span className="hidden shrink-0 text-[12px] text-muted sm:block sm:text-[13px]">
        {value}
      </span>
      <ChevronRight
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0 text-[#94a3b8] transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
}

function SectionLabel({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]"
    >
      {children}
    </h2>
  );
}

export function ProfilePage() {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  const [dialog, setDialog] = useState<DialogId>(null);
  const preferences = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getProfileServerSnapshot,
  );

  const closeDialog = useCallback(() => setDialog(null), []);

  const email =
    user?.primaryEmailAddress?.emailAddress ?? "juan.delacruz@gmail.com";

  const displayName =
    preferences.fullName ||
    user?.fullName ||
    user?.username ||
    "Juan Dela Cruz";

  function updatePreferences(patch: Partial<ProfilePreferences>) {
    persistProfilePreferences(patch);
  }

  return (
    <main className="mx-auto w-full max-w-[896px] px-5 pb-16 pt-6 sm:px-6 lg:pt-7">
      <header className="border-b border-line pb-6">
        <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]">
          Teacher Profile
        </h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          Manage your account identity, school assignment, and classroom
          preferences.
        </p>
      </header>

      <section
        aria-labelledby="profile-identity-heading"
        className="mt-8 flex flex-col items-center text-center"
      >
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -inset-4 rounded-full bg-[radial-gradient(circle_at_center,#edf4ff_0%,rgba(248,250,252,0)_72%)]"
          />
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-[#eef2f7] shadow-[0_18px_36px_-24px_rgba(15,23,42,0.5)] ring-1 ring-[#eef2f7] sm:h-32 sm:w-32">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt=""
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src="/mascot-empty.png"
                alt=""
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => openUserProfile()}
            aria-label="Change profile photo"
            className={`absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full border-[3px] border-white bg-brand text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,0.9)] transition-colors hover:bg-[#1d4ed8] ${focusRing}`}
          >
            <Camera size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <h2
          id="profile-identity-heading"
          className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-[30px]"
        >
          {displayName}
        </h2>
        <p className="mt-1 max-w-full truncate text-[13px] text-muted">
          {email}
        </p>
        <p className="mt-2.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[13px]">
          {preferences.school ? (
            <span className="font-medium text-[#334155]">
              {preferences.school}
            </span>
          ) : null}
          {preferences.school && preferences.division ? (
            <span aria-hidden="true" className="text-[#cbd5e1]">
              &middot;
            </span>
          ) : null}
          {preferences.division ? (
            <span className="text-muted">{preferences.division}</span>
          ) : null}
        </p>

        <button
          type="button"
          onClick={() => setDialog("edit")}
          aria-haspopup="dialog"
          className={`mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-full border border-line bg-white px-4 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:bg-canvas ${focusRing}`}
        >
          <Pencil size={14} strokeWidth={2} aria-hidden="true" />
          Edit Profile
        </button>
      </section>

      <section aria-labelledby="teaching-preferences-heading" className="mt-12">
        <SectionLabel id="teaching-preferences-heading">
          Teaching Preferences
        </SectionLabel>

        <div className="ds-card mt-2.5 overflow-hidden">
          <div className="divide-y divide-line">
            <PreferenceRow
              icon={GraduationCap}
              label="Default Grade Level"
              value={preferences.gradeLevel}
              onClick={() => setDialog("grade")}
            />
            <PreferenceRow
              icon={BookOpen}
              label="Default Subject"
              value={preferences.subject}
              onClick={() => setDialog("subject")}
            />

            <div className="flex items-start gap-3 px-4 py-4 sm:px-6 sm:py-[18px]">
              <span aria-hidden="true" className={iconTile}>
                <Cog size={17} strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold leading-snug text-ink">
                  Auto-fill lesson bundles
                </p>
                <p className="mt-1 text-[11.5px] leading-[1.6] text-muted">
                  Automatically pre-populates your default grade and subject
                  when generating materials.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.autoFill}
                aria-label="Auto-fill lesson bundles"
                onClick={() =>
                  updatePreferences({ autoFill: !preferences.autoFill })
                }
                className={`relative mt-0.5 inline-flex h-[22px] w-10 shrink-0 items-center rounded-full transition-colors ${focusRing} ${
                  preferences.autoFill ? "bg-brand" : "bg-[#cbd5e1]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.25)] transition-transform ${
                    preferences.autoFill ? "translate-x-[20px]" : "translate-x-[2px]"
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="border-t border-line bg-panel px-4 py-3.5 text-[11.5px] text-muted sm:px-6">
            Preferences save automatically.
          </p>
        </div>
      </section>

      <section aria-labelledby="account-heading" className="mt-12">
        <SectionLabel id="account-heading">Account</SectionLabel>

        <div className="ds-card mt-2.5 overflow-hidden">
          <button
            type="button"
            onClick={() => openUserProfile()}
            className={`group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-[#f8fafc] sm:px-6 sm:py-[18px] ${focusRing}`}
          >
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f4f7fa] text-[#64748b]"
            >
              <UserRound size={17} strokeWidth={1.9} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold leading-snug text-ink">
                Switch Account
              </span>
              <span className="mt-0.5 block truncate text-[11.5px] text-muted">
                Current: {email}
              </span>
            </span>
            <ChevronRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="shrink-0 text-[#94a3b8] transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button
            type="button"
            onClick={() => void signOut({ redirectUrl: "/sign-in" })}
            className={`group flex w-full items-center gap-3 border-t border-line px-4 py-4 text-left transition-colors hover:bg-[#fef5f5] sm:px-6 sm:py-[18px] ${focusRing}`}
          >
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fef2f2] text-[#ef4444]"
            >
              <LogOut size={17} strokeWidth={1.9} />
            </span>
            <span className="min-w-0 flex-1 text-[14px] font-semibold text-[#dc2626]">
              Log Out
            </span>
            <ChevronRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="shrink-0 text-[#f87171] transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </section>

      {dialog === "edit" ? (
        <EditProfileDialog
          onClose={closeDialog}
          email={email}
          initialFullName={displayName}
          initialSchool={preferences.school}
          initialDivision={preferences.division}
          onSave={(values) => {
            updatePreferences(values);
            closeDialog();
          }}
        />
      ) : null}

      {dialog === "grade" ? (
        <OptionPickerDialog
          onClose={closeDialog}
          mode="grade"
          value={preferences.gradeLevel}
          onSelect={(gradeLevel) => updatePreferences({ gradeLevel })}
        />
      ) : null}

      {dialog === "subject" ? (
        <OptionPickerDialog
          onClose={closeDialog}
          mode="subject"
          value={preferences.subject}
          onSelect={(subject) => updatePreferences({ subject })}
        />
      ) : null}
    </main>
  );
}
