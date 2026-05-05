export default function HistoryPage({ darkMode }) {
  const textMain = darkMode ? '#ffffff' : '#111827'
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">📜</span>
      </div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: textMain }}>Lịch sử giao dịch</h1>
      <p className="text-gray-500 max-w-md">Bản sao kê chi tiết các gói LocketGold bạn đã mua sẽ hiển thị ở đây trong tương lai.</p>
    </div>
  )
}
