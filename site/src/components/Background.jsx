import { education, identity } from "../data.js";
import { Arrow } from "./icons.jsx";
import Reveal from "./Reveal.jsx";
import SectionBar from "./SectionBar.jsx";
import { sounds } from "../audio.js";

// ─── EDITABLE CERTIFICATIONS ARRAY ──────────────────────────────────────────
// Each cert: { title, issuer, date, image, pdf, desc }
const CERTS_DATA = [
  {
    id: "network-security",
    title: "IT Specialist: Network Security",
    issuer: "Certiport · Pearson VUE",
    date: "May 2026",
    image: "certs/network-security.webp",
    pdf: "certs/network-security.pdf",
    desc: "Demonstrates foundational knowledge in network security, defense-in-depth, security policies, and mitigation techniques.",
  },
  {
    id: "salesforce-agentblazer",
    title: "Salesforce Agentblazer Workshop",
    issuer: "Salesforce Trailhead",
    date: "August 2025",
    image: "certs/salesforce-agentblazer.webp",
    pdf: "certs/salesforce-agentblazer.pdf",
    desc: "Autonomous AI agent development, Trailhead prompt design, and enterprise workflow automation workshop.",
  },
  {
    id: "databases",
    title: "IT Specialist: Databases",
    issuer: "Certiport · Pearson VUE",
    date: "March 2025",
    image: "certs/databases.webp",
    pdf: "certs/databases.pdf",
    desc: "Covers relational database fundamentals, normalization, queries, stored procedures, data integrity, and ACID properties.",
  },
];

export default function Background() {
  return (
    <section className="section section--sky section--tight" id="certifications" aria-labelledby="cert-title">
      <Reveal>
        <SectionBar
          id="cert-title"
          title="Certifications"
          meta={
            <a href={identity.linkedin} target="_blank" rel="noreferrer" className="cert-linkedin-link secbar__link" onMouseEnter={() => sounds.playHover?.()} > <span>View on LinkedIn</span> <Arrow /> </a>
          }
          emblem="shield"
        />
      </Reveal>

      <div className="wrap">
        <Reveal delay={0.06}>

          {/* 3-Column Certificate Cards Grid */}
          <div className="cert-cards-grid">
            {CERTS_DATA.map((cert) => (
              <div
                key={cert.id}
                className="cert-card-wrap"
                onMouseEnter={() => sounds.playHover?.()}
              >
                <div className="cert-card">
                  {/* Clickable image → opens PDF in a new tab */}
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-img-link"
                    aria-label={`Open ${cert.title} certificate (PDF)`}
                    onClick={() => sounds.playClick?.()}
                  >
                    <div className="cert-img-frame">
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate`}
                        className="cert-img"
                        width="400"
                        height="300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </a>

                  {/* Metadata */}
                  <div className="cert-card__body">
                    <h3 className="cert-card__title">{cert.title}</h3>

                    <div className="cert-card__meta-row">
                      <span className="cert-card__issuer">{cert.issuer}</span>
                      <span className="cert-card__date">{cert.date}</span>
                    </div>

                    <p className="cert-card__desc">{cert.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education Journey */}
          <div className="edu-timeline-section">
            <h3 className="edu-section-title">Education Journey</h3>

            <div className="edu-list">
              {education.map((edu, i) => (
                <div key={i} className="edu-card" onMouseEnter={() => sounds.playHover?.()}>
                  <div className="edu-card__period">
                    <span>{edu.period}</span>
                  </div>
                  <div className="edu-card__info">
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <p className="edu-institution">{edu.institution}</p>
                    <p className="edu-details">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
