# Agents — the Claude Community AU brain, externalised

Eight Claude Code subagents that collectively encode everything extracted
from the 2026-04-22 Claude Community Australia livestream, Aidan Morgan's
Bankwest & AITAI slide deck, and Wei Li's *Practical Guide to GTM Autonomy*.

Each agent has a narrow job, a loaded system prompt, and a clearly scoped
tool surface. Summon them with Claude Code's Agent tool by name.

## The roster

| Agent                  | When to use it                                                     |
|------------------------|--------------------------------------------------------------------|
| `webinar-researcher`   | Ask anything about what was said on the livestream. Attributed answers. |
| `fluency-coach`        | "Where am I at L1–L5?" diagnosis + the single next step.            |
| `harness-auditor`      | Scan a repo against the four harness layers (brain/body/weapons/pilot). |
| `backpressure-engineer`| Write the deterministic checks (ast-grep, semgrep, etc.) that close the middle loop. |
| `kanban-wiring`        | Stand up kanban-driven development with Linear MCP + a ticket-writing skill. |
| `ghost-library-author` | Convert a piece of software into a ghost-library spec.              |
| `content-drop-writer`  | Draft a claudecode.studio newsletter drop in the site's voice.      |
| `gtm-autonomy-coach`   | Apply Wei Li's L1–L4 autonomy framework to a sales/GTM scope.       |

## How they fit together

Think of the agents as specialised heads on the same brain.

- `webinar-researcher` is the library — loaded with the full extraction,
  attributed, honest about what it doesn't know.
- `fluency-coach`, `gtm-autonomy-coach` are the reflection agents — they
  turn the frameworks into questions for the user.
- `harness-auditor`, `backpressure-engineer`, `kanban-wiring`,
  `ghost-library-author` are the builders — they take a concrete
  codebase or workflow and do the work.
- `content-drop-writer` is the downstream agent — it turns what the
  others learned into publishable material for the site.

## Invocation cheat sheet

```
# ask a question about the source material
> use webinar-researcher: what did Buan say about context windows?

# get a diagnosis
> use fluency-coach: what level am I at based on this repo?

# build something
> use backpressure-engineer: write the first ast-grep rule for this repo

# write content
> use content-drop-writer: turn the kanban framework into an L5 drop
```

## When to extend this directory

Add a new agent when you have a new repeatable task that currently lives
in someone's head. The test: can you describe the agent's job in one
sentence, and is that sentence stable across uses? If yes, it's an agent.
If not, it's a prompt and belongs in a skill or a one-off.
