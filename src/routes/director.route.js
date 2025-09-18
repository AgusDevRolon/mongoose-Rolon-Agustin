

import { Router } from "express";
import {
    createDirector,
    getDirectorById,
    getAllDirector,
    updateDirector,
    deleteDirector,
} from "../controllers/director.controller.js";

const directorRouter = Router();

// CRUD
directorRouter.post("/directors", createDirector);
directorRouter.get("/directors", getAllDirector);
directorRouter.get("/directors/:id", getDirectorById);
directorRouter.put("/directors/:id", updateDirector);
directorRouter.delete("/directors/:id", deleteDirector);

export default directorRouter;
