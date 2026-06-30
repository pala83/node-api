import cors from 'cors';

// Orígenes permitidos. En producción se setean vía la env CORS_ORIGINS (lista
// separada por comas), p. ej. CORS_ORIGINS="https://mi-frontend.vercel.app".
// En desarrollo, si CORS_ORIGINS no está definida, caen los defaults locales.
const DEFAULT_ORIGINS = ['http://localhost:5173', 'http://localhost:3000'];

const ENV_ORIGINS = (process.env.CORS_ORIGINS ?? '')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

const ALLOWED_ORIGINS = ENV_ORIGINS.length ? ENV_ORIGINS : DEFAULT_ORIGINS;

// CORS restrictivo: solo se permite el/los origen(es) configurados.
export const corsOptions = cors({
	origin: (origin, callback) => {
		// Permitimos requests sin Origin (curl, health checks, server-to-server).
		if (!origin || ALLOWED_ORIGINS.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error('Not allowed by CORS'));
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
});
