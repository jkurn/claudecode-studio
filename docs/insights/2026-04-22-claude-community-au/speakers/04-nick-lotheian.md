# Nick Lotheian — Ghost libraries

## Who

- Based in Adelaide.
- Staff engineer; ML/AI engineer pre-Claude.

## The talk

Ghost library: ship the *prompt*, not the software. The agent builds the
software fresh in the target environment.

Origin: OpenAI's frontier team via the Symphony orchestration system
(built by Ryan Lupolo). Symphony rebuilds itself from a single ~2,000-
line prompt any time a human would have intervened — the point of the
architecture is to eliminate intervention by making the intervention a
prompt edit.

Symphony is written in Elixir (Erlang). Nobody on the team knew Elixir
— Codex chose the language and they went with it. Rationale: Erlang's
telecom actor model handles agent-coordination problems naturally.

Benefits:

- Environment-, language-, and compliance-agnostic.
- Customers pick their stack; the spec adapts.
- Higher abstraction — you think in intent, not code.

Costs:

- "You're completely on your own. No one else has ever run the code
  you're running. All the bugs are yours."
- Discipline required: when you see a bug, fix the *spec* and rebuild,
  not the code. Easy to backslide.
- Shipping a well-specified ghost prompt can be more work than shipping
  software — you're writing English precise enough to compile.

Demos mentioned:

- Built an ANCAP car-safety-rating comparison tool from a prompt while
  driving home.
- His slide-presentation software is itself a ghost library.

## Quotes

> "The prompt IS the library."

> "Instead of shipping the software, you ship the prompt, and then the
> agent builds in the environment in which you're going to run."

> "All the bugs are yours."

## Takeaways for the site

- Ghost libraries are underexplored content territory — "here's a
  concept most of your peers haven't heard of" is strong newsletter
  material at L4 or L5.
- The Symphony-in-Elixir detail is the kind of concrete anecdote that
  makes the abstract concept land. Keep it.
- Practical L5 use case: convert one of the site's own tools (e.g. the
  quiz scoring logic) into a ghost-library spec as a demo.
