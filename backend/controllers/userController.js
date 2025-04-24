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
