import z from "zod";
import { Genre } from "./genre.enum.js";

const movieModel = z.object({
	title: z.string({
		invalid_type_error: "Movie title must be a string",
		required_error: "Movie title is required",
	}),
	year: z
		.number()
		.int()
		.min(1900)
		.max(new Date().getFullYear(), "Year must be a valid year"),
	director: z.string(),
	duration: z.number().int().positive("Duration must be a positive integer"),
	rate: z.number().min(0).max(10, "Rate must be between 0 and 10"),
	poster: z.url({
		message: "Poster must be a valid URL",
	}),
	genre: z.array(z.enum(Object.values(Genre)), {
		required_error: "Movie genre is required",
		invalid_type_error: "Movie genre must be an array of valid genres",
	}),
});

export function validateMovie(data) {
	return movieModel.safeParse(data);
}

export function validatePartialMovie(data) {
	return movieModel.partial().safeParse(data);
}
