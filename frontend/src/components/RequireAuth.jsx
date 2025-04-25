import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }) {
    const { auth, loading } = useAuth();

    if (loading) return <div className="text-white">Loading...</div>;

    if (!auth?.accessToken) {
        return <Navigate to="/login" replace />;
    }

    if (role && auth.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
