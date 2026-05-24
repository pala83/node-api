import cors from 'cors';
import express from 'express';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.disable('x-powered-by');

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    res.status(404).send({ status: 'error', message: `No se encuentra la ruta ${req.method} ${req.url}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});