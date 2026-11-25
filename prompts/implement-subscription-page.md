# Implementation Prompt: Subscription & Plan

## Goal
Build the **Subscription & Plan** main content from the six supplied desktop
screenshots, using the Kalabawi design system (`design/Kalabawi-design-system.png`)
as the visual contract.

Screens covered: page header, current-plan card with dual quota rings, the
2×2 available-plans grid (Free, Starter, Pro, School), the Credit Top-Ups card,
the billing footer notes, and the right-side "Manage Subscription" drawer with
payment method, invoice history, and update-payment action.

## Skills Read
- Repository instructions: `AGENTS.md`
- Design system reference: `design/Kalabawi-design-system.png`
- Existing design-system implementation: `components/design-system/*`
- Dashboard/file implementations for spacing, typography, and card language

## Code Inspected
- `app/(app)/layout.tsx`: authenticated routes render inside `AppShell`
- `app/(app)/dashboard/page.tsx`, `app/(app)/files/page.tsx`: server route pattern
  with `metadata` and `auth.protect()`
- `components/app-shell/sidebar.tsx`: account rows are inert buttons; no link yet
- `components/dashboard/pro-plan-card.tsx`, `usage-ring.tsx`: quota ring pattern
- `components/dashboard/dashboard-page.tsx`, `components/files/my-files-page.tsx`:
  page width, header, section-heading, and button conventions
- `app/globals.css`: Tailwind 4 tokens (`brand`, `ink`, `muted`, `line`, `wash`,
  `panel`, `shadow-soft`)
- `next.config.ts`: Next 16.4 App Router with `cacheComponents`

## Decisions and Assumptions
- Route is `/subscription` inside the `(app)` group, so it inherits the sidebar
  shell. The page is a server component (`metadata` + `auth.protect()`) rendering
  one client component (the drawer needs open/close state).
- Main content width is ~848px (max-w-[896px] + px-6), matching the reference card
  width and the existing My Files page rhythm.
- Local mock data only, mirroring the screenshots: Free plan active, 0/2 bundle
  credits, 80/80 individual credits, Nov 28 2026 reset, Starter ₱279, Pro ₱449,
  School "Custom", top-ups ₱199/₱149/₱219, and three invoices.
- Billing actions (upgrade, buy credits, contact sales, update payment method,
  receipts) are presentation-only until server billing routes exist. No browser
  writes of credit balances.
- The Manage Subscription drawer is in-page state, not a route. It overlays and
  blurs the page, locks body scroll, closes on Escape/overlay/X, and restores
  focus to the trigger.
- Quota rings reuse the dashboard ring geometry at a larger 104px size, plus a
  92px mobile variant.
- The sidebar "Subscription" row becomes a real link with active styling.
  The dashboard "Manage Subscription" action links to the new page.
- No new dependencies.

## Files Expected to Touch
- `prompts/implement-subscription-page.md` (this file)
- `components/subscription/subscription-data.ts` (new: plans, quotas, top-ups,
  invoices, payment method)
- `components/subscription/quota-ring.tsx` (new: large usage ring)
- `components/subscription/plan-card.tsx` (new)
- `components/subscription/credit-top-ups.tsx` (new)
- `components/subscription/manage-subscription-drawer.tsx` (new)
- `components/subscription/subscription-page.tsx` (new: client composition)
- `app/(app)/subscription/page.tsx` (new route)
- `components/app-shell/sidebar.tsx` (Subscription link + active state)
- `components/dashboard/pro-plan-card.tsx` (Manage Subscription → `/subscription`)

## Requirements
1. Header: "Subscription & Plan" 30/32px bold, subtitle "Review your monthly plan
   usage, top up credits, and manage billing settings.", hairline divider.
2. Current plan card:
   - "Free Plan" 20px bold with a green Active pill; "Free tier account · Cancel
     anytime on paid upgrades" below; "Manage Subscription" outline button right.
   - Hairline divider, then a panel (`bg-panel`, 12px radius) with two centered
     quota rings: 0% Lesson Bundles (0 used · 2 remaining) and 100% Individual
     Tools (80 used · 0 remaining).
   - Panel footer: calendar icon + "Quotas reset on Nov 28, 2026".
3. Available Plans: 15px bold heading + muted subtitle, 2-column grid (24px gap,
   1 column on mobile). Each card: title, optional pill, large price + period,
   description, divider, check list, footer button + shield note.
   - Free: gray checks, disabled "Current Plan", "No credit card required ·
     Instant access".
   - Starter: blue border, "Popular" pill, blue checks, outline "Upgrade to
     Starter", "Cancel anytime · 100% MATATAG Compliant".
   - Pro: "Full Access" pill, blue checks, filled "Upgrade to Pro".
   - School: "Institution" pill, "Custom" price, gray checks, outline "Contact
     Sales", "Dedicated onboarding · Custom billing".
   - Cards in a row share height with footers bottom-aligned.
4. Credit Top-Ups: heading + subtitle, white card with three row cards (icon tile,
   title, optional "Best Value" pill, subtitle, price, Buy Credits button). The
   Combined Pack row has a blue border and a filled button. Below the card:
   centered "Start free, upgrade anytime. No lock-in contracts. Explore free
   features →" and the GCash/Maya/debit-card payment line with a shield icon.
5. Manage Subscription drawer: 461px right sheet, dimmed/blurred backdrop.
   Header, primary payment method row with green Active, three invoice rows
   (name, date, Paid + reference, Receipt link), footer "Update Payment Method"
   and "Need to pause or cancel? Contact help@kalabawi.ph anytime."
6. Responsive: no horizontal overflow at 390px; plan grid collapses to one
   column; drawer becomes full width; top-up rows wrap actions below text.
7. Accessibility: `aria-current` on the sidebar link, `role="dialog"`,
   `aria-modal`, labelled drawer title, Escape/overlay close, focus restore,
   `inert` while closed, focus rings, labelled icon-only buttons.
8. Preserve existing dashboard and files behavior.

## Security Considerations
- Presentation only: no credit-balance writes, payment data, cookies, or network
  calls. Mock invoices contain no real account data.
- Payment method is masked mock data ("GCash ···· 0917").
- All future billing mutations must stay server-side; this page only renders.

## Acceptance Criteria
- `/subscription` renders inside the app shell and matches the reference
  hierarchy, spacing, typography, and colors.
- Free plan is active; quota rings show 0% and 100% with correct copy.
- All four plan cards and three top-up rows show the reference copy and states.
- Manage Subscription opens the drawer; Escape, overlay, and X close it; focus
  returns to the trigger; body scroll is locked while open.
- Subscription is highlighted in the sidebar on `/subscription`.
- `npm run lint` and `npm run build` pass.

## Checks to Run
- `npm run lint`
- `npm run build`
- `npm run dev` and visual review at 1440×900, 1024×768, 768×1024, 390×844.

## Exact Manual Test Steps
1. `npm run dev`, sign in, and open `http://localhost:3000/subscription`.
2. Confirm the header, current-plan card, 0%/100% rings, and reset date.
3. Confirm the four plan cards: Free disabled, Starter highlighted with Popular,
   Pro with blue CTA, School with Custom pricing.
4. Confirm the three top-up rows and that Combined Pack is highlighted.
5. Click **Manage Subscription**; confirm the sheet slides in, the page blurs,
   payment method and three invoices appear.
6. Press Escape; confirm the sheet closes and focus returns to the button.
   Repeat with the overlay click and the X button.
7. Scroll the main page while the drawer is open; confirm the body does not scroll.
8. Resize to 390px; confirm one plan column, wrapped top-up actions, full-width
   drawer, and no horizontal overflow.
