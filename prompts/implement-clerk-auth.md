# Implementation Prompt: Clerk Authentication

## Goal
Add Clerk as the app's authentication provider, gate the dashboard behind a signed-in
session, and ship branded sign-in/sign-up routes that match the Kalabawi design system.

## Skills Read
- `clerk-setup` (loaded from the repository Clerk plugin): install path, existing-project rules,
  `init` behaviour, critical rules
- `clerk-nextjs-patterns`: `auth.protect()` per resource, bare `clerkMiddleware()` in
  `proxy.ts`, Cache Components + `<Suspense>` requirements
- Clerk Next.js quickstart (App Router, manual mode) for the exact file shapes

## Code Inspected
- `package.json`: Next 16.4.6, React 19.3, Tailwind 4, no auth dependency
- `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, Turbopack loaders
- `app/layout.tsx`: Inter/Merriweather via `next/font`, root metadata
- `app/(app)/layout.tsx`: wraps routes in the client `AppShell`
- `app/(app)/page.tsx`, `app/(app)/dashboard/page.tsx`: static dashboard render
- `components/app-shell/app-shell.tsx`, `sidebar.tsx`: mobile header + sidebar footer show a
  hardcoded "Juan Dela Cruz" avatar and name
- `app/globals.css`: design tokens (`brand`, `navy`, `ink`, `line`, `shell`, `shadow-soft`)
- No existing auth provider, middleware, session, or user store exists (verified before `init`)

## Decisions and Assumptions
- The Clerk Dashboard had already selected application
  `app_3MYj0PeSLeGPfIdJGKqi4CYim1k` (Kalabawi-teacher-assistant). `init --app <id>` links that
  application; no new accountless application is created.
- Next 16 means the middleware file is `proxy.ts`, not `middleware.ts`.
- `clerkMiddleware()` stays bare. Protection happens per resource with `await auth.protect()`
  in `/` and `/dashboard`; `createRouteMatcher` is deprecated and is not used.
- `/design-system` stays public as an internal reference page.
- `ClerkProvider` goes inside `<body>` (current SDK rule) with `signInUrl`/`signUpUrl` pointing
  at the local routes, so users never leave the app for the Account Portal.
- The catch-all sign-in/sign-up pages are wrapped in `<Suspense>` because Cache Components
  fails the build on request data read outside a boundary.
- Both protected pages get `app/(app)/loading.tsx` so the `auth.protect()` read is streamed
  behind a skeleton that mirrors the dashboard layout.
- Sidebar identity comes from Clerk (`useUser`), falling back to the mascot avatar; the footer
  row opens the Clerk `<UserProfile />` modal. The mobile header uses `<UserButton />` with
  `afterSignOutUrl="/sign-in"`.
- `next.config.ts` allows `img.clerk.com` for `next/image` so Clerk avatars render optimized.
- Credits, quota copy, and generated content stay static placeholders; this task adds auth
  only and does not touch the data pipeline.

## Files Expected to Touch
- `package.json`, `package-lock.json` (`@clerk/nextjs`)
- `.env.local` (development keys written by `clerk init`; never committed)
- `proxy.ts` (new)
- `app/layout.tsx` (`ClerkProvider`)
- `app/(app)/page.tsx`, `app/(app)/dashboard/page.tsx` (`auth.protect()`)
- `app/(app)/loading.tsx` (new, dashboard skeleton)
- `app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx` (new)
- `components/app-shell/sidebar.tsx`, `components/app-shell/app-shell.tsx`
- `next.config.ts` (Clerk image host)

## Requirements
1. Signed-out visits to `/` and `/dashboard` end on `/sign-in` with the original URL preserved
   in `redirect_url`.
2. `/sign-in` and `/sign-up` render Clerk's prebuilt components, branded with the logo,
   white card, `border-line` border, `shadow-soft`, and `brand` primary button, and stay usable
   at 390px width.
3. Signed-in sessions see the dashboard with the real Clerk name and avatar in the sidebar.
4. Signing out returns to `/sign-in` without flashing protected content.
5. No secret key is imported into client code; `.env.local` stays git-ignored.

## Security Considerations
- `CLERK_SECRET_KEY` only reaches the server through `@clerk/nextjs/server`.
- Route protection is enforced server-side in each page, not only in the proxy, so a direct
  request cannot render dashboard markup before the redirect.
- Public routes remain limited to `/sign-in`, `/sign-up`, `/design-system`, and static assets.
- The generated `.env.local` is covered by the existing `.env*` ignore rule.

## Acceptance Criteria
- `npm run lint` and `npm run build` pass with no TypeScript errors.
- `/` and `/dashboard` redirect to `/sign-in` for signed-out users.
- Signing in lands on `/` and shows the Clerk identity in the sidebar and the mobile header.
- Signing out returns to `/sign-in`.
- Layout at 390px keeps the auth card and dashboard usable.

## Checks to Run
- `npm run lint`
- `npm run build`
- `npx -y clerk@latest doctor`
- Browser smoke test: signed-out redirect, sign-in, dashboard render, sign-out, 390px width.

## Manual Test Steps
1. `npm run dev`, open `http://localhost:3000/` in a private window, confirm the redirect to
   `/sign-in` and the Kalabawi-branded card.
2. Sign up or sign in; confirm the dashboard appears and the sidebar footer shows your name.
3. Open the sidebar footer or the mobile avatar; confirm the Clerk account menu appears.
4. Sign out; confirm you land on `/sign-in` and `/dashboard` stays blocked.
5. Narrow the window to 390px; confirm the mobile header avatar and dashboard cards.
