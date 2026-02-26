import { useEffect, useRef } from 'react';

const INTRO_POINTS = [
  { icon: '🛡️', text: 'A safe and anonymous emotional support platform' },
  { icon: '⚡', text: 'Connects people in real-time' },
  { icon: '💙', text: 'Built for lonely and struggling youth' },
  { icon: '🤝', text: 'Focused on human connection, not algorithms' },
  { icon: '🔓', text: 'A digital safe space to speak freely' },
];

export default function IntroSection() {
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

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
    <section id="introducing-voxa" className="section-base section-dark" aria-labelledby="intro-heading">
      <div className="section-container">
        <div className="intro-layout">
          {/* Left: Text content */}
          <div className="intro-text-col">
            <div
              className="section-header reveal-item"
              ref={(el) => { itemsRef.current[0] = el; }}
            >
              <span className="section-tag">Meet VOXA</span>
              <h2 id="intro-heading" className="section-title text-left">Introducing VOXA</h2>
            </div>

            <ul className="intro-points" role="list">
              {INTRO_POINTS.map((point, i) => (
                <li
                  key={point.text}
                  className="intro-point reveal-item"
                  ref={(el) => { itemsRef.current[i + 1] = el; }}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="intro-point-icon" aria-hidden="true">{point.icon}</span>
                  <span className="intro-point-text">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Phone mockup */}
          <div
            className="intro-mockup-col reveal-item"
            ref={(el) => { itemsRef.current[INTRO_POINTS.length + 1] = el; }}
          >
            <div className="phone-mockup">
              <div className="phone-notch" aria-hidden="true" />
              <div className="phone-screen">
                {/* VOXA App UI mockup */}
                <div className="phone-app-header">
                  <span className="phone-app-logo">VOXA</span>
                  <span className="phone-app-status">● Online</span>
                </div>

                <div className="phone-mood-check">
                  <p className="phone-mood-label">How are you feeling?</p>
                  <div className="phone-mood-options">
                    {['😔', '😐', '🙂', '😊', '😄'].map((emoji, i) => (
                      <button
                        key={i}
                        className={`phone-mood-btn ${i === 1 ? 'phone-mood-active' : ''}`}
                        aria-label={`Mood ${i + 1}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="phone-chat-preview">
                  <div className="phone-chat-msg phone-chat-msg-in">
                    <span className="phone-chat-avatar" aria-hidden="true">👤</span>
                    <div className="phone-chat-bubble phone-chat-bubble-in">
                      I feel so alone lately...
                    </div>
                  </div>
                  <div className="phone-chat-msg phone-chat-msg-out">
                    <div className="phone-chat-bubble phone-chat-bubble-out">
                      I understand. I'm here for you 💙
                    </div>
                  </div>
                  <div className="phone-chat-msg phone-chat-msg-in">
                    <span className="phone-chat-avatar" aria-hidden="true">👤</span>
                    <div className="phone-chat-bubble phone-chat-bubble-in">
                      Thank you, that means a lot
                    </div>
                  </div>
                </div>

                <div className="phone-online-bar">
                  <span className="phone-online-dot" aria-hidden="true" />
                  <span>247 people online now</span>
                </div>

                <div className="phone-connect-btn">
                  Connect Anonymously
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
