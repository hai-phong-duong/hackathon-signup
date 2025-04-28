// for register, login, logout, token

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

let refreshTokens = [];

export async function register(req, res) {
    if (req.body.username === "Thomas") {
        return res.status(403).send("This username is reserved!"); // that's me :D
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(403).send("This username is not available!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).send("Registered successfully");
    } catch (error) {
        res.status(500).send("Error registering user");
    }
}

export async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Authenthication
    const user = await User.findOne({ username });
    if (!user) {
        return res.sendStatus(404);
    }

    if (await bcrypt.compare(password, user.password)) {
        const userPayload = { username: user.username, role: user.role };
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);
        refreshTokens.push(refreshToken);

        return res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            username: user.username,
            role: user.role,
        });
    } else {
        return res.sendStatus(403);
    }
}

export async function refreshToken(req, res) {
    const refreshToken = req.body.token;

    if (!refreshToken || refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const userPayload = { username: user.username, role: user.role };
        const newAccessToken = generateAccessToken(userPayload);
        const newRefreshToken = generateRefreshToken(userPayload);
        refreshTokens.push(newRefreshToken);
        res.send({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
}

export function logout(req, res) {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
    res.sendStatus(204);
}

export function generateAccessToken(userPayload) {
    return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
    });
}

function generateRefreshToken(userPayload) {
    return jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
}
