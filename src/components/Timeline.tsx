"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";

type Milestone = {
  year: string;
  title: string;
  description: string;
};

// Placeholder dates — these trace the real CivilOS/EnginEx ecosystem's
// build order; adjust years/wording freely.
const MILESTONES: Milestone[] = [
  {
    year: "2024",
    title: "Ek Ummah Foundation",
    description:
      "Where it started — a Bengali Islamic fintech PWA, built entirely from Termux.",
  },
  {
    year: "2025",
    title: "CivilOS Structural",
    description:
      "A full structural engineering platform — BNBC 2020 compliant, analysis through PDF reports.",
  },
  {
    year: "2025",
    title: "Architectural Drawing App",
    description:
      "CAD/BIM tooling with Fabric.js — drafting, schedules, and compliance checks, in the browser.",
  },
  {
    year: "2025",
    title: "CivilOS Hub",
    description:
      "The data backbone — every module in the ecosystem, connected through one source of truth.",
  },
  {
    year: "2026",
    title: "CIVION",
    description:
      "This site — the cinematic front door to everything built so far.",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !fillRef.current) return;

    const fillTween = gsap.fromTo(
      fillRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );

    const entries =
      containerRef.current.querySelectorAll<HTMLElement>("[data-entry]");
    const entryTweens = Array.from(entries).map((entry) =>
      gsap.fromTo(
        entry,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    );

    return () => {
      fillTween.scrollTrigger?.kill();
      fillTween.kill();
      entryTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-deep-space -translate-x-1/2 hidden sm:block" />
      <div
        ref={fillRef}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-neon-cyan -translate-x-1/2 origin-top hidden sm:block"
        style={{ transform: "scaleY(0)" }}
      />

      <div className="flex flex-col gap-16 sm:gap-24">
        {MILESTONES.map((m, i) => (
          <div
            key={m.title}
            data-entry
            className={`relative flex flex-col sm:flex-row items-center gap-4 sm:gap-10 opacity-0 ${
              i % 2 === 1 ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`sm:w-1/2 text-center ${
                i % 2 === 1 ? "sm:text-left" : "sm:text-right"
              }`}
            >
              <span className="font-body text-xs tracking-[0.3em] uppercase text-neon-cyan">
                {m.year}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl mt-2">
                {m.title}
              </h3>
            </div>

            <span className="hidden sm:block h-2.5 w-2.5 rounded-full bg-warm-orange ring-4 ring-warm-orange/20 shrink-0" />

            <div className="sm:w-1/2 text-center sm:text-left">
              <p className="font-body text-sm text-soft-white/60 max-w-xs mx-auto sm:mx-0">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
