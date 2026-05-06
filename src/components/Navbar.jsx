import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RiMenu2Line, RiSunFill, RiMoonFill, RiSearch2Line, 
  RiBellFill, RiArrowDownSLine, RiFileList3Line, 
  RiUserSettingsLine, RiGroupLine, RiLogoutBoxRLine,
  RiVerifiedBadgeFill
} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ darkMode, setDarkMode, setSidebarOpen, isSidebarCollapsed, setIsSidebarCollapsed, user, setUser }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('locketgold-user')
      setUser(null)
      navigate('/account')
    }
  }

  const isVip = user?.active_plans?.length > 0

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-4 xl:px-5 py-3 sticky top-0 z-40 border-b"
      style={{ 
        background: darkMode ? '#18182F' : '#f5ebd0',
        borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <RiMenu2Line size={20} />
        </button>

        {/* Nút Toggle Sidebar Desktop */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden lg:flex p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors items-center justify-center"
        >
          <RiMenu2Line size={20} className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-90' : ''}`} />
        </button>

        <div className="relative hidden sm:flex items-center">
          <RiSearch2Line size={15} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-9 pr-4 py-2 rounded-xl text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.07)' : '#ffffff',
              color: darkMode ? '#e5e7eb' : '#1f2937',
              border: 'none',
            }}
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-xl transition-colors relative" style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : '#ffffff' }}>
          <RiBellFill size={18} className="text-yellow-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#18182F]" />
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl transition-colors"
          style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : '#ffffff' }}
        >
          {darkMode ? <RiSunFill size={18} className="text-yellow-400" /> : <RiMoonFill size={18} className="text-gray-500" />}
        </button>

        {/* User Dropdown */}
        <div className="relative flex items-center gap-2.5 pl-3 ml-1 border-l" 
          ref={dropdownRef}
          style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb' }}
        >
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 active:scale-95"
          >
            <div className="relative">
              <img src="/img/users/avatar-default copy.jpg" alt="Avatar" className="w-8 h-8 rounded-lg object-cover relative z-0" />
              {isVip && (
                <img src="/img/icon/khung/premium.webp" className="absolute -inset-1 w-[calc(100%+0.5rem)] h-[calc(100%+0.5rem)] max-w-none z-10 pointer-events-none scale-110" alt="Frame" />
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold leading-none" style={{ color: darkMode ? '#fff' : '#111827' }}>
                {user ? `Hi, ${user.username}` : 'Guest'}
              </p>
              <p className="text-[10px] text-yellow-500 font-semibold">{user ? '@' + user.username : 'Chưa đăng nhập'}</p>
            </div>
            <RiArrowDownSLine size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} style={{ color: darkMode ? '#A1A1AA' : '#71717A' }} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-1 w-64 rounded-[2rem] overflow-hidden shadow-2xl z-50 border"
                style={{ 
                  background: darkMode ? '#1e1e3a' : '#ffffff', 
                  borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' 
                }}
              >
                {/* Header User */}
                <div className="p-5 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Đang đăng nhập</p>
                  <p className="font-black text-base flex items-center gap-1.5" style={{ color: darkMode ? '#fff' : '#111' }}>
                    {user ? user.username : 'Guest'}
                    {isVip && <RiVerifiedBadgeFill className="text-blue-500" size={16} />}
                  </p>
                  <div className="mt-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 w-fit border border-transparent flex items-center gap-1.5">
                    {isVip && <img src="/img/icon/legacy.png" alt="Legacy" className="w-3.5 h-3.5" />}
                    <span className="text-[10px] font-bold" style={{ color: darkMode ? '#A1A1AA' : '#71717A' }}>
                      {isVip ? 'Thành viên VIP' : 'Thành viên'}
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <DropdownItem icon={RiFileList3Line} label="Quản lý hóa đơn" color="#8B5CF6" onClick={() => {navigate('/history'); setIsDropdownOpen(false)}} darkMode={darkMode} />
                  <DropdownItem icon={RiUserSettingsLine} label="Quản lý tài khoản" color="#3B82F6" onClick={() => {navigate('/account'); setIsDropdownOpen(false)}} darkMode={darkMode} />
                  <DropdownItem icon={RiGroupLine} label="Giới thiệu bạn bè" color="#10B981" onClick={() => setIsDropdownOpen(false)} darkMode={darkMode} />
                  
                  <div className="h-px my-2 mx-2" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }} />
                  
                  <DropdownItem icon={RiLogoutBoxRLine} label="Đăng xuất" color="#EF4444" onClick={handleLogout} darkMode={darkMode} isLogout />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}

function DropdownItem({ icon: Icon, label, color, onClick, darkMode, isLogout }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group"
      style={{ 
        '--hover-bg': isLogout ? 'rgba(239, 68, 68, 0.1)' : `${color}15`,
        '--hover-color': isLogout ? '#EF4444' : color
      }}
    >
      <div className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-110 ${isLogout ? 'bg-red-500/10' : 'bg-gray-100 dark:bg-white/5'}`} style={{ color: color }}>
        <Icon size={20} />
      </div>
      <span 
        className="text-sm font-bold transition-colors duration-300" 
        style={{ 
          color: darkMode ? (isLogout ? '#EF4444' : '#D4D4D8') : (isLogout ? '#EF4444' : '#3F3F46') 
        }}
      >
        {label}
      </span>
      
      {/* Hiệu ứng nền khi Hover */}
      <style jsx>{`
        button:hover {
          background-color: var(--hover-bg);
        }
        button:hover span {
          color: var(--hover-color) !important;
        }
      `}</style>
    </button>
  )
}
