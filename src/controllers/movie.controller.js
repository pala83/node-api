import { validateMovie } from '../schemas/movie.js';

export class MovieController {
    constructor({ movieModel }) {
        this.movieModel = movieModel;
    }

    async createMovie(req, res) {
        const validateData = validateMovie(req.body);
        if(!validateData.success) {
            return res.status(400).json({ error: validateData.error });
        }
        try {
            const movie = await this.movieModel.createMovie(validateData.data);
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}