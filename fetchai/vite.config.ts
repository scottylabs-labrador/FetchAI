import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  server: {
    proxy: {
      '/api/cmu-scs-rss': {
        target: 'https://www.cs.cmu.edu',
        changeOrigin: true,
        rewrite: () => '/calendar/feed/rss.xml',
      },
      '/api/cmu-ece': {
        target: 'https://www.ece.cmu.edu',
        changeOrigin: true,
        rewrite: () => '/news-and-events',
      },
      '/api/cmu-tepper': {
        target: 'https://events.cmu.edu',
        changeOrigin: true,
        rewrite: () => '/tepper',
      },
      '/api/cmu-heinz': {
        target: 'https://www.heinz.cmu.edu',
        changeOrigin: true,
        rewrite: () => '/events',
      },
      '/api/cmu-mcs': {
        target: 'https://www.cmu.edu',
        changeOrigin: true,
        rewrite: () => '/mcs/news-events/',
      },
      '/api/cmu-cfa': {
        target: 'https://art.cmu.edu',
        changeOrigin: true,
        rewrite: () => '/events/',
      },
    },
  },
})
