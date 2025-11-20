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

  // FULL VERCEL NODE.JS EXTERNALIZATION FIX
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': '/resources/js',
      // Prevent Node.js leaks
      'node:path': 'path-browserify',
      'node:module': false,  // Block createRequire entirely
      'node:fs': false,
      'node:util': false,
      'node:events': false,
    },
  },
  build: {
    rollupOptions: {
      external: [
        'fsevents',
        'node:module',
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
        'node:assert',
        'node:zlib',
      ],
      output: {
        globals: {
          // Map Node.js to browser globals
          'node:module': '__vite-browser-external',
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    exclude: [
      'fsevents',
      'node:module',
    ],
  },
});