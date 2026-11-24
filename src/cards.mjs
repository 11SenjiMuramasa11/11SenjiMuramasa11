// Content for the README section cards. Each card is one image that links to its section on the portfolio,
// so the alt text carries everything the card says. Text and layout mirror the portfolio site (dark theme).
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as si from "simple-icons";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const SITE = "https://11senjimuramasa11.github.io/11SenjiMuramasa11/";
const img = (path) => `data:image/${path.split(".").pop()};base64,${readFileSync(resolve(root, path)).toString("base64")}`;

// Same line icons as the portfolio (site/src/components/icons.jsx).
const EMBLEMS = {
  sigil: '<path d="M12 3 19 7v6c0 4-3 7-7 8-4-1-7-4-7-8V7Z"/><path d="M12 8v7M9 11h6"/>',
  tower: '<path d="M6 21V10l3-1V6l3 2 3-2v3l3 1v11"/><path d="M9 21v-4h6v4M4 21h16"/>',
  shield: '<path d="M12 3 19 6v6c0 4-3 7-7 9-4-2-7-5-7-9V6Z"/><path d="m8.5 12 2.5 2.5L16 10"/>',
  wings: '<path d="M12 20c-3-3-5-5-5-8 0-2 1-4 3-4 1.4 0 2 1 2 2 0-1 .6-2 2-2 2 0 3 2 3 4 0 3-2 5-5 8Z"/><path d="M7 8C5 6 3 6 2 7c1 3 3 5 5 6M17 8c2-2 4-2 5-1-1 3-3 5-5 6"/>',
  scales: '<path d="M12 3v18M6 21h12M5 8h14M12 6l-7 2 2 5h10l2-5Z"/>',
};
export const ICONS = {
  mail: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1.8" y="3.4" width="12.4" height="9.2"/><path d="m2.4 4 5.6 4.6L13.6 4"/></svg>',
  github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/></svg>',
  linkedin: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M3.6 1.8a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM2.2 6h2.8v8H2.2V6Zm4.6 0h2.7v1.1h.04c.38-.72 1.3-1.48 2.68-1.48 2.86 0 3.39 1.88 3.39 4.33V14h-2.8V10.5c0-.83-.02-1.9-1.16-1.9-1.16 0-1.34.9-1.34 1.84V14H6.8V6Z"/></svg>',
  file: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="M9.5 1.8H4a1 1 0 0 0-1 1v10.4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.3Z"/><path d="M9.5 1.8v3.5H13M5.5 8.5h5M5.5 11h5"/></svg>',
  globe: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="8" r="6.2"/><path d="M1.8 8h12.4M8 1.8c1.8 1.7 2.6 3.8 2.6 6.2S9.8 12.5 8 14.2C6.2 12.5 5.4 10.4 5.4 8S6.2 3.5 8 1.8Z"/></svg>',
};
const ARROW = '<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3" style="vertical-align:-1px;margin-left:4px"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const secbar = (title, meta, emblem) =>
  `<div class="secbar"><svg class="emblem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">${EMBLEMS[emblem]}</svg><h2>${title}</h2><span class="rule"></span><span class="meta">${meta}</span></div>`;

// brand icon from simple-icons; very dark brand colours are drawn light so they read on the dark card
function skill(name, icon) {
  const i = icon && si[icon];
  if (!i) return `<span class="skill">${name}</span>`;
  const n = parseInt(i.hex, 16), lum = ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000;
  return `<span class="skill"><svg viewBox="0 0 24 24"><path fill="${lum < 60 ? "#f1f5f9" : "#" + i.hex}" d="${i.path}"/></svg>${name}</span>`;
}

// Same order and wording as the portfolio (site/src/components/CharacterMenu.jsx, Work.jsx, data.js, Background.jsx).
export const stats = [
  ["Status", "Open to internships"],
  ["Studying", "BSIT · 2022 – Present"],
  ["Projects", "2 team builds"],
  ["Certifications", "2 + 1 workshop"],
];

const projects = [
  {
    name: "CPC Nexboard", shot: "src/projects/cpcnextboard.webp", meta: "2026 · Contributor · Team of three",
    details: [
      "Intranet syncing production, inventory, sales and logistics at an active manufacturing company.",
      "Laravel + MySQL backend, live updates over WebSockets, department permissions, and dashboards.",
      "Groq AI assistant for demand forecasting.",
      "Rated 4.12 / 5.00 by the company's staff and IT specialists.",
    ],
    tech: ["Laravel", "PHP", "MySQL", "WebSockets", "Groq AI"],
  },
  {
    name: "TrustHome PH", shot: "src/projects/trusthome.webp", meta: "2026 · Contributor · Frontend & QA",
    details: [
      "Rental marketplace capstone: document-audited listings, conflict-free booking, and fairness scoring for bank property catalogs.",
      "Built the settings, trust-evaluation and verification screens.",
      "Led QA across five sprints: test plans, regression suites, and UAT.",
    ],
    tech: ["React", "Vite", "Firebase", "Jest / QA"],
  },
];

const stack = [
  ["Backend", [["PHP", "siPhp"], ["Laravel", "siLaravel"], ["Node.js", "siNodedotjs"], ["Express", "siExpress"]]],
  ["Quality Assurance & Tools", [["Git", "siGit"], ["GitHub Actions", "siGithubactions"], ["Test Planning"], ["Test Cases & UAT"], ["PHPUnit"], ["ESLint", "siEslint"]]],
  ["Data & Cloud", [["MySQL", "siMysql"], ["SQLite", "siSqlite"], ["Firebase", "siFirebase"], ["AWS"]]],
  ["Integration & Protocols", [["REST APIs"], ["WebSockets"], ["EDI (ANSI X12)"], ["OAuth 2.0"]]],
  ["Frontend", [["HTML5", "siHtml5"], ["CSS3", "siCss"], ["JavaScript", "siJavascript"], ["TypeScript", "siTypescript"], ["React", "siReact"], ["Vite", "siVite"]]],
];

