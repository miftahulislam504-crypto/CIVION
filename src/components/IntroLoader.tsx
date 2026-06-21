"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useIntroState } from "@/hooks/useIntroState";

const LOAD_DURATION = 2200; // ms, how long the progress bar takes to fill
const HOLD_AT_100 = 350; // ms, brief pause once it hits 100% before fading
const FADE_DURATION = 700; // ms — keep in sync with the transitionDuration style below
const SCROLL_RELEASE_DELAY = 1800; // ms after intro hands off — lets the camera dolly/text reveal play before scroll can interrupt it

export default function IntroLoader() {
  const lenis = useLenis();
  const { introDone, setIntroDone } = useIntroState();
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);

  // Lock scroll for as long as the loader is up.
  useEffect(() => {
    if (!introDone) {
      lenis?.stop();
    }
  }, [lenis, introDone]);

  // Release scroll a beat after handoff, not the instant it happens — the
  // cinematic camera dolly and staged text reveal need a moment to play
  // before the user can scroll past them.
  useEffect(() => {
    if (!introDone) return;
    const timeout = setTimeout(() => {
      lenis?.start();
    }, SCROLL_RELEASE_DELAY);
    return () => clearTimeout(timeout);
  }, [introDone, lenis]);

  // Drive the progress bar once, on mount.
  useEffect(() => {
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100));
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setFading(true);
          setIntroDone(true);
          setTimeout(() => setMounted(false), FADE_DURATION);
        }, HOLD_AT_100);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setIntroDone]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-graphite transition-opacity ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      aria-hidden={fading}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,226,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,226,230,0.06) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Pure animation, no wordmark/copy — a rotating wireframe ring that
          fills in as progress advances, echoing the world's holographic
          grid language without spelling anything out. */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full animate-civion-spin">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(45,226,230,0.15)"
            strokeWidth="1.5"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#2de2e6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 44}
            strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
            style={{ transition: "stroke-dashoffset 150ms ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-neon-cyan animate-civion-pulse" />
        </div>
      </div>
    </div>
  );
}
