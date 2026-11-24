# Kalabawi Design System

The Kalabawi design system reference, implemented as a responsive Next.js page. It documents the
palette, typography, spacing, radii, iconography, buttons, toasts, inputs, document viewer, progress
state, and mascot reactions used across the Kalabawi teacher platform.

## Stack

- Next.js App Router with Turbopack
- React 19 and TypeScript
- Tailwind CSS 4 with design tokens in `app/globals.css`
- Inter (UI) and Merriweather (documents) loaded through `next/font/google`

## Structure

- `app/page.tsx` renders the board.
- `components/design-system/` contains the header, foundations, component library, document viewer,
  progress bar, and mascot sections.
- `public/` holds the transparent logo and mascot cutouts used by the board.
- `design/Kalabawi-design-system.png` is the visual source of truth.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

Open [http://localhost:3000](http://localhost:3000) after starting the dev server.

## Design tokens

| Token | Value |
| --- | --- |
| Primary Blue | `#2563EB` |
| Text Dark | `#0F172A` |
| Text Muted | `#64748B` |
| Background | `#F8FAFC` |
| Success | `#10B981` |
| Error | `#EF4444` |
| Warning | `#F59E0B` |
| Info / Light Blue | `#3B82F6` |
| Document header shading | `#B4C6E7` |

Cards use a 16px radius and soft diffused shadows; toasts and buttons use 12px.
# kalabawi-teacher-assistant
