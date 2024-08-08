import { Router } from "express";

import moviesControllers from "../controllers/moviesControllers.js";

import validateBody from "../decorators/validateBody.js";

import {movieAddSchema, movieUpdateSchema} from "../schemas/moviesSchemas.js";

const addMiddleware = validateBody(movieAddSchema);
const updateMiddleware = validateBody(movieUpdateSchema);

const moviesRouter = Router();

moviesRouter.get("/", moviesControllers.getAll);

moviesRouter.get("/:id", moviesControllers.getById);

moviesRouter.post("/", addMiddleware, moviesControllers.add);

moviesRouter.put("/:id", updateMiddleware, moviesControllers.updateById);

moviesRouter.delete("/:id", moviesControllers.deleteById);

export default moviesRouter;