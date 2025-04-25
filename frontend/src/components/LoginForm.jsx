// LoginForm.jsx
// Handles login form submission and stores auth state

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

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
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-bg tracking-wide">
            <div>
                <form
                    className="w-150 flex flex-col gap-8 bg-body p-6 rounded-2xl shadow-lg text-text"
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
                        className="text-xl p-4 rounded-xl text-text border-none focus:outline-2 outline-accent transition-outline duration-250"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                    />
                    <input
                        className="text-xl p-4 rounded-xl text-text border-none focus:outline-2 outline-accent transition-outline duration-250"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <button
                        className="font-semibold text-accent w-[20%] self-center bg-accent-dark
                        text-xl py-2 rounded-xl hover:bg-accent-hover hover:cursor-pointer transition transition-background duration-250 flex items-center justify-center gap-2"
                        type="submit"
                    >
                        <LogIn /> Log in
                    </button>

                    <div className="text-md flex gap-1">
                        <p>Don't have an account?</p>
                        <p
                            className="hover:underline hover:cursor-pointer hover:text-text font-bold"
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
