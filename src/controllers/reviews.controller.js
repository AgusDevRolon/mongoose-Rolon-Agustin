import reviewModel from "../models/reviews.model.js";
import filmModel from "../models/film.model.js";

const createReview = async (req, res) => {
    const { film, user, comment, rating } = req.body;
    if (!film || !user || !comment || !rating) {
        return res.status(400).json({
            ok: false,
            msg: "Film, user, comment y rating son requeridos"
        });
    }
    try {
        //verficar si la pelicula existe antes de reseñar
        const existingFilm = await filmModel.findById(film);
        if (!existingFilm) {
            return res.status(404).json({
                ok: false,
                msg: "No se puede crear la reseña, la película no existe"
            });
        }
        const newReview = await reviewModel.create({
            film,
            user,
            comment,
            rating
        });
        res.status(201).json({
            ok: true,
            msg: "Reseña creada correctamente",
            data: newReview,
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: "Datos de validación incorrectos",
                errors: error.errors
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de película o formato de datos inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find().populate("film");
        return res.status(200).json({
            ok: true,
            data: reviews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await reviewModel.findById(id).populate("film");
        if (!review) {
            return res.status(404).json({
                ok: false,
                msg: "Reseña no encontrada",
            });
        }
        return res.status(200).json({
            ok: true,
            data: review,
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de reseña inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const updateReview = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedReview = await reviewModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).populate("film");
        if (!updatedReview) {
            return res.status(404).json({
                ok: false,
                msg: "Reseña no encontrada",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Reseña actualizada correctamente",
            data: updatedReview,
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: "Datos de validación incorrectos",
                errors: error.errors
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de reseña inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({
                ok: false,
                msg: "Reseña no encontrada",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Reseña eliminada correctamente",
            data: deletedReview,
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de reseña inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export {
    createReview,
    getReviewById,
    getAllReviews,
    updateReview,
    deleteReview
};
