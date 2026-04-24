# Ghost libraries

Owner: Nick Lotheian
Origin of term: OpenAI frontier team (Symphony orchestration system)

## The claim

Instead of shipping software, ship the prompt. The agent builds the
software fresh in the target environment every time it runs.

The prompt *is* the library.

## The origin story

OpenAI's frontier team built Symphony — an orchestration system that
coordinates agents to build software without human intervention. Any
time a human would have intervened, the team treats it as a prompt bug:
fix the prompt, rebuild the system from scratch. The result is a single
~2,000-line prompt that regenerates the entire stack on demand.

Symphony is written in Elixir / Erlang. Nobody on the team knew
Elixir when they started — Codex chose the language. The rationale:
Erlang's telecom actor model maps cleanly onto the coordination
problems agents face.

## The anatomy

A ghost library is, roughly:

1. **Spec** — a long, precise English-language description of what the
   system does and how it behaves.
2. **Environment adapters** — enough detail that the agent can target a
   specific runtime (Python on AWS Lambda, TypeScript on Cloudflare
   Workers, etc.) from the same spec.
3. **Compliance clauses** — requirements that have to be true in every
   build (data residency, redaction, access control).
4. **Seed invocation** — "given this environment, rebuild the system."

The agent produces fresh code every time.

## Benefits

- **Environment-, language-, and compliance-agnostic.** Customers pick
  their stack; the spec adapts.
- **Higher abstraction.** You reason in intent, not code.
- **Cleaner security/compliance story.** Compliance requirements live
  in the spec and cannot be bypassed without a prompt edit.

## Costs

- **You're on your own.** "No one else has ever run the code you're
  running. All the bugs are yours."
- **Spec precision is the new discipline.** When you see a bug, you
  have to resist fixing the code; the fix belongs in the spec, and the
  system needs to be rebuilt. Easy to backslide.
- **Shipping a well-specified ghost prompt can be more work than
  shipping software.** You're writing English precise enough to
  compile.

## Demos Nick mentioned

- An ANCAP car-safety-rating comparison tool, built from a prompt
  during a drive home.
- His own slide-presentation software, built as a ghost library.

## How to use it on claudecode.studio

- Ghost libraries are high-status, low-awareness content — most readers
  haven't heard the phrase. Good L4 / L5 newsletter material.
- Concrete L5 challenge: pick one small tool the reader depends on
  (e.g. a CLI script, a lint config generator) and convert it to a
  ghost-library spec. Rebuild it twice in different runtimes.
- Connects well to the site's own workflow: a `CLAUDE.md` + `skills/`
  folder detailed enough to regenerate parts of the site is already a
  ghost library in miniature.

## Quotes

> "The prompt IS the library."

> "Instead of shipping the software, you ship the prompt, and then the
> agent builds in the environment in which you're going to run."

> "You're completely on your own. No one else has ever run the code
> you're running. All the bugs are yours."
