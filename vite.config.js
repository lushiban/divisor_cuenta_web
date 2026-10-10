import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Divisor de cuenta',
        short_name: 'Divisor',
        description: 'Divide una cuenta con propina, incluso sin conexión después de cargar la aplicación.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f4f5ef',
        theme_color: '#143b36',
        icons: [],
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,png}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
  test: {
    pool: 'threads',
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
  },
})
