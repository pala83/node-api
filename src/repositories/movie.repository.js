import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _filePath = path.join(__dirname, "../data/movies.json");

class MovieRepository {
	async _read() {
		try {
			const data = await readFile(_filePath, "utf-8");
			return JSON.parse(data);
		} catch (error) {
			if (error.code === "ENOENT") {
				await this._write([]);
				return [];
			}
			throw error;
		}
	}

	async _write(data) {
		await writeFile(_filePath, JSON.stringify(data, null, 2), "utf-8");
	}

	async getAll() {
		const movies = await this._read();
		return movies;
	}

	async getById({ id }) {
		const movies = await this._read();
		const movie = movies.find((movie) => movie.id === id);
		return movie;
	}

	async create({ data }) {
		const movies = await this._read();
		const newMovie = {
			id: randomUUID(),
			...data,
		};

		movies.push(newMovie);
		await this._write(movies);
		return newMovie;
	}

	async update({ id, data }) {
		const movies = await this._read();
		const index = movies.findIndex((movie) => movie.id === id);
		if (index === -1) return null;
		movies[index] = {
			...movies[index],
			...data,
		};
		await this._write(movies);
		return movies[index];
	}

	async delete({ id }) {
		const movies = await this._read();
		const index = movies.findIndex((movie) => movie.id === id);

		if (index === -1) return false;

		movies.splice(index, 1);
		await this._write(movies);
		return true;
	}
}

export default new MovieRepository();
