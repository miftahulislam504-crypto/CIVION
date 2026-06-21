"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mounts heavy content (3D canvases, etc.) only once the element is near
 * the viewport, and keeps it mounted afterward rather than thrashing it on
 * every enter/exit — good enough for now; Phase 7 can revisit if more
 * sections need this.
 */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (!ref.current || hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, hasBeenInView]);

  return { ref, inView: hasBeenInView };
}
