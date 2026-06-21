"use client";

import { useEffect, useState } from "react";

export type QualityTier = "high" | "low";

/**
 * Heuristic, not a real GPU benchmark — WebGL renderer sniffing is
 * unreliable/often blocked by browsers now. Coarse pointer (touch) + low
 * core count is a reasonable proxy for "this is a constrained device,
 * scale back."
 */
export function useQualityTier(): QualityTier {
  const [tier, setTier] = useState<QualityTier>("high");

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability check on mount, same as CustomCursor's pointer check
    setTier(isCoarsePointer && lowCores ? "low" : "high");
  }, []);

  return tier;
}
