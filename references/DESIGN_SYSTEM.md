# DESIGN_SYSTEM — Taxation Laws & Practice

Derived from live inspection of https://aiforadvocates.vlslawacademy.com/ (M0, 2026-08-19).
Raw measurements live in `REFERENCE_TOKENS.json`. This file is the narrative interpretation.

## Identity
Established, restrained, legal-editorial — not a SaaS/fintech template. Warm cream paper
background, near-black ink text, a single disciplined red accent, sharp (0-radius) corners
throughout, a serif display typeface for headings against a sans-serif (Inter) body/UI face.
That heading/body pairing is the single most distinctive signal of the VLS system — do not
substitute Inter/Poppins/Montserrat for headings.

## Palette (see REFERENCE_TOKENS.json for exact values)
- Base: warm off-white `#F5F1E9`-ish cream, pure white cards/panels
- Ink: near-black `rgb(17,19,21)` for text, `rgb(11,13,15)` for the dark footer/hero
- Accent: VLS red `rgb(165,31,36)` — CTAs, eyebrow labels, dividers, emphasis only
- Gold: rare accent on dark sections (numerals, gradient glows) — never a primary surface
- Borders: warm light grey `rgb(222,215,204)` family

## Typography
- Headings (H1/H2/H3): Georgia / Times New Roman serif, weight 500, tight negative letter
  spacing at large sizes (hero H1 ~ -3.6px tracking)
- Body/UI/nav/buttons/forms: Inter, weight 400 body / 650-750 UI emphasis
- Eyebrow labels: 10px, weight 850, +1.8px letter-spacing, uppercase, red

## Components
- Header: sticky, translucent white (94% opacity), 85px tall, 1180px inner container,
  black pill-less CTA button (sharp corners, not rounded)
- Buttons: sharp corners always. Primary/form CTA = solid VLS red, white text, 48px tall.
  Header CTA = solid near-black, white text.
- Form inputs: cream translucent fill, thin warm-grey border, sharp corners, 16px text
- "Cards": mostly borderless numbered rows (01, 02, 03...) with generous vertical padding
  and a divider, not boxed/shadowed cards — keep this restraint, avoid excessive card chrome
- Footer: near-black, white text, generous top padding (~70px)
- Section rhythm: ~74-86px vertical padding, alternating cream/white/near-black backgrounds
  to break up long scroll without ever introducing an off-brand color

## Motion (Emil Kowalski principles applied)
Subtle only: reveal-on-scroll fades/slides already present on the reference (`reveal-item`
class), quick hover feedback on buttons/links, no scroll-jacking, no entrance choreography,
respect `prefers-reduced-motion`. This is a legal-education brand — motion should never call
attention to itself.

## Taste guardrails (explicit anti-patterns)
No gradient text, no glassmorphism, no floating blobs, no pill badges, no oversized display
type beyond what the reference uses, no excessive rounded corners (reference uses 0 radius
everywhere), no dashboards, no emoji icons, no fintech blue/green, no gold-as-primary-surface.

## Adaptation for Taxation Laws & Practice
Same system, new content spine: replace the "AI ⇄ Advocate" duality with a
"DEPARTMENT → APPEAL → TRIBUNAL → HIGH COURT" dispute-journey motif reused across the core
visual moment, the practical framework, and the outcomes section — this is this course's
equivalent of the reference's AI/Advocate tension, expressed through the same typographic and
spacing system rather than a new visual idiom.
