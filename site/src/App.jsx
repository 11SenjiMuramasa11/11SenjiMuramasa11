import { motion, useScroll, useSpring } from "motion/react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Stack from "./components/Stack.jsx";
import Background from "./components/Background.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <motion.div
        className="progress"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <div className="page">
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Work />
          <Stack />
          <Background />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
