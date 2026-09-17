import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = process.cwd();

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        classroom: resolve(root, 'classroom/index.html'),
        contact: resolve(root, 'contact/index.html'),
      },
    },
  },
});
