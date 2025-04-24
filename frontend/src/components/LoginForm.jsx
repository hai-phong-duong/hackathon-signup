// LoginForm.jsx
// Handles login form submission and stores auth state

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        setAuth(data);

        console.log(data.role);

        if (data.role === "admin") {
            return navigate("/admin");
        } else {
            return navigate("/dashboard");
        }
    }

    function handleRedirectToRegister() {
        navigate("/register");
    }

    return (
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-card tracking-wide">
            <div>
                <form
                    className="w-150 flex flex-col gap-8 bg-white p-6 rounded-2xl shadow-lg"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <h1 className="text-3xl font-bold">
                            Log in to your account
                        </h1>
                        <h1 className="text-xl">
                            Log in to apply to TreeHacks!{" "}
                        </h1>
                    </div>
                    <input
                        className="text-xl border-2 p-4 rounded-xl"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                    />
                    <input
                        className="text-xl border-2 p-4 rounded-xl"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <button
                        className="bg-text-light text-whites text-xl py-3 rounded-xl hover:bg-accent-dark hover:cursor-pointer transition transition-background duration-250"
                        type="submit"
                    >
                        Log in
                    </button>

                    <div className="text-md flex gap-1">
                        <p>Don't have an account?</p>
                        <p
                            className="hover:underline hover:cursor-pointer hover:text-text-light font-bold"
                            onClick={handleRedirectToRegister}
                        >
                            Register
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
