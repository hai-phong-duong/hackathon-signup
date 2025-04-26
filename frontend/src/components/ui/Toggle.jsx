function Toggle({ checked, onChange }) {
    return (
        <div className="flex items-center focus:outline-hidden">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer "
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div className="w-11 h-6 bg-text rounded-full peer peer-checked:bg-accent transition-all"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-full"></div>
            </label>
        </div>
    );
}

export default Toggle;
