import { Router } from "express";
import movieController from "../controllers/movie.controller.js";
import { validateCreateMovie } from "../middlewares/validator.js";

const router = Router();

router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);
router.post("/", validateCreateMovie, movieController.createMovie);

export default router;
