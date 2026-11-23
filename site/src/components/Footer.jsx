import { identity } from "../data.js";
import { Diamond } from "./icons.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__note">
          {identity.name} — {identity.role}
        </p>
        <span className="footer__diamond" aria-hidden="true">
          <Diamond />
        </span>
        <p className="footer__uid">
          Built with React, Vite, Motion
        </p>
      </div>
    </footer>
  );
}
