/**
 * check-links.mjs — checks every href in README.md returns 200.
 *
 * Usage: node check-links.mjs (from scripts/)
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const readme = readFileSync(resolve(__dir, "../README.md"), "utf8");

// Extract all http(s) links
const pattern = /https?:\/\/[^\s"')>\]]+/g;
const rawLinks = [...new Set(readme.match(pattern) || [])];
// Filter out image badges and raw.githubusercontent paths that are local assets
const links = rawLinks.filter(
  (l) =>
    !l.includes("img.shields.io") &&
    !l.includes("raw.githubusercontent.com") &&
    !l.includes("fonts.googleapis") &&
    !l.endsWith(".png") &&
    !l.endsWith(".jpg") &&
    !l.endsWith(".webp")
);

let pass = 0, fail = 0;

// relative image paths must exist in the repo
const { existsSync } = await import("node:fs");
for (const [, p] of readme.matchAll(/src="([^"h][^"]*)"/g)) {
  const ok = existsSync(resolve(__dir, "..", p));
  console.log(`  ${ok ? "✓" : "✗"}  file  ${p}`);
  ok ? pass++ : fail++;
}

// GitHub links any unwrapped image to its own blob page, so every <img> must sit inside an external or #anchor <a>
const unwrapped = [...readme.matchAll(/(<a\s[^>]*href="([^"]*)"[^>]*>\s*)?<img\s[^>]*src="([^"]+)"/g)]
  .filter(([, a, href]) => !a || !/^(https?:|mailto:|#)/.test(href))
  .map((m) => m[3]);
if (/!\[[^\]]*\]\(/.test(readme)) unwrapped.push("markdown ![]() image");
for (const s of unwrapped) console.log(`  ✗  not linked to an external page: ${s}`);
fail += unwrapped.length;
console.log(`  ${unwrapped.length ? "✗" : "✓"}  every image wrapped in an external link`);

console.log(`\nChecking ${links.length} links...\n`);

for (const url of links) {
  try {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), 10000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (link-checker)" },
    });
    clearTimeout(id);
    const ok = res.status >= 200 && res.status < 400;
    if (ok) {
      console.log(`  ✓  ${res.status}  ${url}`);
      pass++;
    } else {
      console.log(`  ✗  ${res.status}  ${url}`);
      fail++;
    }
  } catch (err) {
    console.log(`  ✗  ERR  ${url}  (${err.message})`);
    fail++;
  }
}

console.log(`\n${pass} passed, ${fail} failed.`);
if (fail > 0) process.exit(1);
