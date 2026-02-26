import { useEffect, useRef } from 'react';
import { MessageCircle, Users, ShieldOff, Stethoscope, Heart, MessageSquare, Globe } from 'lucide-react';

const HOW_VOXA_SOLVES = [
  {
    icon: MessageCircle,
    title: 'Instant Anonymous Chat/Call',
    desc: 'Connect instantly with real people through anonymous chat or voice calls — no registration required.',
  },
  {
    icon: Users,
    title: 'Real People Online',
    desc: 'Connects users with real, verified humans online — not bots or automated responses.',
  },
  {
    icon: ShieldOff,
    title: 'Removes Fear of Judgment',
    desc: 'Complete anonymity ensures you can speak freely without worrying about being judged or identified.',
  },
  {
    icon: Stethoscope,
    title: 'Therapist Consultation',
    desc: 'Offers optional therapist consultation for those who need professional mental health support.',
  },
  {
    icon: Heart,
    title: 'Encourages Emotional Expression',
    desc: 'A safe environment that actively encourages you to express your feelings and emotions openly.',
  },
  {
    icon: MessageSquare,
    title: 'Meaningful Conversations',
    desc: 'Builds deep, meaningful conversations that go beyond surface-level small talk.',
  },
  {
    icon: Globe,
    title: 'Supportive Community',
    desc: 'Creates a global supportive community where everyone looks out for each other.',
  },
];

export default function YouthBenefitsSection() {
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
    <section id="how-voxa-solves" className="section-base section-gradient" aria-labelledby="how-solves-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">Our Approach</span>
          <h2 id="how-solves-heading" className="section-title">How VOXA Solves These Problems</h2>
          <p className="section-subtitle">
            VOXA tackles youth mental health challenges through a combination of technology, empathy, and real human connection.
          </p>
        </div>

        <div className="benefits-grid">
          {HOW_VOXA_SOLVES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="benefit-card reveal-item"
                ref={(el) => { itemsRef.current[i + 1] = el; }}
                style={{ transitionDelay: `${(i % 4) * 100}ms` }}
              >
                <div className="benefit-icon-wrap">
                  <Icon className="benefit-icon" aria-hidden="true" />
                </div>
                <h3 className="benefit-title">{item.title}</h3>
                <p className="benefit-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
