import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    // THIS IS THE FIX FOR VERCEL
    build: {
        rollupOptions: {
            external: ['fsevents'], // ← this line fixes your exact error
        },
    },
    // This prevents node built-ins from being bundled
    optimizeDeps: {
        exclude: ['fsevents'],
    },
});