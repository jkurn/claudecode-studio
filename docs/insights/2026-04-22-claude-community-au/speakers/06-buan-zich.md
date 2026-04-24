# Buan Zich — Kanban-driven development

## Who

- Based in Brisbane / Sydney.
- Director at B2 AI (AI modernisation consultancy).
- Engineering + product hybrid. Kubernetes / serverless / AWS
  background; now deep in LLMs including local models.

## The talk

The revelation: this is how Anthropic built Claude Code plugins.

From the Pragmatic Engineer interview with Boris Cherny (Claude Code's
creator), Daisy (at Anthropic) spent a weekend connecting Claude to
Asana, spun up Claude swarms to create tickets, put task context into
each ticket, and ran kanban-driven development. The plugin system
Anthropic later shipped came out of that spike.

### The setup he ran

- Engineers use Claude Code with a skill that dumps context into a
  Jira / Shortcut / Linear ticket for every unit of work.
- Each ticket holds the spec, decisions, blockers, commits.
- PMs observe the board.
- PMs query Claude *about* the board ("what is the AI's current
  focus?") rather than going to the board directly.
- Story points become the shared language between PM, Dev, and Claude —
  you can measure actual velocity through agent execution.

### Why small context wins

"Don't pretend just because you have a million context window it's
going to make life easier. Small context wins all the time."

U-curve he cites from the Opus 4.6 release notes: quality decays in the
middle of the context window, roughly between 300K and 400K tokens. You
rarely get quality at the full 1M.

"Stateless agents with stateful tickets always beat one long-running
session."

Downstream implication: the Jira / Linear ticket *is* the context
window. Nothing important lives in chat; everything important lives in
the ticket. Sessions are disposable, tickets are durable.

### Tool mentioned

- Klein / Kline — Claude Code competitor, built a local Kanban tool
  that hooks into Claude Code via Linear MCP; shows agent activity in
  real time.

### PM commentary

> "Good PMs don't just prioritise, they contribute."
> "If you're a PM/PO and you aren't contributing to development work in
> a meaningful way, you're going to get left behind."

## Quotes

> "The board is the brain and context is the real product."

> "Stateless agents with stateful tickets always beat one long-running
> session."

> "Smaller context windows equal better accuracy."

> "Story points became the shared language between PM, Dev, and Claude.
> I could measure actual velocity through my agent's execution."

## Takeaways for the site

- Kanban-driven development is a canonical L5 (Orchestrator) pattern.
  The challenge write-up is clear: connect a Linear board via MCP, dump
  task context into tickets, watch agents pick up work.
- The U-curve at 300–400K tokens is one of the more concrete
  technical constraints in the whole webinar. Worth a "myth vs reality"
  post on the site.
- The PM/Dev bridge framing is good positioning for the newsletter's
  less-technical readers — fluency isn't only a dev skill.
