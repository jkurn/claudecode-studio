# L4 drop — Your cron jobs shouldn't all use the same model

## Headline

Sonnet every 15 minutes. Opus every hour. Cheaper and better.

## Why this matters now

Adam Halt built cyclone.thecollab.ai during a real cyclone, in 2–3
hours, using leftover tokens. 500 concurrent users. Energy retailers
put it on their corporate dashboards. The cost trick that made it
sustainable:

- **Sonnet** every 15 minutes for situation reports.
- **Opus** every hour for comprehensive analysis.

Same product, two cadences, two models. Cheap where freshness matters,
expensive where depth matters.

## Use case

You have a scheduled prompt. News summarisation, ticket triage, log
monitoring, meeting recaps, whatever. It's running on one model every
N minutes and you've never thought about it since. You're either
overpaying for the 95% of runs that don't need it, or underpaying on
the 5% that do.

## Skill

Split the cron into two tiers:

```
# Every 15 minutes — cheap, frequent, shallow.
0,15,30,45 * * * *  claude-run --model sonnet  ./prompts/situation.md

# Every hour — expensive, deep, synthesis.
0 * * * *           claude-run --model opus    ./prompts/analysis.md
```

Rule of thumb: if the user would notice a 15-minute delay, use the
cheap tier at high cadence. If they'd only notice missing depth, use
the expensive tier sparingly.

## Challenge

Pick one existing scheduled prompt. Split it into two cadences with
two models. Run it for a week. Measure the token-spend delta and note
whether output quality changed.

## Receipt

Send the before/after cron entries and one week's spend delta.

## Source

Adam Halt, frameworks/tiered-model-usage.md.
