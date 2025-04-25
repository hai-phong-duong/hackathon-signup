import { Settings } from "lucide-react";

function Users({ users }) {
    function handleModal(id) {
        if (openID === id) {
            setOpenID(-1);
        } else {
            setOpenID(id);
        }
    }

    function handleDelete() {}

    function handlePromote() {}

    return (
        <div className="flex flex-col flex-grow p-35 py-20 pr-50 gap-8">
            <h1 className="text-5xl font-semibold">
                <span className="text-accent">Users</span>
            </h1>
            <div>
                <h1 className="-mt-3 mb-3 text-2xl text-text">
                    These are the registered users
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {users.map((user, id) => (
                        <div
                            key={id}
                            className="bg-body p-4 rounded-xl border border-2 border-accent text-accent p-4 hover:shadow-xl transition-shadow duration-250"
                        >
                            <div className="flex justify-between items-center">
                                <p className="font-semibold tracking-wide">
                                    {user.username}
                                </p>
                                <div className="relative">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleModal(id)}
                                    >
                                        <Settings className="stroke-[1.5]" />
                                    </button>
                                </div>
                            </div>
                            <p className="">{user.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Users;
