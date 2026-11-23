import { useState, useEffect, useCallback, useRef } from "react";
import { sounds } from "../audio.js";

// ─── EDITABLE DATA ───────────────────────────────────────────────────────────
const CHAR = {
  fullName: "Justine James Prades",
  role: "Back-End Developer & QA Engineer",
  institution: "BSIT · National University Laguna",
  quote: "I build the API, then try to break it.",
  github: "https://github.com/11SenjiMuramasa11",
  linkedin: "https://www.linkedin.com/in/jjprades",
  email: "justinejamesprades1111@gmail.com",

  menu: [
    { id: "about",          label: "About",          target: "#char-menu" },
    { id: "work",           label: "Projects",        target: "#work" },
    { id: "stack",          label: "Stack",           target: "#stack" },
    { id: "certifications", label: "Certifications",  target: "#certifications" },
    { id: "contact",        label: "Contact",         target: "#contact" },
  ],

  panel: {
    stats: [
      { label: "Institution",      value: "NU Laguna" },
      { label: "Degree",           value: "BS Info Tech" },
      { label: "Certifications",   value: "03 Accredited" },
      { label: "Primary Stack",    value: "Laravel / React" },
    ],
    description:
      "BSIT student at National University (NU Laguna). I build web applications in Laravel and React, with a strong focus on API contract design and rigorous sprint-level QA testing.",
  },
};