const certs = [
  ["IT Specialist: Network Security", "Certiport · Pearson VUE", "May 2026", "assets/cert-network-security.png",
    "Demonstrates foundational knowledge in network security, defense-in-depth, security policies, and mitigation techniques."],
  ["Salesforce Agentblazer Workshop", "Salesforce Trailhead", "August 2025", "assets/cert-salesforce.png",
    "Autonomous AI agent development, Trailhead prompt design, and enterprise workflow automation workshop."],
  ["IT Specialist: Databases", "Certiport · Pearson VUE", "March 2025", "assets/cert-databases.png",
    "Covers relational database fundamentals, normalization, queries, stored procedures, data integrity, and ACID properties."],
];

const channels = [
  ["mail", "Direct Email", "justinejamesprades1111@gmail.com", "Send Message"],
  ["linkedin", "LinkedIn Network", "in/jjprades", "Connect on LinkedIn"],
  ["github", "GitHub Repositories", "@11SenjiMuramasa11", "Visit GitHub"],
];

export const DESC = "BSIT student at National University (NU Laguna). I build backend systems in Laravel: API contracts, databases, and integrations, then test them hard with sprint-level QA.";
export const QUOTE = "I build the API, then try to break it.";

// Each card gets an anchor (`anchor`) so the nav bar at the top of the README scrolls to it.
export const cards = [
  {
    slug: "about", anchor: "about", href: SITE,
    alt: `About. Backend Developer and QA Engineer, BSIT at National University Laguna. ${DESC} "${QUOTE}" ${stats.map(([k, v]) => `${k}: ${v}.`).join(" ")} Opens my portfolio.`,
    body: `${secbar("About", "Character Info", "scales")}
      <div class="about">
        <div>
          <p class="role">Backend Developer &amp; QA Engineer</p>
          <p class="sub">BSIT · National University Laguna</p>
          <div class="divider"></div>
          <p class="body">${DESC}</p>
          <p class="quote">"${QUOTE}"</p>
        </div>
        <div class="stats">${stats.map(([k, v]) => `<div class="stat"><span>${k}</span><b>${v}</b></div>`).join("")}</div>
      </div>`,
  },
  {
    slug: "work", anchor: "projects", href: `${SITE}#work`,
    alt: `Projects. ${projects.map((p) => `${p.name}, ${p.meta}, built with ${p.tech.join(", ")}: ${p.details.join(" ")}`).join(" ")} Opens the projects section of my portfolio.`,
    body: `${secbar("Projects", "Selected Work", "sigil")}
      <div class="works">${projects.map((p) => `
        <div>
          <div class="shot"><img src="${img(p.shot)}" alt="" /></div>
          <h3>${p.name}</h3>
          <p class="meta-line">${p.meta}</p>
          <div class="divider"></div>
          <ul class="details">${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>
          <div class="tags">${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        </div>`).join("")}
      </div>`,
  },
  {
    slug: "stack", anchor: "stack", href: `${SITE}#stack`,
    alt: `Stack. ${stack.map(([g, items]) => `${g}: ${items.map(([n]) => n).join(", ")}.`).join(" ")} Opens the stack section of my portfolio.`,
    body: `${secbar("Stack", "Core Technologies &amp; Tooling", "tower")}
      <div class="stack-wrap">${stack.map(([g, items]) => `
        <div class="talent">
          <div class="tab"><span class="diamond"></span>${g}<span class="count">${items.length}</span></div>
          <div class="skills">${items.map(([n, icon]) => skill(n, icon)).join("")}</div>
        </div>`).join("")}
      </div>`,
  },
  {
    slug: "certifications", anchor: "certifications", href: `${SITE}#certifications`,
    alt: `Certifications. ${certs.map(([t, i, d, , desc]) => `${t}, ${i}, ${d}: ${desc}`).join(" ")} Opens the certifications section of my portfolio, where each certificate opens its PDF.`,
    body: `${secbar("Certifications", `View on LinkedIn${ARROW}`, "shield").replace('class="meta"', 'class="meta" style="color:#d9b66a;text-transform:none;letter-spacing:0;font-size:14px;font-weight:600"')}
      <div class="certs">${certs.map(([t, i, d, file, desc]) => `
        <div class="cert">
          <div class="img"><img src="${img(file)}" alt="" /></div>
          <div class="info"><h4>${t}</h4><div class="by"><span class="gold">${i}</span><span>${d}</span></div><p>${desc}</p></div>
        </div>`).join("")}
      </div>`,
  },
  {
    slug: "contact", anchor: "contact", href: `${SITE}#contact`,
    alt: `Contact. Let's connect. Open to software engineering internships, collaborative builds, and QA testing roles. ${channels.map(([, k, v]) => `${k}: ${v}.`).join(" ")} Opens the contact section of my portfolio.`,
    body: `${secbar("Contact", "Inquiries &amp; Opportunities", "wings")}
      <div class="contact">
        <h3>Let's connect.</h3>
        <p class="lead">Open to software engineering internships, collaborative builds, and QA testing roles.</p>
        <div class="channels">${channels.map(([icon, k, v, go]) => `
          <div class="channel"><p class="label">${ICONS[icon]}${k}</p><p class="val">${v}</p><p class="go">${go}${ARROW}</p></div>`).join("")}
        </div>
        <span class="cta">Open contact on my portfolio ↗</span>
      </div>`,
  },
];
