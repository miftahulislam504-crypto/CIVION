"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import { useIntroState } from "@/hooks/useIntroState";

// Small delay after intro hand-off so the city/camera get a beat to start
// moving before text arrives — reads as "the scene opens, then speaks."
const REVEAL_DELAY = 0.5;

export default function HeroText() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { introDone } = useIntroState();

  useEffect(() => {
    if (!introDone || !wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    let exitTween: gsap.core.Tween | undefined;

    const tl = gsap.timeline({
      delay: REVEAL_DELAY,
      onComplete: () => {
        // Entrance is fully settled; only now wire the scroll-linked exit
        // fade, so the two never fight over opacity/transform at once.
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

    tl.set(wrapper, { opacity: 1 })
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 10, letterSpacing: "0.6em" },
        { opacity: 1, y: 0, letterSpacing: "0.3em", duration: 0.7, ease: "power2.out" }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.35"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.45"
      );

    return () => {
      tl.kill();
      exitTween?.scrollTrigger?.kill();
      exitTween?.kill();
    };
  }, [introDone]);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col items-center gap-4 text-center px-6 opacity-0"
    >
      <span
        ref={eyebrowRef}
        className="font-body text-xs uppercase text-neon-cyan opacity-0"
      >
        CIVION
      </span>
      <h1
        ref={titleRef}
        className="font-display text-5xl sm:text-7xl font-medium tracking-tight opacity-0"
      >
        Engineering The Future
      </h1>
      <p
        ref={subtitleRef}
        className="font-body text-sm sm:text-base text-soft-white/70 tracking-wide opacity-0"
      >
        Architecture • Structures • Intelligence • Systems
      </p>
    </div>
  );
}
