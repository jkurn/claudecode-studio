import { FRAMEWORKS, SPEAKERS, type Framework, type Speaker } from "./insights";

export type LevelTag = "L1" | "L2" | "L3" | "L4" | "L5";

export type Drop = {
  slug: string;
  /** The ordinal position in the 12-week publishing sequence. */
  week: number;
  level: LevelTag;
  /** Sometimes a drop spans a transition ("L2→L3"); used for display only. */
  levelDisplay: string;
  title: string;
  headline: string;
  whyNow: string;
  useCase: string;
  skill: string;
  /** Optional block displayed monospaced (commands, YAML, cron lines). */
  skillSnippet?: string;
  challenge: string;
  receipt: string;
  source: { speaker: Speaker; framework?: Framework };
};

const f = (slug: string) => FRAMEWORKS.find((x) => x.slug === slug);

export const DROPS: Drop[] = [
  {
    slug: "youre-not-late",
    week: 1,
    level: "L1",
    levelDisplay: "L1",
    title: "You're not late. 99% haven't started.",
    headline: "You are not late to Claude Code. Most of the world hasn't opened it once.",
    whyNow:
      "Stephen Coleman opened his webinar talk with a dot chart: each dot represents 3.2 million people, and the vast majority have never used AI meaningfully. Every week at L1 you feel like the internet has passed you. It hasn't.",
    useCase:
      "You have a problem at work that feels too small to automate. A recurring email. A spreadsheet you fill in every Tuesday. A five-step process you do from memory.",
    skill:
      "Open Claude Code. Ask it to describe the problem back to you — no solutions yet. Let it list the steps; you decide which one is worth automating first.",
    skillSnippet: `I do this every week. Walk me through what this task
actually looks like, step by step, so we can see where
it could be faster.`,
    challenge:
      "Pick one thing you did twice this week. Describe it to Claude Code. Ask it what the first 20% of automating it would look like. Ship that first 20% before Friday.",
    receipt:
      "Send back the prompt you used and one before/after — \"this used to take me 40 minutes; now it takes 4.\" That's L2 knocking.",
    source: { speaker: SPEAKERS.stephen, framework: f("the-harness") },
  },
  {
    slug: "build-your-name-md",
    week: 2,
    level: "L2",
    levelDisplay: "L2",
    title: "Build your own name.md",
    headline: "One file. Every future conversation smarter.",
    whyNow:
      "Vanessa Enis — a non-technical product person at Mechanical Rock — predicted that every person and every function (sales, delivery, engineering) will eventually have a personal .md file. The people who build the habit now get compounding returns.",
    useCase:
      "You explain the same five things to Claude Code every week: role, stack, tone, current project, quirks. You hate repeating yourself. A you.md makes the repetition the machine's problem, not yours.",
    skill:
      "Create a file in your home directory called <your-name>.md. Reference it with an @-style path when you want it loaded. Use a section per facet: role, how I work, current focus, stack, don'ts.",
    skillSnippet: `# <Your name>.md

## Role
One paragraph on what you do.

## How I work
- Direct feedback is fine; softeners waste time.
- Explain tradeoffs, not just decisions.

## Current focus
- Main project and what "done" looks like.

## Don't
- Narrate what you're about to do; just do it.`,
    challenge:
      "Write your name.md this week. Reference it in three conversations. Note one thing Claude got right on the second pass that it used to miss on the first.",
    receipt:
      "Paste the first two sections of your name.md — no spec, just tone — and one line on what changed in your next session.",
    source: { speaker: SPEAKERS.vanessa, framework: f("prototype-first") },
  },
  {
    slug: "prototype-first",
    week: 3,
    level: "L2",
    levelDisplay: "L2→L3",
    title: "Stop wireframing. Prototype first.",
    headline: "The cheapest prototype is the next one you skip wireframing for.",
    whyNow:
      "Vanessa Enis flipped design thinking on the webinar. Old order: brainstorm → wireframes → dev → iterate for weeks. New order: prototype first with Claude Code, show the client, then brainstorm against real reactions. It's the signature L2→L3 move.",
    useCase:
      "An idea has been on your backlog for weeks. You've talked about it, sketched it, maybe even Figma'd it. It hasn't shipped. You keep waiting for \"a proper spec.\"",
    skill:
      "Tell Claude Code the problem, not the features. Let it propose. Prefer working HTML over Figma — Claude Code ships the HTML in one session.",
    skillSnippet: `I want a one-page dashboard for [user]. They currently
do [manual process]. What should the first version show?
Give me the five-minute prototype.`,
    challenge:
      "Pick an idea that has been \"pre-spec\" for more than a week. Ship a clickable prototype in one Claude Code session. Do not write a spec first. Show it to one person before Friday.",
    receipt:
      "Send the URL or a screenshot and one sentence of feedback you got that you could not have predicted from a brainstorm.",
    source: { speaker: SPEAKERS.vanessa, framework: f("prototype-first") },
  },
  {
    slug: "interrogate-a-codebase",
    week: 4,
    level: "L3",
    levelDisplay: "L3",
    title: "Interrogate an unfamiliar codebase",
    headline: "You don't need to read the code. You need to ask the right questions.",
    whyNow:
      "Vanessa reviews engineering work by connecting Claude Code to client GitHub repos and asking product questions about the code — not reading line-by-line. Claude becomes a translator between the engineering layer and the product one.",
    useCase:
      "You've just joined a project. Or you've inherited a codebase. A week of reading files is the old answer. It's the wrong one.",
    skill:
      "Connect Claude Code to the repo. Start with questions about the system, not the code:",
    skillSnippet: `- What does this system do in plain English? Ignore implementation.
- Which modules depend on which? Draw me the picture.
- Where does user input enter? Where does it leave?
- Which requirements from the README aren't obviously implemented?
- If I had 30 minutes with the original author, what 3 questions
  should I ask?`,
    challenge:
      "Pick a repo you don't know. Spend one Claude Code session asking only system-level questions. Produce a one-pager you could hand to a new teammate on Monday.",
    receipt:
      "Send the one-pager. One paragraph on what you learned in an hour that reading files would have taken you a week to reach.",
    source: { speaker: SPEAKERS.vanessa, framework: f("prototype-first") },
  },
  {
    slug: "subtasks-over-mega-prompts",
    week: 5,
    level: "L3",
    levelDisplay: "L3",
    title: "Break big prompts into subtasks",
    headline: "AI doesn't fail loudly. It fails convincingly.",
    whyNow:
      "Mark Monfort's internal legal AI has confidently told him a real case \"didn't happen\" and confidently told him \"only Haiku can run MCPs.\" Both false. The cause, in his experience, is always the same: the prompt was too big and the agent was alone.",
    useCase:
      "You've hit that moment where a single long prompt used to work and now it's producing answers that feel \"a bit off\" more often. You're not sure if Claude is dumber today or you are.",
    skill:
      "Decompose the one prompt into a plan step, one sub-prompt per task (each with its own MD file describing the rules for that sub-task), and a synthesis step.",
    challenge:
      "Find a prompt in your rotation that has grown past 40 lines. Decompose it this week into a plan + 3+ sub-prompts + synthesis. Compare against the old mega-prompt. Keep whichever wins.",
    receipt:
      "Send the before/after word counts and one example where the decomposed version caught something the mega-prompt missed.",
    source: { speaker: SPEAKERS.mark, framework: f("agents-tools-data") },
  },
  {
    slug: "first-ast-grep-rule",
    week: 6,
    level: "L4",
    levelDisplay: "L4",
    title: "Your first ast-grep rule",
    headline: "Claude doesn't need a second opinion. It needs a deterministic one.",
    whyNow:
      "Aidan Morgan's core rule: \"Using non-deterministic systems to evaluate non-deterministic output is the mathematical definition of chaos.\" If the only thing telling Claude it's wrong is another Claude, nothing anchors the backpressure loop. ast-grep is the cheapest possible first deterministic signal.",
    useCase:
      "Your repo has a mistake Claude keeps re-introducing. A banned import. A deprecated pattern. A signature the team agreed to stop using. Every review, you flag it again.",
    skill:
      "Install ast-grep. Write one YAML rule for the exact pattern. Wire it into a pre-commit hook and a Claude Code PostToolUse hook.",
    skillSnippet: `# sgconfig.yml
id: no-console-log
message: Use the app logger, not console.log.
severity: error
language: TypeScript
rule:
  pattern: console.log($$$)`,
    challenge:
      "Pick one thing Claude keeps doing wrong this week. Write one ast-grep rule. Commit the rule file. Next time Claude writes the pattern, the rule flags it before you do.",
    receipt:
      "Paste the rule YAML and the commit hash. One line on what Claude used to get wrong that the rule now catches.",
    source: { speaker: SPEAKERS.aiden, framework: f("three-loop-delivery") },
  },
  {
    slug: "add-semgrep-next",
    week: 7,
    level: "L4",
    levelDisplay: "L4",
    title: "Add semgrep next",
    headline: "ast-grep catches syntax. semgrep catches intent.",
    whyNow:
      "ast-grep works on the syntax tree; semgrep works on semantics — things like \"never call this function without that one first\" or \"never pass unsanitised input to this sink.\" You want both because they catch different mistakes.",
    useCase:
      "Your first ast-grep rule is live, and Claude has started routing around it. Not maliciously — just because the bad pattern has more than one surface form.",
    skill:
      "Install semgrep. Start with the community ruleset for your language, then add one custom YAML rule that encodes a real bug your team has hit.",
    skillSnippet: `# semgrep.yml
rules:
  - id: untrusted-input-into-exec
    message: Don't pass request input directly to shell.
    severity: ERROR
    languages: [python]
    pattern: |
      subprocess.$F(request.$ANY, ...)`,
    challenge:
      "Write one semgrep rule this week that encodes a real production bug from your repo's history. Commit the rule. Wire it into CI.",
    receipt:
      "The rule YAML, the CI log showing it fires, and one line on which past incident would have been prevented.",
    source: { speaker: SPEAKERS.aiden, framework: f("three-loop-delivery") },
  },
  {
    slug: "tiered-model-cron",
    week: 8,
    level: "L4",
    levelDisplay: "L4",
    title: "Your cron jobs shouldn't all use the same model",
    headline: "Sonnet every 15 minutes. Opus every hour. Cheaper and better.",
    whyNow:
      "Adam Halt built cyclone.thecollab.ai during an actual cyclone in 2–3 hours. 500 concurrent users. Energy retailers put it on their corporate dashboards. The cost trick that made it sustainable: Sonnet every 15 minutes for situation reports, Opus every hour for comprehensive analysis.",
    useCase:
      "You have a scheduled prompt running on one model every N minutes. You've never thought about it since. You're either overpaying for the 95% of runs that don't need it, or underpaying on the 5% that do.",
    skill:
      "Split the cron into two tiers: cheap-frequent-shallow and expensive-infrequent-deep.",
    skillSnippet: `# Every 15 minutes — cheap, frequent, shallow.
0,15,30,45 * * * *  claude-run --model sonnet  ./prompts/situation.md

# Every hour — expensive, deep, synthesis.
0 * * * *           claude-run --model opus    ./prompts/analysis.md`,
    challenge:
      "Pick one existing scheduled prompt. Split it into two cadences with two models. Run it for a week. Measure the token-spend delta.",
    receipt:
      "Send the before/after cron entries and one week's spend delta.",
    source: { speaker: SPEAKERS.adam, framework: f("tiered-model-usage") },
  },
  {
    slug: "vibe-code-the-tool",
    week: 9,
    level: "L4",
    levelDisplay: "L4→L5",
    title: "Vibe code the tool, not just the product",
    headline: "If the check you want doesn't exist, build it.",
    whyNow:
      "Aidan Morgan's line: \"If the tools don't exist to do the thing you want, you can vibe code a tool and then use the tool.\" The periphery — linters, CI checks, metrics dashboards, deployment scripts — is the right thing to build with Claude. The rules that enforce rules on your codebase are themselves high-leverage.",
    useCase:
      "You've been wanting to catch \"function X is called without function Y\" as a pre-commit check. No off-the-shelf tool covers it. You keep reviewing it by hand.",
    skill:
      "Spend one Claude Code session building a minimal custom linter. Output is a CLI that exits 1 when the pattern is violated. Package it as a single file; wire it into a pre-commit hook and a Claude Code PostToolUse hook.",
    challenge:
      "Build one custom check your team has wanted but no tool provides. Ship it this week. Less than 200 lines of code.",
    receipt:
      "The CLI script, the hook config, and a one-line example of a commit it caught.",
    source: { speaker: SPEAKERS.aiden, framework: f("three-loop-delivery") },
  },
  {
    slug: "kanban-driven-dev",
    week: 10,
    level: "L5",
    levelDisplay: "L5",
    title: "Kanban-driven development in one day",
    headline: "The board is the brain. Your chat history isn't.",
    whyNow:
      "Buan Zich's webinar talk revealed how Anthropic actually built Claude Code plugins: Daisy connected Claude swarms to Asana over a weekend and ran kanban-driven development. The rule: stateless agents with stateful tickets always beat one long-running session. Small context wins; even a 1M window decays at 300–400K tokens.",
    useCase:
      "Your Claude Code sessions get messy after 30 turns. You lose track of what's been decided. You restart and re-explain. Your teammates can't see what the agent's doing.",
    skill:
      "Connect Claude Code to a Linear (or Jira, or Shortcut) board via MCP. Install a skill that writes a ticket on every task. Work one ticket at a time in short, disposable sessions.",
    skillSnippet: `# .claude/skills/write-a-ticket.md
On any new task:
1. Draft the ticket (goal, acceptance, decisions so far, blockers).
2. Create it on the board via Linear MCP.
3. Put the ticket ID in the session as the first line.
4. Update with commits as they land.`,
    challenge:
      "Run one full working day through tickets only. No long chats. At the end of the day, write a one-paragraph retrospective: what did the board tell you that the chat never did?",
    receipt:
      "The board screenshot after one day. One line on what you'd do differently tomorrow.",
    source: { speaker: SPEAKERS.buan, framework: f("kanban-driven-development") },
  },
  {
    slug: "outer-loop",
    week: 11,
    level: "L5",
    levelDisplay: "L5",
    title: "The outer loop: canary, observability, rollback",
    headline: "At L5, deploys are a loop, not an event.",
    whyNow:
      "Aidan's experimental deployment loop treats deployment as a feedback channel, not a finish line: ephemeral environments, blue/green and canary deploys, synthetic traffic, XmR control charts, SLOs and SLIs with burn rates, feature flags / circuit breakers / bulkheads. The outer loop is what separates L4 from L5.",
    useCase:
      "You have automations running. Something went wrong three weeks ago and nobody noticed for six days. Your Claude-written deploy script has no idea what \"healthy\" looks like.",
    skill:
      "Pick one production automation. Add a health signal, a rollback trigger, and a feedback edge that opens a ticket on rollback.",
    challenge:
      "For one automation this week, wire up one signal and one rollback. Trigger a synthetic failure to confirm the rollback fires. The rollback should create a ticket that points a Claude Code session at the root cause.",
    receipt:
      "The signal, the threshold, and a screenshot of the ticket a synthetic failure opened. One line on what you'll add next week.",
    source: { speaker: SPEAKERS.aiden, framework: f("three-loop-delivery") },
  },
  {
    slug: "first-ghost-library",
    week: 12,
    level: "L5",
    levelDisplay: "L5",
    title: "Your first ghost library",
    headline: "Ship the prompt. Let the agent build the software.",
    whyNow:
      "Nick Lotheian's pattern, popularised by OpenAI's Symphony orchestration system: you ship a detailed spec instead of compiled software, and the agent rebuilds the system from scratch in the target environment. \"The prompt IS the library.\" Symphony is Elixir; Codex chose the language; nobody on the team knew it.",
    useCase:
      "You maintain a small CLI tool, a config generator, or a one-page dashboard. Every port to a new stack is a rewrite you dread.",
    skill:
      "Write a ghost-library spec in five sections: Intent, Behaviour Contract (testable invariants), Environment Adapters (at least two stacks), Compliance Clauses, Seed Invocation.",
    challenge:
      "Pick one small tool. Write the spec. Rebuild it in two different stacks from the same spec. If the behaviour contract passes in both, the spec is real. If it fails, edit the spec — not the rebuild.",
    receipt:
      "The spec.md file and the two rebuilt implementations. One line on what the contract caught that you would have missed.",
    source: { speaker: SPEAKERS.nick, framework: f("ghost-libraries") },
  },
];

export function dropBySlug(slug: string): Drop | undefined {
  return DROPS.find((d) => d.slug === slug);
}
