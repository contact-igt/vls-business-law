# ASSET_MANIFEST

All assets downloaded locally into `public/assets/vls/`. Imported 2026-08-19.

| Local file | Original URL | Original dimensions | Type | Purpose |
|---|---|---|---|---|
| `brand/vls-logo.png` | https://aiforadvocates.vlslawacademy.com/vls-logo.png | 234×234 | PNG | Header/footer logo |
| `faculty/dr-sivakumar.png` | https://aiforadvocates.vlslawacademy.com/dr-sivakumar.svg | 490×481 (SVG) → re-encoded | PNG | Faculty section portrait. The original SVG (~11MB) turned out to be a wrapper around an embedded 3200×4000 base64 PNG. Extracted the embedded raster, downsized to 720×900 (well above its largest on-page display size), and re-saved — 8.2MB → 490KB. The decorative red circle behind the portrait in the original artwork is now reproduced in CSS instead of baked into the image. |
| `testimonials/testimonial-1.jpg` | https://aiforadvocates.vlslawacademy.com/testimonial-1.jpg | 705×608 | JPG | Testimonials carousel |
| `testimonials/testimonial-2.png` | https://aiforadvocates.vlslawacademy.com/testimonial-2.png | 601×711 | PNG | Testimonials carousel |
| `testimonials/testimonial-3.png` | https://aiforadvocates.vlslawacademy.com/testimonial-3.png | 477×751 | PNG | Testimonials carousel |
| `classroom/classroom-wide-flowchart.png` | https://www.vlslawacademy.com/assets/images/Slide%2016_9%20-%206.png | 1299×823 | PNG | Wide establishing classroom shot (screen shows a flowchart) — explicitly referenced in the brief as a known official example |
| `classroom/classroom-students-notes.jpg` | https://www.vlslawacademy.com/assets/images/IMG_9235.jpg | 2568×1444 | JPG | Students actively note-taking — used for practice-gap / engagement moment |
| `classroom/classroom-faculty-teaching.jpg` | https://www.vlslawacademy.com/assets/images/IMG_9237.jpg | 2568×1444 | JPG | Faculty mid-lecture, close crowd — used near faculty/why-VLS section |
| `classroom/classroom-legal-content.jpg` | https://www.vlslawacademy.com/assets/images/IMG_9238.jpg | 2568×1444 | JPG | Faculty presenting a statute/rules slide — thematically closest to a legal-provisions course, used in curriculum or core-visual area |

## Selection notes
Reviewed the official site's photo gallery (`vlslawacademy.com`), which serves ~11 images:
7 "Slide 16_9" marketing-slide exports and 5 `IMG_92xx` real DSLR classroom photos. Visually
screenshotted each `IMG_92xx` candidate before selecting; chose 3 real photos + the 1 slide
image explicitly named in the brief, for variety (wide establishing shot, faculty close-up,
student engagement, legal-content specificity). Did not download the full gallery — the
remaining `IMG_9240`/`IMG_9242` images were visually similar crops of the ones already
selected, and the other "Slide 16_9" exports were generic marketing graphics not distinct
enough to add value.

## Second pass — additional VLS photography (imported 2026-09-10)

Source: the public VLS **Consumer Protection Law** repository
(`github.com/sushilathithiyaa-igt/consumerprotection-law`), `public/images/vls/`.
Those files are themselves captures of official VLS pages
(`decodingofpractice.vlslawacademy.com/assets/home/*`). Cloned read-only to
`/tmp/vls-consumer-reference` during development; the files below were copied into
this project's own `public/assets/vls/` hierarchy and are served locally. No
runtime request is made to GitHub or any VLS subdomain.

| Local file | Consumer repo source | Origin | Dimensions | Used in |
|---|---|---|---|---|
| `classroom/classroom-faculty-pointing.jpg` | `vls-classroom-faculty-01.jpg` | `.../assets/home/fatsfact.jpeg` | 1500×1125 | Practical Legal Training (EarlyTrust) |
| `classroom/classroom-procedure-flowchart.jpg` | `vls-classroom-learning-01.jpg` | `.../assets/home/whatlearn.jpeg` | 1500×1125 | Curriculum — editorial band (class working a procedural flowchart) |
| `classroom/academy-interior.jpg` | `vls-academy-interior-01.jpg` | `.../assets/home/whojoin.jpeg` | 1500×1125 | Why VLS collage — branded academy interior |
| `classroom/classroom-wide-session.jpg` | `vls-training-wide-01.jpg` | `.../assets/home/whycourse.jpeg` | 1500×1125 | Why VLS collage — wide training-session shot |

### Consumer-repo assets deliberately NOT imported
- `vls-logo.png` — this project already ships a working VLS logo
  (`brand/vls-logo.png`); the consumer copy is the same mark, different encoding.
- `vls-training-03.jpg` — pixel-for-pixel the same photograph as the existing
  `classroom/classroom-faculty-teaching.jpg` (lower-resolution 1600×900 crop).

## Not used
No stock photography, no AI-generated imagery, no rupee/calculator/gavel clip art.
