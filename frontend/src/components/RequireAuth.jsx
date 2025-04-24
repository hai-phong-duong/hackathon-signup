import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }) {
    const { auth } = useAuth();

    console.log(auth);

    if (auth == null || !auth.accessToken) return <Navigate to="/login" />;

    if (role && auth.role !== role) return <Navigate to="/login" />;

    return children;
}
