import { useState, useEffect } from "react";

import { Users, Clock } from "lucide-react";
import { intervalToDuration } from "date-fns";

function AdminLanding({ auth, users }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateCountdown = () => {
            const duration = intervalToDuration({
                start: new Date(),
                end: new Date("2025-05-04T23:59:59"),
            });

            setTimeLeft(
                `${String(duration.days || 0).padStart(2, "0")}d ` +
                    `${String(duration.hours || 0).padStart(2, "0")}h ` +
                    `${String(duration.minutes || 0).padStart(2, "0")}m ` +
                    `${String(duration.seconds || 0).padStart(2, "0")}s`
            );
        };

        updateCountdown(); // Run immediately
        const interval = setInterval(updateCountdown, 1000); // Update every minute

        return () => clearInterval(interval);
    }, [timeLeft]);

    return (
        <div className="bg-bg flex flex-col flex-grow p-35 py-20 pr-50 gap-8">
            <h1 className="text-5xl text-text font-semibold">
                Welcome, <span className="text-accent">{auth.username}</span>
            </h1>
            <div className="grid grid-cols-1 gap-6 max-w-[768px]">
                <div className="bg-body p-4 rounded-xl border border-2 border-accent text-accent">
                    <div className="flex justify-between">
                        <h1 className="text-2xl">
                            <span className="font-semibold">Total Users</span>{" "}
                            {users.length}
                        </h1>
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-lg text-text">
                            This includes all admins and participants in the
                            database.
                        </p>
                    </div>
                </div>
                <div className="bg-body p-4 rounded-xl border border-2 border-accent text-accent">
                    <div className="flex justify-between">
                        <h1 className="text-2xl">
                            <span className="font-semibold">
                                Hackathon RSVP closes in
                            </span>
                        </h1>
                        <Clock className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-md font-mono tex-text">
                        {timeLeft}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLanding;
