function UserLanding({ auth }) {
    return (
        <div className="bg-bg flex flex-col flex-grow p-35 py-20 pr-50 gap-8">
            <h1 className="text-5xl text-text font-semibold">
                Welcome, <span className="text-accent">{auth.username}</span>
            </h1>
        </div>
    );
}

export default UserLanding;
