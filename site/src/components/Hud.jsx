import { useState } from "react";
import { flushSync } from "react-dom";
import { sounds } from "../audio.js";

function SoundIcon({ enabled }) {
  if (!enabled) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hud-sound-svg">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hud-sound-svg">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function ThemeIcon({ light }) {
  return light ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hud-sound-svg" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hud-sound-svg" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export default function Hud() {
  const [soundActive, setSoundActive] = useState(sounds.isEnabled());
  // index.html sets data-theme before first paint; this just mirrors and flips it.
  const [light, setLight] = useState(() => document.documentElement.dataset.theme === "light");

  const handleThemeToggle = (e) => {
    const next = !light;
    const apply = () => {
      document.documentElement.dataset.theme = next ? "light" : "dark";
      flushSync(() => setLight(next)); // label/icon must be in the same snapshot as the colours
    };
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* private mode: the choice just won't persist */
    }
    sounds.playClick?.();

    if (!document.startViewTransition) return apply();
    // Reduced motion: no sweeping circle, just the short cross-fade defined in CSS.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return document.startViewTransition(apply);

    // New theme grows out of the toggle as a circle (a rare, deliberate action, so it can take ~half a second).
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(0.77, 0, 0.175, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  const handleSoundToggle = () => {
    const nextState = sounds.toggle();
    setSoundActive(nextState);
  };

  return (
    <>
    <div className="hud-sound-corner-fixed">
      <button
        type="button"
        className="hud-sound-button hud-theme-button"
        onClick={handleThemeToggle}
        onMouseEnter={() => sounds.playHover()}
        aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
        aria-pressed={light}
      >
        <ThemeIcon light={light} />
        <span className="hud-sound-button__label">{light ? "DARK" : "LIGHT"}</span>
      </button>
      <button
        type="button"
        className={`hud-sound-button ${soundActive ? "is-active" : "is-muted"}`}
        onClick={handleSoundToggle}
        onMouseEnter={() => sounds.playHover()}
        title={soundActive ? "Mute UI sounds" : "Enable UI sounds"}
        aria-label={soundActive ? "Mute audio" : "Unmute audio"}
      >
        <SoundIcon enabled={soundActive} />
        <span className="hud-sound-button__label">{soundActive ? "FX ON" : "MUTED"}</span>
      </button>
    </div>
    </>
  );
}
