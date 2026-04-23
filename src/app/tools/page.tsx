import type { Metadata } from "next";
import Link from "next/link";
import { TOOL_CATEGORIES } from "@/data/tools";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Tools — claudecode.studio",
  description:
    "Every tool, MCP, and platform mentioned on the Claude Community Australia livestream — grouped by what they actually do.",
  openGraph: {
    title: "Tools — claudecode.studio",
    description:
      "Every tool, MCP, and platform mentioned on the Claude Community Australia livestream.",
    type: "article",
  },
};

export default function ToolsPage() {
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
            field notes · claude community australia · 2026-04-22
          </div>
          <h1
            className="mb-4 tracking-tight leading-[1.1]"
            style={{ fontSize: "44px", fontWeight: 700 }}
          >
            Every tool someone ships with.
          </h1>
          <p
            className="text-muted max-w-2xl leading-relaxed"
            style={{ fontSize: "19px" }}
          >
            Every tool, MCP, board, linter, and plumbing decision that made
            it into a talk. Not a comparison page — if it&apos;s listed here,
            somebody on the webinar had it in production.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-14">
          {TOOL_CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id}>
              <h2
                className="font-semibold mb-2"
                style={{ fontSize: "22px" }}
              >
                {cat.title}
              </h2>
              <p className="text-muted mb-6 text-[15px] leading-relaxed max-w-2xl">
                {cat.blurb}
              </p>
              <div className="space-y-3">
                {cat.items.map((t) => (
                  <div
                    key={t.name}
                    className="border border-border/60 rounded-xl p-5 bg-white"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <div className="font-semibold text-[16px]">{t.name}</div>
                      {t.seenVia && (
                        <div className="font-mono text-[11px] text-muted whitespace-nowrap">
                          via {t.seenVia}
                        </div>
                      )}
                    </div>
                    <p className="text-muted text-[15px] leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
