import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignForm from "./components/SignForm";

const initialLoginData = {
    username: "",
    password: "",
};

function App() {
    const [user, setUser] = useState({});
    let navigate = useNavigate();
    const [loginData, setLoginData] = useState(initialLoginData);
    const [isRegistered, setIsRegistered] = useState(true);
    const [goBack, setGoBack] = useState(false);

    // actions
    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // const formData = new FormData(document.querySelector("form"));
        // const username = formData.get("username");
        // const password = formData.get("password");

        axios({
            method: "post",
            url: "http://localhost:3000/users/login",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                username: loginData.username,
                password: loginData.password,
            }),
        })
            .then((res) => res.data)
            .then((data) => {
                navigate("/home", { state: data });
                setUser(data);
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    };
    const handleSignup = (e) => {
        e.preventDefault();
        const formData = new FormData(document.querySelector("form"));
        const username = formData.get("username");
        const password = formData.get("password");

        axios({
            method: "post",
            url: "http://localhost:3000/users/signup",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ username, password }),
        })
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setIsRegistered(true);
            })
            .catch((err) => {
                console.error(err.response.data);
                setGoBack(true);
            })
            .finally(() => setLoginData(initialLoginData));
    };

    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <h1>Hello from App</h1>
            {isRegistered ? (
                <SignForm
                    loginData={loginData}
                    handleInputChange={handleInputChange}
                    submitAction={handleLogin}
                    btnText="LOGIN"
                >
                    <div className="flex items-center justify-between">
                        <span>Not registered yet?</span>
                        <button
                            onClick={() => {
                                setIsRegistered(false);
                                setLoginData(initialLoginData);
                            }}
                            type="button"
                            className="text-lg tracking-wider cursor-pointer bg-stone-800 hover:bg-stone-900"
                        >
                            SIGN UP
                        </button>
                    </div>
                </SignForm>
            ) : (
                <SignForm
                    loginData={loginData}
                    handleInputChange={handleInputChange}
                    submitAction={handleSignup}
                    btnText="SIGN UP"
                >
                    {goBack && (
                        <div className="flex flex-col gap-2 mt-5">
                            <span>You are already registered!</span>
                            <button
                                onClick={() => {
                                    setIsRegistered(true);
                                    setGoBack(false);
                                }}
                                className="mt-1 text-xl tracking-widest uppercase"
                            >
                                Go Back!
                            </button>
                        </div>
                    )}
                </SignForm>
            )}
        </div>
    );
}

export default App;
