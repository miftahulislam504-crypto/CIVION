"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import GlassPanel from "@/components/ui/GlassPanel";
import Button from "@/components/ui/Button";
import { useInView } from "@/hooks/useInView";

const HelmetCanvas = dynamic(() => import("@/scenes/HelmetCanvas"), {
  ssr: false,
});

export default function ContactHelmet() {
  const { ref, inView } = useInView<HTMLDivElement>("300px");
  const [revealed, setRevealed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // NOTE: no backend wired up yet — this just flips the UI to a
    // confirmation state. Connect to Firebase, Formspree, or similar
    // before relying on this in production.
    setSent(true);
  }

  return (
    <div ref={ref} className="relative max-w-xl mx-auto">
      {/* Idle state — the helmet itself, tap anywhere to open the form. */}
      <button
        type="button"
        data-cursor-hover
        onClick={() => setRevealed(true)}
        aria-label="Open contact form"
        className={`relative w-full flex flex-col items-center transition-all duration-500 ease-out ${
          revealed
            ? "opacity-0 scale-95 pointer-events-none absolute inset-0"
            : "opacity-100 scale-100"
        }`}
      >
        <div className="relative w-full h-64 sm:h-80">{inView && <HelmetCanvas />}</div>
        <span className="relative font-body text-xs tracking-[0.3em] uppercase text-neon-cyan animate-civion-pulse mt-2">
          Click To Contact
        </span>
      </button>

      {/* Revealed state — the actual channel. */}
      <div
        className={`transition-all duration-500 ease-out ${
          revealed
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none absolute inset-0"
        }`}
      >
        <GlassPanel className="p-8 sm:p-10">
          <button
            type="button"
            data-cursor-hover
            onClick={() => setRevealed(false)}
            className="font-body text-[11px] tracking-[0.2em] uppercase text-soft-white/50 hover:text-neon-cyan transition-colors mb-6"
          >
            ‹ Back
          </button>

          {sent ? (
            <p className="font-body text-sm text-neon-cyan text-center tracking-wide py-6">
              Message sent. Expect a response shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-1">
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-soft-white/50">
                  Name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border-b border-deep-space focus:border-neon-cyan/60 outline-none font-body text-sm text-soft-white py-1 transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-soft-white/50">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent border-b border-deep-space focus:border-neon-cyan/60 outline-none font-body text-sm text-soft-white py-1 transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-soft-white/50">
                  Message
                </span>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-transparent border-b border-deep-space focus:border-neon-cyan/60 outline-none font-body text-sm text-soft-white py-1 resize-none transition-colors"
                />
              </label>

              <Button type="submit" variant="solid" className="mt-2">
                Send
              </Button>
            </form>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
