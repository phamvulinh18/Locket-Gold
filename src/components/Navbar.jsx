import { motion } from 'framer-motion'
import { RiMenu2Line, RiSunFill, RiMoonFill, RiSearch2Line, RiBellFill } from 'react-icons/ri'

export default function Navbar({ darkMode, setDarkMode, setSidebarOpen, user }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-4 xl:px-5 py-3 sticky top-0 z-10"
      style={{
        background: darkMode ? '#18182F' : '#F2F2F7',
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
      <div className="flex items-center gap-2">
        <button
          className="relative p-2.5 rounded-xl transition-colors"
          style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : '#ffffff' }}
        >
          <RiBellFill size={18} className="text-yellow-500" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"
            style={{ border: `2px solid ${darkMode ? '#1e1e38' : '#ffffff'}` }}
          />
        </button>

        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          whileTap={{ scale: 0.88 }}
          className="p-2.5 rounded-xl transition-colors"
          style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : '#ffffff' }}
        >
          {darkMode
            ? <RiSunFill size={18} className="text-yellow-400" />
            : <RiMoonFill size={18} className="text-gray-500" />
          }
        </motion.button>

        {/* User */}
        <div className="flex items-center gap-2.5 pl-2 ml-1 border-l"
          style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb' }}
        >
          <div className="relative">
            <img
              src={user ? `https://ui-avatars.com/api/?name=${user.full_name}&background=F0E000&color=000` : "/img/users/avatar-default copy.jpg"}
              alt="User"
              className="w-8 h-8 rounded-lg object-cover relative z-0"
            />
            <img 
              src="/img/icon/khung/premium.webp" 
              className="absolute -inset-1 w-[calc(100%+0.5rem)] h-[calc(100%+0.5rem)] max-w-none z-10 pointer-events-none" 
              alt="Frame" 
            />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold leading-none"
              style={{ color: darkMode ? '#fff' : '#111827' }}>{user ? user.full_name : 'Guest'}</p>
            <p className="text-[10px] text-yellow-500 font-semibold">{user ? '@' + user.username : 'Chưa đăng nhập'}</p>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
