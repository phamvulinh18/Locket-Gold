import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiUserFill, RiMailFill, RiLockPasswordFill,
  RiEyeLine, RiEyeOffLine, RiCheckLine,
  RiErrorWarningLine, RiLoader4Line,
  RiLogoutBoxLine
} from 'react-icons/ri'

const initialForm = { username: '', email: '', password: '', confirmPassword: '' }
const API_BASE_URL = "http://localhost:8088/locketgold"

function validate(form, isLogin) {
  const e = {}
  if (isLogin) {
     if (!form.username.trim()) e.username = 'Vui lòng nhập tài khoản'
  } else {
     if (!form.username.trim()) e.username = 'Vui lòng nhập username'
     else if (form.username.length < 3) e.username = 'Username tối thiểu 3 ký tự'
     
     if (!form.email.trim()) e.email = 'Vui lòng nhập gmail'
     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Gmail không hợp lệ'
     
     if (!form.confirmPassword) e.confirmPassword = 'Vui lòng nhập lại mật khẩu'
     else if (form.password !== form.confirmPassword) e.confirmPassword = 'Mật khẩu không khớp'
  }
  
  if (!form.password) e.password = 'Vui lòng nhập mật khẩu'
  return e
}

function InputField({ icon: Icon, label, error, darkMode, ...props }) {
  const [focused, setFocused] = useState(false)
  const bg = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)'
  const border = error ? '#ef4444' : focused ? '#F0E000' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  return (
    <div>
      <label className="block text-[11px] font-bold mb-1.5 ml-1" style={{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: error ? '#ef4444' : focused ? '#F0E000' : darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }} />
        <input
          {...props}
          onFocus={e => { setFocused(true); props.onFocus?.(e) }}
          onBlur={e => { setFocused(false); props.onBlur?.(e) }}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all"
          style={{ background: bg, color: darkMode ? '#fff' : '#111', border: `1.5px solid ${border}`, backdropFilter: 'blur(10px)' }}
        />
      </div>
      {error && <p className="text-[11px] text-red-400 mt-1 ml-1 flex items-center gap-1"><RiErrorWarningLine size={12} />{error}</p>}
    </div>
  )
}

function PasswordField({ label, error, darkMode, value, onChange, placeholder }) {
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)
  const bg = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)'
  const border = error ? '#ef4444' : focused ? '#F0E000' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  return (
    <div>
      <label className="block text-[11px] font-bold mb-1.5 ml-1" style={{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}>{label}</label>
      <div className="relative">
        <RiLockPasswordFill className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: error ? '#ef4444' : focused ? '#F0E000' : darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }} />
        <input
          type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full pl-10 pr-11 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all"
          style={{ background: bg, color: darkMode ? '#fff' : '#111', border: `1.5px solid ${border}`, backdropFilter: 'blur(10px)' }}
        />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5" style={{ color: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)' }}>
          {show ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-400 mt-1 ml-1 flex items-center gap-1"><RiErrorWarningLine size={12} />{error}</p>}
    </div>
  )
}

