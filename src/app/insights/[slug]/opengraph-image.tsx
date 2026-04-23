import { notFound } from "next/navigation";
import { FRAMEWORKS, frameworkBySlug } from "@/data/insights";
import { OG_SIZE, OG_CONTENT_TYPE, ogImage } from "@/lib/og";

export const alt = "Insight from the Claude Community Australia livestream";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateImageMetadata() {
  return FRAMEWORKS.map((f) => ({
    id: f.slug,
    alt: `${f.title} — ${f.speaker.name}`,
    size: OG_SIZE,
    contentType: OG_CONTENT_TYPE,
  }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const f = frameworkBySlug(slug);
  if (!f) notFound();

  return ogImage({
    eyebrow: "framework",
    title: f.title,
    subtitle: f.tagline,
    byline: `${f.speaker.name} · ${f.speaker.city}`,
    tags: f.levels,
  });
}
