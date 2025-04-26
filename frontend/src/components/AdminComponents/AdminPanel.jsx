import { use, useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Analytics from "./Analytics";
import NavBar from "./NavBar";
import AdminLanding from "./AdminLanding";
import Users from "./Users";

export default function AdminPanel() {
    const [section, setSection] = useState("Home");
    const [users, setUsers] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
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
                navigate("/login");
            }
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`opacity-0 flex min-h-screen tracking-wide ${
                isVisible ? "opacity-100" : "opacity-0"
            } duration-768`}
        >
            <NavBar onSectionSelect={setSection} />
            <div className="flex-grow lg:pl-70">
                {section === "Home" && (
                    <AdminLanding auth={auth} users={users} />
                )}
                {section === "Users" && <Users users={users} />}
                {section === "Analytics" && <Analytics users={users} />}
            </div>
        </div>
    );
}
