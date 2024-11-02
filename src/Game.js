import React, { useState } from "react";
import logo from "./images/Tantra White.png"
import GamePlay from "./component/Game";
import Leader from "./component/Leader";

function Game(){

    
    const [select,setselect] = useState(true)

    return(
        <div className="w-screen relative h-svh box-border px-3 py-3 flex flex-col">
            <nav className="flex justify-between">
                <img src={logo} className="w-8 invert"/>
                <p className="text-lg font-semibold">Mystery Digits</p>
            </nav>
            <div className="w-full relative h-fit flex mt-5 pb-1 mb-3 text-xl capitalize font-semibold justify-between">
                <span onClick={()=>{setselect(true)}} className={"px-1" + (select?" text-black":" text-gray-500")}>home</span>
                <span onClick={()=>{setselect(false)}} className={"px-1" + (select?" text-gray-500":" text-black")}>leaderboard</span>
                <div className={"rounded absolute bottom-0 h-1 duration-300 bg-black" + (select?" left-0 w-14":" left-[calc(100%-_144px)] w-36")}></div>
            </div>
            <GamePlay select={select}/>
            <div className={"w-full h-svh bg-gray-300 text-center rounded-xl overflow-hidden box-border px-2" + (select?" hidden":" block")}>
            <h1 className="text-3xl font-bold w-full text-center my-2 mb-5">Top 10 Rank</h1>
                <Leader/>
            </div>
        </div>
    )

}export default Game;