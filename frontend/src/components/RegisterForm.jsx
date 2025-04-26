import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";

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
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-bg tracking-wide">
            <form
                className="w-150 flex flex-col gap-8 bg-body p-6 rounded-2xl shadow-lg text-text"
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
                    className="font-semibold text-accent w-[25%] self-center bg-accent-dark
                        text-xl py-2 rounded-xl hover:bg-accent-hover hover:cursor-pointer transition transition-background duration-250 flex items-center justify-center gap-2"
                    type="submit"
                >
                    <UserRoundPlus /> Register
                </button>
                <div className="text-md flex gap-1">
                    <p>Already have an acccount?</p>
                    <p
                        className="hover:underline hover:cursor-pointer font-bold text-accent"
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
