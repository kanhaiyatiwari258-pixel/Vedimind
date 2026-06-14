import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VediLogo from '../VediLogo'

export default function Signup({ theme, setUser }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!name || !email || !password || !gender) { setError('Sab fields bharo'); return }
    if (password.length < 6) { setError('Password kam se kam 6 characters ka ho'); return }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setUser({ email, name, gender })
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
        <h2 className="auth-title">Shuru karo <strong>aaj se.</strong></h2>
        <p className="auth-subtitle">Free mein join karo — koi credit card nahi chahiye.</p>

        <div className="input-group">
          <label>Naam</label>
          <input type="text" placeholder="Vedi tujhe kya bulaye?" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="tumhari@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Main hoon ek...</label>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '2px' }}>
            {['Male', 'Female'].map(g => (
              <button key={g} onClick={() => setGender(g.toLowerCase())}
                style={{
                  flex: 1, padding: '11px', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px',
                  transition: 'all 0.15s',
                  border: `1px solid ${gender === g.toLowerCase() ? '#818CF8' : 'rgba(129,140,248,0.12)'}`,
                  background: gender === g.toLowerCase() ? 'rgba(129,140,248,0.1)' : '#111028',
                  color: gender === g.toLowerCase() ? '#A5B4FC' : '#6B7280',
                }}>
                {g === 'Male' ? '👦 ' : '👧 '}{g}
              </button>
            ))}
          </div>
          {gender && (
            <div style={{ fontSize: '11px', color: '#14B8A6', marginTop: '6px', letterSpacing: '0.3px' }}>
              {gender === 'male'
                ? '✨ Teri Vedi warm aur caring female friend hogi'
                : '✨ Tera Vedi supportive aur cool male friend hoga'}
            </div>
          )}
        </div>

        {error && <div className="error-msg">{error}</div>}

        <button className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '13px' }} onClick={handleSignup} disabled={loading}>
          {loading ? 'Account ban raha hai...' : 'Vedi se milo →'}
        </button>

        <div className="auth-switch">
          Pehle se account hai? <a onClick={() => navigate('/login')}>Login karo</a>
        </div>
        <div className="auth-switch" style={{ marginTop: '0.4rem' }}>
          <a onClick={() => navigate('/')}>← Home pe wapas</a>
        </div>
      </div>
    </div>
  )
}