"use client";

import { useEffect, useState } from "react";

/**
 * True when any element in `ids` is currently on screen. Used to hide a
 * fixed-position control (the mobile sticky CTA) while it would otherwise
 * overlap a registration form or the footer. One IntersectionObserver, cleaned
 * up on unmount.
 */
export function useHiddenNear(ids: string[]): boolean {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            next[entry.target.id] = entry.intersectionRatio > 0.05;
          });
          return next;
        });
      },
      { threshold: [0, 0.05] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [ids]);

  return Object.values(visible).some(Boolean);
}
