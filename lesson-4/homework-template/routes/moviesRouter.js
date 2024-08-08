import { Router } from "express";

import moviesControllers from "../controllers/moviesControllers.js";

const moviesRouter = Router();

moviesRouter.get("/", moviesControllers.getAll);

moviesRouter.get("/:id", moviesControllers.getById);

moviesRouter.post("/", moviesControllers.add);

moviesRouter.put("/:id", moviesControllers.updateById);

moviesRouter.delete("/:id", moviesControllers.deleteById);

export default moviesRouter;