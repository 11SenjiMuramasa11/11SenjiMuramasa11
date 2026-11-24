// Renders the README cards into assets/ with Playwright (npm run render).
// Each card is screenshotted at 2x with a transparent page, so rounded corners stay transparent,
// then palette-quantized with sharp to keep the PNGs small.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { cards as sections, ICONS, stats, DESC, QUOTE } from "./cards.mjs";

const src = dirname(fileURLToPath(import.meta.url));
const assets = resolve(src, "../assets");

// corner bracket from the portfolio's frame (App.jsx <Corners/>)
const CORNERS = ["tl", "tr", "bl", "br"]
  .map((c) => `<span class="corner ${c}"><svg viewBox="0 0 80 80" fill="none"><path d="M2 44V2h42M2 22h12M22 2v12" stroke="currentColor" stroke-width="1.6"/><path d="M10 10h14v14z" fill="currentColor" opacity=".35"/></svg></span>`)
  .join("");

const tpl = (name, vars) =>
  Object.entries({ CORNERS, ...vars }).reduce(
    (html, [k, v]) => html.replaceAll(`__${k}__`, v),
    readFileSync(resolve(src, name), "utf8"),
  );

const photo = `data:image/png;base64,${readFileSync(resolve(src, "me.png")).toString("base64")}`;

const cards = [
  ...sections.map((c) => ({
    out: `card-${c.slug}.png`, html: tpl("card.html", { BODY: c.body }), max: 450_000,
    fonts: ['800 32px "Nunito Sans"', '600 13px "Nunito Sans"', 'italic 400 15px "Nunito Sans"'],
  })),
  {
    out: "hero.png",
    html: tpl("hero.html", {
      PHOTO: photo, DESC, QUOTE,
      STATS: stats.map(([k, v]) => `<div class="stat"><span>${k}</span><b>${v}</b></div>`).join(""),
      I_GITHUB: ICONS.github, I_LINKEDIN: ICONS.linkedin, I_MAIL: ICONS.mail, I_FILE: ICONS.file,
    }),
    max: 600_000,
    fonts: ['900 96px "Archivo"', '800 18px "Nunito Sans"', '600 15px "Nunito Sans"', 'italic 400 12px "Nunito Sans"'],
  },
  ...[["portfolio", "Portfolio", "globe"], ["github", "GitHub", "github"], ["linkedin", "LinkedIn", "linkedin"], ["email", "Email", "mail"]].map(([slug, label, icon]) => ({
    out: `btn-${slug}.png`, html: tpl("button.html", { LABEL: label, ICON: ICONS[icon] }), max: 20_000, fonts: ['700 12px "Nunito Sans"'],
  })),
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1300, height: 800 } });
let failed = false;
try {
  for (const card of cards) {
    await page.setContent(card.html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // fail loudly instead of shipping a fallback font
    const missing = await page.evaluate(async (fs) => {
      await Promise.all(fs.map((f) => document.fonts.load(f))); // faces a card doesn't use are never fetched on their own
      return fs.filter((f) => !document.fonts.check(f));
    }, card.fonts);
    if (missing.length) throw new Error(`${card.out}: fonts not loaded: ${missing.join(", ")}`);
    await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));

    const raw = await page.locator(".card").screenshot({ omitBackground: true });
    const png = await sharp(raw).png({ palette: true, quality: 95, effort: 10, compressionLevel: 9 }).toBuffer();
    writeFileSync(resolve(assets, card.out), png);

    const { width, height } = await sharp(png).metadata();
    const ok = png.length <= card.max;
    failed ||= !ok;
    console.log(`${ok ? "ok  " : "OVER"} ${card.out.padEnd(28)} ${width}x${height}  ${(png.length / 1024).toFixed(1)} KB (max ${card.max / 1000} KB)`);
  }
} finally {
  await browser.close();
}
if (failed) process.exit(1);

// keep README's card block in sync with cards.mjs (alt text and links)
const readmePath = resolve(src, "../README.md");
const block = sections
  .map((c) => `<p align="center">\n  <a href="${c.href}"><img src="assets/card-${c.slug}.png" width="100%" alt="${c.alt.replaceAll('"', "&quot;")}" /></a>\n</p>`)
  .join("\n\n");
const readme = readFileSync(readmePath, "utf8");
if (!/<!-- cards:start -->[\s\S]*<!-- cards:end -->/.test(readme)) throw new Error("README.md is missing the <!-- cards:start --> / <!-- cards:end --> markers");
writeFileSync(readmePath, readme.replace(/<!-- cards:start -->[\s\S]*<!-- cards:end -->/, `<!-- cards:start -->\n${block}\n<!-- cards:end -->`));
console.log("README.md card block updated");
