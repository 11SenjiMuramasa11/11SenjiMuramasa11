import { writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const sections = [
  { slug: "about", num: "01", title: "About" },
  { slug: "work", num: "02", title: "Selected work" },
  { slug: "stack", num: "03", title: "Stack" },
  { slug: "background", num: "04", title: "Background" },
  { slug: "contact", num: "05", title: "Contact" },
];

const shared = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1000px; overflow: hidden; }
  .band {
    position: relative;
    width: 1000px;
    display: flex; align-items: center;
    padding: 0 54px;
    background:
      radial-gradient(70% 160% at 82% 20%, rgba(38, 74, 134, .5) 0%, transparent 64%),
      linear-gradient(96deg, #081226 0%, #0b1a38 46%, #0a1730 100%);
    font-family: "Nunito Sans", "Segoe UI", sans-serif;
    color: #f7efdf;
  }
  .band::before, .band::after {
    content: ""; position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200, 164, 91, .42) 18%, rgba(200, 164, 91, .42) 82%, transparent);
  }
  .band::before { top: 0; }
  .band::after { bottom: 0; }
`;

const page = (s) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
  ${shared}
  html, body { height: 96px; }
  .band { height: 96px; }

  .num {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 30px; font-weight: 500;
    color: #c8a45b; letter-spacing: .02em;
    margin-right: 20px;
  }
  .rule {
    width: 44px; height: 1px; margin-right: 22px;
    background: linear-gradient(90deg, rgba(200, 164, 91, .15), rgba(200, 164, 91, .8));
  }
  h2 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 46px; font-weight: 600; line-height: 1;
    letter-spacing: -.005em; color: #fdf6e6;
  }
  .orn {
    margin-left: auto;
    display: flex; align-items: center; gap: 9px;
  }
  .orn .lead {
    width: 96px; height: 1px; margin-right: 5px;
    background: linear-gradient(90deg, transparent, rgba(200, 164, 91, .5));
  }
  .orn i {
    width: 4px; height: 4px;
    background: #c8a45b; transform: rotate(45deg);
  }
  .orn i:nth-child(2) { width: 6px; height: 6px; opacity: .9; }
  .orn i:nth-child(4) { opacity: .55; }
  .orn i:nth-child(5) { opacity: .3; }
</style></head>
<body>
  <div class="band">
    <span class="num">${s.num}</span>
    <span class="rule"></span>
    <h2>${s.title}</h2>
    <span class="orn"><span class="lead"></span><i></i><i></i><i></i></span>
  </div>
</body></html>`;

const footerPage = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Nunito+Sans:wght@600&display=swap" rel="stylesheet" />
<style>
  ${shared}
  html, body { height: 112px; }
  .band { height: 112px; justify-content: center; }
  .mark {
    display: flex; align-items: center; gap: 22px;
  }
  .mark .line {
    width: 130px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200, 164, 91, .6));
  }
  .mark .line.right {
    background: linear-gradient(90deg, rgba(200, 164, 91, .6), transparent);
  }
  .mark h2 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 30px; font-weight: 600;
    letter-spacing: .3em; text-indent: .3em;
    line-height: 1; color: #e7d19a;
  }
  .mark i {
    width: 4px; height: 4px; background: #c8a45b;
    transform: rotate(45deg); opacity: .8;
  }
</style></head>
<body>
  <div class="band">
    <div class="mark">
      <span class="line"></span>
      <i></i>
      <h2>Muramasa</h2>
      <i></i>
      <span class="line right"></span>
    </div>
  </div>
</body></html>`;

mkdirSync(resolve("github-profile/src/tmp"), { recursive: true });
const browser = await Browser.launch();

const render = async (name, html, height) => {
  const htmlPath = resolve(`github-profile/src/tmp/${name}.html`);
  writeFileSync(htmlPath, html, "utf8");
  const p = await browser.newPage({ width: 1000, height, dsf: 2 });
  await p.goto(pathToFileURL(htmlPath).href, { settleMs: 700 });
  await p.eval(async () => {
    await document.fonts.ready;
  });
  await p.screenshot({
    path: resolve(`github-profile/sec-${name}.jpg`),
    format: "jpeg",
    quality: 92,
    clip: { x: 0, y: 0, width: 1000, height },
  });
  await p.close();
  console.log("wrote sec-" + name + ".jpg");
};

try {
  for (const s of sections) {
    await render(s.slug, page(s), 96);
  }
  await render("end", footerPage, 112);
} finally {
  await browser.close();
}
