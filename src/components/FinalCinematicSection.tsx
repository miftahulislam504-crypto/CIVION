"use client";

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
          className="absolute inset-0 flex flex-col items-start justify-center px-6 opacity-0 max-w-lg"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/50 mb-6">
            /////// Manifesto
          </p>
          <p className="font-mono text-2xl sm:text-4xl font-bold leading-snug text-soft-white">
            We Don&apos;t Just<br />
            Build Structures.<br />
            <span className="text-neon-cyan">We Build The Future.</span>
          </p>
          <div className="mt-8 w-8 h-px bg-neon-cyan/40" />
        </div>
      </div>
    </section>
  );
}
