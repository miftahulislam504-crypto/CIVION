"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import { useIntroState } from "@/hooks/useIntroState";

const REVEAL_DELAY = 0.5;

export default function HeroText() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const { introDone } = useIntroState();

  useEffect(() => {
    if (!introDone || !wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    let exitTween: gsap.core.Tween | undefined;

    const tl = gsap.timeline({
      delay: REVEAL_DELAY,
      onComplete: () => {
        exitTween = gsap.to(wrapper, {
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
    });

    tl.set(wrapper, { opacity: 1 });
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(
        el,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        i === 0 ? ">" : "-=0.35"
      );
    });

    return () => {
      tl.kill();
      exitTween?.scrollTrigger?.kill();
      exitTween?.kill();
    };
  }, [introDone]);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col items-start gap-5 px-6 opacity-0 max-w-sm"
    >
      {/* Eyebrow — igloo style */}
      <span
        ref={(el) => { lineRefs.current[0] = el; }}
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-neon-cyan/70 opacity-0"
      >
        /////// CIVION
      </span>

      {/* Main title */}
      <h1
        ref={(el) => { lineRefs.current[1] = el; }}
        className="font-mono text-4xl sm:text-6xl font-bold leading-none tracking-tight opacity-0"
      >
        Engineering
        <br />
        The Future.
      </h1>

      {/* Divider line */}
      <div
        ref={(el) => { lineRefs.current[2] = el as HTMLDivElement; }}
        className="w-12 h-px bg-neon-cyan/40 opacity-0"
      />

      {/* Subtitle — monospace, raw */}
      <p
        ref={(el) => { lineRefs.current[3] = el; }}
        className="font-mono text-xs text-soft-white/55 leading-relaxed tracking-wide opacity-0"
      >
        // Architecture<br />
        // Structures<br />
        // Intelligence<br />
        // Systems
      </p>

      {/* Scroll hint */}
      <span
        ref={(el) => { lineRefs.current[4] = el; }}
        className="font-mono text-[10px] tracking-[0.2em] uppercase text-soft-white/30 mt-2 opacity-0"
      >
        Scroll down to discover.
      </span>
    </div>
  );
}
