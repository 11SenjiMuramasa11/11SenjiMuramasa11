import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const browser = await Browser.launch();
const page = await browser.newPage({ width: 390, height: 844, dsf: 1 });
await page.goto("http://localhost:5173/", { settleMs: 800 });
const result = await page.eval(() => {
  const q = (s) => document.querySelector(s);
  const r = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return {
      x: Math.round(b.x),
      y: Math.round(b.y),
      w: Math.round(b.width),
      h: Math.round(b.height),
    };
  };
  const meta = q(".hero__meta");
  const inner = q(".hero__inner");
  const port = q(".hero__portrait");
  const wrap = port?.parentElement?.parentElement;
  return {
    width: innerWidth,
    meta: { pos: getComputedStyle(meta).position, rect: r(meta) },
    inner: { cols: getComputedStyle(inner).gridTemplateColumns, rect: r(inner) },
    portrait: { rect: r(port), order: getComputedStyle(port).order },
    wrapper: { order: getComputedStyle(wrap).order, rect: r(wrap) },
    hero: r(q(".hero")),
    nameFont: getComputedStyle(q(".hero__name")).fontSize,
    introW: r(q(".hero__intro")),
    docHeight: document.documentElement.scrollHeight,
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
