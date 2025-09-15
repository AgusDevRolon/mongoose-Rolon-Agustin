import { Router } from "express";
import {
    createAuthor,
    getAllAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
} from "../controllers/author.controller.js";

export const authorRoutes = Router();

authorRoutes.post("/authors", createAuthor);
authorRoutes.get("/authors", getAllAuthor);
authorRoutes.get("/authors/:id", getAuthorById);
authorRoutes.put("/authors/:id", updateAuthor);
authorRoutes.delete("/authors/:id", deleteAuthor);