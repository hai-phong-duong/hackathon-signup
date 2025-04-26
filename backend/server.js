import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

let requestCount = 0;
const serverStartTime = Date.now();

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    if (req.url !== "/health") requestCount++;
    next();
});

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.get("/health", (req, res) => {
    const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
    res.json({
        status: "ok",
        uptime: `${uptimeSeconds}s`,
        requestCount,
        timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }),
    });
});

app.listen(3000, () => {
    console.log("Connected on port 3000");
});
