// for /me and /admin logic
import bcrypt from "bcrypt";
import User from "../models/User.js";

// for users
export function getMe(req, res) {
    res.status(200).json(req.user);
}

export async function updateUser(req, res) {
    const user = await User.findOne({ username: req.body.oldUsername });
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

        await user.save();
        return res.status(200).send("Updated successfully!");
    } else {
        return res.status(400).send("Old password incorrect!");
    }
}

// for admin
export async function getAdminDashboard(req, res) {
    if (req.user.role !== "admin") return res.sendStatus(403);

    try {
        const users = await User.find({}, "username role"); // only get username + role
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
}

export async function deleteUser(req, res) {
    if (req.user.role !== "admin") return res.sendStatus(403);

    const username = req.params.username;
    try {
        const result = await User.deleteOne({ username });
        if (result.deletedCount === 0) {
            return res.sendStatus(404);
        }
        res.status(200).send("Successful deletion");
    } catch (error) {
        res.status(500).send("Error deleting user");
    }
}

export async function promoteUser(req, res) {
    if (req.user.role !== "admin") return res.sendStatus(403);

    const username = req.params.username;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.sendStatus(404);
        }

        user.role = "admin";
        await user.save();

        const safeUser = { username: user.username, role: user.role };
        res.status(200).json(safeUser);
    } catch (error) {
        res.status(500).send("Error promoting user");
    }
}
