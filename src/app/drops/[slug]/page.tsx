import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DROPS, dropBySlug } from "@/data/drops";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DROPS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = dropBySlug(slug);
  if (!d) return { title: "Not found — claudecode.studio" };
  return {
    title: `${d.title} — claudecode.studio`,
    description: d.headline,
    openGraph: {
      title: `${d.title} — claudecode.studio`,
      description: d.headline,
      type: "article",
    },
  };
}

export default async function DropPage({ params }: Props) {
  const { slug } = await params;
  const drop = dropBySlug(slug);
  if (!drop) notFound();

  const idx = DROPS.findIndex((d) => d.slug === drop.slug);
  const prev = idx > 0 ? DROPS[idx - 1] : null;
  const next = idx < DROPS.length - 1 ? DROPS[idx + 1] : null;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: drop.title,
    description: drop.headline,
    author: {
      "@type": "Person",
      name: drop.source.speaker.name,
      jobTitle: drop.source.speaker.role,
      address: drop.source.speaker.city,
    },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/drops/${drop.slug}`,
    keywords: drop.levelDisplay,
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={ld} />
      <section className="px-6 pt-16 pb-10 border-b border-border/40">
        <div className="max-w-2xl mx-auto">
          <nav className="font-mono text-xs text-muted mb-10">
            <Link href="/drops" className="hover:text-accent transition-colors">
              ← all drops
            </Link>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-muted">
              week {String(drop.week).padStart(2, "0")}
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-accent/10 text-accent">
              {drop.levelDisplay}
            </span>
          </div>

          <h1
            className="mb-4 tracking-tight leading-[1.1]"
            style={{ fontSize: "42px", fontWeight: 700 }}
          >
            {drop.title}
          </h1>
          <p
            className="text-muted leading-relaxed"
            style={{ fontSize: "22px" }}
          >
            {drop.headline}
          </p>

          <div className="mt-8 font-mono text-xs text-muted">
            — {drop.source.speaker.name}, {drop.source.speaker.city}
            {drop.source.framework && (
              <>
                {" · "}
                <Link
                  href={`/insights/${drop.source.framework.slug}`}
                  className="text-accent hover:underline"
                >
                  {drop.source.framework.title}
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto space-y-10">
          <DropSection label="Why this matters now">{drop.whyNow}</DropSection>
          <DropSection label="Use case">{drop.useCase}</DropSection>

          <div>
            <SectionLabel>Skill</SectionLabel>
            <p
              className="leading-relaxed text-foreground"
              style={{ fontSize: "17px" }}
            >
              {drop.skill}
            </p>
            {drop.skillSnippet && (
              <pre className="mt-4 border border-border/60 rounded-xl p-5 bg-white overflow-x-auto text-[13px] leading-relaxed font-mono whitespace-pre">
                {drop.skillSnippet}
              </pre>
            )}
          </div>

          <div className="border border-accent/30 rounded-xl p-6 bg-accent/5">
            <SectionLabel tone="accent">This week&apos;s challenge</SectionLabel>
            <p
              className="leading-relaxed text-foreground"
              style={{ fontSize: "17px" }}
            >
              {drop.challenge}
            </p>
          </div>

          <DropSection label="Receipt">{drop.receipt}</DropSection>
        </div>
      </section>

      <section className="px-6 py-10 border-t border-border/40">
        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/drops/${prev.slug}`}
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
              href={`/drops/${next.slug}`}
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

      <section className="px-6 py-16 border-t border-border/40 bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-3" style={{ fontSize: "26px", fontWeight: 700 }}>
            Want the drop matched to your level in your inbox?
          </h2>
          <p
            className="text-muted max-w-xl mx-auto mb-6"
            style={{ fontSize: "16px" }}
          >
            Two-minute quiz. Seven questions. One drop a week matched to
            where you are.
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

function SectionLabel({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  return (
    <div
      className={`font-mono text-xs uppercase tracking-wider mb-3 ${
        tone === "accent" ? "text-accent" : "text-muted"
      }`}
    >
      {children}
    </div>
  );
}

function DropSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <p
        className="leading-relaxed text-foreground"
        style={{ fontSize: "17px" }}
      >
        {children}
      </p>
    </div>
  );
}
