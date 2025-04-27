import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Toggle from "../../ui/Toggle";
import Slider from "../../ui/Slider";

function AutoLogout() {
    const [autoLogout, setAutoLogout] = useState(false);
    const [timeoutMins, setTimeoutMins] = useState(15);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const logoutTimerRef = useRef(null);

    useEffect(() => {
        if (!autoLogout) return;

        const timeoutMs = timeoutMins * 60 * 1000;

        logoutTimerRef.current = setTimeout(async () => {
            try {
                await logout();
                navigate("/login");
            } catch (err) {
                console.error("Logout failed:", err);
            }
        }, timeoutMs);

        return () => {
            if (logoutTimerRef.current) {
                clearTimeout(logoutTimerRef.current);
                logoutTimerRef.current = null;
            }
        };
    }, [autoLogout, timeoutMins]);

    return (
        <div className="text-text mt-3 gap-3">
            <div className="grid grid-cols-[auto_1fr] max-w-[500px] gap-x-16 gap-y-2">
                <div className="font-semibold text-lg">Auto Logout</div>
                <Toggle
                    checked={autoLogout}
                    onChange={() => setAutoLogout((prev) => !prev)}
                />
                <div className="font-semibold text-lg">Timeout</div>
                <Slider
                    value={timeoutMins}
                    min={1}
                    max={60}
                    disabled={!autoLogout}
                    onChange={setTimeoutMins}
                />
            </div>
        </div>
    );
}

export default AutoLogout;
