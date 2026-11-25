# Implementation Prompt: Settings & Preferences

## Goal
Build the **Settings & Preferences** main content from the five supplied
screenshots, using the Kalabawi design system
(`design/Kalabawi-design-system.png`) as the visual contract.

Screens covered: page header, Teaching Preferences (grade/subject pickers,
default output selection, interface language), Notifications, Export
Preferences, Data & Privacy, and Developer & Testing Tools.

## Skills Read
- Repository instructions: `AGENTS.md`
- Design system reference: `design/Kalabawi-design-system.png`
- Existing implementations: `components/profile/*`, `components/subscription/*`,
  `components/files/*`, `components/app-shell/*`

## Code Inspected
- `app/(app)/layout.tsx`: authenticated routes render inside `AppShell`
- `app/(app)/profile/page.tsx`: server route with `metadata` + `auth.protect()`
- `components/profile/profile-page.tsx`: page width, header, section labels,
  toggle, dialog wiring, `useSyncExternalStore` preference store
- `components/profile/profile-dialogs.tsx`: `OptionPickerDialog` (reused)
- `components/profile/profile-data.ts`: grade/subject options, profile store,
  storage keys
- `components/app-shell/sidebar.tsx`: Settings account row has no `href`
- `components/subscription/subscription-page.tsx`, `components/files/my-files-page.tsx`:
  `ds-card`, `max-w-[896px]`, inset dividers, section rhythm
- `app/globals.css`: Tailwind 4 tokens (`brand`, `ink`, `muted`, `line`, `wash`,
  `panel`, `shadow-soft`)

## Decisions and Assumptions
- Route is `/settings` inside the `(app)` group. The route is a server component
  (`metadata` + `auth.protect()`) rendering one client composition.
- Content uses `max-w-[896px] px-5 sm:px-6`, matching Subscription, Profile, and
  My Files.
- Layout measured against the screenshots: cards are 16px radius with 20px
  vertical padding, rows use 16px vertical padding inside a 24px-inset list
  (44px content inset on desktop, 32px on mobile), rows are separated by hairline
  dividers inset 24px, and group bands are inset 24px with `bg-panel`, 15px
  vertical padding, and 20px horizontal padding.
- Grade/subject values are vertically centered against the row copy, matching
  the reference; on mobile the value moves under the description so the copy is
  never squeezed.
- Default grade level and default subject share the existing profile preference
  store, so Profile and Settings stay in sync. Both open the existing
  `OptionPickerDialog`. No duplicate picker is created.
- Settings-specific state (outputs, language, notifications, export format,
  declaration, developer tools) lives in a new
  `kalabawi.settings.preferences` `localStorage` store using the same
  `useSyncExternalStore` pattern as the profile store. No server or credit
  writes.
- Defaults mirror the reference: all three outputs on, English, all
  notifications on, Word (.docx), teacher declaration on, Real Time preview,
  Pexafy for both image sources, all simulation toggles off.
- "Download My Data" downloads a local JSON export of the stored profile and
  settings (no fake generation history).
- "Delete Account" opens a confirmation dialog; confirming records a deletion
  request and tells the teacher a secure confirmation link was sent to their
  email. No user is deleted client-side.
- Developer reset commands are UI test harness actions; each shows a transient
  inline status line at the bottom of the developer card instead of silently
  doing nothing.
- Segmented controls are radio groups with roving focus and arrow-key support.
- "Settings" is added to the sidebar as a link so the row highlights on
  `/settings`.
- No new dependencies.

## Files Expected to Touch
- `prompts/implement-settings-page.md` (this file)
- `components/settings/settings-data.ts` (new: types, defaults, store, export)
- `components/settings/settings-controls.tsx` (new: card, section heading, group
  band, row, toggle, segmented control, check)
- `components/settings/settings-dialogs.tsx` (new: delete account dialog)
- `components/settings/settings-page.tsx` (new: client composition)
- `app/(app)/settings/page.tsx` (new route)
- `components/app-shell/sidebar.tsx` (Settings link + active state)

