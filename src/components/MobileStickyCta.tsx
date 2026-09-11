"use client";

import { useHiddenNear } from "@/lib/useHiddenNear";
import { useCourse } from "@/components/CourseProvider";

// Hide the bar while the hero (which carries its own registration form), the final
// registration form, or the footer is on screen — so it never duplicates a
// visible form, covers form fields, or sits over footer content. It only
// appears once the reader has scrolled past the hero.
const WATCH_IDS = ["top", "register-form", "site-footer"];

export function MobileStickyCta() {
  const course = useCourse();
  const near = useHiddenNear(WATCH_IDS);

  return (
    <div
      aria-hidden={near}
      inert={near}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-vls-border bg-white/98 backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
        near ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.6rem)" }}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-6 pt-3">
        <div className="leading-tight">
          <p className="text-[10px] font-extrabold uppercase tracking-[1.4px] text-vls-red">
            DRT &amp; SARFAESI
          </p>
          <p className="text-[13px] font-semibold text-vls-black">{course.stickySubtitle}</p>
        </div>
        <a
          href="#register-form"
          className="flex h-11 min-w-[132px] shrink-0 items-center justify-center bg-vls-red px-5 text-[13px] font-bold text-vls-white transition-colors duration-150 ease-out hover:bg-vls-red-dark"
        >
          {course.ctaLabel}
        </a>
      </div>
    </div>
  );
}
