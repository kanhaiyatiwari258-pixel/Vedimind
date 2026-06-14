import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VediLogo from '../VediLogo'

export default function Login({ theme, setUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { setError('Sab fields bharo'); return }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setUser({ email, name: email.split('@')[0] })
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <VediLogo size={28} />
        </div>
        <h2 className="auth-title">Welcome back, <strong>Vedi.</strong></h2>
        <p className="auth-subtitle">Login karke apna AI assistant access karo.</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="tumhari@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>

        {error && <div className="error-msg">{error}</div>}

        <button className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '13px' }} onClick={handleLogin} disabled={loading}>
          {loading ? 'Login ho raha hai...' : 'Login karo →'}
        </button>

        <div className="auth-switch">
          Account nahi hai? <a onClick={() => navigate('/signup')}>Sign up karo</a>
        </div>
        <div className="auth-switch" style={{ marginTop: '0.4rem' }}>
          <a onClick={() => navigate('/')}>← Home pe wapas</a>
        </div>
      </div>
    </div>
  )
}