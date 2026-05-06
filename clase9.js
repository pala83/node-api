import { createServer } from 'http';
import express from 'express';

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

app.get('/', (req, res) => {
    res.send('Hola Mundo desde Express!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});