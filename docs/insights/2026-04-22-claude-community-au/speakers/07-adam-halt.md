# Adam Halt — Cyclone tracker case study

## Who

- Based in New Zealand.
- Claude Ambassador NZ.
- Founded multiple companies.
- Runs The Collab, a 600+-member WhatsApp community.

## The talk

Built cyclone.thecollab.ai over a weekend, during an actual cyclone, from
"token anxiety" — leftover Claude tokens at the end of a billing cycle.
2–3 hours of work; 500 concurrent users at peak; re-posted by energy
retailers and embedded on their corporate dashboards as "the best
aggregated view." Still live.

### What it aggregates

- RSS news feeds.
- Met service weather alerts.
- Road closures.
- Evacuation shelters.
- River-level data.
- Webcams.
- Live feeds.

Claude already knew the NZ news RSS feed URLs from training data, so
the plumbing assembled itself.

### Tiered model usage

- **Sonnet** every 15 minutes — situation reports (cheap, frequent).
- **Opus** every hour — comprehensive analysis (expensive, infrequent).

Match the model to the criticality of the task. Same job, two cadences.

### User-driven development

Added a feature-request widget on the site. Users suggested new data
sources (river data, additional feeds). Built them live with Claude
Code. Real-time user-driven development with near-zero implementation
cost.

### Modularity prevents context collapse

Built features as separate modules, each with its own cron job and
context. Don't pool everything into one giant session — "the models
start to get confused because it's not really sure which way to go."

### Choose the stack the model knows best

"I prefer Vue.js over React but I know the LLMs are really really good
at React. I don't write the code anymore, so why should I be biased?"

Ship where the training data is richest.

## Quotes

> "It's like range anxiety but token anxiety."

> "I don't write the code anymore. So why should I be so biased?"

> "Just go build stuff. Have an idea, try the tools."

## Takeaways for the site

- The cyclone tracker is a perfect L3→L4 case study: idea on Saturday,
  live users on Sunday, features shipped by Monday. Write it up as an
  "anatomy of a weekend build."
- Tiered model usage (Sonnet often, Opus rarely) is a small pattern
  that saves real money; belongs in an L4 drop with a concrete cron
  example.
- "Build where the training data is richest" is counter-intuitive
  enough to be shareable — the "I don't write the code anymore"
  reframing flips a decision most builders have never consciously made.
- Modularity + separate cron jobs is an antidote to the "one giant
  session that falls apart" failure mode many L3 builders hit.
