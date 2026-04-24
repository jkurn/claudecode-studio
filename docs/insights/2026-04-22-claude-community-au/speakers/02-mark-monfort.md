# Mark Monfort — Legal Claw, agents + tools + data

## Who

- Based in Sydney.
- Data analyst / scientist by background; previously ASX-adjacent work.
- Chief AI & Innovation Officer at Madison Marcus (law firm).
- Runs the Australian DeFi Association (rebranding to the Australian
  Blockchain & AI Network).
- Built ETF Tracker (500 users in month one).

## The talk

Built "Legal Claw" — an internal agentic system for a law firm. Core
capabilities:

- Chronology extraction from document sets.
- Causal-chain analysis.
- Fork-point detection for "but for" analysis in tort cases.
- Document review where agents debate each other — "they show their
  facts, they go against each other, they agree, they disagree, and come
  out with final outputs."

Headline framework: **Agents + Tools + Data = capability.** Miss one and
the system is crippled. Agents alone → conversations about nothing.
Tools alone → slow execution. Data alone → where we were years ago. All
three → Legal Claw.

Failure mode he keeps catching in evals:

- Claude confidently claimed a real case "didn't happen."
- Claude claimed "only Haiku can run MCPs" (false).

Root cause: prompts too big, single agents, not enough subtasks or
MD-based guardrails.

Fix: break work into subtasks and subprompts; use "a whole bunch of MD
files for the rules and the thinking patterns." Domain experts in the
loop — technical or not — are the validation layer.

ETF Tracker story: started in PowerBI, migrated to Bolt, then to Claude
Code. Each migration was a capability leap, not a rewrite.

## Quotes

> "AI doesn't fail loudly, it fails convincingly."

> "The calls are getting too big and you're not breaking it up. Big
> prompts and single agents make for bad systems."

## Takeaways for the site

- "Agents + Tools + Data" is a cleaner framing than most consulting
  rubrics. Candidate for the homepage or an explainer page.
- The "AI fails convincingly" idea is a visceral L3-L4 lesson — the kind
  of thing a builder remembers after the first eval catches a confident
  hallucination.
- ETF Tracker's migration ladder (PowerBI → Bolt → Claude Code) makes a
  good case study for showing that each fluency level has a
  corresponding tool ceiling.
