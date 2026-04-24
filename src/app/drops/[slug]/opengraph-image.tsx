import { notFound } from "next/navigation";
import { DROPS, dropBySlug } from "@/data/drops";
import { OG_SIZE, OG_CONTENT_TYPE, ogImage } from "@/lib/og";

export const alt = "Weekly drop from claudecode.studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateImageMetadata() {
  return DROPS.map((d) => ({
    id: d.slug,
    alt: `${d.title} — week ${d.week}`,
    size: OG_SIZE,
    contentType: OG_CONTENT_TYPE,
  }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const d = dropBySlug(slug);
  if (!d) notFound();

  return ogImage({
    eyebrow: `week ${String(d.week).padStart(2, "0")} · weekly drop`,
    title: d.title,
    subtitle: d.headline,
    byline: `— ${d.source.speaker.name}`,
    tags: [d.levelDisplay],
  });
}
