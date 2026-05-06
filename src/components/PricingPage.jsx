import { motion } from 'framer-motion'
import PricingCards from './PricingCards'
import { RiShieldCheckFill, RiFlashlightFill, RiCustomerService2Fill } from 'react-icons/ri'

export default function PricingPage({ darkMode, user, refreshUser }) {
  const textMain = darkMode ? '#FFFFFF' : '#111111'
  const textSub = darkMode ? '#A1A1AA' : '#71717A'

  const features = [
    { icon: RiShieldCheckFill, title: 'Bảo hành 1:1', desc: 'Lỗi là đổi mới ngay lập tức trong suốt thời gian sử dụng.', color: 'text-green-500' },
    { icon: RiFlashlightFill, title: 'Kích hoạt nhanh', desc: 'Hệ thống tự động kích hoạt chỉ trong 30 giây sau khi thanh toán.', color: 'text-yellow-500' },
    { icon: RiCustomerService2Fill, title: 'Hỗ trợ 24/7', desc: 'Đội ngũ kỹ thuật luôn sẵn sàng giải đáp mọi thắc mắc của bạn.', color: 'text-blue-500' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header Section */}
      <div className="text-center space-y-4 pt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 text-yellow-500 text-xs font-black uppercase tracking-widest border border-yellow-400/20"
        >
          💎 Gói cước Premium
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black tracking-tight"
          style={{ color: textMain }}
        >
          Nâng cấp trải nghiệm <span className="text-yellow-500">Locket</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg max-w-2xl mx-auto font-medium"
          style={{ color: textSub }}
        >
          Chọn gói cước phù hợp để tận hưởng trọn bộ tính năng Gold: Up ảnh không giới hạn, không quảng cáo và huy hiệu xác minh.
        </motion.p>
      </div>

      {/* Pricing Cards - Đã thêm truyền prop user */}
      <div className="px-2 sm:px-4">
        <PricingCards darkMode={darkMode} user={user} refreshUser={refreshUser} />
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="p-6 rounded-[2rem] border transition-all hover:scale-[1.02]"
            style={{ 
              background: darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff',
              borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'
            }}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
              <f.icon size={24} className={f.color} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: textMain }}>{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: textSub }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
      
      {/* FAQ Link or Support */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-10"
      >
        <p className="text-sm font-medium" style={{ color: textSub }}>
          Bạn cần hỗ trợ riêng? <a href="/support" className="text-yellow-500 font-bold hover:underline">Liên hệ tư vấn viên ngay</a>
        </p>
      </motion.div>
    </div>
  )
}
