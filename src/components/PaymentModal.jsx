import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiFileCopyLine, RiCheckLine, RiTimeLine, RiInformationLine, RiCheckboxCircleFill, RiLoader4Line } from 'react-icons/ri'
import { useState, useEffect } from 'react'

export default function PaymentModal({ isOpen, onClose, plan, darkMode, user }) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)
  const [orderStatus, setOrderStatus] = useState('pending')

  // Port đã đổi thành 8088 theo XAMPP của bạn
  const API_BASE_URL = "http://localhost:8088/locketgold"
  const BANK_ID = "MB"
  const ACCOUNT_NO = "126135"
  const ACCOUNT_NAME = "PHAM VU LINH"

  const username = user?.username || 'user'
  const planName = plan?.id?.toUpperCase() || 'VIP'
  const TRANSFER_CONTENT = `${planName} ${username}`

  useEffect(() => {
    if (!isOpen || !plan || !user) return

    const createOrder = async () => {
      try {
        const priceNumeric = parseInt(plan.stat3Value.replace('k', '')) * 1000
        await fetch(`${API_BASE_URL}/create_order.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            planId: plan.id,
            amount: priceNumeric,
            transferContent: TRANSFER_CONTENT
          })
        })
        setOrderStatus('pending')
      } catch (err) {
        console.error('Lỗi tạo đơn MySQL:', err)
      }
    }

    createOrder()
    setTimeLeft(600)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || orderStatus === 'completed') return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/check_status.php?content=${encodeURIComponent(TRANSFER_CONTENT)}`)
        const data = await res.json()
        if (data.status === 'completed') {
          setOrderStatus('completed')
          clearInterval(interval)
        }
      } catch (err) { }
    }, 3000)

    return () => clearInterval(interval)
  }, [isOpen, orderStatus])

  useEffect(() => {
    if (!isOpen) return
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [isOpen])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!plan) return null

  const priceNumeric = plan.stat3Value.replace('k', '000')
  const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.jpg?amount=${priceNumeric}&addInfo=${encodeURIComponent(TRANSFER_CONTENT)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ background: darkMode ? '#1e1e3a' : '#ffffff' }}>
            <AnimatePresence>
              {orderStatus === 'completed' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[2.5rem]" style={{ background: darkMode ? '#1e1e3a' : '#ffffff' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-2xl shadow-green-500/40">
                    <RiCheckboxCircleFill size={48} className="text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-black mb-2" style={{ color: darkMode ? '#fff' : '#111' }}>Thanh toán thành công! 🎉</h2>
                  <p className="text-sm mb-8" style={{ color: darkMode ? '#A1A1AA' : '#71717A' }}>Gói <strong>{plan.name}</strong> đã kích hoạt.</p>
                  <button onClick={onClose} className="px-8 py-3 rounded-2xl font-bold text-sm text-black shadow-lg" style={{ background: '#F0E000' }}>Tuyệt vời!</button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"><span className="text-white font-bold text-xs">QR</span></div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: darkMode ? '#fff' : '#111' }}>Thanh toán MB Bank</h3>
                  <p className="flex items-center gap-1 text-[10px] font-bold text-amber-500"><RiLoader4Line size={10} className="animate-spin" /> Đang kiểm tra...</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" style={{ color: darkMode ? '#A1A1AA' : '#71717A' }}><RiCloseLine size={24} /></button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                  <div className="relative p-3 bg-white rounded-3xl shadow-inner border-4 border-blue-500/10 mb-4 group">
                    <img src={qrUrl} alt="VietQR Code" className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 text-[11px] font-bold"><RiTimeLine className="animate-pulse" /> Hết hạn sau: {formatTime(timeLeft)}</div>
                </div>
                <div className="flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-blue-500/30 transition-all text-blue-600 font-black">
                      <span className="text-[10px] uppercase font-bold text-[#A1A1AA] block mb-1">Số tiền</span>
                      <span className="text-xl">{parseInt(priceNumeric).toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="space-y-3">
                      <div><span className="text-[10px] uppercase font-bold text-[#A1A1AA] ml-1 block mb-1">Số tài khoản</span><div onClick={() => handleCopy(ACCOUNT_NO)} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 cursor-pointer border" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}><span className="font-bold text-sm" style={{ color: darkMode ? '#fff' : '#111' }}>{ACCOUNT_NO}</span><RiFileCopyLine className="text-gray-400" /></div></div>
                      <div><span className="text-[10px] uppercase font-bold text-[#A1A1AA] ml-1 block mb-1">Nội dung ⚠️</span><div onClick={() => handleCopy(TRANSFER_CONTENT)} className="flex items-center justify-between p-3 rounded-xl bg-blue-600/5 border border-blue-600/20 cursor-pointer relative group"><span className="font-black text-blue-600 text-sm tracking-wider">{TRANSFER_CONTENT}</span><RiFileCopyLine className="text-blue-600/50" /></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-black/20 flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 rounded-2xl text-xs font-bold" style={{ color: darkMode ? '#A1A1AA' : '#71717A', background: darkMode ? 'rgba(255,255,255,0.05)' : '#fff' }}>Hủy</button>
              <button onClick={() => handleCopy(TRANSFER_CONTENT)} className="flex-[2] bg-blue-600 text-white py-3 rounded-2xl font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"><RiFileCopyLine size={16} /> Copy nội dung</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
