// Renders README.md roughly as GitHub does (GFM + github-markdown-css, 888px content width)
// on the light and dark themes, and writes preview/readme-{light,dark}.png (npm run preview).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";
import { chromium } from "playwright";

const src = dirname(fileURLToPath(import.meta.url));
const root = resolve(src, "..");
const outDir = resolve(root, "preview");
mkdirSync(outDir, { recursive: true });

const body = marked.parse(readFileSync(resolve(root, "README.md"), "utf8"), { gfm: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 888 + 2 * 32, height: 900 }, deviceScaleFactor: 1 });
for (const theme of ["light", "dark"]) {
  const css = readFileSync(resolve(src, `vendor/github-markdown-${theme}.css`), "utf8");
  // <base> resolves the README's relative assets/ paths like GitHub does
  // file:// images only load from a file:// page, so write the HTML next to the screenshots
  const file = resolve(outDir, `readme-${theme}.html`);
  writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><base href="${pathToFileURL(root).href}/">
    <style>${css} body{margin:0;background:${theme === "dark" ? "#0d1117" : "#ffffff"}} .markdown-body{box-sizing:border-box;width:${888 + 64}px;padding:32px}</style>
    </head><body><article class="markdown-body">${body}</article></body></html>`);
  await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src")));
  if (broken.length) throw new Error(`broken images: ${broken.join(", ")}`);
  await page.screenshot({ path: resolve(outDir, `readme-${theme}.png`), fullPage: true });
  console.log(`preview/readme-${theme}.png`);
}
await browser.close();
