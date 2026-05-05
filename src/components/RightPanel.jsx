import { motion } from 'framer-motion'
import {
  RiCheckboxCircleFill, RiGiftFill, RiArrowRightLine,
  RiLightbulbFlashFill, RiTimeLine
} from 'react-icons/ri'

const notifications = [
  {
    id: 1, icon: RiCheckboxCircleFill, iconColor: '#22C55E', iconBg: '#DCFCE7',
    darkIconBg: 'rgba(34,197,94,0.15)',
    title: 'Kích hoạt thành công',
    sub: '@minhkhoi_2k4 · VIP · 2 phút trước',
    img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
  },
  {
    id: 2, icon: RiGiftFill, iconColor: '#7C3AED', iconBg: '#EDE9FE',
    darkIconBg: 'rgba(124,58,237,0.15)',
    title: 'Gói Premium mới ra mắt!',
    sub: 'Giảm 20% trong hôm nay · 5 phút trước',
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=40&h=40&fit=crop',
  },
  {
    id: 3, icon: RiCheckboxCircleFill, iconColor: '#22C55E', iconBg: '#DCFCE7',
    darkIconBg: 'rgba(34,197,94,0.15)',
    title: 'Kích hoạt thành công',
    sub: '@thanhhuyen99 · Basic · 18 phút trước',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
  },
]

const tips = [
  {
    id: 1,
    title: 'Cách dùng Locket hiệu quả',
    desc: 'Thiết lập widget ngay màn hình chính để không bỏ lỡ khoảnh khắc.',
    img: '/public/banner-desktop-1.jpg',
  },
  {
    id: 2,
    title: 'Mẹo chụp ảnh đẹp hơn',
    desc: 'Dùng camera effects cao cấp để làm nổi bật khoảnh khắc của bạn.',
    img: '/public/banner-desktop-2.jpg',
  },
]

const pendingUsers = [
  {
    id: 1, name: 'locphat_hcm', plan: 'Basic', wait: '10 phút',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
  },
  {
    id: 2, name: 'truc_xinh_gai', plan: 'VIP', wait: '25 phút',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face',
  },
  {
    id: 3, name: 'quochuy_2006', plan: 'Premium', wait: '1 giờ',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
  },
]

function hoverRow(el, bg, restore) {
  el.style.background = bg
  el.onmouseleave = () => { el.style.background = restore }
}

export default function RightPanel({ darkMode }) {
  const cardBg = darkMode ? '#252545' : '#ffffff'
  const textMain = darkMode ? '#ffffff' : '#111827'
  const textSub = darkMode ? '#8b92a5' : '#6b7280'
  const divider = darkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6'
  const hoverBg = darkMode ? 'rgba(255,255,255,0.04)' : '#FAFBFF'

  return (
    <div className="flex flex-col gap-4 pt-0">

      {/* ── NOTIFICATIONS ── */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-4"
        style={{ background: cardBg }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm" style={{ color: textMain }}>Thông báo</h3>
          <button className="text-yellow-500 hover:text-yellow-600 transition-colors">
            <RiArrowRightLine size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-0.5">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.15 }}
              className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors"
              onMouseEnter={e => { e.currentTarget.style.background = hoverBg }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              <img src={n.img} alt="" className="w-8 h-8 rounded-xl object-cover shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold leading-snug truncate" style={{ color: textMain }}>{n.title}</p>
                <p className="text-xs mt-0.5 truncate" style={{ color: textSub }}>{n.sub}</p>
              </div>
              <div className="p-1.5 rounded-lg shrink-0"
                style={{ background: darkMode ? n.darkIconBg : n.iconBg }}>
                <n.icon size={13} style={{ color: n.iconColor }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── TIPS ── */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.22 }}
        className="card p-4"
        style={{ background: cardBg }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm" style={{ color: textMain }}>Mẹo sử dụng</h3>
          <button className="text-yellow-500 hover:text-yellow-600 transition-colors">
            <RiArrowRightLine size={16} />
          </button>
        </div>

        {tips.map((tip, i) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.28 }}
            className="mb-3 last:mb-0 rounded-xl overflow-hidden cursor-pointer"
            style={{ border: `1px solid ${divider}` }}
          >
            {/* Tip cover image */}
            <div className="relative h-20 overflow-hidden">
              <img
                src={tip.img}
                alt={tip.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5">
                <RiLightbulbFlashFill size={13} className="text-yellow-400" />
                <span className="text-white text-xs font-bold">{tip.title}</span>
              </div>
            </div>
            <div className="px-3 py-2.5" style={{ background: cardBg }}>
              <p className="text-xs" style={{ color: textSub }}>{tip.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── PENDING REQUESTS ── */}
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
        className="card p-4"
        style={{ background: cardBg }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm" style={{ color: textMain }}>Chờ kích hoạt</h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: '#FEF9C3', color: '#CA8A04' }}>
            {pendingUsers.length}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {pendingUsers.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09 + 0.4 }}
              className="flex items-center gap-3"
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-10 h-10 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: textMain }}>@{user.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <RiTimeLine size={11} style={{ color: textSub }} />
                  <span className="text-xs" style={{ color: textSub }}>{user.plan} · {user.wait}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="text-xs font-bold px-3 py-1.5 rounded-lg shrink-0"
                style={{ background: '#F0E000', color: '#1a1a1a' }}
              >
                Xử lý
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}
