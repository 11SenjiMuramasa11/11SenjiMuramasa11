// Renders the README cards into assets/ with Playwright (npm run render).
// Each card is screenshotted at 2x with a transparent page, so rounded corners stay transparent,
// then palette-quantized with sharp to keep the PNGs small.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { cards as sections, ICONS, SITE } from "./cards.mjs";

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
    html: tpl("hero.html", { PHOTO: photo, I_GITHUB: ICONS.github, I_LINKEDIN: ICONS.linkedin, I_MAIL: ICONS.mail, I_FILE: ICONS.file }),
    max: 600_000,
    fonts: ['900 132px "Archivo"', '700 12px "Nunito Sans"', '600 12px "Nunito Sans"'],
  },
  ...[["portfolio", "Portfolio", "globe"], ["github", "GitHub", "github"], ["linkedin", "LinkedIn", "linkedin"], ["email", "Email", "mail"]].map(([slug, label, icon]) => ({
    out: `btn-${slug}.png`, html: tpl("button.html", { LABEL: label, ICON: ICONS[icon] }), max: 20_000, fonts: ['700 12px "Nunito Sans"'],
  })),
];

// nav bar items: [slice id, label, README anchor]
const NAV = [["about", "About"], ["projects", "Projects"], ["stack", "Stack"], ["certifications", "Certifications"], ["contact", "Contact"]];
const navHtml = tpl("nav.html", { ITEMS: NAV.map(([id, label]) => `<div class="item" data-slice="${id}"><i></i>${label}</div>`).join("") });

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1300, height: 800 } });
let failed = false;
let navSlices = [];
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

  // nav: screenshot the whole bar once, then cut it at the item edges
  await page.setContent(navHtml, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  if (!(await page.evaluate(() => document.fonts.check('800 17px "Nunito Sans"')))) throw new Error("nav: Nunito Sans not loaded");
  const rects = await page.evaluate(() => {
    const card = document.querySelector(".card").getBoundingClientRect();
    return [...document.querySelectorAll("[data-slice]")].map((el) => {
      const r = el.getBoundingClientRect();
      return { id: el.dataset.slice, x: r.left - card.left, w: r.width, total: card.width };
    });
  });
  rects[0].w += rects[0].x; rects[0].x = 0; // first slice starts at the bar's left edge
  const last = rects.at(-1); last.w = last.total - last.x; // last slice runs to the right edge
  const bar = await page.locator(".card").screenshot({ omitBackground: true });
  const { width: bw, height: bh } = await sharp(bar).metadata();
  const scale = bw / rects[0].total;
  let left = 0;
  navSlices = rects.map((r, i) => {
    const x = Math.round(r.x * scale), w = i === rects.length - 1 ? bw - x : Math.round((r.x + r.w) * scale) - x;
    left += w;
    return { ...r, px: [x, w] };
  });
  if (left !== bw) throw new Error(`nav slices cover ${left}px of ${bw}px`);
  for (const sl of navSlices) {
    const png = await sharp(bar).extract({ left: sl.px[0], top: 0, width: sl.px[1], height: bh }).png({ palette: true, quality: 95, effort: 10 }).toBuffer();
    writeFileSync(resolve(assets, `nav-${sl.id}.png`), png);
  }
  console.log(`ok   nav bar cut into ${navSlices.length} slices (${bw}x${bh})`);
} finally {
  await browser.close();
}
if (failed) process.exit(1);

// keep README's nav and card blocks in sync with cards.mjs (anchors, alt text and links)
const readmePath = resolve(src, "../README.md");
let readme = readFileSync(readmePath, "utf8");
const swap = (name, body) => {
  const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*<!-- ${name}:end -->`);
  if (!re.test(readme)) throw new Error(`README.md is missing the <!-- ${name}:start --> / <!-- ${name}:end --> markers`);
  readme = readme.replace(re, () => `<!-- ${name}:start -->\n${body}\n<!-- ${name}:end -->`);
};
// widths in % so the bar scales as one piece; no whitespace between links, or GitHub puts gaps between the slices
const navWidth = navSlices.reduce((a, sl) => a + sl.px[1], 0);
const pct = navSlices.map((sl) => +(sl.px[1] / navWidth * 100).toFixed(3));
pct[pct.length - 1] = +(100 - pct.slice(0, -1).reduce((a, b) => a + b, 0)).toFixed(3);
const label = Object.fromEntries([["brand", "Justine James Prades"], ...NAV]);
swap("nav", `<p align="center">${navSlices.map((sl, i) => `<a href="${sl.id === "brand" ? SITE : `#${sl.id}`}"><img src="assets/nav-${sl.id}.png" width="${pct[i]}%" alt="${label[sl.id]}" /></a>`).join("")}</p>`);
swap("cards", sections
  .map((c) => `<a id="${c.anchor}"></a>\n<p align="center">\n  <a href="${c.href}"><img src="assets/card-${c.slug}.png" width="100%" alt="${c.alt.replaceAll('"', "&quot;")}" /></a>\n</p>`)
  .join("\n\n"));
writeFileSync(readmePath, readme);
console.log("README.md nav and card blocks updated");
