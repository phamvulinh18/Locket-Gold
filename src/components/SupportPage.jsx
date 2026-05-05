export default function SupportPage({ darkMode }) {
  const textMain = darkMode ? '#ffffff' : '#111827'
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">🎧</span>
      </div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: textMain }}>Trung tâm Hỗ trợ</h1>
      <p className="text-gray-500 max-w-md">Đội ngũ CSKH LocketGold luôn sẵn sàng hỗ trợ bạn 24/7. Tính năng gửi ticket đang được hoàn thiện.</p>
    </div>
  )
}
