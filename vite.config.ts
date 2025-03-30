import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import open from 'open';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    open: true,
  },
})