function DiamondIcon({ filled }) {
  return (
    <svg viewBox="0 0 12 12" className="char-diamond-svg" aria-hidden="true" focusable="false">
      {filled ? (
        <polygon points="6,0 12,6 6,12 0,6" fill="currentColor" />
      ) : (
        <polygon points="6,1 11,6 6,11 1,6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      )}
    </svg>
  );
}

// Section mapping for deterministic scroll-spy
const SPY_SECTIONS = [
  { id: "char-menu", index: 0 },
  { id: "work", index: 1 },
  { id: "stack", index: 2 },
  { id: "certifications", index: 3 },
  { id: "contact", index: 4 },
];

export default function CharacterMenu() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [showBack,  setShowBack]    = useState(false);
  const isProgrammaticRef           = useRef(false);
  const scrollTimeoutRef            = useRef(null);
  
  // Parallax and reveal refs
  const line1Ref                    = useRef(null);
  const line2Ref                    = useRef(null);
  const photoRef                    = useRef(null);

  // ── Scroll Listener (rAF-throttled, passive) for Scroll-Spy & Parallax ──
  useEffect(() => {
    let rafId = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Back-to-top visibility
      setShowBack(scrollY > vh * 0.6);

      // 2. Hero parallax (only when top screen is partially in view)
      if (!reducedMotion) {
        if (scrollY < vh) {
          const progress = Math.max(0, scrollY / vh);
          if (line1Ref.current) {
            line1Ref.current.style.transform = `translateX(-${(progress * 85).toFixed(1)}px)`;
          }
          if (line2Ref.current) {
            line2Ref.current.style.transform = `translateX(${(progress * 110).toFixed(1)}px)`;
          }
          if (photoRef.current) {
            photoRef.current.style.transform = `translateX(-50%) translateY(-${(progress * 35).toFixed(1)}px)`;
            photoRef.current.style.opacity = `${Math.max(0, 1 - progress * 0.85).toFixed(2)}`;
          }
        } else if (scrollY === 0) {
          if (line1Ref.current) line1Ref.current.style.transform = "";
          if (line2Ref.current) line2Ref.current.style.transform = "";
          if (photoRef.current) {
            photoRef.current.style.transform = "translateX(-50%)";
            photoRef.current.style.opacity = "1";
          }
        }
      }

      // 3. Robust Scroll-Spy (ignored during programmatic smooth scroll)
      if (isProgrammaticRef.current) return;

      // Condition: top of page
      if (scrollY <= 10) {
        setActiveIdx(0);
        return;
      }

      // Condition: bottom of page reached
      if (vh + scrollY >= docHeight - 25) {
        setActiveIdx(SPY_SECTIONS.length - 1);
        return;
      }

      // Condition: last section whose top is at or above 40% of viewport height
      const threshold = vh * 0.4;
      let currentActive = 0;
      for (let i = 0; i < SPY_SECTIONS.length; i++) {
        const el = document.getElementById(SPY_SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = SPY_SECTIONS[i].index;
          }
        }
      }
      setActiveIdx(currentActive);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Menu click activation & smooth scroll ─────────────────────────
  const activateItem = useCallback((idx) => {
    const item = CHAR.menu[idx];
    sounds.playHover?.();
    setActiveIdx(idx);

    isProgrammaticRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const onScrollEnd = () => {
      isProgrammaticRef.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    };
    window.addEventListener("scrollend", onScrollEnd, { once: true });
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticRef.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    }, 1200);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReduced ? "instant" : "smooth";

    if (item.target === "#char-menu") {
      window.scrollTo({ top: 0, behavior });
    } else {
      const el = document.querySelector(item.target);
      if (el) el.scrollIntoView({ behavior });
    }
  }, []);

  // ── Keyboard navigation (W/S & Up/Down arrows) ────────────────────
  const handleKey = useCallback(
    (e) => {
      const activeTag = document.activeElement?.tagName;
      const targetTag = e.target?.tagName;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag) ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(targetTag)
      ) {
        return;
      }

      const len = CHAR.menu.length;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        activateItem((activeIdx - 1 + len) % len);
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        activateItem((activeIdx + 1) % len);
      }
    },
    [activeIdx, activateItem]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // ── Cursor reveal on the front name "PRADES" ──────────────────────
  useEffect(() => {
    const el = line2Ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    el.classList.add("is-reveal");

    const reset = () => {
      el.style.setProperty("--mx", "-999px");
      el.style.setProperty("--my", "-999px");
    };
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    reset();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      el.classList.remove("is-reveal");
    };
  }, []);

  function handleBackToTop() {
    sounds.playClick?.();
    activateItem(0);
  }

  return (
    <>
      {/* ── FIRST SCREEN ────────────────────────────────────────── */}
      <section className="char-screen" id="char-menu" aria-label="Portfolio intro">
        {/* Top-left breadcrumb */}
        <div className="char-breadcrumb" aria-hidden="true">Portfolio</div>

        {/* HERO – viewport-centered photo with staggered name behind/in front */}
        <div className="char-hero">
          <h1 className="char-hero-name" aria-label={CHAR.fullName}>
            <span
              ref={line1Ref}
              className="char-hero-name__line char-hero-name__line--back"
              aria-hidden="true"
            >
              JUSTINE
            </span>
            <span
              ref={line2Ref}
              className="char-hero-name__line char-hero-name__line--front"
              aria-hidden="true"
            >
              PRADES
            </span>
          </h1>

          <img
            ref={photoRef}
            src="me.webp"
            alt="Justine James Prades"
            className="char-photo"
            width="560"
            height="720"
            fetchpriority="high"
            decoding="sync"
            draggable="false"
          />
        </div>

        {/* Three-column layout */}
        <div className="char-layout">
          {/* LEFT – fixed side menu */}
          <nav className="char-nav" aria-label="Portfolio sections">
            {CHAR.menu.map((item, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={item.id}
                  className={`char-nav__item${isActive ? " is-active" : ""}`}
                  onClick={() => activateItem(i)}
                  aria-current={isActive ? "true" : undefined}
                  type="button"
                >
                  <DiamondIcon filled={isActive} />
                  <span className="char-nav__label">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* RIGHT – stats panel (NO stars as requested in Item 2) */}
          <aside className="char-panel" aria-label="Profile details">
            <p className="char-panel__fullname">{CHAR.fullName}</p>
            <p className="char-panel__role">{CHAR.role}</p>
            <p className="char-panel__inst">{CHAR.institution}</p>

            <div className="char-panel__divider" aria-hidden="true" />

            <div className="char-stat-list">
              {CHAR.panel.stats.map((s, i) => (
                <div key={i} className={`char-stat-row${i % 2 === 1 ? " char-stat-row--alt" : ""}`}>
                  <span className="char-stat-row__label">{s.label}</span>
                  <span className="char-stat-row__value">{s.value}</span>
                </div>
              ))}
            </div>

            <p className="char-panel__desc">{CHAR.panel.description}</p>
            <blockquote className="char-panel__quote">"{CHAR.quote}"</blockquote>
          </aside>
        </div>

        {/* BOTTOM-LEFT – social pills */}
        <div className="char-socials">
          <a href={CHAR.github}            target="_blank" rel="noreferrer" className="char-social-pill" onMouseEnter={() => sounds.playHover?.()}>GitHub</a>
          <a href={CHAR.linkedin}          target="_blank" rel="noreferrer" className="char-social-pill" onMouseEnter={() => sounds.playHover?.()}>LinkedIn</a>
          <a href={`mailto:${CHAR.email}`}                                  className="char-social-pill" onMouseEnter={() => sounds.playHover?.()}>Email</a>
        </div>

        {/* BOTTOM-CENTER – scroll hint */}
        <div className="char-scroll-hint" aria-hidden="true">
          <span className="char-scroll-hint__label">scroll</span>
          <span className="char-scroll-hint__arrow">↓</span>
        </div>
      </section>

      {/* Back-to-top button */}
      <button
        type="button"
        className={`char-back-top${showBack ? " is-visible" : ""}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        ↑ Menu
      </button>
    </>
  );
}
