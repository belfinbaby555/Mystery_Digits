import React, { useState } from "react";
import test from "../images/test.jpg"

function GamePlay({select}){

    const [c,gc]=useState({})
    const [left,setleft]=useState(5)


    const mag=(event)=>{
        let a=event.clientX;
        let b=event.clientY;
        
        let w=event.target.width;
        let h=event.target.height;


        // console.log({x:a-60,y:b-230,w:w+77,h:h+77})

        gc({x:a-30,y:b-237,w:w,h:h})
    }
    const remain=(e)=>{
        setleft(5)

        const val = 5

        
        if(val-(e.target.value.length) <= 0){
            setleft(0)
        }
        else{
            setleft(val-(e.target.value.length))
        }
    }

    const game=(event)=>{
        event.preventDefault()

        const val=event.target.elements[0].value

        console.log(val)
    }
    return(
        <div className={"w-full h-svh bg-gray-300 text-center rounded-xl overflow-hidden box-border px-2" + (select?" block":" hidden")}>
                <h1 className="py-3 text-lg font-semibold">Mystery Quest</h1>
                <div className="w-full flex justify-between ">
                    <span className="flex items-center text-gray-600 text-sm">
                        <i className="fa-solid fa-arrow-up-right-dots mr-2"/>
                        <p >Level:<b className="text-black text-base">99</b></p>
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                        <i className="fa-solid fa-users-line mr-2"/>
                        <p>Players:<b className="text-black text-base">300+</b></p>
                    </span>
                </div>
                <h4 className="text-gray-600 text-center my-2">No. of tries left:<b className="text-black">5</b></h4>
                <div onMouseMoveCapture={mag} className="relative w-fit h-fit overflow-y-hidden">
                <img src={test} className="w-full h-fit rounded-lg"/>
                <div className="w-20 h-20 border-2 rounded-full absolute bg-no-repeat border-white"
                style={{top:`${c.y}px`,left:`${c.x}px`,backgroundImage:`url(${test})`,backgroundSize:`${c.w*3}px ${c.h*3}px`,backgroundPosition:`-${(c.x*3)}px -${(c.y*3)}px`}}></div>
                </div>
                <p className="text-xs pb-1 text-gray-600 text-left">**tap on img to magnify</p>
                <div className="w-full px-3 py-1 bg-black text-white text-center rounded">Digit Left: {left}</div>
                <form onSubmit={game}>
                <input type="number" onChange={remain} placeholder="Enter the numbers found" className="w-full border-2 border-black px-3 py-2 my-3 rounded"/>
                <button className="w-full py-2 bg-black text-white rounded text-lg" type="submit">Submit</button>                   
                </form>              
            </div>
    )
}export default GamePlay;