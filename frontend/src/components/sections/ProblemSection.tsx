import { useEffect, useRef } from 'react';

const PROBLEMS = [
  { emoji: '😔', label: 'Loneliness' },
  { emoji: '🌧️', label: 'Depression' },
  { emoji: '😰', label: 'Anxiety' },
  { emoji: '🌀', label: 'Overthinking' },
  { emoji: '💔', label: 'Relationship Heartbreak' },
  { emoji: '🕸️', label: 'Toxic Friendships' },
  { emoji: '🤔', label: 'Career Confusion' },
  { emoji: '😨', label: 'Fear of Failure' },
  { emoji: '🏠', label: 'Family Pressure' },
  { emoji: '📊', label: 'Social Comparison' },
  { emoji: '📉', label: 'Low Self-Esteem' },
  { emoji: '🤝', label: 'Lack of Emotional Support' },
  { emoji: '🪞', label: 'Identity Crisis' },
  { emoji: '📱', label: 'Phone Addiction' },
  { emoji: '🆘', label: 'Suicidal Thoughts' },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problems-among-youth" ref={sectionRef} className="section-base section-dark" aria-labelledby="problems-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">The Reality</span>
          <h2 id="problems-heading" className="section-title">Problems Among Youth</h2>
          <p className="section-subtitle">
            Millions of young people silently struggle every day. These are the real challenges they face — often alone, without support.
          </p>
        </div>

        <div className="problems-grid">
          {PROBLEMS.map((problem, i) => (
            <div
              key={problem.label}
              className={`problem-card reveal-item ${problem.label === 'Suicidal Thoughts' ? 'problem-card-urgent' : ''}`}
              ref={(el) => { itemsRef.current[i + 1] = el; }}
              style={{ transitionDelay: `${(i % 5) * 80}ms` }}
            >
              <span className="problem-emoji" aria-hidden="true">{problem.emoji}</span>
              <span className="problem-label">{problem.label}</span>
            </div>
          ))}
        </div>

        <div className="problems-note reveal-item" ref={(el) => { itemsRef.current[PROBLEMS.length + 1] = el; }}>
          <p>
            <strong>You are not alone.</strong> VOXA was built to address every one of these struggles with empathy, anonymity, and real human connection.
          </p>
        </div>
      </div>
    </section>
  );
}
