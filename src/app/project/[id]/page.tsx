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
      {/* Subtle background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,226,230,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,226,230,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.5,
        }}
      />

      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-4"
        style={{
          borderBottom: "1px solid rgba(45,226,230,0.1)",
          background: "rgba(10,10,11,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-soft-white/40 hover:text-neon-cyan transition-colors"
        >
          ‹ Back
        </Link>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-neon-cyan/30">
          CIVION
        </span>
        <span className="font-mono text-[10px] text-soft-white/20">
          {String(idx + 1).padStart(2, "0")} / {String(PROJECT_LANDMARKS.length).padStart(2, "0")}
        </span>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative px-5 pt-8 pb-7"
        style={{ borderBottom: "1px solid rgba(45,226,230,0.08)" }}
      >
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neon-cyan/50 mb-2">
          PORTFOLIO_CO_{String(idx + 1).padStart(2, "0")}
        </p>
        <h1 className="font-mono text-4xl font-bold leading-none mb-2 text-soft-white">
          {project.title}
        </h1>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neon-cyan/40 mb-4">
          {project.tag}
        </p>
        <div className="w-7 h-px mb-4" style={{ background: "rgba(45,226,230,0.3)" }} />
        <p className="font-mono text-[11px] text-soft-white/40">
          {project.location} &mdash; {project.year}
        </p>
      </section>

      {/* ── Content ── */}
      <main className="flex-1 px-5">

        {/* Data */}
        <div
          className="py-6"
          style={{ borderBottom: "1px solid rgba(45,226,230,0.08)" }}
        >
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neon-cyan/40 mb-4">
            /////// Data
          </p>
          <div className="grid grid-cols-3 gap-4">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-soft-white/25 mb-1">
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
        <div
          className="py-6"
          style={{ borderBottom: "1px solid rgba(45,226,230,0.08)" }}
        >
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neon-cyan/40 mb-3">
            /////// Summary
          </p>
          <p className="font-mono text-sm text-soft-white/65 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* About */}
        <div
          className="py-6"
          style={{ borderBottom: "1px solid rgba(45,226,230,0.08)" }}
        >
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neon-cyan/40 mb-3">
            /////// About
          </p>
          <p className="font-mono text-sm text-soft-white/55 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Visit CTA */}
        <div className="py-6" style={{ borderBottom: "1px solid rgba(45,226,230,0.08)" }}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-neon-cyan hover:text-soft-white transition-colors"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "#2de2e6", boxShadow: "0 0 5px rgba(45,226,230,0.7)" }}
            />
            Visit Live Site →
          </a>
        </div>

        {/* Prev / Next */}
        <div className="grid grid-cols-2 gap-4 py-6">
          <div>
            {prev && (
              <Link href={`/project/${prev.id}`} className="group block">
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-soft-white/20 mb-1">
                  ‹ Previous
                </p>
                <p className="font-mono text-xs text-soft-white/45 group-hover:text-neon-cyan transition-colors">
                  {prev.title}
                </p>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/project/${next.id}`} className="group block">
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-soft-white/20 mb-1">
                  Next ›
                </p>
                <p className="font-mono text-xs text-soft-white/45 group-hover:text-neon-cyan transition-colors">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="px-5 py-4"
        style={{ borderTop: "1px solid rgba(45,226,230,0.06)" }}
      >
        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-soft-white/15">
          // CIVION &mdash; Copyright &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
