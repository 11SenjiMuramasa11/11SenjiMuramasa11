import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { background } from "../data.js";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

export default function Background() {
  const timelineRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 62%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="section section--panel"
      id="background"
      aria-labelledby="background-title"
    >
      <div className="wrap">
        <span className="section__num" aria-hidden="true">
          04
        </span>
        <div className="background">
          <div className="background__sticky">
            <Reveal>
              <SectionHead
                id="background-title"
                number="04"
                label="Background"
                title="The paper trail."
                sub="School, certifications, and where the foundations come from."
              />
            </Reveal>
          </div>

          <ol className="timeline" ref={timelineRef}>
            <motion.span
              className="timeline__fill"
              aria-hidden="true"
              style={reduce ? undefined : { scaleY: fill }}
            />
            {background.map((item, index) => (
              <Reveal
                key={`${item.when}-${item.title}`}
                className={`timeline__item${
                  item.kind === "Certification" ? " is-cert" : ""
                }`}
                delay={index * 0.04}
                y={18}
              >
                <span className="timeline__when">{item.when}</span>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__where">{item.where}</p>
                <span className="timeline__kind">{item.kind}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
