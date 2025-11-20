import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
  ],

  // THIS IS THE REAL VERCEL FIX
  build: {
    rollupOptions: {
      // Externalize ALL Node.js built-ins + fsevents
      external: [
        'fsevents',
        'node:path',
        'node:fs',
        'node:fs/promises',
        'node:url',
        'node:process',
        'node:buffer',
        'node:stream',
        'node:util',
        'node:crypto',
        'node:events',
      ],
    },
  },

  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
});