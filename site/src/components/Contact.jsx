import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { identity } from "../data.js";
import Reveal from "./Reveal.jsx";

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="2"
        y="3.5"
        width="12"
        height="9"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="m2.5 4 5.5 4.5L13.5 4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.6 1.8a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM2.2 6h2.8v8H2.2V6Zm4.6 0h2.7v1.1h.04c.38-.72 1.3-1.48 2.68-1.48 2.86 0 3.39 1.88 3.39 4.33V14h-2.8V10.5c0-.83-.02-1.9-1.16-1.9-1.16 0-1.34.9-1.34 1.84V14H6.8V6Z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState("idle");
  const timer = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const fallbackCopy = (text) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  };

  const copyEmail = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(identity.email);
      ok = true;
    } catch {
      ok = fallbackCopy(identity.email);
    }

    setCopied(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied("idle"), 2600);
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <Reveal>
          <div className="contact">
            <span className="contact__corner corner--tl corner" aria-hidden="true" />
            <span className="contact__corner corner--tr corner" aria-hidden="true" />
            <span className="contact__corner corner--bl corner" aria-hidden="true" />
            <span className="contact__corner corner--br corner" aria-hidden="true" />
            <span className="contact__watermark" aria-hidden="true">
              05
            </span>

            <div className="contact__head">
              <p className="section__label">
                <i aria-hidden="true" /> 05 <em>/</em> Contact
              </p>
              <h2 className="contact__title" id="contact-title">
                Let&rsquo;s build something.
              </h2>
              <p className="contact__text">
                Open to internships and collaborations. If you need an API
                built, a sprint tested, or a system that holds up, my inbox is
                open.
              </p>

              <div className="contact__actions">
                <button
                  className="btn btn--solid"
                  type="button"
                  onClick={copyEmail}
                >
                  Copy email
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied}
                      className="copied"
                      initial={reduce ? false : { opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {copied === "copied"
                        ? "Copied"
                        : copied === "failed"
                          ? "Copy failed"
                          : ""}
                    </motion.span>
                  </AnimatePresence>
                </button>
                <a className="btn btn--ghost" href={`mailto:${identity.email}`}>
                  Open mail
                </a>
                <span className="sr-only" role="status">
                  {copied === "copied"
                    ? "Email address copied to clipboard"
                    : copied === "failed"
                      ? "Could not copy the email address"
                      : ""}
                </span>
              </div>

              <div className="contact__links">
                <a
                  className="contact__link contact__link--email"
                  href={`mailto:${identity.email}`}
                >
                  <MailIcon />
                  {identity.email}
                </a>
                <a
                  className="contact__link"
                  href={identity.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon />
                  {identity.handle}
                </a>
                <a
                  className="contact__link"
                  href={identity.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon />
                  in/jjprades
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
