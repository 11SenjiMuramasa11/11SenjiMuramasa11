import { readFile } from "node:fs/promises";

const src = await readFile("github-profile/README.md", "utf8");
const urls = [...new Set((src.match(/https:\/\/[^\s"')<>]+/g) || []).map((u) => u.replace(/[.,]$/, "")))];

const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; profile-link-check)" },
        redirect: "follow",
      });
      return { status: res.status, url };
    } catch (error) {
      return { status: "ERR " + error.message, url };
    }
  }),
);

for (const r of results) console.log(String(r.status).padEnd(6), r.url);
const failures = results.filter((r) => r.status !== 200);
console.log(failures.length ? `\n${failures.length} not OK` : "\nall OK");
process.exit(failures.length ? 1 : 0);
