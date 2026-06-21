"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import GlassPanel from "@/components/ui/GlassPanel";
import Button from "@/components/ui/Button";

const HEATMAP_COLOR = "#ff7a45";
const STRUCTURE_COLOR = "#2de2e6";

export default function StructuralScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const loadRef = useRef<SVGRectElement>(null);
  const replayTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;
    const svg = svgRef.current;

    const columns = svg.querySelectorAll<SVGPathElement>("[data-column]");
    const beams = svg.querySelectorAll<SVGPathElement>("[data-beam]");
    const cables = svg.querySelectorAll<SVGPathElement>("[data-cable]");
    const forceLabels =
      containerRef.current.querySelectorAll<HTMLElement>("[data-force]");
    const heatmapTargets =
      svg.querySelectorAll<SVGPathElement>("[data-heatmap]");

    function buildLoadPass() {
      const tl = gsap.timeline();
      tl.set(loadRef.current, { opacity: 1, attr: { x: 6 } })
        .to(loadRef.current, {
          attr: { x: 84 },
          duration: 2.4,
          ease: "power1.inOut",
        })
        .to(
          forceLabels,
          { opacity: 1, duration: 0.4, stagger: 0.1 },
          "-=1.6"
        )
        .to(
          heatmapTargets,
          { stroke: HEATMAP_COLOR, duration: 1, stagger: 0.06 },
          "-=0.6"
        );
      return tl;
    }

    const assembly = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // 1. Columns rise
    assembly.to(columns, {
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    });

    // 2. Beams connect
    assembly.to(
      beams,
      { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: "power2.inOut" },
      "+=0.1"
    );

    // 3. Cables tension
    assembly.to(
      cables,
      { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" },
      "+=0.1"
    );

    // 4 & 5. Load simulation + stress heatmap
    assembly.add(buildLoadPass(), "+=0.2");

    replayTlRef.current = null; // populated on demand by the replay button

    return () => {
      assembly.scrollTrigger?.kill();
      assembly.kill();
    };
  }, []);

  function handleReplay() {
    if (!svgRef.current) return;
    const heatmapTargets =
      svgRef.current.querySelectorAll<SVGPathElement>("[data-heatmap]");
    const forceLabels =
      containerRef.current?.querySelectorAll<HTMLElement>("[data-force]") ??
      [];

    replayTlRef.current?.kill();

    const tl = gsap.timeline();
    tl.set(forceLabels, { opacity: 0 })
      .set(heatmapTargets, { stroke: STRUCTURE_COLOR })
      .set(loadRef.current, { opacity: 0, attr: { x: 6 } })
      .to(loadRef.current, { opacity: 1, attr: { x: 84 }, duration: 2.4, ease: "power1.inOut" }, "+=0.1")
      .to(forceLabels, { opacity: 1, duration: 0.4, stagger: 0.1 }, "-=1.6")
      .to(heatmapTargets, { stroke: HEATMAP_COLOR, duration: 1, stagger: 0.06 }, "-=0.6");

    replayTlRef.current = tl;
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <GlassPanel className="p-6 sm:p-10">
        <svg
          ref={svgRef}
          viewBox="0 0 100 62"
          className="relative w-full h-auto overflow-visible"
          fill="none"
        >
          {/* footings */}
          <path
            data-column
            d="M 18 56 H 32 M 68 56 H 82"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            stroke={STRUCTURE_COLOR}
            strokeWidth="0.7"
          />
          {/* pylons */}
          <path
            data-column
            d="M 25 56 V 8 M 75 56 V 8"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            stroke={STRUCTURE_COLOR}
            strokeWidth="0.8"
          />
          {/* deck, in three spans */}
          <path
            data-beam
            data-heatmap
            d="M 5 50 H 25"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            stroke={STRUCTURE_COLOR}
            strokeWidth="0.7"
          />
          <path
            data-beam
            data-heatmap
            d="M 25 50 H 75"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            stroke={STRUCTURE_COLOR}
            strokeWidth="0.9"
          />
          <path
            data-beam
            d="M 75 50 H 95"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            stroke={STRUCTURE_COLOR}
            strokeWidth="0.7"
          />
          {/* cables, fanning from each pylon top */}
          <path
            data-cable
            d="M 25 8 L 12 50 M 25 8 L 18 50 M 25 8 L 33 50 M 25 8 L 40 50 M 75 8 L 60 50 M 75 8 L 67 50 M 75 8 L 82 50 M 75 8 L 88 50"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            stroke={STRUCTURE_COLOR}
            strokeWidth="0.3"
            strokeOpacity="0.6"
          />

          {/* traveling load */}
          <rect
            ref={loadRef}
            x={6}
            y={45.5}
            width="3.5"
            height="3"
            fill="#ff7a45"
            opacity={0}
          />
        </svg>

        <div className="flex justify-between px-2 -mt-2">
          <span
            data-force
            className="font-body text-[10px] tracking-[0.15em] text-warm-orange/80 opacity-0"
          >
            R₁ ↓ 240 kN
          </span>
          <span
            data-force
            className="font-body text-[10px] tracking-[0.15em] text-warm-orange/80 opacity-0"
          >
            R₂ ↓ 240 kN
          </span>
        </div>

        <div className="flex justify-center mt-6">
          <Button type="button" variant="outline" onClick={handleReplay}>
            ↻ Re-run Load Simulation
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
}
