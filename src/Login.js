import React, { useEffect, useState } from "react";
import bg from "./images/BGLogin.png";
import logo from "./images/Tantra White.png";
import Term from "./component/Terms";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [showTerms, setShowTerms] = useState(false);
    const [csrfToken, setCsrfToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isMuted, setIsMuted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get("/get_csrf_token", { withCredentials: true });
                setCsrfToken(response.data.message);
            } catch (error) {
                console.error("Failed to fetch CSRF token", error);
            }
        };
        fetchCsrfToken();
    }, []);

    const toggleMute = () => {
        const audioElement = document.getElementById("aud");
        if (isMuted) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get("/dashboard")
                .then(res=>{
                    navigate("/game")
                })
                
            } catch (e) {
                navigate("/login");
            }
        };
        fetchData();
    }, [navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const phone = event.target.elements[0].value;
            const response = await axios.post(
                "/getDetails",
                { phone },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                }
            );

            if (response.data.message === "Data received successfully") {
                navigate("/game");
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login error", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="w-screen h-svh flex flex-col overflow-hidden bg-cover relative bg-no-repeat box-border px-5 py-3"
            style={{ backgroundImage: `url(${bg})` }}>
                <div className="sm:hidden flex flex-col h-full">
            <nav className="flex justify-between pt-2">
                <img src={logo} className="w-8" alt="Logo" />
                <div className="w-5 h-5 text-white" onClick={toggleMute}>
                    {isMuted ? (
                        <i className="fa-solid fa-volume-xmark" />
                    ) : (
                        <i className="fa-solid fa-volume-high" />
                    )}
                </div>
            </nav>
            <p className="text-3xl text-center mix-blend-difference my-12 text-white">Mystery <br /> Digits</p>
            <h4 className="text-3xl py-10 font-bold text-gray-700 text-center">Login</h4>
            <form onSubmit={handleLogin}>
                <input
                    type="number"
                    required
                    placeholder="Enter Registered number"
                    className="w-full outline-none px-4 text-sm py-2 border-b border-gray-500 bg-transparent"
                />
                <p className="text-red-600 text-sm">{errorMessage}</p>
                <button
                    className="w-full text-lg py-2 bg-black text-white rounded mt-10"
                    type="submit"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 mx-auto rounded-full border-4 animate-spin border-gray-500 border-t-white" />
                    ) : (
                        "Next"
                    )}
                </button>
            </form>
            <div className={`absolute top-0 duration-500 ${showTerms ? "left-full" : "left-0"}`}>
                <Term move={showTerms} setmove={setShowTerms} />
            </div>
            </div>
            <img src="https://mysterydigits.vjec.in/desktop.jpg" className="h-svh sm:block hidden"/>
        </div>
    );
}

export default Login;
