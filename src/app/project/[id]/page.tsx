import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECT_LANDMARKS } from "@/scenes/projectLandmarks";

export function generateStaticParams() {
  return PROJECT_LANDMARKS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECT_LANDMARKS.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — CIVION`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECT_LANDMARKS.find((p) => p.id === id);
  if (!project) notFound();

  const idx = PROJECT_LANDMARKS.indexOf(project);
  const prev = PROJECT_LANDMARKS[idx - 1] ?? null;
  const next = PROJECT_LANDMARKS[idx + 1] ?? null;

  return (
    <div
      className="min-h-screen text-soft-white flex flex-col"
      style={{ background: "#0a0a0b" }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,226,230,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(45,226,230,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Top bar ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-5"
        style={{ borderBottom: "1px solid rgba(45,226,230,0.08)", background: "rgba(10,10,11,0.85)", backdropFilter: "blur(12px)" }}
      >
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-soft-white/40 hover:text-neon-cyan transition-colors"
        >
          ‹ Back
        </Link>

        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/30">
          CIVION
        </span>

        <span className="font-mono text-[10px] tracking-[0.15em] text-soft-white/25">
          {String(idx + 1).padStart(2, "0")} / {String(PROJECT_LANDMARKS.length).padStart(2, "0")}
        </span>
      </header>

      {/* ── Hero block ── */}
      <section className="relative pt-28 pb-12 px-6 border-b" style={{ borderColor: "rgba(45,226,230,0.08)" }}>
        {/* Glow */}
        <div
          className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(45,226,230,0.04) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-lg">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/50 mb-4">
            PORTFOLIO_CO_{String(idx + 1).padStart(2, "0")}
          </p>

          <h1 className="font-mono text-4xl sm:text-5xl font-bold leading-none mb-3 text-soft-white">
            {project.title}
          </h1>

          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/40 mb-6">
            {project.tag}
          </p>

          <div className="w-8 h-px mb-6" style={{ background: "rgba(45,226,230,0.35)" }} />

          <p className="font-mono text-xs text-soft-white/55 leading-relaxed">
            {project.location} &mdash; {project.year}
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="flex-1 px-6 py-12 max-w-lg w-full">

        {/* Stats */}
        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/40 mb-5">
            /////// Data
          </p>
          <div className="grid grid-cols-3 gap-6">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-soft-white/30 mb-1">
                  {stat.label}
                </p>
                <p className="font-mono text-sm text-neon-cyan font-bold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-10" style={{ borderTop: "1px solid rgba(45,226,230,0.08)", paddingTop: "2.5rem" }}>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/40 mb-5">
            /////// Summary
          </p>
          <p className="font-mono text-sm text-soft-white/70 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Description */}
        <div className="mb-12" style={{ borderTop: "1px solid rgba(45,226,230,0.08)", paddingTop: "2.5rem" }}>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/40 mb-5">
            /////// About
          </p>
          <p className="font-mono text-sm text-soft-white/60 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Visit CTA */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-neon-cyan hover:text-soft-white transition-colors mb-16"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "#2de2e6", boxShadow: "0 0 6px rgba(45,226,230,0.8)" }}
          />
          D {project.year.slice(2)}.01.01 &nbsp; Visit Live Site →
        </a>

        {/* Prev / Next */}
        <div
          className="grid grid-cols-2 gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(45,226,230,0.08)" }}
        >
          <div>
            {prev && (
              <Link href={`/project/${prev.id}`} className="group block">
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-soft-white/25 mb-1">
                  ‹ Prev
                </p>
                <p className="font-mono text-xs text-soft-white/50 group-hover:text-neon-cyan transition-colors">
                  {prev.title}
                </p>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/project/${next.id}`} className="group block">
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-soft-white/25 mb-1">
                  Next ›
                </p>
                <p className="font-mono text-xs text-soft-white/50 group-hover:text-neon-cyan transition-colors">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-5"
        style={{ borderTop: "1px solid rgba(45,226,230,0.08)" }}
      >
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-soft-white/20">
          // CIVION &mdash; Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
