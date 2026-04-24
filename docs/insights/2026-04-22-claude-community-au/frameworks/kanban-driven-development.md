# Kanban-driven development

Owner: Buan Zich
Lineage: Anthropic's Daisy (via Boris Cherny on The Pragmatic Engineer)

## The claim

Small context wins. Stateless agents with stateful tickets beat one
long-running session. The board is the brain.

## The origin

From the Pragmatic Engineer interview with Boris Cherny (creator of
Claude Code): Daisy at Anthropic spent a weekend connecting Claude
swarms to Asana, had the swarms create tickets for themselves, pushed
task context into each ticket, and ran kanban-driven development. The
Claude Code plugin system came out of that spike.

## The setup

1. Pick a board (Jira, Linear, Shortcut). MCP connection required.
2. Add a Claude Code skill that dumps task context into a ticket on
   every unit of work: spec, decisions, blockers, commits.
3. Engineers work one ticket at a time. Each ticket = one context
   window, one session.
4. PMs observe the board.
5. PMs query Claude *about* the board ("what's the AI's current
   focus?") instead of opening the board directly.
6. Story points become the shared vocabulary between PM, Dev, and
   Claude. Measurable velocity.

## Why small context wins

Buan cites a U-curve in quality vs. context size from the Opus 4.6
release notes: accuracy decays through the middle of the context
window, roughly between 300K and 400K tokens. Even with a 1M window,
quality is not uniform.

Implication: stop trying to hold a whole project in one session. Put
everything durable in the ticket. Sessions are disposable.

> "Stateless agents with stateful tickets always beat one long-running
> session."

## The PM argument

> "Good PMs don't just prioritise, they contribute."

> "If you're a PM/PO and you aren't contributing to development work
> in a meaningful way, you're going to get left behind."

Kanban-driven development gives non-engineer PMs a legitimate surface
for contribution: they write the ticket spec, observe execution, steer
via the board. Claude handles translation in both directions.

## Tool mentioned

- **Klein / Kline** — Claude Code–compatible local kanban tool, hooks
  into Claude Code via Linear MCP, shows agent activity in real time.

## How to use it on claudecode.studio

- This is the canonical L5 (Orchestrator) pattern. Write the challenge
  precisely:
  1. Connect Claude Code to a Linear board via MCP.
  2. Install a skill that writes a ticket per task.
  3. Run one day of work through tickets only — no long chats.
  4. Read back the board as a record of the day.
- Pair with the three-loop model: tickets are the unit of work in the
  inner loop; board health is the middle loop; shipped milestones are
  the outer loop.
- The U-curve decay fact is a strong standalone post: "your 1M context
  window is lying to you."

## Quotes

> "The board is the brain and context is the real product."

> "Stateless agents with stateful tickets always beat one long-running
> session."

> "Smaller context windows equal better accuracy."

> "Story points became the shared language between PM, Dev, and
> Claude. I could measure actual velocity through my agent's
> execution."
