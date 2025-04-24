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
        username: "Friend",
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

        const refreshToken = jwt.sign(
            userPayload,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

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

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const userPayload = { username: user.username, role: user.role };
        const accessToken = generateAccessToken(userPayload);
        res.send({ accessToken: accessToken });
    });
}

export function logout(req, res) {
    const token = req.body.token;
    const inArray = refreshTokens.filter((t) => t !== token);
    if (inArray) {
        refreshTokens = refreshTokens.filter((t) => t !== token);
        res.sendStatus(204);
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
    });
}

export { users };
