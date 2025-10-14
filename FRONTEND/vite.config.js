import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    strictPort: true,
    fs: {
      // Allow serving files from the project root
      allow: ['..']
    },
    // Ensure static assets are served before React Router
    middlewareMode: false
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});