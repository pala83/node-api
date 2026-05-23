import express from "express";
import { corsMiddleware, corsOptions } from "./middlewares/cors.js";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(corsOptions);
app.disable("x-powered-by");

router.get("/movies", (req, res) => {
	if (req.query.genre) {
		return res.json({ message: `algo con el genero ${req.query.genre}` });
	}
	res.json({ message: "algo" });
});
router.get("/movies/:id", (req, res) => {
	res.json({ message: `algo con el id ${req.params.id}` });
});
// router.post("/movies", movieController.createMovie);
// router.put("/movies/:id", movieController.updateMovie);
// router.delete("/movies/:id", movieController.deleteMovie);

app.use(router);
app.use((req, res, next) => {
	res.status(404).send({ status: "error", message: "Endpoint no encontrado" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
