import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: './',
    build: {
        outDir: 'build',
        assetsDir: 'assets',
        emptyOutDir: true,
        copyPublicDir: true
    },
    server: {
        port: 3000,
        strictPort: true
    },
    publicDir: 'public'
});