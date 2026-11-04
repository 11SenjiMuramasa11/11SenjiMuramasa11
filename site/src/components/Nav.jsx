import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navItems } from "../data.js";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);

    if (!open) return;

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    menuRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav__inner">
          <a className="brand" href="#top" aria-label="Muramasa, back to top">
            <span className="brand__mark" aria-hidden="true" />
            Muramasa
          </a>

          <nav className="nav__links" aria-label="Sections">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={`nav__link${
                  active === item.id ? " is-active" : ""
                }`}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className={`nav__toggle${open ? " is-open" : ""}`}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="menu"
            aria-label="Mobile sections"
            ref={menuRef}
            tabIndex={-1}
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                className="menu__link"
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                initial={reduce ? false : { opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: reduce ? 0 : 0.05 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <i aria-hidden="true">0{index + 1}</i>
                {item.label}
              </motion.a>
            ))}
            <p className="menu__meta">Software developer &amp; QA</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
