import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ theme, setUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill all fields'); return }
    setLoading(true)
    setError('')
    // Supabase auth will be connected here
    // For now — demo login
    setTimeout(() => {
      setUser({ email, name: email.split('@')[0] })
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <div className={`auth-page ${theme}`} style={{ minHeight: '100vh' }}>
      <div className="auth-card">
        <div className="auth-logo">VediMind</div>
        <div className="auth-subtitle">Welcome back 👋 Vedi missed you</div>

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
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>

        {error && <div className="error-msg">{error}</div>}

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login →'}
        </button>

        <div className="auth-switch">
          New here?{' '}
          <a onClick={() => navigate('/signup')}>Create account</a>
        </div>

        <div className="auth-switch" style={{ marginTop: '0.5rem' }}>
          <a onClick={() => navigate('/')}>← Back to home</a>
        </div>
      </div>
    </div>
  )
}