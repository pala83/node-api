import movieService from "../services/movie.service.js";

class MovieController {
	async getAll(req, res, next) {
		try {
			const { genre } = req.query;
			const movies = await movieService.getAllMovies({ genre });
			res
				.status(200)
				.json({ status: "success", result: movies.length, data: movies });
		} catch (error) {
			next(error);
		}
	}

	async getById(req, res, next) {
		try {
			const { id } = req.params;
			const movie = await movieService.getMovieById({ id });
			res.status(200).json({ status: "success", data: movie });
		} catch (error) {
			next(error);
		}
	}

	async createMovie(req, res, next) {
		try {
			const movie = await movieService.createMovie({ data: req.body });
			res.status(201).json({ status: "success", data: movie });
		} catch (error) {
			next(error);
		}
	}
}

export default new MovieController();
