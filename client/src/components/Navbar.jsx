import style from "./Navbar.module.css"

function Navbar({handleLogout}) {
    return (
        <nav className="grid grid-cols-3 p-4 bg-stone-900">
            <div className="flex items-end gap-4">
                <h1>MyBlog</h1>
                <div className="flex items-center gap-4 p-2 bg-white rounded-lg">
                    <i className="fa-solid fa-magnifying-glass text-stone-500"></i>
                    <input
                        className="w-full text-lg text-black bg-white focus:outline-none"
                        type="text"
                        placeholder="something in your mind"
                    />
                </div>
            </div>
            <div className="flex items-end justify-between text-4xl">
                <i className="fa-solid fa-house grow"></i>
                <i className="fa-solid fa-images grow"></i>
                <i className="fa-solid fa-fire grow"></i>
            </div>
            <div className="flex items-end justify-end gap-8 text-4xl">
                <i className="fa-solid fa-gear"></i>
                <i onClick={handleLogout} className="fa-solid fa-user-astronaut"></i>
            </div>
        </nav>
    );
}

export default Navbar;
