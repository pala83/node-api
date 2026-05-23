import { createRequire } from "node:module";
import express from "express";
import { corsMiddleware } from "./src/middlewares/cors.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import movieRouter from "./src/routes/movie.route.js";

const require = createRequire(import.meta.url);
const _pkg = require("./package.json");

const app = express();
app.use(express.json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/movies", movieRouter);

app.use((req, _res, next) => {
	const error = new Error(
		`No se encuentra el recurso ${req.originalUrl} en este servidor`,
	);
	error.statusCode = 404;
	next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`=== Servidor iniciado con éxito ===`);
	console.log(`Nombre: ${_pkg.name} | Versión: ${_pkg.version}`);
	console.log(`Corriendo en: http://localhost:${PORT}`);
});
