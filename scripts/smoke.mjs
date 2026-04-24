#!/usr/bin/env node
/*
 * Route smoke test. Starts from the assumption that the dev/prod server is
 * already running at BASE (defaults to http://localhost:3000). Fetches
 * every route we care about, asserts the expected status code, and logs
 * a one-line result per route. Exits non-zero if any route misbehaves.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.BASE || "http://localhost:3000";

/*
 * Keep the expected route list in sync with src/data/insights.ts and
 * src/data/drops.ts. We parse them at runtime so this script never drifts.
 */
const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

function extractSlugs(filePath) {
  const contents = readFileSync(filePath, "utf8");
  const matches = contents.matchAll(/slug:\s*"([^"]+)"/g);
  return [...matches].map((m) => m[1]);
}

const frameworkSlugs = extractSlugs(
  join(repoRoot, "src/data/insights.ts")
);
const dropSlugs = extractSlugs(join(repoRoot, "src/data/drops.ts"));

const routes = [
  { path: "/", expect: 200 },
  { path: "/insights", expect: 200 },
  { path: "/drops", expect: 200 },
  { path: "/autonomy", expect: 200 },
  { path: "/speakers", expect: 200 },
  { path: "/quotes", expect: 200 },
  { path: "/tools", expect: 200 },
  { path: "/sitemap.xml", expect: 200 },
  { path: "/robots.txt", expect: 200 },
  { path: "/this-route-does-not-exist", expect: 404 },
];

for (const slug of frameworkSlugs) {
  routes.push({ path: `/insights/${slug}`, expect: 200 });
}
for (const slug of dropSlugs) {
  routes.push({ path: `/drops/${slug}`, expect: 200 });
}

let failed = 0;

for (const route of routes) {
  let status = 0;
  try {
    const res = await fetch(`${BASE}${route.path}`, { redirect: "manual" });
    status = res.status;
  } catch (err) {
    console.error(`ERROR  ${route.path} — ${err?.message ?? err}`);
    failed++;
    continue;
  }

  const ok = status === route.expect;
  const label = ok ? "OK   " : "FAIL ";
  console.log(`${label} ${status}  ${route.path}`);
  if (!ok) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} route(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${routes.length} routes OK.`);
