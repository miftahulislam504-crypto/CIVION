import * as THREE from "three";

export type ProjectStat = { label: string; value: string };

export type ProjectLandmark = {
  id: string;
  title: string;
  summary: string;
  description: string; // longer English paragraph for detail page
  url: string;
  location: string;
  year: string;
  tag: string;
  stats: ProjectStat[];
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
};

export const PROJECT_LANDMARKS: ProjectLandmark[] = [
  // ── Row A  (z = -8) ────────────────────────────────────────────────
  {
    id: "admin-brotherfit",
    title: "Admin BrotherFit",
    summary: "Full admin dashboard for the BrotherFit fitness platform — user management, content moderation, and real-time analytics in one place.",
    description: "The BrotherFit Admin Panel provides complete control over the fitness platform ecosystem. Built with Next.js and Firebase, it features role-based access, real-time user metrics, content review workflows, and a moderation queue for community posts. Admins can manage memberships, push announcements, and export usage reports with a single click.",
    url: "https://admin-brotherfit.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Admin Dashboard",
    stats: [
      { label: "Type", value: "Admin" },
      { label: "Stack", value: "Next.js" },
      { label: "Status", value: "Live" },
    ],
    position: [-9, 0, -8],
    width: 0.85, depth: 0.85, height: 10.5,
    cameraPosition: [-7.6, 2.4, -6.0],
    cameraLookAt: [-9, 4.0, -8],
  },
  {
    id: "brotherfit",
    title: "BrotherFit",
    summary: "A fitness social platform for the Bangladeshi community — workout tracking, diet plans, and community challenges all in one app.",
    description: "BrotherFit is a social fitness platform designed specifically for the Bangladeshi community. Users can log workouts, follow personalized diet plans, join weekly challenges, and track progress on public leaderboards. The platform encourages consistency through gamified streaks, peer accountability features, and a community feed where members share milestones.",
    url: "https://brotherfit.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Fitness Social Platform",
    stats: [
      { label: "Type", value: "Social" },
      { label: "Stack", value: "Next.js + Firebase" },
      { label: "Status", value: "Live" },
    ],
    position: [-3, 0, -8],
    width: 0.85, depth: 0.85, height: 12,
    cameraPosition: [-1.6, 2.5, -6.0],
    cameraLookAt: [-3, 4.5, -8],
  },
  {
    id: "ummahnet",
    title: "UmmahNet",
    summary: "A social network built for the Muslim community — Islamic content sharing, halal event management, and a dawah platform.",
    description: "UmmahNet is a purpose-built social platform connecting Muslims across Bangladesh and beyond. It supports Islamic content sharing with community review, a halal event calendar, mosque finder, and a dawah section for educational resources. The platform is designed with Islamic values at its core, offering a safe space for meaningful connection and knowledge exchange.",
    url: "https://ummahnet.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Muslim Social Network",
    stats: [
      { label: "Type", value: "Social" },
      { label: "Backend", value: "Firebase" },
      { label: "Status", value: "Live" },
    ],
    position: [3, 0, -8],
    width: 0.85, depth: 0.85, height: 9,
    cameraPosition: [4.4, 2.2, -6.0],
    cameraLookAt: [3, 3.5, -8],
  },
  {
    id: "enginex-archdrawing",
    title: "Enginex Arch Drawing",
    summary: "Browser-based architectural drafting tool — create BNBC-compliant floor plans, elevations, and section drawings with PDF/SVG export.",
    description: "Enginex Arch Drawing brings professional CAD capabilities directly to the browser, eliminating the need for expensive desktop software. Engineers and architects can draft floor plans, elevations, and cross-sections following BNBC guidelines. The tool supports multi-layer drawings, dimension annotations, and one-click export to PDF or SVG. Designed for Bangladeshi building standards from the ground up.",
    url: "https://enginex-archdrawing.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "CAD / BIM in Browser",
    stats: [
      { label: "Phases", value: "12" },
      { label: "Export", value: "PDF / SVG" },
      { label: "Standard", value: "BNBC" },
    ],
    position: [9, 0, -8],
    width: 0.85, depth: 0.85, height: 11,
    cameraPosition: [10.4, 2.4, -6.0],
    cameraLookAt: [9, 4.0, -8],
  },

  // ── Row B  (z = -3) ────────────────────────────────────────────────
  {
    id: "civion",
    title: "CIVION",
    summary: "You are here — a 3D interactive portfolio where every building is a real project, built with Three.js and Next.js.",
    description: "CIVION is this very site — a cinematic 3D portfolio built with Three.js, React Three Fiber, and Next.js. The entire portfolio lives inside a wireframe city: each building represents a real deployed project. Scroll to tour the city, click any building to enter it. The camera rig, lighting, and scroll system were hand-crafted to create a seamless fly-through experience on both desktop and mobile.",
    url: "https://mrcivion.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "3D Portfolio — You Are Here",
    stats: [
      { label: "Engine", value: "Three.js" },
      { label: "Framework", value: "Next.js" },
      { label: "Status", value: "Live" },
    ],
    position: [-6, 0, -3],
    width: 1.0, depth: 1.0, height: 14,
    cameraPosition: [-4.5, 3.0, -0.8],
    cameraLookAt: [-6, 5.5, -3],
  },
  {
    id: "enginex-hub",
    title: "Enginex Hub",
    summary: "The central gateway for the CivilOS ecosystem — authentication, user profiles, project history, and navigation to all engineering tools.",
    description: "Enginex Hub is the unified entry point for the entire CivilOS engineering platform. It handles Firebase authentication, stores user profiles and preferences, maintains a history of all calculations and drawings, and provides navigation to every tool in the ecosystem. Think of it as the control room — a single sign-in gives access to structural design, estimating, drawing, project management, and reporting.",
    url: "https://enginex-hub.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Ecosystem Gateway",
    stats: [
      { label: "Role", value: "Gateway" },
      { label: "Backend", value: "Firebase" },
      { label: "Status", value: "In Progress" },
    ],
    position: [0, 0, -3],
    width: 0.85, depth: 0.85, height: 10,
    cameraPosition: [1.5, 2.3, -0.8],
    cameraLookAt: [0, 3.8, -3],
  },
  {
    id: "enginex-structural",
    title: "Enginex Structural",
    summary: "End-to-end structural design tool compliant with BNBC 2020 and ACI 318-19 — beams, columns, slabs, footings, shear walls, seismic analysis, and DXF export.",
    description: "Enginex Structural is a comprehensive structural engineering design suite built for Bangladeshi practice. It covers the full design workflow: beam and column design per ACI 318-19, slab and flat-plate analysis, isolated and raft footing design, shear wall and retaining wall checks, all verified against BNBC 2020 load combinations. Advanced features include a 3D space frame solver with P-Delta effects, seismic response analysis, BBS generation, and DXF export for AutoCAD.",
    url: "https://enginex-structural.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Structural Engineering Suite",
    stats: [
      { label: "Modules", value: "20+" },
      { label: "Compliance", value: "BNBC 2020" },
      { label: "Status", value: "Live" },
    ],
    position: [6, 0, -3],
    width: 0.85, depth: 0.85, height: 13,
    cameraPosition: [7.5, 2.7, -0.8],
    cameraLookAt: [6, 5.0, -3],
  },

  // ── Row C  (z = +2) ────────────────────────────────────────────────
  {
    id: "enginex-learning",
    title: "Enginex Learning",
    summary: "Civil engineering learning platform with MCQ, Viva, and Flashcard modes — BNBC syllabus-aligned, ideal for exam preparation.",
    description: "Enginex Learning makes civil engineering education accessible and engaging. The platform offers three study modes: multiple-choice quizzes with instant feedback, viva-style question sessions to test recall, and spaced-repetition flashcards for long-term retention. All content is aligned with the BNBC syllabus and covers core topics including soil mechanics, structural analysis, materials science, and construction management.",
    url: "https://enginex-learning.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Civil Engineering E-Learning",
    stats: [
      { label: "Modes", value: "MCQ / Viva / Flash" },
      { label: "Syllabus", value: "BNBC" },
      { label: "Status", value: "Live" },
    ],
    position: [-7, 0, 2],
    width: 0.85, depth: 0.85, height: 9.5,
    cameraPosition: [-5.5, 2.2, 4.2],
    cameraLookAt: [-7, 3.6, 2],
  },
  {
    id: "enginex-projectmgmt",
    title: "Enginex Project Mgmt",
    summary: "Construction project management software for Bangladesh — Gantt charts, progress tracking, team coordination, and RAJUK/CDA compliance.",
    description: "Enginex Project Management is purpose-built for the Bangladeshi construction industry. Project managers can build Gantt charts, assign tasks to site teams, track daily progress with photo uploads, and generate progress reports for clients. The system maintains a compliance checklist aligned with RAJUK and CDA approval requirements, helping teams stay audit-ready throughout the construction lifecycle.",
    url: "https://enginex-projectmgmt.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction PM Software",
    stats: [
      { label: "Type", value: "PM Software" },
      { label: "Standard", value: "RAJUK / CDA" },
      { label: "Status", value: "Live" },
    ],
    position: [0, 0, 2],
    width: 0.85, depth: 0.85, height: 8.5,
    cameraPosition: [1.5, 2.1, 4.2],
    cameraLookAt: [0, 3.2, 2],
  },
  {
    id: "enginex-estimate",
    title: "Enginex Estimate",
    summary: "Automated cost estimation using real Bangladeshi market prices — generates full BOQ for rebar, cement, bricks, and all construction materials with PDF/Excel export.",
    description: "Enginex Estimate eliminates manual BOQ preparation by automating cost calculation based on live Bangladeshi construction material prices. Engineers input structural dimensions; the system references a curated database of local material rates (rebar brands, cement grades, brick types, sand, aggregate) and generates a detailed Bill of Quantities. Outputs can be exported as PDF for client submission or Excel for further customization.",
    url: "https://enginex-estimate.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction Cost Estimator",
    stats: [
      { label: "Materials", value: "Local BD Rates" },
      { label: "Export", value: "PDF / Excel" },
      { label: "Status", value: "Live" },
    ],
    position: [7, 0, 2],
    width: 0.85, depth: 0.85, height: 11,
    cameraPosition: [8.5, 2.4, 4.2],
    cameraLookAt: [7, 4.0, 2],
  },

  // ── Row D  (z = +7) ────────────────────────────────────────────────
  {
    id: "build-enginex",
    title: "Build Enginex",
    summary: "Online marketplace for Bangladeshi construction materials — rebar, cement, sand, and more, with bKash and SSLCommerz payment support.",
    description: "Build Enginex is a construction materials e-commerce platform tailored for Bangladesh. Suppliers list products — rebar bundles, cement bags, bricks, sand, aggregate, tiles — and contractors can order directly with quantity discounts. The platform integrates bKash for mobile payments and SSLCommerz for card payments, with delivery tracking and invoice generation built in.",
    url: "https://build-enginex.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction E-Commerce BD",
    stats: [
      { label: "Type", value: "E-Commerce" },
      { label: "Payments", value: "bKash / SSLCommerz" },
      { label: "Status", value: "Live" },
    ],
    position: [-7, 0, 7],
    width: 0.85, depth: 0.85, height: 10,
    cameraPosition: [-5.5, 2.3, 9.2],
    cameraLookAt: [-7, 3.8, 7],
  },
  {
    id: "enginex-reports",
    title: "Enginex Reports",
    summary: "Professional engineering report generator — auto-produces BNBC-compliant structural, estimate, and BOQ reports as polished PDFs.",
    description: "Enginex Reports transforms raw engineering calculations into professional client-ready documents. Connected to the structural, estimate, and drawing modules, it pulls calculation data and formats it into BNBC-compliant report templates — complete with cover page, project details, calculation sheets, result summaries, and engineer's signature block. Reports are generated as high-quality PDFs ready for submission to RAJUK or client handover.",
    url: "https://enginex-reports.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Engineering Report Generator",
    stats: [
      { label: "Output", value: "PDF" },
      { label: "Standard", value: "BNBC" },
      { label: "Status", value: "Live" },
    ],
    position: [0, 0, 7],
    width: 0.85, depth: 0.85, height: 7.5,
    cameraPosition: [1.5, 2.0, 9.2],
    cameraLookAt: [0, 2.8, 7],
  },
  {
    id: "brotherfit-universe",
    title: "BrotherFit Universe",
    summary: "The extended BrotherFit ecosystem — fitness challenges, global leaderboards, and community events with gamification to make exercise enjoyable.",
    description: "BrotherFit Universe expands the core fitness app into a full gamified ecosystem. Users compete in weekly and monthly fitness challenges, climb global and regional leaderboards, unlock achievement badges, and participate in community events organized by local gyms and fitness coaches. The gamification layer — streaks, XP points, and rank tiers — is designed to sustain long-term motivation and build a lasting fitness habit.",
    url: "https://brotherfituniverse.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Gamified Fitness Ecosystem",
    stats: [
      { label: "Feature", value: "Leaderboard" },
      { label: "Type", value: "Gamified" },
      { label: "Status", value: "Live" },
    ],
    position: [7, 0, 7],
    width: 0.85, depth: 0.85, height: 9,
    cameraPosition: [8.5, 2.2, 9.2],
    cameraLookAt: [7, 3.5, 7],
  },
];

export const LANDMARK_EXCLUSION_RADIUS = 1.8;

export function isNearLandmark(x: number, z: number): boolean {
  return PROJECT_LANDMARKS.some((landmark) => {
    const dx = landmark.position[0] - x;
    const dz = landmark.position[2] - z;
    return Math.sqrt(dx * dx + dz * dz) < LANDMARK_EXCLUSION_RADIUS;
  });
}

export const landmarkVector = (landmark: ProjectLandmark) =>
  new THREE.Vector3(...landmark.position);
