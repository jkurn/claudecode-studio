# L4 drop — Your first ast-grep rule

## Headline

Claude doesn't need a second opinion. It needs a deterministic one.

## Why this matters now

Aidan Morgan's core rule from the webinar:

> "Using non-deterministic systems to evaluate non-deterministic output
> is actually the mathematical definition of chaos."

If the only thing telling Claude it's wrong is another Claude, nothing
anchors the loop. You need a deterministic signal first, LLM judgement
second.

`ast-grep` is the cheapest possible first step. It matches patterns on
the syntax tree. YAML rules. 100% reproducible. Claude already knows
the rule language.

## Use case

Your repo has a mistake Claude keeps re-introducing. A banned import.
A pattern you've deprecated. A signature the team agreed to stop
using. Every code review, you flag it again.

## Skill

Install `ast-grep`:

```
brew install ast-grep        # mac
cargo install ast-grep --locked   # anywhere with rust
```

Write your first rule in `sgconfig.yml` or `.ast-grep/rules/`:

```yaml
id: no-console-log
message: Use the app logger, not console.log.
severity: error
language: TypeScript
rule:
  pattern: console.log($$$)
```

Run it:

```
ast-grep scan
```

Wire it into a Claude Code hook or a pre-commit. Add a short sentence
to `CLAUDE.md`: "Run `ast-grep scan` before finishing any task; do not
ship on failures."

## Challenge

Pick one thing Claude keeps doing wrong this week. Write one `ast-grep`
rule. Commit the rule file. Next time Claude writes the pattern, the
rule flags it before you do.

## Receipt

Paste the rule YAML and the commit hash. One line on what Claude
used to get wrong that the rule now catches.

## Source

Aidan Morgan, frameworks/three-loop-delivery.md (middle loop).
