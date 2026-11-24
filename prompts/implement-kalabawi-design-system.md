# Implementation Prompt: Kalabawi Design System

## Goal
Rebuild the Next.js landing workspace as a responsive implementation of the supplied
`design/Kalabawi-design-system.png` reference. The deliverable is a polished design-system
showcase for the Kalabawi brand, with the reference as the source of truth.

## Skills Read
- Repository instructions: `AGENTS.md`
- Supporting project skills: none named or required by the visible skill registry

## Code Inspected
- `app/page.tsx`: default Next.js starter page
- `app/globals.css`: default Tailwind/global starter styles
- `app/layout.tsx`: Geist fonts and default metadata
- `package.json`: Next.js 16, React 19, Tailwind CSS 4, no UI/icon dependencies
- `design/Kalabawi-design-system.png`: desktop visual reference

## Decisions and Assumptions
- Keep the page within the existing Next.js App Router and Tailwind setup.
- Reproduce the desktop reference at a 773px-wide board scale, then scale sensibly on mobile.
- Use the Kalabawi navy and blue palette, Inter-style sans typography, and clean rounded cards.
- Use local inline SVG or CSS icons; do not add dependencies unless implementation inspection proves a dependency is necessary.
- Reuse the supplied reference's mascot artwork when it is extracted locally. If extraction is not practical, preserve the reference visually with clearly composed UI illustrations and no external image service.
- This request is UI-only: no authentication, API, storage, generation pipeline, or credit logic.

## Files Expected to Touch
- `app/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `public/` assets, only if local mascot/icon assets can be extracted or added cleanly

## Requirements
1. Match the reference structure:
   - Header with K logomark, Kalabawi title, mascot, design-system title, and subtitle
   - Colors card with navy, text, muted, white, success, error, warning, and blue swatches
   - Typography card with large Aa specimen and text scale
   - Spacing and layout card with the sidebar/main-content diagram
   - Radius and shadows card
   - Iconography, button/badge, toast notification, input/card, document viewer, progress bar, and mascot sections
2. Use the exact or closest visible palette:
   - Primary `#2563EB`
   - Text Dark `#0F172A`
   - Text Muted `#64748B`
   - Background `#F5FAFC`
   - White `#FFFFFF`
   - Success `#10B981`
   - Error `#EF4444`
   - Warning `#F59E0B`
   - Light blue `#3B82F6`
3. Use card backgrounds of approximately `#FFFFFF`, 16px card radii, thin `#E8EDF3` borders,
   and soft diffused shadows.
4. Preserve the compact 2-column desktop masonry layout and the reference's section labels.
5. Make the page responsive:
   - Desktop: approximately 2-column grid and 773px reference board width
   - Tablet/mobile: stack cards, reduce padding, and keep text and controls readable
6. No rounded-pill outer page; the page itself should remain a pale neutral canvas.

## Security Considerations
- Static UI only; no secrets, user data, network calls, or browser storage.
- Sanitize no external content because no external content is rendered.

## Acceptance Criteria
- `/` loads a complete Kalabawi design-system board instead of the Next.js starter.
- Desktop layout resembles the supplied reference in hierarchy, spacing, proportions, and colors.
- Mobile layout stacks sections cleanly without horizontal overflow.
- Header, cards, badges, progress bar, document toolbar, toasts, inputs, and mascot areas are visibly represented.
- `npm run build` and `npm run lint` complete successfully.

## Checks to Run
- `npm run build`
- `npm run lint`
- Run `npm run dev`, open `http://localhost:3000`, and compare desktop and mobile screenshots.

## Exact Manual Test Steps
1. Start the app with `npm run dev`.
2. Open `http://localhost:3000` at about 773px wide.
3. Verify the header and every numbered design-system section matches the reference.
4. Resize through tablet and 375px mobile widths; confirm sections stack and there is no horizontal overflow.
5. Verify text remains readable, controls do not overlap, and card content is not clipped.

## Rebuild Notes (v2)
The first pass shipped clipped mascot crops, overlapping icon and toast rows, wrapped plan bullets, a
missing spacing-scale and principles row, a max-content mobile grid, and Arial/Georgia instead of the
specified typefaces. The rebuild:

- Extracts transparent mascot and logo cutouts from the reference artwork by flood-filling the white
  background, then trims to the artwork bounds. Assets: `public/logo-mark.png`, `public/mascot-hero.png`,
  `public/mascot-empty.png`, `public/mascot-drafting.png`, `public/mascot-ready.png`,
  `public/mascot-duo.png`.
- Loads Inter and Merriweather through `next/font/google` and exposes them as the Tailwind theme fonts.
- Splits the page into `components/design-system/*` primitives instead of one monolithic file.
- Restores the reference's Spacing System (4px base unit) and Footer & Principles rows.
- Uses the DepEd blue `#B4C6E7` band and hard black borders in the document viewer, drawn with CSS grid,
  not an HTML table.
- Fixes the mobile grid to `grid-cols-1` so cards can no longer size to max-content, and verifies zero
  horizontal overflow at 390px and 768px.
- Keeps the reference palette (`#2563EB`, `#0F172A`, `#64748B`, `#F8FAFC`, `#10B981`, `#EF4444`,
  `#F59E0B`, `#3B82F6`), 16px card radius, and soft diffused shadows.
