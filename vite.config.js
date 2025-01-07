import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/user': {
                    target: env.VITE_SERVER_URL,
                    changeOrigin: true,
                },
            },
            cors: {
              origin: env.VITE_SERVER_URL, 
              methods: ['GET', 'POST', 'PUT', 'DELETE'], 
              allowedHeaders: ['Content-Type', 'Authorization'], 
          },
        },
    };
});
