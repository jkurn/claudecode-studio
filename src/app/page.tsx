"use client";

import { useState, useRef } from "react";

/* ─────────────────────── DATA ─────────────────────── */

const LEVELS = [
  {
    id: 1,
    name: "Prompter",
    tag: "L1",
    color: "#87867f",
    description: "You talk to Claude Code like a search engine.",
    unlock: "Where 60% of users start.",
    percent: 20,
  },
  {
    id: 2,
    name: "Operator",
    tag: "L2",
    color: "#3a5878",
    description: "Files, data, docs. Useful, but manual.",
    unlock: "Average time here: 2 weeks.",
    percent: 40,
  },
  {
    id: 3,
    name: "Builder",
    tag: "L3",
    color: "#8b5cf6",
    description: "Shipping code. Git, tests, PRs. This is where it clicks.",
    unlock: "The level where users report 3x output.",
    percent: 60,
  },
  {
    id: 4,
    name: "Automator",
    tag: "L4",
    color: "#d97757",
    description: "Custom skills, hooks, MCP. Workflows that run without you.",
    unlock: "12% of users reach this in month one.",
    percent: 80,
  },
  {
    id: 5,
    name: "Orchestrator",
    tag: "L5",
    color: "#c6613f",
    description: "Multi-agent, CI/CD, observability. Claude Code is your team.",
    unlock: "The top 4%. They don't go back.",
    percent: 100,
  },
];

const QUESTIONS = [
  {
    question: "You just opened Claude Code. What's your first move?",
    options: [
      { text: "Ask it a question and read what comes back", score: 1 },
      { text: "Point it at some files and tell it what to do", score: 2 },
      { text: "Describe what I'm building and start coding", score: 3 },
      { text: "Kick off a skill or trigger something I've set up", score: 4 },
    ],
  },
  {
    question: "You've got a task with five or six steps. How do you handle it?",
    options: [
      { text: "One step at a time, copy-pasting between prompts", score: 1 },
      { text: "Describe the whole thing in one go and see what happens", score: 2 },
      { text: "I've got CLAUDE.md set up to chain things together", score: 3 },
      { text: "I built a skill that handles multi-step flows on its own", score: 4 },
    ],
  },
  {
    question: "What's your deal with CLAUDE.md?",
    options: [
      { text: "Never heard of it", score: 1 },
      { text: "I know it exists but haven't really touched it", score: 2 },
      { text: "I maintain one for each project with specific instructions", score: 3 },
      { text: "It's basically my operating system at this point", score: 4 },
    ],
  },
  {
    question: "Have you ever installed or built a custom skill?",
    options: [
      { text: "Wait, what are skills?", score: 1 },
      { text: "I've heard people talk about them but never tried", score: 2 },
      { text: "Yeah, I've installed a few that people recommended", score: 3 },
      { text: "I build my own and I've got 10+ running", score: 4 },
    ],
  },
  {
    question: "How does Claude Code talk to your other tools?",
    options: [
      { text: "It doesn't — I just type and read", score: 1 },
      { text: "Sometimes I ask it to read files or run a command", score: 2 },
      { text: "I've connected it to APIs, databases, git workflows", score: 3 },
      { text: "MCP servers, webhooks, multi-agent orchestration — the works", score: 4 },
    ],
  },
  {
    question: "Something broke. What do you do?",
    options: [
      { text: "Close everything and start over", score: 1 },
      { text: "Rephrase and try again", score: 2 },
      { text: "Use Claude Code's own tools to debug it (Read, Grep, Bash)", score: 3 },
      { text: "Check the logs, trace the agent's decisions, patch the skill", score: 4 },
    ],
  },
  {
    question: "Does Claude Code ever do things without you asking?",
    options: [
      { text: "No — it just sits there until I type", score: 1 },
      { text: "Maybe a suggestion here and there", score: 2 },
      { text: "Yeah, I've got hooks that fire on certain events", score: 3 },
      { text: "All the time — scheduled tasks, watchers, autonomous flows", score: 4 },
    ],
  },
];

