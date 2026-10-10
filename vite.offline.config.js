import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({ disable: true }),
    viteSingleFile(),
  ],
  build: {
    outDir: 'dist-offline',
  },
})