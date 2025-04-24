// This file handles auth-related routes
// Will handle /register, /login, etc

import express, { Router } from "express";
import {
    register,
    login,
    logout,
    refreshToken,
} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.delete("/logout", logout);

authRoutes.post("/token", refreshToken);

export default authRoutes;
