import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  root: './example',
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['react-native-reanimated'],
  },
});
