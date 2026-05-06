import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // Bỏ qua các file PHP và TXT để không bị tự động load lại trang khi ghi log/database
      ignored: ['**/*.php', '**/*.txt', '**/webhook_log.txt', '**/webhook_error.txt'],
    },
  },
})
