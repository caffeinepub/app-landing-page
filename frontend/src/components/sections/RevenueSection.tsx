import { useEffect, useRef, useState } from 'react';

const REVENUE_STREAMS = [
  { label: 'Therapist Subscription Model', value: 85, color: '#a78bfa', desc: 'Monthly/annual plans for therapists to list and offer services' },
  { label: 'Premium User Subscription', value: 70, color: '#818cf8', desc: 'Enhanced features for users seeking deeper support' },
  { label: 'Commission on Therapy Sessions', value: 60, color: '#c4b5fd', desc: 'Platform fee on each booked therapy session' },
  { label: 'Featured Therapist Promotion', value: 50, color: '#7c3aed', desc: 'Promoted placement for therapists in search results' },
  { label: 'Mental Wellness Partnerships', value: 75, color: '#6d28d9', desc: 'B2B partnerships with wellness brands and organizations' },
  { label: 'Scalable Global Market', value: 90, color: '#a78bfa', desc: 'Expanding to international markets with high demand' },
  { label: 'High Demand in Youth Segment', value: 95, color: '#818cf8', desc: 'Targeting the fastest-growing mental health market segment' },
];

const MARKET_STATS = [
  { value: '$240B', label: 'Global Mental Health Market' },
  { value: '1.2B', label: 'Youth Affected Worldwide' },
  { value: '76%', label: 'Youth Prefer Anonymous Support' },
  { value: '3x', label: 'Market Growth Rate' },
];

export default function RevenueSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (entry.target === sectionRef.current) {
              setAnimated(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="potential-revenue" ref={sectionRef} className="section-base section-gradient" aria-labelledby="revenue-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">Business Model</span>
          <h2 id="revenue-heading" className="section-title">Potential & Revenue</h2>
          <p className="section-subtitle">
            VOXA operates in one of the fastest-growing markets globally — youth mental health — with multiple sustainable revenue streams.
          </p>
        </div>

        {/* Market Stats */}
        <div className="revenue-stats-grid reveal-item" ref={(el) => { itemsRef.current[1] = el; }}>
          {MARKET_STATS.map((stat) => (
            <div key={stat.label} className="revenue-stat-card">
              <span className="revenue-stat-value">{stat.value}</span>
              <span className="revenue-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Revenue Streams */}
        <div className="revenue-streams reveal-item" ref={(el) => { itemsRef.current[2] = el; }}>
          <h3 className="revenue-streams-title">Revenue Streams</h3>
          {REVENUE_STREAMS.map((stream, i) => (
            <div key={stream.label} className="revenue-bar-row" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="revenue-bar-header">
                <span className="revenue-bar-label">{stream.label}</span>
                <span className="revenue-bar-pct">{stream.value}%</span>
              </div>
              <div className="revenue-bar-track">
                <div
                  className="revenue-bar-fill"
                  style={{
                    width: animated ? `${stream.value}%` : '0%',
                    backgroundColor: stream.color,
                    transition: `width 1s ease ${i * 100}ms`,
                  }}
                  role="progressbar"
                  aria-valuenow={stream.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={stream.label}
                />
              </div>
              <p className="revenue-bar-desc">{stream.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
