import { motion, AnimatePresence } from 'framer-motion'
import {
  RiHome5Fill, RiFlashlightFill, RiUser3Fill,
  RiHistoryFill, RiPriceTag3Fill, RiCustomerService2Fill,
  RiCloseLine, RiLogoutBoxLine
} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  { id: 'home',     icon: RiHome5Fill,           label: 'Trang chủ' },
  { id: 'activate', icon: RiFlashlightFill,       label: 'Kích hoạt' },
  { id: 'history',  icon: RiHistoryFill,          label: 'Lịch sử' },
  { id: 'pricing',  icon: RiPriceTag3Fill,        label: 'Bảng giá' },
  { id: 'support',  icon: RiCustomerService2Fill, label: 'Hỗ trợ' },
]

export default function Sidebar({ activeMenu, sidebarOpen, setSidebarOpen, isCollapsed, darkMode, user, onLogout }) {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(id === 'home' ? '/' : `/${id}`)
    setSidebarOpen(false)
  }

  return (
    <>
      <aside 
        className={`hidden lg:flex flex-col shrink-0 p-3 gap-1 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-56'}`}
        style={{ background: darkMode ? 'transparent' : '#f5ebd0' }}
      >
        <SidebarContent activeMenu={activeMenu} onSelect={handleClick} darkMode={darkMode} user={user} onLogout={onLogout} isCollapsed={isCollapsed} />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-60 z-30 flex flex-col p-3 gap-1 lg:hidden shadow-2xl"
            style={{ background: darkMode ? '#1e1e3a' : '#f5ebd0' }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <RiCloseLine size={20} />
            </button>
            <SidebarContent activeMenu={activeMenu} onSelect={handleClick} darkMode={darkMode} user={user} onLogout={onLogout} isCollapsed={false} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarContent({ activeMenu, onSelect, darkMode, user, onLogout, isCollapsed }) {
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      onLogout()
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2.5 pt-3 pb-5 ${isCollapsed ? 'justify-center px-0' : 'px-2'}`}
      >
        <motion.div 
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
        >
          <img src="/logo-locket.png" alt="LocketGold Logo" className="w-full h-full object-cover" />
        </motion.div>
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-extrabold text-gray-900 dark:text-white text-base leading-tight">
              Locket<span className="text-yellow-500">Gold</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">Premium Service</p>
          </motion.div>
        )}
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
            className={`sidebar-item ${activeMenu === item.id ? 'active' : ''} ${isCollapsed ? 'justify-center px-0' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon size={isCollapsed ? 22 : 18} />
            {!isCollapsed && <span>{item.label}</span>}
          </motion.button>
        ))}
      </nav>

      {/* User card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className={`mt-3 p-3 rounded-2xl flex items-center justify-between gap-3 group transition-all ${isCollapsed ? 'px-2' : ''}`}
        style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}
      >
        <div className={`flex items-center gap-3 min-w-0 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="relative shrink-0">
            <img
              src="/img/users/avatar-default copy.jpg"
              alt="User"
              className="w-10 h-10 rounded-xl object-cover relative z-0"
            />
            {user?.active_plans?.length > 0 && (
              <img 
                src="/img/icon/khung/premium.webp" 
                className="absolute -inset-1.5 w-[calc(100%+0.75rem)] h-[calc(100%+0.75rem)] max-w-none z-10 pointer-events-none scale-110" 
                alt="Frame" 
              />
            )}
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white dark:border-[#252545] rounded-full z-20 ${user ? 'bg-green-400' : 'bg-gray-400'}`}></span>
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="font-bold text-sm text-gray-900 dark:text-white truncate">
                {user ? user.username : 'Khách'}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 truncate">
                {user ? user.email : 'Chưa đăng nhập'}
              </p>
            </div>
          )}
        </div>
        
        {user && !isCollapsed && (
          <button 
            onClick={handleLogout}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
            title="Đăng xuất"
          >
            <RiLogoutBoxLine size={18} />
          </button>
        )}
      </motion.div>
    </>
  )
}
