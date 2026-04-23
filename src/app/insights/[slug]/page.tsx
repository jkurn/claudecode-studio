import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FRAMEWORKS, frameworkBySlug } from "@/data/insights";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FRAMEWORKS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = frameworkBySlug(slug);
  if (!f) {
    return { title: "Not found — claudecode.studio" };
  }
  return {
    title: `${f.title} — claudecode.studio`,
    description: f.tagline,
    openGraph: {
      title: `${f.title} — claudecode.studio`,
      description: f.tagline,
      type: "article",
    },
  };
}

export default async function FrameworkPage({ params }: Props) {
  const { slug } = await params;
  const framework = frameworkBySlug(slug);
  if (!framework) notFound();

  const currentIndex = FRAMEWORKS.findIndex((f) => f.slug === framework.slug);
  const prev = currentIndex > 0 ? FRAMEWORKS[currentIndex - 1] : null;
  const next =
    currentIndex < FRAMEWORKS.length - 1
      ? FRAMEWORKS[currentIndex + 1]
      : null;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: framework.title,
    description: framework.tagline,
    author: {
      "@type": "Person",
      name: framework.speaker.name,
      jobTitle: framework.speaker.role,
      address: framework.speaker.city,
    },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/insights/${framework.slug}`,
    keywords: framework.levels.join(", "),
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={ld} />
      {/* ─── HEADER ─── */}
      <section className="px-6 pt-16 pb-10 border-b border-border/40">
        <div className="max-w-2xl mx-auto">
          <nav className="font-mono text-xs text-muted mb-10">
            <Link href="/insights" className="hover:text-accent transition-colors">
              ← all insights
            </Link>
          </nav>

          <div className="flex items-center gap-2 mb-6">
            {framework.levels.map((lvl) => (
              <span
                key={lvl}
                className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-accent/10 text-accent"
              >
                {lvl}
              </span>
            ))}
          </div>

          <h1
            className="mb-4 tracking-tight leading-[1.1]"
            style={{ fontSize: "44px", fontWeight: 700 }}
          >
            {framework.title}
          </h1>
          <p
            className="text-muted leading-relaxed"
            style={{ fontSize: "22px" }}
          >
            {framework.tagline}
          </p>

          <div className="mt-8 font-mono text-xs text-muted">
            {framework.speaker.name} · {framework.speaker.city} ·{" "}
            {framework.speaker.role}
          </div>
        </div>
      </section>

      {/* ─── BODY ─── */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Summary */}
          <p
            className="mb-10 leading-relaxed"
            style={{ fontSize: "19px" }}
          >
            {framework.summary}
          </p>

          {/* Body paragraphs */}
          <div className="space-y-6 mb-12">
            {framework.body.map((p, i) => (
              <p
                key={i}
                className="leading-relaxed text-[17px] text-foreground"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Quotes */}
          {framework.quotes.length > 0 && (
            <div className="space-y-4 mb-12">
              {framework.quotes.map((q) => (
                <blockquote
                  key={q}
                  className="border-l-4 border-accent/60 pl-5 py-1 italic text-foreground text-[17px] leading-relaxed"
                >
                  &ldquo;{q}&rdquo;
                  <footer className="not-italic text-xs text-muted font-mono mt-2">
                    — {framework.speaker.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}

          {/* Challenge */}
          <div className="border border-accent/30 rounded-xl p-6 bg-accent/5">
            <div className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
              this week&apos;s challenge
            </div>
            <p
              className="leading-relaxed text-foreground"
              style={{ fontSize: "17px" }}
            >
              {framework.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* ─── PREV / NEXT ─── */}
      <section className="px-6 py-10 border-t border-border/40">
        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/insights/${prev.slug}`}
              className="block border border-border/60 rounded-xl p-4 bg-white hover:border-accent/50 hover:bg-surface-hover transition-all"
            >
              <div className="font-mono text-xs text-muted mb-1">← previous</div>
              <div className="font-semibold text-[15px]">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/insights/${next.slug}`}
              className="block border border-border/60 rounded-xl p-4 bg-white hover:border-accent/50 hover:bg-surface-hover transition-all sm:text-right"
            >
              <div className="font-mono text-xs text-muted mb-1">next →</div>
              <div className="font-semibold text-[15px]">{next.title}</div>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-16 border-t border-border/40 bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="mb-3"
            style={{ fontSize: "26px", fontWeight: 700 }}
          >
            Want the next framework matched to your level?
          </h2>
          <p
            className="text-muted max-w-xl mx-auto mb-6"
            style={{ fontSize: "16px" }}
          >
            Two-minute quiz. Seven questions. We send you one challenge a week.
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
