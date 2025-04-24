import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("auth");
        return storedAuth ? JSON.parse(storedAuth) : null;
    }); // holds /login respnose from backend

    const updateAuth = (data) => {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth: updateAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
