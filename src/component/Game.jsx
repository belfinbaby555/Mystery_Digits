import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import over from "../images/game_over.png";
import text from "../images/text_over.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function GamePlay({ select }) {
    const [left, setLeft] = useState();
    const [user, setUser] = useState({});
    const [mute, setMute] = useState(false);
    const [file, setFile] = useState();
    const [error, setError] = useState({status:false,msg:""});
    const [approved, setApproved] = useState(false);
    const [load, setLoad] = useState(false);
    const [loading, isloading] = useState(true)
    const navigate = useNavigate();

    const toggleMute = () => {
        const audio = document.getElementById("aud");
        mute ? audio.play() : audio.pause();
        setMute(!mute);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/dashboard");
                setUser(res.data);
                setLeft(res.data.level);
                setFile(res.data.filepath);
                isloading(false)
            } catch (e) {
                navigate("/login");
            }
        };
        fetchData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const val = Number(user.level);
        const inputLength = e.target.value.length;
        setLeft(Math.max(0, val - inputLength));
    };

    const resumeGame = async () => {
        try {
            await axios.get("/resumeTime");
        } catch (e) {
            // Handle error if necessary
        }
    };

    const handleGameSubmit = async (event) => {
        event.preventDefault();

        
        setLoad(true);
        
        const val = event.target.elements[0].value;

        if(val.length !== Number(user.level)){
            setError({status:true,msg:`No. of digits should be ${user.level}`})
            setLoad(false)
            setTimeout(() => setError({status:false,msg:""}), 2000);
        }
        else{

        try {
            const tokenResponse = await axios.get("/get_csrf_token");
            const res = await axios.post("/game", { val }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": tokenResponse.data.message,
                },
            });
            setUser(res.data);
            setFile(res.data.filepath);
            setLeft(res.data.level);
            setApproved(true);
            event.target.elements[0].value = "";
        } catch (e) {
            setUser((prev) => ({
                ...prev,
                tries: e.response.data.tries,
                continue: e.response.data.continue,
            }));
            setLeft(e.response.data.level);
            setError({status:true,msg:`Wrong digits ${e.response.data.tries} chances left`});
            setTimeout(() => setError({status:false,msg:""}), 2000);
        } finally {
            setLoad(false);
        }}
    };

    return (
        <div className={`w-full h-svh bg-gray-300 text-center rounded-xl relative overflow-hidden box-border px-2 py-3 ${select ? "block" : "hidden"}`}>
            {loading?
            <Loading/>:
            user.tries && user.continue ? (
                <div className="flex flex-col h-full">
                    {approved && (
                        <div className="absolute top-0 left-0 flex h-full w-full backdrop-blur-sm bg-[#00000025] z-30">
                            <div className="w-11/12 rounded box-border flex flex-col gap-3 h-fit bg-white m-auto px-3 py-5">
                                <h1 className="font-bold text-2xl">Congratulations</h1>
                                <p className="text-sm text-gray-700">Level {user.level - 1} has been completed. <br /> Timer has stopped! Click next to resume timer.</p>
                                <button onClick={() => { setApproved(false); resumeGame(); }} className="px-3 py-2 text-white bg-black rounded"> Next</button>
                            </div>
                            <Confetti numberOfPieces={500} recycle={false} />
                        </div>
                    )}
                    <h1 className="pb-3 text-lg w-full relative font-semibold">Mystery Quest
                        <div className="w-5 h-5 absolute right-0 top-0" onClick={toggleMute}>
                            {mute ? <i className="fa-solid fa-volume-xmark text-sm text-black"></i> : <i className="fa-solid fa-volume-high text-sm text-black"></i>}
                        </div>
                    </h1>
                    <div className="w-full flex justify-between">
                        <span className="flex items-center text-gray-600 text-sm">
                            <i className="fa-solid fa-arrow-up-right-dots mr-2" />
                            <p>Level: <b className="text-black text-base">{user.level}</b></p>
                        </span>
                        <span className="flex items-center text-sm text-gray-600">
                            <i className="fa-solid fa-users-line mr-2" />
                            <p>Players: <b className="text-black text-base">300+</b></p>
                        </span>
                    </div>
                    <h4 className="text-gray-600 text-center my-2">No. of tries left: <b className="text-black">{user.tries}</b></h4>
                    <div className="relative w-fit h-fit overflow-y-hidden">
                        <TransformWrapper
                            initialScale={1}
                            minScale={1}
                            maxScale={3}
                            wheel={{ disabled: false }}
                            doubleClick={{ disabled: false }}
                        >
                            <TransformComponent>
                                <img src={file} className="w-full h-fit rounded-lg" alt="Game" />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                    <p className="text-xs pb-1 text-gray-600 text-left">**double tap on img to zoom</p>
                    <div className="w-full px-3 py-1 bg-black text-white text-center rounded">Digit Left: {left}</div>
                    <form onSubmit={handleGameSubmit} className="mt-auto">
                        <input
                            required
                            type="number"
                            onChange={handleInputChange}
                            placeholder="Enter the numbers found"
                            className="w-full border-2 border-black px-3 py-2 mt-6 rounded"
                        />
                        {error.status && <p className="text-sm text-red-600">{error.msg}</p>}
                        <button className="w-full mt-3 py-2 bg-black text-white rounded text-lg" style={error ? { animation: "shake 0.4s" } : {}} type="submit">
                            {load ? <div className="w-5 mx-auto rounded-full h-5 border-4 animate-spin border-gray-500 border-t-white"></div> : "Submit"}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="box-border my-auto w-full px-3 py-4 flex flex-col">
                    <img src={over} className="w-1/2 mt-10 mx-auto" alt="Game Over" />
                    <img src={text} className="h-10 w-fit mx-auto invert" alt="Game Over Text" />
                    <p className="mt-5 text-gray-600">Thanks for passing by...</p>
                </div>
            )}
           
        </div>
    );
}

export default GamePlay;
