import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion, domAnimation } from "motion/react";
import App from "./App.jsx";
import "./styles.css";
import "./genshin.css";
import { initSmoothScroll } from "./smoothScroll.js";

initSmoothScroll();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Only the animation features the site uses (no layout/drag); `strict` stops a full `motion.*` sneaking back in. */}
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>,
);
