// Will handle /me, /admin
import express, { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import {
    getMe,
    getAdminDashboard,
    deleteUser,
    promoteUser,
    updateUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/me", authenticateToken, getMe);

userRoutes.get("/admin", authenticateToken, getAdminDashboard);

userRoutes.patch("/update", authenticateToken, updateUser);

userRoutes.delete("/admin/:username", authenticateToken, deleteUser);

userRoutes.patch("/admin/:username/promote", authenticateToken, promoteUser);

export default userRoutes;
