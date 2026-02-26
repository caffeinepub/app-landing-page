import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Mail, Send } from 'lucide-react';
import { SiInstagram, SiX, SiLinkedin } from 'react-icons/si';

const PROTOTYPE_LINKS = [
  {
    label: 'Try VOXA Prototype 1',
    url: 'https://voicelink.replit.app',
    desc: 'VoiceLink — Real-time voice connection prototype',
    badge: 'Prototype 1',
  },
  {
    label: 'Try VOXA Prototype 2',
    url: 'https://voxalink.lovable.app/',
    desc: 'VOXALink — Full platform prototype with all features',
    badge: 'Prototype 2',
  },
];

export default function ContactSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="voxa-links" className="section-base section-contact" aria-labelledby="contact-heading">
      <div className="section-container">
        <div className="section-header reveal-item" ref={(el) => { itemsRef.current[0] = el; }}>
          <span className="section-tag">Try It Now</span>
          <h2 id="contact-heading" className="section-title">VOXA Links</h2>
          <p className="section-subtitle">
            Experience VOXA firsthand. Try our live prototypes and see how we're changing emotional support for youth.
          </p>
        </div>

        {/* Prototype Links */}
        <div className="contact-prototypes reveal-item" ref={(el) => { itemsRef.current[1] = el; }}>
          {PROTOTYPE_LINKS.map((link, i) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="prototype-link-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="prototype-link-badge">{link.badge}</div>
              <div className="prototype-link-content">
                <h3 className="prototype-link-title">{link.label}</h3>
                <p className="prototype-link-desc">{link.desc}</p>
              </div>
              <ExternalLink className="prototype-link-icon" size={20} aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="contact-newsletter reveal-item" ref={(el) => { itemsRef.current[2] = el; }}>
          <h3 className="newsletter-title">Stay Updated with VOXA</h3>
          <p className="newsletter-desc">
            Get notified about new features, launch updates, and mental wellness resources.
          </p>
          {submitted ? (
            <div className="newsletter-success">
              <span>✅</span>
              <span>Thank you! You'll hear from us soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form" aria-label="Newsletter subscription">
              <div className="newsletter-input-wrap">
                <Mail className="newsletter-input-icon" size={18} aria-hidden="true" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                  aria-label="Email address"
                />
              </div>
              <button type="submit" className="newsletter-btn">
                <Send size={16} aria-hidden="true" />
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Final CTA */}
        <div className="contact-cta reveal-item" ref={(el) => { itemsRef.current[3] = el; }}>
          <h3 className="contact-cta-title">Ready to Feel Less Alone?</h3>
          <p className="contact-cta-desc">
            Join thousands of young people finding real connection and emotional support on VOXA.
          </p>
          <a
            href="https://voxalink.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-cta-btn"
          >
            Start Your Journey on VOXA
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">VOXA</span>
            <p className="footer-tagline">Safe · Anonymous · Real Connection</p>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="VOXA on Instagram" className="footer-social-link">
              <SiInstagram size={18} />
            </a>
            <a href="#" aria-label="VOXA on X (Twitter)" className="footer-social-link">
              <SiX size={18} />
            </a>
            <a href="#" aria-label="VOXA on LinkedIn" className="footer-social-link">
              <SiLinkedin size={18} />
            </a>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} VOXA. All rights reserved.
          </p>
          <p className="footer-attribution">
            Built with{' '}
            <span className="footer-heart" aria-label="love">❤️</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'voxa-app')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-caffeine-link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
}
