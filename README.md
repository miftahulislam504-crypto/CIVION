# CIVION

A cinematic civil-engineering portfolio site — Next.js 16, TypeScript, Tailwind v4, React Three Fiber, GSAP, and Lenis. Built phase by phase; see `CIVION_Development_Roadmap.md` for the full history and what's actually done vs. still open.

> **Status: feature-complete, not yet device-tested.** Every phase below has passed TypeScript, ESLint, and a production build in a sandboxed environment — but it has never been rendered in a real browser or on a real device. Run it yourself before trusting it.

---

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. First load shows the intro sequence; scroll moves the camera through Hero, then through each section below.

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Project structure

```
src/
 ├── app/             # Next.js App Router — layout.tsx, page.tsx, globals.css
 ├── components/      # Section content + global UI (cursor, audio, intro loader)
 │   └── ui/          # Shared design-system pieces: GlassPanel, Button, SectionHeading
 ├── scenes/          # Everything that renders inside a <Canvas> (R3F)
 ├── shaders/         # Raw GLSL source, imported by scenes that need it
 ├── hooks/           # useLenis, useIntroState, useInView, useQualityTier
 ├── utils/           # gsap.ts — the one place ScrollTrigger gets registered
 ├── animations/      # (currently empty — no shared GSAP timeline factories needed yet)
 ├── assets/          # (currently empty — no real images/3D models in use; everything is procedural)
 └── styles/          # (currently empty — all styling is Tailwind utilities + globals.css)
```

The last three folders exist because Phase 1's plan called for them, but nothing has needed them yet. Leave them or delete them — neither breaks anything.

---

## How the page is built

**Two kinds of "scene":**
1. **Hero's canvas** (`CanvasBackground.tsx`) — page-fixed, mounted once in the root layout, always present behind the scrollable content. Its camera only animates while scrolling through `#hero`; outside that range it sits frozen, hidden behind whichever section's opaque background is currently on top. It pauses its render loop entirely (`frameloop="never"`) once Hero scrolls out of view, so it isn't burning GPU the rest of the page.
2. **Section-local canvases** (Smart City, Final Cinematic) — live inside their own section, lazy-mounted via `useInView` only once scrolled near.

**Everything else** (Blueprint, Structural, Engineering Lab, Project Showcase, Timeline, Contact) is plain DOM/SVG + GSAP — deliberately not 3D, because none of that content needed a camera or real depth, just animation.

**Why some buildings repeat:** `SmartCityGrid` (the procedural city) is reused as-is by the Final Cinematic section — narratively it's the same city, just viewed from much farther away.

---

## Known gaps (honest list)

- **Contact form has no backend.** Submitting just flips the UI to a "transmitted" state — nothing is sent anywhere. Wire it to Firebase, Formspree, Resend, etc. before relying on it.
- **No real device testing.** Only sandbox build/lint/type-check has been verified. Test on an actual phone before launch.
- **No OG image.** `layout.tsx` has an OpenGraph block but no `images` entry — link previews will show no thumbnail until you add `/public/og-image.png` (1200×630) and reference it.
- **Default favicon.** `src/app/favicon.ico` is still the Next.js default — swap it for a CIVION mark.
- **Project Showcase data is placeholder.** Names are real (your actual projects), but the stats/descriptions are illustrative — edit `src/components/ProjectShowcase.tsx`.
- **Timeline years are placeholder.** Edit `src/components/Timeline.tsx` if the dates aren't right.
- **Engineering Lab's beam math is real** (simply-supported beam, point load, Euler-Bernoulli) but the deflection is visually magnified ×120 — it says so on the page, but worth knowing if you extend it.
- **No mobile-specific layout fork.** Performance scales via `useQualityTier` (lower device tier → lower DPR, fewer buildings, no postprocessing) rather than a separate mobile codepath. Should work, but only real-device testing confirms it.
- **Audio is fully synthesized**, not audio files — oscillators via Web Audio API. Starts muted; nothing plays until the user clicks the sound toggle (autoplay-policy compliant by construction).

---

## Deploying

Standard Next.js app, zero special config needed:

```bash
git init
git add .
git commit -m "CIVION"
git remote add origin <your-repo-url>
git push -u origin main
```

Then import the repo at vercel.com, or run `npx vercel` from this folder. No environment variables are required yet — that changes once the contact form gets a real backend.

---

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Three.js · React Three Fiber · @react-three/drei · @react-three/postprocessing · GSAP (+ ScrollTrigger) · Lenis
