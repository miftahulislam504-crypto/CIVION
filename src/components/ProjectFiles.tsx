"use client";

import { useMemo, useState } from "react";
import GlassPanel from "@/components/ui/GlassPanel";
import Button from "@/components/ui/Button";

type ReportCategory = "Structural" | "Architectural" | "BOQ" | "Estimating";

type ProjectReport = {
  title: string;
  category: ReportCategory;
  location: string;
  year: string;
  summary: string;
  pdfUrl: string;
};

const CATEGORY_COLOR: Record<ReportCategory, string> = {
  Structural: "text-neon-cyan border-neon-cyan/30",
  Architectural: "text-electric-blue border-electric-blue/30",
  BOQ: "text-warm-orange border-warm-orange/30",
  Estimating: "text-warm-orange border-warm-orange/30",
};

// PLACEHOLDER DATA — replace every entry below with a real project.
// 1. Drop the actual PDF into /public/reports/ (e.g. /public/reports/my-report.pdf)
// 2. Set pdfUrl to that path ("/reports/my-report.pdf")
// 3. Rewrite title/location/year/summary to match the real project
// Add or remove entries freely — the grid and filters adapt to whatever's here.
const REPORTS: ProjectReport[] = [
  {
    title: "[Project Name] — Structural Design Report",
    category: "Structural",
    location: "Sirajganj, Bangladesh",
    year: "2026",
    summary: "Replace with a short summary of the real structural design package — framing system, BNBC 2020 compliance notes, key load cases.",
    pdfUrl: "/reports/placeholder-structural.pdf",
  },
  {
    title: "[Project Name] — Architectural Drawing Set",
    category: "Architectural",
    location: "Sirajganj, Bangladesh",
    year: "2026",
    summary: "Replace with a short summary — floor plans, elevations, sections, and any BNBC compliance checks run on the layout.",
    pdfUrl: "/reports/placeholder-architectural.pdf",
  },
  {
    title: "[Project Name] — Bill of Quantities",
    category: "BOQ",
    location: "Sirajganj, Bangladesh",
    year: "2026",
    summary: "Replace with a short summary — quantity takeoff method, major line items, total estimated cost range.",
    pdfUrl: "/reports/placeholder-boq.pdf",
  },
];

const FILTERS: ("All" | ReportCategory)[] = [
  "All",
  "Structural",
  "Architectural",
  "BOQ",
  "Estimating",
];

export default function ProjectFiles() {
  const [filter, setFilter] = useState<"All" | ReportCategory>("All");

  const visible = useMemo(
    () => (filter === "All" ? REPORTS : REPORTS.filter((r) => r.category === filter)),
    [filter]
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {FILTERS.map((key) => (
          <Button
            key={key}
            type="button"
            variant="toggle"
            active={filter === key}
            onClick={() => setFilter(key)}
          >
            {key}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {visible.map((report) => (
          <GlassPanel
            key={report.title}
            data-cursor-hover
            className="p-6 flex flex-col gap-4 transition-all duration-300 hover:border-neon-cyan/50 hover:-translate-y-1"
          >
            <span
              className={`self-start font-body text-[10px] tracking-[0.2em] uppercase border rounded-full px-3 py-1 ${CATEGORY_COLOR[report.category]}`}
            >
              {report.category}
            </span>

            <div className="flex flex-col gap-1">
              <span className="font-body text-[11px] tracking-[0.15em] text-soft-white/50 uppercase">
                {report.location} — {report.year}
              </span>
              <h3 className="font-display text-xl sm:text-2xl leading-tight">
                {report.title}
              </h3>
            </div>

            <p className="font-body text-sm text-soft-white/60 flex-1">
              {report.summary}
            </p>

            <a
              href={report.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
            >
              <Button type="button" variant="outline" className="w-full">
                View Report ↗
              </Button>
            </a>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
