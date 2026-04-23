# L3 drop — Break big prompts into subtasks

## Headline

AI doesn't fail loudly. It fails convincingly.

## Why this matters now

Mark Monfort runs an internal agentic legal system at Madison Marcus.
In evals it has told him, with confidence:

- that a real legal case "didn't happen";
- that "only Haiku can run MCPs."

Both false. Both delivered without hesitation.

The failure isn't a crash. It's a fluent, plausible answer to a
question the model couldn't actually handle. The cause, in his
experience, is nearly always the same: the prompt was too big and the
agent was alone.

## Use case

You've hit that moment where a single long prompt used to work and now
it's producing answers that feel "a bit off" more often. You're not
sure if Claude is dumber today or you are.

## Skill

Break the one prompt into:

1. A **plan step**: "Given the goal, list the 3–6 sub-tasks you'd run."
2. **One sub-prompt per task**, each with its own `CLAUDE.md` or skill
   file describing the rules for that sub-task.
3. A **synthesis step** that reads the sub-outputs and produces the
   final answer.

Mark's rule: use "a whole bunch of MD files for the rules and the
thinking patterns." One MD per distinct role.

## Challenge

Find a prompt in your rotation that has quietly grown past 40 lines.
Decompose it this week into a plan + 3+ sub-prompts + synthesis.
Compare the output against the old mega-prompt. Keep whichever wins;
delete the other.

## Receipt

Send the before/after word counts and one example where the
decomposed version caught something the mega-prompt missed.

## Source

Mark Monfort, speakers/02-mark-monfort.md.
