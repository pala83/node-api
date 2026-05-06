import { createServer } from 'http';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const server = createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hola Mundo\n');
// });
// 
// const PORT = 3000;
// 
// server.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}/`);
// });

const app = express();
// middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(join(__dirname, 'public')));

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 },
    { id: 4, nombre: 'Producto 4', precio: 40 },
    { id: 5, nombre: 'Producto 5', precio: 50 },
    { id: 6, nombre: 'Producto 6', precio: 60 },
    { id: 7, nombre: 'Producto 7', precio: 70 },
    { id: 8, nombre: 'Producto 8', precio: 80 },
    { id: 9, nombre: 'Producto 9', precio: 90 },
    { id: 10, nombre: 'Producto 10', precio: 100 },
];

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hola Mundo desde Express!');
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const producto = productos.find(p => p.id === id);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});