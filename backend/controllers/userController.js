// for /me and /admin logic
import { users } from "./authController.js";

export function getMe(req, res) {
    res.status(200).json(req.user);
}

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
