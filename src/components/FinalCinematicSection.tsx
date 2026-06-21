"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import { useInView } from "@/hooks/useInView";

const FinalCanvas = dynamic(() => import("@/scenes/FinalCanvas"), {
  ssr: false,
});

export default function FinalCinematicSection() {
  const { ref, inView } = useInView<HTMLDivElement>("300px");
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
    <section
      id="final"
      ref={ref}
      className="relative h-[160vh] border-t border-deep-space"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {inView && <FinalCanvas />}

        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none opacity-0"
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
