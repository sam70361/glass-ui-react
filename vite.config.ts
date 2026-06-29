import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Glass UI React',
        short_name: 'Glass UI',
        description: 'A dark glassmorphism React workspace template',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
  resolve: {
    alias: [{ find: /^src(.+)/, replacement: path.resolve(process.cwd(), 'src/$1') }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts': ['recharts'],
          'vendor-dnd': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          'vendor-motion': ['framer-motion'],
          'vendor-radix': ['radix-ui', 'cmdk'],
          'vendor-i18n': ['i18next', 'react-i18next'],
          'vendor-data': ['@tanstack/react-query', 'zustand'],
        },
      },
    },
  },
});
