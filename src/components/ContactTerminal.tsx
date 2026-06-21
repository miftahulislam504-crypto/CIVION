"use client";

import { useState } from "react";
import GlassPanel from "@/components/ui/GlassPanel";
import Button from "@/components/ui/Button";

export default function ContactTerminal() {
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
    <GlassPanel showGrid clipOverflow className="max-w-xl mx-auto p-8 sm:p-10">

      <div className="relative flex items-end justify-center gap-1 h-8 mb-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="w-1 bg-neon-cyan/60 rounded-full animate-civion-wave"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      {sent ? (
        <p className="relative font-body text-sm text-neon-cyan text-center tracking-wide">
          &gt; MESSAGE TRANSMITTED. EXPECT A RESPONSE SHORTLY.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
          <label className="flex flex-col gap-1">
            <span className="font-body text-[11px] tracking-[0.2em] text-neon-cyan/70">
              &gt; NAME
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border-b border-deep-space focus:border-neon-cyan/60 outline-none font-body text-sm text-soft-white py-1 transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-body text-[11px] tracking-[0.2em] text-neon-cyan/70">
              &gt; EMAIL
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
            <span className="font-body text-[11px] tracking-[0.2em] text-neon-cyan/70">
              &gt; MESSAGE
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
            Transmit
          </Button>
        </form>
      )}
    </GlassPanel>
  );
}
