# Implementation Prompt: Teacher Profile

## Goal
Build the **Teacher Profile** main content from the eight supplied screenshots,
using the Kalabawi design system (`design/Kalabawi-design-system.png`) as the
visual contract.

Screens covered: page header, centered avatar/identity block, Teaching
Preferences card (default grade, default subject, auto-fill toggle, save note),
Account card (switch account, log out), Edit Profile dialog, Default Grade Level
picker, and Default Subject picker.

## Skills Read
- Repository instructions: `AGENTS.md`
- Design system reference: `design/Kalabawi-design-system.png`
- Existing design-system implementation: `components/design-system/*`
- Subscription / My Files implementations for page width, header, card, dialog,
  and accessibility conventions

## Code Inspected
- `app/(app)/layout.tsx`: authenticated routes render inside `AppShell`
- `app/(app)/subscription/page.tsx`, `app/(app)/files/page.tsx`: server route
  pattern with `metadata` and `auth.protect()`
- `components/app-shell/sidebar.tsx`: account rows are inert buttons; Profile has
  no link yet
- `components/subscription/subscription-page.tsx`: page header, `ds-card`,
  `max-w-[896px]` rhythm
- `components/subscription/manage-subscription-drawer.tsx`: overlay, Escape
  close, body scroll lock, focus trap/restore, `inert` pattern
- `components/contact/contact-page.tsx`: field styling, inline validation, modal
  copy tone
- `app/globals.css`: Tailwind 4 tokens (`brand`, `ink`, `muted`, `line`, `wash`,
  `panel`, `shadow-soft`)
- `components/app-shell/app-shell.tsx`, `next.config.ts`: shell offsets and image
  domains

## Decisions and Assumptions
- Route is `/profile` inside the `(app)` group, so it inherits the sidebar shell.
  The page is a server component (`metadata` + `auth.protect()`) rendering one
  client composition.
- Content width is `max-w-[896px]` + `px-6`, matching Subscription, Contact, and
  My Files.
- Identity comes from Clerk where available (`fullName`, `primaryEmailAddress`,
  `imageUrl`), falling back to the reference account (`Juan Dela Cruz`,
  `juan.delacruz@gmail.com`) and the mascot avatar. School and division are mock
  defaults (`Rizal High School`, `Pasig City, National Capital Region (NCR)`).
- Preferences (name override, school, division, grade, subject, auto-fill) are
  local UI state persisted to `localStorage` under `kalabawi.profile.preferences`,
  matching the "Preferences save automatically." copy. No database or credit
  writes; no network calls.
- The camera button and "Switch Account" open Clerk's account modal
  (`openUserProfile`), which owns photo and account changes.
- "Log Out" uses Clerk `signOut` with a `/sign-in` redirect (same destination as
  the sidebar `SignOutButton`).
- Grade options: Grade 1-6 (Key Stage 1/2), Grade 7-10 (Junior High), Grade 11-12
  (Senior High). Subject options match the reference list plus EPP/TLE and
  GMRC/Values Education.
- Option pickers apply immediately (no save button), consistent with the
  auto-save note; they stay open until Close/Escape/overlay.
- No new dependencies.

## Files Expected to Touch
- `prompts/implement-profile-page.md` (this file)
- `components/profile/profile-data.ts` (new: options, defaults, storage helpers)
- `components/profile/profile-dialogs.tsx` (new: dialog shell, edit dialog,
  option picker)
- `components/profile/profile-page.tsx` (new: client composition)
- `app/(app)/profile/page.tsx` (new route)
- `components/app-shell/sidebar.tsx` (Profile link + active state)

## Requirements
1. Header: "Teacher Profile" 30/32px bold, subtitle "Manage your account
   identity, school assignment, and classroom preferences.", hairline divider.
2. Identity block, centered:
   - 128px circular avatar (Clerk photo or mascot fallback) with soft glow and a
     36px blue camera button with white ring at the bottom-right.
   - Name 30px bold; email 13px muted; "School · Division & Region" line with the
     school in dark ink and location muted.
   - "Edit Profile" pill button (white, hairline border, soft shadow, pencil
     icon) opening the Edit Profile dialog.
3. Teaching Preferences:
   - Uppercase 10.5px label, 14px bold card with 16px radius and soft shadow.
   - Row 1: graduation-cap icon in a 36px light-blue circle, "Default Grade
     Level", right value + chevron; opens the grade picker.
   - Row 2: book icon, "Default Subject", right value + chevron; opens the
     subject picker.
   - Row 3: gear icon, "Auto-fill lesson bundles" with the subtitle
     "Automatically pre-populates your default grade and subject when generating
     materials.", `role="switch"` toggle (40×22) on the right.
   - Footer strip on `bg-panel`: "Preferences save automatically."
4. Account:
   - "Switch Account" with a muted user icon circle, title, "Current: <email>"
     subtitle, chevron.
   - "Log Out" in red with a red logout icon and red chevron.
5. Edit Profile dialog: 446px max width, 16px radius, blurred/dimmed backdrop.
   Title + X, description "Update your identity and school affiliation for
   exported materials.", fields Full Name, School Name, Division & Region, the
   Google-email helper note, and a `bg-panel` footer with Cancel + Save Changes.
   Inline (non-blocking) validation for empty name/school.
6. Grade/Subject pickers: 446px max width, title + X, matching description,
   thin-scrollable 38px option rows, selected row in light blue with brand text
   and a check, `bg-panel` footer with Close.
7. Responsive: single column, no horizontal overflow at 390px; dialogs become
   viewport-width minus 32px; long values truncate rather than collide.
8. Accessibility: labelled dialogs, `aria-modal`, Escape/overlay/X close, focus
   trap, focus restore, body scroll lock, `inert` while closed, focus rings,
   `role="switch"` + `aria-checked`, `aria-current` on the sidebar link.

## Security Considerations
- No secrets, no Gemini keys, no credit/database writes, no network calls.
- Preferences persist only in the browser via `localStorage`; account identity
  changes are delegated to Clerk's own modal.
- Sign-out uses Clerk; nothing is written to the database from the browser.

## Acceptance Criteria
- `/profile` renders inside the app shell and matches the reference hierarchy,
  spacing, typography, and colors.
- Avatar, camera affordance, identity lines, and Edit Profile match.
- Teaching Preferences rows show the persisted values and the toggle works.
- Account rows open Clerk's modal / sign out respectively.
- All three dialogs open, close via Escape, overlay, and X, trap focus, and
  restore focus; grade/subject selections update the rows immediately.
- Preferences survive a reload.
- Profile is highlighted in the sidebar on `/profile`.
- `npm run lint` and `npm run build` pass.

## Checks to Run
- `npm run lint`
- `npm run build`

## Exact Manual Test Steps
1. `npm run dev`, sign in, and open `http://localhost:3000/profile`.
2. Confirm the header, avatar, name/email/school lines, and Edit Profile button.
3. Click **Edit Profile**; change the name and school; Save. Confirm the
   identity block updates and the values survive a page reload.
4. Click **Default Grade Level**; pick Grade 8; close. Confirm the row value.
5. Click **Default Subject**; pick Science; close. Confirm the row value.
6. Toggle **Auto-fill lesson bundles** off and reload; confirm it stays off.
7. Click the camera button; confirm Clerk's account modal opens. Repeat with
   **Switch Account**.
8. Press Escape on a dialog; confirm it closes and focus returns to the row.
9. Resize to 390px; confirm rows stay readable, dialogs fit, and there is no
   horizontal overflow.
