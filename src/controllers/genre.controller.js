import genreModel from "../models/Genre.model.js";
import filmModel from "../models/film.model.js";

const createGenre = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            ok: false,
            msg: "El nombre del género es requerido"
        });
    }
    try {
        const newGenre = await genreModel.create({
            name: name.trim()
        });
        res.status(201).json({
            ok: true,
            msg: "Género creado correctamente",
            data: newGenre,
        });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json({
                ok: false,
                msg: "El género ya existe"
            });
        }
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

const getAllGenres = async (req, res) => {
    try {
        const genres = await genreModel.find().sort({ name: 1 });
        return res.status(200).json({
            ok: true,
            data: genres,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};


//obtener genero por nombre
const getGenreByName = async (req, res) => {
    const { name } = req.params;
    try {
        const genre = await genreModel.findOne({ 
            name: { $regex: new RegExp(name, 'i') } 
        });
        if (!genre) {
            return res.status(404).json({
                ok: false,
                msg: "Género no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            data: genre,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

//para actualizar
const updateGenre = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            ok: false,
            msg: "El nombre del género es requerido"
        });
    }
    try {
        const updatedGenre = await genreModel.findByIdAndUpdate( 
            id,
            { name: name.trim() },
            { 
                new: true,
                runValidators: true
            }
        );
        if (!updatedGenre) {
            return res.status(404).json({
                ok: false,
                msg: "Género no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Género actualizado correctamente",
            data: updatedGenre,
        });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json({
                ok: false,
                msg: "El género ya existe"
            });
        }
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
                msg: "ID de género inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const deleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
        //elimina las pelis dentro de este genero
        const filmsDeleted = await filmModel.deleteMany({ genres: id });
        //elimina el genero
        const deletedGenre = await genreModel.findByIdAndDelete(id);
        if (!deletedGenre) {
            return res.status(404).json({
                ok: false,
                msg: "Género no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: `Género y ${filmsDeleted.deletedCount} película's asociada's eliminada's correctamente`,
            data: deletedGenre,
        });
    } catch (error) {
        console.log(error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de género inválido"
            });
        }
        
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

//Obtener peliculas por genero
const getFilmsByGenre = async (req, res) => {
    const { id } = req.params;
    try {
        //verifica que el género existe
        const genre = await genreModel.findById(id);
        if (!genre) {
            return res.status(404).json({
                ok: false,
                msg: "Género no encontrado",
            });
        }
        //obtener películas que contengan este género
        const films = await filmModel.find({ genres: id })
            .populate("director")
            .populate("genres");
        return res.status(200).json({
            ok: true,
            data: {
                genre: genre.name,
                filmsCount: films.length,
                films: films
            },
        });
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: "ID de género inválido"
            });
        }
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export {
    createGenre,
    getAllGenres,
    updateGenre,
    deleteGenre,
    getGenreByName,
    getFilmsByGenre
};
