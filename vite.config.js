import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Hacker News',
        short_name: 'Hacker News',
        theme_color: '#ff6600',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'img/icons/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/hacker-news\.firebaseio\.com\/v0\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'hacker-news-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/, // Matches all image types
            handler: 'CacheFirst',  // First check the cache, then network if not found
            options: {
              cacheName: 'image-cache',  // Cache name
              expiration: {
                maxEntries: 20,  // Max number of images cached
                maxAgeSeconds: 60 * 60 * 24 * 7,  // Cache for 7 days
              },
            },
          },
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
