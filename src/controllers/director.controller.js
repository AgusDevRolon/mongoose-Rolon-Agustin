import directorModel from "../models/director.model.js";
import filmModel from "../models/film.model.js"; 

const createDirector = async (req, res)=>{
    const {name, country} = req.body;
    try{
        const newDirector = await directorModel.create({
            name,
            country
        });
        res.status(201).json({
            ok: true,
            msg:"director creado correctamente",
            data: newDirector,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server"
        });
    }
};

const getAllDirector = async (req, res)=>{
    try{
        const directors = await directorModel.find();
        return res.status(200).json({
            ok: true,
            data: directors,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"error interno del server",
        });
    }
};

const getDirectorById = async (req, res)=>{
    const {id} = req.params;
    try{
        const director = await directorModel.findById(id);
        if (!director){
            return res.status(404).json({
                ok: false,
                msg: "director no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            data: director,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

const updateDirector = async (req, res)=>{
    const {id} = req.params;
    try {
        const updateDirector = await directorModel.findByIdAndUpdate( 
            id,
            req.body,
            {new: true}
        );
        if (!updateDirector){
            return res.status(404).json({
                ok: false,
                msg: "director no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "director actualizado correctamente",
            data: updateDirector,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

const deleteDirector = async (req, res) => {
    const { id } = req.params;
    try {
        // elimina las pelis asociadas al director
        const filmsDeleted = await filmModel.deleteMany({ director: id });
        
        // elimina el director
        const deletedDirector = await directorModel.findByIdAndDelete(id);
        
        if (!deletedDirector) {
            return res.status(404).json({
                ok: false,
                msg: "Director no encontrado",
            });
        }
        
        return res.status(200).json({
            ok: true,
            msg: `Director y ${filmsDeleted.deletedCount} película's asociada's eliminada's correctamente`,
            data: deletedDirector,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

export {
    createDirector,
    getDirectorById,
    getAllDirector,
    updateDirector,
    deleteDirector,
};
