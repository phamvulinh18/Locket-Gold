import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiFlashlightFill } from 'react-icons/ri'
import PricingCards from './PricingCards'
import OrdersTable from './OrdersTable'
import TrendingSection from './TrendingSection'
export default function Dashboard({ activeMenu, setActiveMenu, darkMode }) {
  const bannerImages = [
    { desktop: '/banner-desktop-1.jpg', mobile: '/banner-mobile-1.jpg' },
    { desktop: '/banner-desktop-2.jpg', mobile: '/banner-mobile-2.jpg' },
    { desktop: '/banner-desktop-3.jpg', mobile: '/banner-mobile-3.jpg' },
  ]
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col gap-5 max-w-5xl pb-6">

      {/* === HERO BANNER SLIDER === */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl"
        style={{ height: 'calc(100vh - 110px)' }}
      >
        <AnimatePresence>
          <motion.picture
            key={currentSlide}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 w-full h-full block"
          >
            {/* Mobile Image (< 640px) */}
            <source media="(max-width: 640px)" srcSet={bannerImages[currentSlide].mobile} />
            {/* Desktop Image (Fallback & Default) */}
            <img
              src={bannerImages[currentSlide].desktop}
              alt="LocketGold Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if user hasn't added images yet
                e.currentTarget.src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&sig=${currentSlide}`
              }}
            />
          </motion.picture>
        </AnimatePresence>

        {/* No text/buttons overlay as requested */}

      </motion.div>

      {/* Stats Cards removed as requested */}

      {/* === TRENDING SECTION === */}
      <TrendingSection darkMode={darkMode} />

      {/* === PRICING CARDS === */}
      <PricingCards darkMode={darkMode} setActiveMenu={setActiveMenu} />

      {/* === ORDERS TABLE === */}
      <OrdersTable darkMode={darkMode} />
    </div>
  )
}
