import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PLATFORM_ATTRIBUTES = [
  {
    icon: '💙',
    title: 'Focused on Loneliness & Depression Support',
    desc: 'VOXA was specifically designed to address the two most prevalent mental health challenges among youth — loneliness and depression.',
  },
  {
    icon: '🔒',
    title: 'Safe, Private, and Secure Platform',
    desc: 'Your identity, conversations, and data are protected with industry-leading security measures and a strict privacy-first policy.',
  },
  {
    icon: '🌱',
    title: 'Youth-Centered Design',
    desc: 'Every feature, interface element, and interaction was designed with young people\'s needs, preferences, and emotional states in mind.',
  },
  {
    icon: '⚡',
    title: 'Real-Time Connection System',
    desc: 'Powered by advanced real-time technology, VOXA connects you with others instantly — no waiting, no delays.',
  },
  {
    icon: '❤️‍🩹',
    title: 'Built for Emotional Healing',
    desc: 'More than just a chat app — VOXA is a healing space where meaningful conversations lead to genuine emotional recovery.',
  },
  {
    icon: '🌍',
    title: 'Vision to Reduce Global Loneliness',
    desc: 'VOXA\'s long-term mission is to become the world\'s leading platform for reducing loneliness and improving youth mental health globally.',
  },
];

const FAQS = [
  {
    q: 'Is VOXA really anonymous?',
    a: 'Yes, completely. You only need a username to join — no email, phone number, or personal information is required. Your identity is never revealed to other users.',
  },
  {
    q: 'How do I connect with a therapist?',
    a: 'Browse our verified therapist directory, view their profiles and specializations, and book a session directly through the platform. All sessions are confidential.',
  },
  {
    q: 'Is VOXA free to use?',
    a: 'VOXA offers a free tier for basic anonymous connections. Premium subscriptions unlock additional features like therapist access, mood tracking, and priority matching.',
  },
  {
    q: 'How does VOXA ensure user safety?',
    a: 'We have a dedicated moderation team, AI-powered content monitoring, and easy reporting tools. Any harmful behavior is addressed immediately.',
  },
  {
    q: 'Can I use VOXA if I\'m in crisis?',
    a: 'VOXA provides emotional support but is not a crisis service. If you\'re in immediate danger, please contact emergency services or a crisis hotline in your country.',
  },
];

export default function ExtraInfoSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <section id="more-about-voxa" className="section-base section-dark" aria-labelledby="extra-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">About VOXA</span>
          <h2 id="extra-heading" className="section-title">More Information About VOXA</h2>
          <p className="section-subtitle">
            Everything you need to know about VOXA's mission, values, and commitment to youth mental health.
          </p>
        </div>

        {/* Platform Attributes */}
        <div className="extra-attributes-grid">
          {PLATFORM_ATTRIBUTES.map((attr, i) => (
            <div
              key={attr.title}
              className="extra-attr-card reveal-item"
              ref={(el) => { itemsRef.current[i + 1] = el; }}
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
            >
              <span className="extra-attr-icon" aria-hidden="true">{attr.icon}</span>
              <h3 className="extra-attr-title">{attr.title}</h3>
              <p className="extra-attr-desc">{attr.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="faq-section reveal-item" ref={(el) => { itemsRef.current[PLATFORM_ATTRIBUTES.length + 1] = el; }}>
          <h3 className="faq-heading">Frequently Asked Questions</h3>
          <div className="faq-list" role="list">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="faq-item" role="listitem">
                <button
                  className="faq-trigger"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`faq-chevron ${openFaq === i ? 'faq-chevron-open' : ''}`}
                    aria-hidden="true"
                    size={18}
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`faq-answer ${openFaq === i ? 'faq-answer-open' : ''}`}
                  role="region"
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
