import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { stackCategories } from "../data.js";
import Reveal from "./Reveal.jsx";
import SectionBar from "./SectionBar.jsx";
import { sounds } from "../audio.js";
import { DiamondIcon } from "./CharacterMenu.jsx";

// Clean SVG Icons for technologies
function TechIcon({ name }) {
  switch (name) {
    case "HTML5":
      return <span className="tech-badge-icon" style={{ color: "#e34f26" }}>HTML</span>;
    case "CSS3":
      return <span className="tech-badge-icon" style={{ color: "#3d8fd9" }}>CSS</span>;
    case "JavaScript":
      return <span className="tech-badge-icon" style={{ color: "#f7df1e", background: "#323330", padding: "1px 3px", borderRadius: "2px" }}>JS</span>;
    case "TypeScript":
      return <span className="tech-badge-icon" style={{ color: "#3178c6", background: "#fff", padding: "1px 3px", borderRadius: "2px" }}>TS</span>;
    case "React":
      return <span className="tech-badge-icon" style={{ color: "#61dafb" }}>⚛</span>;
    case "Vite":
      return <span className="tech-badge-icon" style={{ color: "#8b91ff" }}>⚡</span>;
    case "PHP":
      return <span className="tech-badge-icon" style={{ color: "#777bb4" }}>PHP</span>;
    case "Laravel":
      return <span className="tech-badge-icon" style={{ color: "#ff2d20" }}>▲</span>;
    case "Node.js":
      return <span className="tech-badge-icon" style={{ color: "#539e43" }}>Node</span>;
    case "Express":
      return <span className="tech-badge-icon" style={{ color: "currentColor" }}>ex</span>;
    case "MySQL":
      return <span className="tech-badge-icon" style={{ color: "#00758f" }}>🐬</span>;
    case "SQLite":
      return <span className="tech-badge-icon" style={{ color: "#4aa3c9" }}>SQL</span>;
    case "Firebase":
      return <span className="tech-badge-icon" style={{ color: "#ffca28" }}>🔥</span>;
    case "AWS":
      return <span className="tech-badge-icon" style={{ color: "#ff9900" }}>AWS</span>;
    case "REST APIs":
      return <span className="tech-badge-icon" style={{ color: "#38bdf8" }}>REST</span>;
    case "WebSockets":
      return <span className="tech-badge-icon" style={{ color: "#818cf8" }}>WS</span>;
    case "EDI (ANSI X12)":
      return <span className="tech-badge-icon" style={{ color: "#34d399" }}>EDI</span>;
    case "OAuth 2.0":
      return <span className="tech-badge-icon" style={{ color: "#fb7185" }}>Auth</span>;
    case "Git":
      return <span className="tech-badge-icon" style={{ color: "#f05032" }}>Git</span>;
    case "GitHub Actions":
      return <span className="tech-badge-icon" style={{ color: "#2088ff" }}>CI/CD</span>;
    case "Test Planning":
      return <span className="tech-badge-icon" style={{ color: "#4ade80" }}>QA</span>;
    case "Test Cases & UAT":
      return <span className="tech-badge-icon" style={{ color: "#a3e635" }}>UAT</span>;
    case "PHPUnit":
      return <span className="tech-badge-icon" style={{ color: "#38bdf8" }}>Test</span>;
    case "ESLint":
      return <span className="tech-badge-icon" style={{ color: "#8b5cf6" }}>Lint</span>;
    default:
      return <span className="tech-badge-icon">✦</span>;
  }
}

export default function Stack() {
  // Genshin "Talents" screen: categories on the left, the chosen one's skills in a detail pane.
  const [active, setActive] = useState(0);
  const cat = stackCategories[active];

  const choose = (i) => {
    if (i === active) return;
    sounds.playTab?.();
    setActive(i);
  };

  return (
    <section className="section section--sky" id="stack" aria-labelledby="stack-title">
      <Reveal>
        <SectionBar id="stack-title" title="Stack" meta="Core Technologies & Tooling" emblem="tower" />
      </Reveal>

      <div className="wrap">
        <Reveal delay={0.06}>
          <div className="talents">
            <div className="talents__list" role="group" aria-label="Skill categories">
              {stackCategories.map((c, i) => (
                <button
                  key={c.category}
                  type="button"
                  className={`talents__tab${i === active ? " is-active" : ""}`}
                  aria-pressed={i === active}
                  aria-controls="talents-pane"
                  onClick={() => choose(i)}
                  onMouseEnter={() => sounds.playHover?.()}
                >
                  <DiamondIcon filled={i === active} />
                  <span className="talents__tab-label">{c.category}</span>
                  <span className="talents__tab-count">{c.skills.length}</span>
                </button>
              ))}
            </div>

            <div className="talents__pane" id="talents-pane" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h3 className="talents__title">{cat.category}</h3>
                  <div className="char-panel__divider" aria-hidden="true" />
                  <ul className="talents__rows">
                    {cat.skills.map((skill, i) => (
                      <li key={skill.name} className={`talents__row${i % 2 === 1 ? " talents__row--alt" : ""}`}>
                        <span className="talents__skill">
                          <span aria-hidden="true" style={{ display: "contents" }}>
                            <TechIcon name={skill.name} />
                          </span>
                          {skill.name}
                        </span>
                        <span className="talents__desc">{skill.desc}</span>
                      </li>
                    ))}
                  </ul>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
