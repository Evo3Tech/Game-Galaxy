import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd()); // Load the correct `.env` file

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/': {
                    target: env.VITE_SERVER_URL, // Use the environment variable
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Strip '/api'
                },
            },
        },
    };
});
