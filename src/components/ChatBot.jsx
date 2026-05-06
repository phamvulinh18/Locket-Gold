import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiSendPlane2Fill, RiCustomerService2Fill, RiLoader4Line } from 'react-icons/ri'

export default function ChatBot({ darkMode, user }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Chào bạn! Mình là trợ lý ảo LocketGold. Mình có thể giúp gì cho bạn hôm nay? ✨', time: 'Vừa xong' }
  ])
  const [inputText, setInputText] = useState('')

  const brandColor = '#f5ebd0'

  const handleSend = async () => {
    if (!inputText.trim()) return
    const text = inputText.trim()
    const newMsg = { id: Date.now(), type: 'user', text: text, time: 'Vừa xong' }
    setMessages([...messages, newMsg])
    setInputText('')
    
    // Gửi đến Telegram hỗ trợ của bạn
    const BOT_TOKEN = 'YOUR_BOT_TOKEN' 
    const CHAT_ID = 'YOUR_CHAT_ID'     
    
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `🔔 *Yêu cầu hỗ trợ mới*\n\n👤 Người dùng: ${user?.username || 'Khách'}\n💬 Nội dung: ${text}`,
          parse_mode: 'Markdown'
        })
      })
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: 'Yêu cầu của bạn đã được gửi đến bộ phận hỗ trợ. Chúng mình sẽ phản hồi bạn sớm nhất nhé! ✨', 
        time: 'Vừa xong' 
      }])
    } catch (error) {
      console.error('Lỗi gửi hỗ trợ:', error)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end font-sans">
      
      {/* Cửa sổ Chat Premium */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="mb-6 w-[380px] h-[550px] rounded-[2.8rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] border flex flex-col"
            style={{ 
              background: darkMode ? 'rgba(30, 30, 58, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
            }}
          >
            {/* Header màu vàng đặc #fff556 */}
            <div className="p-6 relative overflow-hidden" style={{ background: brandColor }}>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/10 backdrop-blur-xl flex items-center justify-center border border-black/10 shadow-lg overflow-hidden">
                    <img src="/bot-locket.png" alt="Bot" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-black font-black text-base tracking-tight">LocketGold AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(22,163,74,0.5)]" />
                      <p className="text-black/60 text-[10px] font-black uppercase tracking-widest">Đang trực tuyến</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-black transition-all">
                  <RiCloseLine size={24} />
                </button>
              </div>
            </div>

            {/* Nội dung tin nhắn */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 custom-scrollbar bg-transparent">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} gap-1.5`}
                >
                  <div 
                    className={`p-4 max-w-[85%] text-xs font-bold shadow-md transition-all ${
                      msg.type === 'user' 
                        ? 'bg-black text-white rounded-[1.8rem] rounded-tr-none' 
                        : (darkMode ? 'bg-white/5 text-white border border-white/10' : 'bg-gray-100 text-gray-800') + ' rounded-[1.8rem] rounded-tl-none'
                    }`}
                    style={msg.type === 'user' ? { background: brandColor, color: '#000' } : {}}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-black opacity-40 uppercase tracking-tighter px-2">{msg.time}</span>
                </motion.div>
              ))}
            </div>

            {/* Vùng nhập tin nhắn */}
            <div className="p-6 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
              <div className="relative group">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Hỏi mình bất cứ điều gì..." 
                  className="w-full pl-6 pr-14 py-4 rounded-[1.8rem] text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  style={{ 
                    background: darkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6', 
                    color: darkMode ? '#fff' : '#111',
                    border: 'none'
                  }}
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-yellow-500/20"
                  style={{ background: brandColor }}
                >
                  <RiSendPlane2Fill size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút Bot nổi bập bềnh */}
      <div className="relative group">
        {/* Chữ chạy trên đầu */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div 
            animate={{ 
              width: [0, 140, 140, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              width: { duration: 6, repeat: Infinity, times: [0, 0.2, 0.8, 1] },
              opacity: { duration: 6, repeat: Infinity, times: [0, 0.2, 0.8, 1] }
            }}
            className="h-11 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border dark:border-white/10 overflow-hidden flex items-center justify-center"
          >
            <div className="flex items-center gap-2 px-4 whitespace-nowrap">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: brandColor }}>
                Bot hỗ trợ ✨
              </span>
            </div>
          </motion.div>
          <motion.div 
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
            className="w-3 h-3 bg-white dark:bg-slate-800 rotate-45 -mt-1.5 border-r border-b dark:border-white/10 shadow-sm"
          />
        </div>

        {/* Sóng lan tỏa nhẹ nhàng */}
        {!isOpen && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full opacity-40"
              style={{ background: brandColor }}
            />
          </>
        )}

        {/* Biểu tượng Bot nhấp nhô */}
        <motion.button
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-20 h-20 flex items-center justify-center overflow-visible bg-transparent border-none outline-none group"
        >
          <img 
            src="/bot-locket.png" 
            alt="Support Bot" 
            className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(255,245,86,0.4)]" 
          />
        </motion.button>
      </div>
    </div>
  )
}
