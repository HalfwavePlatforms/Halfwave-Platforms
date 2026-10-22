import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = parseInt(env.FRONTEND_PORT || process.env.FRONTEND_PORT || '5173', 10);

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: false,
    },
  };
});
