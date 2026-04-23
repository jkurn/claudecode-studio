# Three-loop agentic delivery

Owner: Aiden Morgan
Context: serial startup CTO, Perth

## The claim

"Engineer the systems that engineer your systems." Producing code
faster is not useful if requirements gathering and deployment are still
slow. Don't optimise the middle of the value stream; re-engineer the
whole thing around three nested feedback loops.

## The loops

### Inner loop — coding

- LLM writes code.
- LLM runs tests.
- LLM iterates.
- Humans are not needed here. "You're too slow."

Rule: if the agent goes off the rails, *don't intervene mid-loop*. Stop
the loop, fix the guardrails (`CLAUDE.md`, skills, hooks, MCP configs),
and restart.

### Middle loop — back pressure

Signals that tell the LLM it's wrong. Two phases, strict order:

1. **Deterministic phase.** Linters, static analysis, complexity
   metrics, architectural layer checks. Fixed outputs, reproducible.
2. **Non-deterministic phase.** LLM adversarial review — another agent
   critiques the first agent's output.

Output is binary. Pass or fail. Any fail feeds back into the inner
loop. Nuance is not allowed in this signal; the LLM gets confused
trying to interpret complex critique.

### Outer loop — deploy / production

- Canary / blue-green deploys.
- Synthetic traffic.
- Observability.
- Auto-rollback.

Detect problems before users see them; failures feed back into the
coding loop.

## Why the order matters

> "Using non-deterministic systems to evaluate non-deterministic output
> is actually the mathematical definition of chaos."

Deterministic checks have a fixed point. LLM judgement alone does not.
If the only thing telling an LLM it's wrong is another LLM, you're in a
loop with no anchor. Deterministic checks anchor the middle loop; LLM
review is a second pass *after* the anchors have held.

## Tools to install tonight

Adopt at least two of these and wire them into the middle loop:

| Tool            | Purpose                                            |
|-----------------|----------------------------------------------------|
| `ast-grep` (asg)| Syntax-tree pattern matching. YAML rules.          |
| `semgrep`       | Semantic code analysis. YAML rules.                |
| `radon`         | Python maintainability / cyclomatic complexity.    |
| `pyflakes`      | Python static analysis / best practices.           |
| `cohesion`      | Module coupling / cohesion measurement.            |
| `complexipy`    | Cognitive-complexity scoring.                      |
| `import-linter` | Architectural layer enforcement (catches drift).   |

Claude already knows these tools' rule languages. The cheapest
possible quality gate is: ask Claude to write the YAML, commit it,
wire it into pre-commit or a Claude Code hook.

## Vibe code the tools

> "If the tools don't exist to do the thing you want, you can vibe code
> a tool and then use the tool."

The periphery — linters, CI checks, metrics dashboards, deployment
scripts — is the right thing to build with AI. The rules enforcing
rules on your code are themselves a high-leverage target.

## Fitness-function-driven development

Define numerical criteria across every perspective of the product:
security, performance, maintainability, accessibility, UX, cost. Feed
those numbers into the middle loop as deterministic signals. This is
evaluation-driven development applied to the *build process* rather
than to the AI's output.

## How to use it on claudecode.studio

- This framework draws the line between L4 (Automator) and L5
  (Orchestrator) more crisply than any other idea in the webinar.
- Each loop is a newsletter drop:
  - L3 drop: "the inner loop — let Claude run tests, don't copy-paste."
  - L4 drop: "the middle loop — pick a tool from the list, write one
    rule, commit it."
  - L5 drop: "the outer loop — canary, observability, rollback."
- The "vibe code the tools" idea is a whole content series: one post
  per custom tool a reader could build for themselves.

## Quotes

> "We need to engineer the systems that engineer our systems."

> "You as a human — you're not needed in this loop. You're too slow."

> "Back pressure is binary. It's either working the way I want it to,
> or it's not."

> "Using non-deterministic systems to evaluate non-deterministic
> output is actually the mathematical definition of chaos."

> "If it starts going the way you don't want, step back and rethink
> your guardrails. What's in your CLAUDE.md? What are your skill
> definitions? What hooks do you have?"
