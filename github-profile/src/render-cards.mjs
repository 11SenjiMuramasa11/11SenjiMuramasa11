import { writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const sections = [
  { slug: "about", num: "01", label: "About", title: "About.", sub: "Student, builder, tester." },
  { slug: "work", num: "02", label: "Selected work", title: "Selected work.", sub: "Four projects, two of them team efforts." },
  { slug: "stack", num: "03", label: "Stack", title: "Stack.", sub: "What I build with, and what I test with." },
  { slug: "background", num: "04", label: "Background", title: "Background.", sub: "School, certifications, and the paper trail." },
  { slug: "contact", num: "05", label: "Contact", title: "Contact.", sub: "Open to internships and collaborations." },
];

const shared = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1000px; overflow: hidden; background: #071023; }
  .card {
    position: relative;
    width: 1000px;
    display: block;
    overflow: hidden;
    background:
      radial-gradient(80% 150% at 86% 0%, rgba(40, 78, 140, .5) 0%, transparent 62%),
      radial-gradient(70% 120% at 4% 100%, rgba(18, 38, 77, .85) 0%, transparent 60%),
      linear-gradient(100deg, #071023 0%, #0a1730 52%, #081326 100%);
    font-family: "Nunito Sans", "Segoe UI", sans-serif;
    color: #f7efdf;
  }
  .card::before, .card::after {
    content: ""; position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200, 164, 91, .5) 14%, rgba(200, 164, 91, .5) 86%, transparent);
  }
  .card::before { top: 0; }
  .card::after { bottom: 0; }

  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(200, 164, 91, .05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200, 164, 91, .05) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(120% 130% at 70% 20%, #000 20%, transparent 82%);
  }
  .glow {
    position: absolute; right: -120px; top: -160px;
    width: 520px; height: 520px; border-radius: 50%;
    background: radial-gradient(circle, rgba(200, 164, 91, .1) 0%, transparent 66%);
  }
  .watermark {
    position: absolute; right: 44px; top: -46px;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 260px; font-weight: 600; line-height: 1;
    color: rgba(200, 164, 91, .06);
    letter-spacing: -.04em;
  }

  .corner {
    position: absolute; width: 20px; height: 20px;
    border-color: rgba(200, 164, 91, .5); border-style: solid;
  }
  .corner.tl { top: 12px; left: 12px; border-width: 1px 0 0 1px; }
  .corner.tr { top: 12px; right: 12px; border-width: 1px 1px 0 0; }
  .corner.bl { bottom: 12px; left: 12px; border-width: 0 0 1px 1px; }
  .corner.br { bottom: 12px; right: 12px; border-width: 0 1px 1px 0; }

  .inner { position: relative; padding: 42px 58px 0; }

  .meta { display: flex; align-items: center; }
  .tag {
    display: flex; align-items: center; gap: 11px;
    font-size: 10px; font-weight: 700; letter-spacing: .28em;
    text-transform: uppercase; color: #c8a45b;
  }
  .tag i {
    width: 5px; height: 5px; background: #c8a45b;
    transform: rotate(45deg); box-shadow: 0 0 10px rgba(200,164,91,.6);
  }
  .path {
    margin-left: auto;
    font-size: 8.5px; font-weight: 600; letter-spacing: .22em;
    text-transform: uppercase; color: rgba(231, 209, 154, .38);
  }

  h2 {
    margin-top: 30px;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 66px; font-weight: 600; line-height: .95;
    letter-spacing: -.012em; color: #fdf6e6;
  }
  .sub {
    margin-top: 12px;
    font-size: 17px; font-weight: 400; letter-spacing: .01em;
    color: rgba(247, 239, 223, .64);
  }
`;

const page = (s) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
  ${shared}
  html, body { height: 220px; }
  .card { height: 220px; }
  .inner { padding: 36px 58px 0; }
  .tag { font-size: 11px; }
  .path { font-size: 9.5px; }
  h2 { margin-top: 24px; font-size: 64px; }
  .sub { margin-top: 10px; }
  .finial { margin-top: 18px; display: flex; align-items: center; gap: 9px; }
  .finial span {
    width: 74px; height: 1px;
    background: linear-gradient(90deg, rgba(200, 164, 91, .55), transparent);
  }
  .finial i {
    width: 4px; height: 4px; background: #c8a45b;
    transform: rotate(45deg); opacity: .55;
  }
</style></head>
<body>
  <div class="card">
    <div class="grid"></div>
    <div class="glow"></div>
    <div class="watermark">${s.num}</div>
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>
    <div class="inner">
      <div class="meta">
        <span class="tag"><i></i>${s.num} / ${s.label}</span>
        <span class="path">github.com/11SenjiMuramasa11</span>
      </div>
      <h2>${s.title}</h2>
      <div class="sub">${s.sub}</div>
      <div class="finial"><span></span><i></i></div>
    </div>
  </div>
</body></html>`;

const endPage = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Nunito+Sans:wght@600;700&display=swap" rel="stylesheet" />
<style>
  ${shared}
  html, body { height: 180px; }
  .card { height: 180px; display: flex; align-items: center; justify-content: center; }
  .close { display: flex; align-items: center; gap: 24px; }
  .close .line {
    width: 150px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200, 164, 91, .6));
  }
  .close .line.right { background: linear-gradient(90deg, rgba(200, 164, 91, .6), transparent); }
  .close i { width: 5px; height: 5px; background: #c8a45b; transform: rotate(45deg); opacity: .85; }
  .close h2 {
    margin: 0;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 34px; font-weight: 600;
    letter-spacing: .3em; text-indent: .3em;
    color: #e7d19a;
  }
</style></head>
<body>
  <div class="card">
    <div class="grid"></div>
    <div class="glow"></div>
    <span class="corner tl"></span><span class="corner tr"></span>
    <span class="corner bl"></span><span class="corner br"></span>
    <div class="close">
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
    await render(s.slug, page(s), 220);
  }
  await render("end", endPage, 180);
} finally {
  await browser.close();
}
