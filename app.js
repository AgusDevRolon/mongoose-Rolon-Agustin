import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./src/config/database.js";
import directorRouter from "./src/routes/director.route.js";
import filmRouter from "./src/routes/film.route.js";
import genreRouter from "./src/routes/genre.route.js";
import reviewRouter from "./src/routes/reviews.route.js";

const app =  express();
const PORT= process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", directorRouter);
app.use("/api", filmRouter);
app.use("/api", genreRouter);
app.use("/api", reviewRouter);

const startServer = async ()=>{
    await connectDB();
    app.listen(PORT, async()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`);
    });
};

startServer();
