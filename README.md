# VLS Law Academy — DRT & SARFAESI Proceedings

Landing page for the VLS Law Academy programme **DRT & SARFAESI Proceedings — Procedure &
Practice**. It is a content adaptation of the VLS *Taxation Laws & Practice* landing page and
shares that design system exactly (Inter body / Georgia–Times serif headings, red / black /
cream / gold palette, sharp corners).

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- TypeScript
- No runtime dependencies beyond `next` / `react` / `react-dom`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
./scripts/verify.sh   # build + content-lock + forbidden-claim + asset + design-lock gate
```

## Source of truth

| Concern | Authority |
|---|---|
| Design / layout / typography / components | VLS *Taxation Laws & Practice* project |
| Content / programme scope | `references/CONTENT_LOCK.md` (VLS brochure, Module 12 — SARFAESI + DRT / DRAT) |
| Brand / photography | `references/ASSET_MANIFEST.md` — local VLS assets only, no hotlinks |

## Status

- **Commercial data (date, time, duration, mode, language, price): not yet approved.** The page
  runs in **waitlist** mode; every unknown is `"TBA"`. All mutable commercial strings live in
  `src/lib/course.ts` — do not hard-code them in components.
- **Lead form backend: placeholder.** `src/lib/submitWaitlist.ts` resolves client-side only;
  no CRM/endpoint is wired up. Swap the adapter once a real endpoint exists.
