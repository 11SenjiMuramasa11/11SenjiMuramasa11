import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { stackCategories } from "../data.js";
import Reveal from "./Reveal.jsx";
import SectionBar from "./SectionBar.jsx";
import { sounds } from "../audio.js";

// Clean SVG Icons for technologies
function TechIcon({ name }) {
  switch (name) {
    case "HTML5":
      return <span className="tech-badge-icon" style={{ color: "#e34f26" }}>HTML</span>;
    case "CSS3":
      return <span className="tech-badge-icon" style={{ color: "#1572b6" }}>CSS</span>;
    case "JavaScript":
      return <span className="tech-badge-icon" style={{ color: "#f7df1e", background: "#323330", padding: "1px 3px", borderRadius: "2px" }}>JS</span>;
    case "TypeScript":
      return <span className="tech-badge-icon" style={{ color: "#3178c6", background: "#fff", padding: "1px 3px", borderRadius: "2px" }}>TS</span>;
    case "React":
      return <span className="tech-badge-icon" style={{ color: "#61dafb" }}>⚛</span>;
    case "Vite":
      return <span className="tech-badge-icon" style={{ color: "#646cff" }}>⚡</span>;
    case "PHP":
      return <span className="tech-badge-icon" style={{ color: "#777bb4" }}>PHP</span>;
    case "Laravel":
      return <span className="tech-badge-icon" style={{ color: "#ff2d20" }}>▲</span>;
    case "Node.js":
      return <span className="tech-badge-icon" style={{ color: "#539e43" }}>Node</span>;
    case "Express":
      return <span className="tech-badge-icon" style={{ color: "#ffffff" }}>ex</span>;
    case "MySQL":
      return <span className="tech-badge-icon" style={{ color: "#00758f" }}>🐬</span>;
    case "SQLite":
      return <span className="tech-badge-icon" style={{ color: "#003b57" }}>SQL</span>;
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
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleMouseEnter = (skill, e) => {
    sounds.playHover();
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveTooltip({
      name: skill.name,
      desc: skill.desc,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <section className="section section--sky" id="stack" aria-labelledby="stack-title">
      <Reveal>
        <SectionBar
          id="stack-title"
          title="Stack"
          meta="Core Technologies & Tooling"
          emblem="star"
        />
      </Reveal>

      <div className="wrap">
        <Reveal delay={0.06}>
          <div className="pro-stack-container">
            <h2 className="pro-stack-main-title">STACK</h2>

            <div className="pro-stack-rows">
              {stackCategories.map((cat) => (
                <div key={cat.category} className="pro-stack-row">
                  <div className="pro-stack-row__label">
                    <span>{cat.category}</span>
                  </div>

                  <div className="pro-stack-row__items">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="pro-tech-chip"
                        onMouseEnter={(e) => handleMouseEnter(skill, e)}
                        onMouseLeave={handleMouseLeave}
                        tabIndex={0}
                        role="button"
                        aria-label={`${skill.name}: ${skill.desc}`}
                      >
                        <TechIcon name={skill.name} />
                        <span className="pro-tech-name">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Interactive Hover Tooltip */}
            <AnimatePresence>
              {activeTooltip && (
                <motion.div
                  className="pro-stack-tooltip"
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.16 }}
                  style={{
                    position: "fixed",
                    left: `${activeTooltip.x}px`,
                    top: `${activeTooltip.y - 12}px`,
                    transform: "translate(-50%, -100%)",
                    zIndex: 9999,
                    pointerEvents: "none",
                  }}
                >
                  <div className="tooltip-inner">
                    <b className="tooltip-title">{activeTooltip.name}</b>
                    <p className="tooltip-desc">{activeTooltip.desc}</p>
                  </div>
                  <div className="tooltip-arrow" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
