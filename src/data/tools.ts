export type ToolCategory = {
  id: string;
  title: string;
  blurb: string;
  items: ToolEntry[];
};

export type ToolEntry = {
  name: string;
  description: string;
  /** The speaker most closely associated with it, if any. */
  seenVia?: string;
};

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "coding-surfaces",
    title: "Coding surfaces",
    blurb:
      "The harness layer — where you actually sit down and work. Claude Code was universal across the webinar; other surfaces show up at the edges.",
    items: [
      {
        name: "Claude Code",
        description: "Primary build tool for every speaker.",
        seenVia: "All",
      },
      {
        name: "Claude Co-work",
        description:
          "GUI harness for Claude Code. Low adoption — only ~15% of attendees at the Sydney event had used it.",
        seenVia: "Stephen Coleman",
      },
      {
        name: "Claude Design",
        description: "Web app for design work; different pricing model.",
        seenVia: "Stephen Coleman",
      },
      {
        name: "Cursor",
        description: "IDE. Stepping stone some builders passed through on the way to Claude Code.",
        seenVia: "Vanessa Enis",
      },
      {
        name: "Antigravity",
        description: "Google's equivalent IDE surface; mentioned in passing.",
      },
      {
        name: "Bolt",
        description: "Vibe-coding tool used pre–Claude Code in Mark's ETF Tracker migration ladder.",
        seenVia: "Mark Monfort",
      },
      {
        name: "Lovable",
        description: "Vibe-coding entry point for non-technical users.",
        seenVia: "Vanessa Enis",
      },
    ],
  },
  {
    id: "mcp",
    title: "MCP servers",
    blurb:
      "MCP is how Claude Code reaches out. These are the specific servers speakers name-checked — not exhaustive, just what actually shipped in someone's workflow.",
    items: [
      {
        name: "Figma MCP",
        description: "Read-only at time of talk. Connected from Claude Code to pull design context.",
        seenVia: "Vanessa Enis",
      },
      {
        name: "PowerPoint MCP",
        description: "Suggested as an alternative to Figma MCP for deck generation.",
        seenVia: "Vanessa Enis",
      },
      {
        name: "GitHub MCP",
        description:
          "Connect Claude Code to repos so product people can interrogate the code at a system level.",
        seenVia: "Vanessa Enis",
      },
      {
        name: "Linear MCP",
        description: "Drives kanban-driven development; the MCP that makes the board the brain.",
        seenVia: "Buan Zich",
      },
    ],
  },
  {
    id: "deterministic-checkers",
    title: "Deterministic code checkers",
    blurb:
      "Aidan Morgan's list — the backpressure loop lives here. These are the signals that tell an LLM it's wrong without using another LLM to do the telling.",
    items: [
      {
        name: "ast-grep (asg)",
        description: "Syntax-tree pattern matching. YAML rule DSL. Claude already knows the rule language.",
      },
      {
        name: "semgrep",
        description: "Semantic code analysis; YAML rules. Catches codebase-wide issues ast-grep can't.",
      },
      {
        name: "radon",
        description: "Python maintainability and cyclomatic-complexity metrics.",
      },
      {
        name: "pyscn",
        description: "Python static analysis / best-practice scorer.",
      },
      {
        name: "cohesion",
        description: "Module coupling / cohesion measurement. A proxy for \"is this file doing too much?\"",
      },
      {
        name: "complexipy",
        description: "Cognitive-complexity scoring (sister tool to wily).",
      },
      {
        name: "import-linter",
        description: "Architectural layer enforcement. Catches drift as the agent refactors.",
      },
    ],
  },
  {
    id: "boards",
    title: "Boards / project management",
    blurb:
      "Kanban-driven development lives here. Stateless agents + stateful tickets. Klein/Kline is worth a look if you want a local view of agent activity.",
    items: [
      {
        name: "Jira",
        description: "Used in Buan's kanban-driven spike.",
        seenVia: "Buan Zich",
      },
      {
        name: "Asana",
        description:
          "Anthropic's Daisy used this in the original Claude Code plugin spike, per Boris Cherny on The Pragmatic Engineer.",
      },
      {
        name: "Linear",
        description: "Canonical board target for kanban-driven development via MCP.",
        seenVia: "Buan Zich",
      },
      {
        name: "Shortcut",
        description: "Mentioned as an alternative board target.",
      },
      {
        name: "Klein / Kline",
        description:
          "Claude Code–compatible local kanban tool that wraps Linear MCP and shows agent activity in real time.",
      },
    ],
  },
  {
    id: "plumbing",
    title: "Data / plumbing",
    blurb: "The cables. Not the star of any talk, but you'll want them by L4.",
    items: [
      {
        name: "Supabase",
        description: "Prototype database of choice.",
      },
      {
        name: "Anthropic Console / API",
        description: "For adding AI features directly to bespoke apps.",
      },
    ],
  },
  {
    id: "heritage",
    title: "Heritage tools being replaced",
    blurb:
      "Mark no longer uses any of these — he builds custom dashboards, and those will in turn be replaced by harness-as-UI.",
    items: [
      {
        name: "PowerBI",
        description: "Dashboard tool Mark migrated away from.",
        seenVia: "Mark Monfort",
      },
      {
        name: "Tableau",
        description: "Same trajectory.",
        seenVia: "Mark Monfort",
      },
      {
        name: "ClickView",
        description: "Same trajectory.",
        seenVia: "Mark Monfort",
      },
    ],
  },
  {
    id: "referenced",
    title: "Referenced but out-of-scope",
    blurb:
      "Name-checks worth knowing. Symphony in particular is the origin story for ghost libraries.",
    items: [
      {
        name: "OpenAI Codex",
        description:
          "Chose Elixir for Symphony. Referenced in the ghost-libraries discussion — a signal that AIs already pick stacks humans don't.",
      },
      {
        name: "OpenAI Symphony",
        description:
          "Single-prompt orchestration system; origin of the term \"ghost library.\" Rebuilds itself whenever a human would have intervened.",
      },
      {
        name: "Elixir / Erlang",
        description:
          "Symphony's implementation language. The actor model fits agent coordination naturally.",
      },
    ],
  },
];
