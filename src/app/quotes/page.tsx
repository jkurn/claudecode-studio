import type { Metadata } from "next";
import Link from "next/link";
import { QUOTES } from "@/data/quotes";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Quotes — claudecode.studio",
  description:
    "Every line worth saving from the Claude Community Australia livestream. Two dozen pull-quotes, grouped by speaker, ready to steal.",
  openGraph: {
    title: "Quotes — claudecode.studio",
    description:
      "Every line worth saving from the Claude Community Australia livestream.",
    type: "article",
  },
};

export default function QuotesPage() {
  const grouped = QUOTES.reduce<Record<string, typeof QUOTES>>((acc, q) => {
    const key = q.speaker.name;
    acc[key] = acc[key] ?? [];
    acc[key].push(q);
    return acc;
  }, {});

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
            Every line worth saving.
          </h1>
          <p
            className="text-muted max-w-2xl leading-relaxed"
            style={{ fontSize: "19px" }}
          >
            Two hours of talk, compressed to the pull-quotes. If one of these
            lands, follow the attribution back to the framework it came from.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-14">
          {Object.entries(grouped).map(([name, quotes]) => (
            <div key={name}>
              <h2
                className="font-semibold mb-6"
                style={{ fontSize: "22px" }}
              >
                {name}
                <span className="font-mono text-xs text-muted ml-3">
                  · {quotes[0].speaker.city}
                </span>
              </h2>
              <div className="space-y-4">
                {quotes.map((q) => (
                  <blockquote
                    key={q.text}
                    className="border-l-4 border-accent/60 pl-5 py-1 italic text-foreground text-[17px] leading-relaxed"
                  >
                    &ldquo;{q.text}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
