import { useNavigate } from 'react-router-dom'
import VediLogo from '../VediLogo'

export default function Landing({ theme, toggleTheme, user }) {
  const navigate = useNavigate()

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <VediLogo size={26} />
          <span className="logo-text">VEDI<span>MIND</span></span>
        </div>
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
        <p className="hero-tag">Hyper AI Assistant</p>
        <h1>
          AI jo samjhe<br/>
          <strong>tujhe, teri tarah.</strong>
        </h1>
        <p>
          Hindi, Hinglish, ya English — jis bhi bhasha mein soche, VediMind wahi samjhega. 
          Students, creators, aur professionals ke liye.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            Shuru karo — free mein →
          </button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            Login karo
          </button>
        </div>

        <div className="hero-visual">
          <div className="chat-demo">
            <div className="chat-bubble user">
              Yaar history exam ki notes bana de — kal exam hai 😅
            </div>
            <div className="chat-bubble vedi">
              <div className="vedi-name">VEDIMIND</div>
              Bilkul! Kaun sa topic — Mughal Empire, Freedom Movement, ya World Wars? 
              Main bullet points + dates dono mein deta hoon 📚
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section">
        <p className="section-label">Why VediMind</p>
        <h2 className="section-title">
          Sirf ek tool nahi —<br/>
          <strong>tera AI dost.</strong>
        </h2>
        <p className="section-sub">
          Vedi teri mood detect karta hai, teri language mein bolta hai, aur genuinely care karta hai.
        </p>
        <div className="features-grid">
          {[
            { icon: '🫂', title: 'Emotionally Aware', desc: 'Mood detect karta hai teri writing se — aur pehle empathy deta hai, phir help.' },
            { icon: '🌐', title: 'Teri Bhasha', desc: 'Hinglish, English, Hindi — auto-detect karta hai bina tujhe bolne ke.' },
            { icon: '👫', title: 'Gender-Aware', desc: 'Male users ke liye female Vedi. Female users ke liye male Vedi. Personal feel.' },
            { icon: '🎓', title: 'Student Zone', desc: 'Exam help, notes, concept explanations — teri language mein, textbook wala nahi.' },
            { icon: '🎨', title: 'Creator Studio', desc: 'Content ideas, captions, scripts — creator grind ko samjhta hai.' },
            { icon: '💼', title: 'Professional Hub', desc: 'Emails, presentations, career advice — without the corporate tone.' },
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
      <div id="pricing" className="pricing-wrap">
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Pricing</p>
          <h2 className="section-title">Simple. <strong>Fair. Tumhara.</strong></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Free mein shuru karo — pasand aaye toh upgrade karo.</p>
        </div>
        <div className="pricing-grid">
          {[
            { name: 'FREE', price: '₹0', per: '/forever', desc: 'Shuru karne ke liye', features: ['20 messages/day', 'Basic Vedi personality', 'Student Zone', 'Light & Dark mode'], cta: 'Free shuru karo', popular: false },
            { name: 'PLUS', price: '₹99', per: '/month', desc: 'Daily users ke liye', features: ['Unlimited messages', 'Teeno zones', 'Mood-aware responses', 'Chat history', 'Priority replies'], cta: 'Plus lo', popular: true },
            { name: 'PRO', price: '₹199', per: '/month', desc: 'Power users ke liye', features: ['Sab Plus mein', 'Creator Studio full', 'Professional Hub', 'Advanced AI', 'Early features'], cta: 'Pro lo', popular: false },
          ].map((plan, i) => (
            <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={i}>
              {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price}<span>{plan.per}</span></div>
              <div className="plan-desc">{plan.desc}</div>
              <ul className="plan-features">
                {plan.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <button className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%' }} onClick={() => navigate('/signup')}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <VediLogo size={22} />
          <span className="logo-text">VEDI<span>MIND</span></span>
        </div>
        <p>Tera AI best friend. Hamesha yahan. Kabhi judge nahi karta.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '11px', opacity: 0.4 }}>© 2026 VediMind. Made with ❤️ in India.</p>
      </footer>
    </div>
  )
}