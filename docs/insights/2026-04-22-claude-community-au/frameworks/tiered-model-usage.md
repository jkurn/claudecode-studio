# Tiered model usage

Owner: Adam Halt
Context: cyclone.thecollab.ai

## The claim

Match the model to the criticality of the task. The same job at two
cadences with two models is cheaper *and* better than one cadence
with one model.

## The cyclone-tracker example

- **Sonnet every 15 minutes** — situation reports. Cheap, frequent.
  Good enough for "the current state of things."
- **Opus every hour** — comprehensive analysis. Expensive, infrequent.
  Reserved for the work where depth actually matters.

Two cadences, two models, one product.

## Why it works

- Most tasks don't need the most expensive model; they need the most
  *recent* answer.
- A small number of tasks need depth you can only get from the top
  model.
- Running both on different cadences spends money where it pays off.

## Generalising the pattern

Any background workflow with mixed criticality is a candidate:

- News / alert summarisation.
- Support-ticket triage (Haiku/Sonnet triage, Opus escalation).
- Log anomaly detection.
- Content review pipelines.
- Meeting summarisation (quick recap vs. deep synthesis).

Rule of thumb: if you're running the same prompt on a cron, consider
splitting it into two crons with two models.

## How to use it on claudecode.studio

- L4 newsletter drop: "your cron jobs shouldn't all use the same
  model." One challenge: take one existing scheduled prompt, split it
  into a cheap-frequent tier and an expensive-rare tier, measure the
  spend delta for a week.
- Good companion post to the "Agents + Tools + Data" triad — this is
  how you budget the *agent* side of the triad.

## Quotes

> "It's like range anxiety but token anxiety."

> "I don't write the code anymore. So why should I be so biased?"
