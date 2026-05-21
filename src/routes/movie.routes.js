import { Router } from 'express';
import { MovieController } from '../controllers/movie.controller.js';

export const movieRouter = ({ movieModel }) => {
    const router = Router();
    const controller = new MovieController({ movieModel });

    router.get('/', controller.getAllMovies);
    router.post('/', controller.createMovie);

    return router;
}