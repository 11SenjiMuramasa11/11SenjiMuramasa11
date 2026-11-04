import { identity } from "../data.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__end">
          <span aria-hidden="true" />
          <i aria-hidden="true" />
          <p>Muramasa</p>
          <i aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
        <div className="footer__base">
          <span>
            {identity.name} — {identity.role}
          </span>
          <span>Built with React, Vite, and Motion</span>
        </div>
      </div>
    </footer>
  );
}
