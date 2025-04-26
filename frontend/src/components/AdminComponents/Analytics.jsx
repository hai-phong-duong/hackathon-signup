import { useEffect, useState } from "react";

function Analytics({ users }) {
    const [health, setHealth] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const res = await fetch("http://localhost:3000/health");
                const data = await res.json();
                setHealth(data);
            } catch (error) {
                setHealth({
                    status: "down",
                    uptime: "N/A",
                    requestCount: "N/A",
                    timestamp: new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    }),
                });
            }
        };
        fetchHealth();

        const interval = setInterval(fetchHealth, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setProgress(Math.round((users.length / 11) * 100));
    }, []);

    return (
        <div className="bg-bg flex flex-col flex-grow p-35 py-20 pr-50 gap-8">
            <h1 className="text-5xl text-accent font-semibold">Analytics</h1>
            <h1 className="-mt-3 text-2xl text-text">
                These are your hackathon and system statistics
            </h1>
            <div className="w-full">
                <div
                    className="grid gap-4 
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3"
                >
                    <div className="bg-body p-6 pb-10 rounded-xl border-2 border-accent text-text flex flex-col gap-3 col-span-1">
                        <p className="text-text-gray">API Status</p>
                        <div className="flex items-center gap-4 col-span-1">
                            <span className="relative flex size-6">
                                <span
                                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                                        health?.status === "down"
                                            ? "bg-red-500"
                                            : "bg-[#32a46c]"
                                    }`}
                                ></span>
                                <span
                                    className={`relative inline-flex size-6 rounded-full ${
                                        health?.status === "down"
                                            ? "bg-red-500"
                                            : "bg-[#32a46c]"
                                    }`}
                                ></span>
                            </span>
                            <p
                                className={`text-5xl ${
                                    health?.status === "down"
                                        ? "text-red-500"
                                        : "text-[#32a46c]"
                                } `}
                            >
                                {health?.status}
                            </p>
                        </div>
                    </div>

                    <div className="bg-body p-6 pb-10 rounded-xl border-2 border-accent text-text flex flex-col gap-3 col-span-1">
                        <p className="text-text-gray">Total Users</p>
                        <p className="text-5xl">
                            {health?.status === "down" ? "N/A" : users.length}
                        </p>
                    </div>
                    <div className="bg-body p-6 pb-10 rounded-xl border-2 border-accent text-text flex flex-col gap-3 col-span-1 md:col-span-2 xl:col-span-1">
                        <p className="text-text-gray">Registration Progress</p>
                        <p className="text-5xl">
                            {health?.status === "down" ? "N/A" : `${progress}%`}
                        </p>
                        <div className="w-full bg-accent-dark h-3 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-r-xl bg-accent transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div className="bg-body p-6 pb-10 rounded-xl border-2 border-accent text-text flex flex-col gap-3 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-2">
                        <p className="text-text-gray">Signups over time</p>
                        <p>WIP</p>
                    </div>
                    <div className="bg-body p-6 pb-10 rounded-xl border-2 border-accent text-text flex flex-col gap-3 col-span-1 sm:col-span-2 md:col-span-3 xl:col-span-1">
                        <p className="text-text-gray">API Health</p>
                        <div className="flex flex-col gap-3 text-xl">
                            <div className="flex justify-between">
                                <p>Uptime</p>
                                <p>{health?.uptime}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Requests</p>
                                <p>{health?.requestCount}</p>
                            </div>
                            <div className="w-full flex justify-center flex-col">
                                <p>Checked at</p>
                                <p className="text-3xl text-accent">
                                    {health?.timestamp}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
