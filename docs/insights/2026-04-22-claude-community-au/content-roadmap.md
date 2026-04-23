# Content roadmap

How the webinar material feeds claudecode.studio over the next ~12
weeks. This is a backlog, not a commitment.

## Principles

- The site's promise is "one use case, one skill, one challenge" per
  week, matched to the reader's level. Every piece below has to fit
  that shape or it doesn't ship.
- Prefer borrowed frameworks with attribution over invented ones. The
  webinar gave us seven good ones — use them.
- Keep each drop under ~350 words outside code blocks. Density over
  word count.

## 12-week backlog (draft order)

| Week | Level | Title                                          | Source file                                   |
|------|-------|------------------------------------------------|-----------------------------------------------|
| 1    | L1    | You're not late. 99% haven't started.          | newsletter-drops/l1-youre-not-late.md         |
| 2    | L2    | Build your own `name.md`.                      | newsletter-drops/l2-build-your-name-md.md     |
| 3    | L2→L3 | Stop wireframing. Prototype first.             | newsletter-drops/l2-l3-prototype-first.md     |
| 4    | L3    | Interrogate an unfamiliar codebase.            | newsletter-drops/l3-interrogate-a-codebase.md |
| 5    | L3    | Break big prompts into subtasks.               | newsletter-drops/l3-subtasks-over-mega-prompts.md |
| 6    | L4    | Your first ast-grep rule.                      | newsletter-drops/l4-first-ast-grep-rule.md    |
| 7    | L4    | Add semgrep next.                              | TBD — same shape, semgrep instead of asg      |
| 8    | L4    | Tier your cron jobs.                           | newsletter-drops/l4-tiered-model-cron.md      |
| 9    | L4→L5 | Vibe code the tool, not just the product.      | TBD — Aiden's pattern, one custom linter      |
| 10   | L5    | Kanban-driven development in one day.          | newsletter-drops/l5-kanban-driven-dev.md      |
| 11   | L5    | The outer loop.                                | newsletter-drops/l5-outer-loop.md             |
| 12   | L5    | Your first ghost library.                      | TBD — Nick's concept, converting a small tool |

## Landing-page upgrades

Pulled from the webinar, in order of how fast they'd land:

1. **New subtitle candidate.** Replace "50+ features. You're using 5."
   with something that borrows the harness thesis — "The model stopped
   being the hard part. The harness is."
2. **Krang-style explainer block** under the maturity framework. Four
   layers: brain, body, weapons, pilot.
3. **Adoption dot-chart graphic** near the hero — "Each dot is 3.2M
   people. Most haven't started." Direct reassurance to L1 readers.
4. **"What changes at each level" update.** The existing copy is good;
   merge in Aiden's three-loop framing so L5 = "three agents run while
   you're in the shower" ties to the outer loop explicitly.
5. **A small "Insights" section** linking out to 3–5 of the framework
   explainer posts. Low risk, adds SEO surface, gives each drop a
   permanent home.

## Long-form posts (blog or Substack companion)

One each. All sourced from the webinar frameworks.

1. "Agents + Tools + Data: a readiness rubric for your AI project"
2. "The harness is the product: why Claude Code beats a new model"
3. "Three loops for agentic delivery"
4. "Ghost libraries: shipping prompts instead of code"
5. "Kanban-driven development: how Anthropic built plugins"
6. "Your 1M context window is lying to you" (U-curve post)
7. "Stop building dashboards" (Salesforce headless signal)

## SEO / distribution notes

- Every post should credit the speaker with a full name and, where
  possible, their company (Stephen Coleman / Stratum, Aiden Morgan /
  CTO, etc). This makes the posts more quotable and more linkable.
- Share one quote per post to LinkedIn/Twitter. The quote bank in
  `quotes.md` is already formatted.
- The community links (Claude Community Australia Discord, The Collab
  NZ WhatsApp) should appear at the end of every post where they're
  relevant; they're the warmest possible CTA.

## Risks / caveats

- Some attributions are second-hand (Boris Cherny's interview, the
  Anthropic Daisy story). Before publishing, find the primary source
  and link it. Don't ship things that could misattribute Anthropic.
- The "only Haiku runs MCPs" quote is an example of Claude being wrong,
  not a claim. Make sure the post framing makes that unambiguous.
- Tool recommendations (ast-grep, semgrep, Linear MCP) are Aiden /
  Buan's; verify any linked install instructions work on the current
  versions before publishing.
