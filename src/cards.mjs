// Content for the README section cards. Each card is one image that links to its section on the portfolio,
// so the alt text carries everything the card says.
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as si from "simple-icons";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const SITE = "https://11senjimuramasa11.github.io/11SenjiMuramasa11/";
const img = (path) => `data:image/${path.split(".").pop()};base64,${readFileSync(resolve(root, path)).toString("base64")}`;

const eyebrow = (name, hash) =>
  `<div class="eyebrow mono"><b>${name}</b><span>${hash ? `portfolio / #${hash}` : "portfolio"}</span></div>`;

// brand icon from simple-icons; very dark brand colours are drawn in cream so they read on black
function pill(name, icon) {
  const i = icon && si[icon];
  if (!i) return `<span class="pill">${name}</span>`;
  const n = parseInt(i.hex, 16), lum = ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000;
  return `<span class="pill"><svg viewBox="0 0 24 24"><path fill="${lum < 60 ? "#f1f5f9" : "#" + i.hex}" d="${i.path}"/></svg>${name}</span>`;
}

const projects = [
  {
    name: "TrustHome PH", shot: "src/projects/trusthome.webp", tech: ["React", "Vite", "Firebase"], role: "Team capstone · Frontend and QA",
    desc: "A rental marketplace where every owner is ID-checked and listings rank by completed bookings and ratings instead of paid placement. I worked on the settings, ratings and trust-score screens, then ran QA for five sprints: test plans, test cases, regression and UAT.",
  },
  {
    name: "cpcNextboard", shot: "src/projects/cpcnextboard.webp", tech: ["Laravel", "PHP", "MySQL", "WebSockets", "Groq AI"], role: "Team of three · Co-developer",
    desc: "An intranet that keeps production, inventory, sales and logistics in step at a manufacturing company. Three of us built it in Laravel and MySQL, with live updates over WebSockets, role-based access, department dashboards and a Groq assistant for forecasting. Company staff and IT experts rated it 4.12 out of 5.",
  },
];

const stack = [
  ["Frontend", [["HTML5", "siHtml5"], ["CSS3", "siCss"], ["JavaScript", "siJavascript"], ["TypeScript", "siTypescript"], ["React", "siReact"], ["Vite", "siVite"]]],
  ["Backend", [["Laravel", "siLaravel"], ["PHP", "siPhp"], ["Node.js", "siNodedotjs"], ["Express", "siExpress"]]],
  ["Data & cloud", [["MySQL", "siMysql"], ["SQLite", "siSqlite"], ["Firebase", "siFirebase"], ["AWS"]]],
  ["QA & tools", [["Git", "siGit"], ["GitHub Actions", "siGithubactions"], ["PHPUnit"], ["ESLint", "siEslint"], ["Test planning"], ["Test cases & UAT"]]],
  ["Integration", [["REST APIs"], ["WebSockets"], ["EDI (ANSI X12)"], ["OAuth 2.0"]]],
];

const certs = [
  ["IT Specialist: Network Security", "Certiport · Pearson VUE", "May 2026", "assets/cert-network-security.png"],
  ["IT Specialist: Databases", "Certiport · Pearson VUE", "March 2025", "assets/cert-databases.png"],
  ["Salesforce Agentblazer Workshop", "Salesforce Trailhead", "August 2025", "assets/cert-salesforce.png"],
];

const contact = [
  ["Email", "justinejamesprades1111@gmail.com"],
  ["LinkedIn", "in/jjprades"],
  ["GitHub", "@11SenjiMuramasa11"],
  ["Availability", "Open to software engineering internships, collaborative builds, and QA testing roles."],
  ["Based in", "Laguna, Philippines"],
];

export const cards = [
  {
    slug: "about", href: SITE,
    alt: "About. I build web apps in Laravel and React, then test them until they hold up: clear API contracts, role-based access, and a test plan that finds the gaps. Right now I'm working through authentication, middleware, and validation, and getting better at reading someone else's code before changing it. Based in Laguna, Philippines. Studying BSIT at NU Laguna. Open to internships. Opens my portfolio.",
    body: `${eyebrow("About", "")}
      <p class="statement">I build web apps in Laravel and React, then test them until they <em>hold up</em>: clear API contracts, role-based access, and a test plan that finds the gaps.</p>
      <p class="sub" style="margin:-14px 0 28px">Right now I'm working through authentication, middleware, and validation, and getting better at reading someone else's code before changing it.</p>
      <div class="facts">
        <div><p class="mono label">Based in</p><p>Laguna, Philippines</p></div>
        <div><p class="mono label">Studying</p><p>BSIT · NU Laguna</p></div>
        <div><p class="mono label">Status</p><p>Open to internships</p></div>
      </div>`,
  },
  {
    slug: "work", href: `${SITE}#work`,
    alt: `Selected work. Two team projects I helped build and test. ${projects.map((p) => `${p.name}, ${p.role}, built with ${p.tech.join(", ")}: ${p.desc}`).join(" ")} Opens the projects section of my portfolio.`,
    body: `${eyebrow("Selected work", "work")}
      <h2>Selected work<i>.</i></h2><p class="sub">Two team projects I helped build and test.</p>
      <div class="rows" style="margin-top:26px">${projects.map((p) => `
        <div class="project">
          <div class="frame"><div class="bar"><i></i><i></i><i></i></div><div class="shot"><img src="${img(p.shot)}" alt="" /></div></div>
          <div>
            <div class="head"><h3>${p.name}</h3><span class="mono label">${p.tech.join(" · ")}</span></div>
            <p class="mono gold role">${p.role}</p>
            <p>${p.desc}</p>
          </div>
        </div>`).join("")}
      </div>`,
  },
  {
    slug: "stack", href: `${SITE}#stack`,
    alt: `Stack. ${stack.map(([g, items]) => `${g}: ${items.map(([n]) => n).join(", ")}.`).join(" ")} Opens the stack section of my portfolio.`,
    body: `${eyebrow("Stack", "stack")}
      <h2>Stack<i>.</i></h2><p class="sub">What I build and test with.</p>
      <div class="rows" style="margin-top:26px">${stack.map(([g, items]) => `
        <div class="stackrow"><p class="mono label">${g}</p><div class="pills">${items.map(([n, icon]) => pill(n, icon)).join("")}</div></div>`).join("")}
      </div>`,
  },
  {
    slug: "certifications", href: `${SITE}#certifications`,
    alt: `Certifications. ${certs.map(([t, i, d]) => `${t}, ${i}, ${d}.`).join(" ")} Opens the certifications section of my portfolio, where each certificate opens its PDF.`,
    body: `${eyebrow("Certifications", "certifications")}
      <h2>Certifications<i>.</i></h2><p class="sub">Each one opens its PDF on my portfolio.</p>
      <div class="certs">${certs.map(([t, i, d, file]) => `
        <div class="cert"><img src="${img(file)}" alt="" /><p>${t}</p><p class="mono label">${i} · ${d}</p></div>`).join("")}
      </div>`,
  },
  {
    slug: "contact", href: `${SITE}#contact`,
    alt: `Contact. Let's connect. ${contact.map(([k, v]) => `${k}: ${v.replace(/\.$/, "")}`).join(". ")}. Opens the contact section of my portfolio.`,
    body: `${eyebrow("Contact", "contact")}
      <h2>Let's connect<i>.</i></h2>
      <div class="rows" style="margin-top:26px">${contact.map(([k, v]) => `
        <div class="contactrow"><p class="mono label">${k}</p><p>${v}</p></div>`).join("")}
      </div>
      <span class="cta mono">Open contact on my portfolio ↗</span>`,
  },
];
