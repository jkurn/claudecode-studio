import { SPEAKERS, type Speaker } from "./insights";

export type Quote = {
  text: string;
  speaker: Speaker;
};

/*
 * Pulled from the 2026-04-22 Claude Community Australia webinar.
 * Sorted by speaker. Mirrors docs/insights/.../quotes.md.
 */
export const QUOTES: Quote[] = [
  { speaker: SPEAKERS.mark, text: "AI doesn't fail loudly, it fails convincingly." },
  {
    speaker: SPEAKERS.mark,
    text: "Agents but no tools, no data — you're very limited. Tools but no data and agents — you're slower. Data alone is where we were a few years ago. Bringing all three together is what leads to the ability to create.",
  },

  {
    speaker: SPEAKERS.stephen,
    text: "The value is going to creep up into the harness and into the context layer.",
  },
  { speaker: SPEAKERS.stephen, text: "Taste and judgment are the two things I'm most focused on." },
  {
    speaker: SPEAKERS.stephen,
    text: "Each dot here represents 3.2 million people. The vast majority have never used AI. Don't stress.",
  },
  {
    speaker: SPEAKERS.stephen,
    text: "The days of building dashboards being the thing clients are looking for are going to decrease.",
  },

  { speaker: SPEAKERS.nick, text: "The prompt IS the library." },
  {
    speaker: SPEAKERS.nick,
    text: "Instead of shipping the software, you ship the prompt, and then the agent builds in the environment in which you're going to run.",
  },
  {
    speaker: SPEAKERS.nick,
    text: "You're completely on your own. No one else has ever run the code you're running. All the bugs are yours.",
  },
  { speaker: SPEAKERS.nick, text: "My pronouns are I, Claudius." },

  { speaker: SPEAKERS.aiden, text: "We need to engineer the systems that engineer our systems." },
  {
    speaker: SPEAKERS.aiden,
    text: "You as a human — you're not needed in this loop. You're too slow.",
  },
  {
    speaker: SPEAKERS.aiden,
    text: "Back pressure is binary. It's either working the way I want it to, or it's not.",
  },
  {
    speaker: SPEAKERS.aiden,
    text: "Using non-deterministic systems to evaluate non-deterministic output is actually the mathematical definition of chaos.",
  },
  {
    speaker: SPEAKERS.aiden,
    text: "If the tools don't exist to do the thing you want, you can vibe code a tool and then use the tool.",
  },
  {
    speaker: SPEAKERS.aiden,
    text: "If it starts going the way you don't want, step back and rethink your guardrails. What's in your CLAUDE.md? What are your skill definitions? What hooks do you have?",
  },

  {
    speaker: SPEAKERS.buan,
    text: "The board is the brain and context is the real product.",
  },
  {
    speaker: SPEAKERS.buan,
    text: "Stateless agents with stateful tickets always beat one long-running session.",
  },
  {
    speaker: SPEAKERS.buan,
    text: "Smaller context windows equal better accuracy. Small context wins all the time.",
  },
  {
    speaker: SPEAKERS.buan,
    text: "Story points became the shared language between PM, Dev, and Claude. I could measure actual velocity through my agent's execution.",
  },
  { speaker: SPEAKERS.buan, text: "Good PMs don't just prioritise, they contribute." },

  {
    speaker: SPEAKERS.vanessa,
    text: "In the future everyone will have their own personal MD file. Within organizations, delivery will have an MD file, sales will have an MD file.",
  },

  { speaker: SPEAKERS.adam, text: "I don't write the code anymore. So why should I be so biased?" },
  { speaker: SPEAKERS.adam, text: "It's like range anxiety but token anxiety." },
  { speaker: SPEAKERS.adam, text: "Just go build stuff. Have an idea, try the tools." },
];
