import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Connected on port 3000");
});
