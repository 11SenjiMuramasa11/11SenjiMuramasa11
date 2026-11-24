import { useEffect } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { lenis, scrollToTarget } from "./smoothScroll.js";
import ParallaxSky from "./components/ParallaxSky.jsx";
import Hud from "./components/Hud.jsx";
import CharacterMenu from "./components/CharacterMenu.jsx";
import Work from "./components/Work.jsx";
import Stack from "./components/Stack.jsx";
import Background from "./components/Background.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function Corners() {
  return (
    <div className="frame" aria-hidden="true">
      {["tl", "tr", "bl", "br"].map((corner) => (
        <span className={`frame__corner frame__corner--${corner}`} key={corner}>
          <svg viewBox="0 0 80 80" fill="none">
            <path
              d="M2 44V2h42M2 22h12M22 2v12"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M10 10h14v14z" fill="currentColor" opacity=".35" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 28,
    restDelta: 0.001,
  });

  // Deep links like #contact (the GitHub README cards use them): the browser looks for the hash
  // before React renders the section, so jump there once mounted, and again after fonts and images settle.
  useEffect(() => {
    const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (!el) return;
    // Lenis caches the page height; re-measure first or it clamps the jump to the top
    const go = () => { lenis?.resize(); scrollToTarget(el, { instant: true }); };
    requestAnimationFrame(go);
    if (document.readyState !== "complete") window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  return (
    <div className="genshin-app">
      <a className="skip" href="#work">
        Skip to projects
      </a>

      {/* Pure black background */}
      <ParallaxSky />

      {/* iOS-smooth Scroll Progress */}
      <m.div className="progress progress--top" style={{ scaleX }} aria-hidden="true" />
      <m.div className="progress progress--side" style={{ scaleY: scaleX }} aria-hidden="true" />

      {/* Antique Gold Corner Filigree */}
      <Corners />

      {/* Floating nav + sound toggle — hidden on char-screen via CSS */}
      <Hud />

      {/* Main Content */}
      <main id="main">
        {/* Genshin character-menu first screen */}
        <CharacterMenu />

        {/* Scrollable sections */}
        <Work />
        <Stack />
        <Background />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
