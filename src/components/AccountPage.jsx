import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RiUserFill, RiMailFill, RiLockPasswordFill, 
  RiDiscordFill, RiTwitchFill, RiTwitterFill, RiFacebookCircleFill 
} from 'react-icons/ri'

export default function AccountPage({ darkMode }) {
  const [isLogin, setIsLogin] = useState(false)

  const bgColor = darkMode ? '#064e3b' : '#a5d15a'
  const shapeColor1 = darkMode ? '#065f46' : '#8db845'
  const shapeColor2 = darkMode ? '#022c22' : '#b8e56b'
  const textTitle = darkMode ? '#ffffff' : '#1a1a1a'
  const textLabel = darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'

  return (
    <div className="relative h-full min-h-[550px] w-full overflow-hidden rounded-[2rem] flex flex-col lg:flex-row shadow-2xl transition-colors duration-500"
      style={{ background: bgColor }}
    >
      
      {/* Background geometric shapes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[120%] rotate-12 skew-x-12 transition-colors duration-500"
          style={{ background: shapeColor1 }}></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[80%] -rotate-12 transition-colors duration-500"
          style={{ background: shapeColor2 }}></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col p-6 lg:p-10 max-w-3xl">
        
        <AnimatePresence mode="wait">
          {!isLogin ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="mb-6">
                <p className="font-bold text-[10px] tracking-widest mb-0.5" style={{ color: textLabel }}>START FOR FREE</p>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2" style={{ color: textTitle }}>
                  CREATE NEW ACCOUNT
                </h1>
                <p className="text-xs font-bold" style={{ color: textTitle }}>
                  Already A Member? <button onClick={() => setIsLogin(true)} className="text-[#ef4444] hover:underline ml-1">Log In</button>
                </p>
              </div>

              {/* Form */}
              <form className="space-y-3.5 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-black ml-3" style={{ color: textLabel }}>First name</label>
                    <div className="relative">
                      <input type="text" placeholder="KIM" className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs focus:outline-none shadow-sm transition-all ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-black'}`} />
                      <RiUserFill className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/30' : 'text-black/20'}`} size={16} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] font-black ml-3" style={{ color: textLabel }}>Last name</label>
                    <div className="relative">
                      <input type="text" placeholder="VENOM" className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs focus:outline-none shadow-sm transition-all ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-black'}`} />
                      <RiUserFill className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/30' : 'text-black/20'}`} size={16} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-black ml-3" style={{ color: textLabel }}>Username</label>
                  <div className="relative">
                    <input type="text" placeholder="VENOMDESIGNS" className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs focus:outline-none shadow-sm transition-all ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-black'}`} />
                    <RiUserFill className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/30' : 'text-black/20'}`} size={16} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-black ml-3" style={{ color: textLabel }}>Email</label>
                  <div className="relative">
                    <input type="email" placeholder="kimvenomdesign@thankyou.com" className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs focus:outline-none shadow-sm transition-all ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-black'}`} />
                    <RiMailFill className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/30' : 'text-black/20'}`} size={16} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-black ml-3" style={{ color: textLabel }}>Password</label>
                  <div className="relative">
                    <input type="password" placeholder="************" className={`w-full px-4 py-2.5 rounded-xl font-bold text-xs focus:outline-none shadow-sm transition-all ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-black'}`} />
                    <RiLockPasswordFill className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/30' : 'text-black/20'}`} size={16} />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#ff6b00] text-white px-8 py-3 rounded-lg font-black text-[10px] tracking-widest shadow-lg shadow-orange-600/20 uppercase transition-all mt-4"
                >
                  CREATE ACCOUNT
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="mb-6">
                <p className="font-bold text-[10px] tracking-widest mb-0.5" style={{ color: textLabel }}>WELCOME BACK</p>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2" style={{ color: textTitle }}>
                  LOG IN TO ACCOUNT
                </h1>
                <p className="text-xs font-bold" style={{ color: textTitle }}>
                  Not A Member? <button onClick={() => setIsLogin(false)} className="text-[#ef4444] hover:underline ml-1">Join Now</button>
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black ml-3" style={{ color: textLabel }}>Email / Username</label>
                  <div className="relative">
                    <input type="text" placeholder="VENOMDESIGNS" className={`w-full px-4 py-3 rounded-xl font-bold text-xs focus:outline-none shadow-sm transition-all ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-black'}`} />
                    <RiUserFill className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/30' : 'text-black/20'}`} size={16} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-black ml-3" style={{ color: textLabel }}>Password</label>
                  <div className="relative">
                    <input type="password" placeholder="************" className={`w-full px-4 py-3 rounded-xl font-bold text-xs focus:outline-none shadow-sm transition-all ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-black'}`} />
                    <RiLockPasswordFill className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/30' : 'text-black/20'}`} size={16} />
                  </div>
                </div>

                <div className="flex justify-end px-1">
                  <button className="text-[10px] font-bold hover:text-black dark:hover:text-white" style={{ color: textLabel }}>Forgot Password?</button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#ff6b00] text-white px-10 py-3 rounded-lg font-black text-[10px] tracking-widest shadow-lg shadow-orange-600/20 uppercase transition-all mt-4"
                >
                  LOG IN
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Socials */}
        <div className="mt-auto pt-8 flex items-center gap-5">
          <RiDiscordFill className="text-white hover:text-black cursor-pointer transition-colors" size={20} />
          <RiTwitchFill className="text-white hover:text-black cursor-pointer transition-colors" size={20} />
          <RiTwitterFill className="text-white hover:text-black cursor-pointer transition-colors" size={20} />
          <RiFacebookCircleFill className="text-white hover:text-black cursor-pointer transition-colors" size={20} />
        </div>
      </div>

      {/* Right Side: Character Image */}
      <div className="hidden lg:block lg:w-1/2 relative pointer-events-none">
        <motion.img 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src="/auth-bg.png" 
          alt="Character" 
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient to blend left side */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#a5d15a] to-transparent z-30"></div>
      </div>
    </div>
  )
}
