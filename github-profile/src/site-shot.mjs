import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const width = Number(process.argv[2] || 1440);
const out = process.argv[3] || `.taste-skill/site/full-${width}`;
const url = process.argv[4] || "http://localhost:5173/";
mkdirSync(resolve(".taste-skill/site"), { recursive: true });

const browser = await Browser.launch();
const page = await browser.newPage({ width, height: 900, dsf: 1 });
await page.goto("http://localhost:5173/", { settleMs: 1200 });
await page.eval(async () => {
  await document.fonts.ready;
  document.documentElement.style.scrollBehavior = "auto";
});
await page.eval(async () => {
  const step = Math.round(window.innerHeight * 0.6);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 260));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
});
await page.screenshot({ path: resolve(`${out}.jpg`), format: "jpeg", quality: 80, fullPage: true });
console.log("wrote", out);
await browser.close();
