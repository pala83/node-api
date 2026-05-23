const errorHandler = (err, req, res, _next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Error interno del servidor";
	console.error(
		`[Error API] [${req.method}] ${req.url} - Status: ${statusCode} - Message: ${message}`,
	);
	res.status(statusCode).json({
		status: "error",
		statusCode,
		message,
	});
};

export default errorHandler;
