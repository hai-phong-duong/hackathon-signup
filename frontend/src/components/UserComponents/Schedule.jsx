function Schedule() {
    return (
        <div className="bg-bg flex flex-col flex-grow p-20 gap-8">
            <h1 className="text-5xl font-semibold text-accent mb-8">
                Event Schedule
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse table-fixed">
                    <thead>
                        <tr className="text-accent border-b border-accent">
                            <th className="p-4 text-left w-24">Time</th>
                            <th className="p-4 text-center">Theatre</th>
                            <th className="p-4 text-center">Library</th>
                            <th className="p-4 text-center">Cafeteria</th>
                        </tr>
                    </thead>
                    <tbody className="text-text">
                        <tr className="border-b border-accent">
                            <td className="p-4 text-right">7:00</td>
                        </tr>
                        <tr className="border-b border-accent">
                            <td className="p-4 text-right">8:00</td>
                            <td className="p-4 bg-accent rounded-md text-center m-2">
                                Opening
                            </td>
                            <td className="p-4"></td>
                            <td className="p-4 bg-accent/60 rounded-md text-center">
                                Check-In
                            </td>
                        </tr>

                        <tr className="border-b border-accent">
                            <td className="p-4 text-right">9:00</td>
                            <td></td>
                            <td className="p-4 bg-accent/40 rounded-md text-center">
                                Workshop
                            </td>
                            <td
                                rowSpan="2"
                                className="p-4 bg-accent/20 rounded-md text-center"
                            >
                                Snacks
                            </td>
                        </tr>

                        <tr className="border-b border-accent">
                            <td className="p-4 text-right">10:00</td>
                            <td className="p-4 bg-accent/50 rounded-md text-center">
                                Workshop 2
                            </td>
                            <td className="p-4 bg-accent/30 rounded-md text-center">
                                Chill Zone
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Schedule;
