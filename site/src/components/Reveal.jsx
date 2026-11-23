import { useEffect, useRef, useState } from "react";

/**
 * High-performance, vanilla JS scroll reveal component using IntersectionObserver.
 * Translates elements by 24px and fades opacity from 0 to 1 over 600ms ease-out.
 * Fully supports prefers-reduced-motion and configurable stagger delays.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${revealed ? "is-revealed" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}s`,
        "--reveal-y": `${y}px`,
      }}
    >
      {children}
    </div>
  );
}
