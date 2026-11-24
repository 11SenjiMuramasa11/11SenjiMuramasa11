import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";
import SectionBar from "./SectionBar.jsx";
import { sounds } from "../audio.js";
import { lenis } from "../smoothScroll.js";

// ─── EDITABLE PROJECTS ARRAY ────────────────────────────────────────────────
// { id, title, meta, details: [...], image, stack: [...], repo }
const PROJECTS_DATA = [
  {
    id: "cpcnextboard",
    title: "CPC Nexboard",
    meta: "2026 · Contributor · Team of three",
    details: [
      "Intranet syncing production, inventory, sales and logistics at an active manufacturing company.",
      "Laravel + MySQL backend, live updates over WebSockets, department permissions, and dashboards.",
      "Groq AI assistant for demand forecasting.",
      "Rated 4.12 / 5.00 by the company's staff and IT specialists.",
    ],
    image: "projects/cpc-nexboard.webp",
    stack: ["Laravel", "PHP", "MySQL", "WebSockets", "Groq AI"],
    repo: "https://github.com/AndreiCarillo-9264/manufacturing-coordination-system",
  },
  {
    id: "trusthome",
    title: "TrustHome PH",
    meta: "2026 · Contributor · Frontend & QA",
    details: [
      "Rental marketplace capstone: document-audited listings, conflict-free booking, and fairness scoring for bank property catalogs.",
      "Built the settings, trust-evaluation and verification screens.",
      "Led QA across five sprints: test plans, regression suites, and UAT.",
    ],
    image: "projects/trusthome.webp",
    stack: ["React", "Vite", "Firebase", "Jest / QA"],
    repo: "https://github.com/carilloandrei9264/team-idle",
  },
];

export default function Work() {
  const [activeLightbox, setActiveLightbox] = useState(null);
  const closeBtnRef = useRef(null);

  // Keyboard trap / Escape handler for Lightbox modal
  useEffect(() => {
    if (!activeLightbox) return;
    lenis?.stop(); // freeze the page behind the viewer
    const opener = document.activeElement; // return focus here on close
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveLightbox(null);
      // The close button is the viewer's only control: keep Tab from escaping to the page behind.
      if (e.key === "Tab") {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      lenis?.start();
      opener?.focus?.({ preventScroll: true });
    };
  }, [activeLightbox]);

  const openShot = (project) => {
    sounds.playTab?.();
    setActiveLightbox(project);
  };

  const closeLightbox = () => {
    sounds.playClick?.();
    setActiveLightbox(null);
  };

  return (
    <section className="section section--pure-black" id="work" aria-labelledby="work-title">
      <Reveal>
        <SectionBar id="work-title" title="Projects" meta="Selected Work" emblem="sigil" />
      </Reveal>

      <div className="wrap wrap--wide">

        {/* Both projects in view, each laid out like the Talents pane: shot, title over the gold rule, details. */}
        <div className="work-cards">
          {PROJECTS_DATA.map((project) => (
            <article key={project.id} className="work-entry" aria-labelledby={`proj-${project.id}`}>
              <button
                type="button"
                className="work-shot"
                onClick={() => openShot(project)}
                onMouseEnter={() => sounds.playHover?.()}
                aria-label={`View full screenshot of ${project.title}`}
              >
                <img src={project.image} alt="" width="760" height="475" loading="lazy" decoding="async" draggable="false" />
              </button>
              <h3 className="work-info__title" id={`proj-${project.id}`}>{project.title}</h3>
              <p className="work-info__meta">{project.meta}</p>
              <div className="char-panel__divider" aria-hidden="true" />
              <ul className="work-info__details">
                {project.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="project-card__tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="project-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="project-ext-link work-info__repo"
                onMouseEnter={() => sounds.playHover?.()}
              >
                <span>View on GitHub</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="ext-link-svg" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>

      {activeLightbox && (
        <div
          className="lightbox-backdrop"
          data-lenis-prevent
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeLightbox.title} Screenshot Viewer`}
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="lightbox-title">{activeLightbox.title}</span>
              <button
                ref={closeBtnRef}
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close screenshot preview"
              >
                ✕ Close
              </button>
            </div>
            <div className="lightbox-body">
              <img src={activeLightbox.image} alt={`${activeLightbox.title} full screenshot`} className="lightbox-img" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
