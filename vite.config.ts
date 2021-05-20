import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'toy-sheet',
  plugins: [vueJsx()],
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    }
  }
})
