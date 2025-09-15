import express from "express";
import { connectDB } from "./src/config/database.js";

const app =  express();
const PORT= process.env.PORT || 3500;

const starServer = async ()=>{
    await connectDB();
    app.listen(PORT, async()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`);
    });
};

starServer();
