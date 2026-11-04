import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const width = Number(process.argv[2] || 390);
const selector = process.argv[3] || "#work";
const name = process.argv[4] || "section";

const browser = await Browser.launch();
const page = await browser.newPage({ width, height: 900, dsf: 2 });
await page.goto("http://localhost:5173/", { settleMs: 900 });
await page.eval(async () => {
  await document.fonts.ready;
  document.documentElement.style.scrollBehavior = "auto";
});
await page.eval(async () => {
  const step = Math.round(window.innerHeight * 0.5);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
});

const box = await page.eval((sel) => {
  const el = document.querySelector(sel);
  el.scrollIntoView({ block: "start" });
  return new Promise((done) => {
    setTimeout(() => {
      const b = el.getBoundingClientRect();
      done({ x: 0, y: window.scrollY + b.top, width: document.documentElement.clientWidth, height: b.height });
    }, 500);
  });
}, selector);

await page.screenshot({
  path: resolve(`.taste-skill/site/${name}-${width}.jpg`),
  format: "jpeg",
  quality: 86,
  clip: { x: box.x, y: box.y, width: box.width, height: box.height },
});
console.log("wrote", name, box);
await browser.close();
