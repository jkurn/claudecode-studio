import type { Metadata } from "next";
import Link from "next/link";
import { DROPS } from "@/data/drops";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Drops — claudecode.studio",
  description:
    "Twelve weekly newsletter drops, matched to fluency levels L1 through L5. One use case, one skill, one challenge, one receipt. Built from the Claude Community Australia livestream.",
  openGraph: {
    title: "Drops — claudecode.studio",
    description:
      "Twelve weekly drops, L1 through L5. Use case, skill, challenge, receipt.",
    type: "article",
  },
};

export default function DropsIndexPage() {
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
            weekly — one use case, one skill, one challenge
          </div>
          <h1
            className="mb-4 tracking-tight leading-[1.1]"
            style={{ fontSize: "44px", fontWeight: 700 }}
          >
            Twelve weeks. L1 to L5. No filler.
          </h1>
          <p
            className="text-muted max-w-2xl leading-relaxed"
            style={{ fontSize: "19px" }}
          >
            Each drop follows the same shape: why it matters now, the use
            case, the skill to install, the challenge to ship, and what
            &quot;done&quot; looks like. Read any one standalone — or follow
            the sequence.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {DROPS.map((d) => (
            <Link
              key={d.slug}
              href={`/drops/${d.slug}`}
              className="block border border-border/60 rounded-xl p-6 bg-white hover:border-accent/50 hover:bg-surface-hover transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-muted">
                  week {String(d.week).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-accent/10 text-accent">
                  {d.levelDisplay}
                </span>
              </div>
              <h2
                className="font-semibold mb-2"
                style={{ fontSize: "22px" }}
              >
                {d.title}
              </h2>
              <p className="text-muted mb-4 text-[15px] leading-relaxed">
                {d.headline}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs text-muted">
                  — {d.source.speaker.name}
                </div>
                <span className="font-mono text-xs text-accent">read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 border-t border-border/40 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="mb-3"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            Want these in your inbox?
          </h2>
          <p
            className="text-muted max-w-xl mx-auto mb-6"
            style={{ fontSize: "16px" }}
          >
            Take the 2-minute diagnostic. We&apos;ll match each week&apos;s drop
            to your level.
          </p>
          <Link
            href="/#quiz"
            className="inline-block bg-accent text-white px-7 py-3 rounded-xl hover:bg-accent-dim transition-colors"
            style={{ fontSize: "15px", fontWeight: 400 }}
          >
            Find your level →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
