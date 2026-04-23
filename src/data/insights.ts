/*
 * Frameworks and speaker notes extracted from the Claude Community Australia
 * webinar (2026-04-22). The long-form extraction lives under
 * docs/insights/2026-04-22-claude-community-au/. This module is the cut-down
 * version the site renders.
 */

export type Speaker = {
  name: string;
  city: string;
  role: string;
};

export type Framework = {
  slug: string;
  title: string;
  tagline: string;
  speaker: Speaker;
  /** Which fluency level(s) this framework lands at. */
  levels: Array<"L1" | "L2" | "L3" | "L4" | "L5">;
  /** The short explainer shown on /insights and on the landing-page preview. */
  summary: string;
  /** Longer body, rendered as paragraphs on /insights/[slug]. */
  body: string[];
  /** One or two pull-quotes for the framework page. */
  quotes: string[];
  /** What the reader should try this week. Small, concrete. */
  challenge: string;
};

export const SPEAKERS: Record<string, Speaker> = {
  vanessa: {
    name: "Vanessa Enis",
    city: "Perth",
    role: "Product/delivery at Mechanical Rock",
  },
  mark: {
    name: "Mark Monfort",
    city: "Sydney",
    role: "Chief AI & Innovation Officer, Madison Marcus",
  },
  stephen: {
    name: "Stephen Coleman",
    city: "Melbourne",
    role: "Founder, Stratum (AI advisory)",
  },
  nick: {
    name: "Nick Lotheian",
    city: "Adelaide",
    role: "Staff engineer",
  },
  aiden: {
    name: "Aidan Morgan",
    city: "Perth",
    role: "Bankwest & AITAI / serial startup CTO",
  },
  buan: {
    name: "Buan Zich",
    city: "Brisbane/Sydney",
    role: "Director, B2 AI",
  },
  adam: {
    name: "Adam Halt",
    city: "New Zealand",
    role: "Claude Ambassador NZ / The Collab",
  },
};

