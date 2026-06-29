import express from 'express';
import morgan from 'morgan';
import productRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import { corsMiddleware, corsOptions } from "./middlewares/cors.js";
import { notFound, errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.disable('x-powered-by');

app.use(corsOptions);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
