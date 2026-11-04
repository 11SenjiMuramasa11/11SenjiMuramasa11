import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const browser = await Browser.launch();
const page = await browser.newPage({ width: 390, height: 900, dsf: 1 });
await page.goto("http://localhost:5173/", { settleMs: 900 });
await page.eval(async () => {
  await document.fonts.ready;
  document.documentElement.style.scrollBehavior = "auto";
  const step = 450;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  document.querySelector("#work").scrollIntoView({ block: "start" });
  await new Promise((r) => setTimeout(r, 900));
});
const info = await page.eval(() => {
  const rows = [...document.querySelectorAll(".work__row")];
  const list = (el) => {
    const b = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      y: Math.round(b.y),
      h: Math.round(b.height),
      opacity: cs.opacity,
      transform: cs.transform,
      display: cs.display,
      visibility: cs.visibility,
    };
  };
  return {
    scrollY: Math.round(window.scrollY),
    rows: rows.map(list),
    wraps: rows.map((r) => list(r.parentElement)),
    workHeight: Math.round(document.querySelector("#work").getBoundingClientRect().height),
    docHeight: document.documentElement.scrollHeight,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
