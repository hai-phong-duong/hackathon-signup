import { FileUser, MapPinned } from "lucide-react";

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
            <div className="bg-body p-4 rounded-xl border border-2 border-accent text-accent">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Venue Location</h1>
                    <MapPinned className="w-6 h-6" />
                </div>
                <div className="w-full h-64 mt-3">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.1506096790813!2d-79.73854968845194!3d43.4365703662947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b5d865fd5349d%3A0x9fa1f7dc58c021e5!2sAbbey%20Park%20High%20School!5e0!3m2!1sen!2sca!4v1745723317733!5m2!1sen!2sca"
                        width="100%"
                        height="100%"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default UserLanding;
