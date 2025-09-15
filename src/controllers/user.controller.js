import userModel from "../models/user.model.js";

export const createUser = async (req, res)=>{
    const {username, email, password, role} = req.body;
    try{
        const newUser = await userModel.create({
            username,
            email,
            password,
            role,
        });
        res.status(201).json({
            ok: true,
            msg:"usuario creado correctamente",
            data: newUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server"
        });
    }
};

export const getAllUser = async (req, res)=>{
    try{
        const users = await userModel.find();
        return res.status(200).json({
            ok: true,
            data: users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"error interno del server",
        });
    }
};

export const getUserById = async (req, res)=>{
    const {id} = req.params;
    try{
        const user = await userModel.findById(id);
        if (!user){
            return res.status(404).json({
                ok: false,
                msg: "usuario no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export const updateUser = async (req, res)=>{
    const {id} = req.params;
    try {
        const updateUser = await userModel.findByIdAndUpdate( 
            id,
            {username},
            {new: true}
        );
        if (!updateUser){
            return res.status(404).json({
                ok: false,
                msg: "usuario no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "usuario actualizado correctamente",
            data: updateUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export const deleteUser = async (req, res)=>{
    const {id} = req.params;
    try{
        const deleteUser = await userModel.findByIdAndDelete(id);
        if (!deleteUser){
            return res.status(404).json({
                ok: false,
                msg: "usuario no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "usuario eliminado correctamente",
            data: deleteUser,
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
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
};