import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const contactApiProxy = {
  target: 'https://www.shakedweb.com',
  changeOrigin: true,
  secure: true,
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': contactApiProxy,
    },
  },
  preview: {
    proxy: {
      '/api': contactApiProxy,
    },
  },
})
