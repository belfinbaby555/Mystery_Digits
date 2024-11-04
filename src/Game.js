import React, { useState } from "react";
import logo from "./images/Tantra White.png";
import GamePlay from "./component/Game";
import Leader from "./component/Leader";

function Game() {
    const [isGameSelected, setIsGameSelected] = useState(true);

    return (
        <div className="w-screen h-svh box-border flex px-3 py-3 flex-col">
            <div className="min-[380px]:hidden flex flex-col h-full">
            <nav className="flex justify-between">
                <img src={logo} className="w-8 invert" alt="Tantra Logo" />
                <p className="text-lg font-semibold">Mystery Digits</p>
            </nav>
            <div className="w-full flex justify-between mt-5 pb-1 mb-3 text-xl capitalize font-semibold relative">
                <span
                    onClick={() => setIsGameSelected(true)}
                    className={`px-1 ${isGameSelected ? "text-black" : "text-gray-500"}`}
                >
                    Home
                </span>
                <span
                    onClick={() => setIsGameSelected(false)}
                    className={`px-1 ${!isGameSelected ? "text-black" : "text-gray-500"}`}
                >
                    Leaderboard
                </span>
                <div
                    className={`rounded absolute bottom-0 h-1 duration-300 bg-black ${
                        isGameSelected ? "left-0 w-14" : "left-[calc(100%-_144px)] w-36"
                    }`}
                />
            </div>
            {isGameSelected ? (
                <GamePlay select={isGameSelected} />
            ) : (
                <div className="w-full h-svh bg-gray-300 text-center rounded-xl overflow-hidden box-border px-2">
                    <h1 className="text-3xl font-bold my-2 mb-5">Top 10 Rank</h1>
                    <Leader />
                </div>
            )}
            </div>
            <img src="https://mysterydigits.vjec.in/desktop.jpg" className="h-svh min-[380px]:block hidden"/>
        </div>
    );
}

export default Game;
