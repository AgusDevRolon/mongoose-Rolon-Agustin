import authorModel from "../models/author.model.js";

export const createAuthor = async (req, res)=>{
    const {name, bio, birthdate} = req.body;
    try{
        const newAuthor = await authorModel.create({
            name,
            bio,
            birthdate,
        });
        res.status(201).json({
            ok: true,
            msg:"author creado correctamente",
            data: newAuthor,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server"
        });
    }
};

export const getAllAuthor = async (req, res)=>{
    try{
        const authors = await authorModel.find();
        return res.status(200).json({
            ok: true,
            data: authors,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"error interno del server",
        });
    }
};

export const getAuthorById = async (req, res)=>{
    const {id} = req.params;
    try{
        const author = await authorModel.findById(id);
        if (!author){
            return res.status(404).json({
                ok: false,
                msg: "autor no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            data: author,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export const updateAuthor = async (req, res)=>{
    const {id} = req.params;
    try {
        const updateAuthor = await authorModel.findByIdAndUpdate( 
            id,
            req.body,
            {new: true}
        );
        if (!updateAuthor){
            return res.status(404).json({
                ok: false,
                msg: "autor no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "autor actualizado correctamente",
            data: updateAuthor,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export const deleteAuthor = async (req, res)=>{
    const {id} = req.params;
    try{
        const deleteAuthor = await authorModel.findByIdAndDelete(id);
        if (!deleteAuthor){
            return res.status(404).json({
                ok: false,
                msg: "autor no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "autor eliminado correctamente",
            data: deleteAuthor,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export {
    createAuthor,
    getAuthorById,
    getAllAuthor,
    updateAuthor,
    deleteAuthor,
};