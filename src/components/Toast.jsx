import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { RiCheckboxCircleFill, RiErrorWarningFill, RiInformationFill } from 'react-icons/ri'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handleToast = (event) => {
      const { message, type = 'success', duration = 3000 } = event.detail
      const id = Date.now()
      
      setToasts(prev => [...prev, { id, message, type }])

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }

    window.addEventListener('show-toast', handleToast)
    return () => window.removeEventListener('show-toast', handleToast)
  }, [])

  return (
    <div className="fixed top-5 right-5 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border pointer-events-auto"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className={`p-2 rounded-xl ${
              toast.type === 'success' ? 'bg-green-500/20 text-green-400' : 
              toast.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {toast.type === 'success' && <RiCheckboxCircleFill size={20} />}
              {toast.type === 'error' && <RiErrorWarningFill size={20} />}
              {toast.type === 'info' && <RiInformationFill size={20} />}
            </div>
            <p className="text-sm font-bold text-white pr-2">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hàm tiện ích để gọi toast từ bất kỳ đâu
export const toast = (message, type = 'success') => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { message, type } }))
}
