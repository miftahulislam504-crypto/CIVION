"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import { useIntroState } from "@/hooks/useIntroState";

const ENTRANCE_DURATION = 1.1;

export default function HeroText() {
  const ref = useRef<HTMLDivElement>(null);
  const { introDone } = useIntroState();

  useEffect(() => {
    if (!introDone || !ref.current) return;
    const el = ref.current;
    let exitTween: gsap.core.Tween | undefined;

    // Entrance plays first; only once it's finished do we wire up the
    // scroll-linked exit fade, so the two never fight over the same
    // opacity/transform properties at the same time.
    const entrance = gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: ENTRANCE_DURATION,
        ease: "power3.out",
        onComplete: () => {
          exitTween = gsap.to(el, {
            opacity: 0,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "35% top",
              scrub: true,
            },
          });
        },
      }
    );

    return () => {
      entrance.kill();
      exitTween?.scrollTrigger?.kill();
      exitTween?.kill();
    };
  }, [introDone]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4 text-center px-6 opacity-0"
    >
      <span className="font-body text-xs tracking-[0.3em] uppercase text-neon-cyan">
        CIVION
      </span>
      <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight">
        Engineering The Future
      </h1>
      <p className="font-body text-sm sm:text-base text-soft-white/70 tracking-wide">
        Architecture • Structures • Intelligence • Systems
      </p>
    </div>
  );
}
