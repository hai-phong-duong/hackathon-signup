import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
    const { auth } = useAuth();

    return (
        <div className="min-h-screen bg-bg px-6 py-10 text-text-primary">
            dashboard
            {auth.username}
            {auth.role}
        </div>
    );
}
