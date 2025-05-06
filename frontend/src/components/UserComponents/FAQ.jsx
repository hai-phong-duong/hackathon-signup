import { useState } from "react";

function FAQ({ onSectionSelect }) {
    const [openID, setOpenID] = useState(-1);

    return (
        <div className="bg-bg flex flex-col flex-grow p-35 py-20 pr-50">
            <h1 className="text-5xl font-semibold text-accent mb-8">FAQ</h1>
            <div className="max-w-[500px]">
                <div
                    onClick={() => setOpenID(openID === 1 ? -1 : 1)}
                    className="relative border-b-2 text-accent"
                >
                    <span
                        className={`text-xl transition-opacity duration-250 absolute top-4 ${
                            openID === 1 ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        +
                    </span>
                    <span
                        className={`text-xl transition-opacity duration-250 absolute top-4 ${
                            openID === 1 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        -
                    </span>
                    <h1 className="ml-4 text-xl font-semibold cursor-pointer py-4">
                        What do I need to bring?
                    </h1>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-250 text-text ${
                        openID === 1 ? "h-[80px]" : "h-0"
                    }`}
                >
                    <div className="mt-2">
                        You should bring your laptop, charger, and any personal
                        accomodations that you might need. We have free WiFi,
                        charging ports, and water fountains as well.
                    </div>
                </div>
                <div
                    onClick={() => setOpenID(openID === 2 ? -1 : 2)}
                    className="border-b-2 text-accent relative"
                >
                    <span
                        className={`text-xl transition-opacity duration-250 absolute top-4 ${
                            openID === 2 ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        +
                    </span>
                    <span
                        className={`text-xl transition-opacity duration-250 absolute top-4 ${
                            openID === 2 ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        -
                    </span>
                    <h1 className="ml-4 text-xl font-semibold cursor-pointer py-4">
                        What sort of workshops will there be?
                    </h1>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-250 text-text ${
                        openID === 2 ? "h-[150px]" : "h-0"
                    }`}
                >
                    <div className="mt-2">
                        There will be a variety of workshops, including
                        beginniner friendly ones like "How to use GitHub" to
                        more involved ones like "How to integrate AI into your
                        projects." Check out the{" "}
                        <span
                            className="cursor-pointer text-accent bg-accent-dark/20 rounded-md px-1 hover:bg-accent-hover transition-all duration-250"
                            onClick={() => onSectionSelect("Schedule")}
                        >
                            Event Schedule
                        </span>{" "}
                        for more information!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
