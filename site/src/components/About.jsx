import { about, stats } from "../data.js";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <span className="section__num" aria-hidden="true">
          01
        </span>
        <Reveal>
          <SectionHead
            id="about-title"
            number="01"
            label="About"
            title="Student, builder, tester."
            sub="The short version: I like systems that hold up."
          />
        </Reveal>

        <div className="about">
          <Reveal className="about__copy" delay={0.08}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.16}>
            <dl className="about__notes">
              {about.notes.map((note) => (
                <div className="about__note" key={note.label}>
                  <dt>{note.label}</dt>
                  <dd>{note.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
