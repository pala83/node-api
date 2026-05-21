import z from 'zod';

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required',
    }),
    year: z.number().int().min(1900).max(new Date().getFullYear(), 'Year must be a valid year'),
    director: z.string(),
    duration: z.number().int().positive('Duration must be a positive integer'),
    rate: z.number().min(0).max(10, 'Rate must be between 0 and 10'),
    poster: z.url({
        message: 'Poster must be a valid URL',
    }),
    genre: z.array(
        z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of valid genres',
        } 
    )
});

export function validateMovie(data) {
    return movieSchema.safeParse(data);
}

export function validatePartialMovie(data) {
    return movieSchema.partial().safeParse(data);
}