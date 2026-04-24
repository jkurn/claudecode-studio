# Tools and tech mentioned

Everything named on the webinar. Grouped by function, one line on why
it matters, and which speaker used it.

## Coding surfaces

| Tool          | Notes                                                              | Speaker              |
|---------------|--------------------------------------------------------------------|----------------------|
| Claude Code   | Primary build tool for every speaker.                              | All                  |
| Claude Co-work| GUI harness for Claude Code. Low adoption — only ~15% of attendees raised hands at the Sydney event. | Stephen, hosts       |
| Claude Design | Web app for design work. Different pricing model.                  | Stephen              |
| Cursor        | IDE; mentioned as a stepping stone before Claude Code.             | Vanessa              |
| Antigravity   | Google's equivalent IDE tool.                                      | Aside                |
| Bolt          | Vibe-coding tool; pre–Claude Code.                                 | Mark                 |
| Lovable       | Vibe-coding entry point for non-technical users.                   | Vanessa              |

## MCP servers

| MCP          | Notes                                                                | Speaker   |
|--------------|----------------------------------------------------------------------|-----------|
| Figma MCP    | Read-only at time of talk. Connected from Claude Code.               | Vanessa   |
| PowerPoint MCP | Suggested as an alternative to Figma MCP.                          | Vanessa   |
| GitHub MCP   | Connect Claude Code to repos; interrogate code as a product person.  | Vanessa   |
| Linear MCP   | Drives the kanban-driven-development setup.                          | Buan      |

## Deterministic code checkers (Aidan's list)

| Tool           | Purpose                                                   |
|----------------|-----------------------------------------------------------|
| `ast-grep` (asg)| Syntax-tree pattern matching. YAML rule DSL.             |
| `semgrep`      | Semantic code analysis; YAML rules.                       |
| `radon`        | Python maintainability / cyclomatic complexity metrics.   |
| `pyscn`     | Python static analysis / best practices.                  |
| `cohesion`     | Module coupling / cohesion measurement.                   |
| `complexipy` / `wily` | Cognitive-complexity scoring.                      |
| `import-linter`| Architectural layer enforcement; catches drift.           |

## Boards / project management

| Tool             | Notes                                                                  |
|------------------|------------------------------------------------------------------------|
| Jira             | Used in Buan's spike.                                                  |
| Asana            | Used by Anthropic's Daisy in the original Claude Code plugin spike.    |
| Linear           | Canonical board for kanban-driven development via MCP.                 |
| Shortcut         | Mentioned as an alternative.                                           |
| Klein / Kline    | Claude Code competitor / local kanban tool that wraps Linear MCP; shows agent activity in real time. |

## Data / plumbing

| Tool               | Notes                                                        |
|--------------------|--------------------------------------------------------------|
| Supabase           | Prototype database.                                          |
| Anthropic Console / API | For adding AI features to bespoke apps.                 |

## Heritage tools being replaced

| Tool       | Replaced by                                                                  | Speaker |
|------------|------------------------------------------------------------------------------|---------|
| PowerBI    | Custom Claude-built dashboards; then superseded again by harness-as-UI.      | Mark    |
| Tableau    | Same trajectory.                                                             | Mark    |
| ClickView  | Same trajectory.                                                             | Mark    |

## Referenced but not used directly

| Thing         | Notes                                                               |
|---------------|---------------------------------------------------------------------|
| OpenAI Codex  | Chose Elixir for Symphony; referenced in ghost-library discussion.  |
| OpenAI Symphony | 2,000-line prompt orchestration system; origin of "ghost library" term. |
| Elixir / Erlang | Symphony's implementation language; actor model fits agent coordination. |

## Communities mentioned

| Community                         | Where                                                   |
|-----------------------------------|---------------------------------------------------------|
| Claude Community Australia        | Discord (moved from Metamos due to member limits).      |
| The Collab NZ                     | Adam Halt's WhatsApp community, 600+ members.           |
| Sydney Claude meetup              | Dominic Fretz.                                          |

## Live sites worth linking

| URL                         | What                                           |
|-----------------------------|------------------------------------------------|
| cyclone.thecollab.ai        | Adam's cyclone tracker, still live.            |
