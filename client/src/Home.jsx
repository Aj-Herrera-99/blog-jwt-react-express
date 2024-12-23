import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

function Home() {
    let navigate = useNavigate();
    const location = useLocation();
    const currUser = location.state;

    const handleLogout = () => {
        axios({
            method: "POST",
            url: "http://localhost:3000/users/logout",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + currUser.accessToken,
            },
            data: JSON.stringify({ token: currUser.refreshToken }),
        })
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error(err.response.data);
            })
            .finally(() => {
                window.history.replaceState({}, "");
                navigate("/");
            });
    };

    return (
        <div className="w-full h-[100vh] flex flex-col">
            {currUser ? (
                <>
                    <Navbar handleLogout={handleLogout} />
                    <Main currUser={currUser}/>
                    {/* <h1>Hello from Home</h1>
                    <h2 className="my-2 text-2xl">
                        {data.isAdmin ? "admin" : "user"} dashboard
                    </h2>
                    <ul className="flex gap-10 my-4 bg-red-300">
                        {users.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => removeUser(user.id)}
                                className="flex flex-col bg-red-400 cursor-pointer grow"
                            >
                                <span>{user.id}</span>
                                <span>{user.username}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleClick}
                        className="text-xl tracking-wider cursor-pointer bg-stone-700 hover:bg-stone-800"
                    >
                        LOGOUT
                    </button> */}
                </>
            ) : (
                <>
                    <h1>You are not allowed!</h1>
                    <Link to={"/"}>
                        <button className="my-4 text-2xl tracking-widest uppercase">
                            Go Back!
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default Home;
