import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, BarChart, Settings, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
    const [collapsed, setCollapsed] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate;

    const navItems = [
        {
            label: "Users",
            icon: <Users className="w-5 h-5" />,
            path: "/admin/users",
        },
        {
            label: "Analytics",
            icon: <BarChart className="w-5 h-5" />,
            path: "/admin/analytics",
        },
        {
            label: "Settings",
            icon: <Settings className="w-5 h-5" />,
            path: "/admin/settings",
        },
    ];

    return (
        <div
            className={`relative h-full transition-all duration-300 ${
                collapsed ? "w-16" : "w-70"
            }`}
        >
            {collapsed && (
                <button
                    onClick={() => setCollapsed(false)}
                    className="p-4 cursor-pointer"
                >
                    <Menu className="w-8 h-8" />
                </button>
            )}

            <div
                className={`absolute top-0 left-0 flex flex-col justify-between h-full cursor-pointer bg-body p-4 py-10 transition-transform duration-300 ${
                    collapsed ? "-translate-x-full" : "translate-x-0"
                } w-70`}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-xl font-semibold">
                        <img
                            src="/assets/tree.PNG"
                            alt=""
                            className="w-12 h-12"
                        />
                        <h1>TreeHACKS</h1>
                    </div>
                    <button
                        onClick={() => setCollapsed(true)}
                        className="p-2 cursor-pointer"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
                <div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
                        >
                            {item.icon}
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </div>
                <div></div>
                <div>
                    <button
                        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-green-200 transition-colors w-full text-left duration-250"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        <LogOut className="w-5 h-5" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
