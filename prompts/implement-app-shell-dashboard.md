# Implementation Prompt: App Shell, Sidebar, and Dashboard

## Goal
Build the Kalabawi application shell and the dashboard page from the supplied desktop
screenshots (`Pasted Image.png`, `Pasted Image 2.png`, `Pasted Image 3.png`), using the
Kalabawi design system (`design/Kalabawi-design-system.png`) as the visual contract.

## Skills Read
- Repository instructions: `AGENTS.md`
- Design system reference: `design/Kalabawi-design-system.png`
- Existing design-system implementation in `components/design-system/*` (source for palette,
  Inter/Merriweather fonts, card radius, soft shadows, `ProgressRing`, and document chrome)

## Code Inspected
- `app/layout.tsx`: Inter + Merriweather via `next/font`, root metadata
- `app/page.tsx`: current `/` renders `DesignSystemBoard`
- `app/globals.css`: Tailwind 4 `@theme` tokens (`brand`, `navy`, `ink`, `muted`, `canvas`,
  `line`, status colors, `shadow-soft`)
- `components/design-system/*`: card/panel primitives, icon set, sidebar diagram, tokens
- `package.json`: Next 16 App Router, React 19, Tailwind 4, no icon dependency yet
- `next.config.ts`: `cacheComponents` and `partialPrefetching` enabled

## Decisions and Assumptions
- The dashboard is the main site. `/` renders the dashboard and `/dashboard` renders the same
  page so the canonical sidebar link works.
- The existing design-system showcase moves to `/design-system` unchanged.
- Desktop matches the screenshots exactly: 260px white sidebar, soft gray main canvas,
  centered ~752px content column, two-column plan/calendar region, full-width files and
  resources cards below.
- Mobile has no reference, so the sidebar becomes a slide-over drawer behind a 56px top bar,
  and the dashboard cards stack. Desktop stays pixel-faithful.
- Icons use `lucide-react` (already in the project stack) and local PNG assets
  (`logo-mark.png`, `mascot-empty.png`).
- The sidebar collapse control hides the sidebar on desktop and re-opens it from a floating
  button; on mobile it closes the drawer.
- Calendar is a small client component initialized to November 2026 with the 25th selected,
  matching the reference, with working month navigation.
- Data (teacher, quotas, files, resources) is static mock data; no auth, credits, API, or
  storage logic is introduced. Credit balances remain server-owned by design.
- Nav destinations outside the dashboard are inert controls until those routes exist, so no
  broken links ship. The dashboard entry is a real link with `aria-current`.

## Files Expected to Touch
- `app/layout.tsx` (metadata, unchanged fonts)
- `app/globals.css` (app shell palette tokens)
- `app/page.tsx` (render dashboard at `/`)
- `app/(app)/layout.tsx` (new app-shell layout)
- `app/(app)/dashboard/page.tsx` (new canonical dashboard route)
- `app/design-system/page.tsx` (moved showcase)
- `components/app-shell/app-shell.tsx` (new, client)
- `components/app-shell/sidebar.tsx` (new)
- `components/dashboard/*` (new: dashboard page, plan card, draft card, calendar, quote,
  recent files, resources)
- `prompts/implement-app-shell-dashboard.md` (this file)

## Requirements
1. Sidebar
   - Logo mark + Kalabawi wordmark, collapse control.
   - Search field with magnifier and ⌘K key hint.
   - Active Dashboard row, WORKSPACE label, Lesson Bundle card with `All-in-One` badge and
     `Plan + 5 PPTs + Exam` micro-copy.
   - INDIVIDUAL TOOLS (ILAW Lesson Plan, PPT from Lesson Plan, TOS & Exam), My Files,
     ACCOUNT (Subscription, Profile, Settings, Contact Us).
   - Pinned user footer: mascot avatar, Juan Dela Cruz, Pro badge,
     `0/30 batches · 79/80 individual`.
   - Mobile: off-canvas drawer with overlay, Escape/overlay close, body scroll lock.
2. Dashboard
   - Page title, subtitle, and hairline divider.
   - Greeting with coffee emoji, school/grade line, and three actions (Create Lesson Bundle,
     Upload ILAW Lesson Plan, Generate Individual Tool).
   - Pro Plan card: Active badge, Manage Subscription link, two usage rings
     (0% gray / 99% blue), Lesson Bundles and Individual Tools totals, quota reset line.
   - Unsaved draft card with Discard and Resume draft.
   - November 2026 calendar with the 25th highlighted, and the Aristotle quote card.
   - Recent Files card with five rows, lesson-plan badges, metadata, and view/download/more
     actions, including the wrapping GMRC row.
   - Useful DepEd Resources card with four two-column external links.
3. Design system adherence
   - Colors `#2563EB`, `#0F172A`, `#64748B`, `#E8EDF3`, `#F8FAFC`, status colors.
   - 16px card radius, 12px control radius, 4px spacing scale, soft diffused shadows.
   - Inter for UI; Merriweather italic for the quote.
   - Headings 32px/30px bold; body 13–14px; metadata 11–12px.
4. Responsiveness
   - No horizontal overflow at 390px, 768px, 1024px, 1440px.
   - Sidebar drawer on <1024px; content column centered above it.
   - Cards stack; action rows wrap; long filenames truncate with a wrapping badge.

## Security Considerations
- Presentation only. No secrets, credentials, network requests, cookies, or writes.
- External resource links use `target="_blank"` with `rel="noreferrer noopener"`.
- Credit/usage numbers are static display values; no browser-side mutation path is added.

## Acceptance Criteria
- `/` and `/dashboard` show the reference dashboard inside the app shell.
- Sidebar content, ordering, styling, and footer match the screenshot.
- Pro Plan, calendar, quote, draft, files, and resources cards match hierarchy and spacing.
- `/design-system` still renders the existing board.
- `npm run lint` and `npm run build` pass.
- Desktop and mobile screenshots show no clipping or overflow.

## Checks to Run
- `npm run lint`
- `npm run build`
- `npm run dev`, then visual review at 1440×900, 1024×768, 768×1024, and 390×844.

## Exact Manual Test Steps
1. Run `npm run dev` and open `http://localhost:3000`.
2. Confirm `/` shows the dashboard with the active Dashboard sidebar row.
3. Open `http://localhost:3000/dashboard`; confirm the same page renders.
4. Click the collapse control; confirm the sidebar hides and the floating re-open control works.
5. At <1024px, open the menu drawer, navigate to Dashboard, and confirm the drawer closes.
6. Resize to 390px and confirm cards stack, controls wrap, and no horizontal scrollbar appears.
7. Open `http://localhost:3000/design-system`; confirm the design-system board is unchanged.
