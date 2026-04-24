# L3 drop — Interrogate an unfamiliar codebase

## Headline

You don't need to read the code. You need to ask the right questions.

## Why this matters now

Vanessa Enis isn't an engineer. She still reviews engineering work
by connecting Claude Code to client GitHub repos and asking product
questions about the code:

- Does this implementation match the roadmap?
- Which requirements are partially done?
- What assumptions are baked into this module?

She's not reading the code. She's using Claude as a translator between
the engineering layer and the product one.

## Use case

You've just joined a project. Or you've inherited a codebase. Or you
were handed a GitHub org and told "get familiar." A week of reading
files is the old answer. It's the wrong one.

## Skill

Connect Claude Code to the repo. Start with questions *about the
system*, not *about the code*:

- "What does this system do in plain English? Ignore implementation."
- "Which modules depend on which? Draw me the picture."
- "Where does user input enter the system? Where does it leave?"
- "Which requirements from the README are not obviously implemented?"
- "If I had 30 minutes with the original author, what three questions
  should I ask?"

## Challenge

Pick a repo you don't know. Spend one Claude Code session asking only
system-level questions. Produce a one-pager you could hand to a new
teammate on Monday.

## Receipt

Send the one-pager. One paragraph on what you learned in an hour that
reading files would have taken you a week to reach.

## Source

Vanessa Enis, speakers/01-vanessa-enis.md.
