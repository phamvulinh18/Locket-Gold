import { motion } from 'framer-motion'
import { RiVerifiedBadgeFill, RiFlashlightFill, RiBookmarkLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useState } from 'react'
import PaymentModal from './PaymentModal'

import 'swiper/css'

const plans = [
  {
    id: 'vip1',
    name: 'VIP 1 Cá nhân',
    desc: 'Kích hoạt 1 tài khoản Locket Gold. Không cần chia sẻ Password, an toàn 100%.',
    stat1Value: '1', stat1Label: 'Tài khoản',
    stat2Value: '1 Năm', stat2Label: 'Bảo hành',
    stat3Value: '99k', stat3Label: 'Chi phí',
    img: '/banner-desktop-1.jpg',
  },
  {
    id: 'vip2',
    name: 'VIP 2 Cặp Đôi',
    desc: 'Kích hoạt nhanh chóng 2 tài khoản độc lập. Giải pháp siêu tiết kiệm cho cặp đôi.',
    stat1Value: '2', stat1Label: 'Tài khoản',
    stat2Value: '1 Năm', stat2Label: 'Bảo hành',
    stat3Value: '189k', stat3Label: 'Chi phí',
    img: '/banner-desktop-2.jpg',
  },
  {
    id: 'vip3',
    name: 'VIP 3 Gia Đình',
    desc: 'Kích hoạt 3 tài khoản. Sử dụng riêng tư trên 3 thiết bị iPhone khác nhau.',
    stat1Value: '3', stat1Label: 'Tài khoản',
    stat2Value: '1 Năm', stat2Label: 'Bảo hành',
    stat3Value: '269k', stat3Label: 'Chi phí',
    img: '/banner-desktop-3.jpg',
  },
  {
    id: 'vip4',
    name: 'VIP 4 Cao Cấp',
    desc: 'Hoàn hảo cho nhóm bạn thân. Kích hoạt lên tới 5 tài khoản độc lập cực nhanh.',
    stat1Value: '5', stat1Label: 'Tài khoản',
    stat2Value: '1 Năm', stat2Label: 'Bảo hành',
    stat3Value: '399k', stat3Label: 'Chi phí',
    img: '/banner-desktop-1.jpg',
  },
]

export default function PricingCards({ darkMode, user }) {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBuyPlan = (plan) => {
    // Sửa logic check đăng nhập ở đây
    if (!user) {
      alert('Vui lòng đăng nhập tài khoản để thực hiện mua gói VIP! 🎉')
      navigate('/account')
      return
    }

    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const textMain = darkMode ? '#FFFFFF' : '#111111'
  const textSub = darkMode ? '#A1A1AA' : '#71717A'

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-xl font-black tracking-tight" style={{ color: textMain }}>
          Chọn gói phù hợp với nhu cầu
        </h2>
        <span className="text-sm font-medium" style={{ color: textSub }}>
          Thanh toán tự động 3s
        </span>
      </div>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView="auto"
        spaceBetween={20}
        grabCursor={true}
        className="pb-10"
      >
        {plans.map((plan, i) => (
          <SwiperSlide key={plan.id} style={{ width: 'auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-1.5 rounded-[2rem] w-[280px] sm:w-[320px]"
              style={{ background: darkMode ? '#252545' : '#E8E8E9' }}
            >
              <div className="relative w-full aspect-[3/4] sm:h-[450px] rounded-[1.75rem] overflow-hidden group">
                <img src={plan.img} alt={plan.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80&sig=${i}` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                    <RiVerifiedBadgeFill className="text-blue-500 text-lg" />
                  </div>
                  <p className="text-[#a1a1aa] text-xs leading-relaxed mb-5 line-clamp-2">{plan.desc}</p>
                  <div className="flex items-center justify-between mb-5 px-1 text-white">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-sm">{plan.stat1Value}</span>
                      <span className="text-[#71717a] text-[10px]">{plan.stat1Label}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-sm">{plan.stat2Value}</span>
                      <span className="text-[#71717a] text-[10px]">{plan.stat2Label}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-sm">{plan.stat3Value}</span>
                      <span className="text-[#71717a] text-[10px]">{plan.stat3Label}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleBuyPlan(plan)}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-yellow-500/30">
                      <RiFlashlightFill size={18} /> Mua ngay
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        darkMode={darkMode}
        user={user}
      />
    </div>
  )
}
