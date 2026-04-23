import type { Metadata } from "next";
import Link from "next/link";
import { TRACKS, AUTONOMY_LEVELS, RINGS } from "@/data/autonomy";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Capability vs Process — claudecode.studio",
  description:
    "Wei Li's autonomy framework, adapted for Claude Code builders. Why capability is the easy track and process is the one that actually bottlenecks you.",
  openGraph: {
    title: "Capability vs Process — claudecode.studio",
    description:
      "Wei Li's autonomy framework, adapted for Claude Code builders.",
    type: "article",
  },
};

export default function AutonomyPage() {
  return (
    <main className="min-h-screen">
      <section className="px-6 pt-16 pb-10 border-b border-border/40">
        <div className="max-w-3xl mx-auto">
          <nav className="font-mono text-xs text-muted mb-10">
            <Link href="/" className="hover:text-accent transition-colors">
              ← claudecode.studio
            </Link>
          </nav>

          <div className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
            framework · adapted from wei li, april 2026
          </div>
          <h1
            className="mb-4 tracking-tight leading-[1.1]"
            style={{ fontSize: "44px", fontWeight: 700 }}
          >
            Capability is easy. Process is the bottleneck.
          </h1>
          <p
            className="text-muted max-w-2xl leading-relaxed"
            style={{ fontSize: "19px" }}
          >
            Wei Li&apos;s <em>Practical Guide to GTM Autonomy</em> lays out a
            framework for sales reps moving from assisted AI to
            self-driving go-to-market. The underlying idea — capability
            vs. process, two tracks at four levels, applied inside your
            scope of control — lands cleanly for Claude Code builders. This
            is the builder version.
          </p>
        </div>
      </section>

      {/* Two tracks */}
      <section className="px-6 py-16 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="mb-3"
              style={{ fontSize: "30px", fontWeight: 700 }}
            >
              Two tracks
            </h2>
            <p
              className="text-muted max-w-xl mx-auto"
              style={{ fontSize: "17px" }}
            >
              Every level of autonomy requires progress on two
              fundamentally different tracks. Conflating them is the
              fastest way to stall.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {TRACKS.map((t) => (
              <div
                key={t.id}
                className="border border-border/60 rounded-xl p-6 bg-white"
              >
                <h3
                  className="font-semibold mb-3"
                  style={{ fontSize: "22px" }}
                >
                  {t.name}
                </h3>
                <div className="font-mono text-xs text-muted mb-4">
                  {t.question}
                </div>
                <p className="text-[15px] text-muted leading-relaxed mb-4">
                  <span className="font-semibold text-foreground">Owner: </span>
                  {t.owner}
                </p>
                <ul className="space-y-2 mb-4">
                  {t.examples.map((e) => (
                    <li key={e} className="text-[14px] text-muted leading-relaxed flex gap-2">
                      <span className="text-accent">·</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[14px] text-muted leading-relaxed italic border-t border-border/30 pt-4">
                  {t.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four levels */}
      <section className="px-6 py-16 border-t border-border/40 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3" style={{ fontSize: "30px", fontWeight: 700 }}>
              Four autonomy levels
            </h2>
            <p
              className="text-muted max-w-xl mx-auto"
              style={{ fontSize: "17px" }}
            >
              Each level inherits the work from the level below.
            </p>
          </div>

          <div className="space-y-6">
            {AUTONOMY_LEVELS.map((lvl) => (
              <div
                key={lvl.id}
                className="border border-border/60 rounded-xl p-6 bg-white"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent">
                    {lvl.id}
                  </span>
                  <h3 className="font-semibold" style={{ fontSize: "22px" }}>
                    {lvl.name}
                  </h3>
                </div>
                <p
                  className="text-muted italic mb-5"
                  style={{ fontSize: "16px" }}
                >
                  &ldquo;{lvl.mindset}&rdquo;
                </p>
                <p className="text-[15px] text-muted leading-relaxed mb-5">
                  <span className="font-semibold text-foreground">The shift: </span>
                  {lvl.cognitiveShift}
                </p>

                <div className="grid sm:grid-cols-2 gap-5 mt-6">
                  <div>
                    <div className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                      Capability you need
                    </div>
                    <ul className="space-y-1.5">
                      {lvl.capability.map((c) => (
                        <li
                          key={c}
                          className="text-[14px] text-muted leading-relaxed flex gap-2"
                        >
                          <span className="text-accent">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                      Process you own
                    </div>
                    <ul className="space-y-1.5">
                      {lvl.process.map((p) => (
                        <li
                          key={p}
                          className="text-[14px] text-muted leading-relaxed flex gap-2"
                        >
                          <span className="text-accent">·</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mt-6 pt-5 border-t border-border/30">
                  <div>
                    <div className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                      If you&apos;re building software
                    </div>
                    <p className="text-[14px] text-muted leading-relaxed">
                      {lvl.codeExample}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
                      If you&apos;re selling
                    </div>
                    <p className="text-[14px] text-muted leading-relaxed">
                      {lvl.gtmExample}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rings of ownership */}
      <section className="px-6 py-16 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3" style={{ fontSize: "30px", fontWeight: 700 }}>
              Four rings of ownership
            </h2>
            <p
              className="text-muted max-w-xl mx-auto"
              style={{ fontSize: "17px" }}
            >
              Start with what you actually control. When you&apos;re told to
              &ldquo;think like a VP of Engineering,&rdquo; most people
              freeze because they associate it with Ring 4. But a VP
              operates at Ring 1 too — the goal is to apply leadership
              thinking to the scope you already own.
            </p>
          </div>

          <div className="space-y-3">
            {RINGS.map((r) => (
              <div
                key={r.id}
                className={`border rounded-xl p-5 ${
                  r.inScope
                    ? "border-accent/30 bg-accent/5"
                    : "border-border/40 bg-white"
                }`}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                      r.inScope
                        ? "bg-accent/10 text-accent"
                        : "bg-muted/10 text-muted"
                    }`}
                  >
                    {r.id}
                  </span>
                  <h3 className="font-semibold" style={{ fontSize: "17px" }}>
                    {r.name}
                  </h3>
                  {r.inScope && (
                    <span className="font-mono text-xs text-accent">
                      this guide
                    </span>
                  )}
                </div>
                <p className="text-[15px] text-muted leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use the system */}
      <section className="px-6 py-16 border-t border-border/40 bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4" style={{ fontSize: "30px", fontWeight: 700 }}>
            Use the system to learn the system.
          </h2>
          <p
            className="text-muted leading-relaxed"
            style={{ fontSize: "17px" }}
          >
            You don&apos;t need to wait for the capability to arrive before
            you start building the mindset. Use your current Claude surface
            to bootstrap the way of thinking the next level demands — a
            personal forecast, a custom linter, a prototype playbook, a
            rough kanban. By the time the capability catches up, the
            mental model is already built.
          </p>
          <p
            className="text-muted leading-relaxed mt-4"
            style={{ fontSize: "17px" }}
          >
            Act as if the capability is already there, because when it
            catches up, things move very quickly for those who have.
          </p>
          <p
            className="font-mono text-xs text-muted mt-8"
          >
            — Wei Li, <em>The Practical Guide to GTM Autonomy</em>, April 2026
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
