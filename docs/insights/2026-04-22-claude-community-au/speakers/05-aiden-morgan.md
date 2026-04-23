# Aiden Morgan — Engineer the systems that engineer your systems

## Who

- Based in Perth.
- Software engineer; multi-time startup CTO.

## The talk

Most technically dense talk of the night. Central claim: producing code
faster is useless if requirements gathering and deployment are still
slow — don't optimise the middle, re-engineer the whole value stream.

### Three loops

**Inner loop (coding).** LLM generates code, runs tests, iterates. "You
as a human — you're not needed in this loop. You're too slow." If the
agent starts going wrong, don't poke it mid-loop; step back and fix the
guardrails (CLAUDE.md, hooks, skills, MCPs), then restart.

**Middle loop (back pressure).** Signals that tell the LLM it's wrong.

- *Deterministic phase first*: linters, static analysis, complexity
  metrics, architectural layer enforcement.
- *Non-deterministic phase second*: LLM adversarial review.
- Output is binary — pass/fail only. Any fail loops back to the inner
  loop.

**Outer loop (deploy/production).** Canary, blue/green, synthetic
traffic, observability. Detect problems before users see them; rollback
feeds back into the coding loop.

### Why the order matters

"Using non-deterministic systems to evaluate non-deterministic output is
actually the mathematical definition of chaos." Deterministic checks
run first; LLM judgement is only trustworthy as a *second* layer on top
of checks that have a fixed point.

Back pressure has to be binary. Nuanced feedback confuses the LLM;
pass/fail retries cleanly.

### Tools he recommends (adopt tonight)

- `ast-grep` (asg) — syntax-tree pattern matching. YAML rule DSL. 100%
  deterministic. Claude already knows the rule language.
- `semgrep` — semantic code analysis, also YAML rules.
- `radon` — Python maintainability / complexity.
- `pyflakes` — Python static analysis / best practices.
- `cohesion` — module coupling / cohesion.
- `complexipy` / `wily` — cognitive-complexity scoring.
- `import-linter` — architectural layer enforcement (catches drift).

### Vibe code the tools, not just the product

"If the tools don't exist to do the thing you want, you can vibe code a
tool and then use the tool." The periphery — linters, metrics
dashboards, CI checks, deployment scripts — is the right thing to build
with AI. Use the model to build the *rules* that enforce rules on your
codebase.

### Fitness-function-driven development

Define numerical quality criteria across every perspective of the
product (security, performance, maintainability, accessibility, UX,
cost). Feed those into the middle loop. This is evaluation-driven
development applied to the build process, not just to the AI output.

## Quotes

> "We need to engineer the systems that engineer our systems."

> "You as a human — you're not needed in this loop. You're too slow."

> "Back pressure is binary. It's either working the way I want it to,
> or it's not."

> "Using non-deterministic systems to evaluate non-deterministic output
> is actually the mathematical definition of chaos."

> "If the tools don't exist to do the thing you want, you can vibe code
> a tool and then use the tool."

> "If it starts going the way you don't want, step back and rethink
> your guardrails. What's in your CLAUDE.md? What are your skill
> definitions? What hooks do you have?"

## Takeaways for the site

- The three-loop model is the most portable framework of the night.
  Worth a dedicated explainer page with a diagram.
- Aiden's tool list is ready-made newsletter content — one tool per
  drop across L4 readers, each with a "install, write one rule, check
  in" challenge.
- "Engineer the systems that engineer our systems" is a tagline-grade
  line for a landing section.
- The middle-loop concept is the feature that distinguishes L4
  (Automator) from L5 (Orchestrator) in the site's framework.
