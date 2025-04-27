function Theme() {
    // tones
    const darkTheme = {
        "color-bg": "#1b1b1f",
        "color-body": "#161618",
        "color-accent-hover": "#242f2d",
        "color-shadow": "#1f2025",
        "color-text": "#dfded5",
        "color-text-gray": "#a9aeb7",
        "color-white": "#ffffff",
    };

    const lightTheme = {
        "color-bg": "#ffffff",
        "color-body": "#f7f7f8",
        "color-border": "#d1d5db",
        "color-shadow": "#e5e7eb",
        "color-text": "#111827",
        "color-text-gray": "#6b7280",
        "color-white": "#ffffff",
    };

    const ashTheme = {
        "color-bg": "#323338",
        "color-body": "#3c3d43",
        "color-border": "#52545a",
        "color-shadow": "#2c2d31",
        "color-text": "#e5e7eb",
        "color-text-gray": "#9ca3af",
        "color-white": "#ffffff",
    };

    const onyxTheme = {
        "color-bg": "#161618",
        "color-body": "#1b1b1f",
        "color-border": "#ef4444",
        "color-shadow": "#0f0f10",
        "color-text": "#e5e5e5",
        "color-text-gray": "#a9aeb7",
        "color-white": "#ffffff",
    };

    // themes
    const synthwave = {
        "color-bg": "#0d0221",
        "color-body": "#160c24",
        "color-accent-hover": "#fff380",
        "color-accent": "#ff007f",
        "color-accent-dark": "#1b2830",
        "color-border": "#6a0dad",
        "color-shadow": "#1a082a",
        "color-text": "#00f0ff",
        "color-text-gray": "#f5b3f3",
        "color-white": "#ffffff",
    };

    const icyWinter = {
        "color-bg": "#0d1b2a",
        "color-body": "#1b263b",
        "color-accent-hover": "#91cce6",
        "color-accent": "#3a86ff",
        "color-accent-dark": "#0a2540",
        "color-border": "#415a77",
        "color-shadow": "#09111d",
        "color-text": "#e0f2f1",
        "color-text-gray": "#b0bec5",
        "color-white": "#ffffff",
    };

    const pastel = {
        "color-bg": "#f9f9ff",
        "color-body": "#f0f4ff",
        "color-accent-hover": "#d4e4ff",
        "color-accent": "#89b9ff",
        "color-accent-dark": "#5a8dff",
        "color-border": "#dbe5ff",
        "color-shadow": "#d4dff9",
        "color-text": "#5c5470",
        "color-text-gray": "#8d8aa5",
        "color-white": "#ffffff",
    };

    const mirage = {
        "color-bg": "#fdf6e3",
        "color-body": "#f5e7c5",
        "color-accent-hover": "#ffc89c",
        "color-accent": "#e76f51",
        "color-accent-dark": "#8d5524",
        "color-border": "#e0cba8",
        "color-shadow": "#dacbb2",
        "color-text": "#5c4a32",
        "color-text-gray": "#8b7960",
        "color-white": "#ffffff",
    };

    const coffee = {
        "color-bg": "#2e2219",
        "color-body": "#3b2f26",
        "color-accent-hover": "#826f5c",
        "color-accent": "#c69c6d",
        "color-accent-dark": "#8b5e3c",
        "color-border": "#5c4533",
        "color-shadow": "#1d150f",
        "color-text": "#e8d8c3",
        "color-text-gray": "#b8a693",
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
            <h1 className="text-xl font-semibold">Tone</h1>
            <p>Change the tone for better visibility</p>
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
            <h1 className="text-xl font-semibold mt-3">Themes</h1>
            <p>Believe in your flyness</p>
            <div className="mt-3 flex gap-3">
                <div
                    onClick={() => applyTheme(synthwave)}
                    className="w-12 h-12 bg-[#170C25] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyTheme(icyWinter)}
                    className="w-12 h-12 bg-[#1B263B] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyTheme(pastel)}
                    className="w-12 h-12 bg-[#F0F4FF] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyTheme(mirage)}
                    className="w-12 h-12 bg-[#e76f51] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyTheme(coffee)}
                    className="w-12 h-12 bg-[#d6a77a] rounded-full border-1 cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Theme;
