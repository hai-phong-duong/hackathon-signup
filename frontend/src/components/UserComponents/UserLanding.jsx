import { FileUser } from "lucide-react";

function UserLanding({ auth }) {
    return (
        <div className="bg-bg flex flex-col flex-grow p-35 py-20 pr-50 gap-8">
            <h1 className="text-5xl text-text font-semibold">
                Welcome, <span className="text-accent">{auth.username}</span>
            </h1>
            <div className="bg-body p-4 rounded-xl border border-2 border-accent text-accent">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Hackathon Status</h1>
                    <FileUser className="w-6 h-6" />
                </div>
                <div className="text-lg text-text">
                    <p>
                        ✅ You are successfully registered for TreeHACKS 2025!
                    </p>
                </div>
            </div>
            <div className="bg-body p-4 rounded-xl border border-2 border-accent text-accent">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Event Details</h1>
                    <FileUser className="w-6 h-6" />
                </div>
                <div className="text-lg text-text">
                    <p>Date: May 10-12, 2025</p>
                    <p>Location: Abbey Park High School</p>
                    <p>Opening Ceremony: 9:00 AM</p>
                </div>
            </div>
        </div>
    );
}

export default UserLanding;
