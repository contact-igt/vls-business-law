"use client";

import { useId, useState } from "react";
import { useCourse } from "@/components/CourseProvider";
import type { getCourse } from "@/lib/course";

function answerFor(question: string, course: ReturnType<typeof getCourse>, fallback: string) {
  if (question === "When is the next class?") return course.nextClassAnswer;
  if (question === "What is the fee?") return course.feeAnswer;
  return fallback;
}

const FAQS = [
  {
    q: "What does DRT & SARFAESI Procedure & Practice cover?",
    a: "The programme focuses on the SARFAESI subject area referenced in the VLS curriculum and proceedings before the Debt Recovery Tribunal and Debt Recovery Appellate Tribunal, approached from a procedure-and-practice perspective.",
  },
  {
    q: "Is SARFAESI included?",
    a: "Yes. SARFAESI proceedings form a core part of the programme scope.",
  },
  {
    q: "Is DRT included?",
    a: "Yes. The programme includes the Debt Recovery Tribunal within its approved scope.",
  },
  {
    q: "Is DRAT included?",
    a: "Yes. The curriculum also references proceedings before the Debt Recovery Appellate Tribunal.",
  },
  {
    q: "Is the programme practice focused?",
    a: "Yes. The positioning of the programme is Procedure & Practice, connecting the legal framework with the forum and the procedural journey.",
  },
  {
    q: "When is the next class?",
    a: "",
  },
  {
    q: "What is the fee?",
    a: "",
  },
];

export function Faq() {
  const course = useCourse();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-vls-border border-t border-vls-border">
      {FAQS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-vls-black transition-colors duration-150 ease-out hover:text-vls-red"
              >
                <span className="font-serif text-[18px] font-medium">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl text-vls-red transition-transform duration-200 ease-out ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                <p className="pb-5 pr-10 text-[15px] leading-relaxed text-vls-muted">{answerFor(item.q, course, item.a)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
