import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, identity } from "../data.js";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

const ease = [0.22, 1, 0.36, 1];

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12 12 4M5.5 4H12v6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Work() {
  const [openId, setOpenId] = useState(projects[0].id);
  const reduce = useReducedMotion();

  return (
    <section
      className="section section--panel"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="wrap">
        <span className="section__num" aria-hidden="true">
          02
        </span>
        <Reveal>
          <SectionHead
            id="work-title"
            number="02"
            label="Selected work"
            title="Four projects, two team efforts."
            sub="APIs I built, and two products I contributed to."
          />
        </Reveal>

        <div className="work">
          {projects.map((project, index) => {
            const isOpen = openId === project.id;
            return (
              <Reveal key={project.id} delay={index * 0.06} y={18}>
                <article
                  className={`work__row${isOpen ? " is-open" : ""}`}
                  aria-labelledby={`${project.id}-title`}
                >
                  <button
                    className="work__head"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${project.id}-body`}
                    onClick={() => setOpenId(isOpen ? "" : project.id)}
                  >
                    <span className="work__index">{project.index}</span>
                    <span>
                      <h3 className="work__title" id={`${project.id}-title`}>
                        {project.title}
                      </h3>
                      <p className="work__meta">
                        <b>{project.status}</b> — {project.role}
                      </p>
                      <p className="work__summary">{project.summary}</p>
                      <span className="work__tags">
                        {project.stack.map((item) => (
                          <span className="tag" key={item}>
                            {item}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="work__year">{project.year}</span>
                    <span className="work__toggle" aria-hidden="true">
                      <PlusIcon />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="work__body"
                        id={`${project.id}-body`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease }}
                      >
                        <div className="work__body-inner">
                          <div>
                            <p className="work__detail">{project.detail}</p>
                            <ul className="work__highlights">
                              {project.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="work__links">
                            <p className="work__credit">{project.credit}</p>
                            <a
                              className="work__link"
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {project.linkLabel}
                              <ArrowIcon />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.05}>
          <p className="work__more">
            <a
              className="work__link"
              href={identity.github}
              target="_blank"
              rel="noreferrer"
            >
              All repositories on GitHub
              <ArrowIcon />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
