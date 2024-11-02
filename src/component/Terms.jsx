import React, { useState } from "react";
import logo from "../images/Tantra White.png"

function Term({move,setmove}){
    const [disable,setdisable]=useState(true)

return(
    <div className="w-screen h-svh box-border bg-gray-200 px-5 py-3">
    <nav className="flex justify-between">
        <img src={logo} className="w-8 invert"/>
        <p className="text-lg font-semibold">Mystery Digits</p>
    </nav>
    <h3 className="my-6 text-2xl font-bold">Rules & Regulations</h3>
    <div className="text-sm">
    <p className="h-svh overflow-y-scroll" style={{height:'calc(100svh - 200px)'}}>Please take a moment to review and accept
                our terms and conditions before using our service.
                Mystery Digits Event Rules and Regulations

                <br/><b>Event Timing:</b> <br/>The event runs from 9:00 AM to 3:00 PM.

                <br/><b>Registration:</b><br/> Use your registered phone to participate.

                <br/><b>Objective: </b><br/>Identify the number in the generated image. Order of numbers doesn’t matter.
                <br/><b>Timer:</b> <br/>There is timer running for tie breaking if same level in leaderboard
                <br/><b>Formatting:</b> <br/>Enter the number without spaces, commas, or special characters.

                <br/>  <b>Levels:</b><br/> Each level has a set of numbers equal to the level number.

                <br/>       <b>Chances:</b><br/> Participants have a total of 5 attempts for the entire game. Exceeding this limit leads to elimination.

                <br/>               <b>Leaderboard: </b><br/>Top ten participants ranked by completed levels and average completion times.

                <br/>       <b>Event Conclusion:</b> <br/>Event ends at 3:00 PM. The leaderboard leader at this time wins
                <br/>  <b>Acceptance of Terms:</b><br/>   By accessing and using the Mystry Digits App, you agree to
                    all the above terms and conditions.

                    <div className="my-5 flex text-base items-center">
                        <input type="checkbox" onClick={()=>{setdisable(!disable)}} className="w-5 h-5 mr-2"/>
                        <p>I agree to the <b>Rules</b></p>
                    </div>
            </p>
            <button disabled={disable} onClick={()=>{setmove(!move)}} className="w-full disabled:bg-gray-700 py-3 text-white bg-black rounded">Agree</button>
    </div>
</div>
)

}export default Term;