import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        classroom: resolve(__dirname, 'classroom/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
});
