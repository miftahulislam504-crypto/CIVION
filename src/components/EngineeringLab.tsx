"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "@/utils/gsap";
import GlassPanel from "@/components/ui/GlassPanel";
import Button from "@/components/ui/Button";

const BEAM_LENGTH = 10; // meters — arbitrary span for visualization
const LOAD_MAGNITUDE = 10; // kN, fixed
const STIFFNESS_BASE = 5000; // visualization-only EI baseline
const DEFLECTION_VISUAL_SCALE = 120; // exaggerates real deflection so it's visible

// Illustrative relative stiffness, not real material properties — picked
// so steel visibly deflects less than concrete, less than timber.
const MATERIALS = {
  steel: { label: "Steel", stiffness: 3 },
  concrete: { label: "Concrete", stiffness: 1.5 },
  timber: { label: "Timber", stiffness: 1 },
} as const;

type MaterialKey = keyof typeof MATERIALS;

// Real simply-supported-beam, point-load deflection formula
// (Euler-Bernoulli, via Macaulay's method) — same shape any structural
// analysis tool would use, just with EI scaled for visibility.
function deflectionAt(x: number, loadPos: number, stiffness: number): number {
  const L = BEAM_LENGTH;
  const a = loadPos;
  const b = L - a;
  const P = LOAD_MAGNITUDE;
  const EI = stiffness * STIFFNESS_BASE;

  if (x <= a) {
    return ((P * b * x) / (6 * L * EI)) * (L * L - b * b - x * x);
  }
  return ((P * a * (L - x)) / (6 * L * EI)) * (2 * L * x - a * a - x * x);
}

function computeCurve(loadPos: number, stiffness: number, samples = 60) {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const x = (i / samples) * BEAM_LENGTH;
    return { x, deflection: deflectionAt(x, loadPos, stiffness) };
  });
}

function computeReactions(loadPos: number) {
  const L = BEAM_LENGTH;
  const a = loadPos;
  const b = L - a;
  return {
    r1: (LOAD_MAGNITUDE * b) / L,
    r2: (LOAD_MAGNITUDE * a) / L,
  };
}

// viewBox coordinate helpers — beam spans x = 10..90 (80 units = 10 m)
const VB_START = 10;
const VB_SPAN = 80;
const BEAM_Y = 25;

function toViewBoxX(meters: number) {
  return VB_START + (meters / BEAM_LENGTH) * VB_SPAN;
}

export default function EngineeringLab() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const draggingRef = useRef(false);

  const [loadPosition, setLoadPosition] = useState(BEAM_LENGTH / 2);
  const [material, setMaterial] = useState<MaterialKey>("concrete");

  const stiffness = MATERIALS[material].stiffness;
  const curve = useMemo(
    () => computeCurve(loadPosition, stiffness),
    [loadPosition, stiffness]
  );
  const { r1, r2 } = useMemo(() => computeReactions(loadPosition), [loadPosition]);
  const maxDeflection = useMemo(
    () => Math.max(...curve.map((p) => p.deflection)),
    [curve]
  );

  const pathD = curve
    .map((p, i) => {
      const x = toViewBoxX(p.x);
      const y = BEAM_Y + p.deflection * DEFLECTION_VISUAL_SCALE;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const loadX = toViewBoxX(loadPosition);
  const loadY = BEAM_Y + deflectionAt(loadPosition, loadPosition, stiffness) * DEFLECTION_VISUAL_SCALE;

  function positionFromClientX(clientX: number): number {
    if (!svgRef.current) return loadPosition;
    const rect = svgRef.current.getBoundingClientRect();
    const startPx = rect.left + (VB_START / 100) * rect.width;
    const endPx = rect.left + ((VB_START + VB_SPAN) / 100) * rect.width;
    const clamped = Math.min(Math.max(clientX, startPx), endPx);
    const fraction = (clamped - startPx) / (endPx - startPx);
    return fraction * BEAM_LENGTH;
  }

  function handlePointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setLoadPosition(positionFromClientX(e.clientX));
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    setLoadPosition(positionFromClientX(e.clientX));
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 1 : 0.25;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setLoadPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setLoadPosition((p) => Math.min(BEAM_LENGTH, p + step));
    }
  }

  function handleSeismicTest() {
    if (!groupRef.current) return;
    gsap.fromTo(
      groupRef.current,
      { x: 0 },
      {
        keyframes: { x: [-1.4, 1.6, -1.1, 0.7, -0.3, 0] },
        duration: 1.3,
        ease: "power2.out",
      }
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <GlassPanel className="p-6 sm:p-10">
        <svg
          ref={svgRef}
          viewBox="0 0 100 50"
          className="relative w-full h-auto touch-none select-none overflow-visible"
          fill="none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <g ref={groupRef}>
            {/* supports */}
            <path
              d={`M ${VB_START} ${BEAM_Y} L ${VB_START - 2.5} ${BEAM_Y + 5} L ${VB_START + 2.5} ${BEAM_Y + 5} Z`}
              fill="none"
              stroke="#2de2e6"
              strokeWidth="0.5"
            />
            <path
              d={`M ${VB_START + VB_SPAN} ${BEAM_Y} L ${VB_START + VB_SPAN - 2.5} ${BEAM_Y + 5} L ${VB_START + VB_SPAN + 2.5} ${BEAM_Y + 5} Z`}
              fill="none"
              stroke="#2de2e6"
              strokeWidth="0.5"
            />

            {/* deflected beam */}
            <path d={pathD} stroke="#2de2e6" strokeWidth="1" />

            {/* load marker — drag this, or focus it and use arrow keys */}
            <g
              onPointerDown={handlePointerDown}
              onKeyDown={handleKeyDown}
              data-cursor-hover
              tabIndex={0}
              role="slider"
              aria-label="Load position along the beam"
              aria-valuemin={0}
              aria-valuemax={BEAM_LENGTH}
              aria-valuenow={Number(loadPosition.toFixed(2))}
              transform={`translate(${loadX}, ${loadY})`}
            >
              <path d="M 0 -9 L 0 0" stroke="#ff7a45" strokeWidth="0.6" />
              <path d="M -1.6 -2.2 L 0 0 L 1.6 -2.2" fill="none" stroke="#ff7a45" strokeWidth="0.6" />
              <circle r="2.4" fill="#ff7a45" opacity={0.15} />
              <circle r="1" fill="#ff7a45" />
            </g>
          </g>
        </svg>

        <p className="text-center font-body text-[10px] tracking-[0.15em] text-soft-white/40 mt-2">
          deflection magnified ×{DEFLECTION_VISUAL_SCALE} for visibility
        </p>

        <div className="flex flex-wrap justify-between gap-3 mt-6 px-1">
          <span className="font-body text-[11px] tracking-[0.15em] text-warm-orange/80">
            R₁ ↑ {r1.toFixed(1)} kN
          </span>
          <span className="font-body text-[11px] tracking-[0.15em] text-electric-blue/80">
            δmax {(maxDeflection * 1000).toFixed(2)} mm
          </span>
          <span className="font-body text-[11px] tracking-[0.15em] text-warm-orange/80">
            R₂ ↑ {r2.toFixed(1)} kN
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {(Object.keys(MATERIALS) as MaterialKey[]).map((key) => (
            <Button
              key={key}
              type="button"
              variant="toggle"
              active={material === key}
              onClick={() => setMaterial(key)}
            >
              {MATERIALS[key].label}
            </Button>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button type="button" variant="outline" onClick={handleSeismicTest}>
            ⚡ Run Seismic Test
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
}
