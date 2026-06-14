import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/landing'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'

function App() {
  const [theme, setTheme] = useState('dark')
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing theme={theme} toggleTheme={toggleTheme} user={user} />} />
        <Route path="/login" element={<Login theme={theme} setUser={setUser} />} />
        <Route path="/signup" element={<Signup theme={theme} setUser={setUser} />} />
        <Route path="/dashboard" element={
          user ? <Dashboard theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />
               : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App