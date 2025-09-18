import { Router } from "express";
import {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} from "../controllers/reviews.controller.js";

const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
