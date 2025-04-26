import "./Slider.css";

function Slider({ value, onChange, min, max, disabled }) {
    return (
        <label className="flex items-center gap-3 w-full">
            <input
                type="range"
                min={min}
                max={max}
                value={value ?? 1}
                disabled={disabled}
                step="5"
                onChange={(e) => {
                    const num = Number(e.target.value);
                    onChange(isNaN(num) ? 1 : num === 0 ? 1 : num);
                }}
                className={`focus:outline-hidden flex-grow bg-accent rounded-xl appearance-none ${
                    !disabled ? "opacity-100" : "opacity-50 cursor-not-allowed"
                }`}
            />
            <span className="text-sm min-w-[60px] text-right">
                {value ?? 1} {value === 1 ? "minute" : "minutes"}
            </span>
        </label>
    );
}

export default Slider;
