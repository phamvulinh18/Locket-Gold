import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiFlashlightFill, RiSendPlane2Fill, RiLoader4Line, RiTelegramFill, RiExternalLinkLine, RiReplyFill, RiCloseLine, RiTimeLine, RiFileDownloadFill, RiDownload2Fill, RiExternalLinkFill } from 'react-icons/ri'

export default function ActivatePage({ darkMode, user }) {
  const [inputText, setInputText] = useState('')
  const [status, setStatus] = useState('idle') 
  const [chatLog, setChatLog] = useState([])
  const [replyingTo, setReplyingTo] = useState(null)
  const autoRepliedMsgs = useRef(new Set()); // Theo dõi các tin nhắn đã auto-reply 
  const [countdown, setCountdown] = useState(0)
  const chatEndRef = useRef(null)

  // Tự động đồng bộ tin nhắn từ server mỗi 1.5 giây
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:3001/messages');
        const data = await res.json();
        if (data.success) {
          setChatLog(prev => {
            const userMessages = prev.filter(m => m.type === 'user');
            const botMessages = data.messages;
            
            // Map để cập nhật tin nhắn theo msgId
            const combined = [...userMessages];
            botMessages.forEach(newBotMsg => {
              const idx = combined.findIndex(m => m.msgId === newBotMsg.msgId);
              if (idx !== -1) {
                combined[idx] = newBotMsg; 
              } else {
                combined.push(newBotMsg);
              }

              // TỰ ĐỘNG REPLY: Chỉ thực hiện 1 lần duy nhất cho mỗi msgId mới
              const isAskUsername = newBotMsg.text.toLowerCase().includes('nhập username') || newBotMsg.text.toLowerCase().includes('link profile');
              if (isAskUsername && !autoRepliedMsgs.current.has(newBotMsg.msgId)) {
                setReplyingTo({ id: newBotMsg.msgId, text: newBotMsg.text });
                autoRepliedMsgs.current.add(newBotMsg.msgId);
              } 
              // Nếu không phải tin nhắn yêu cầu nhập username, tắt reply
              else if (!isAskUsername && replyingTo?.id === newBotMsg.msgId) {
                setReplyingTo(null);
              }
            });

            return combined.sort((a, b) => (a.timestamp || a.id) - (b.timestamp || b.id));
          });
        }
      } catch (error) {
        console.error("Lỗi đồng bộ:", error);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Chỉ cuộn xuống khi có thêm tin nhắn mới (chiều dài chatLog tăng lên)
  const prevLogLength = useRef(chatLog.length);
  useEffect(() => {
    if (chatLog.length > prevLogLength.current) {
      scrollToBottom();
    }
    prevLogLength.current = chatLog.length;
  }, [chatLog])

  // Xử lý đếm ngược 10 giây khi gửi lệnh
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && status === 'processing') {
      setStatus('idle');
    }
  }, [countdown, status]);

  const handleSendMessage = async (e, overrideText = null) => {
    if (e) e.preventDefault()
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || status === 'processing') return

    const text = textToSend.trim()
    const replyId = replyingTo?.id
    
    setStatus('processing')
    setCountdown(5) // Bắt đầu đếm ngược 5s
    setInputText('')
    setReplyingTo(null)
    
    const myMsg = { 
      id: Date.now(), 
      timestamp: Date.now(),
      type: 'user', 
      sender: 'Bạn', 
      text: text, 
      replyToText: replyingTo?.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setChatLog(prev => [...prev, myMsg]);

    try {
      await fetch(`http://localhost:3001/ask-bot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, replyTo: replyId })
      });
    } catch (error) {
      console.error("Lỗi gửi lệnh:", error);
    }
  }

  const handleButtonClick = async (btn, msgId) => {
    if (btn.url) { window.open(btn.url, '_blank'); return }
    if (!btn.data || status === 'processing') return

    setStatus('processing')
    setCountdown(5)
    try {
      await fetch(`http://localhost:3001/click-button`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msgId, data: btn.data })
      });
    } catch (error) {
      console.error("Lỗi bấm nút:", error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-6 h-[calc(100vh-100px)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 rounded-[2.5rem] border shadow-2xl flex flex-col overflow-hidden relative"
        style={{ 
          background: darkMode ? '#18182F' : '#f0f2f5',
          borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
        }}
      >
        {/* Header */}
        <div className="px-8 py-5 border-b flex items-center justify-between" style={{ background: darkMode ? 'rgba(255,255,255,0.02)' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
              <img src="/logo-locket.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base font-black" style={{ color: darkMode ? '#fff' : '#111' }}>Kết nối Locket Gold</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${status === 'processing' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                <p className={`text-[10px] font-bold uppercase ${status === 'processing' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {status === 'processing' ? `Đang xử lý (${countdown}s)...` : 'Đang kết nối tới server'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-8 overflow-y-auto space-y-6 custom-scrollbar" 
             style={{ backgroundImage: darkMode ? 'none' : 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
          
          {chatLog.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center p-4 animate-bounce">
                <img src="/logo-locket.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-widest">Sẵn sàng kích hoạt</h2>
              <p className="text-xs text-gray-400 font-bold uppercase">Nhấn nút bên dưới để bắt đầu kết nối</p>
              <button 
                onClick={() => {
                  const event = { preventDefault: () => {} };
                  // Gửi trực tiếp /start
                  handleSendMessage(event, '/start');
                }}
                className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest flex items-center gap-2"
              >
                <RiFlashlightFill /> Bắt đầu ngay
              </button>
            </div>
          )}

          {chatLog.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] font-black text-gray-400 mb-1 px-2 uppercase">{msg.sender}</span>
                <div className="relative group">
                  {msg.type === 'bot' && (
                    <button 
                      onClick={() => setReplyingTo({ id: msg.msgId, text: msg.text })}
                      className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200/50 hover:bg-blue-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <RiReplyFill size={16} />
                    </button>
                  )}
                  <div className={`p-4 rounded-[1.8rem] text-[13px] font-medium shadow-sm transition-all ${
                      msg.type === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : msg.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : (darkMode ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-gray-800 shadow-md') + ' rounded-tl-none'
                  }`}>
                    {msg.replyToText && <div className="mb-2 p-2 rounded-lg bg-black/10 border-l-4 border-white/30 text-[10px] italic opacity-80 line-clamp-1">{msg.replyToText}</div>}
                    <p className="whitespace-pre-wrap leading-snug">{msg.text}</p>
                    
                    {msg.fileUrl && (
                      <div className="mt-4 p-4 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                            <RiFileDownloadFill size={24} />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-black truncate">{msg.fileName || 'Tài liệu đính kèm'}</p>
                            <p className="text-[10px] opacity-50 uppercase">Sẵn sàng tải về</p>
                          </div>
                        </div>
                        <a 
                          href={msg.fileUrl} 
                          download={msg.fileName}
                          className="px-4 py-2 bg-blue-500 text-white text-[10px] font-black rounded-lg hover:bg-blue-600 transition-colors uppercase whitespace-nowrap"
                        >
                          Tải về
                        </a>
                      </div>
                    )}

                    {msg.detectedLinks?.map((link, i) => (
                      <div key={i} className="mt-4 p-4 rounded-2xl bg-blue-600 text-white flex flex-col gap-3">
                        <p className="text-[11px] font-black uppercase opacity-80 flex items-center gap-2">
                          <RiDownload2Fill /> Link cài đặt DNS & Profile
                        </p>
                        <a 
                          href={link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-white text-blue-600 rounded-xl text-center text-[11px] font-black hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          Ấn để cài đặt cấu hình
                          <RiExternalLinkFill />
                        </a>
                      </div>
                    ))}

                    {msg.buttons && (
                      <div className="mt-4 flex flex-col gap-2 min-w-[200px]">
                        {msg.buttons.map((row, rIdx) => (
                          <div key={rIdx} className="flex gap-2 w-full">
                            {row.map((btn, bIdx) => (
                              <button key={bIdx} onClick={() => handleButtonClick(btn, msg.msgId)} className={`flex-1 py-2.5 px-4 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 ${darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
                                {btn.text} {btn.url && <RiExternalLinkLine size={12} />}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                    {msg.detectedLinks && msg.detectedLinks.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                        <p className="text-[10px] opacity-60 uppercase mb-1">Liên kết cài đặt:</p>
                        {msg.detectedLinks.map((link, lIdx) => (
                          <a 
                            key={lIdx} 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl transition-all shadow-lg shadow-green-500/20 group"
                          >
                            <span className="text-xs font-black uppercase">Ấn để cài đặt</span>
                            <RiExternalLinkLine size={18} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        ))}
                      </div>
                    )}
                    <span className={`text-[9px] font-bold opacity-40 mt-1 px-2`}>{msg.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Footer */}
        <div className="p-6 border-t relative" style={{ background: darkMode ? 'rgba(255,255,255,0.02)' : 'white', borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
          <AnimatePresence>
            {replyingTo && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-6 right-6 mb-2 p-3 bg-blue-500 rounded-2xl flex items-center justify-between text-white shadow-xl shadow-blue-500/20">
                <div className="flex items-center gap-3 overflow-hidden">
                  <RiReplyFill size={20} className="shrink-0" />
                  <div className="text-[10px] font-bold truncate"><span className="opacity-70">Đang trả lời: </span>{replyingTo.text}</div>
                </div>
                <button onClick={() => setReplyingTo(null)} className="p-1 hover:bg-white/20 rounded-full transition-colors"><RiCloseLine size={18} /></button>
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input type="text" placeholder={replyingTo ? "Nhập nội dung trả lời..." : "Nhập lệnh hoặc tin nhắn..."} value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex-1 px-8 py-4 rounded-[2rem] text-sm font-bold transition-all outline-none" style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : '#f0f2f5', color: darkMode ? '#fff' : '#111' }} />
            <button type="submit" disabled={status === 'processing' || !inputText.trim()} className="w-14 h-14 rounded-full bg-blue-500 text-white shadow-xl shadow-blue-500/30 hover:scale-110 flex items-center justify-center disabled:opacity-50">
              {status === 'processing' ? <span className="text-[10px] font-bold">{countdown}s</span> : <RiSendPlane2Fill size={24} />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
