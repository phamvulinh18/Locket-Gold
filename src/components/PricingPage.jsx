import { useState } from 'react'
import { motion } from 'framer-motion'
import { RiFireFill, RiTimeLine, RiVipCrownFill, RiHeart3Fill, RiHeart3Line, RiLayoutGridFill, RiListUnordered } from 'react-icons/ri'
import PricingCards from './PricingCards'

const additionalPackages = [
  {
    id: 1, title: 'Artwork of Graphic Design', author: 'Eriacryth',
    desc: 'From whimsical fairy-like beings to mythical creatures, create unique cute spirit characters.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face',
    liked: true
  },
  {
    id: 2, title: 'Dead Skull Wearing', author: 'UkraineArt',
    desc: 'A detailed illustration a Dead Skull wearing trendy sunglasses, t-shirt design, flowers splash...',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face',
    liked: false
  },
  {
    id: 3, title: '3d Splash art', author: 'UkraineArt',
    desc: '3d Splash art, a cat head, ((white background)), roaring, epic instagram, artstation...',
    img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=600&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face',
    liked: true
  },
  {
    id: 4, title: 'Splash art', author: 'CloneX',
    desc: 'Splash art, a raven head, ((white background)), roaring, epic instagram, artstation, splash style of...',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=600&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
    liked: false
  }
]

export default function PricingPage({ darkMode, setActiveMenu }) {
  const [activeTab, setActiveTab] = useState('trending')
  const bgMain = darkMode ? '#18182F' : '#F2F2F7'
  const textMain = darkMode ? '#ffffff' : '#111827'
  const textSub = darkMode ? '#8b92a5' : '#6b7280'

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* 1. Featured Horizontal Cards (The PricingCards we built) */}
      <PricingCards darkMode={darkMode} />

      {/* 2. Filter / Tabs Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl" style={{ background: darkMode ? '#252545' : '#ffffff', boxShadow: darkMode ? 'none' : '0 2px 10px rgba(0,0,0,0.02)' }}>
          <button 
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'trending' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <RiFireFill size={16} /> Trending
          </button>
          <button 
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'new' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <RiTimeLine size={16} /> New
          </button>
          <button 
            onClick={() => setActiveTab('top')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'top' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <RiVipCrownFill size={16} /> Top
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: darkMode ? '#252545' : '#ffffff' }}>
            <button className="p-1.5 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white">
              <RiLayoutGridFill size={16} />
            </button>
            <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              <RiListUnordered size={16} />
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: darkMode ? '#252545' : '#ffffff' }}>
            <span className="text-gray-400">-</span>
            <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full relative">
              <div className="absolute top-0 left-0 w-1/2 h-full bg-purple-500 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-purple-500 rounded-full shadow-sm"></div>
            </div>
            <span className="text-gray-400">+</span>
          </div>
        </div>

      </div>

      {/* 3. Vertical Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {additionalPackages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
          >
            {/* Background Image */}
            <img 
              src={pkg.img} 
              alt={pkg.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Top Left User Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-sm">
              <img src={pkg.avatar} alt={pkg.author} className="w-6 h-6 rounded-full border border-white/50 object-cover" />
              <span className="text-white text-xs font-bold pr-1 drop-shadow-md">{pkg.author}</span>
            </div>

            {/* Top Right Heart */}
            <button className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors ${pkg.liked ? 'bg-purple-500/80 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}>
              {pkg.liked ? <RiHeart3Fill size={16} /> : <RiHeart3Line size={16} />}
            </button>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-base mb-1 drop-shadow-md leading-tight group-hover:text-purple-300 transition-colors">
                {pkg.title}
              </h3>
              <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed drop-shadow-sm">
                {pkg.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}
