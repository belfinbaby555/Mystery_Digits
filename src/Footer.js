import React from "react";
import Back from "./images/rect2.png"

function Footer(){

    return(
        <div className="w-svw h-fit flex bg-[#bec0bfff]">
            <div className="md:w-1/2 mx-auto relative">
            <img src={Back} className="w-full h-fit" alt="foot"/>
            <div className="absolute top-0 left-0 w-full box-border py-[10%] flex justify-around"> 
                <div className="flex flex-col sm:gap-5 gap-3 sm:text-xl text-white font-semibold">
                <a>HOME</a>
                <a>EVENTS</a>
                </div>
                <div className="text-white uppercase">sjfiaweufh</div>
            </div>
            </div>
        </div>
    )

}export default Footer;