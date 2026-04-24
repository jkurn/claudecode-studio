/**
 * Emit a <script type="application/ld+json"> tag. Accepts any object
 * that is safe to JSON.stringify; callers are responsible for keeping
 * the shape schema.org-valid.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
