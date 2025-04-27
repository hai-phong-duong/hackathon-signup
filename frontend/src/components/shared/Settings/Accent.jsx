function Accent() {
    const forestAccent = {
        "color-accent": "#32a46c",
        "color-accent-dark": "#1c2927",
        "color-accent-hover": "#364539",
    };
    const neonPinkAccent = {
        "color-accent": "#f472b6",
        "color-accent-dark": "#291c26",
        "color-accent-hover": "#5c424f",
    };

    const crimsonAccent = {
        "color-accent": "#ef4444",
        "color-accent-dark": "#291c22",
        "color-accent-hover": "#574545",
    };

    const purpleAccent = {
        "color-accent": "#a855f7",
        "color-accent-dark": "#241c29",
        "color-accent-hover": "#514859",
    };

    const cyanAccent = {
        "color-accent": "#06b6d4",
        "color-accent-dark": "#1c2729",
        "color-accent-hover": "#425254",
    };

    function applyAccent(accent) {
        const root = document.documentElement;

        for (const [key, value] of Object.entries(accent)) {
            root.style.setProperty(`--${key}`, value);
        }
    }

    return (
        <div className="text-text mt-3">
            <h1 className="text-xl font-semibold">Accents</h1>
            <p>Change the accents for extra flair</p>
            <div className="mt-3 flex gap-3">
                <div
                    onClick={() => applyAccent(forestAccent)}
                    className="w-12 h-12 bg-[#32a46c] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyAccent(neonPinkAccent)}
                    className="w-12 h-12 bg-[#f472b6] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyAccent(crimsonAccent)}
                    className="w-12 h-12 bg-[#ef4444] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyAccent(purpleAccent)}
                    className="w-12 h-12 bg-[#a855f7] rounded-full border-1 cursor-pointer"
                />
                <div
                    onClick={() => applyAccent(cyanAccent)}
                    className="w-12 h-12 bg-[#06b6d4] rounded-full border-1 cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Accent;
