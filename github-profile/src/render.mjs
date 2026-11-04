import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const cdpPath = join(
  homedir(),
  ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs",
);
if (!existsSync(cdpPath)) {
  console.error("CDP helper not found:", cdpPath);
  process.exit(1);
}

const { Browser } = await import(pathToFileURL(cdpPath).href);

const htmlPath = resolve("github-profile/src/hero.html");
const format = process.argv[2] === "png" ? "png" : "jpeg";
const outPath = resolve(format === "png" ? "github-profile/hero.png" : "github-profile/hero.jpg");

const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width: 1000, height: 420, dsf: 2 });
  await page.goto(pathToFileURL(htmlPath).href, { settleMs: 900 });

  const fonts = await page.eval(async () => {
    await document.fonts.ready;
    return {
      cormorant: document.fonts.check('600 62px "Cormorant Garamond"'),
      nunito: document.fonts.check('400 17px "Nunito Sans"'),
      h1: getComputedStyle(document.querySelector("h1")).fontFamily,
    };
  });
  console.log("fonts:", JSON.stringify(fonts));

  const overflow = await page.eval(() => ({
    scrollW: document.documentElement.scrollWidth,
    scrollH: document.documentElement.scrollHeight,
  }));
  console.log("layout:", JSON.stringify(overflow));

  await page.screenshot({
    path: outPath,
    format,
    quality: 92,
    clip: { x: 0, y: 0, width: 1000, height: 420 },
  });
  console.log("wrote", outPath);
} finally {
  await browser.close();
}
