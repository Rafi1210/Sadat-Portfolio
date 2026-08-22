import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/common/ScrollProgress';
import CustomCursor from '@/components/common/CustomCursor';
import MeshBackground from '@/components/common/MeshBackground';

import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import ProjectDetails from '@/pages/ProjectDetails';
import About from '@/pages/About';
import Experience from '@/pages/Experience';
import Contact from '@/pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf;
    function rafLoop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(rafLoop);
    }
    raf = requestAnimationFrame(rafLoop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen bg-bg text-ink antialiased">
      <MeshBackground />
      <ScrollProgress />
      <CustomCursor />
      <SmoothScroll />
      <ScrollToTop />
      <Navbar />

      <main className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}