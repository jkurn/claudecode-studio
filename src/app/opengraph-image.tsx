import { DEFAULT_OG_PARAMS, OG_SIZE, OG_CONTENT_TYPE, ogImage } from "@/lib/og";

export const alt = "claudecode.studio — the harness is the hard part";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage(DEFAULT_OG_PARAMS);
}
