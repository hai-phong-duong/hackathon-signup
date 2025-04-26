import Theme from "./Settings/Theme";
import Accent from "./Settings/Accent";

function Settings() {
    return (
        <div className="bg-bg flex flex-col flex-grow p-35 py-20 pr-50 gap-8">
            <h1 className="text-5xl text-accent font-semibold">Settings</h1>
            <h1 className="-mt-3 text-2xl text-text">
                Change system settings here
            </h1>
            <div className="bg-body p-4 rounded-xl border border-2 border-accent">
                <h1 className="text-2xl">
                    <span className="font-semibold text-accent">
                        Appearance
                    </span>
                </h1>
                <Theme />
                <Accent />
            </div>
        </div>
    );
}

export default Settings;