## Requirements
1. Header: "Settings & Preferences" 30/32px bold, subtitle "Configure your
   classroom defaults, output formats, notification alerts, and data privacy
   options.", hairline divider.
2. Section headings are 10.5px bold uppercase, 0.14em tracking, `#94a3b8`, with
   a 40px block gap; cards use `ds-card` with a 10px label gap.
3. Teaching Preferences:
   - Row: "Default Grade Level" / "Primary grade level applied when generating
     lesson bundles", right value + chevron; opens the grade picker.
   - Row: "Default Subject" / "Learning area automatically selected for new
     curriculum content", right value + chevron; opens the subject picker.
   - Inset `bg-panel` group band "DEFAULT OUTPUT SELECTION".
   - Three multi-select rows (ILAW Lesson Plan, Slide Deck (PPT), TOS & Exam)
     with the reference descriptions and a blue check when enabled.
   - Group band "INTERFACE LANGUAGE" with English/Filipino single-select rows and
     the reference descriptions; blue check on the active one.
4. Notifications: three toggle rows (Generation Complete, Quota Running Low,
   Subscription Renewal) with the reference copy. Toggles are 40x22
   `role="switch"` controls (`brand` on, `#cbd5e1` off).
5. Export Preferences: group band "DEFAULT FORMAT" with Word (.docx) and PDF
   (.pdf) single-select check rows; group band "COMPLIANCE & FOOTNOTES" with the
   Teacher Review Declaration toggle.
6. Data & Privacy: "Download My Data" row with chevron (downloads JSON), and a
   red "Delete Account" row with a red trash icon that opens the confirmation
   dialog.
7. Developer & Testing Tools:
   - Time of Day Preview segmented control: Real Time / Morning / Afternoon /
     Evening.
   - Lesson Plan Image Source and Image Source Provider segmented controls:
     Unsplash / Pexafy.
   - Three simulation toggles, off by default.
   - Group band "RESET ACCOUNT STATE" with three rows, each prefixed by a muted
     terminal glyph and a right-aligned blue text action: Execute, Execute,
     Refill.
   - Reset actions show a transient status line at the card bottom.
8. Responsive: single column down to 390px with no horizontal overflow; rows
   stack the segmented control under the copy below `sm`; long values truncate.
9. Accessibility: labelled dialogs with `aria-modal`, Escape/overlay/X close,
   focus trap and restore, body scroll lock, `role="switch"` + `aria-checked`,
   `aria-pressed` on selectable rows, labelled segmented radio groups, visible
   focus rings, `aria-current` on the sidebar link.

## Security Considerations
- No secrets, API keys, credit writes, or network calls.
- All preferences are browser-only `localStorage`; account identity stays with
  Clerk.
- The data export contains only the profile and settings already stored in the
  browser. Account deletion is not performed client-side.

## Acceptance Criteria
- `/settings` renders in the app shell and matches the reference hierarchy,
  spacing, typography, and colors.
- Grade/subject values match Profile and update there too.
- Output, language, notification, export, declaration, and developer controls
  update immediately and survive a reload.
- Segmented controls work with mouse and keyboard.
- Download triggers a real JSON file.
- Delete Account dialog opens, closes accessibly, and shows the request state.
- Settings is highlighted in the sidebar on `/settings`.
- `npm run lint` and `npm run build` pass.

## Checks to Run
- `npm run lint`
- `npm run build`

## Exact Manual Test Steps
1. `npm run dev`, sign in, open `http://localhost:3000/settings`.
2. Confirm the header and all five sections render in order.
3. Change Default Grade Level and Default Subject; open `/profile` and confirm
   the same values.
4. Toggle outputs off/on, switch the interface language, flip notifications,
   choose PDF, and turn off the declaration; reload and confirm persistence.
5. Open Developer & Testing Tools; change the time-of-day and image-source
   segments; reload and confirm persistence.
6. Click Execute/Refill; confirm the status line appears and clears.
7. Click Download My Data; confirm `kalabawi-export-*.json` downloads.
8. Click Delete Account; press Escape and confirm focus returns; reopen and
   confirm the request state.
9. Resize to 390px; confirm no horizontal overflow and stacked segmented
   controls.
