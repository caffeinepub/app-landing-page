import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { SectionMeta } from '../App';

interface NavigationProps {
  sections: SectionMeta[];
  activeSection: string;
}

export default function Navigation({ sections, activeSection }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav-inner">
        {/* Logo */}
        <button onClick={scrollToTop} className="nav-logo" aria-label="VOXA - Go to top">
          <span className="nav-logo-icon" aria-hidden="true">
            <img
              src="/assets/generated/voxa-logo.dim_256x256.png"
              alt="VOXA logo"
              width={28}
              height={28}
              style={{ objectFit: 'contain' }}
            />
          </span>
          <span className="nav-logo-text">VOXA</span>
        </button>

        {/* Desktop nav links */}
        <ul className="nav-links" role="list">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`nav-link ${activeSection === id ? 'nav-link-active' : ''}`}
                aria-current={activeSection === id ? 'true' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu" role="dialog" aria-label="Mobile navigation">
          <ul role="list">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`nav-mobile-link ${activeSection === id ? 'nav-link-active' : ''}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
