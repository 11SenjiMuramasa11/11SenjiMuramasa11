import { stack } from "../data.js";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

export default function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <span className="section__num" aria-hidden="true">
          03
        </span>
        <Reveal>
          <SectionHead
            id="stack-title"
            number="03"
            label="Stack"
            title="What I build with, what I test with."
            sub="The tools that show up in the work above."
          />
        </Reveal>

        <div className="stack">
          {stack.map((group, index) => (
            <Reveal
              key={group.label}
              className="stack__group"
              delay={index * 0.05}
              y={16}
            >
              <p className="stack__label">
                <i aria-hidden="true" />
                {group.label}
              </p>
              <div className="stack__items">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}

          <p className="stack__note">
            Firebase covers Firestore, Auth, Hosting, and Cloud Functions. AWS
            covers EC2, S3, IAM, and Route 53.
          </p>
        </div>
      </div>
    </section>
  );
}
