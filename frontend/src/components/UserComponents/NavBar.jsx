import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Home, Edit, LogOut, Calendar, Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function NavBar({ onSectionSelect }) {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
    const { logout } = useAuth();
    const navigate = useNavigate;

    const navItems = [
        {
            label: "Home",
            icon: <Home className="w-5 h-5" />,
        },
        {
            label: "Schedule",
            icon: <Calendar className="w-5 h-5" />,
        },
        {
            label: "Settings",
            icon: <Settings className="w-5 h-5" />,
        },
        {
            label: "Edit Profile",
            icon: <Edit className="w-5 h-5" />,
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setCollapsed(false); // force open on larger screens
            } else if (window.innerWidth <= 920) {
                setCollapsed(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 h-full transition-all duration-300 bg-bg z-100 ${
                collapsed ? "w-16" : "w-70"
            }`}
        >
            <button
                onClick={() => window.innerWidth < 1024 && setCollapsed(false)}
                className={`
    absolute top-0 left-0 p-4 transition-opacity duration-300
    ${
        collapsed
            ? "opacity-100 delay-300 cursor-pointer"
            : "opacity-0 pointer-events-none"
    } lg:hidden
  `}
            >
                <Menu className="w-8 h-8 text-accent" />
            </button>

            <div
                className={`flex flex-col justify-between h-full bg-body p-4 py-10 w-70 transition-all duration-300 ${
                    collapsed ? "-translate-x-full" : "translate-x-0"
                } w-70`}
            >
                <div className="flex justify-between items-center">
                    <div className="flex w-full items-center md:justify-center gap-3 text-xl font-semibold">
                        <img
                            src="/assets/tree.PNG"
                            alt=""
                            className="w-12 h-12"
                        />
                        <h1 className="tracking-wider text-accent">
                            TreeHACKS
                        </h1>
                    </div>
                    <button
                        onClick={() =>
                            window.innerWidth < 1024 && setCollapsed(true)
                        }
                        className="p-2 cursor-pointer text-accent lg:hidden"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    {navItems.map((item, id) => (
                        <button
                            onClick={() => onSectionSelect(item.label)}
                            key={id}
                            className="font-semibold text-accent w-full
                        text-xl px-4 py-2 rounded-xl items-center hover:bg-accent-hover hover:cursor-pointer transition transition-background duration-250 flex gap-2"
                        >
                            {item.icon}
                            {!collapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </div>
                <div></div>
                <div>
                    <button
                        className="font-semibold text-accent w-full
                        text-xl px-4 py-2 rounded-xl items-center hover:bg-accent-hover hover:cursor-pointer transition transition-background duration-250 flex gap-2"
                        onClick={async () => {
                            await logout();
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
