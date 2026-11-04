import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const browser = await Browser.launch();

// menu open at 390
const page = await browser.newPage({ width: 390, height: 844, dsf: 2 });
await page.goto("http://localhost:4173/", { settleMs: 900 });
await page.eval(async () => {
  document.querySelector(".nav__toggle").click();
  await new Promise((r) => setTimeout(r, 700));
});
await page.screenshot({ path: resolve(".taste-skill/site/menu-390.jpg"), format: "jpeg", quality: 86 });
await page.close();

// reduced motion at 1440
const reduced = await browser.newPage({ width: 1440, height: 900, dsf: 1 });
await reduced.send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await reduced.goto("http://localhost:4173/", { settleMs: 900 });
const hidden = await reduced.eval(() => {
  const all = [...document.querySelectorAll(".section__head, .work__row, .stack__group, .timeline__item, .contact")];
  return all.filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length;
});
await reduced.screenshot({
  path: resolve(".taste-skill/site/reduced-fold.jpg"),
  format: "jpeg",
  quality: 86,
});
console.log("reduced hidden elements:", hidden);
await browser.close();
