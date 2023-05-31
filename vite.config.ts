import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pwa()],
  server: {
    proxy: {
      '/api': {
        target: 'https://app.zarafleet.com',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});

function pwa() {
  return VitePWA({
    manifest: {
      name: 'Zara Fleet',
      short_name: 'Zara Fleet',
      description: 'Application for managing fleet of vehicles',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#edeff0',
      theme_color: '#edeff0',
      icons: [
        {
          src: 'icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  });
}

function manualChunks(id: string) {
  if (id.includes('@mui')) return 'mui';
  if (id.includes('mdi-material-ui')) return 'icons';
}
