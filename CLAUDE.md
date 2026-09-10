# CLAUDE.md — DRT & SARFAESI Proceedings · Procedure & Practice landing page

Persistent rules. Details live in `/references`; this file is the index.

## Source hierarchy (do not mix authority)
1. **Design / layout / typography / components**: the VLS **Taxation Laws & Practice** project
   (`../VLS - Taxation Law/`). This page is a content adaptation of that system — same stack,
   components and tokens. Do not redesign it, do not substitute the font.
2. **Content / programme scope**: `references/CONTENT_LOCK.md` — Module 12 (Business Laws and
   Practice) of the VLS brochure: SARFAESI Act 2002 + proceedings before the Debt Recovery
   Tribunal and Debt Recovery Appellate Tribunal. Never advertise anything outside that scope.
3. **Brand / photography**: `references/ASSET_MANIFEST.md` — local, real VLS assets only. No
   stock photography, no AI-generated people, no hotlinks to other VLS subdomains.

## Design tokens (short version — see REFERENCE_TOKENS.json)
Headings: `Georgia, "Times New Roman", Times, serif`, weight 500. Body/UI: `Inter` (next/font).
Accent red `#a51f24`. Ink `#111315`. Cream base `#f5f1e9`. Sharp corners everywhere (0 radius).
No glassmorphism, no gradient text, no rounded pills.

## Commercial data
No approved date / time / duration / mode / language / price. Page runs in **waitlist** mode.
All mutable commercial strings live in `src/lib/course.ts` — never hard-code them in components.

## Rules
- Minimal code; native HTML/CSS before dependencies; no component library beyond Tailwind +
  native elements. No new npm packages.
- Motion: subtle only, respect `prefers-reduced-motion`, quick hover feedback.
- Accessibility: semantic landmarks, labeled form fields, keyboard accordion, visible focus,
  alt text, exactly one H1.
- No fake data: no invented dates, fees, durations, testimonials, faculty statistics, or
  SARFAESI/DRT procedural detail (sections, deadlines, forms).
- Blast radius: this is a standalone project. Do not modify `../VLS - Taxation Law/` or
  `../vls-dop assisted with ai/`.

## Verification
`scripts/verify.sh` — build/typecheck/lint + required-content + forbidden-claim + asset checks.
Run before declaring done.
