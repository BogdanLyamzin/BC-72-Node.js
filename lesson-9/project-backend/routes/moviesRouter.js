import { Router } from "express";

import isValidId from "../middlewares/isValidId.js";

import moviesControllers from "../controllers/moviesControllers.js";

import validateBody from "../decorators/validateBody.js";

import {movieAddSchema, movieUpdateSchema} from "../schemas/moviesSchemas.js";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const addMiddleware = validateBody(movieAddSchema);
const updateMiddleware = validateBody(movieUpdateSchema);

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", moviesControllers.getAll);

moviesRouter.get("/:id", isValidId, moviesControllers.getById);

// upload.fields([{name: "cover", maxCount: 1}])
// upload.array("cover", 8);
moviesRouter.post("/", upload.single("cover"), addMiddleware, moviesControllers.add);

moviesRouter.put("/:id", isValidId, updateMiddleware, moviesControllers.updateById);

moviesRouter.delete("/:id", isValidId, moviesControllers.deleteById);

export default moviesRouter;