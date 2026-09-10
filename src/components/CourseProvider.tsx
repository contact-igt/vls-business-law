"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCourse, programConfig } from "@/lib/course";
import { useUtmSource } from "@/lib/useUtmSource";
import { clearPaymentDetails } from "@/lib/paymentStorage";

const CourseContext = createContext<ReturnType<typeof getCourse> | null>(null);

export function CourseProvider({
  initialNow,
  clearStoredPayment = true,
  children,
}: {
  initialNow: number;
  /** false on the response pages, which need to read the stored payload. */
  clearStoredPayment?: boolean;
  children: ReactNode;
}) {
  const [now, setNow] = useState(initialNow);

  useUtmSource();

  // Clear any stale registration payload when the landing page loads.
  useEffect(() => {
    if (clearStoredPayment) clearPaymentDetails();
  }, [clearStoredPayment]);

  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const remaining = Date.parse(programConfig.classStartAt) - Date.now();
    // Recheck long delays daily to avoid browser timeout overflow.
    const timer = now < Date.parse(programConfig.classStartAt)
      ? window.setTimeout(refresh, Math.max(0, Math.min(remaining, 86_400_000)))
      : undefined;
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [now]);
  return <CourseContext.Provider value={getCourse(now)}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const course = useContext(CourseContext);
  if (!course) throw new Error("useCourse requires CourseProvider");
  return course;
}
