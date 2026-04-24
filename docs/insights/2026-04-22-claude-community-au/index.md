# Claude Community Australia Webinar — Canonical Extraction

> Event: Claude Community Australia livestream
> Date recorded: 2026-04-22
> Length: ~2 hours, 7 talks + hosts
> Hosts: Ry (Melbourne) and Dominic Fretz (Sydney)

## Speakers

| # | Speaker        | Location    | Role                                            | Talk                                           |
|---|----------------|-------------|-------------------------------------------------|------------------------------------------------|
| 1 | Vanessa Enis   | Perth       | Mechanical engineer → PM at Mechanical Rock     | Claude Code for non-technical people           |
| 2 | Mark Monfort   | Sydney      | Chief AI & Innovation Officer, Madison Marcus   | Legal Claw — agentic systems for law           |
| 3 | Stephen Coleman| Melbourne   | Founder, Stratum (AI advisory)                  | The harness is where the value is              |
| 4 | Nick Lotheian  | Adelaide    | Staff engineer                                  | Ghost libraries                                 |
| 5 | Aidan Morgan   | Perth       | Serial startup CTO                              | Engineer the systems that engineer your systems |
| 6 | Buan Zich      | Brisbane/Syd | Director, B2 AI (AI modernisation)             | Kanban-driven development                       |
| 7 | Adam Halt      | New Zealand | Claude Ambassador NZ, The Collab community lead | Cyclone tracker case study                      |

Hosts: Ry (Claude Code Ambassador AU, SEO agency) and Dominic Fretz (Claude
Code Ambassador AU, Sydney meetup organiser).

## The through-line

Seven different speakers, one consistent message: the model isn't the
product anymore. What you do *around* the model — the harness, the tools,
the data wiring, the guardrails, the delivery pipeline, the context
hygiene — is the product. Everything below is a different angle on that
same idea.

---

## Section 1 — The big frameworks

Each of these has its own standalone file in `frameworks/`. Short versions
here so this document stands alone.

### 1.1 Agents + Tools + Data (Mark Monfort)

Three ingredients; miss any one and the system is crippled.

- Agents alone → "great conversations about nothing."
- Tools alone → slow execution, no reach.
- Data alone → where we were years ago.
- All three → Legal Claw (his internal legal AI system at Madison Marcus).

Use this as a readiness rubric for any AI project. If a client only has two
of three, the missing one is the first thing to fix.

### 1.2 The harness thesis (Stephen Coleman)

Model improvements are now incremental. Harness improvements are
exponential — Claude Code, Claude Co-work, MCP, connectors. The value is
"creeping up into the harness and into the context layer."

TMNT-Krang metaphor: a brain in a jar (the model) is useless. The brain
only becomes dangerous when it's strapped into a robot body (the harness),
wielding weapons (tools), steered by a pilot who brings context (prompts,
skills, memory).

Interface evolution: fat apps (Excel, SAP) → SaaS (browser) → GaaS
("harness as interface"). Data flows into Claude via MCP/API; Claude is
the UI.

Signal: Salesforce announced headless CRM. If Salesforce deprecates its
front end, the category shifts.

### 1.3 Three-loop agentic delivery (Aidan Morgan)

Engineer the systems that engineer your systems.

- **Inner loop (coding):** LLM writes code and runs tests. Humans are too
  slow to sit inside this loop.
- **Middle loop (back pressure):** deterministic checks first (linters,
  complexity metrics, ast-grep, semgrep, import-linter), then
  non-deterministic LLM adversarial review. Output is binary — pass/fail.
  Any fail feeds back to the inner loop.
- **Outer loop (deploy):** canary / blue-green, synthetic traffic,
  observability, auto-rollback. Detect problems before users see them;
  failures feed back into the coding loop.

Core rule: never use LLM judgement as the sole signal. Deterministic
checks run first; LLM review is a second layer after the deterministic
ones pass.

### 1.4 Ghost libraries (Nick Lotheian)

Ship the prompt, not the software. The agent builds the software from
scratch in the target environment every time.

