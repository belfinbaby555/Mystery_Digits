import React from "react";

const Loading= ()=>{

    return(
        <div className="w-full h-full absolute top-0 left-0 flex bg-gray-200">
            <div className="w-16 h-16 border-8 animate-spin m-auto border-gray-400 border-t-black rounded-full"></div>
        </div>
    )

};export default Loading