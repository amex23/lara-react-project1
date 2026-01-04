import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.tsx',
      ],
      refresh: true,
    }),
    react(),
  ],

  // THIS IS THE ONLY CONFIG THAT WORKS ON VERCEL IN 2025
  build: {
    rollupOptions: {
      // This is the magic line that stops the "win32" error forever
      output: {
        manualChunks: undefined,
      },
    },
  },

  // Prevent Vite from bundling esbuild and Node.js internals
  optimizeDeps: {
    exclude: ['esbuild'],
  },

  // Critical: Tell Vite to treat esbuild as external (the real fix)
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },

  // This stops Vite from trying to bundle its own deps
  ssr: {
    noExternal: ['@inertiajs/react', 'react', 'react-dom'],
  },
});