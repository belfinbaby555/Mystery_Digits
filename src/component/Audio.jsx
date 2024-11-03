import React from "react";
import song from "../assets/song.mp3"


const Audio= () => {
    return(
        <video id="aud" className="hidden" autoPlay controls loop src={song}>
    </video>
    )
};
export default Audio