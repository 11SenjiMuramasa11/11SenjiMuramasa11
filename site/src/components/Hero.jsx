import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { identity } from "../data.js";

const stars = Array.from({ length: 46 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  delay: `${(index % 9) * 0.55}s`,
  size: index % 7 === 0 ? 3 : 2,
}));

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 18 });
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollLift = useTransform(scrollYProgress, [0, 1], [0, 46]);

  const onPointerMove = (event) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    event.currentTarget.style.setProperty("--my", `${y * 100}%`);
    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.08 },
    },
  };

  const fade = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease },
    },
  };

  const line = {
    hidden: { y: "112%" },
    show: { y: "0%", transition: { duration: 1.05, ease } },
  };

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label="Introduction"
    >
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="stars" aria-hidden="true">
        {stars.map((star, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="hero__frame" aria-hidden="true">
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
      </div>

      <motion.div
        className="hero__inner"
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <div>
          <motion.p className="eyebrow" variants={reduce ? undefined : fade}>
            <i aria-hidden="true" />
            {identity.handle}
          </motion.p>

          <h1 className="hero__name">
            <span className="hero__line">
              <motion.span variants={reduce ? undefined : line}>
                {identity.first}
              </motion.span>
            </span>
            <span className="hero__line">
              <motion.span variants={reduce ? undefined : line}>
                {identity.last}
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="hero__alias"
            variants={reduce ? undefined : fade}
          >
            <span aria-hidden="true" />
            {identity.alias}
            <span aria-hidden="true" />
          </motion.div>

          <motion.p className="hero__role" variants={reduce ? undefined : fade}>
            {identity.role}
          </motion.p>
          <motion.p
            className="hero__signature"
            variants={reduce ? undefined : fade}
          >
            &ldquo;{identity.signature}&rdquo;
          </motion.p>
          <motion.p className="hero__intro" variants={reduce ? undefined : fade}>
            {identity.intro}
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={reduce ? undefined : fade}
          >
            <a className="btn btn--solid" href="#work">
              View selected work
              <i aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href={`mailto:${identity.email}`}>
              Email me
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__portrait-wrap"
          style={reduce ? undefined : { y: scrollLift }}
        >
          <motion.div
            className="hero__portrait"
            style={reduce ? undefined : { x: portraitX, y: portraitY }}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
          >
            <span className="hero__portrait-glow" aria-hidden="true" />
            <span className="orbit orbit--outer" aria-hidden="true" />
            <span className="orbit orbit--inner" aria-hidden="true" />
            <span className="diamond diamond--top" aria-hidden="true" />
            <span className="diamond diamond--right" aria-hidden="true" />
            <span className="diamond diamond--bottom" aria-hidden="true" />
            <span className="diamond diamond--left" aria-hidden="true" />
            <div className="hero__disc">
              <img
                src="./portrait.png"
                alt="Illustrated portrait of Justine James Prades"
                width="470"
                height="470"
                fetchPriority="high"
              />
            </div>
            <div className="hero__plate">
              <i aria-hidden="true" />
              Open to internships
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="hero__meta">
        <span>BSIT — NU Laguna</span>
        <i aria-hidden="true" />
        <span>4 projects</span>
        <i aria-hidden="true" />
        <span>Laravel / React / Node.js</span>
        <span>Portfolio</span>
      </div>
    </section>
  );
}
