import { useEffect, useRef } from 'react';
import { Wifi, UserX, UserCheck, BookOpen, Phone, RefreshCw, Sparkles, Smile, Lock, CreditCard } from 'lucide-react';

const FEATURES = [
  {
    icon: Wifi,
    title: 'Real-Time Online User Connection',
    desc: 'See who\'s online and connect instantly with real people in real-time.',
  },
  {
    icon: UserX,
    title: 'Anonymous Username Login',
    desc: 'Sign in with just a username — no email, no personal data required.',
  },
  {
    icon: UserCheck,
    title: 'Verified Therapist Access',
    desc: 'Connect with professionally verified therapists for expert mental health support.',
  },
  {
    icon: BookOpen,
    title: 'Therapist Profiles & Booking',
    desc: 'Browse therapist profiles, read reviews, and book sessions at your convenience.',
  },
  {
    icon: Phone,
    title: 'Call & Messaging Feature',
    desc: 'Communicate via text chat or voice calls — choose what feels most comfortable.',
  },
  {
    icon: RefreshCw,
    title: 'Refresh Real-Time Users',
    desc: 'Refresh the online user list to find new people to connect with at any time.',
  },
  {
    icon: Sparkles,
    title: 'Like-Minded People Matching',
    desc: 'Get matched with people who share similar experiences and emotional states.',
  },
  {
    icon: Smile,
    title: 'Mood-Based Connection',
    desc: 'Select your current mood and connect with others who understand exactly how you feel.',
  },
  {
    icon: Lock,
    title: 'Secure & Private Conversations',
    desc: 'End-to-end encrypted conversations ensure your privacy is always protected.',
  },
  {
    icon: CreditCard,
    title: 'Therapist Subscription System',
    desc: 'Flexible subscription plans for therapists to offer ongoing support to users.',
  },
];

export default function FeaturesSection() {
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
    <section id="voxa-features" className="section-base section-dark" aria-labelledby="features-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">Platform</span>
          <h2 id="features-heading" className="section-title">VOXA Features</h2>
          <p className="section-subtitle">
            Everything you need for meaningful emotional support — built with privacy, connection, and healing in mind.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card reveal-item"
                ref={(el) => { itemsRef.current[i + 1] = el; }}
                style={{ transitionDelay: `${(i % 5) * 80}ms` }}
              >
                <div className="feature-icon-wrap">
                  <Icon className="feature-icon" aria-hidden="true" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
