import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [tailwindcss(), react(), svgr()],

  base: '/react-tailwind/',

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})
