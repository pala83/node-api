import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const apiBase = env.VITE_API_BASE;
	const imgbbKey = env.VITE_IMGBB_API_KEY;

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, './src/components'),
				'@contexts': path.resolve(__dirname, './src/contexts'),
				'@services': path.resolve(__dirname, './src/services'),
				'@utils': path.resolve(__dirname, './src/utils'),
			},
		},
		server: (() => {
			const proxy = {};

			if (apiBase) {
				proxy['/api'] = {
					target: apiBase,
					changeOrigin: true,
					rewrite: (p) => p.replace(/^\/api/, ''),
				};
			}

			// Dev-only proxy to imgbb: client posts to /api/imgbb and Vite dev server
			// will forward to https://api.imgbb.com/1/upload?key=<IMGBB_KEY>
			// Note: this uses the IMGBB key from env (IMGBB_API_KEY or VITE_IMGBB_API_KEY)
			proxy['/api/imgbb'] = {
				target: 'https://api.imgbb.com',
				changeOrigin: true,
				secure: true,
				rewrite: (p) => {
					const key = imgbbKey ? `?key=${imgbbKey}` : '';
					// convert /api/imgbb to /1/upload and append key as query
					return p.replace(/^\/api\/imgbb/, `/1/upload${key}`);
				},
			};

			return { proxy };
		})(),
	};
});
