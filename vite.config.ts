import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/stores': resolve(__dirname, 'src/stores'),
      '@/i18n': resolve(__dirname, 'src/i18n'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/features': resolve(__dirname, 'src/features'),
      '@/constants': resolve(__dirname, 'src/constants'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/apis': resolve(__dirname, 'src/apis'),
      '@/models': resolve(__dirname, 'src/models'),
    },
  },
})
