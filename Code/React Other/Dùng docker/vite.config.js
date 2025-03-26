import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Lắng nghe trên tất cả các địa chỉ IP
    port: 5173, // Đảm bảo chạy trên cổng 5173
    watch: {
      usePolling: true, // Sử dụng polling để theo dõi thay đổi file, cần thiết trong 1 số mt docker hoạt động với live reload
    }
  }
})