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

  // Relative (not '/react-tailwind/') so the same built output works whether
  // it's served from the site root (latest) or copied into /v/<version>/ for
  // an archived snapshot — see deploy.yml. Safe because the app uses
  // HashRouter, so client-side routing never depends on the serving path.
  base: './',

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
