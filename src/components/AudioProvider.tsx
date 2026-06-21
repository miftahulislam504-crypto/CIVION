"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type AudioEngine = {
  enabled: boolean;
  toggle: () => void;
  playPulse: () => void;
};

const AudioEngineContext = createContext<AudioEngine>({
  enabled: false,
  toggle: () => {},
  playPulse: () => {},
});

export function useAudioEngine() {
  return useContext(AudioEngineContext);
}

type DroneNodes = {
  oscillators: OscillatorNode[];
  gain: GainNode;
};

export default function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  // A ref, not the state above, is what playPulse/drone logic actually
  // reads — functions captured in stale closures elsewhere in the tree
  // still see the live value this way.
  const enabledRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const droneRef = useRef<DroneNodes | null>(null);

  function ensureContext(): AudioContext {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }

  function startDrone() {
    const ctx = ensureContext();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.05;
    masterGain.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 55; // deep bass hum
    osc1.connect(masterGain);
    osc1.start();

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 82.5; // a fifth above, for a wider drone
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.value = 0.5;
    osc2.connect(osc2Gain);
    osc2Gain.connect(masterGain);
    osc2.start();

    droneRef.current = { oscillators: [osc1, osc2], gain: masterGain };
  }

  function stopDrone() {
    const drone = droneRef.current;
    if (!drone) return;
    drone.oscillators.forEach((osc) => osc.stop());
    droneRef.current = null;
  }

  function toggle() {
    const next = !enabledRef.current;
    enabledRef.current = next;

    if (next) {
      const ctx = ensureContext();
      ctx.resume();
      startDrone();
    } else {
      stopDrone();
    }

    setEnabled(next);
  }

  function playPulse() {
    if (!enabledRef.current) return;
    const ctx = ensureContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  useEffect(() => {
    return () => {
      stopDrone();
      ctxRef.current?.close();
    };
  }, []);

  return (
    <AudioEngineContext.Provider value={{ enabled, toggle, playPulse }}>
      {children}
    </AudioEngineContext.Provider>
  );
}
