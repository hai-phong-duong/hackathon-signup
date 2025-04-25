// for register, login, logout, token

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// temporary in-memory array, database integration later
let users = [
    {
        username: "Thomas",
        password:
            "$2b$10$.YGj61gAR4G.cnvLmJMD/uwW2fyQbOQecrWOiHqEexyU8PRva.H4y",
        role: "admin",
    },
    {
        username: "Kushagra",
        password:
            "$2b$10$tJlpJDDoim.FWNIKbEoz2.BwBSRxwktdUjDSjMaCoGup1oTicHFvO",
        role: "user",
    },
    {
        username: "Charlie",
        password:
            "$2b$10$tJlpJDDoim.FWNIKbEoz2.BwBSRxwktdUjDSjMaCoGup1oTicHFvO",
        role: "user",
    },
    {
        username: "Vasil",
        password:
            "$2b$10$tJlpJDDoim.FWNIKbEoz2.BwBSRxwktdUjDSjMaCoGup1oTicHFvO",
        role: "user",
    },
];
let refreshTokens = [];

export async function register(req, res) {
    if (req.body.username === "Thomas") {
        return res.status(403).send("This username is reserved!"); // that's me :D
    }

    if (users.map((user) => user.username).includes(req.body.username)) {
        return res.status(403).send("This username is not available!");
    }

    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: hashedPassword,
        role: "user",
    };

    users.push(user);
    res.status(201).send("Registered successfully");
}

export async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Authentication
    const user = users.find((user) => user.username === username);
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

function generateAccessToken(userPayload) {
    return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
    });
}

function generateRefreshToken(userPayload) {
    return jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
}

export { users };
