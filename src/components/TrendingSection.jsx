import { motion } from 'framer-motion'
import { RiArrowRightLine } from 'react-icons/ri'

// Trending packages with real Unsplash images
const trending = [
  {
    id: 1,
    name: 'LocketGold 1 Tháng',
    sub: 'Gói Basic',
    price: '29.000₫',
    tag: 'new',
    img: '/public/banner-desktop-1.jpg',
  },
  {
    id: 2,
    name: 'LocketGold Premium',
    sub: 'Gói 3 Tháng',
    price: '79.000₫',
    tag: 'hot',
    img: '/public/banner-desktop-2.jpg',
  },
  {
    id: 3,
    name: 'LocketGold VIP',
    sub: 'Gói 6 Tháng',
    price: '149.000₫',
    tag: 'hot',
    img: '/public/banner-desktop-3.jpg',
  },
]

// Recent activations (like "Recent plays" in PlayStation UI)
const recent = [
  {
    id: 1,
    name: '@minhkhoi_2k4',
    plan: 'VIP — 6 tháng',
    img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face',
  },
  {
    id: 2,
    name: '@thanhhuyen99',
    plan: 'Basic — 1 tháng',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face',
  },
  {
    id: 3,
    name: '@locphat_hcm',
    plan: 'Premium — 3 tháng',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
  },
]

export default function TrendingSection({ darkMode }) {
  const cardBg = darkMode ? '#252545' : '#ffffff'
  const textMain = darkMode ? '#ffffff' : '#111827'
  const textSub = darkMode ? '#8b92a5' : '#6b7280'
  const dividerColor = darkMode ? 'rgba(255,255,255,0.06)' : '#f3f4f6'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Trending packages — spans 3 cols */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: textMain }}>
            Gói nổi bật 🔥
          </h2>
          <button className="text-xs font-semibold text-yellow-500 flex items-center gap-1 hover:text-yellow-600">
            Xem tất cả <RiArrowRightLine size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {trending.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09 + 0.1 }}
              className="card overflow-hidden cursor-pointer group"
              style={{ background: cardBg }}
            >
              <div className="img-card h-28 relative">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <div className={item.tag === 'new' ? 'tag-new' : 'tag-hot'}>
                  {item.tag === 'new' ? 'NEW' : 'HOT'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-3">
                <p className="text-xs font-bold leading-snug" style={{ color: textMain }}>{item.name}</p>
                <p className="text-xs mt-0.5" style={{ color: textSub }}>{item.sub}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-extrabold text-yellow-500">{item.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg text-black shadow-lg shadow-yellow-500/20 bg-yellow-400"
                  >
                    Mua
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent activations — spans 2 cols */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: textMain }}>Kích hoạt gần đây</h2>
          <button className="text-xs font-semibold text-yellow-500 flex items-center gap-1 hover:text-yellow-600">
            Tất cả <RiArrowRightLine size={13} />
          </button>
        </div>

        <div className="card p-4 flex flex-col gap-0" style={{ background: cardBg }}>
          {recent.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.09 + 0.15 }}
            >
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold leading-snug" style={{ color: textMain }}>{r.name}</p>
                    <p className="text-xs" style={{ color: textSub }}>{r.plan}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-play"
                >
                  Xem
                </motion.button>
              </div>
              {i < recent.length - 1 && (
                <div style={{ height: 1, background: dividerColor }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
