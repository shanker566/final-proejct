import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Use a common dev port; strictPort prevents auto-incrementing if occupied
    port: 3000,
    strictPort: true,
    host: true,
    open: true
  }
});