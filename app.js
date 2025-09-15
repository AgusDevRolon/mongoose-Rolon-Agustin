import express from "express";
import { connectDB } from "./src/config/database.js";
import { userRoutes } from "./src/routes/user.route.js";
import { authorRoutes } from "./src/routes/author.route.js";
import { bookRoutes } from "./src/routes/book.route.js";

const app =  express();
const PORT= process.env.PORT || 3500;

app.use("/api", userRoutes);
app.use("/api", authorRoutes);
app.use("/api", bookRoutes);

const starServer = async ()=>{
    await connectDB();
    app.listen(PORT, async()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`);
    });
};

starServer();
