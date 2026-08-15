import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { readFileSync } from 'fs'
import svgr from 'vite-plugin-svgr'

const libraryPkg = JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [tailwindcss(), react(), svgr()],

  base: '/react-tailwind/',

  define: {
    __APP_VERSION__: JSON.stringify(libraryPkg.version),
  },

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})
