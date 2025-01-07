import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for assets, useful for deployment
  build: {
    outDir: 'dist', // Default output directory; ensure this matches Vercel's expected folder
    assetsDir: 'assets', // Directory for static assets (e.g., CSS, JS)
  },
  server: {
    port: 4000, // Optional: Specify the local dev server port
  },
});
