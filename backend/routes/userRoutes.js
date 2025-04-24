// Will handle /me, /admin
import express, { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { getMe, getAdminDashboard } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/me", authenticateToken, getMe);

userRoutes.get("/admin", authenticateToken, getAdminDashboard);

export default userRoutes;