export default function AccountPage({ darkMode, user, setUser }) {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [apiError, setApiError] = useState('')

  const set = (k, v) => { 
    setForm(f => ({ ...f, [k]: v })); 
    setErrors(e => ({ ...e, [k]: '' }));
    setApiError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form, isLogin)
    if (Object.keys(errs).length) { setErrors(errs); return }
    
    setLoading(true)
    setApiError('')

    try {
      const action = isLogin ? 'login' : 'register'
      const response = await fetch(`${API_BASE_URL}/auth.php?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const result = await response.json()

      if (result.success) {
        if (isLogin) {
          localStorage.setItem('locketgold-user', JSON.stringify(result.user))
          setUser(result.user)
          setSuccess('Đăng nhập thành công! 🎉')
        } else {
          setSuccess('Đăng ký thành công! Mời bạn đăng nhập. 🎉')
          setIsLogin(true)
          setForm(initialForm)
        }
      } else {
        setApiError(result.error || 'Có lỗi xảy ra, vui lòng thử lại')
      }
    } catch (err) {
      setApiError('Không thể kết nối tới Server XAMPP')
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('locketgold-user')
    setUser(null)
  }

  const switchMode = () => { setIsLogin(!isLogin); setErrors({}); setSuccess(''); setApiError(''); setForm(initialForm) }

  const cardBg = darkMode ? '#1e1e3a' : '#ffffff'

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-full py-10 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md p-8 rounded-[2.5rem] text-center shadow-xl" style={{ background: cardBg }}>
          <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden mb-6 border-4 border-yellow-400/20">
             <img src={`https://ui-avatars.com/api/?name=${user.username}&background=F0E000&color=000&size=128&bold=true`} alt="Avatar" />
          </div>
          <h2 className="text-2xl font-black mb-1" style={{ color: darkMode ? '#fff' : '#111' }}>{user.username}</h2>
          <p className="text-sm mb-8" style={{ color: darkMode ? '#A1A1AA' : '#71717A' }}>{user.email}</p>
          
          <div className="space-y-3">
             <div className="p-4 rounded-2xl text-left flex items-center justify-between" style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : '#f9fafb' }}>
                <span className="text-xs font-bold text-gray-500">Loại tài khoản</span>
                <span className="text-xs font-black text-amber-500 uppercase">Thành viên</span>
             </div>
             <button onClick={handleLogout} className="w-full py-4 rounded-2xl font-bold text-sm bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                <RiLogoutBoxLine size={18} /> Đăng xuất
             </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex items-start justify-center min-h-full py-4 px-2">
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff' }}>
            <RiCheckLine size={18} />{success}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30 mb-3">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-black" style={{ color: darkMode ? '#fff' : '#111' }}>Locket<span className="text-yellow-500">Gold</span></h1>
        </div>

        <div className="rounded-3xl p-6 sm:p-8 shadow-xl" style={{ background: cardBg, border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}` }}>
          <div className="flex rounded-2xl p-1 mb-6" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => { if (v !== isLogin) switchMode() }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ color: isLogin === v ? (darkMode ? '#fff' : '#111') : (darkMode ? '#6b7280' : '#9ca3af'), background: isLogin === v ? (darkMode ? '#252545' : '#fff') : 'transparent' }}>
                {v ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            ))}
          </div>

          {apiError && <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold flex items-center gap-2"><RiErrorWarningLine size={16} />{apiError}</div>}

          <AnimatePresence mode="wait">
            <motion.form key={isLogin ? 'login' : 'register'} initial={{ opacity: 0, x: isLogin ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: isLogin ? -20 : 20 }} transition={{ duration: 0.25 }}
              onSubmit={handleSubmit} className="space-y-3.5">

              <InputField icon={RiUserFill} label="Tài khoản (Username/Gmail)" placeholder="nguyenvana" darkMode={darkMode} value={form.username} onChange={e => set('username', e.target.value)} error={errors.username} />
              {!isLogin && <InputField icon={RiMailFill} label="Gmail" placeholder="email@gmail.com" type="email" darkMode={darkMode} value={form.email} onChange={e => set('email', e.target.value)} error={errors.email} />}
              <PasswordField label="Mật khẩu" placeholder="••••••••" darkMode={darkMode} value={form.password} onChange={e => set('password', e.target.value)} error={errors.password} />
              {!isLogin && <PasswordField label="Nhập lại mật khẩu" placeholder="••••••••" darkMode={darkMode} value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} error={errors.confirmPassword} />}

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70 mt-2"
                style={{ background: 'linear-gradient(135deg, #F0E000, #d4a017)', color: '#1a1a1a', boxShadow: '0 4px 20px rgba(240,224,0,0.4)' }}>
                {loading ? <RiLoader4Line size={18} className="animate-spin" /> : (isLogin ? 'Đăng nhập' : 'Đăng ký ngay')}
              </motion.button>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
