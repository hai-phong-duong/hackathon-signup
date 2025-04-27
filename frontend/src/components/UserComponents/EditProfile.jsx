import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function EditProfile() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState(auth.username);
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            oldUsername: auth.username,
            newUsername: username,
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
        };

        try {
            const res = await fetch("http://localhost:3000/users/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                setUsername(auth.username);
                setOldPassword("");
                setNewPassword("");
                return console.log("Wrong password or bad input!");
            }

            alert("Profile updated successfully. Please log in again.");
            await logout();
            navigate("/login");
        } catch (error) {
            console.log("Failed to update profile:", error);
        }
    }

    return (
        <div className="bg-bg flex flex-col flex-grow p-35 py-20 pr-50 gap-8">
            <h1 className="text-5xl text-text font-semibold">
                <span className="text-accent">Edit</span> Your Profile
            </h1>
            <div className="bg-body p-4 rounded-xl border border-2 border-accent">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="text-accent block p-2">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="p-2 text-text focus:outline-none border-1 rounded-xl border-accent"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="text-accent block p-2">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter your email"
                            type="text"
                            className="p-2 text-text focus:outline-none border-1 rounded-xl border-accent"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="text-accent block p-2">
                            Password
                        </label>
                        <input
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="enter your old password"
                            type="text"
                            className="p-2 text-text focus:outline-none border-1 rounded-xl border-accent block mb-2"
                        />
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="enter your new password"
                            type="text"
                            className="p-2 text-text focus:outline-none border-1 rounded-xl border-accent"
                        />
                    </div>
                    <button
                        className="font-semibold text-accent  bg-accent-dark
                        text-xl p-2 px-3 rounded-xl hover:bg-accent-hover hover:cursor-pointer transition transition-background duration-250 flex items-center justify-center gap-2"
                        type="submit"
                    >
                        <SendHorizonal /> Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
