#!/usr/bin/env bash
# Coded done-condition gate for the DRT & SARFAESI Proceedings landing page.
# Exits non-zero on any hard failure.
set -uo pipefail
cd "$(dirname "$0")/.."

FAIL=0
fail() { echo "FAIL: $1"; FAIL=1; }
pass() { echo "PASS: $1"; }

echo "== Build =="
npx tsc --noEmit >/tmp/vls_drt_tsc.log 2>&1 && pass "TypeScript" || { fail "TypeScript"; cat /tmp/vls_drt_tsc.log; }
npm run lint >/tmp/vls_drt_lint.log 2>&1 && pass "Lint" || { fail "Lint"; cat /tmp/vls_drt_lint.log; }
npm run build >/tmp/vls_drt_build.log 2>&1 && pass "Production build" || { fail "Production build"; cat /tmp/vls_drt_build.log; }

echo "== Required content strings (src/) =="
REQUIRED=(
  "DRT & SARFAESI Proceedings"
  "Procedure & Practice"
  "SARFAESI"
  "Debt Recovery Tribunal"
  "Debt Recovery Appellate Tribunal"
  "Join Waitlist"
  "Dr. Sivakumar Sivaprakasam"
)
for term in "${REQUIRED[@]}"; do
  if grep -rq --include="*.tsx" --include="*.ts" -F "$term" src/; then
    pass "content: $term"
  else
    fail "missing required content: $term"
  fi
done

echo "== Forbidden / unsupported claims (src/) =="
FORBIDDEN=(
  "₹499"
  "28 August 2026"
  "GST"
  "become a DRT expert"
  "guaranteed"
  "Section 13"
  "Section 17"
  "60 days"
  "only 3 seats"
  "3 free bonuses"
)
for term in "${FORBIDDEN[@]}"; do
  if grep -rq --include="*.tsx" --include="*.ts" -F "$term" src/; then
    fail "forbidden claim present: $term"
  else
    pass "absent: $term"
  fi
done

echo "== Assets =="
ASSETS=(
  "public/assets/vls/brand/vls-logo.png"
  "public/assets/vls/faculty/dr-sivakumar.png"
  "public/assets/vls/testimonials/testimonial-1.jpg"
  "public/assets/vls/testimonials/testimonial-2.png"
  "public/assets/vls/testimonials/testimonial-3.png"
  "public/assets/vls/classroom/classroom-wide-flowchart.png"
  "public/assets/vls/classroom/classroom-students-notes.jpg"
  "public/assets/vls/classroom/classroom-faculty-teaching.jpg"
  "public/assets/vls/classroom/classroom-faculty-pointing.jpg"
  "public/assets/vls/classroom/classroom-procedure-flowchart.jpg"
  "public/assets/vls/classroom/academy-interior.jpg"
  "public/assets/vls/classroom/classroom-wide-session.jpg"
)
for asset in "${ASSETS[@]}"; do
  if [ -f "$asset" ]; then
    pass "asset: $asset"
  else
    fail "missing asset: $asset"
  fi
done

echo "== No remote / hotlinked image sources in src/ =="
REMOTE_HOSTS=(
  "raw.githubusercontent.com"
  "github.com/"
  "tax.vlslawacademy.com"
  "decodingofpractice.vlslawacademy.com"
  "consumerprotectionlaw.vlslawacademy.com"
  "_next/image?url=http"
)
for host in "${REMOTE_HOSTS[@]}"; do
  if grep -rq --include="*.tsx" --include="*.ts" -F "$host" src/; then
    fail "remote image reference present: $host"
  else
    pass "absent: $host"
  fi
done

echo "== Design lock: no imported CSS/font/motion-lib drift =="
if grep -rqi "Archivo" src/ ; then fail "Archivo font referenced"; else pass "no Archivo font"; fi
if grep -rqiE "framer-motion|gsap|swiper|locomotive-scroll|lenis|aos" package.json ; then
  fail "motion/carousel library added to package.json"
else
  pass "no motion/carousel library in dependencies"
fi
if grep -qE "Georgia" src/app/globals.css ; then pass "Georgia serif heading system retained"; else fail "Georgia serif system missing from globals.css"; fi

echo "== Commercial values still unset (src/lib/course.ts) =="
for kv in 'date: "TBA"' 'time: "TBA"' 'duration: "TBA"' 'mode: "TBA"' 'language: "TBA"' 'price: null' 'registrationMode: "WAITLIST"'; do
  if grep -qF "$kv" src/lib/course.ts ; then
    pass "course.ts $kv"
  else
    fail "course.ts changed / missing: $kv"
  fi
done

echo "== Structure =="
H1_COUNT=$(grep -rc "<h1" src/app/ src/components/ 2>/dev/null | awk -F: '{sum+=$2} END {print sum+0}')
[ "$H1_COUNT" -eq 1 ] && pass "exactly one <h1>" || fail "expected exactly one <h1>, found $H1_COUNT"

for anchor in "#waitlist" "#curriculum" "#faculty" "#faqs" "#why-this-course"; do
  if grep -rq --include="*.tsx" -F "id=\"${anchor#\#}\"" src/; then
    pass "anchor target exists: $anchor"
  else
    fail "anchor target missing: $anchor"
  fi
done

grep -rq "role=\"region\"" src/components/Faq.tsx && pass "FAQ accordion present" || fail "FAQ accordion missing"
grep -rq "htmlFor=" src/components/WaitlistForm.tsx && pass "form controls have labels" || fail "form controls missing labels"

echo "=================================="
if [ "$FAIL" -eq 0 ]; then
  echo "VERIFY: ALL CHECKS PASSED"
  exit 0
else
  echo "VERIFY: HARD FAILURES PRESENT"
  exit 1
fi
