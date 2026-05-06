import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiUser3Fill, RiMailFill, RiPhoneFill, RiSave3Fill, RiLogoutBoxLine, RiCameraFill, RiVerifiedBadgeFill, RiLoader4Line, RiGoogleFill, RiGithubFill, RiFacebookFill, RiLockPasswordFill } from 'react-icons/ri'
import { toast } from './Toast'

export default function AccountPage({ darkMode, user, setUser }) {
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    avatar: '/img/users/avatar-default%20copy.jpg'
  })

  const [isLogin, setIsLogin] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [authData, setAuthData] = useState({ username: '', password: '', confirmPassword: '', email: '' })

  // Đồng bộ formData khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '/img/users/avatar-default%20copy.jpg'
      })
    }
  }, [user])

  const handleAuth = async (e) => {
    if (e) e.preventDefault()
    
    // Kiểm tra nhập lại mật khẩu khi đăng ký
    if (!isLogin && authData.password !== authData.confirmPassword) {
      return toast("Mật khẩu nhập lại không khớp!", "error")
    }

    setLoading(true)
    const action = isLogin ? 'login' : 'register'
    try {
      const res = await fetch(`http://localhost:8088/locketgold/auth.php?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
      })
      const data = await res.json()
      if (data.success) {
        toast(isLogin ? "Chào mừng bạn quay trở lại! ✨" : "Đăng ký tài khoản thành công! 🎉")
        setUser(data.user)
        localStorage.setItem('locketgold-user', JSON.stringify(data.user))
        if (rememberMe) localStorage.setItem('locketgold-remember', 'true')
      } else {
        toast(data.message, "error")
      }
    } catch (err) {
      toast("Lỗi kết nối server", "error")
    } finally {
      setLoading(false)
    }
  }

  const cardBg = darkMode ? '#1e1e3a' : '#ffffff'
  const inputBg = darkMode ? 'rgba(255,255,255,0.05)' : '#f9fafb'
  const textColor = darkMode ? '#fff' : '#111'

  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-2xl border relative overflow-hidden"
          style={{ background: cardBg, borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}
        >
          <div className="text-center mb-8">
            <img src="/logo-locket.png" alt="Logo" className="w-14 h-14 mx-auto mb-4 object-contain" />
            <h2 className="text-xl font-black mb-1" style={{ color: textColor }}>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest" style={{ color: textColor }}>Hệ thống Locket Gold</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-3.5">
            <div className="relative group">
              <RiUser3Fill className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={16} />
              <input 
                type="text" required placeholder="Tên đăng nhập"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                style={{ background: inputBg, color: textColor }}
                onChange={e => setAuthData({...authData, username: e.target.value})}
              />
            </div>

            {!isLogin && (
              <div className="relative group">
                <RiMailFill className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={16} />
                <input 
                  type="email" required placeholder="Địa chỉ Gmail"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                  style={{ background: inputBg, color: textColor }}
                  onChange={e => setAuthData({...authData, email: e.target.value})}
                />
              </div>
            )}

            <div className="relative group">
              <RiLockPasswordFill className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={16} />
              <input 
                type="password" required placeholder="Mật khẩu"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                style={{ background: inputBg, color: textColor }}
                onChange={e => setAuthData({...authData, password: e.target.value})}
              />
            </div>

            {!isLogin && (
              <div className="relative group">
                <RiLockPasswordFill className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={16} />
                <input 
                  type="password" required placeholder="Nhập lại mật khẩu"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                  style={{ background: inputBg, color: textColor }}
                  onChange={e => setAuthData({...authData, confirmPassword: e.target.value})}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-white/20'}`}>
                    {rememberMe && <RiSave3Fill className="text-white" size={10} />}
                  </div>
                  <span className="text-[11px] font-bold opacity-60" style={{ color: textColor }}>Ghi nhớ</span>
                </label>
                <button type="button" className="text-[11px] font-bold text-blue-500 hover:underline">Quên mật khẩu?</button>
              </div>
            )}

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Đang tải...' : (isLogin ? 'Đăng nhập' : 'Tạo tài khoản')}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-white/10"></div></div>
              <span className="relative px-3 text-[10px] font-bold uppercase opacity-30" style={{ background: cardBg, color: textColor }}>Hoặc dùng</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center py-3 rounded-xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-600 dark:text-gray-300">
                <RiGoogleFill size={18} />
              </button>
              <button className="flex items-center justify-center py-3 rounded-xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-600 dark:text-gray-300">
                <RiFacebookFill size={18} />
              </button>
              <button className="flex items-center justify-center py-3 rounded-xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-600 dark:text-gray-300">
                <RiGithubFill size={18} />
              </button>
            </div>
          </div>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-6 text-[11px] font-bold text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-wider"
          >
            {isLogin ? 'Tạo tài khoản mới' : 'Đã có tài khoản?'}
          </button>
        </motion.div>
      </div>
    )
  }

  const handleUpdate = async (customData = null) => {
    setLoading(true)
    const dataToSend = customData || formData
    try {
      const res = await fetch(`http://localhost:8088/locketgold/update_profile.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dataToSend, username: user?.username })
      })
      const data = await res.json()
      if (data.success) {
        toast("Cập nhật thông tin thành công! ✨")
        setUser(data.user)
        localStorage.setItem('locketgold-user', JSON.stringify(data.user))
      } else {
        toast(data.message, "error")
      }
    } catch (err) {
      toast("Lỗi kết nối server", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Giới hạn 2MB cho Base64
        return toast("Ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.", "error")
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData({ ...formData, avatar: base64String })
        // Cập nhật database ngay lập tức khi đổi ảnh
        handleUpdate({ ...formData, avatar: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('locketgold-user')
      setUser(null)
    }
  }

  const isVip = user?.active_plans?.length > 0

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cột trái: Avatar & Tổng quan */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-[2.5rem] text-center shadow-xl border" style={{ background: cardBg, borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
            <div className="relative w-32 h-32 mx-auto mb-6 group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-yellow-500/20 relative z-0 shadow-inner bg-gray-200">
                 <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover transition-all group-hover:scale-110 group-hover:blur-[2px]" />
              </div>
              
              {/* Lớp phủ khi Hover */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <RiCameraFill size={28} className="text-white mb-1" />
                <span className="text-[10px] font-black text-white uppercase tracking-wider">Thay ảnh</span>
              </div>

              {isVip && (
                <img 
                  src="/img/icon/khung/premium.webp" 
                  className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] max-w-none z-10 pointer-events-none scale-110" 
                  alt="Frame" 
                />
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
            
            <h2 className="text-2xl font-black mb-1 flex items-center justify-center gap-2" style={{ color: textColor }}>
              {user?.username}
              {isVip && <RiVerifiedBadgeFill className="text-blue-500" size={20} />}
            </h2>
            <div className="flex items-center justify-center gap-1.5">
              {isVip && <img src="/img/icon/legacy.png" alt="Legacy" className="w-4 h-4" />}
              <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest">{isVip ? 'Thành viên VIP' : 'Thành viên thường'}</p>
            </div>
            
            <button onClick={handleLogout} className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-all">
              <RiLogoutBoxLine size={20} /> Đăng xuất
            </button>
          </div>
        </motion.div>

        {/* Cột phải: Form chỉnh sửa */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <div className="p-8 rounded-[2.5rem] shadow-xl border" style={{ background: cardBg, borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black" style={{ color: textColor }}>Chỉnh sửa hồ sơ</h3>
              {loading && <RiLoader4Line className="animate-spin text-blue-500" size={24} />}
            </div>
            
            <div className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black opacity-50 ml-2" style={{ color: textColor }}>Họ và tên</label>
                <div className="relative">
                  <RiUser3Fill className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{ color: textColor }} />
                  <input 
                    type="text" 
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    placeholder="Nhập họ và tên..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                    style={{ background: inputBg, color: textColor }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black opacity-50 ml-2" style={{ color: textColor }}>Email / Gmail</label>
                <div className="relative">
                  <RiMailFill className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{ color: textColor }} />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@gmail.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                    style={{ background: inputBg, color: textColor }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black opacity-50 ml-2" style={{ color: textColor }}>Số điện thoại</label>
                <div className="relative">
                  <RiPhoneFill className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" style={{ color: textColor }} />
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Nhập số điện thoại..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                    style={{ background: inputBg, color: textColor }}
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleUpdate()}
              disabled={loading}
              className="mt-10 w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? <RiLoader4Line className="animate-spin" /> : <RiSave3Fill size={20} />}
              Lưu thông tin
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
