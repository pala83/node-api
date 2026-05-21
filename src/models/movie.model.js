import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";

const readJson = createRequire(import.meta.url)('../data/movies.json');
const movies = readJson('../data/movies.json');

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter(
                movie => movie.genre.toLowerCase() === genre.toLowerCase()
            );
        }
        return movies;
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id);
        return movie;
    }

    static async create({ data }){
        const newMovie = {
            id: randomUUID(),
            ...data
        };
        movies.push(newMovie);
        return newMovie;
    }

    static async update({ id, data }) {
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) return false;
        movies[movieIndex] = {
            ...movies[movieIndex],
            ...data
        };
        return movies[movieIndex];
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) return false;
        movies.splice(movieIndex, 1);
        return true;
    }
}


