import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
// El cliente consume la API REST propia mediante fetch directo usando
// VITE_API_URL (la API habilita CORS para http://localhost:5173), por lo que
// ya no hace falta ningun proxy de desarrollo.
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@contexts': path.resolve(__dirname, './src/contexts'),
			'@services': path.resolve(__dirname, './src/services'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
});
