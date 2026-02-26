import { useEffect, useRef } from 'react';
import { Heart, Zap, Shield, Eye, Layout, TrendingUp } from 'lucide-react';

const DEV_PRINCIPLES = [
  {
    icon: Heart,
    title: 'Designed for Youth Mental Health',
    desc: 'Every design decision was made with the emotional needs of struggling youth at the center.',
  },
  {
    icon: Zap,
    title: 'Real-Time Backend System',
    desc: 'Built with WebSocket technology for instant, low-latency connections between users.',
  },
  {
    icon: Shield,
    title: 'Secure Authentication System',
    desc: 'Anonymous yet secure login system that protects user identity while enabling safe connections.',
  },
  {
    icon: Eye,
    title: 'User Privacy-Focused Architecture',
    desc: 'Privacy-by-design architecture ensures no personal data is stored or shared without consent.',
  },
  {
    icon: Layout,
    title: 'Simple and Minimal UI/UX',
    desc: 'Clean, distraction-free interface designed to reduce anxiety and make navigation effortless.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Infrastructure Planning',
    desc: 'Built to scale globally, supporting millions of concurrent users as the platform grows.',
  },
];

const TECH_STACK = [
  { name: 'WebSocket', desc: 'Real-time' },
  { name: 'React', desc: 'Frontend' },
  { name: 'Node.js', desc: 'Backend' },
  { name: 'End-to-End Encryption', desc: 'Security' },
  { name: 'Anonymous Auth', desc: 'Privacy' },
  { name: 'Cloud Infra', desc: 'Scalability' },
];

export default function TechStackSection() {
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
    <section id="how-we-made-voxa" className="section-base section-gradient" aria-labelledby="tech-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">Behind the Scenes</span>
          <h2 id="tech-heading" className="section-title">How We Made VOXA</h2>
          <p className="section-subtitle">
            Built with purpose, precision, and a deep commitment to youth mental health and user privacy.
          </p>
        </div>

        <div className="tech-principles-grid">
          {DEV_PRINCIPLES.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="tech-principle-card reveal-item"
                ref={(el) => { itemsRef.current[i + 1] = el; }}
                style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              >
                <div className="tech-principle-icon-wrap">
                  <Icon className="tech-principle-icon" aria-hidden="true" />
                </div>
                <h3 className="tech-principle-title">{principle.title}</h3>
                <p className="tech-principle-desc">{principle.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="tech-stack-section reveal-item" ref={(el) => { itemsRef.current[DEV_PRINCIPLES.length + 1] = el; }}>
          <h3 className="tech-stack-heading">Technology Stack</h3>
          <div className="tech-stack-grid">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="tech-stack-badge">
                <span className="tech-stack-name">{tech.name}</span>
                <span className="tech-stack-desc">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
