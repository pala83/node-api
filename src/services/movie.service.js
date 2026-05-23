import movieRepository from "../repositories/movie.repository.js";

class MovieService {
	async getAllMovies({ genre } = {}) {
		return await movieRepository.getAll().filter((movie) => {
			if (genre) {
				return movie.genre.toLowerCase() === genre.toLowerCase();
			}
			return true;
		});
	}

	async getMovieById(_id) {
		const movie = await movieRepository.getById(_id);
		if (!movie) {
			const error = new Error(`La pelicula con ID ${_id} no existe`);
			error.statusCode = 404;
			throw error;
		}
		return movie;
	}

	async createMovie(data) {
		return await movieRepository.create(data);
	}

	async updateMovie(_id, data) {
		await this.getMovieById(_id);
		return await movieRepository.update(_id, data);
	}

	async deleteMovie(_id) {
		await this.getMovieById(_id);
		return await movieRepository.delete(_id);
	}
}

export default new MovieService();
