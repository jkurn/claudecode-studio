import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

type Params = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Shown under the subtitle, e.g. speaker / source attribution. */
  byline?: string;
  /** Tag pills on the top-right, e.g. level tags. */
  tags?: string[];
};

const BG = "#faf9f5";
const FG = "#141413";
const MUTED = "#87867f";
const ACCENT = "#d97757";
const BORDER = "#d8d5cb";

export function ogImage({
  eyebrow,
  title,
  subtitle,
  byline,
  tags,
}: Params): Promise<ImageResponse> {
  return Promise.resolve(
    new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: BG,
            color: FG,
            display: "flex",
            flexDirection: "column",
            padding: "72px 80px",
            fontFamily: "Georgia, serif",
          }}
        >
          {/* top bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              color: MUTED,
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            }}
          >
            <div style={{ display: "flex" }}>
              <span style={{ color: ACCENT }}>claudecode</span>
              <span>.studio</span>
            </div>
            {tags && tags.length > 0 ? (
              <div style={{ display: "flex", gap: 12 }}>
                {tags.map((t) => (
                  <div
                    key={t}
                    style={{
                      display: "flex",
                      padding: "6px 14px",
                      borderRadius: 8,
                      background: "rgba(217,119,87,0.12)",
                      color: ACCENT,
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex" }}>— field notes</div>
            )}
          </div>

          {/* body */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {eyebrow ? (
              <div
                style={{
                  fontSize: 20,
                  color: MUTED,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                }}
              >
                {eyebrow}
              </div>
            ) : null}

            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -1,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>

            {subtitle ? (
              <div
                style={{
                  fontSize: 28,
                  color: MUTED,
                  lineHeight: 1.35,
                  maxWidth: 1000,
                }}
              >
                {subtitle}
              </div>
            ) : null}

            {byline ? (
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: `1px solid ${BORDER}`,
                  fontSize: 20,
                  color: MUTED,
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                }}
              >
                {byline}
              </div>
            ) : null}
          </div>
        </div>
      ),
      { ...OG_SIZE }
    )
  );
}

export const DEFAULT_OG_PARAMS: Params = {
  eyebrow: "claude code fluency",
  title: "The model stopped being the hard part. The harness is.",
  subtitle: SITE.description,
};
