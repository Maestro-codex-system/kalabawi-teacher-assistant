# Implementation Prompt: Sign Out Control

## Goal
Give signed-in teachers a visible way to sign out from the app shell, without hunting through
the Clerk account modal (which only exposes Profile and Security).

## Skills Read
- `clerk-setup`: prebuilt component rules, `<Suspense>`/Cache Components notes
- `clerk-nextjs-patterns`: client vs server auth APIs (`useClerk` on the client)
- Clerk component API: `<SignOutButton redirectUrl />` (clones a single child and injects
  `onClick`, so a custom styled `<button>` is safe — no nested buttons)

## Code Inspected
- `components/app-shell/sidebar.tsx`: "Account" section renders `Subscription`, `Profile`,
  `Settings`, `Contact Us` via `NavRow`; footer opens `<UserProfile />` through
  `useClerk().openUserProfile()`
- `components/app-shell/app-shell.tsx`: mobile header renders `<UserButton />`, whose menu
  already includes "Sign out"
- `app/layout.tsx`: `ClerkProvider` sets `afterSignOutUrl="/sign-in"` and local
  `signInUrl`/`signUpUrl`
- `node_modules/@clerk/react/dist/index.mjs`: `SignOutButton` defaults to `redirectUrl: "/"`

## Decisions and Assumptions
- Place one "Sign out" row at the end of the sidebar's Account section, separated by a hairline
  divider so it reads as a session action rather than another page link.
- Use `<SignOutButton redirectUrl="/sign-in">` instead of a raw `signOut()` call so Clerk owns
  session cleanup and the post-sign-out navigation.
- Redirect to `/sign-in` (not `/`) so the user lands on the branded auth page instead of a
  redirect hop through `auth.protect()`.
- Keep the neutral sidebar typography; only the icon/label tint to the danger tone on hover,
  which stays inside the design-system palette.
- Mobile already has sign out in the `<UserButton />` menu, and the same sidebar row appears in
  the mobile drawer, so no extra mobile-only control is added.
- No data, credit, or pipeline changes; sign-out only clears the Clerk session.

## Files Expected to Touch
- `components/app-shell/sidebar.tsx`
- `prompts/implement-sign-out.md`

## Requirements
1. A visible "Sign out" row appears in the sidebar Account section for signed-in users.
2. Activating it ends the Clerk session and lands on `/sign-in`.
3. After sign-out, `/` and `/dashboard` are blocked again.
4. The row is keyboard reachable, has a visible focus ring, and keeps the 260px sidebar rhythm.

## Security Considerations
- Sign-out runs entirely through Clerk's client SDK; no keys or server secrets are involved.
- The protected pages still call `await auth.protect()`, so a stale back-navigation cannot
  render dashboard markup.

## Acceptance Criteria
- `npm run lint` and `npm run build` pass.
- Clicking "Sign out" navigates to `/sign-in`, and the dashboard is inaccessible afterwards.
- Mobile drawer shows the same row and it behaves identically.

## Manual Test Steps
1. Sign in, open the sidebar, click "Sign out" under Account.
2. Confirm you land on `/sign-in` and `http://localhost:3000/dashboard` redirects back to sign-in.
3. Sign back in, open the mobile drawer at 390px, and repeat.
