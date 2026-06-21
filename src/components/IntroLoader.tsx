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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-graphite transition-opacity ease-out ${
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

      <span className="relative font-display text-3xl sm:text-4xl tracking-widest animate-civion-flicker">
        CIVION
      </span>

      <span className="relative font-body text-xs tracking-[0.25em] uppercase text-soft-white/60">
        System Initializing
      </span>

      <div className="relative w-56 sm:w-72 h-px bg-deep-space overflow-hidden">
        <div
          className="h-full bg-neon-cyan transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="relative font-body text-[11px] tracking-[0.2em] text-neon-cyan/70">
        Loading Infrastructure Intelligence — {progress}%
      </span>
    </div>
  );
}
