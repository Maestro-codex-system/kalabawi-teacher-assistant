# Implementation Prompt: Contact Us — Help & Support

## Goal
Build the **Contact Us / Help & Support** page from the eight supplied desktop
screenshots, using the Kalabawi design system (`design/Kalabawi-design-system.png`)
as the visual contract.

Screens covered: page header, hero with support mascot and two contact CTAs, the
two-column "Send an Inquiry or Ticket" card with the live **Support Preview** panel
(`Ready to Listen`, `Bug Investigation`, `Billing & Credits`, `Teacher Wishlist`,
`General Inquiry`), and the FAQ accordion.

## Skills Read
- Repository instructions: `AGENTS.md`
- Design system reference: `design/Kalabawi-design-system.png`
- Existing implementation: `components/design-system/*` (palette, Inter, 16px card
  radius, soft shadows, iOS-style focus rings)

## Code Inspected
- `app/(app)/layout.tsx`: authenticated pages render inside `AppShell`
- `app/(app)/files/page.tsx`, `app/(app)/subscription/page.tsx`: server route pattern
  with `metadata` + `auth.protect()`
- `components/app-shell/sidebar.tsx`: "Contact Us" is an inert button with no `href`
- `components/files/my-files-page.tsx`: page max-width (`896px`), header divider,
  `ds-card`, focus-ring and typography conventions
- `components/subscription/subscription-page.tsx`: card composition, badge styles
- `components/design-system/library.tsx`: primary/secondary button and badge recipes
- `app/globals.css`: Tailwind 4 `@theme` tokens (`brand`, `ink`, `navy`, `muted`,
  `canvas`, `panel`, `line`, `wash`, `panel`, `shadow-soft`)
- `public/mascot-*.png`: available mascot art and intrinsic sizes
- `node_modules/next/dist/docs/01-app/02-guides/forms.md`: form/Server Action guidance

## Decisions and Assumptions
- Route is `/contact` inside the `(app)` group, so it inherits the sidebar shell. The
  page is a server component (`metadata` + `auth.protect()`) rendering one client
  component for the interactive form, preview, and accordion.
- The sidebar "Contact Us" row becomes a real link with `aria-current="page"`.
- **Support Preview** is a local-state selector driven by the Subject dropdown, exactly
  as the screenshots show. Each subject maps to a badge tone/icon, mascot, two floating
  emoji tiles, headline, and helper copy. The default (nothing selected) is
  `Ready to Listen`.
- The headset mascot in the reference hero does not exist in `public/`. Reuse the
  existing Kalabawi mascots (`mascot-hero`, `mascot-drafting`, `mascot-empty`,
  `mascot-ready`) and keep the composition (glow, tiles, copy) identical. No new image
  assets and no external image APIs.
- Floating overlay art uses native emoji glyphs in white rounded tiles (💡, 💬, 🐞, 🔍,
  🧾, 💳, 🚀, 👋), matching the screenshot placement without new assets.
- No backend or email service exists in this project and no toast dependency is
  installed. Submitting validates inline (Apple-style, never blocking dialogs) and then
  swaps the form for an in-card success panel with a "Send another message" reset. No
  fake network calls, no new dependencies.
- Attachment is a real local file picker; only the selected file name is shown and it
  is never uploaded.
- FAQ copy is written for the Kalabawi product (exports, Free plan limits, credits,
  upgrades, GCash/Maya/card payments).
- Presentation only: no credit writes, no cookies, no storage.

## Files Expected to Touch
- `prompts/implement-contact-us.md` (this file)
- `components/contact/contact-data.ts` (new: subject/preview mapping + FAQ content)
- `components/contact/contact-page.tsx` (new: client page composition + state)
- `app/(app)/contact/page.tsx` (new route)
- `components/app-shell/sidebar.tsx` (Contact Us link + active state)

## Requirements
1. Header: "Help & Support" 30/32px bold, subtitle "Get in touch with our Philippine
   teacher support team or browse answers to frequent questions.", hairline divider.
2. Hero: centred support mascot with soft radial glow, "How can we help today?" 26–30px
   bold, supporting line, and two CTAs — primary blue **Chat on Messenger**, white
   **Send an Email** (mailto). Both labelled, keyboard accessible.
3. Inquiry card: white `ds-card`, two columns on `lg` (split at 50/50 with a vertical
   hairline; right column on `bg-panel`). Stacks on mobile.
4. Form column: heading "Send an Inquiry or Ticket", helper copy, then Subject select
   (Bug report, Billing question, Feature request, Other), Message textarea, optional
   Screenshot file field, and full-width blue **Send Message** with paper-plane icon.
   Inline error text under invalid fields; no blocking alerts.
5. Support Preview column: uppercase "SUPPORT PREVIEW", tone badge with icon, mascot with
   two floating emoji tiles, bold headline, and 3-line helper copy. Content changes with
   the selected subject.
6. FAQ card: circular question-mark badge + "Frequently Asked Questions" 20px bold,
   hairline divider, five accordion rows with rotating chevrons, `aria-expanded` /
   `aria-controls`, and readable answers.
7. Subject preview tones: ready = brand blue, bug = amber, billing = green,
   feature = indigo, other = blue.
8. Responsive down to 390px with no horizontal overflow; CTA row stacks, floating tiles
   stay inside the panel, long file names truncate.
9. Accessibility: labelled controls, `aria-invalid` + `aria-describedby` on errors,
   `aria-live` success announcement, visible focus rings, decorative mascots hidden.

## Security Considerations
- No secrets, no Gemini keys, no browser-side credit writes.
- File picker is display-only; the file never leaves the device.
- External links use `rel="noreferrer noopener"`.

## Acceptance Criteria
- `/contact` renders inside the app shell and matches the reference hierarchy, spacing,
  typography, and colors.
- Choosing each subject updates badge, mascot tiles, headline, and copy.
- Validation blocks empty subject/message with inline messages; a valid submit shows the
  success panel; "Send another message" restores a clean form.
- FAQ rows expand/collapse with the chevron rotating.
- Sidebar shows Contact Us as active on `/contact`.
- `npm run lint` and `npm run build` pass.

## Checks to Run
- `npm run lint`
- `npm run build`
- `npm run dev` and visual review at 1440×900, 1024×768, 768×1024, 390×844.

## Exact Manual Test Steps
1. `npm run dev`, sign in, open `http://localhost:3000/contact`.
2. Confirm the header divider, hero mascot glow, both CTAs, and the two-column card match
   the reference.
3. Change Subject to **Bug report**; confirm the amber "Bug Investigation" badge, 🐞/🔍
   tiles, and "Spotted a glitch or bug?" copy.
4. Repeat for **Billing question** (green), **Feature request** (indigo), **Other** (blue).
5. Press **Send Message** with both fields empty; confirm inline errors appear and focus
   moves to Subject.
6. Pick a subject, type a message, attach an image; confirm the file name appears and the
   X removes it.
7. Submit; confirm the success panel announces politely and **Send another message**
   resets the form.
8. Expand each FAQ row; confirm only the answers you open are visible.
9. Resize to 390px; confirm the columns stack, buttons go full width, and nothing
   overflows horizontally.
