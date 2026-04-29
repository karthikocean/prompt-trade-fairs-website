import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      crypto: 'crypto-browserify',
    },
  },
  define: {
    global: 'globalThis',
  },
   server: {
    host: true,
    port: 5173
  }
})