import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
    plugins: [react(), jsconfigPaths()],
    define: {
        global: 'window'
    },
    build: { chunkSizeWarningLimit: 1600 },

    resolve: {
        alias: [
            {
                find: /^~(.+)/,
                replacement: path.join(process.cwd(), 'node_modules/$1')
            },
            {
                find: /^src(.+)/,
                replacement: path.join(process.cwd(), 'src/$1')
            }
        ]
    },
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000
        port: 3000,
        proxy: {
            '/api': 'http://localhost:8080/'
        }
    },
    preview: {
        // this ensures that the browser opens upon preview start
        open: true,
        // this sets a default port to 3000
        port: 3000
    }
});
