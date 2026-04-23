/*
 * Adaptation of Wei Li, "The Practical Guide to GTM Autonomy" (April 2026),
 * mapped onto Claude Code builders. The original is written for sales reps;
 * the framework (capability vs. process, four autonomy levels, four rings
 * of ownership, recursive learning) is domain-agnostic. We reframe each
 * piece for the audience claudecode.studio serves.
 */

export const TRACKS = [
  {
    id: "capability",
    name: "Capability",
    question: "What can the system do?",
    owner: "Product teams, ops, system admins, platform engineers. Usually outside your direct control.",
    examples: [
      "The Claude model you have access to.",
      "The Claude Code harness and Co-work GUI.",
      "MCPs connected to your CRM, GitHub, calendar, Figma, Linear.",
      "Your cron + CI infrastructure.",
      "Signal-detection and trigger engines.",
    ],
    change:
      "Expands in steps. A new MCP comes online, a new model ships, a new hook API is released. You didn't build it, but now you're responsible for using it.",
  },
  {
    id: "process",
    name: "Process",
    question: "How should the system do it?",
    owner: "You. Your team. The knowledge in your head that rarely makes it into docs.",
    examples: [
      "The CLAUDE.md files that encode your team's conventions.",
      "Your playbooks and skills.",
      "Which tasks you delegate to agents vs. keep on your plate.",
      "How you handle exceptions, escalations, and quality gates.",
      "The ast-grep rules that teach Claude what bad code looks like here.",
    ],
    change:
      "Has to fill every gap capability creates. One new MCP unlocks dozens of new workflows; every one of them needs a process. This is the bottleneck — always.",
  },
] as const;

export const AUTONOMY_LEVELS = [
  {
    id: "L1",
    name: "Assisted",
    mindset: "I can decompose my work and delegate it.",
    cognitiveShift:
      "From doing everything yourself to articulating what you need done. The implicit process becomes explicit.",
    capability: [
      "A chat-based Claude surface (Claude Code or the web app).",
      "Access to your repo, docs, or data.",
      "Basic integrations — git, email, calendar, a CRM if you're selling.",
    ],
    process: [
      "The process lives entirely in your head. The AI is faster hands.",
      "Quality of output is directly proportional to quality of input.",
    ],
    codeExample:
      "You ask Claude Code to research a library, summarise a PR, or draft a commit message. You know what to delegate because you have the experience.",
    gtmExample:
      "You ask Claude for a prospect-research brief before a cold-outreach call. You pick the account; Claude does the legwork.",
  },
  {
    id: "L2",
    name: "Copilot",
    mindset: "I know my process well enough to describe it.",
    cognitiveShift:
      "From doing to describing. From practitioner to teacher of your own practice.",
    capability: [
      "A skill / playbook system (e.g. .claude/skills/).",
      "Persistent context files (CLAUDE.md, name.md, team conventions).",
      "Multi-step execution — research, then draft, then commit, then open PR.",
      "Template systems for repeatable outputs.",
    ],
    process: [
      "Each playbook is a process decision with judgment calls baked in.",
      "Most people have never articulated their own workflow explicitly. The work is self-awareness.",
    ],
    codeExample:
      "You have a \"review-this-PR\" skill that pulls the diff, checks against CLAUDE.md rules, runs tests, and drafts review comments. You still approve; the pipeline is codified.",
    gtmExample:
      "A Discovery Prep Playbook: pull all CRM data, research each attendee, surface relevant case studies, generate tailored discovery questions, produce a brief. You still run the call; the prep is systematised.",
  },
  {
    id: "L3",
    name: "Autopilot",
    mindset: "I can define what good looks like without seeing every output.",
    cognitiveShift:
      "From reviewing work to setting standards. From execution to exception handling.",
    capability: [
      "Signal detection across systems.",
      "Trigger engines wiring signals to playbook execution.",
      "Multi-agent orchestration running concurrently.",
      "Escalation logic — \"when should the agent stop and hand off?\"",
      "Quality monitoring dashboards or alerts.",
    ],
    process: [
      "You encode exception handling, not just execution.",
      "For each automated playbook: what triggers it, what \"working\" looks like, what causes escalation.",
      "Cost-of-error framework: more autonomy where the cost of error is low; tighter controls where it's high.",
    ],
    codeExample:
      "A prospecting agent reviews new issues on GitHub and triages them against your roadmap. A deploy-watcher auto-rollbacks on signal deviations and opens a ticket. You approve exceptions; you don't read every output.",
    gtmExample:
      "A pipeline-watcher agent drafts re-engagement emails when deals stall. A discovery-prep agent auto-runs before every scheduled call. You still own every conversation; the agent ensures nothing falls through.",
  },
  {
    id: "L4",
    name: "Self-Driving",
    mindset: "I set direction and the system figures out tactics.",
    cognitiveShift:
      "From managing workflows to evaluating performance and setting strategy. Division-head thinking applied to your personal scope.",
    capability: [
      "Pattern recognition across all agent activity.",
      "Workflow generation — the system proposes new playbooks.",
      "Performance analytics on agent output quality, conversion, velocity.",
      "A/B testing infrastructure.",
      "Cross-agent learning — one agent's performance informs others.",
    ],
    process: [
      "Process is no longer something you write. It's something the system generates and you evaluate.",
      "You define the criteria for what a good process looks like — what metrics matter, what quality looks like, what guardrails the system must never cross.",
    ],
    codeExample:
      "The system notices which of your ast-grep rules actually fire, suggests which to deprecate. Proposes new rules based on patterns in bugs. Runs A/B tests on different CI pipelines. You set the fitness functions; the system tunes.",
    gtmExample:
      "The system surfaces that outreach to VP-level personas converts 2× better than Director-level in manufacturing, but the opposite in financial services. Recommends retargeting the prospecting agent. You validate and approve.",
  },
] as const;

export const RINGS = [
  {
    id: "R1",
    name: "Personal",
    description:
      "Everything directly in your control — your preferences, workflow, repos, accounts you own. This is where to start.",
    inScope: true,
  },
  {
    id: "R2",
    name: "Team",
    description:
      "The people you work with to close a task — collaborators, reviewers, engineering managers, customer success. You coordinate; their work affects yours and vice versa.",
    inScope: true,
  },
  {
    id: "R3",
    name: "Department",
    description:
      "Your broader org unit — the wider team that shares your methodology. Shapes the environment you work in.",
    inScope: false,
  },
  {
    id: "R4",
    name: "Organisation",
    description:
      "The entire function. Operates at a metrics-and-forecasting altitude. Different conversation entirely.",
    inScope: false,
  },
] as const;
