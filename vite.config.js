import { fileURLToPath, URL } from 'node:url'
// import vueDevTools from 'vite-plugin-vue-devtools'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [vue(), vueDevTools()],
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 修改路名
    },
  },
})
