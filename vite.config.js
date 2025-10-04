import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Serve the app from the client/ directory
  root: 'client',
  // Keep using the existing root-level public/ for static assets
  publicDir: '../public',
  plugins: [react()],
  server: {
    port: 3001,
    open: true
  },
  build: {
    // Output to a root-level dist/ to avoid nesting under client/
    outDir: '../dist',
    emptyOutDir: true
  }
});