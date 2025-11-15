import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sharksphere.onrender.com',
        changeOrigin: true,
        secure: false,
        // No rewrite needed - keep /api in the path
      },
    },
  },
})
