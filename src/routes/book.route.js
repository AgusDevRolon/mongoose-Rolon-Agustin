import { Router } from "express";
import {
    createBook,
    getAllBook,
    getBookById,
    updateBook,
    deleteBook,
    addReviewToBook,
    updateReviewInBook,
    deleteReviewFromBook
} from "../controllers/book.controller.js";

export const bookRoutes = Router();

bookRoutes.post("/books", createBook);
bookRoutes.get("/books", getAllBook);
bookRoutes.get("/books/:id", getBookById);
bookRoutes.put("/books/:id", updateBook);
bookRoutes.delete("/books/:id", deleteBook);
bookRoutes.post("/books/:id/reviews", addReviewToBook);
bookRoutes.put("/books/:bookId/reviews/:reviewId", updateReviewInBook);
bookRoutes.delete("/books/:bookId/reviews/:reviewId", deleteReviewFromBook);