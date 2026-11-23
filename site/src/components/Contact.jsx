import { useEffect, useRef, useState } from "react";
import { identity } from "../data.js";
import { Arrow, Check, Copy, Github, Linkedin, Mail } from "./icons.jsx";
import Reveal from "./Reveal.jsx";
import SectionBar from "./SectionBar.jsx";
import { sounds } from "../audio.js";

const channels = [
  {
    id: "email",
    label: "Direct Email",
    Icon: Mail,
    value: identity.email,
    href: `mailto:${identity.email}`,
    cta: "Send Message",
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn Network",
    Icon: Linkedin,
    value: "in/jjprades",
    href: identity.linkedin,
    cta: "Connect on LinkedIn",
    external: true,
  },
  {
    id: "github",
    label: "GitHub Repositories",
    Icon: Github,
    value: identity.handle,
    href: identity.github,
    cta: "Visit GitHub",
    external: true,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState("");
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopyEmail = async () => {
    let success = false;
    try {
      await navigator.clipboard.writeText(identity.email);
      success = true;
    } catch {
      const input = document.createElement("input");
      input.value = identity.email;
      document.body.appendChild(input);
      input.select();
      try {
        success = document.execCommand("copy");
      } catch {
        success = false;
      }
      input.remove();
    }

    if (success) {
      sounds.playSuccess();
      setCopied("Copied to clipboard");
    } else {
      setCopied("Copy failed");
    }

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(""), 2400);
  };

  return (
    <section className="section section--sky" id="contact" aria-labelledby="contact-title">
      <Reveal>
        <SectionBar
          id="contact-title"
          title="Contact"
          meta="Inquiries & Opportunities"
          emblem="seal"
        />
      </Reveal>

      <div className="wrap">
        <Reveal delay={0.06}>
          <div className="pro-contact-container">
            {/* Header Text */}
            <div className="pro-contact-intro">
              <h2 className="contact-title">Let's connect.</h2>
              <p className="contact-lead">
                Open to software engineering internships, collaborative builds, and QA testing roles.
              </p>
            </div>

            {/* Compact 3-Column Channels Grid */}
            <div className="pro-channels-grid">
              {channels.map((chan) => (
                <div key={chan.id} className="pro-channel-card" onMouseEnter={() => sounds.playHover()}>
                  <div className="pro-channel-card__top">
                    <div className="pro-channel-icon">
                      <chan.Icon />
                    </div>
                    <span className="pro-channel-label">{chan.label}</span>
                  </div>

                  <span className="pro-channel-val">{chan.value}</span>

                  <a
                    href={chan.href}
                    target={chan.external ? "_blank" : undefined}
                    rel={chan.external ? "noreferrer" : undefined}
                    className="pro-channel-link"
                    onClick={() => sounds.playClick()}
                  >
                    <span>{chan.cta}</span>
                    <Arrow />
                  </a>
                </div>
              ))}
            </div>

            {/* Compact Copy Email Bar */}
            <div className="contact-action-bar">
              <button
                type="button"
                className="copy-email-btn"
                onClick={handleCopyEmail}
                onMouseEnter={() => sounds.playHover()}
              >
                <Copy />
                <span>Copy: <b>{identity.email}</b></span>
              </button>

              {copied && (
                <div className="copy-toast" role="status" aria-live="polite">
                  <Check /> {copied}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
