import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const browser = await Browser.launch();
const page = await browser.newPage({ width: 390, height: 844, dsf: 1 });
const errors = [];
page.on?.("console", (msg) => {
  if (msg.type === "error") errors.push(msg.text);
});
await page.goto("http://localhost:4173/", { settleMs: 800 });

const widths = [320, 360, 390, 768, 1024, 1440];
const overflow = [];
for (const w of widths) {
  await page.setViewport?.({ width: w, height: 844 });
  await page.eval((width) => {
    return new Promise((done) => {
      setTimeout(() => {
        const doc = document.documentElement;
        done({
          width,
          scrollWidth: doc.scrollWidth,
          inner: window.innerWidth,
          overflow: doc.scrollWidth > window.innerWidth + 1,
        });
      }, 250);
    });
  }, w).then((r) => overflow.push(r));
}

await page.setViewport?.({ width: 390, height: 844 });
const menu = await page.eval(async () => {
  document.querySelector(".nav__toggle").click();
  await new Promise((r) => setTimeout(r, 500));
  const el = document.querySelector(".menu");
  const before = el ? el.getBoundingClientRect() : null;
  document.querySelector(".menu__link")?.click();
  await new Promise((r) => setTimeout(r, 500));
  return {
    opened: !!before && before.height > 600,
    closed: !document.querySelector(".menu"),
    bodyLocked: document.body.classList.contains("menu-open"),
  };
});

const work = await page.eval(async () => {
  const heads = [...document.querySelectorAll(".work__head")];
  const second = heads[1];
  second.click();
  await new Promise((r) => setTimeout(r, 600));
  const rows = [...document.querySelectorAll(".work__row")];
  return {
    expanded: second.getAttribute("aria-expanded"),
    bodies: document.querySelectorAll(".work__body").length,
    secondOpen: rows[1].classList.contains("is-open"),
  };
});

const copy = await page.eval(async () => {
  const btn = [...document.querySelectorAll(".contact__actions .btn")][0];
  btn.click();
  await new Promise((r) => setTimeout(r, 500));
  return {
    label: btn.textContent.trim(),
    status: document.querySelector(".sr-only[role=status]")?.textContent,
  };
});

const links = await page.eval(() =>
  [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
);

console.log(JSON.stringify({ overflow, menu, work, copy, links, errors }, null, 2));
await browser.close();
