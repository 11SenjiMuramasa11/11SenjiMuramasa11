import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const cdp = join(homedir(), ".config/opencode/skills/design-taste-frontend/scripts/lib/cdp.mjs");
const { Browser } = await import(pathToFileURL(cdp).href);

const width = Number(process.argv[2] || 900);
const scheme = process.argv[3] === "light" ? "light" : "dark";
const suffix = scheme === "dark" ? "" : `-${scheme}`;
const target = resolve("github-profile/preview.html");
const out = resolve(`.taste-skill/readme-${width}${suffix}.jpg`);

const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width, height: 900, dsf: 1 });
  await page.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: scheme }],
  });
  await page.goto(pathToFileURL(target).href, { settleMs: 2500 });
  const ready = await page.eval(() =>
    Promise.all(
      [...document.images].map((img) =>
        img.complete ? img.naturalWidth : new Promise((r) => {
          img.addEventListener("load", () => r(img.naturalWidth), { once: true });
          img.addEventListener("error", () => r(0), { once: true });
        }),
      ),
    ),
  );
  console.log("images:", JSON.stringify(ready));
  await page.screenshot({ path: out, format: "jpeg", quality: 86, fullPage: true });
  console.log("wrote", out);
} finally {
  await browser.close();
}
