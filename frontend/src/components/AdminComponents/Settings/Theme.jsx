function Theme() {
    const darkTheme = {
        "color-bg": "#1b1b1f",
        "color-body": "#161618",
        "color-accent-hover": "#242f2d",
        "color-accent": "#32a46c",
        "color-accent-dark": "#1c2927",
        "color-border": "#ef4444",
        "color-shadow": "#1f2025",
        "color-text": "#dfded5",
        "color-text-gray": "#a9aeb7",
        "color-white": "#ffffff",
    };

    const lightTheme = {
        "color-bg": "#ffffff",
        "color-body": "#f7f7f8",
        "color-accent-hover": "#d1d5db",
        "color-accent": "#10b981",
        "color-accent-dark": "#059669",
        "color-border": "#d1d5db",
        "color-shadow": "#e5e7eb",
        "color-text": "#111827",
        "color-text-gray": "#6b7280",
        "color-white": "#ffffff",
    };

    const ashTheme = {
        "color-bg": "#323338",
        "color-body": "#3c3d43",
        "color-accent-hover": "#4b4d52",
        "color-accent": "#10b981",
        "color-accent-dark": "#059669",
        "color-border": "#52545a",
        "color-shadow": "#2c2d31",
        "color-text": "#e5e7eb",
        "color-text-gray": "#9ca3af",
        "color-white": "#ffffff",
    };

    const onyxTheme = {
        "color-bg": "#161618",
        "color-body": "#1b1b1f",
        "color-accent-hover": "#242f2d",
        "color-accent": "#32a46c",
        "color-accent-dark": "#1c2927",
        "color-border": "#ef4444",
        "color-shadow": "#0f0f10",
        "color-text": "#e5e5e5",
        "color-text-gray": "#a9aeb7",
        "color-white": "#ffffff",
    };

    function applyTheme(theme) {
        const root = document.documentElement;

        for (const [key, value] of Object.entries(theme)) {
            root.style.setProperty(`--${key}`, value);
        }
    }

    return (
        <div className="text-text mt-3">
            <h1 className="text-xl font-semibold">Themes</h1>
            <p>Change the theme for better visibility</p>
            <div className="mt-3 flex gap-3">
                <div
                    onClick={() => applyTheme(lightTheme)}
                    className="w-12 h-12 bg-[#ffffff] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyTheme(ashTheme)}
                    className="w-12 h-12 bg-[#8a8a8a] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyTheme(darkTheme)}
                    className="w-12 h-12 bg-[#1b1b1f] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyTheme(onyxTheme)}
                    className="w-12 h-12 bg-[#000000] rounded-full border-1 cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Theme;
