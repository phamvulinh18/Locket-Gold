import { motion } from 'framer-motion'
import { RiArrowRightLine } from 'react-icons/ri'

const orders = [
  { id: 1, username: '@minhkhoi_2k4',     plan: 'Premium', time: '2 phút trước',   status: 'success', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face' },
  { id: 2, username: '@thanhhuyen99',     plan: 'VIP',     time: '15 phút trước',  status: 'success', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face' },
  { id: 3, username: '@locphat_hcm',      plan: 'Basic',   time: '32 phút trước',  status: 'pending', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face' },
  { id: 4, username: '@nguyenle_2005',    plan: 'Premium', time: '1 giờ trước',    status: 'success', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=48&h=48&fit=crop&crop=face' },
  { id: 5, username: '@truc_xinh_gai',    plan: 'VIP',     time: '2 giờ trước',    status: 'pending', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face' },
  { id: 6, username: '@hunganh_official', plan: 'Basic',   time: '3 giờ trước',    status: 'success', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face' },
]

const planColors = {
  VIP:     { bg: '#FEF3C7', text: '#D97706', darkBg: 'rgba(217,119,6,0.2)', darkText: '#FBB24B' },
  Premium: { bg: '#EDE9FE', text: '#7C3AED', darkBg: 'rgba(124,58,237,0.2)', darkText: '#A78BFA' },
  Basic:   { bg: '#FEF9C3', text: '#CA8A04', darkBg: 'rgba(240,224,0,0.15)', darkText: '#F0E000' },
}

export default function OrdersTable({ darkMode }) {
  const cardBg = darkMode ? '#252545' : '#ffffff'
  const textMain = darkMode ? '#ffffff' : '#111827'
  const textSub = darkMode ? '#8b92a5' : '#6b7280'
  const headerBg = darkMode ? 'rgba(255,255,255,0.04)' : '#FAFAFA'
  const divider = darkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6'
  const rowHover = darkMode ? 'rgba(255,255,255,0.04)' : '#FAFBFF'

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold" style={{ color: textMain }}>Đơn gần đây</h2>
        <button className="text-xs font-semibold text-yellow-500 hover:text-yellow-600 flex items-center gap-1">
          Xem tất cả <RiArrowRightLine size={13} />
        </button>
      </div>

      <div className="card overflow-hidden" style={{ background: cardBg }}>
        {/* Header row */}
        <div className="grid grid-cols-3 sm:grid-cols-4 px-3 sm:px-5 py-3" style={{ background: headerBg, borderBottom: `1px solid ${divider}` }}>
          {['Người dùng', 'Gói', 'Thời gian', 'Trạng thái'].map((h, i) => (
            <span key={i} className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${i === 2 ? 'hidden sm:block' : ''}`}
              style={{ color: textSub, textAlign: i === 3 ? 'right' : 'left' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Data rows */}
        {orders.map((order, i) => {
          const pc = planColors[order.plan]
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.1 }}
              className="grid grid-cols-3 sm:grid-cols-4 px-3 sm:px-5 py-3.5 items-center cursor-pointer transition-colors"
              style={{ borderBottom: i < orders.length - 1 ? `1px solid ${divider}` : 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = rowHover}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* User */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <img
                  src={order.img}
                  alt={order.username}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl object-cover shrink-0"
                />
                <span className="text-[11px] sm:text-sm font-semibold truncate" style={{ color: textMain }}>
                  {order.username}
                </span>
              </div>

              {/* Plan badge */}
              <div>
                <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap"
                  style={{
                    background: darkMode ? pc.darkBg : pc.bg,
                    color: darkMode ? pc.darkText : pc.text,
                  }}>
                  {order.plan}
                </span>
              </div>

              {/* Time */}
              <span className="text-xs sm:text-sm hidden sm:block" style={{ color: textSub }}>{order.time}</span>

              {/* Status */}
              <div className="text-right">
                <span className={`badge ${order.status === 'success' ? 'badge-success' : 'badge-pending'} text-[10px] sm:text-[11.5px] px-1.5 sm:px-3 py-0.5 sm:py-1`}>
                  {order.status === 'success' ? '✓ Xong' : '⏳ Chờ'}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
