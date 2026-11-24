import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Smooth, momentum-style page scrolling (same setup as generosomm.dev: Lenis, lerp 0.09).
// Off for touch-first devices (native momentum is already right there) and reduced motion.
export let lenis = null;

export function initSmoothScroll() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchFirst = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (reduce || touchFirst) return null;
  lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
  return lenis;
}

// Scroll to an element or a Y position, through Lenis when it's running so the two never fight.
export function scrollToTarget(target, { instant = false } = {}) {
  const el = typeof target === "number" ? null : target;
  if (lenis) {
    const offset = el ? -parseFloat(getComputedStyle(el).scrollMarginTop || 0) : 0;
    return lenis.scrollTo(el ?? target, { offset, immediate: instant });
  }
  const behavior = instant ? "instant" : "smooth";
  if (el) el.scrollIntoView({ behavior });
  else window.scrollTo({ top: target, behavior });
}
