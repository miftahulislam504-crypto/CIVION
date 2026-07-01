import * as THREE from "three";

export type ProjectStat = { label: string; value: string };

export type ProjectLandmark = {
  id: string;
  title: string;
  summary: string;
  description: string;
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

/**
 * 15 projects in exact order:
 *  1. BrotherFit
 *  2. UmmahNet
 *  3. Build EngineX
 *  4. Business Suites
 *  5. Ak-Ummah Foundation
 *  6. Chemistry Unfiltered
 *  7. Mathematical Univerces
 *  8. Physicsverse
 *  9. EngineX Hub
 * 10. EngineX Arch Drawing
 * 11. EngineX Structural
 * 12. EngineX Estimate
 * 13. EngineX Project Mgmt
 * 14. EngineX Reports
 * 15. EngineX Learning
 *
 * Layout — 3 rows of 5, city footprint ±12 units:
 *   Row A (z=-8): projects 1–5
 *   Row B (z= 0): projects 6–10
 *   Row C (z=+8): projects 11–15
 *
 * X positions per row: -10, -5, 0, +5, +10
 */

export const PROJECT_LANDMARKS: ProjectLandmark[] = [

  // ── Row A  (z = -8) ────────────────────────────────────────────────

  // 1
  {
    id: "brotherfit",
    title: "BrotherFit",
    summary: "BrotherFit is a modern clothing brand and e-commerce platform focused on stylish, comfortable, and high-quality fashion for everyday wear. We create trendy and premium apparel designed for people who value confidence, comfort, and individuality",
    description: "At BrotherFit, fashion is more than clothing — it’s a lifestyle. Our collections combine modern design, quality materials, and affordable pricing to deliver the perfect balance of style and comfort. From casual wear to streetwear-inspired fashion, we aim to provide outfits that fit every personality and occasion.Our mission is to make online shopping simple, reliable, and enjoyable by offering fashionable products, smooth customer experience, and trusted service. BrotherFit is committed to helping you look good, feel confident, and express your style with ease.",
    url: "https://brotherfit.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Fitness Social Platform",
    stats: [
      { label: "Type", value: "Social" },
      { label: "Stack", value: "Next.js + Firebase" },
      { label: "Status", value: "Live" },
    ],
    position: [-10, 0, -8],
    width: 0.85, depth: 0.85, height: 12,
    cameraPosition: [-8.5, 2.5, -5.5],
    cameraLookAt: [-10, 4.5, -8],
  },

  // 2
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
    position: [-5, 0, -8],
    width: 0.85, depth: 0.85, height: 10,
    cameraPosition: [-3.5, 2.3, -5.5],
    cameraLookAt: [-5, 3.8, -8],
  },

  // 3
  {
    id: "build-enginex",
    title: "Build EngineX",
    summary: "Online marketplace for Bangladeshi construction materials — rebar, cement, sand, and more, with bKash and SSLCommerz payment support.",
    description: "Build EngineX is a construction materials e-commerce platform tailored for Bangladesh. Suppliers list products — rebar bundles, cement bags, bricks, sand, aggregate, tiles — and contractors can order directly with quantity discounts. The platform integrates bKash for mobile payments and SSLCommerz for card payments, with delivery tracking and invoice generation built in.",
    url: "https://build-enginex.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction E-Commerce BD",
    stats: [
      { label: "Type", value: "E-Commerce" },
      { label: "Payments", value: "bKash / SSLCommerz" },
      { label: "Status", value: "Live" },
    ],
    position: [0, 0, -8],
    width: 0.85, depth: 0.85, height: 11,
    cameraPosition: [1.5, 2.4, -5.5],
    cameraLookAt: [0, 4.0, -8],
  },

  // 4
  {
    id: "business-suites",
    title: "Business Suites",
    summary: "An all-in-one business management platform — invoicing, inventory, HR, and analytics designed for small and medium enterprises in Bangladesh.",
    description: "Business Suites is a comprehensive business management solution built for Bangladeshi SMEs. It covers invoicing and billing, inventory management, employee HR records, payroll processing, and a real-time analytics dashboard. The platform is designed to replace disconnected spreadsheets with a single unified system that any business owner can operate without technical expertise.",
    url: "https://businesssuites.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Business Management Platform",
    stats: [
      { label: "Type", value: "SaaS" },
      { label: "Target", value: "SME" },
      { label: "Status", value: "Live" },
    ],
    position: [5, 0, -8],
    width: 0.85, depth: 0.85, height: 9,
    cameraPosition: [6.5, 2.2, -5.5],
    cameraLookAt: [5, 3.5, -8],
  },

  // 5
  {
    id: "ak-ummah-foundation",
    title: "Ak-Ummah Foundation",
    summary: "A digital platform for the Ak-Ummah Foundation — donation management, charity campaigns, and Islamic welfare programs.",
    description: "The Ak-Ummah Foundation platform provides a transparent and accessible digital home for charitable operations. It supports online donations with bKash integration, manages zakat and sadaqah campaigns, tracks fund distribution, and publishes impact reports. The system is built to build trust with donors through real-time campaign progress and verified beneficiary stories.",
    url: "https://akummahfoundation.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Islamic Charity Platform",
    stats: [
      { label: "Type", value: "Non-Profit" },
      { label: "Payment", value: "bKash" },
      { label: "Status", value: "Live" },
    ],
    position: [10, 0, -8],
    width: 0.85, depth: 0.85, height: 8,
    cameraPosition: [11.5, 2.1, -5.5],
    cameraLookAt: [10, 3.2, -8],
  },

  // ── Row B  (z = 0) ─────────────────────────────────────────────────

  // 6
  {
    id: "chemistry-unfiltered",
    title: "Chemistry Unfiltered",
    summary: "A Bengali-language chemistry education platform — interactive lessons, periodic table, and topic-based content for students at all levels.",
    description: "Chemistry Unfiltered makes chemistry education accessible to Bangladeshi students in their native language. Built with Next.js and Firebase, the platform features a three-tier content hierarchy (Subject → Chapter → Topic), an interactive periodic table with electron shell visualizations, and rich lesson content. The goal is to remove the language barrier that makes chemistry feel impossible for many students.",
    url: "https://chemistry-unfiltered.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Chemistry Education Platform",
    stats: [
      { label: "Language", value: "Bengali" },
      { label: "Stack", value: "Next.js + Firebase" },
      { label: "Status", value: "Live" },
    ],
    position: [-10, 0, 0],
    width: 0.85, depth: 0.85, height: 10.5,
    cameraPosition: [-8.5, 2.4, 2.5],
    cameraLookAt: [-10, 4.0, 0],
  },

  // 7
  {
    id: "mathxuniverse",
    title: "mathxuniverse",
    summary: "An interactive mathematics learning universe — visual explanations, problem sets, and concept maps for students exploring higher mathematics.",
    description: "Mathematical Univerces reimagines how mathematics is taught by making abstract concepts visual and explorable. The platform organizes math topics as a navigable universe of interconnected concepts — algebra, calculus, geometry, statistics — each with visual explanations, worked examples, and practice problem sets. Designed to build genuine mathematical intuition rather than just rote formula memorization.",
    url: "https://mathxuniverse.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Mathematics Education",
    stats: [
      { label: "Subjects", value: "10+" },
      { label: "Type", value: "Interactive" },
      { label: "Status", value: "Live" },
    ],
    position: [-5, 0, 0],
    width: 0.85, depth: 0.85, height: 9.5,
    cameraPosition: [-3.5, 2.2, 2.5],
    cameraLookAt: [-5, 3.6, 0],
  },

  // 8
  {
    id: "physicsverse",
    title: "Physicsverse",
    summary: "A physics education platform with interactive simulations, visual experiments, and concept-driven lessons for secondary and higher secondary students.",
    description: "Physicsverse brings physics to life through interactive simulations and visual experiments. Students can run virtual labs — projectile motion, wave interference, electric circuits, thermodynamics — without any physical equipment. Lessons are structured around building intuition first, then formalizing with equations. Targeted at SSC and HSC students preparing for board exams and university admission tests.",
    url: "https://physicsverse.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Physics Education Platform",
    stats: [
      { label: "Level", value: "SSC / HSC" },
      { label: "Feature", value: "Simulations" },
      { label: "Status", value: "Live" },
    ],
    position: [0, 0, 0],
    width: 0.85, depth: 0.85, height: 11.5,
    cameraPosition: [1.5, 2.5, 2.5],
    cameraLookAt: [0, 4.2, 0],
  },

  // 9
  {
    id: "enginex-hub",
    title: "EngineX Hub",
    summary: "The central gateway for the EngineX ecosystem — authentication, user profiles, project history, and navigation to all engineering tools.",
    description: "EngineX Hub is the unified entry point for the entire EngineX engineering platform. It handles Firebase authentication, stores user profiles and preferences, maintains a history of all calculations and drawings, and provides navigation to every tool in the ecosystem. Think of it as the control room — a single sign-in gives access to structural design, estimating, drawing, project management, and reporting.",
    url: "https://enginex-hub.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Ecosystem Gateway",
    stats: [
      { label: "Role", value: "Gateway" },
      { label: "Backend", value: "Firebase" },
      { label: "Status", value: "Live" },
    ],
    position: [5, 0, 0],
    width: 0.85, depth: 0.85, height: 10,
    cameraPosition: [6.5, 2.3, 2.5],
    cameraLookAt: [5, 3.8, 0],
  },

  // 10
  {
    id: "enginex-archdrawing",
    title: "EngineX Arch Drawing",
    summary: "Browser-based architectural drafting tool — create BNBC-compliant floor plans, elevations, and section drawings with PDF/SVG export.",
    description: "EngineX Arch Drawing brings professional CAD capabilities directly to the browser, eliminating the need for expensive desktop software. Engineers and architects can draft floor plans, elevations, and cross-sections following BNBC guidelines. The tool supports multi-layer drawings, dimension annotations, and one-click export to PDF or SVG. Designed for Bangladeshi building standards from the ground up.",
    url: "https://enginex-archdrawing.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "CAD / BIM in Browser",
    stats: [
      { label: "Phases", value: "12" },
      { label: "Export", value: "PDF / SVG" },
      { label: "Standard", value: "BNBC" },
    ],
    position: [10, 0, 0],
    width: 0.85, depth: 0.85, height: 12,
    cameraPosition: [11.5, 2.5, 2.5],
    cameraLookAt: [10, 4.5, 0],
  },

  // ── Row C  (z = +8) ────────────────────────────────────────────────

  // 11
  {
    id: "enginex-structural",
    title: "EngineX Structural",
    summary: "End-to-end structural design compliant with BNBC 2020 and ACI 318-19 — beams, columns, slabs, footings, shear walls, seismic analysis, and DXF export.",
    description: "EngineX Structural is a comprehensive structural engineering design suite built for Bangladeshi practice. It covers the full design workflow: beam and column design per ACI 318-19, slab and flat-plate analysis, isolated and raft footing design, shear wall and retaining wall checks — all verified against BNBC 2020 load combinations. Advanced features include a 3D space frame solver with P-Delta effects, seismic response analysis, BBS generation, and DXF export for AutoCAD.",
    url: "https://enginex-structural.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Structural Engineering Suite",
    stats: [
      { label: "Modules", value: "20+" },
      { label: "Compliance", value: "BNBC 2020" },
      { label: "Status", value: "Live" },
    ],
    position: [-10, 0, 8],
    width: 0.85, depth: 0.85, height: 14,
    cameraPosition: [-8.5, 2.8, 10.5],
    cameraLookAt: [-10, 5.2, 8],
  },

  // 12
  {
    id: "enginex-estimate",
    title: "EngineX Estimate",
    summary: "Automated cost estimation using real Bangladeshi market prices — generates full BOQ for rebar, cement, bricks, and all construction materials.",
    description: "EngineX Estimate eliminates manual BOQ preparation by automating cost calculation based on live Bangladeshi construction material prices. Engineers input structural dimensions; the system references a curated database of local material rates and generates a detailed Bill of Quantities. Outputs can be exported as PDF for client submission or Excel for further customization.",
    url: "https://enginex-estimate.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction Cost Estimator",
    stats: [
      { label: "Materials", value: "Local BD Rates" },
      { label: "Export", value: "PDF / Excel" },
      { label: "Status", value: "Live" },
    ],
    position: [-5, 0, 8],
    width: 0.85, depth: 0.85, height: 11,
    cameraPosition: [-3.5, 2.4, 10.5],
    cameraLookAt: [-5, 4.0, 8],
  },

  // 13
  {
    id: "enginex-projectmgmt",
    title: "EngineX Project Mgmt",
    summary: "Construction project management software for Bangladesh — Gantt charts, progress tracking, team coordination, and RAJUK/CDA compliance.",
    description: "EngineX Project Management is purpose-built for the Bangladeshi construction industry. Project managers can build Gantt charts, assign tasks to site teams, track daily progress with photo uploads, and generate progress reports for clients. The system maintains a compliance checklist aligned with RAJUK and CDA approval requirements, helping teams stay audit-ready throughout the construction lifecycle.",
    url: "https://enginex-projectmgmt.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction PM Software",
    stats: [
      { label: "Type", value: "PM Software" },
      { label: "Standard", value: "RAJUK / CDA" },
      { label: "Status", value: "Live" },
    ],
    position: [0, 0, 8],
    width: 0.85, depth: 0.85, height: 9,
    cameraPosition: [1.5, 2.2, 10.5],
    cameraLookAt: [0, 3.5, 8],
  },

  // 14
  {
    id: "enginex-reports",
    title: "EngineX Reports",
    summary: "Professional engineering report generator — auto-produces BNBC-compliant structural, estimate, and BOQ reports as polished PDFs.",
    description: "EngineX Reports transforms raw engineering calculations into professional client-ready documents. Connected to the structural, estimate, and drawing modules, it pulls calculation data and formats it into BNBC-compliant report templates — complete with cover page, project details, calculation sheets, result summaries, and engineer's signature block. Reports are generated as high-quality PDFs ready for submission to RAJUK or client handover.",
    url: "https://enginex-reports.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Engineering Report Generator",
    stats: [
      { label: "Output", value: "PDF" },
      { label: "Standard", value: "BNBC" },
      { label: "Status", value: "Live" },
    ],
    position: [5, 0, 8],
    width: 0.85, depth: 0.85, height: 8,
    cameraPosition: [6.5, 2.1, 10.5],
    cameraLookAt: [5, 3.0, 8],
  },

  // 15
  {
    id: "enginex-learning",
    title: "EngineX Learning",
    summary: "Civil engineering learning platform with MCQ, Viva, and Flashcard modes — BNBC syllabus-aligned, ideal for exam preparation.",
    description: "EngineX Learning makes civil engineering education accessible and engaging. The platform offers three study modes: multiple-choice quizzes with instant feedback, viva-style question sessions to test recall, and spaced-repetition flashcards for long-term retention. All content is aligned with the BNBC syllabus and covers core topics including soil mechanics, structural analysis, materials science, and construction management.",
    url: "https://enginex-learning.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Civil Engineering E-Learning",
    stats: [
      { label: "Modes", value: "MCQ / Viva / Flash" },
      { label: "Syllabus", value: "BNBC" },
      { label: "Status", value: "Live" },
    ],
    position: [10, 0, 8],
    width: 0.85, depth: 0.85, height: 10,
    cameraPosition: [11.5, 2.3, 10.5],
    cameraLookAt: [10, 3.8, 8],
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