function getLevel(totalScore: number): (typeof LEVELS)[number] {
  const avg = totalScore / QUESTIONS.length;
  if (avg <= 1.3) return LEVELS[0];
  if (avg <= 2.0) return LEVELS[1];
  if (avg <= 2.8) return LEVELS[2];
  if (avg <= 3.5) return LEVELS[3];
  return LEVELS[4];
}

/* ─────────────────────── COMPONENTS ─────────────────────── */

function TerminalPrompt({ text }: { text: string }) {
  return (
    <div className="font-mono text-sm text-muted flex items-center justify-center gap-2">
      <span className="text-accent">$</span>
      <span>{text}</span>
      <span className="cursor-blink text-accent">▊</span>
    </div>
  );
}

function LevelCard({
  level,
}: {
  level: (typeof LEVELS)[number];
}) {
  return (
    <div
      className="border border-border/60 rounded-xl p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface-hover bg-white"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
            style={{ backgroundColor: `${level.color}15`, color: level.color }}
          >
            {level.tag}
          </span>
          <h3 className="font-semibold text-lg">{level.name}</h3>
        </div>
      </div>
      <p className="text-muted text-[15px] leading-relaxed mb-4">{level.description}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full level-bar"
            style={
              {
                "--bar-width": `${level.percent}%`,
                backgroundColor: level.color,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
      <p className="text-xs text-muted mt-3 font-mono">
        <span style={{ color: level.color }}>→</span> {level.unlock}
      </p>
    </div>
  );
}

/* ─────────────────────── QUIZ ─────────────────────── */

function Quiz({ onComplete }: { onComplete: (level: (typeof LEVELS)[number]) => void }) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      const total = newScores.reduce((a, b) => a + b, 0);
      onComplete(getLevel(total));
    }
  };

  const q = QUESTIONS[current];
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted mb-2 font-mono">
          <span>
            Question {current + 1}/{QUESTIONS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full progress-bar transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold mb-6 fade-in-up" key={current}>
        {q.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={`${current}-${i}`}
            onClick={() => handleAnswer(opt.score)}
            className="fade-in-up w-full text-left p-4 border border-border/60 rounded-xl bg-white
                       hover:border-accent/60 hover:bg-surface-hover transition-all duration-200
                       font-mono text-sm group cursor-pointer"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-muted group-hover:text-accent transition-colors mr-3">
              {String.fromCharCode(65 + i)}.
            </span>
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── RESULT ─────────────────────── */

function Result({ level }: { level: (typeof LEVELS)[number] }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service (ConvertKit/Buttondown/Resend)
    setSubmitted(true);
  };

  const currentIndex = LEVELS.findIndex((l) => l.id === level.id);

  return (
    <div className="max-w-2xl mx-auto fade-in-up">
      {/* Level result */}
      <div className="text-center mb-10">
        <div className="font-mono text-sm text-muted mb-4">Your Claude Code fluency level:</div>
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border mb-4 bg-white"
          style={{
            borderColor: level.color,
            backgroundColor: `${level.color}08`,
          }}
        >
          <span
            className="font-mono text-sm font-bold px-2.5 py-1 rounded-md"
            style={{ backgroundColor: `${level.color}20`, color: level.color }}
          >
            {level.tag}
          </span>
          <span className="text-2xl font-bold">{level.name}</span>
        </div>
        <p className="text-muted mt-4 max-w-md mx-auto text-[15px]">{level.description}</p>
      </div>

      {/* What's next */}
      <div className="border border-border/60 rounded-xl p-6 mb-8 bg-white">
        <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-muted font-mono">
          Your path forward
        </h4>
        <div className="space-y-3">
          {LEVELS.map((l, i) => (
            <div key={l.id} className="flex items-center gap-3">
              <span
                className="font-mono text-xs font-bold w-8 text-center"
                style={{ color: i <= currentIndex ? l.color : "#ccc" }}
              >
                {l.tag}
              </span>
              <div className="flex-1 h-2 bg-border/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: i <= currentIndex ? "100%" : "0%",
                    backgroundColor: l.color,
                  }}
                />
              </div>
              <span
                className="text-xs w-24"
                style={{ color: i <= currentIndex ? l.color : "#ccc" }}
              >
                {l.name}
              </span>
              {i === currentIndex && (
                <span className="text-xs text-accent font-mono">← you</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Email capture */}
      <div className="border border-accent/30 rounded-xl p-6 bg-accent/5">
        {submitted ? (
          <div className="text-center">
            <div className="text-accent text-2xl mb-2">✓</div>
            <p className="font-semibold">You&apos;re in.</p>
            <p className="text-muted text-sm mt-1">
              Week 1 lands soon. One use case, one skill, one challenge.
            </p>
          </div>
        ) : (
          <>
            <h4 className="font-semibold mb-2">
              Go from {level.name} to the next level — one week at a time
            </h4>
            <p className="text-muted text-[15px] mb-4">
              Every week we send you one use case matched to your level, one skill to install,
              and one small challenge. No filler. No link dumps. Just the next thing you actually need.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white border border-border/60 rounded-xl px-4 py-2.5
                           text-sm font-mono placeholder:text-muted/50
                           focus:outline-none focus:border-accent/60 transition-colors"
              />
              <button
                type="submit"
                className="bg-accent text-white font-semibold px-6 py-2.5 rounded-xl
                           text-sm hover:bg-accent-dim transition-colors cursor-pointer whitespace-nowrap"
              >
                Count me in
              </button>
            </form>
          </>
        )}
      </div>

      {/* Retake */}
      <div className="text-center mt-6">
        <button
          onClick={() => window.location.reload()}
          className="text-muted text-xs font-mono hover:text-accent transition-colors cursor-pointer"
        >
          ← take it again
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [result, setResult] = useState<(typeof LEVELS)[number] | null>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    setQuizStarted(true);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative px-6 pt-24 pb-28 overflow-hidden">
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="fade-in-up">
            <TerminalPrompt text="claude --fluency" />
          </div>

          <h1
            className="fade-in-up mt-8 mb-6 tracking-tight leading-[1.1]"
            style={{ animationDelay: "150ms", fontSize: "64px", fontWeight: 700 }}
          >
            Claude Code has 50+ features.
            <br />
            <span className="text-accent">You&apos;re using 5.</span>
          </h1>

          <p
            className="fade-in-up text-muted max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ animationDelay: "300ms", fontSize: "24px", fontWeight: 400 }}
          >
            Every week you spend cobbling together tips from Twitter threads, someone with the same tool is automating their entire workflow. The difference is sequence, not skill.
          </p>

          <div className="fade-in-up" style={{ animationDelay: "450ms" }}>
            <button
              onClick={scrollToQuiz}
              className="bg-accent text-white px-8 py-3.5 rounded-xl
                         hover:bg-accent-dim transition-colors cursor-pointer
                         shadow-[0_2px_12px_rgba(217,119,87,0.25)]"
              style={{ fontSize: "16px", fontWeight: 400 }}
            >
              Find your level →
            </button>
            <p className="text-muted text-xs mt-4 font-mono">
              7 questions · 2 minutes · no signup needed
            </p>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="px-6 py-12 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="font-mono text-accent text-lg">1,000+</span>
              <span>builders in the community</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/40" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-accent text-lg">100+</span>
              <span>documented use cases</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/40" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-accent text-lg">30+</span>
              <span>curated skills</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MATURITY FRAMEWORK ─── */}
      <section className="px-6 py-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: "36px", fontWeight: 700 }} className="mb-4">
              Five levels. One clear path.
            </h2>
            <p className="text-muted max-w-lg mx-auto" style={{ fontSize: "18px" }}>
              Most people get stuck at L1 or L2 — not because they can&apos;t go further, but because
              nobody showed them what&apos;s next.
            </p>
          </div>

          <div className="space-y-4">
            {LEVELS.map((level) => (
              <LevelCard key={level.id} level={level} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="px-6 py-20 border-t border-border/40 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: "36px", fontWeight: 700 }} className="mb-4">Here&apos;s how it works</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "2-minute diagnostic",
                desc: "Answer 7 questions. Get your level, your gaps, and the exact skill that unlocks the next one.",
              },
              {
                step: "02",
                title: "One project per week, matched to you",
                desc: "L2 gets a file automation challenge. L4 gets a custom MCP server build. Every drop is a thing you ship, not a thing you watch.",
              },
              {
                step: "03",
                title: "Level up or get stuck — your call",
                desc: "Builders who started at L1 in January are running multi-agent CI/CD pipelines now. The quiz score moves because the work is real.",
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="font-mono text-accent text-xs mb-3">{item.step}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600 }} className="mb-2">{item.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="px-6 py-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-12">
            <div>
              <h3 className="font-mono text-xs mb-4 uppercase tracking-wider" style={{ fontSize: "12px", fontWeight: 500, color: "#c6613f" }}>
                Sound familiar?
              </h3>
              <ul className="space-y-3 text-muted" style={{ fontSize: "15px" }}>
                {[
                  "Bookmarking 20 Claude Code tweets a week",
                  "Binge-watching tutorials you forget by morning",
                  "Staying late at meetups trying to absorb everything",
                  "That weird mix of excitement and dread about what's changing",
                  "Knowing you should be further along but not sure how",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-accent-dim/60 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs text-accent mb-4 uppercase tracking-wider" style={{ fontSize: "12px", fontWeight: 500 }}>
                What changes
              </h3>
              <ul className="space-y-3 text-muted" style={{ fontSize: "15px" }}>
                {[
                  "L1 → L2: You stop copy-pasting commands from Twitter threads. You have a workflow.",
                  "L2 → L3: You stop context-switching to your IDE. Claude Code ships the PR.",
                  "L3 → L4: You stop repeating yourself. Your hooks and skills do the repeating.",
                  "L4 → L5: You stop being the bottleneck. Three agents run while you're in the shower.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-muted mt-4" style={{ fontSize: "15px" }}>
                Each level unlocks in ~1 week. You&apos;ll know you&apos;re there because the thing that used to take 40 minutes takes 4.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUIZ / RESULT ─── */}
      <section ref={quizRef} className="px-6 py-20 border-t border-border/40 bg-surface">
        <div className="max-w-3xl mx-auto">
          {!quizStarted ? (
            <div className="text-center">
              <h2 style={{ fontSize: "36px", fontWeight: 700 }} className="mb-4">Ready?</h2>
              <p className="text-muted mb-8" style={{ fontSize: "18px" }}>
                Every week you stay at your current level, someone with half your talent ships twice as much. Seven questions. Two minutes. No signup.
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="bg-accent text-white px-8 py-3.5 rounded-xl
                           hover:bg-accent-dim transition-colors cursor-pointer"
                style={{ fontSize: "16px", fontWeight: 400 }}
              >
                Let&apos;s go →
              </button>
            </div>
          ) : result ? (
            <Result level={result} />
          ) : (
            <Quiz onComplete={setResult} />
          )}
        </div>
      </section>

      {/* ─── RECOMMENDED READING ─── */}
      <section className="px-6 py-20 border-t border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontSize: "36px", fontWeight: 700 }} className="mb-4">
              While you&apos;re here
            </h2>
            <p className="text-muted max-w-lg mx-auto" style={{ fontSize: "18px" }}>
              A curated list of 15 free guides covering Claude, Claude Code, Skills, and
              more — worth the bookmark.
            </p>
          </div>

          <a
            href="https://x.com/i/status/2045381817294008383"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-border/60 rounded-xl p-6 bg-white
                       hover:border-accent/40 hover:bg-surface-hover transition-all duration-200"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent">
                𝕏
              </span>
              <div className="flex-1">
                <div className="font-mono text-xs text-muted mb-1">via @rubenhssd on X</div>
                <div className="font-semibold">
                  Stop bookmarking 50 guides you&apos;ll never read.
                </div>
              </div>
            </div>
            <p className="text-muted text-[15px] leading-relaxed mb-4">
              15 free guides to skip the noise — including{" "}
              <span className="font-mono text-accent">claudecode.free</span> for Claude Code,{" "}
              <span className="font-mono text-accent">claude-skills.free</span> for Skills, and{" "}
              <span className="font-mono text-accent">claude-co.work</span> for Cowork setup.
            </p>
            <div className="font-mono text-xs text-accent">
              Read the thread →
            </div>
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 border-t border-border/40">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="font-mono">
            <span className="text-accent">claudecode</span>.studio
          </div>
          <div>
            Made by someone who spent way too many late nights learning Claude Code — so you can skip the hard part.
          </div>
        </div>
      </footer>
    </main>
  );
}
