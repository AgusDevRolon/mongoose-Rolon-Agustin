import filmModel from "../models/film.model.js";
import reviewModel from "../models/reviews.model.js";

const createFilm = async (req, res) => {
    const { title, year, details, director, genres } = req.body;
        if (!title || !year || !details || !director) {
        return res.status(400).json({
            ok: false,
            msg: "Title, year, details y director son requeridos"
        });
    }
    try {
        const newFilm = await filmModel.create({
            title,
            year,
            details,
            director,
            genres: genres || []
        });
        res.status(201).json({
            ok: true,
            msg: "Película creada correctamente",
            data: newFilm,
        });
    } catch (error) {
        console.log(error);
        //errores especificos
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: "Datos de validación incorrectos",
                errors: error.errors
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};

const getAllFilms = async (req, res) => {
    try {
        const films = await filmModel.find()
            .populate("director")
            .populate("genres");
        return res.status(200).json({
            ok: true,
            data: films,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const getFilmById = async (req, res) => {
    const { id } = req.params;
    try {
        const film = await filmModel.findById(id)
            .populate("director")
            .populate("genres");
        if (!film) {
            return res.status(404).json({
                ok: false,
                msg: "Película no encontrada",
            });
        }
        return res.status(200).json({
            ok: true,
            data: film,
        });
    } catch (error) {
        console.log(error);
        // Error de ID inválido
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de película inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const updateFilm = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFilm = await filmModel.findByIdAndUpdate( 
            id,
            req.body,
            { 
                new: true,
                runValidators: true 
            }
        )
        .populate("director")
        .populate("genres");
        if (!updatedFilm) {
            return res.status(404).json({
                ok: false,
                msg: "Película no encontrada",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Película actualizada correctamente",
            data: updatedFilm,
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
                msg: "ID de película inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const deleteFilm = async (req, res) => {
    const { id } = req.params;
    try {
        //elimina todas las reseñas asociadas a la película
        await reviewModel.deleteMany({ film: id });
        //elimina la peli
        const deletedFilm = await filmModel.findByIdAndDelete(id);
        if (!deletedFilm) {
            return res.status(404).json({
                ok: false,
                msg: "Película no encontrada",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Película y sus reseñas eliminadas correctamente",
            data: {
                film: deletedFilm,
                reviewsDeleted: true
            },
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de película inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const getFilmReviews = async (req, res) => {
    const { id } = req.params;
    try {
        //verifica si la peli existe
        const film = await filmModel.findById(id);
        if (!film) {
            return res.status(404).json({
                ok: false,
                msg: "Película no encontrada",
            });
        }
        //obtiene las reseñas de la pelicula
        const reviews = await reviewModel.find({ film: id });
        return res.status(200).json({
            ok: true,
            data: {
                film: film.title,
                reviewsCount: reviews.length,
                reviews: reviews
            },
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de película inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export {
    createFilm,
    getFilmById,
    getAllFilms,
    updateFilm,
    deleteFilm,
    getFilmReviews
};