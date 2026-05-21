import express from 'express';
import { corsMiddleware } from './src/middlewares/cors.js'

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

app.use('/movies', movieRouter);