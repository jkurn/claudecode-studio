# L5 drop — The outer loop: canary, observability, rollback

## Headline

At L5, deploys are a loop, not an event.

## Why this matters now

Aiden Morgan's three-loop model treats deployment as a feedback
channel, not a finish line:

- Canary / blue-green rollouts.
- Synthetic traffic.
- Observability on every signal.
- Auto-rollback.
- Failures feed back into the coding loop.

The outer loop is the thing separating L4 (Automator) from L5
(Orchestrator). L4 ships automations. L5 ships automations that know
when they're broken and roll themselves back.

## Use case

You have automations running. Something went wrong three weeks ago and
nobody noticed for six days. Your Claude-written deploy script has no
idea what "healthy" looks like.

## Skill

Pick one production automation. Add three layers:

1. **A health signal.** One number that indicates "this is working."
   Error rate, latency, success-rate on a synthetic call. Claude can
   write the synthetic call.
2. **A rollback trigger.** If the signal crosses a threshold, revert.
   `kubectl rollout undo`, a feature flag flip, a git revert — any
   tool that fits your stack.
3. **A feedback edge.** On rollback, open a ticket and feed the
   failure back into the coding loop. The agent that broke it is the
   agent that fixes it.

This is where `import-linter` and `complexipy` belong too — part of a
broader "fitness function" the system evaluates itself against.

## Challenge

For one automation this week, wire up one signal and one rollback.
Trigger a synthetic failure to confirm the rollback fires. Close the
loop: the rollback should create a ticket that points a Claude Code
session at the root cause.

## Receipt

Send the signal, the threshold, and a screenshot of the ticket a
synthetic failure opened. One line on what you'll add next week.

## Source

Aiden Morgan, frameworks/three-loop-delivery.md (outer loop).
