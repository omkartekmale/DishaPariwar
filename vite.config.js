import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = Number(process.env.PORT) || 3000;

export default defineConfig({
  plugins: [react()],
  server: {
    port,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      host: 'localhost',
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    sourcemap: false,
    target: 'es2022',
  },
});
