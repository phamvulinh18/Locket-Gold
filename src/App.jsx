import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import PricingPage from './components/PricingPage'
import AccountPage from './components/AccountPage'
import SupportPage from './components/SupportPage'
import HistoryPage from './components/HistoryPage'
import ActivatePage from './components/ActivatePage'
import RightPanel from './components/RightPanel'
import './index.css'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('locketgold-theme') === 'dark'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
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

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className="min-h-screen transition-colors duration-500"
        style={{ background: darkMode ? '#18182F' : '#F2F2F7' }}
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
            darkMode={darkMode}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Navbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex overflow-hidden">
              <main className="flex-1 overflow-y-auto scrollbar-thin p-4 xl:p-5">
                <Routes>
                  <Route path="/" element={<Dashboard darkMode={darkMode} />} />
                  <Route path="/pricing" element={<PricingPage darkMode={darkMode} />} />
                  <Route path="/account" element={<AccountPage darkMode={darkMode} />} />
                  <Route path="/support" element={<SupportPage darkMode={darkMode} />} />
                  <Route path="/history" element={<HistoryPage darkMode={darkMode} />} />
                  <Route path="/activate" element={<ActivatePage darkMode={darkMode} />} />
                  <Route path="*" element={<Dashboard darkMode={darkMode} />} />
                </Routes>
              </main>

              <aside className="hidden xl:block w-72 overflow-y-auto scrollbar-thin p-4 pl-0">
                <RightPanel darkMode={darkMode} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
