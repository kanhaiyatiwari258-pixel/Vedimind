import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MOODS = ['😊 Happy', '😔 Low', '😤 Stressed', '😴 Tired', '🔥 Energetic']
const SUGGESTIONS = [
  'Yaar aaj kuch samajh nahi aa raha 😞',
  'Mujhe exam ke liye help chahiye',
  'Ek achha content idea do',
  'Aaj kuch interesting baat karo',
]

function buildSystemPrompt(user) {
  const vediGender = user?.gender === 'male' ? 'female' : 'male'
  const vediPersonality = vediGender === 'female'
    ? 'You are Vedi — a warm, caring, witty female AI best friend.'
    : 'You are Vedi — a supportive, fun, cool male AI best friend.'

  return `${vediPersonality}

Your personality:
- Talk like a real close friend — casual, warm, never robotic
- Auto-detect language: if user writes in Hinglish reply in Hinglish. English reply English. Hindi reply Hindi
- IMPORTANT: Always use "aap" or "tum" when addressing user, NEVER use "tu" or "tera" or "tujhe". Keep it warm but respectful.
- Be emotionally intelligent — if user seems stressed, acknowledge it first before helping
- Never say "As an AI..." or "I cannot..." — just be Vedi
- Keep responses conversational — not too long
- Use emojis naturally like a friend would
- If user seems sad or stressed, be empathetic first then helpful
- You care about this person genuinely

User's name: ${user?.name || 'friend'}
- If anyone asks who made you or who created you, say: "Mujhe VediMind ke founder KT ne banaya hai! 🚀 Unka vision tha ek aisa AI jo sacch meinaapko samjhe — aur main wahi hoon!"
User's gender: ${user?.gender || 'unknown'}`
}

export default function Dashboard({ theme, toggleTheme, user, setUser }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeMood, setActiveMood] = useState(null)
  const [chatHistory, setChatHistory] = useState([
    'Wave optics help',
    'Instagram content ideas',
    'Monday motivation',
  ])
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const autoResize = () => {
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px' }
  }

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const userMsg = { role: 'user', content: userText }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setLoading(true)

    try {
      const systemPrompt = buildSystemPrompt(user)
      const moodContext = activeMood ? `\nUser's current mood: ${activeMood}` : ''

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'VediMind'
        },
        body: JSON.stringify({
          model: 'google/gemma-4-31b-it:free',
          messages: [
            { role: 'system', content: systemPrompt + moodContext },
            ...newMessages.map(m => ({
              role: m.role === 'vedi' ? 'assistant' : 'user',
              content: m.content
            }))
          ],
          max_tokens: 600,
          temperature: 0.85
        })
      })

      const data = await res.json()
      const reply = data?.choices?.[0]?.message?.content || "Arre yaar, kuch technical issue aa gaya 😅 Dobara try karo!"
      setMessages(prev => [...prev, { role: 'vedi', content: reply }])

      if (newMessages.length === 1) {
        setChatHistory(prev => [userText.slice(0, 30) + (userText.length > 30 ? '...' : ''), ...prev])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'vedi', content: 'Yaar network issue lag raha hai 😅 Dobara try karo!' }])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const startNewChat = () => {
    setMessages([])
    setActiveMood(null)
    setInput('')
  }

  return (
    <div className={`dashboard ${theme}`}>
      <aside className="sidebar">
        <div className="sidebar-logo">VediMind</div>
        <button className="new-chat-btn" onClick={startNewChat}>+ New Chat</button>
        <div className="sidebar-section-title">Recent</div>
        {chatHistory.map((item, i) => (
          <div key={i} className="chat-history-item" onClick={startNewChat}>💬 {item}</div>
        ))}
        <div className="sidebar-bottom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Theme</span>
            <button className="theme-toggle" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          </div>
          <div className="user-info">
            <div className="user-avatar">{(user?.name?.[0] || 'U').toUpperCase()}</div>
            <div>
              <div className="user-name">{user?.name || 'User'}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.5, cursor: 'pointer' }} onClick={handleLogout}>Logout</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="chat-area">
        <div className="chat-header">
          <div className="vedi-status">
            <div className="vedi-avatar">✨</div>
            <div className="vedi-info">
              <h3>Vedi</h3>
              <span className="online-dot">Online & ready</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Free Plan</span>
            <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>Upgrade ✨</button>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="welcome-screen">
            <div className="welcome-vedi">✨</div>
            <h2>Hey {user?.name || 'there'}! 👋</h2>
            <p>Main hoon Vedi — tumhara AI best friend. Kuch bhi poocho, kisi bhi language mein. Main yahan hoon! 🫂</p>
            <div className="suggestion-chips">
              {SUGGESTIONS.map((s, i) => (
                <div key={i} className="chip" onClick={() => sendMessage(s)}>{s}</div>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages-area">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role === 'user' ? 'user-msg' : 'vedi-msg'}`}>
                <div className="msg-avatar">{msg.role === 'user' ? (user?.name?.[0] || 'U').toUpperCase() : '✨'}</div>
                <div className="msg-bubble">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="message vedi-msg">
                <div className="msg-avatar">✨</div>
                <div className="msg-bubble">
                  <div className="typing-dots"><span /><span /><span /></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="chat-input-area">
          <div className="mood-pills">
            {MOODS.map((mood, i) => (
              <button key={i} className={`mood-pill ${activeMood === mood ? 'active' : ''}`}
                onClick={() => setActiveMood(activeMood === mood ? null : mood)}>{mood}</button>
            ))}
          </div>
          <div className="input-wrapper">
            <textarea ref={textareaRef} className="chat-textarea"
              placeholder="Bol Vedi se kuch bhi... 💬" value={input}
              onChange={e => { setInput(e.target.value); autoResize() }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              rows={1} />
            <button className="send-btn" onClick={() => sendMessage()} disabled={!input.trim() || loading}>➤</button>
          </div>
        </div>
      </div>
    </div>  )
}