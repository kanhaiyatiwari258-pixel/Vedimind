import { useNavigate } from 'react-router-dom'

export default function Landing({ theme, toggleTheme, user }) {
  const navigate = useNavigate()

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/')}>VediMind</div>
        <div className="navbar-links">
          <a className="nav-link" href="#features">Features</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {user ? (
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>Dashboard</button>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => navigate('/login')}>Login</button>
              <button className="btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">✨ AI Friend, Not Just a Tool</div>
        <h1>
          Meet <span>Vedi</span> — Your Personal<br />AI Best Friend
        </h1>
        <p>
          Vedi understands your mood, speaks your language, and actually cares. 
          Whether you're stressed about exams or stuck on a project — Vedi's got you.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            Start Talking to Vedi →
          </button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>

        {/* CHAT DEMO */}
        <div className="hero-visual">
          <div className="chat-demo">
            <div className="chat-bubble user">
              Yaar physics exam kal hai aur main totally lost hoon 😭
            </div>
            <div className="chat-bubble vedi">
              <div className="vedi-name">✨ Vedi</div>
              Arrey ruk bhai, panic mat! Kal exam hai matlab time hai abhi bhi 💪
              Bata kaunsa topic sabse zyada scary lag raha hai — wahan se shuru karte hain. 
              Saath mein hun main! 🫂
            </div>
            <div className="chat-bubble user">
              Wave optics... bilkul samajh nahi aata
            </div>
            <div className="chat-bubble vedi">
              <div className="vedi-name">✨ Vedi</div>
              Perfect! Wave optics mein sirf 3 cheezein important hain exam ke liye. 
              Chalo 30 min mein clear kar dete hain — ready? 📚
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section">
        <div className="section-label">Why VediMind</div>
        <h2 className="section-title">Not an AI Tool.<br />An AI Friend.</h2>
        <p className="section-sub">
          Vedi remembers your mood, matches your tone, and responds like a real friend — not a robot.
        </p>
        <div className="features-grid">
          {[
            { icon: '🫂', title: 'Emotionally Aware', desc: 'Vedi detects your mood from how you write and responds with genuine empathy — not scripted replies.' },
            { icon: '🌐', title: 'Your Language, Your Way', desc: 'Hinglish, English, or pure Hindi — Vedi auto-detects and matches your language without you asking.' },
            { icon: '👫', title: 'Gender-Aware Personality', desc: 'Male users get a warm female Vedi. Female users get a caring male Vedi. Feels personal from day one.' },
            { icon: '🎓', title: 'Student Zone', desc: 'Exam help, note summaries, concept explanations — all in your style, not textbook language.' },
            { icon: '🎨', title: 'Creator Studio', desc: 'Content ideas, caption writing, script help — Vedi understands the creator grind.' },
            { icon: '💼', title: 'Professional Hub', desc: 'Emails, presentations, career advice — your personal professional AI without the corporate tone.' },
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Simple. Fair. Yours.</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Start free, upgrade when you love it.
          </p>
        </div>
        <div className="pricing-grid">
          {[
            {
              name: 'Free',
              price: '₹0',
              per: '/forever',
              desc: 'Perfect to get started',
              features: ['20 messages/day', 'Basic Vedi personality', 'Student Zone access', 'Light & Dark mode'],
              cta: 'Start Free',
              popular: false,
            },
            {
              name: 'Plus',
              price: '₹99',
              per: '/month',
              desc: 'For daily users who want more',
              features: ['Unlimited messages', 'All 3 zones access', 'Mood-aware responses', 'Priority replies', 'Chat history'],
              cta: 'Get Plus',
              popular: true,
            },
            {
              name: 'Pro',
              price: '₹199',
              per: '/month',
              desc: 'For power users & creators',
              features: ['Everything in Plus', 'Creator Studio full access', 'Professional Hub', 'Advanced AI model', 'Early features'],
              cta: 'Go Pro',
              popular: false,
            },
          ].map((plan, i) => (
            <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={i}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price}<span>{plan.per}</span></div>
              <div className="plan-desc">{plan.desc}</div>
              <ul className="plan-features">
                {plan.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <button
                className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%' }}
                onClick={() => navigate('/signup')}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">VediMind</div>
        <p>Your AI best friend. Always here. Never judging.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', opacity: 0.5 }}>© 2026 VediMind. Made with ❤️ in India.</p>
      </footer>
    </div>
  )
}