import React, { useEffect, useState } from "react";
import axios from "axios";

function GamePlay({select}){

    const [left,setleft]=useState()
    const [user,getuser]=useState({})

    useEffect(()=>{
        axios.get("/dashboard")
        .then(res=>{
            getuser(res.data)
            setleft(res.data.lvl)
        })
    },[])
    const remain=(e)=>{
        setleft(user.lvl)

        const val = user.lvl

        
        if(val-(e.target.value.length) <= 0){
            setleft(0)
        }
        else{
            setleft(val-(e.target.value.length))
        }
    }

    const game=(event)=>{
        event.preventDefault()

        const val=event.target.elements[0].value;

        axios.get("/get_csrf_token")
        .then(res=>{
            console.log(res.data)
            axios.post("/game",{val:val},{
                headers:{
                    "Content-Type":"application/json",
                    "X-CSRFToken":res.data.message
                }
            }).then(res=>{
                console.log(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
        })

        
    }
    return(
        <div className={"w-full h-svh bg-gray-300 text-center rounded-xl overflow-hidden box-border px-2" + (select?" block":" hidden")}>
                <h1 className="py-3 text-lg font-semibold">Mystery Quest</h1>
                <div className="w-full flex justify-between ">
                    <span className="flex items-center text-gray-600 text-sm">
                        <i className="fa-solid fa-arrow-up-right-dots mr-2"/>
                        <p >Level:<b className="text-black text-base">{user.lvl}</b></p>
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                        <i className="fa-solid fa-users-line mr-2"/>
                        <p>Players:<b className="text-black text-base">300+</b></p>
                    </span>
                </div>
                <h4 className="text-gray-600 text-center my-2">No. of tries left:<b className="text-black">{user.tries}</b></h4>
                <div className="relative w-fit h-fit overflow-y-hidden">
                <img src={user.filename} className="w-full h-fit rounded-lg"/>
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