export const FRAMEWORKS: Framework[] = [
  {
    slug: "the-harness",
    title: "The harness is where the value is",
    tagline: "Model gains are incremental. Harness gains are exponential.",
    speaker: SPEAKERS.stephen,
    levels: ["L2", "L3", "L4", "L5"],
    summary:
      "Models are improving in small steps. What moves in leaps is the harness — Claude Code, Co-work, MCP connectors, skills, memory. The new fluency skill is not prompting better; it's wielding more of the harness.",
    body: [
      "Stephen's TMNT-Krang metaphor: a brain in a jar is useless until it's strapped into a robot body, armed with tools, and steered by a pilot who brings context.",
      "Model = brain. Harness = body. Tools = weapons. Context = pilot. Skip any layer and the whole thing sits on a shelf.",
      "Downstream signal: Salesforce announced a headless CRM. If the category leader deprecates its front end, the UI layer is dying everywhere. The consulting pitch flips from \"here's your dashboard\" to \"here's your MCP-accessible data layer.\"",
    ],
    quotes: [
      "The value is going to creep up into the harness and into the context layer.",
      "The days of building dashboards being the thing clients are looking for are going to decrease.",
    ],
    challenge:
      "Pick one tool you've been running outside Claude Code and plumb it in via MCP this week. Don't add features — just close the gap between the brain and the body.",
  },
  {
    slug: "agents-tools-data",
    title: "Agents + Tools + Data",
    tagline: "Three ingredients. Miss one and the system is crippled.",
    speaker: SPEAKERS.mark,
    levels: ["L3", "L4"],
    summary:
      "Useful capability is the intersection of agents (that reason and act), tools (deterministic reach) and data (your organisation's actual facts). Agents alone is great conversations about nothing. Tools alone is slow execution. Data alone is where we were years ago.",
    body: [
      "Mark runs Legal Claw — an internal agentic system at Madison Marcus. Chronology extraction, causal-chain analysis, fork-point detection for \"but for\" tort analysis, debating agents on document review.",
      "His failure mode, caught in evals: Claude confidently claimed a real case \"didn't happen.\" Claude confidently claimed only Haiku runs MCPs. Both false. Both delivered without hesitation.",
      "Fix: break the one big prompt into subtasks, add MD files per role, put domain experts in the loop as validation. AI doesn't fail loudly — it fails convincingly.",
    ],
    quotes: [
      "AI doesn't fail loudly, it fails convincingly.",
      "Agents but no tools, no data — you're very limited. Tools but no data and agents — you're slower. Data alone is where we were a few years ago.",
    ],
    challenge:
      "Find a prompt in your rotation that has grown past 40 lines. Decompose it into a plan + 3+ sub-prompts + synthesis. Keep whichever version actually wins.",
  },
  {
    slug: "three-loop-delivery",
    title: "Three loops for agentic delivery",
    tagline: "Engineer the systems that engineer your systems.",
    speaker: SPEAKERS.aiden,
    levels: ["L4", "L5"],
    summary:
      "Three nested loops — coding, backpressure, experimental deployment. Humans don't sit inside any of them; humans engineer the guardrails between them. Aidan formally calls the approach Fitness Function Driven Development.",
    body: [
      "Coding loop: the LLM writes code and runs tests. \"Create code that looks like it works as quickly as possible.\" You're too slow to sit inside this. If it goes off the rails, stop and fix the guardrails (CLAUDE.md, skills, hooks, MCP configs). Don't poke it mid-loop.",
      "Backpressure loop: deterministic checks first — ast-grep, semgrep, radon, cohesion, complexipy, import-linter. LLM adversarial review second. Output is binary: pass/fail. Nuance confuses the model. Backpressure cannot come from human input — humans are too slow.",
      "Experimental deployment loop: ephemeral environments, blue/green and canary deploys, synthetic traffic, XmR control charts, SLOs/SLIs with burn rates, feature flags, circuit breakers, bulkheads. Detect problems and revert before users see them; failures feed back into the coding loop.",
      "Aidan's core rule: \"Using non-deterministic systems to evaluate non-deterministic output is the mathematical definition of chaos.\" Deterministic anchors first. LLM judgement after.",
    ],
    quotes: [
      "We need to engineer the systems that engineer our systems.",
      "You as a human — you're not needed in this loop. You're too slow.",
      "Back pressure is binary. It's either working the way I want it to, or it's not.",
    ],
    challenge:
      "Install ast-grep. Write one YAML rule for a pattern Claude keeps getting wrong in your repo. Wire it into a pre-commit hook. You've just closed half the middle loop.",
  },
  {
    slug: "ghost-libraries",
    title: "Ghost libraries",
    tagline: "Ship the prompt, not the software.",
    speaker: SPEAKERS.nick,
    levels: ["L4", "L5"],
    summary:
      "Instead of shipping compiled software, you ship a detailed prompt. The agent builds the software from scratch in the target environment every time. The prompt is the library.",
    body: [
      "The term comes from OpenAI's frontier team and their Symphony orchestration system. When Symphony needs human intervention, the team treats it as a prompt bug: fix the spec, rebuild everything from scratch.",
      "Symphony is written in Elixir. Nobody on the team knew Elixir — Codex chose the language because Erlang's actor model fits agent coordination. The human-agent interface is pure English.",
      "Benefit: environment-, language- and compliance-agnostic. Customer picks the stack; the spec adapts. Cost: \"No one else has ever run the code you're running. All the bugs are yours.\" Discipline required — edit the spec, not the code.",
    ],
    quotes: [
      "The prompt IS the library.",
      "Instead of shipping the software, you ship the prompt, and then the agent builds in the environment in which you're going to run.",
    ],
    challenge:
      "Pick one small tool you depend on. A CLI script, a config generator, a one-page dashboard. Rewrite its purpose as a ~500-word spec. Have Claude Code rebuild it from the spec in two different stacks.",
  },
  {
    slug: "kanban-driven-development",
    title: "Kanban-driven development",
    tagline: "The board is the brain. The ticket is the context.",
    speaker: SPEAKERS.buan,
    levels: ["L5"],
    summary:
      "Smaller context wins. Stateless agents with stateful tickets beat one long-running session. Dump task context into Linear/Jira/Shortcut tickets via a skill; let agents work one ticket at a time; let PMs query the board through Claude instead of opening it.",
    body: [
      "From Boris Cherny on The Pragmatic Engineer: Anthropic's Daisy connected Claude swarms to Asana over a weekend, had the swarms file tickets for themselves, and ran kanban-driven development. That spike became the Claude Code plugin system.",
      "Buan's setup: engineers use a Claude Code skill that writes a ticket per task — goal, decisions, blockers, commits. PMs observe the board. PMs ask Claude about the board instead of opening the board. Story points become the shared vocabulary between PM, Dev, and Claude.",
      "Why small context: the Opus 4.6 release notes flag a U-curve in quality between roughly 300K and 400K tokens. Even in a 1M window, accuracy is not uniform. Tickets are durable. Sessions are disposable.",
    ],
    quotes: [
      "Stateless agents with stateful tickets always beat one long-running session.",
      "The board is the brain and context is the real product.",
      "Story points became the shared language between PM, Dev, and Claude.",
    ],
    challenge:
      "Connect Claude Code to a Linear (or Jira, or Shortcut) board via MCP. Add a skill that writes a ticket on every task. Run one full day through tickets only — no long chats. Read the board back at the end.",
  },
  {
    slug: "prototype-first",
    title: "Prototype-first design thinking",
    tagline: "Build the demo before the brainstorm.",
    speaker: SPEAKERS.vanessa,
    levels: ["L2", "L3"],
    summary:
      "Invert design thinking. Old order: brainstorm → wireframes → dev → iterate for weeks. New order: prototype first with Claude Code → show client → brainstorm against real reactions.",
    body: [
      "Vanessa is a non-technical product person. Her journey was Lovable → Cursor → Claude Code terminal (now exclusive). She tells Claude the problem rather than the features: \"can you give me suggestions on what I might want to see?\"",
      "The trick isn't that building got faster. It's that building got cheaper than talking. The expensive step moved, so the order should too.",
    ],
    quotes: [
      "In the future everyone will have their own personal MD file. Within organizations, delivery will have an MD file, sales will have an MD file.",
    ],
    challenge:
      "Pick one idea that has been \"pre-spec\" for more than a week. Ship a clickable prototype in one Claude Code session. Don't write a spec first. Show it to one person before Friday.",
  },
  {
    slug: "tiered-model-usage",
    title: "Tiered model usage",
    tagline: "Sonnet often. Opus rarely. Cheap and better.",
    speaker: SPEAKERS.adam,
    levels: ["L4"],
    summary:
      "Match the model to the criticality of the task. Same job, two cadences, two models. Cheap where freshness matters, expensive where depth matters.",
    body: [
      "Adam built cyclone.thecollab.ai during an actual cyclone, in 2–3 hours, using leftover tokens. 500 concurrent users at peak. Energy retailers embedded it in their dashboards.",
      "The pattern: Sonnet every 15 minutes for situation reports — cheap, frequent, shallow. Opus every hour for comprehensive analysis — expensive, infrequent, deep.",
      "Generalises to any background workflow with mixed criticality. News summarisation. Ticket triage. Log anomaly detection. Meeting recaps. If you're running the same prompt on a cron, split it into two crons with two models.",
    ],
    quotes: [
      "It's like range anxiety but token anxiety.",
      "I don't write the code anymore. So why should I be so biased?",
    ],
    challenge:
      "Take one scheduled prompt. Split it into a cheap-frequent tier and an expensive-rare tier. Measure the spend delta after a week.",
  },
];

export function frameworkBySlug(slug: string): Framework | undefined {
  return FRAMEWORKS.find((f) => f.slug === slug);
}

/** The four layers of the harness, pulled out for the Krang block on the landing page. */
export const HARNESS_LAYERS = [
  {
    id: "brain",
    label: "Brain",
    sublabel: "the model",
    description:
      "Capable but disembodied. Can't act on its own. This is the part everyone obsesses over; it's the least of your problems.",
    accent: "#87867f",
  },
  {
    id: "body",
    label: "Body",
    sublabel: "the harness",
    description:
      "Claude Code, Co-work, desktop agents. The interface between brain and world. Where most of this year's leaps are happening.",
    accent: "#3a5878",
  },
  {
    id: "weapons",
    label: "Weapons",
    sublabel: "tools",
    description:
      "MCPs, skills, hooks, data connections, automations. What the body reaches for. Specialise here and compound.",
    accent: "#8b5cf6",
  },
  {
    id: "pilot",
    label: "Pilot",
    sublabel: "context",
    description:
      "CLAUDE.md, memory, your own taste. The irreplaceable layer. \"Taste and judgment are the two things I'm most focused on.\"",
    accent: "#d97757",
  },
] as const;
