import { useEffect, useRef, useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import IntroSection from './components/sections/IntroSection';
import YouthBenefitsSection from './components/sections/YouthBenefitsSection';
import FeaturesSection from './components/sections/FeaturesSection';
import TechStackSection from './components/sections/TechStackSection';
import RoadmapSection from './components/sections/RoadmapSection';
import RevenueSection from './components/sections/RevenueSection';
import ExtraInfoSection from './components/sections/ExtraInfoSection';
import ContactSection from './components/sections/ContactSection';

export interface SectionMeta {
  id: string;
  label: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'problems-among-youth', label: 'Problems Among Youth' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'introducing-voxa', label: 'Introducing VOXA' },
  { id: 'how-voxa-solves', label: 'How VOXA Solves' },
  { id: 'voxa-features', label: 'VOXA Features' },
  { id: 'how-we-made-voxa', label: 'How We Made VOXA' },
  { id: 'future-goals', label: 'Future Goals' },
  { id: 'potential-revenue', label: 'Potential & Revenue' },
  { id: 'more-about-voxa', label: 'More About VOXA' },
  { id: 'voxa-links', label: 'VOXA Links' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="app-root">
      {/* Scroll progress bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <Navigation sections={SECTIONS} activeSection={activeSection} />

      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <IntroSection />
        <YouthBenefitsSection />
        <FeaturesSection />
        <TechStackSection />
        <RoadmapSection />
        <RevenueSection />
        <ExtraInfoSection />
        <ContactSection />
      </main>
    </div>
  );
}
