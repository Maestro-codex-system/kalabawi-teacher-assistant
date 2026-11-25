# Implementation Prompt: My Files (Library)

## Goal
Build the **My Files** page from the eight supplied desktop screenshots, using the
Kalabawi design system (`design/Kalabawi-design-system.png`) as the visual contract.

Screens covered: the library root (folders + recent files), the folder views
(All Files, Lesson Plans, PPT Decks, TOS & Exams), breadcrumb navigation, per-folder
search, and the dismissible "Heads up" retention banner.

## Skills Read
- Repository instructions: `AGENTS.md`
- Design system reference: `design/Kalabawi-design-system.png`
- Existing design-system implementation: `components/design-system/*` (palette, Inter,
  card radius, soft shadows, iconography)

## Code Inspected
- `app/(app)/layout.tsx`: every authenticated route renders inside `AppShell`
- `app/(app)/dashboard/page.tsx`, `app/(app)/page.tsx`: server page pattern with
  `auth.protect()` and `metadata`
- `components/app-shell/sidebar.tsx`: nav rows are inert buttons; My Files is not a link
- `components/dashboard/recent-files.tsx`: existing file-row visual language
- `app/globals.css`: Tailwind 4 `@theme` tokens (`brand`, `ink`, `muted`, `line`, `wash`,
  `shadow-soft`, status colors)
- `next.config.ts`: Next 16.4 App Router, `cacheComponents`
- `node_modules/next/dist/docs/01-app/...`: server/client boundary, metadata, `usePathname`

## Decisions and Assumptions
- Route is `/files` inside the `(app)` group, so it inherits the sidebar shell. The page is
  a server component (`metadata` + `auth.protect()`) rendering one client component for the
  interactive library.
- Folder navigation is in-page state, not routing. This matches the screenshots (breadcrumb
  "Back to Folders"), keeps URLs stable, and avoids deep-linking requirements that were not
  part of the request.
- Local mock data only, as in the dashboard. Counts shown on the folder tiles follow the
  screenshots (104 / 96 / 7 / 2); the file lists are representative mock rows.
- Folder art is a native SVG component (`FolderGlyph`) with layered gradients and a soft
  shadow, because no folder PNG assets exist in `public/`. No external image APIs.
- Sort control is a real menu (Newest, Oldest, Name A–Z) that re-orders the visible list.
- Search filters the current folder by file name and subject; placeholder copy changes per
  folder, matching the screenshots.
- "Select" enters a selection mode with row checkboxes and a selected count. No destructive
  or download action is faked, since no real files exist.
- File actions (view / download / more) stay accessible buttons with no side effects, exactly
  like the dashboard's recent-files rows.
- The sidebar "My Files" row becomes a real link with `aria-current`, and Dashboard gets
  active styling on `/` and `/dashboard`.
- Empty search results reuse the design-system mascot empty state.

## Files Expected to Touch
- `prompts/implement-my-files.md` (this file)
- `components/files/files-data.ts` (new: types + mock files + folder metadata)
- `components/files/folder-glyph.tsx` (new: vector folder artwork)
- `components/files/file-row.tsx` (new: list row with badge, metadata, actions)
- `components/files/my-files-page.tsx` (new: client page composition + state)
- `app/(app)/files/page.tsx` (new route)
- `components/app-shell/sidebar.tsx` (link + active state)
- `components/dashboard/recent-files.tsx` (View all → `/files`)

## Requirements
1. Page header: "My Files" 30/32px bold, subtitle "All your generated lesson plans, PPTs,
   and TOS.", hairline divider.
2. Retention banner: white card, info glyph, bold "Heads up:", full retention copy, dismiss X.
3. Search row: rounded white search field (max ~442px) with folder-aware placeholder, and a
   sort control (`ListFilter` + current sort) flush right.
4. Folders: uppercase "FOLDERS" label and four glossy vector folders (gray, blue, orange,
   green) with label + file count, two columns on mobile, four on desktop.
5. Library list:
   - Root: "RECENT FILES" label with "View All (104)" link.
   - Folder: breadcrumb row (`‹ Back to Folders / glyph + name (count)`) with `Select`/`Done`.
   - Rows: kind-tinted icon tile, file name, kind badge (hidden inside a filtered folder),
     metadata (`date · size · grade`), view/download/more actions.
   - Hover highlight, hairline separators, no rounded row corners.
6. Kind styling: Lesson Plan = blue, PPT = orange, TOS = green (tile, icon, badge).
7. Responsive: no horizontal overflow at 390px; rows keep actions visible; long Filipino
   file names wrap instead of clipping.
8. Accessibility: `aria-current` on the sidebar link, labelled search input, `aria-pressed`
   folder buttons, `aria-haspopup`/`aria-expanded` on sort, labelled icon buttons, focus
   rings on every control.

## Security Considerations
- Presentation only: no uploads, deletes, network calls, cookies, or storage writes.
- Mock data is static and contains no personal or DepEd-identifying information beyond the
  screenshot copy.
- Credit/quota values remain server-owned; this page introduces none.

## Acceptance Criteria
- `/files` renders the library inside the app shell and matches the reference hierarchy,
  spacing, typography, and colors.
- Opening each folder shows its own count, placeholder, breadcrumb glyph, and filtered rows.
- Search, sort, banner dismissal, folder navigation, and selection mode all work.
- My Files is highlighted in the sidebar on `/files`; Dashboard is highlighted elsewhere.
- `npm run lint` and `npm run build` pass.

## Checks to Run
- `npm run lint`
- `npm run build`
- `npm run dev` and visual review at 1440×900, 1024×768, 768×1024, 390×844.

## Exact Manual Test Steps
1. `npm run dev`, sign in, open `http://localhost:3000/files`.
2. Confirm header, banner, search, four folders, and six recent files match the reference.
3. Dismiss the banner with the X; confirm it disappears and the layout does not shift.
4. Click **Lesson Plans**; confirm the breadcrumb, blue folder glyph, "(96)" count, placeholder
   "Search in Lesson Plans...", and badge-free rows.
5. Type "gmrc" in the search field; confirm only GMRC rows remain; type gibberish and confirm
   the mascot empty state appears.
6. Open the sort menu, pick **Oldest**, confirm the row order flips; pick **Name (A–Z)**.
7. Click **View All (104)** on the root; confirm the All Files folder opens with mixed kinds.
8. Click **Select**, tick two rows, confirm the count updates, then **Done** exits the mode.
9. Resize to 390px; confirm folders reflow to two columns and nothing overflows horizontally.
