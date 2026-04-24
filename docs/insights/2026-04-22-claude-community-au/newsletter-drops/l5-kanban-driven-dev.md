# L5 drop — Kanban-driven development in one day

## Headline

The board is the brain. Your chat history isn't.

## Why this matters now

Buan Zich's webinar talk revealed how Anthropic actually built Claude
Code plugins: Daisy connected Claude swarms to Asana over a weekend,
had the swarms create tickets for themselves, pushed task context into
each ticket, and ran kanban-driven development. The plugin system
came out of that spike.

The core rule:

> "Stateless agents with stateful tickets always beat one long-running
> session."

Small context wins. Even a 1M window decays at 300–400K. Sessions are
disposable; tickets are durable.

## Use case

Your Claude Code sessions get messy after 30 turns. You lose track of
what's been decided. You restart conversations and re-explain. Your
teammates can't see what the agent's doing. You're doing it all in
chat.

## Skill

1. Create a Linear (or Jira / Shortcut) project for your current
   work.
2. Install the Linear MCP and connect Claude Code to it.
3. Add a skill that writes a ticket on every task start:
   - Goal.
   - Decisions made so far.
   - Blockers.
   - Commits as they land.
4. Work one ticket at a time in short, disposable sessions.
5. At the end of the day, read the board back — not the chat log.

Tool worth trying: Klein / Kline, which wraps Linear MCP into a local
kanban view of what your agents are doing in real time.

## Challenge

Run one full working day through tickets only. No long chats. At the
end of the day, write a one-paragraph retrospective: what did the
board tell you that the chat never did?

## Receipt

Send the screenshot of the board after one day. One line on what you'd
do differently tomorrow.

## Source

Buan Zich, frameworks/kanban-driven-development.md.
