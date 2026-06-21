"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import GlassPanel from "@/components/ui/GlassPanel";

type Hotspot = {
  id: string;
  x: number; // percentage, matches the SVG's 0–100 viewBox
  y: number;
  label: string;
  specs: string[];
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "zone-a",
    x: 30,
    y: 32,
    label: "ZONE A",
    specs: ["Area — 86 m²", "Load — 4.2 kN/m²", "Status — Concept"],
  },
  {
    id: "zone-b",
    x: 70,
    y: 32,
    label: "ZONE B",
    specs: ["Area — 102 m²", "Load — 3.8 kN/m²", "Status — Concept"],
  },
  {
    id: "core",
    x: 50,
    y: 72,
    label: "STRUCTURAL CORE",
    specs: ["Type — RCC Core", "Status — Verified", "Rev — 03"],
  },
];

export default function BlueprintScene() {
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!cardRef.current || !svgRef.current) return;

    const paths =
      svgRef.current.querySelectorAll<SVGPathElement>("[data-draw]");
    const labels =
      cardRef.current.querySelectorAll<HTMLElement>("[data-label]");
    const scanLine = cardRef.current.querySelector<HTMLElement>("[data-scan]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.4,
      stagger: 0.1,
      ease: "power2.inOut",
    })
      .to(scanLine, { opacity: 1, duration: 0.25 }, "-=0.5")
      .to(scanLine, { top: "100%", duration: 1.1, ease: "power1.inOut" }, "<")
      .to(scanLine, { opacity: 0, duration: 0.3 }, "-=0.1")
      .to(labels, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.8");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={cardRef} className="relative w-full max-w-xl mx-auto">
      <GlassPanel showGrid clipOverflow className="p-8 sm:p-12">
        {/* scanning sweep, played once during the reveal */}
        <div
          data-scan
          className="absolute left-0 right-0 h-16 opacity-0 pointer-events-none"
          style={{
            top: "0%",
            background:
              "linear-gradient(to bottom, transparent, rgba(45,226,230,0.3), transparent)",
          }}
        />

        {/* SVG and hotspots share this box so percentage coordinates line up */}
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            className="relative w-full h-auto"
            fill="none"
          >
            <path
              data-draw
              d="M 12 12 H 88 V 88 H 12 Z"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              stroke="#2de2e6"
              strokeWidth="0.6"
            />
            <path
              data-draw
              d="M 50 12 V 60"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              stroke="#2de2e6"
              strokeWidth="0.4"
              strokeOpacity="0.7"
            />
            <path
              data-draw
              d="M 12 60 H 88"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              stroke="#2de2e6"
              strokeWidth="0.4"
              strokeOpacity="0.7"
            />
            <path
              data-draw
              d="M 38 60 V 88 M 62 60 V 88"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              stroke="#4d7cfe"
              strokeWidth="0.3"
              strokeOpacity="0.5"
            />
          </svg>

          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <span data-cursor-hover className="block h-2.5 w-2.5 rounded-full bg-warm-orange/90 ring-4 ring-warm-orange/20 cursor-pointer" />
              <div className="absolute left-1/2 top-full z-10 mt-2 w-40 -translate-x-1/2 rounded-md border border-neon-cyan/30 bg-graphite/95 backdrop-blur-sm p-3 text-left opacity-0 scale-95 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100">
                <p className="font-body text-[10px] tracking-[0.2em] text-neon-cyan uppercase mb-1">
                  {spot.label}
                </p>
                {spot.specs.map((s) => (
                  <p key={s} className="font-body text-[11px] text-soft-white/70">
                    {s}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <span
            data-label
            className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 translate-y-1 font-body text-[10px] tracking-[0.2em] text-soft-white/50"
          >
            WIDTH — 18.6 M
          </span>
          <span
            data-label
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 translate-y-1 font-body text-[10px] tracking-[0.2em] text-soft-white/50"
            style={{ writingMode: "vertical-rl" }}
          >
            HEIGHT — 14.2 M
          </span>
        </div>
      </GlassPanel>
    </div>
  );
}
