import type { Metadata } from "next";
import Link from "next/link";
import { FRAMEWORKS, SPEAKERS, type Speaker } from "@/data/insights";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Speakers — claudecode.studio",
  description:
    "The seven builders who showed up on the Claude Community Australia livestream — lawyers, CTOs, PMs, founders, staff engineers. Each one ships.",
  openGraph: {
    title: "Speakers — claudecode.studio",
    description:
      "The seven builders who showed up on the Claude Community Australia livestream.",
    type: "article",
  },
};

function frameworksFor(speaker: Speaker) {
  return FRAMEWORKS.filter((f) => f.speaker.name === speaker.name);
}

export default function SpeakersPage() {
  const ordered: Array<{ key: string; speaker: Speaker }> = [
    { key: "vanessa", speaker: SPEAKERS.vanessa },
    { key: "mark", speaker: SPEAKERS.mark },
    { key: "stephen", speaker: SPEAKERS.stephen },
    { key: "nick", speaker: SPEAKERS.nick },
    { key: "aiden", speaker: SPEAKERS.aiden },
    { key: "buan", speaker: SPEAKERS.buan },
    { key: "adam", speaker: SPEAKERS.adam },
  ];

  return (
    <main id="main" className="min-h-screen">
      <section className="px-6 pt-16 pb-10 border-b border-border/40">
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
            className="mb-4 tracking-tight leading-[1.1]"
            style={{ fontSize: "44px", fontWeight: 700 }}
          >
            Seven builders. One livestream. No filler.
          </h1>
          <p
            className="text-muted max-w-2xl leading-relaxed"
            style={{ fontSize: "19px" }}
          >
            Each of these speakers showed up to talk about one thing they&apos;ve
            actually shipped. Law firms, cyclone trackers, agentic delivery
            pipelines, kanban-driven development, ghost libraries. Find one
            who sounds like where you want to be.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {ordered.map(({ key, speaker }, i) => {
            const frameworks = frameworksFor(speaker);
            return (
              <div
                key={key}
                className="border border-border/60 rounded-xl p-6 bg-[var(--card)]"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="font-semibold"
                    style={{ fontSize: "22px" }}
                  >
                    {speaker.name}
                  </h2>
                </div>
                <div className="font-mono text-xs text-muted mb-4">
                  {speaker.city} · {speaker.role}
                </div>
                {frameworks.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border/30">
                    {frameworks.map((f) => (
                      <Link
                        key={f.slug}
                        href={`/insights/${f.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
                      >
                        <span className="text-muted">→</span>
                        {f.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
