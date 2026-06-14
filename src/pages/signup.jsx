import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup({ theme, setUser }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name || !email || !password || !gender) { setError('Please fill all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    // Supabase auth will be connected here
    setTimeout(() => {
      setUser({ email, name, gender })
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <div className={`auth-page ${theme}`} style={{ minHeight: '100vh' }}>
      <div className="auth-card">
        <div className="auth-logo">VediMind</div>
        <div className="auth-subtitle">Create your account — Vedi is waiting! ✨</div>

        <div className="input-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="What should Vedi call you?"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>I am a...</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.2rem' }}>
            {['Male', 'Female'].map(g => (
              <button
                key={g}
                onClick={() => setGender(g.toLowerCase())}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '12px',
                  border: `1.5px solid ${gender === g.toLowerCase() ? 'var(--purple)' : 'var(--border-dark)'}`,
                  background: gender === g.toLowerCase() ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: gender === g.toLowerCase() ? 'var(--purple-light)' : 'inherit',
                  cursor: 'pointer',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.15s',
                }}
              >
                {g === 'Male' ? '👦 ' : '👧 '}{g}
              </button>
            ))}
          </div>
          {gender && (
            <div style={{ fontSize: '0.8rem', color: 'var(--teal-light)', marginTop: '0.4rem' }}>
              {gender === 'male'
                ? '✨ Your Vedi will be warm & caring like a close female friend'
                : '✨ Your Vedi will be supportive & fun like a close male friend'}
            </div>
          )}
        </div>

        {error && <div className="error-msg">{error}</div>}

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Meet Vedi →'}
        </button>

        <div className="auth-switch">
          Already have an account?{' '}
          <a onClick={() => navigate('/login')}>Login</a>
        </div>

        <div className="auth-switch" style={{ marginTop: '0.5rem' }}>
          <a onClick={() => navigate('/')}>← Back to home</a>
        </div>
      </div>
    </div>
  )
}