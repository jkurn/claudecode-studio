"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "claudecode-studio:theme";

function apply(theme: Theme) {
  const html = document.documentElement;
  if (theme === "system") {
    html.removeAttribute("data-theme");
  } else {
    html.setAttribute("data-theme", theme);
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
      apply(stored);
    }
  }, []);

  const cycle = () => {
    const next: Theme =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    apply(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  // Render a stable placeholder until mounted to avoid hydration mismatch.
  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-block w-8 h-4 font-mono text-xs text-muted/40"
      />
    );
  }

  const label =
    theme === "system" ? "auto" : theme === "light" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      className="font-mono text-xs text-muted hover:text-accent transition-colors cursor-pointer"
    >
      theme · {label}
    </button>
  );
}
