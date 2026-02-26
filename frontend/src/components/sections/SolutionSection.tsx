import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const SOLUTIONS = [
  { title: 'Safe Emotional Support System', desc: 'A dedicated space where you can express yourself without fear of judgment or consequences.' },
  { title: 'Anonymous Communication', desc: 'Connect and share your feelings without revealing your identity — complete privacy guaranteed.' },
  { title: 'Non-Judgmental Listening', desc: 'Every conversation is met with empathy and understanding, never criticism or dismissal.' },
  { title: 'Access to Mental Health Guidance', desc: 'Get connected to professional mental health resources and guidance when you need it most.' },
  { title: 'Real Human Connection', desc: 'Talk to real people who understand what you\'re going through — not bots or automated responses.' },
  { title: 'Like-Minded Community', desc: 'Find others who share your experiences and build meaningful connections that last.' },
  { title: 'Professional Therapist Access', desc: 'Book sessions with verified therapists who specialize in youth mental health challenges.' },
  { title: '24/7 Support Availability', desc: 'Emotional support doesn\'t follow a schedule — VOXA is always there when you need it.' },
];

export default function SolutionSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="solutions" className="section-base section-gradient" aria-labelledby="solutions-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">The Answer</span>
          <h2 id="solutions-heading" className="section-title">Solutions</h2>
          <p className="section-subtitle">
            VOXA provides a comprehensive set of tools and approaches to address the mental health crisis among youth.
          </p>
        </div>

        <div className="solutions-grid">
          {SOLUTIONS.map((solution, i) => (
            <div
              key={solution.title}
              className="solution-card reveal-item"
              ref={(el) => { itemsRef.current[i + 1] = el; }}
              style={{ transitionDelay: `${(i % 4) * 100}ms` }}
            >
              <div className="solution-icon-wrap">
                <CheckCircle className="solution-icon" aria-hidden="true" />
              </div>
              <div className="solution-content">
                <h3 className="solution-title">{solution.title}</h3>
                <p className="solution-desc">{solution.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
