import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHome5Fill, RiFlashlightFill, RiUser3Fill,
  RiHistoryFill, RiPriceTag3Fill, RiCustomerService2Fill,
  RiCloseLine
} from 'react-icons/ri'

const menuItems = [
  { id: 'home',     icon: RiHome5Fill,           label: 'Trang chủ' },
  { id: 'activate', icon: RiFlashlightFill,       label: 'Kích hoạt' },
  { id: 'account',  icon: RiUser3Fill,            label: 'Tài khoản' },
  { id: 'history',  icon: RiHistoryFill,          label: 'Lịch sử' },
  { id: 'pricing',  icon: RiPriceTag3Fill,        label: 'Bảng giá' },
  { id: 'support',  icon: RiCustomerService2Fill, label: 'Hỗ trợ' },
]

import { useNavigate } from 'react-router-dom'

export default function Sidebar({ activeMenu, sidebarOpen, setSidebarOpen, darkMode }) {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(id === 'home' ? '/' : `/${id}`)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 p-3 gap-1">
        <SidebarContent activeMenu={activeMenu} onSelect={handleClick} darkMode={darkMode} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-60 z-30 flex flex-col p-3 gap-1 lg:hidden shadow-2xl"
            style={{ background: darkMode ? '#252545' : '#ffffff' }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <RiCloseLine size={20} />
            </button>
            <SidebarContent activeMenu={activeMenu} onSelect={handleClick} darkMode={darkMode} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarContent({ activeMenu, onSelect, darkMode }) {
  return (
    <>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 px-2 pt-3 pb-5"
      >
        {/* Logo icon */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-md">
          <span className="text-lg">🔒</span>
        </div>
        <div>
          <p className="font-extrabold text-gray-900 dark:text-white text-base leading-tight">
            Locket<span className="text-yellow-500">Gold</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">Premium Service</p>
        </div>
      </motion.div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-0.5">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => onSelect(item.id)}
            className={`sidebar-item ${activeMenu === item.id ? 'active' : ''}`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* User card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-3 p-3 rounded-2xl flex items-center gap-3"
        style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}
      >
        <div className="relative shrink-0">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
            alt="Admin"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white dark:border-[#252545] rounded-full"></span>
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-gray-900 dark:text-white truncate">Admin LG</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 truncate">Super Admin</p>
        </div>
      </motion.div>
    </>
  )
}
