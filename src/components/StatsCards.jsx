import { motion } from 'framer-motion'
import { RiFlashlightFill, RiUserStarFill, RiBarChartFill } from 'react-icons/ri'

const stats = [
  {
    id: 1, icon: RiFlashlightFill, label: 'Lượt kích hoạt', value: '12,847', delta: '+8.3%',
    iconBg: '#FEF9C3', iconColor: '#CA8A04', barColor: '#F0E000', pct: 72,
    img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=60&h=60&fit=crop',
  },
  {
    id: 2, icon: RiUserStarFill, label: 'Tài khoản nâng cấp', value: '9,231', delta: '+12.1%',
    iconBg: '#EDE9FE', iconColor: '#7C3AED', barColor: '#7C3AED', pct: 84,
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&h=60&fit=crop&crop=face',
  },
  {
    id: 3, icon: RiBarChartFill, label: 'Tỷ lệ thành công', value: '98.7%', delta: '+1.2%',
    iconBg: '#DCFCE7', iconColor: '#16A34A', barColor: '#22C55E', pct: 96,
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop',
  },
]

export default function StatsCards({ darkMode }) {
  const cardBg = darkMode ? '#252545' : '#ffffff'
  const textMain = darkMode ? '#ffffff' : '#111827'
  const textSub = darkMode ? '#8b92a5' : '#6b7280'
  const trackBg = darkMode ? '#2e2e50' : '#f3f4f6'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.1 }}
          className="card p-5"
          style={{ background: cardBg }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl" style={{ background: stat.iconBg }}>
              <stat.icon size={22} style={{ color: stat.iconColor }} />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full"
              style={{ background: '#DCFCE7', color: '#15803D' }}>
              {stat.delta}
            </span>
          </div>

          <p className="text-xl sm:text-2xl font-extrabold" style={{ color: textMain }}>{stat.value}</p>
          <p className="text-xs sm:text-sm mt-1" style={{ color: textSub }}>{stat.label}</p>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: trackBg }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stat.pct}%` }}
              transition={{ delay: i * 0.1 + 0.4, duration: 0.9, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: stat.barColor }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
