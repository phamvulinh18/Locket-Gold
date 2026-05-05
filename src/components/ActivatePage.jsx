export default function ActivatePage({ darkMode }) {
  const textMain = darkMode ? '#ffffff' : '#111827'
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">⚡</span>
      </div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: textMain }}>Kích hoạt Code</h1>
      <p className="text-gray-500 max-w-md">Nhập mã kích hoạt LocketGold của bạn tại đây để nhận ưu đãi ngay tức thì.</p>
    </div>
  )
}
