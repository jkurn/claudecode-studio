# Agents + Tools + Data

Owner: Mark Monfort
Context: Legal Claw at Madison Marcus

## The claim

Useful AI capability sits at the intersection of three ingredients:

- **Agents.** Something that reasons and acts.
- **Tools.** Deterministic capabilities the agent can reach for — MCPs,
  shell, search, code execution, dashboards.
- **Data.** The organisation's actual facts — documents, tickets,
  transactions, code.

Miss any one and the system is crippled.

## The failure modes

| Missing       | Symptom                                              |
|---------------|------------------------------------------------------|
| Just agents   | Great conversations about nothing. Can't act or cite. |
| Just tools    | Slow, narrow execution. Nothing orchestrates them.   |
| Just data     | Where we were years ago — dashboards, BI, reports.   |

All three together is what unlocks workflows like Legal Claw:

- Chronology extraction.
- Causal-chain analysis.
- Fork-point ("but for") detection.
- Debating agents for document review.

## How to use it on claudecode.studio

### As a readiness rubric

When a reader asks "can I do X with Claude Code?", check each leg:

1. Is there an agent surface that can reason about X?
2. Are there tools (MCPs, scripts, shells) that can act on X?
3. Is there data the agent can read and cite?

If two legs are in place, the remaining leg is the next week's work.
That maps cleanly to the newsletter's "one challenge per week" format.

### As a level marker

- L1–L2 readers have agents only. They're in the conversation layer.
- L3 readers add tools (Claude Code itself is the first real tool).
- L4 readers add the data plumbing — files, MCPs, custom integrations.
- L5 readers orchestrate all three across multiple tickets and agents.

### Why this framing beats "prompt better"

Most advice collapses to "write better prompts." The triad reframes
failure as *missing plumbing*, not missing skill. That's more
actionable and less discouraging.

## Quotes

> "Agents but no tools, no data — you're very limited. Tools but no
> data and agents — you're slower. Data alone is where we were a few
> years ago. Bringing all three together is what leads to the ability
> to create."
