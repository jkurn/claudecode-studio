# Contributing

Thanks for taking the time.

## Ground rules

- The site is a working theory, not an encyclopaedia. Prefer one sharp
  framework from an attributable source over three fuzzy ones.
- Borrowed frameworks with attribution beat invented ones.
- Every newsletter drop needs a challenge you can *ship*, and a receipt
  that proves it landed.
- Density over word count. If a section reads long, cut it.

## Layout

- `src/app/` — Next.js App Router routes.
- `src/data/` — single source of truth for frameworks, speakers, drops,
  tools, quotes, autonomy. Pages consume it; docs mirror it.
- `src/components/` — shared UI (SiteFooter, ThemeToggle, JsonLd).
- `src/lib/` — runtime helpers (SITE config, OG image template).
- `docs/insights/2026-04-22-claude-community-au/` — long-form extraction
  of the webinar. Keep this in sync with `src/data/insights.ts` when
  editing frameworks.
- `docs/sources/` — plain-text extractions of source PDFs.
- `.claude/agents/` — Claude Code subagents that encode the source
  material. See `.claude/agents/README.md`.

## Local dev

```
pnpm install
pnpm dev
```

Before opening a PR:

```
pnpm lint       # ESLint
pnpm typecheck  # TypeScript, no emit
pnpm build      # Production build
pnpm smoke      # Route smoke test — server must be running
```

CI runs the same checks on every PR (`.github/workflows/ci.yml`).

## Adding content

### A new framework

1. Add to `src/data/insights.ts` and `docs/insights/.../frameworks/*.md`.
2. Include speaker, levels, summary, body, quotes, and a challenge.
3. The `/insights/[slug]` route and sitemap pick it up automatically.

### A new newsletter drop

1. Add to `src/data/drops.ts`.
2. Follow the existing template: title, headline, whyNow, useCase,
   skill (+ optional snippet), challenge, receipt, source.
3. The `/drops/[slug]` route, sitemap, and OG image pick it up
   automatically.

### A new agent

1. Create `.claude/agents/<name>.md` with YAML frontmatter.
2. Fields: `name`, `description` (when to use), `tools` (comma-separated
   list), `model` (optional).
3. Body is the agent's system prompt — narrow job, scoped tool surface,
   loaded knowledge.
4. Add a row to `.claude/agents/README.md`.

## Style

- Direct voice. No hedging, no superlatives, no emojis.
- Second person throughout.
- Keep per-drop word count under ~350 outside code blocks.
- Attribute every claim to a speaker or a source document.

## What not to ship

- Paywalled tools as the core Skill of a drop unless the reader opts in.
- Clever metaphors that don't pay off.
- "In this edition we'll cover…" intros.
- TBD sections.
