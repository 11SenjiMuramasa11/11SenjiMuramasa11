import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";
import { sounds } from "../audio.js";

// ─── EDITABLE PROJECTS ARRAY ────────────────────────────────────────────────
// Add new projects by simply appending an object to this array:
// { title, description, image, stack: [...], links: [{ label, url }] }
const PROJECTS_DATA = [
  {
    id: "trusthome",
    title: "TrustHome PH",
    description:
      "Rental marketplace capstone with document-reviewed listings, conflict-free booking, and a fairness-scored bank property catalog.",
    image: "projects/trusthome.webp",
    stack: ["React", "Vite", "Firebase", "Jest / QA"],
    links: [
      {
        label: "Visit pull request",
        url: "https://github.com/carilloandrei9264/team-idle/pull/15",
      },
    ],
  },
  {
    id: "cpcnextboard",
    title: "cpcNextboard",
    description:
      "Intranet system for real-time coordination between production, inventory, sales, and logistics at an active manufacturing enterprise.",
    image: "projects/cpc-nexboard.webp",
    stack: ["Laravel", "PHP", "MySQL", "WebSockets", "Groq AI"],
    links: [
      {
        label: "Visit repository",
        url: "https://github.com/AndreiCarillo-9264/manufacturing-coordination-system/commit/4b3ed604daca984f0c1bf1991fbfbbab89e3dee5",
      },
    ],
  },
];

export default function Work() {
  const [activeLightbox, setActiveLightbox] = useState(null);
  const closeBtnRef = useRef(null);

  // Keyboard trap / Escape handler for Lightbox modal
  useEffect(() => {
    if (!activeLightbox) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveLightbox(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    // Focus close button on open
    setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeLightbox]);

  const openLightbox = (project) => {
    sounds.playTab?.();
    setActiveLightbox(project);
  };

  const closeLightbox = () => {
    sounds.playClick?.();
    setActiveLightbox(null);
  };

  return (
    <section className="section section--pure-black" id="work" aria-labelledby="work-title">
      <div className="wrap wrap--wide">
        {/* Section Header */}
        <Reveal>
          <div className="work-header-row">
            <div>
              <span className="section-eyebrow">PORTFOLIO</span>
              <h2 id="work-title" className="work-section-title">
                Selected work
              </h2>
            </div>
            <a
              href="https://github.com/11SenjiMuramasa11?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="work-all-btn"
              onMouseEnter={() => sounds.playHover?.()}
            >
              <span>SEE ALL REPOSITORIES</span>
              <span className="work-plus-icon">+</span>
            </a>
          </div>
        </Reveal>

        {/* 2-Card Clean Grid / Stack */}
        <div className="projects-grid">
          {PROJECTS_DATA.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.08}>
              <article className="project-card">
                {/* Browser-style frame (16:10 aspect ratio) */}
                <div
                  className="project-browser-frame"
                  onClick={() => openLightbox(project)}
                  onMouseEnter={() => sounds.playHover?.()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(project);
                    }
                  }}
                  aria-label={`View full screenshot of ${project.title}`}
                  title="Click to view full screenshot"
                >
                  <div className="browser-topbar">
                    <div className="browser-dots">
                      <span className="browser-dot browser-dot--red" />
                      <span className="browser-dot browser-dot--yellow" />
                      <span className="browser-dot browser-dot--green" />
                    </div>
                    <span className="browser-title-hint">{project.title}</span>
                    <span className="browser-zoom-pill">Click to expand</span>
                  </div>

                  <div className="project-image-wrap">
                    <img
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      className="project-screenshot-img"
                      width="760"
                      height="475"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="project-card__info">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>

                  <div className="project-card__bottom">
                    {/* Tech stack badges */}
                    <div className="project-card__tags">
                      {project.stack.map((tech) => (
                        <span key={tech} className="project-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Existing Links */}
                    <div className="project-card__links">
                      {project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="project-ext-link"
                          onMouseEnter={() => sounds.playHover?.()}
                        >
                          <span>{link.label}</span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ext-link-svg"
                            aria-hidden="true"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="lightbox-backdrop"
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
              <img
                src={activeLightbox.image}
                alt={`${activeLightbox.title} full screenshot`}
                className="lightbox-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