- Term originated on OpenAI's frontier team via their Symphony
  orchestration system (built in Elixir; Codex chose the language because
  Erlang's actor model fits agent coordination).
- Symphony rebuilds itself from a single ~2,000-line prompt whenever a
  human would have intervened.
- Benefit: environment-, language-, and compliance-agnostic; clients pick
  their stack.
- Cost: "All the bugs are yours. No one else has ever run the code you're
  running." Discipline required — edit the spec, not the code.

### 1.5 Kanban-driven development (Buan Zich)

Small context windows win. Stateless agents with stateful tickets beat
one long-running session.

- Inspired by Anthropic's Daisy connecting Claude swarms to Asana to
  build what became Claude Code plugins (from Boris Cherny interview on
  The Pragmatic Engineer).
- Engineers use a Claude Code skill that dumps context into Jira / Linear
  / Shortcut tickets.
- PMs query the board through Claude — "what is the AI's current focus?"
  — rather than going to the board directly.
- Story points become the shared language between PM, Dev, and Claude.
- U-curve quality decay: even with a 1M context window, accuracy drops
  between roughly 300–400K tokens.

### 1.6 Prototype-first design thinking (Vanessa Enis)

Inverted order: prototype → show client → brainstorm, instead of
brainstorm → wireframe → dev → iterate for weeks. Claude Code collapses
the cost of the first prototype to minutes.

### 1.7 Tiered model usage (Adam Halt)

Match model to task criticality.

- Sonnet every 15 min — cheap, frequent situation reports.
- Opus every hour — expensive, infrequent deep analysis.

Same job, two cadences, ~5–10× cost reduction at the high-frequency tier
without giving up depth at the low-frequency tier.

---

## Section 2 — Subtle / non-obvious insights

These didn't get their own frameworks but are worth keeping.

- **Personal `.md` files.** Vanessa predicts every person and every
  function inside an organisation (sales, delivery, engineering) ends up
  with an `.md` file that encodes tone, preferences, and domain focus.
  The weekly newsletter should include a "build your own $name.md"
  challenge at L2 or L3.

- **Non-technical users interrogating codebases.** Vanessa connects
  Claude Code to client GitHub repos and asks product questions about the
  code, not code questions. Pattern worth documenting as an L3 use case.

- **Fat apps → SaaS → harness-as-interface.** Stephen's Salesforce
  headless read says the same pattern is coming for everything. The
  consulting pitch is "stop building dashboards, build MCP-accessible
  data layers."

- **Vibe code the tools, not the product.** Aidan's point: when a linter,
  CI check, or metrics dashboard you need doesn't exist, the highest-ROI
  use of vibe coding is to build that tool first, then use it.

- **Back pressure is binary.** Don't feed nuanced critique into the
  coding loop. Pass/fail only. Nuance confuses the model; a binary
  signal retries cleanly.

- **LLM-evaluating-LLM = "the mathematical definition of chaos."**
  Non-deterministic evaluating non-deterministic has no fixed point.
  Deterministic checks first, LLM review second.

- **Modularity prevents context collapse.** Adam: separate modules,
  separate cron jobs, separate contexts. One giant context pollutes
  itself.

- **The U-curve quality decay at 300–400K tokens.** Buan cites it from
  the Opus 4.6 release notes. Even with a 1M window, quality is not
  uniform across it.

- **Token anxiety → real product.** Adam's cyclone tracker came from
  leftover tokens at the end of a billing cycle; two or three hours
  later he had 500 concurrent users and energy-company dashboards
  embedding it.

- **Let users tell you what to build next.** Adam shipped a feature
  request widget on cyclone.thecollab.ai and built suggestions live.
  Real-time user-driven development with near-zero implementation cost.

- **Build where the documentation is richest.** Adam prefers Vue.js but
  ships React — "I don't write the code anymore, so why should I be
  biased?" Choose the stack the model is strongest in, not the one you're
  most comfortable with.

- **Taste and judgement are the moat.** Stephen's junior consultant
  generated a 28-page work plan when a two-page one was asked for.
  Curation of AI output is the new literacy.

- **Confident fabrication is the real failure mode.** Mark's eval caught
  Claude claiming a real case "didn't happen" and claiming only Haiku
  supports MCPs. Both false, both delivered confidently. AI doesn't fail
  loudly; it fails convincingly.

- **Adoption is <1%.** Stephen's dot chart: each dot = 3.2M people, the
  vast majority have never touched AI. "Don't stress — your chance to
  own the space is a great opportunity."

---

## Section 3 — Tools and tech mentioned

Full annotated list in `tools.md`. Short version:

- **Coding surfaces:** Claude Code (primary), Claude Co-work (GUI),
  Claude Design (web app), Cursor, Antigravity (Google), Bolt, Lovable.
- **MCP servers:** Figma MCP (read-only at time of talk), PowerPoint
  MCP, GitHub MCP, Linear MCP.
- **Deterministic code checkers (Aidan's list):** ast-grep (asg),
  Semgrep, Radon, pyscn, Cohesion, Cognitive Complexity (wily /
  complexipy), Import-linter.
- **Boards / PM:** Jira, Asana, Linear, Shortcut; Klein/Kline (local
  Kanban that wraps Linear MCP).
- **Data plumbing / prototyping:** Supabase, Anthropic Console/API.
- **Heritage tools being replaced:** PowerBI, Tableau, ClickView (Mark
  no longer uses — builds custom dashboards instead).
- **Referenced but out-of-scope:** OpenAI Codex, OpenAI Symphony (Elixir
  orchestration system).

---

## Section 4 — Quotes worth saving

Full quote bank in `quotes.md`. Top five:

> "AI doesn't fail loudly, it fails convincingly." — Mark Monfort

> "We need to engineer the systems that engineer our systems." — Aidan Morgan

> "Using non-deterministic systems to evaluate non-deterministic output is
> the mathematical definition of chaos." — Aidan Morgan

> "Stateless agents with stateful tickets always beat one long-running
> session." — Buan Zich

> "In the future everyone will have their own personal MD file." — Vanessa Enis

---

## Section 5 — Where this shows up on the site

Cross-references to the existing L1–L5 framework in `src/app/page.tsx`:

| Level | Insight that belongs here                                            |
|-------|----------------------------------------------------------------------|
| L1 Prompter     | Vanessa's onramp: Lovable → Cursor → Claude Code terminal. |
| L2 Operator     | Ask Claude to explain an unfamiliar codebase. Build your `name.md`. |
| L3 Builder      | Mark's "break big prompts into subtasks + MD guardrails." |
| L4 Automator    | Aidan's middle loop: ast-grep/semgrep rules, hooks, complexity metrics. |
| L5 Orchestrator | Buan's kanban-driven dev; Aidan's outer loop; Adam's tiered models.  |

See `newsletter-drops/` for a drop outline per level.

---

## Section 6 — Action items

Concrete to-do in `action-items.md`. Summary:

1. Draft "build your own `name.md`" challenge for an L2/L3 newsletter drop.
2. Draft "add ast-grep + semgrep rules to your repo" challenge for L4.
3. Draft "connect Claude Code to a Linear board via MCP" challenge for L5.
4. Consider a short blog post or "Insights" page on claudecode.studio
   pulling 3–5 of the most shareable frameworks into a public teaser.
5. Add community links: Claude Community Australia Discord; The Collab NZ
   WhatsApp (Adam's, 600+ members).
