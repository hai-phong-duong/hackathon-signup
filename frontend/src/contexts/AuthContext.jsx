import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useRef,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const isRefreshing = useRef(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
        setLoading(false);
    }, []);

    const updateAuth = (data) => {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
    };

    function isTokenExpiring(token) {
        try {
            const { exp } = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);

            return exp - now <= 5;
        } catch {
            return true;
        }
    }

    const logout = async () => {
        try {
            await fetch("http://localhost:3000/auth/logout", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: auth.refreshToken }),
            });
        } catch (err) {
            console.log("logout failed (probably server is down):", err);
        } finally {
            console.log("Setting auth to null");
            setAuth(null);
            localStorage.removeItem("auth");
        }
    };

    async function fetchAuth() {
        if (!auth?.refreshToken) return;

        try {
            const res = await fetch("http://localhost:3000/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: auth.refreshToken }),
            });

            if (!res.ok) {
                await logout();
                return console.log("auth context error!");
            }

            const data = await res.json();
            updateAuth({
                ...auth,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
        } catch (err) {
            await logout();
        }
    }

    useEffect(() => {
        if (!auth?.accessToken || !auth?.refreshToken) return;

        const { exp } = jwtDecode(auth.accessToken);
        const now = Math.floor(Date.now() / 1000);
        const delay = (exp - now - 5) * 1000; // 5s before expiry

        if (delay <= 0 && !isRefreshing.current) {
            isRefreshing.current = true;
            fetchAuth().finally(() => {
                isRefreshing.current = false;
            });
            return;
        }

        const timeout = setTimeout(() => {
            if (!isRefreshing.current && isTokenExpiring(auth.accessToken)) {
                isRefreshing.current = true;
                fetchAuth().finally(() => {
                    isRefreshing.current = false;
                });
            }
        }, delay);

        return () => clearTimeout(timeout);
    }, [auth?.accessToken, auth?.refreshToken]);

    return (
        <AuthContext.Provider
            value={{ auth, setAuth: updateAuth, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
