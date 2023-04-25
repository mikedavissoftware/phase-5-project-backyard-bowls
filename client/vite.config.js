import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const apiUrl = (mode === 'development') ? (
    "http://localhost:3000"
  ) : (
    "deployed-backend.com"
  )

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace('/api', '/'),
        }
      }
    },
  }
})
