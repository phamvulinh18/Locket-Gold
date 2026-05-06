import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiHistoryFill, RiCheckboxCircleFill, RiTimeLine, RiErrorWarningFill, RiLoader4Line, RiEyeLine, RiCloseLine } from 'react-icons/ri'

const planDetails = {
  basic: { 
    name: 'Locket Gold Basic', 
    features: ['Mở khóa Locket Gold', 'Không quảng cáo', 'Upload ảnh từ thư viện', 'Quay video Lockets 5s', 'Xem những ai đã xem Lockets của bạn', 'Thay đổi icon Locket', 'Mở khóa giới hạn bạn bè'] 
  },
  pro: { 
    name: 'Locket Gold Pro', 
    features: ['Mở khóa Locket Gold', 'Không quảng cáo', 'Upload ảnh từ thư viện', 'Quay video Lockets 5s', 'Xem những ai đã xem Lockets của bạn', 'Thay đổi icon Locket', 'Mở khóa giới hạn bạn bè'] 
  },
  premium: { 
    name: 'Locket Gold Premium', 
    features: ['Mở khóa Locket Gold', 'Không quảng cáo', 'Upload ảnh từ thư viện', 'Quay video Lockets 15s', 'Xem những ai đã xem Lockets của bạn', 'Thay đổi icon Locket', 'Mở khóa giới hạn bạn bè', 'Huy hiệu Locket Gold'] 
  }
}

export default function HistoryPage({ darkMode, user }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) return
      try {
        const res = await fetch(`http://localhost:8088/locketgold/get_history.php?user_id=${user.id}`)
        const data = await res.json()
        if (data.success) setHistory(data.data)
      } catch (err) { } finally { setLoading(false) }
    }
    fetchHistory()
  }, [user])

  const getStatusBadge = (status) => {
    const baseClass = "px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 mx-auto w-fit"
    switch (status) {
      case 'completed': return <span className={`${baseClass} bg-green-500/10 text-green-500`}><RiCheckboxCircleFill /> THÀNH CÔNG</span>
      case 'pending': return <span className={`${baseClass} bg-amber-500/10 text-amber-500`}><RiTimeLine /> ĐANG CHỜ</span>
      default: return <span className={`${baseClass} bg-red-500/10 text-red-500`}><RiErrorWarningFill /> THẤT BẠI</span>
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
          <RiHistoryFill size={24} className="text-black" />
        </div>
        <div>
          <h1 className="text-2xl font-black" style={{ color: darkMode ? '#fff' : '#111' }}>Lịch sử giao dịch</h1>
          <p className="text-xs font-medium opacity-60" style={{ color: darkMode ? '#A1A1AA' : '#71717A' }}>Danh sách các gói bạn đã đăng ký</p>
        </div>
      </div>

      <div className="rounded-[2rem] overflow-hidden border shadow-xl" style={{ 
        background: darkMode ? '#1e1e3a' : '#fff',
        borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'
      }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: darkMode ? 'rgba(255,255,255,0.02)' : '#f9fafb' }}>
                <th className="p-5 text-[10px] font-black uppercase tracking-wider opacity-50" style={{ color: darkMode ? '#fff' : '#111' }}>Mã Đơn</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-wider opacity-50" style={{ color: darkMode ? '#fff' : '#111' }}>Gói Cước</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-wider opacity-50 text-center" style={{ color: darkMode ? '#fff' : '#111' }}>Số Tiền</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-wider opacity-50 text-center" style={{ color: darkMode ? '#fff' : '#111' }}>Trạng Thái</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-wider opacity-50 text-center" style={{ color: darkMode ? '#fff' : '#111' }}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-20 text-center"><RiLoader4Line size={32} className="animate-spin mx-auto text-yellow-500" /></td></tr>
              ) : history.length === 0 ? (
                <tr><td colSpan="5" className="p-20 text-center opacity-50 font-bold" style={{ color: darkMode ? '#fff' : '#111' }}>Bạn chưa có giao dịch nào.</td></tr>
              ) : (
                history.map((item, i) => (
                  <motion.tr key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-t hover:bg-gray-500/5 transition-colors" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
                    <td className="p-5 text-xs font-bold" style={{ color: darkMode ? '#D4D4D8' : '#3F3F46' }}>#{item.id}</td>
                    <td className="p-5">
                      <span className="text-xs font-black uppercase" style={{ color: darkMode ? '#fff' : '#111' }}>{item.plan_id}</span>
                      <p className="text-[10px] opacity-50">{new Date(item.created_at).toLocaleString('vi-VN')}</p>
                    </td>
                    <td className="p-5 text-xs font-black text-blue-500 text-center">{parseInt(item.amount).toLocaleString()}đ</td>
                    <td className="p-5 text-center">{getStatusBadge(item.status)}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => setSelectedOrder(item)} className="p-2 rounded-xl hover:bg-yellow-500 hover:text-black transition-all" style={{ color: darkMode ? '#F59E0B' : '#D97706' }}>
                        <RiEyeLine size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Chi tiết đơn hàng */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm rounded-[2rem] p-8 shadow-2xl" style={{ background: darkMode ? '#1e1e3a' : '#fff' }}>
              <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5" style={{ color: darkMode ? '#A1A1AA' : '#71717A' }}><RiCloseLine size={24} /></button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg border-2 border-yellow-500/20">
                  <img src="/logo-locket.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-black" style={{ color: darkMode ? '#fff' : '#111' }}>Chi tiết gói cước</h3>
                <p className="text-xs opacity-60">Mã đơn: #{selectedOrder.id}</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Gói cước</span>
                  <span className="text-base font-black text-yellow-500 uppercase">{planDetails[selectedOrder.plan_id]?.name || selectedOrder.plan_id}</span>
                </div>
                
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 ml-1 block mb-2">Tính năng bao gồm:</span>
                  <div className="space-y-3.5 mt-2">
                    {(planDetails[selectedOrder.plan_id]?.features || []).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-bold" style={{ color: darkMode ? '#D4D4D8' : '#3F3F46' }}>
                        <img src="/img/icon/verify.png" alt="verify" className="w-4 h-4" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => setSelectedOrder(null)} className="w-full mt-8 py-4 rounded-2xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-600/20">Đóng</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
