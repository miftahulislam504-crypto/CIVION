"use client";

import { useAudioEngine } from "@/components/AudioProvider";

export default function AudioToggle() {
  const { enabled, toggle } = useAudioEngine();

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor-hover
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      className="fixed bottom-6 left-6 z-20 font-body text-xs tracking-[0.2em] text-neon-cyan/80 border border-neon-cyan/30 rounded-full px-3 py-1.5 hover:border-neon-cyan/70 hover:text-neon-cyan transition-colors bg-graphite/60 backdrop-blur-sm"
    >
      {enabled ? "🔊 SOUND ON" : "🔈 SOUND OFF"}
    </button>
  );
}
