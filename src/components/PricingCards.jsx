import { motion } from 'framer-motion'
import { RiFlashlightFill, RiCheckboxCircleLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PaymentModal from './PaymentModal'

const plans = [
  {
    id: 'basic',
    name: 'Locket Gold Basic',
    desc: 'Up Locket Gold bằng Shadowrocket.',
    price: '49,000',
    priceValue: '49k',
    icon: '/img/level/svip-1.gif',
    features: [
      'Mở khóa Locket Gold',
      'Không quảng cáo',
      'Upload ảnh từ thư viện',
      'Quay video Lockets 5s',
      'Xem những ai đã xem Lockets của bạn',
      'Thay đổi icon Locket',
      'Mở khóa giới hạn bạn bè',
      'Huy hiệu Locket Gold'
    ],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Locket Gold Pro',
    desc: 'Up Locket Gold bằng Username Locket.',
    price: '89,000',
    priceValue: '89k',
    icon: '/img/level/svip-2.gif',
    features: [
      'Mở khóa Locket Gold',
      'Không quảng cáo',
      'Upload ảnh từ thư viện',
      'Quay video Lockets 5s',
      'Xem những ai đã xem Lockets của bạn',
      'Thay đổi icon Locket',
      'Mở khóa giới hạn bạn bè',
      'Huy hiệu Locket Gold'
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Locket Gold Premium',
    desc: 'Up Locket Gold bằng Username Locket.',
    price: '199,000',
    priceValue: '199k',
    icon: '/img/level/svip-10.gif',
    features: [
      'Mở khóa Locket Gold',
      'Không quảng cáo',
      'Upload ảnh từ thư viện',
      'Quay video Lockets 15s',
      'Xem những ai đã xem Lockets của bạn',
      'Thay đổi icon Locket',
      'Mở khóa giới hạn bạn bè',
      'Huy hiệu Locket Gold'
    ],
    recommended: true
  }
]

export default function PricingCards({ darkMode, user, refreshUser }) {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBuyPlan = (plan) => {
    if (!user) {
      alert('Vui lòng đăng nhập tài khoản để thực hiện mua gói VIP! 🎉')
      navigate('/account')
      return
    }
    const modalPlan = {
       ...plan,
       stat3Value: plan.priceValue
    }
    setSelectedPlan(modalPlan)
    setIsModalOpen(true)
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => {
          // Kiểm tra xem user đã sở hữu gói này chưa
          const isOwned = user?.active_plans?.includes(plan.id);

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-6 rounded-[2rem] flex flex-col items-center text-center border transition-all duration-500 group ${plan.recommended ? 'scale-105 z-10' : ''}`}
              style={{ 
                background: darkMode 
                  ? `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))` 
                  : `linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))`,
                borderColor: isOwned ? 'rgba(34, 197, 94, 0.3)' : (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
                backdropFilter: 'blur(20px)',
                boxShadow: plan.recommended ? '0 20px 40px -10px rgba(245, 158, 11, 0.15)' : 'none'
              }}
            >
              {plan.recommended && !isOwned && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-600 text-black text-[9px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                  ⭐ Khuyên dùng
                </div>
              )}

              {isOwned && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                  ✓ Đang sử dụng
                </div>
              )}

              <div className="mb-6 flex flex-col items-center">
                <div className="w-20 h-20 mb-4 flex items-center justify-center overflow-hidden">
                   <img src={plan.icon} alt="Level Icon" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-black mb-1" style={{ color: darkMode ? '#fff' : '#111' }}>{plan.name}</h3>
                <p className="text-[11px] font-medium opacity-70" style={{ color: darkMode ? '#A1A1AA' : '#71717A' }}>{plan.desc}</p>
              </div>

              <div className="mb-6">
                 <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-black" style={{ color: darkMode ? '#fff' : '#111' }}>{plan.price}đ</span>
                 </div>
                 <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-tight">Vĩnh Viễn</span>
              </div>

              <div className="flex-1 w-full space-y-3.5 mb-8 text-left">
                 {plan.features.map((feature, idx) => {
                    const isHuyHieu = feature === 'Huy hiệu Locket Gold';
                    const isGray = isHuyHieu && plan.id !== 'premium';
                    
                    return (
                      <div key={idx} className="flex items-start gap-2.5">
                         <img 
                            src="/img/icon/verify.png" 
                            alt="check" 
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isGray ? 'opacity-30 grayscale' : ''}`} 
                         />
                         <span className="text-[12px] font-medium leading-tight" style={{ 
                            color: isGray ? (darkMode ? '#71717A' : '#A1A1AA') : (darkMode ? '#D4D4D8' : '#3F3F46'),
                            opacity: isGray ? 0.6 : 1
                         }}>
                            {feature}
                         </span>
                      </div>
                    );
                 })}
              </div>

              <motion.button
                whileHover={!isOwned ? { scale: 1.02, boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.4)' } : {}}
                whileTap={!isOwned ? { scale: 0.98 } : {}}
                onClick={() => !isOwned && handleBuyPlan(plan)}
                disabled={isOwned}
                className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${isOwned ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
                style={{ 
                  background: isOwned 
                    ? (darkMode ? 'rgba(34, 197, 94, 0.2)' : '#f0fdf4')
                    : (plan.recommended ? 'linear-gradient(135deg, #F59E0B, #D97706)' : (darkMode ? 'rgba(255,255,255,0.05)' : '#111')),
                  color: isOwned ? '#22c55e' : (plan.recommended ? '#000' : '#fff'),
                  border: isOwned ? '1px solid rgba(34, 197, 94, 0.5)' : 'none'
                }}
              >
                {isOwned ? <RiCheckboxCircleLine size={18} /> : <RiFlashlightFill size={18} />}
                {isOwned ? 'Đang sử dụng' : 'Nâng cấp ngay'}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        darkMode={darkMode}
        user={user}
        refreshUser={refreshUser}
      />
    </div>
  )
}
