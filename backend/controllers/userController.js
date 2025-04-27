// for /me and /admin logic
import { users } from "./authController.js";
import bcrypt from "bcrypt";

// for users
export function getMe(req, res) {
    res.status(200).json(req.user);
}

export async function updateUser(req, res) {
    console.log("--- UPDATE USER ATTEMPT ---");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    const user = users.find((user) => user.username === req.body.oldUsername);
    if (!user) return res.sendStatus(400);

    if (await bcrypt.compare(req.body.oldPassword, user.password)) {
        if (req.body.newUsername) {
            user.username = req.body.newUsername;
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        if (req.body.newPassword) {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.password = hashedPassword;
        }

        return res.status(200).send("Updated successfully!");
    } else {
        return res.status(400).send("Old password incorrect!");
    }
}

// for admin
export function getAdminDashboard(req, res) {
    if (req.user.role !== "admin") return res.sendStatus(403);

    const safeUsers = users.map(({ username, role }) => ({ username, role }));
    return res.status(200).json(safeUsers);
}

export function deleteUser(req, res) {
    if (req.user.role !== "admin") return res.sendStatus(403);

    const username = req.params.username;
    const user = users.find((user) => user.username === username);

    if (!user) {
        res.sendStatus(404);
    }

    users = users.filter((user) => user.username != username);
    res.status(200).send("Successful deletion");
}

export function promoteUser(req, res) {
    if (req.user.role !== "admin") return res.sendStatus(403);

    const username = req.params.username;
    const user = users.find((user) => user.username === username);

    if (!user) {
        res.sendStatus(404);
    }

    user.role = "admin";
    const safeUser = { username, role };
    res.status(200).json(safeUser);
}
