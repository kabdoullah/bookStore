import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoute.js";
import cors from "cors";


const app = express();

// Middleware
app.use(express.json());

// CORS
app.use(cors());

// Routes
app.use("/api", bookRouter);

mongoose.connect(mongoDBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});