import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.text();

        if (res.ok) {
            setSuccess(data);
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } else {
            setError(data);
        }
    }

    function handleRedirectToLogin() {
        navigate("/login");
    }

    return (
        <div className="min-h-screen overflow-hidden flex items-center justify-center outline outline-1 bg-bg">
            <form
                className="w-150 flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <h1 className="text-xl">
                        Register to apply to TreeHacks!{" "}
                    </h1>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <input
                    className="text-xl border-2 p-3 rounded-xl"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
                <input
                    className="text-xl border-2 p-3 rounded-xl"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
                <button
                    className="bg-text-light text-text text-xl py-3 rounded-xl hover:bg-accent-dark hover:cursor-pointer transition transition-background duration-250"
                    type="submit"
                >
                    Register
                </button>
                <div className="text-sm flex gap-1">
                    <p>Already have an acccount?</p>
                    <p
                        className="font-bold hover:underline hover:cursor-pointer hover:text-text-light"
                        onClick={handleRedirectToLogin}
                    >
                        Log in
                    </p>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
