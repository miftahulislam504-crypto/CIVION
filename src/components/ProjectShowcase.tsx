"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import GlassPanel from "@/components/ui/GlassPanel";

type Project = {
  title: string;
  location: string;
  year: string;
  description: string;
  stats: { label: string; value: string }[];
};

// Placeholder content — swap in real project copy/renders whenever ready.
// Pre-filled with projects from the CivilOS/EnginEx ecosystem as a starting point.
const PROJECTS: Project[] = [
  {
    title: "CivilOS Structural",
    location: "Bangladesh",
    year: "2025",
    description:
      "A BNBC 2020 compliant structural engineering platform — load analysis, frame analysis, BBS, and a full PDF report engine.",
    stats: [
      { label: "Modules", value: "20+" },
      { label: "Compliance", value: "BNBC 2020" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    title: "Architectural Drawing App",
    location: "Bangladesh",
    year: "2025",
    description:
      "A CAD/BIM tool built with Fabric.js — structural grids, annotation, schedules, and automated compliance checking.",
    stats: [
      { label: "Phases", value: "12" },
      { label: "Export", value: "PDF / SVG" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    title: "CivilOS Hub",
    location: "Bangladesh",
    year: "2024",
    description:
      "The data backbone connecting every module in the ecosystem via Firestore — project registry and cross-app sync.",
    stats: [
      { label: "Role", value: "Data Backbone" },
      { label: "Backend", value: "Firebase" },
      { label: "Status", value: "In Progress" },
    ],
  },
  {
    title: "Build Engineering Hub",
    location: "Bangladesh",
    year: "2024",
    description:
      "A construction materials e-commerce platform with an admin panel and local payment integration.",
    stats: [
      { label: "Type", value: "E-Commerce" },
      { label: "Payments", value: "bKash / Nagad" },
      { label: "Status", value: "Live" },
    ],
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const track = trackRef.current;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="absolute top-12 left-0 right-0 text-center px-6 z-10">
        <span className="font-body text-xs tracking-[0.3em] uppercase text-neon-cyan">
          05 — Project Showcase
        </span>
        <h2 className="font-display text-3xl sm:text-5xl mt-4">
          Selected Works
        </h2>
      </div>

      <div
        ref={trackRef}
        className="absolute inset-0 flex items-center gap-8 pl-[10vw] pr-[10vw] will-change-transform"
      >
        {PROJECTS.map((project) => (
          <GlassPanel
            key={project.title}
            data-cursor-hover
            className="group flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[45vw] grid sm:grid-cols-2 gap-6 p-8 transition-all duration-300 hover:border-neon-cyan/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(45,226,230,0.15)]"
          >
            <div className="flex flex-col gap-3">
              <span className="font-body text-[11px] tracking-[0.2em] text-soft-white/50 uppercase">
                {project.location} — {project.year}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl">
                {project.title}
              </h3>
              <p className="font-body text-sm text-soft-white/70">
                {project.description}
              </p>
            </div>

            <GlassPanel
              tone="graphite"
              showGrid
              clipOverflow
              className="p-4 flex flex-col justify-center gap-3"
            >
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative flex justify-between font-body text-xs"
                >
                  <span className="tracking-[0.15em] text-soft-white/50 uppercase">
                    {stat.label}
                  </span>
                  <span className="text-neon-cyan">{stat.value}</span>
                </div>
              ))}
            </GlassPanel>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
