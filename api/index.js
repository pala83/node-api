import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

// En Vercel la app corre como serverless function: se exporta el handler (la app
// de Express es un handler (req, res) válido). En local/servidor tradicional
// levantamos el server con app.listen.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
