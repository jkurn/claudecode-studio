import type { Metadata } from "next";
import Link from "next/link";
import { FRAMEWORKS } from "@/data/insights";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Insights — claudecode.studio",
  description:
    "Seven frameworks pulled from the Claude Community Australia livestream. The harness thesis, three-loop delivery, ghost libraries, kanban-driven development, and more.",
  openGraph: {
    title: "Insights — claudecode.studio",
    description:
      "Seven frameworks pulled from the Claude Community Australia livestream.",
    type: "article",
  },
};

export default function InsightsIndexPage() {
  return (
    <main id="main" className="min-h-screen">
      {/* ─── HEADER ─── */}
      <section className="px-6 pt-20 pb-12 border-b border-border/40">
        <div className="max-w-3xl mx-auto">
          <nav className="font-mono text-xs text-muted mb-10">
            <Link href="/" className="hover:text-accent transition-colors">
              ← claudecode.studio
            </Link>
          </nav>

          <div className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
            field notes · claude community australia · 2026-04-22
          </div>
          <h1
            className="mb-6 tracking-tight leading-[1.1]"
            style={{ fontSize: "48px", fontWeight: 700 }}
          >
            Seven frameworks from people who ship.
          </h1>
          <p
            className="text-muted max-w-2xl leading-relaxed"
            style={{ fontSize: "20px" }}
          >
            Two hours of livestream, compressed into the seven ideas worth
            keeping. Every framework below is the thing a serious builder
            chose to talk about on camera, attributed to the person who said
            it first.
          </p>
        </div>
      </section>

      {/* ─── FRAMEWORKS ─── */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {FRAMEWORKS.map((f, i) => (
            <Link
              key={f.slug}
              href={`/insights/${f.slug}`}
              className="block border border-border/60 rounded-xl p-6 bg-[var(--card)] hover:border-accent/50 hover:bg-surface-hover transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.levels.map((lvl) => (
                  <span
                    key={lvl}
                    className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-accent/10 text-accent"
                  >
                    {lvl}
                  </span>
                ))}
              </div>
              <h2
                className="font-semibold mb-2"
                style={{ fontSize: "22px" }}
              >
                {f.title}
              </h2>
              <p className="text-muted mb-4 text-[15px] leading-relaxed">
                {f.tagline}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs text-muted">
                  {f.speaker.name} · {f.speaker.city} · {f.speaker.role}
                </div>
                <span className="font-mono text-xs text-accent">read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── TAKE ACTION ─── */}
      <section className="px-6 py-16 border-t border-border/40 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="mb-4"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            Found one that lands?
          </h2>
          <p
            className="text-muted max-w-xl mx-auto mb-6"
            style={{ fontSize: "17px" }}
          >
            Take the 2-minute diagnostic. We&apos;ll match each week&apos;s
            drop to your level — including the challenges below, delivered in
            the order that makes sense for where you are.
          </p>
          <Link
            href="/#quiz"
            className="inline-block bg-accent text-white px-8 py-3.5 rounded-xl
                       hover:bg-accent-dim transition-colors"
            style={{ fontSize: "16px", fontWeight: 400 }}
          >
            Find your level →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
