import { validateMovie, validatePartialMovie } from "../models/movie.model.js";

export const validateCreateMovie = (req, res, next) => {
	const result = validateMovie(req.body);
	if (!result.success) {
		return res.status(422).json({
			status: "fail",
			message: "Validation error",
			errors: result.error.issues.map((issue) => ({
				path: issue.path.join("."),
				message: issue.message,
			})),
		});
	}

	req.body = result.data;
	next();
};

export const validateUpdateMovie = (req, res, next) => {
	const result = validatePartialMovie(req.body);
	if (!result.success) {
		return res.status(422).json({
			status: "fail",
			message: "Validation error",
			errors: result.error.issues.map((issue) => ({
				path: issue.path.join("."),
				message: issue.message,
			})),
		});
	}

	req.body = result.data;
	next();
};
