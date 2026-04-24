import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "home" },
  { href: "/insights", label: "insights" },
  { href: "/drops", label: "drops" },
  { href: "/autonomy", label: "autonomy" },
  { href: "/speakers", label: "speakers" },
  { href: "/quotes", label: "quotes" },
  { href: "/tools", label: "tools" },
] as const;

export function SiteFooter() {
  return (
    <footer className="px-6 py-10 border-t border-border/40">
      <div className="max-w-3xl mx-auto flex flex-col gap-6 text-xs text-muted">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono">
            <span className="text-accent">claudecode</span>.studio
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left max-w-md">
            Made by someone who spent way too many late nights learning Claude
            Code — so you can skip the hard part.
          </div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
