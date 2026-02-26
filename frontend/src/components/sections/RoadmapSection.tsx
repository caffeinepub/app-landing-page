import { useEffect, useRef } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const CURRENT_FEATURES = [
  'Real-time anonymous chat',
  'Anonymous username login',
  'Online user discovery',
  'Mood-based matching',
  'Therapist profiles',
  'Secure messaging',
  'Voice call feature',
  'Subscription system',
];

const UPCOMING_FEATURES = [
  { label: 'AI Emotional Assistant', desc: 'An AI companion available 24/7 for emotional support' },
  { label: 'Video Call Support', desc: 'Face-to-face anonymous video sessions' },
  { label: 'Group Support Rooms', desc: 'Join themed group conversations for shared experiences' },
  { label: 'Mood Tracking Dashboard', desc: 'Track your emotional journey over time' },
  { label: 'Daily Mental Wellness Content', desc: 'Curated articles, exercises, and tips' },
  { label: 'Anonymous Community Forums', desc: 'Topic-based forums for deeper community engagement' },
  { label: 'International Expansion', desc: 'Multi-language support for global reach' },
  { label: 'Mobile App Global Launch', desc: 'Native iOS and Android apps for everyone' },
];

export default function RoadmapSection() {
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
    <section id="future-goals" className="section-base section-dark" aria-labelledby="roadmap-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">Roadmap</span>
          <h2 id="roadmap-heading" className="section-title">Future Goals & Upcoming Features</h2>
          <p className="section-subtitle">
            VOXA is constantly evolving. Here's what's live today and what's coming next.
          </p>
        </div>

        <div className="roadmap-layout">
          {/* Current Features */}
          <div className="roadmap-col reveal-item" ref={(el) => { itemsRef.current[1] = el; }}>
            <div className="roadmap-col-header roadmap-col-current">
              <CheckCircle className="roadmap-col-icon" aria-hidden="true" />
              <h3 className="roadmap-col-title">Live Now</h3>
            </div>
            <ul className="roadmap-list" role="list">
              {CURRENT_FEATURES.map((feature) => (
                <li key={feature} className="roadmap-item roadmap-item-current">
                  <CheckCircle className="roadmap-item-icon roadmap-item-icon-current" size={16} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Features */}
          <div className="roadmap-col reveal-item" ref={(el) => { itemsRef.current[2] = el; }} style={{ transitionDelay: '150ms' }}>
            <div className="roadmap-col-header roadmap-col-upcoming">
              <Clock className="roadmap-col-icon" aria-hidden="true" />
              <h3 className="roadmap-col-title">Coming Soon</h3>
            </div>
            <ul className="roadmap-list" role="list">
              {UPCOMING_FEATURES.map((feature) => (
                <li key={feature.label} className="roadmap-item roadmap-item-upcoming">
                  <Clock className="roadmap-item-icon roadmap-item-icon-upcoming" size={16} aria-hidden="true" />
                  <div>
                    <span className="roadmap-item-label">{feature.label}</span>
                    <span className="roadmap-item-desc">{feature.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
