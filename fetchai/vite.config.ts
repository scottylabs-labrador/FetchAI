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
        rewrite: (path) => '/calendar/feed/rss.xml',
      },
    },
  },
})
