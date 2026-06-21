"use client";

/**
 * Used to mount its own FinalCanvas here. The city/starfield/effects are
 * now rendered once, globally, by WorldScene (see layout.tsx) — this
 * section just marks the scroll range where WorldCameraRig's path pulls
 * out into orbit, and fades in the closing line over that.
 */
import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";

export default function FinalCinematicSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const tween = gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#final",
          start: "55% top",
          end: "85% top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="final" className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden pointer-events-none">
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center px-6 opacity-0"
        >
          <p className="font-display text-3xl sm:text-5xl lg:text-6xl text-center max-w-3xl leading-tight">
            We Don&apos;t Just Build Structures.
            <br />
            We Build The Future.
          </p>
        </div>
      </div>
    </section>
  );
}
