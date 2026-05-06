import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import PricingPage from './components/PricingPage'
import AccountPage from './components/AccountPage'
import SupportPage from './components/SupportPage'
import HistoryPage from './components/HistoryPage'
import ActivatePage from './components/ActivatePage'
import RightPanel from './components/RightPanel'
import Toast from './components/Toast'
import ChatBot from './components/ChatBot'
import './index.css'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('locketgold-theme') === 'dark'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('locketgold-user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  
  const location = useLocation()
  const navigate = useNavigate()
  
  // Extract active menu from current path
  const path = location.pathname.split('/')[1] || 'home'

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('locketgold-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('locketgold-theme', 'light')
    }
  }, [darkMode])

  const handleLogout = () => {
    localStorage.removeItem('locketgold-user')
    setUser(null)
    navigate('/account')
  }

  const refreshUser = async () => {
    if (!user) return
    try {
      const res = await fetch(`http://localhost:8088/locketgold/auth.php?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, password_bypass: true }) 
      })
      const data = await res.json()
      if (data.success) {
        const newUser = JSON.stringify(data.user)
        const oldUser = localStorage.getItem('locketgold-user')
        
        if (newUser !== oldUser) {
          localStorage.setItem('locketgold-user', newUser)
          setUser(data.user)
        }
      }
    } catch (err) { }
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className="min-h-screen transition-colors duration-500"
        style={{ background: darkMode ? '#18182F' : '#f4f1ec' }}
      >
        {/* Mobile Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="flex h-screen overflow-hidden">
          <Sidebar
            activeMenu={path}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            darkMode={darkMode}
            user={user}
            onLogout={handleLogout}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Navbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setSidebarOpen={setSidebarOpen}
              isSidebarCollapsed={isSidebarCollapsed}
              setIsSidebarCollapsed={setIsSidebarCollapsed}
              user={user}
            />

            <div className="flex-1 flex overflow-hidden">
              <main className="flex-1 overflow-y-auto scrollbar-thin p-4 xl:p-5">
                <Routes>
                  <Route path="/" element={<Dashboard darkMode={darkMode} user={user} refreshUser={refreshUser} />} />
                  <Route path="/pricing" element={<PricingPage darkMode={darkMode} user={user} refreshUser={refreshUser} />} />
                  <Route path="/account" element={<AccountPage darkMode={darkMode} user={user} setUser={setUser} />} />
                  <Route path="/support" element={user ? <SupportPage darkMode={darkMode} user={user} /> : <AccountPage darkMode={darkMode} user={user} setUser={setUser} />} />
                  <Route path="/history" element={user ? <HistoryPage darkMode={darkMode} user={user} /> : <AccountPage darkMode={darkMode} user={user} setUser={setUser} />} />
                  <Route path="/activate" element={user ? (user.active_plans?.length > 0 ? <ActivatePage darkMode={darkMode} user={user} /> : <PricingPage darkMode={darkMode} user={user} refreshUser={refreshUser} />) : <AccountPage darkMode={darkMode} user={user} setUser={setUser} />} />
                  <Route path="*" element={<Dashboard darkMode={darkMode} user={user} />} />
                </Routes>
              </main>

              <aside className="hidden xl:block w-72 overflow-y-auto scrollbar-thin p-4 pl-0">
                <RightPanel darkMode={darkMode} user={user} />
              </aside>
            </div>
          </div>
        </div>
        <Toast />
        {location.pathname !== '/activate' && <ChatBot darkMode={darkMode} user={user} />}
      </div>
    </div>
  )
}
