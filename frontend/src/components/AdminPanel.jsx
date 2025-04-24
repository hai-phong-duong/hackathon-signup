import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import NavBar from "./NavBar";
import AdminLanding from "./AdminLanding";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const { auth } = useAuth();
    const token = auth.accessToken;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch("http://localhost:3000/users/admin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                navigate("/dashboard");
            }
        }
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-grow h-screen">
            <NavBar />
            <AdminLanding auth={auth} users={users} />
        </div>
    );
}
