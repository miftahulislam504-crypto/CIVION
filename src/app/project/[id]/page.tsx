import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECT_LANDMARKS } from "@/scenes/projectLandmarks";

// Static generation — pre-build all 13 project pages
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

  // Neighbour projects for prev/next navigation
  const idx = PROJECT_LANDMARKS.indexOf(project);
  const prev = PROJECT_LANDMARKS[idx - 1] ?? null;
  const next = PROJECT_LANDMARKS[idx + 1] ?? null;

  return (
    <div className="min-h-screen bg-graphite text-soft-white flex flex-col">

      {/* ── Top bar ── */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 border-b border-neon-cyan/10 bg-graphite/80 backdrop-blur-md">
        <Link
          href="/"
          className="font-body text-[11px] tracking-[0.25em] uppercase text-soft-white/50 hover:text-neon-cyan transition-colors"
        >
          ‹ Back to City
        </Link>
        <span className="font-body text-[11px] tracking-[0.2em] uppercase text-neon-cyan/40">
          {String(idx + 1).padStart(2, "0")} / {String(PROJECT_LANDMARKS.length).padStart(2, "0")}
        </span>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex flex-col justify-end px-6 pt-28 pb-10 min-h-[42vh] border-b border-neon-cyan/10 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45,226,230,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,226,230,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Cyan glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl">
          <p className="font-body text-[11px] tracking-[0.3em] uppercase text-neon-cyan/60 mb-3">
            {project.location} &mdash; {project.year}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-3 leading-tight">
            {project.title}
          </h1>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-neon-cyan/50 mb-6">
            {project.tag}
          </p>
          <p className="font-body text-base text-soft-white/70 leading-relaxed max-w-xl">
            {project.summary}
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="flex-1 px-6 py-12 max-w-2xl w-full mx-auto">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-12 pb-10 border-b border-neon-cyan/10">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-soft-white/35 mb-1">
                {stat.label}
              </p>
              <p className="font-display text-lg text-neon-cyan">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="font-body text-[11px] tracking-[0.25em] uppercase text-neon-cyan/50 mb-5">
            About This Project
          </h2>
          <p className="font-body text-base text-soft-white/75 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Visit site CTA */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 w-full justify-center px-8 py-4 border border-neon-cyan/40 text-neon-cyan font-body text-xs tracking-[0.25em] uppercase rounded-sm hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 mb-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clipRule="evenodd"
            />
          </svg>
          Visit Live Site
        </a>

        {/* Prev / Next */}
        <div className="grid grid-cols-2 gap-4 border-t border-neon-cyan/10 pt-8">
          <div>
            {prev && (
              <Link
                href={`/project/${prev.id}`}
                className="block group"
              >
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-soft-white/35 mb-1">
                  ‹ Previous
                </p>
                <p className="font-display text-sm text-soft-white/70 group-hover:text-neon-cyan transition-colors">
                  {prev.title}
                </p>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link
                href={`/project/${next.id}`}
                className="block group"
              >
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-soft-white/35 mb-1">
                  Next ›
                </p>
                <p className="font-display text-sm text-soft-white/70 group-hover:text-neon-cyan transition-colors">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="px-6 py-6 border-t border-neon-cyan/10 text-center">
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-soft-white/25">
          CIVION &mdash; Engineering The Future
        </p>
      </footer>
    </div>
  );
}
