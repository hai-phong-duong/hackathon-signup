import { use, useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

import NavBar from "./NavBar.jsx";
import UserLanding from "./UserLanding.jsx";
import FAQ from "./FAQ.jsx";
import Settings from "./Settings.jsx";
import EditProfile from "./EditProfile.jsx";
import Schedule from "./Schedule.jsx";

function UserDashboard() {
    const [section, setSection] = useState("Home");
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const token = auth.accessToken;

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
                {section === "Home" && <UserLanding auth={auth} />}
                {section === "Edit Profile" && <EditProfile />}
                {section === "Schedule" && <Schedule />}
                {section === "Settings" && <Settings />}
                {section === "FAQ" && <FAQ onSectionSelect={setSection} />}
            </div>
        </div>
    );
}

export default UserDashboard;
