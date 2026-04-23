# Action items

Concrete follow-ups from the webinar. Each item is small enough to
knock off in a day; none require a design sprint.

## Content

1. Publish 12 newsletter drops in the order laid out in
   `content-roadmap.md`. Nine of the twelve already have full outlines
   in `newsletter-drops/`.
2. Draft the three remaining drops (semgrep, vibe-code-the-tool, ghost
   libraries) using the same template.
3. Write the seven long-form posts in `content-roadmap.md`. Each can
   lift its frame directly from `frameworks/*.md`.

## Site

4. Consider a `/insights` route (or a static section under the existing
   page) linking to the framework explainers. Low commitment; matches
   the quiz→newsletter funnel.
5. Add an optional "What level do you want to read for?" filter on any
   future insights page, to match the L1–L5 framing.
6. Add the adoption dot-chart block near the hero — same visual
   metaphor Stephen used on the webinar.

## Community

7. Add a footer link to the Claude Community Australia Discord.
   Confirm the invite URL before linking.
8. Mention The Collab NZ WhatsApp in any L3/L4 drop that references
   Adam's cyclone tracker.
9. Reach out to Ry and Dominic — they run the Claude Community
   Australia. A guest post on claudecode.studio or cross-posting one
   of the drops is a low-friction collaboration.

## Research / verification

10. Find and link the Pragmatic Engineer interview with Boris Cherny
    that Buan cited. Don't publish the Anthropic Daisy story without a
    primary source.
11. Verify the Opus 4.6 release-note claim about the 300–400K U-curve.
    If it's in the release notes, link it; if it's not, soften the
    wording.
12. Check the current Figma MCP status — Vanessa said it was read-only
    at the time of the talk; verify before recommending.

## Ops

13. Decide where the quiz email list gets sent (ConvertKit / Buttondown
    / Resend). `page.tsx` has a TODO on line 256.
14. Once a provider is picked, wire up the quiz result page to send
    "you're at L$n" as the first auto-email, then the level-matched
    drop as the next.
